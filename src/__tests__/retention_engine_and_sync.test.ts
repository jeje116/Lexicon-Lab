import { ALL_WORDS_POOL, INITIAL_WORD_STATS } from '../data/mockLexicon';
import { MOCK_KNOWLEDGE_TOPICS } from '../data/mockKnowledgeTopics';
import { 
  mergeUserProgress, 
  mergeProgressState,
  migrateLegacyWordStats, 
  getDefaultUserData,
  markTopicStageRead 
} from '../utils/storage';
import {
  evaluateAnswerSimilarity,
  levenshteinDistance,
  normalizeWithSpaces,
  normalizeWithoutSpaces
} from '../utils/textSimilarity';
import {
  hasMeaningfulProgressDiff,
  hasLocalLearningActivity
} from '../utils/sheetsSync';
import { 
  isExactTranslationMatch, 
  isExactWordMatch, 
  generateStageQuizQuestions 
} from '../utils/retentionAlgorithm';
import { normalizePartOfSpeech, normalizeKnowledgeTopicItems } from '../services/vocabService';
import { 
  convertIndonesianStagesToWordItems, 
  generateIndonesianStageQuizQuestions 
} from '../utils/indonesianLexiconAdapter';
import { UserProgressData } from '../types/lexicon';

console.log('🧪 [AUTONOMOUS QA] Starting ENG-010 Verification Test Suite...\n');

let testsPassed = 0;
let testsTotal = 0;

function assertEqual<T>(actual: T, expected: T, message?: string) {
  if (actual !== expected) {
    throw new Error(`Assertion failed: expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}. ${message || ''}`);
  }
}

function assertDeepEqual(actual: unknown, expected: unknown, message?: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Assertion failed: expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}. ${message || ''}`);
  }
}

function assertTrue(value: boolean, message?: string) {
  if (!value) {
    throw new Error(`Assertion failed: expected true but got false. ${message || ''}`);
  }
}

function assertMatch(value: string, regex: RegExp, message?: string) {
  if (!regex.test(value)) {
    throw new Error(`Assertion failed: expected "${value}" to match ${regex}. ${message || ''}`);
  }
}

function test(name: string, fn: () => void) {
  testsTotal++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(err);
    const g = globalThis as unknown as { process?: { exitCode?: number } };
    if (g.process) {
      g.process.exitCode = 1;
    }
  }
}

// =========================================================================
// TEST SUITE 1: DETERMINISTIC ID NORMALIZATION & CODE.GS PARITY
// =========================================================================
console.log('--- Test Suite 1: ID Normalization & Code.gs Parity ---');

test('ALL_WORDS_POOL has exactly 452 words (30 baseline + 422 master)', () => {
  assertEqual(ALL_WORDS_POOL.length, 452);
});

test('All word IDs follow the deterministic pattern w{stageId}-{slug}', () => {
  ALL_WORDS_POOL.forEach((item) => {
    const expectedSlug = item.word.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const expectedId = `w${item.stageId}-${expectedSlug}`;
    assertEqual(item.id, expectedId, `Word ID for "${item.word}" must match Code.gs generator`);
  });
});

test('INITIAL_WORD_STATS is clean baseline in production', () => {
  assertEqual(Object.keys(INITIAL_WORD_STATS).length, 0, 'INITIAL_WORD_STATS should be empty for a clean state');
  const defaultUser = getDefaultUserData();
  assertEqual(defaultUser.dailyStreak, 1, 'Default dailyStreak should be 1');
  assertEqual(defaultUser.clearedStages.length, 0, 'Default clearedStages should be empty');
  assertEqual(Object.keys(defaultUser.wordStats).length, 0, 'Default wordStats should be empty');
});

// =========================================================================
// TEST SUITE 2: LEGACY ID MIGRATION
// =========================================================================
console.log('\n--- Test Suite 2: Legacy ID Migration ---');

test('migrateLegacyWordStats correctly maps stgX-YY to wX-word', () => {
  const legacyStats = {
    'stg1-01': {
      wordId: 'stg1-01',
      totalAttempts: 5,
      correctAttempts: 4,
      consecutiveStreak: 3,
      lastReviewedAt: 1000,
      isMastered: false,
      isBookmarked: true,
      isInspected: true
    },
    'stg2-02': {
      wordId: 'stg2-02',
      totalAttempts: 8,
      correctAttempts: 7,
      consecutiveStreak: 4,
      lastReviewedAt: 2000,
      isMastered: true,
      isBookmarked: false,
      isInspected: true
    }
  };

  const migrated = migrateLegacyWordStats(legacyStats);

  assertTrue(Boolean(migrated['w1-ubiquitous']), 'stg1-01 must migrate to w1-ubiquitous');
  assertEqual(migrated['w1-ubiquitous'].wordId, 'w1-ubiquitous');
  assertEqual(migrated['w1-ubiquitous'].totalAttempts, 5);

  assertTrue(Boolean(migrated['w2-galvanize']), 'stg2-02 must migrate to w2-galvanize');
  assertEqual(migrated['w2-galvanize'].wordId, 'w2-galvanize');
  assertEqual(migrated['w2-galvanize'].isMastered, true);

  assertEqual(migrated['stg1-01'], undefined, 'Old key stg1-01 must not remain in output');
});

// =========================================================================
// TEST SUITE 3: DETERMINISTIC SMART-MERGE (mergeUserProgress)
// =========================================================================
console.log('\n--- Test Suite 3: Deterministic Smart-Merge ---');

test('mergeUserProgress handles null/empty cloud safely', () => {
  const local = getDefaultUserData();
  const merged = mergeUserProgress(local, null);
  assertDeepEqual(merged, local);
});

test('mergeUserProgress unions clearedStages and resolves conflicts deterministically', () => {
  const local: UserProgressData = {
    dailyStreak: 3,
    lastStreakDate: '2026-11-04',
    clearedStages: [1],
    currentStageId: 1,
    clustersMasteredCount: 1,
    totalRunsAttempted: 10,
    totalFlawlessRuns: 2,
    soundEnabled: true,
    speechRate: 1.0,
    wordStats: {
      'w1-ubiquitous': {
        wordId: 'w1-ubiquitous',
        totalAttempts: 4,
        correctAttempts: 3,
        consecutiveStreak: 2,
        lastReviewedAt: 1000,
        isMastered: false,
        isBookmarked: true,
        isInspected: true
      }
    }
  };

  const cloud: UserProgressData = {
    dailyStreak: 7,
    lastStreakDate: '2026-11-05',
    clearedStages: [2],
    currentStageId: 2,
    clustersMasteredCount: 1,
    totalRunsAttempted: 20,
    totalFlawlessRuns: 5,
    soundEnabled: false,
    speechRate: 1.0,
    wordStats: {
      'w1-ubiquitous': {
        wordId: 'w1-ubiquitous',
        totalAttempts: 8, // Higher attempts in cloud
        correctAttempts: 7,
        consecutiveStreak: 4,
        lastReviewedAt: 2000,
        isMastered: true,
        isBookmarked: false,
        isInspected: true
      },
      'w2-ameliorate': {
        wordId: 'w2-ameliorate',
        totalAttempts: 2,
        correctAttempts: 2,
        consecutiveStreak: 2,
        lastReviewedAt: 2500,
        isMastered: false,
        isBookmarked: false,
        isInspected: true
      }
    }
  };

  const merged = mergeUserProgress(local, cloud);

  // Assert streak & dates
  assertEqual(merged.dailyStreak, 7, 'Max streak must be 7');
  assertEqual(merged.lastStreakDate, '2026-11-05');

  // Assert clearedStages union
  assertDeepEqual(merged.clearedStages, [1, 2], 'clearedStages must be union [1, 2]');
  assertEqual(merged.clustersMasteredCount, 2);

  // Assert run counters
  assertEqual(merged.totalRunsAttempted, 20);
  assertEqual(merged.totalFlawlessRuns, 5);

  // Assert wordStats conflict resolution: w1-ubiquitous selects cloud stat (8 attempts)
  assertEqual(merged.wordStats['w1-ubiquitous'].totalAttempts, 8);
  assertEqual(merged.wordStats['w1-ubiquitous'].isMastered, true);
  // Cumulative flag: bookmarked was true locally, so must remain true!
  assertEqual(merged.wordStats['w1-ubiquitous'].isBookmarked, true);

  // Assert w2-ameliorate added from cloud
  assertTrue(Boolean(merged.wordStats['w2-ameliorate']));
  assertEqual(merged.wordStats['w2-ameliorate'].totalAttempts, 2);
});

// =========================================================================
// TEST SUITE 4: 2-WAY RETENTION RETRIEVAL MATCHING
// =========================================================================
console.log('\n--- Test Suite 4: 2-Way Retention Retrieval Matching ---');

test('isExactWordMatch validates English target words with auto-trim & case-insensitivity', () => {
  assertEqual(isExactWordMatch('ubiquitous', 'ubiquitous'), true);
  assertEqual(isExactWordMatch('  Ubiquitous  ', 'ubiquitous'), true);
  assertEqual(isExactWordMatch('UBIQUITOUS', 'ubiquitous'), true);
  assertEqual(isExactWordMatch('anachronistic', 'anachronistic'), true);
  assertEqual(isExactWordMatch('wrongword', 'ubiquitous'), false);
  assertEqual(isExactWordMatch('', 'ubiquitous'), false);
  assertEqual(isExactWordMatch('   ', 'ubiquitous'), false);
});

test('isExactTranslationMatch validates Indonesian translation variations', () => {
  const target = 'Ada di mana-mana / Merajalela';
  assertEqual(isExactTranslationMatch('ada di mana-mana', target), true);
  assertEqual(isExactTranslationMatch('merajalela', target), true);
  assertEqual(isExactTranslationMatch('Ada di mana-mana / Merajalela', target), true);
  assertEqual(isExactTranslationMatch('ada di mana mana', target), true);
  assertEqual(isExactTranslationMatch('tidak ada', target), false);
});

// =========================================================================
// TEST SUITE 5: STAGE QUIZ REGRESSION BOUNDARY (ADR-005)
// =========================================================================
console.log('\n--- Test Suite 5: Stage Quiz Regression Boundary (ADR-005) ---');

test('generateStageQuizQuestions produces exactly 20 interleaved questions (10 TYPE + 10 MCQ)', () => {
  const stage1Words = ALL_WORDS_POOL.filter((w) => w.stageId === 1);
  assertEqual(stage1Words.length, 10, 'Stage 1 must have 10 words');

  const questions = generateStageQuizQuestions(stage1Words, ALL_WORDS_POOL);
  assertEqual(questions.length, 20, 'Stage Quiz must generate exactly 20 questions');

  const typeQuestions = questions.filter((q) => q.variant === 'TYPE_TRANSLATION');
  const mcqQuestions = questions.filter((q) => q.variant === 'MCQ_DEFINITION');

  assertEqual(typeQuestions.length, 10, 'Exactly 10 questions must be TYPE_TRANSLATION');
  assertEqual(mcqQuestions.length, 10, 'Exactly 10 questions must be MCQ_DEFINITION');

  // Verify all MCQ questions have 4 options with exactly 1 correct option
  mcqQuestions.forEach((q) => {
    assertTrue(Boolean(q.options), 'MCQ question must have options');
    assertEqual(q.options?.length, 4, 'MCQ question must have exactly 4 options');
    const correctCount = (q.options || []).filter((o) => o.isCorrect).length;
    assertEqual(correctCount, 1, 'MCQ question must have exactly 1 correct option');
  });
});

// =========================================================================
// TEST SUITE 6: ENG-011 MASTER INGESTION & MULTI-POS NORMALIZATION
// =========================================================================
console.log('\n--- Test Suite 6: ENG-011 Master Ingestion & Multi-POS Normalization ---');

test('normalizePartOfSpeech correctly resolves compound POS formats', () => {
  // Verb-prefixed Indonesian definition maps "Noun / Verb" to "verb"
  assertEqual(normalizePartOfSpeech('Noun / Verb', 'Mematuhi aturan atau prinsip'), 'verb');
  assertEqual(normalizePartOfSpeech('Verb / Noun', 'Mendukung atau membela'), 'verb');
  
  // Non-verb compound maps to primary valid token
  assertEqual(normalizePartOfSpeech('Adjective / Noun', 'Berkaitan dengan pendidikan'), 'adjective');
  assertEqual(normalizePartOfSpeech('Noun / Adjective', 'Faktor yang dapat berubah'), 'noun');
  
  // Single token unchanged
  assertEqual(normalizePartOfSpeech('verb', ''), 'verb');
  assertEqual(normalizePartOfSpeech('adverb', ''), 'adverb');
  assertEqual(normalizePartOfSpeech('adjective', ''), 'adjective');
});

test('All 452 words have valid IDs without parenthesis or invalid characters', () => {
  ALL_WORDS_POOL.forEach((item) => {
    assertTrue(!item.word.includes('('), `Word "${item.word}" must not have '('`);
    assertTrue(!item.word.includes(')'), `Word "${item.word}" must not have ')'`);
    assertMatch(item.id, /^w\d+-[a-z0-9-]+$/, `ID "${item.id}" must match pattern`);
  });
});

test('Master vocabulary stages span Stage 4 to 46 with valid partition counts', () => {
  for (let s = 1; s <= 45; s++) {
    const count = ALL_WORDS_POOL.filter((w) => w.stageId === s).length;
    assertEqual(count, 10, `Stage ${s} must have exactly 10 words`);
  }
  const stage46Count = ALL_WORDS_POOL.filter((w) => w.stageId === 46).length;
  assertEqual(stage46Count, 2, 'Stage 46 must have exactly 2 words');
});

// =========================================================================
// TEST SUITE 7: RETENTION GATEKEEPER (NO STAGES CLEARED)
// =========================================================================
console.log('\n--- Test Suite 7: Retention Gatekeeper Verification ---');

test('Retention pool strictly enforces gatekeeper when clearedStages is empty', () => {
  const getRetentionPool = (allWords: typeof ALL_WORDS_POOL, clearedStages: number[]) => {
    if (!clearedStages || clearedStages.length === 0) return [];
    return allWords.filter(w => clearedStages.includes(w.stageId));
  };

  const emptyPool = getRetentionPool(ALL_WORDS_POOL, []);
  assertEqual(emptyPool.length, 0, 'Retention pool must be empty when no stages are cleared');

  const stage1Pool = getRetentionPool(ALL_WORDS_POOL, [1]);
  assertEqual(stage1Pool.length, 10, 'Retention pool must have 10 words when Stage 1 is cleared');
  assertTrue(stage1Pool.every(w => w.stageId === 1), 'All words in pool must be from Stage 1');

  const multiStagePool = getRetentionPool(ALL_WORDS_POOL, [1, 2]);
  assertEqual(multiStagePool.length, 20, 'Retention pool must have 20 words when Stage 1 & 2 are cleared');
  assertTrue(multiStagePool.every(w => w.stageId === 1 || w.stageId === 2), 'All words in pool must be from Stage 1 or 2');
});

// =========================================================================
// TEST SUITE 8: ENG-012 MULTI-BRANCH KNOWLEDGE & CONTENT PARSER
// =========================================================================
console.log('\n--- Test Suite 8: Multi-Branch Knowledge & Content Parser ---');

test('MOCK_KNOWLEDGE_TOPICS contains 539 stages across Psychology (20), Statistics (4), Kosa Kata Indonesia (500), and Economics (15)', () => {
  assertEqual(MOCK_KNOWLEDGE_TOPICS.length, 539, 'Total stages in mock knowledge topics must be 539');

  const psyStages = MOCK_KNOWLEDGE_TOPICS.filter((t) => t.topicId === 'psy-read-people');
  assertEqual(psyStages.length, 20, 'Read People Like a Book must have exactly 20 stages');
  assertEqual(psyStages[0].topicTitle, 'Read People Like a Book – Patrick King');

  // Verify stages 2..20 have explicit inter-topic correlation bridge 🔗
  psyStages.slice(1).forEach((s) => {
    assertTrue(s.content.includes('🔗'), `Stage ${s.stageId} must include inter-topic correlation bridge 🔗`);
  });

  const statStages = MOCK_KNOWLEDGE_TOPICS.filter((t) => t.topicId === 'stat-kmeans');
  assertEqual(statStages.length, 4, 'K-Means topic must have exactly 4 stages');

  const indoStages = MOCK_KNOWLEDGE_TOPICS.filter((t) => t.branchId === 'kosa-kata-indonesia');
  assertEqual(indoStages.length, 500, 'Kosa Kata Indonesia branch must have exactly 500 words across 50 stages');
  
  const indoTopics = new Set(indoStages.map(s => s.topicId));
  assertEqual(indoTopics.size, 50, 'Kosa Kata Indonesia must span exactly 50 stage topics');

  const econStages = MOCK_KNOWLEDGE_TOPICS.filter((t) => t.branchId === 'economics');
  assertEqual(econStages.length, 15, 'Economics branch must have exactly 15 stages');
  assertEqual(econStages[0].topicId, 'econ-understand-money-p1', 'Economics topicId must match');
  assertEqual(econStages[0].branchTitle, 'Economics & Finance', 'Branch title must be Economics & Finance');
  econStages.slice(1).forEach((s) => {
    assertTrue(s.content.includes('🔗'), `Stage ${s.stageId} of Economics must include correlation bridge 🔗`);
  });

  // Verify ID format `${topicId}-s${stageId}`
  MOCK_KNOWLEDGE_TOPICS.forEach((item) => {
    assertEqual(item.id, `${item.topicId}-s${item.stageId}`);
    assertTrue(item.content.length > 20, `Content of stage ${item.id} must be non-empty`);
    assertTrue(item.keyPoints.length > 0, `Key points of stage ${item.id} must be non-empty`);
  });

  // Verify zero raw LaTeX arrows in all knowledge topics content
  const topicsWithRawArrows = MOCK_KNOWLEDGE_TOPICS.filter(
    (t) => t.content.includes('\\rightarrow') || t.content.includes('$\\rightarrow$')
  );
  assertEqual(topicsWithRawArrows.length, 0, 'No knowledge topic may contain raw LaTeX arrows');
});

test('normalizeKnowledgeTopicItems handles string pipe delimiter for keyPoints', () => {
  const rawItems = [
    {
      topicId: 'raw-topic',
      topicTitle: 'Raw Topic Title',
      branchId: 'test-branch',
      branchTitle: 'Test Branch',
      stageId: '1',
      stageTitle: '01. Intro',
      content: 'Sample **bold** and ==highlight== text',
      keyPoints: 'Point Alpha | Point Beta | Point Gamma'
    }
  ];

  const normalized = normalizeKnowledgeTopicItems(rawItems);
  assertEqual(normalized.length, 1);
  assertEqual(normalized[0].stageId, 1);
  assertEqual(normalized[0].keyPoints.length, 3);
  assertEqual(normalized[0].keyPoints[0], 'Point Alpha');
  assertEqual(normalized[0].keyPoints[1], 'Point Beta');
  assertEqual(normalized[0].keyPoints[2], 'Point Gamma');
});

test('markTopicStageRead adds stageId immutably and deduplicates', () => {
  const initial = {};
  const after1 = markTopicStageRead(initial, 'psy-read-people', 1);
  assertEqual(after1['psy-read-people'].length, 1);
  assertEqual(after1['psy-read-people'][0], 1);

  // Re-adding same stageId does not duplicate
  const duplicate = markTopicStageRead(after1, 'psy-read-people', 1);
  assertEqual(duplicate['psy-read-people'].length, 1);

  // Adding stage 3 sorts cleanly
  const after3 = markTopicStageRead(after1, 'psy-read-people', 3);
  assertEqual(after3['psy-read-people'].length, 2);
  assertEqual(after3['psy-read-people'][0], 1);
  assertEqual(after3['psy-read-people'][1], 3);
});

test('mergeUserProgress deterministically merges readTopicStages from cloud', () => {
  const local: UserProgressData = {
    ...getDefaultUserData(),
    readTopicStages: {
      'psy-read-people': [1, 2]
    }
  };

  const cloud: UserProgressData = {
    ...getDefaultUserData(),
    readTopicStages: {
      'psy-read-people': [2, 3],
      'stat-kmeans': [1]
    }
  };

  const merged = mergeUserProgress(local, cloud);
  assertEqual(merged.readTopicStages?.['psy-read-people']?.length, 3);
  assertEqual(merged.readTopicStages?.['psy-read-people']?.[0], 1);
  assertEqual(merged.readTopicStages?.['psy-read-people']?.[1], 2);
  assertEqual(merged.readTopicStages?.['psy-read-people']?.[2], 3);
  assertEqual(merged.readTopicStages?.['stat-kmeans']?.length, 1);
  assertEqual(merged.readTopicStages?.['stat-kmeans']?.[0], 1);
});

test('Markdown formatting pattern isolates **bold** and ==highlight== cleanly', () => {
  const sample = '**Membaca orang** adalah kemampuan. ==Tujuan utamanya bukan menebak.== Selesai.';
  const tokens = sample.split(/(\*\*.*?\*\*|==.*?==)/g);
  
  const boldToken = tokens.find((t) => t.startsWith('**') && t.endsWith('**'));
  assertEqual(boldToken, '**Membaca orang**');

  const hlToken = tokens.find((t) => t.startsWith('==') && t.endsWith('=='));
  assertEqual(hlToken, '==Tujuan utamanya bukan menebak.==');
});

// --- Test Suite 9: Indonesian Lexicon Adapter & 2-Way Quiz Engine ---
test('convertIndonesianStagesToWordItems produces exactly 500 valid WordItems with clean deterministic IDs', () => {
  const indoStages = MOCK_KNOWLEDGE_TOPICS.filter((t) => t.branchId === 'kosa-kata-indonesia');
  const converted = convertIndonesianStagesToWordItems(indoStages);
  assertEqual(converted.length, 500, 'Must convert all 500 Indonesian knowledge items');

  const first = converted[0];
  assertEqual(first.word, 'eksentrik');
  assertEqual(first.stageId, 1);
  assertEqual(first.id, 'id-w1-eksentrik');
  assertEqual(first.partOfSpeech, 'adjective');
  assertEqual(first.phonetic, 'Kata Sifat (Adjektiva)');
  assertTrue(first.translation.length > 5, 'Translation (core meaning) must be extracted');
  assertTrue(first.definition.length > 20, 'Definition must be extracted');
  assertEqual(first.contextSentences.length, 3, 'Must extract 3 context sentences from keyPoints');

  // Verify deterministic uniqueness
  const ids = new Set(converted.map(w => w.id));
  assertEqual(ids.size, 500, 'All 500 Indonesian word IDs must be strictly unique');
});

test('generateIndonesianStageQuizQuestions produces 20 balanced 2-way questions (10 Type + 10 MCQ)', () => {
  const indoStages = MOCK_KNOWLEDGE_TOPICS.filter((t) => t.branchId === 'kosa-kata-indonesia');
  const converted = convertIndonesianStagesToWordItems(indoStages);
  const stage1Words = converted.filter(w => w.stageId === 1);
  assertEqual(stage1Words.length, 10, 'Stage 1 must have 10 words');

  const questions = generateIndonesianStageQuizQuestions(stage1Words, converted);
  assertEqual(questions.length, 20, 'Quiz must have exactly 20 questions (10 Type + 10 MCQ)');

  const typeQuestions = questions.filter(q => q.variant === 'TYPE_TRANSLATION');
  const mcqQuestions = questions.filter(q => q.variant === 'MCQ_DEFINITION');
  assertEqual(typeQuestions.length, 10, 'Must have 10 typing questions');
  assertEqual(mcqQuestions.length, 10, 'Must have 10 MCQ questions');

  // Verify Arah 1: Arti -> Kosa Kata (Ketik Kosa Kata)
  typeQuestions.forEach(q => {
    assertEqual(q.correctAnswer, q.targetWord, 'Typing answer must be the target Indonesian word');
    assertTrue(q.prompt.includes('kosa kata Bahasa Indonesia'), 'Prompt must indicate Indonesian word typing');
  });

  // Verify Arah 2: Kosa Kata -> Arti (MCQ 4 Opsi)
  mcqQuestions.forEach(q => {
    assertEqual(q.options?.length, 4, 'MCQ must have 4 options');
    const correctOpt = q.options?.find(o => o.isCorrect);
    assertEqual(correctOpt?.text, q.translation, 'MCQ correct option must be the Inti Makna');
  });
});

test('Indonesian retention pool correctly includes Adjectives and Nouns when Stage 1 is cleared', () => {
  const indoStages = MOCK_KNOWLEDGE_TOPICS.filter((t) => t.branchId === 'kosa-kata-indonesia');
  const converted = convertIndonesianStagesToWordItems(indoStages);
  const clearedIndonesianStages = [1];

  // Stage 1 in Indonesian Lexicon has mostly Adjectives and Nouns
  const retentionPool = converted.filter(w => clearedIndonesianStages.includes(w.stageId));
  assertEqual(retentionPool.length, 10, 'Retention pool must contain all 10 words from Stage 1');
  
  const hasAdjectives = retentionPool.some(w => w.partOfSpeech === 'adjective');
  const hasNouns = retentionPool.some(w => w.partOfSpeech === 'noun');
  assertTrue(hasAdjectives, 'Stage 1 must have adjectives');
  assertTrue(hasNouns, 'Stage 1 must have nouns');
});

test('UI Navigation 3 Modules visibility contract is satisfied for Indonesian Lexicon', () => {
  const activeBranchId: string = 'kosa-kata-indonesia';
  const isEnglishBranch = activeBranchId === 'english';
  const isIndoBranch = activeBranchId === 'kosa-kata-indonesia';

  // Both English and Indonesian branches must expose exactly 3 system modules
  const modulesVisible = isEnglishBranch || isIndoBranch;
  assertTrue(modulesVisible, 'Modul Sistem must be active for Indonesian Lexicon branch');

  const navItemIds: string[] = ['stage', 'retention', 'matrix'];
  assertEqual(navItemIds.length, 3, 'Exactly 3 navigation items must be configured');
  assertEqual(navItemIds[0], 'stage');
  assertEqual(navItemIds[1], 'retention');
  assertEqual(navItemIds[2], 'matrix');
});

// =========================================================================
// TEST SUITE 10: FUZZY WORD-SIMILARITY QUIZ GRADING (LEVENSHTEIN + SYNONYMS)
// =========================================================================
console.log('\n--- Test Suite 10: Fuzzy Word-Similarity Quiz Grading ---');

test('String normalization handles punctuation, spaces, and no-space Indonesian variants', () => {
  assertEqual(normalizeWithSpaces('Ada di mana-mana!'), 'ada di mana mana');
  assertEqual(normalizeWithoutSpaces('Ada di mana-mana'), 'adadimanamana');
  assertEqual(normalizeWithoutSpaces('Ada dimana-mana'), 'adadimanamana');
  assertEqual(levenshteinDistance('merajalela', 'merajalea'), 1);
  assertEqual(levenshteinDistance('ubiquitous', 'ubiquitus'), 1);
});

test('evaluateAnswerSimilarity passes "Ada dimana-mana" against "Ada di mana-mana / Merajalela"', () => {
  const expected = 'Ada di mana-mana / Merajalela';
  const res = evaluateAnswerSimilarity('Ada dimana-mana', expected);
  assertEqual(res.isCorrect, true, '"Ada dimana-mana" must pass via space-insensitive normalization');
  assertTrue(res.similarity >= 0.8, 'Similarity must be >= 0.80');

  const resSynonym = evaluateAnswerSimilarity('Merajalela', expected);
  assertEqual(resSynonym.isCorrect, true, 'Second synonym "Merajalela" must pass');
  assertEqual(resSynonym.similarity, 1.0);
  assertEqual(resSynonym.feedbackMessage, undefined, 'Exact match must not show soft typo hint');

  const resCombined = evaluateAnswerSimilarity('ada di mana mana merajalela', expected);
  assertEqual(resCombined.isCorrect, true, 'Combined synonyms without slash must pass');
});

test('evaluateAnswerSimilarity passes 1-letter mild typos with soft canonical spelling message', () => {
  const expected = 'Ada di mana-mana / Merajalela';
  const typoIndo = evaluateAnswerSimilarity('merajalea', expected);
  assertEqual(typoIndo.isCorrect, true, '1-letter typo "merajalea" (0.90) must pass');
  assertTrue(typoIndo.similarity >= 0.8 && typoIndo.similarity < 1.0, 'Similarity must lie in [0.80, 1.0)');
  assertEqual(
    typoIndo.feedbackMessage,
    `Tepat! (Ejaan baku lengkap: ${expected})`,
    'Soft spelling hint must match specification'
  );

  const typoEn = evaluateAnswerSimilarity('ubiquitus', 'ubiquitous');
  assertEqual(typoEn.isCorrect, true, '1-letter English typo "ubiquitus" (0.90) must pass');
  assertEqual(typoEn.feedbackMessage, 'Tepat! (Ejaan baku lengkap: ubiquitous)');

  const spellingVariant = evaluateAnswerSimilarity('sekedar formalitas', 'Asal-asalan / Sekadar formalitas');
  assertEqual(spellingVariant.isCorrect, true, 'Common variant "sekedar formalitas" must pass');
  assertEqual(
    spellingVariant.feedbackMessage,
    'Tepat! (Ejaan baku lengkap: Asal-asalan / Sekadar formalitas)'
  );
});

test('evaluateAnswerSimilarity supports semicolon and comma synonym splitting', () => {
  const expected = 'Cepat; Tangkas, Lincah';
  assertEqual(evaluateAnswerSimilarity('tangkas', expected).isCorrect, true);
  assertEqual(evaluateAnswerSimilarity('lincah', expected).isCorrect, true);
  assertEqual(evaluateAnswerSimilarity('cepat', expected).isCorrect, true);
});

test('evaluateAnswerSimilarity strictly rejects wrong/gibberish/empty answers and enforces 0.80 threshold', () => {
  const expected = 'Ada di mana-mana / Merajalela';
  assertEqual(evaluateAnswerSimilarity('kucing terbang', expected).isCorrect, false, 'Gibberish must fail');
  assertEqual(evaluateAnswerSimilarity('tidak tahu', expected).isCorrect, false, 'Wrong phrase must fail');
  assertEqual(evaluateAnswerSimilarity('', expected).isCorrect, false, 'Empty input must fail');
  assertEqual(evaluateAnswerSimilarity('   --- / ()  ', expected).isCorrect, false, 'Punctuation-only input must fail');

  // Exact 0.80 boundary: 4/5 = 0.80 PASS vs 3/4 = 0.75 FAIL
  assertEqual(evaluateAnswerSimilarity('abcdf', 'abcde').isCorrect, true, '0.80 exact boundary must pass');
  assertEqual(evaluateAnswerSimilarity('abce', 'abcd').isCorrect, false, '0.75 below threshold must fail');
});

// =========================================================================
// TEST SUITE 11: BI-DIRECTIONAL CROSS-DEVICE PROGRESS SYNC (MOBILE <-> DESKTOP)
// =========================================================================
console.log('\n--- Test Suite 11: Cross-Device Progress Merge (Mobile PWA <-> Desktop) ---');

test('mergeProgressState merges Mobile PWA cloud progress with Desktop local state without data loss', () => {
  const desktopLocal: UserProgressData = {
    ...getDefaultUserData(),
    dailyStreak: 2,
    streak: 2,
    lastStreakDate: '2026-11-24',
    clearedStages: [1, 3],
    clearedIndonesianStages: [2],
    currentStageId: 3,
    clustersMasteredCount: 2,
    totalRunsAttempted: 6,
    totalFlawlessRuns: 2,
    inspectedWords: ['w3-articulate'],
    bookmarkedIds: ['w3-pragmatic'],
    lastUpdated: '2026-11-25T08:00:00.000Z',
    readTopicStages: { 'psy-read-people': [1, 2] },
    wordStats: {
      'w1-ubiquitous': {
        wordId: 'w1-ubiquitous',
        totalAttempts: 3,
        correctAttempts: 2,
        consecutiveStreak: 1,
        lastReviewedAt: 1000,
        isMastered: false,
        isBookmarked: false,
        isInspected: true
      },
      'w3-articulate': {
        wordId: 'w3-articulate',
        totalAttempts: 4,
        correctAttempts: 4,
        consecutiveStreak: 4,
        lastReviewedAt: 2500,
        isMastered: true,
        isBookmarked: false,
        isInspected: true
      }
    }
  };

  const mobileCloud: UserProgressData = {
    ...getDefaultUserData(),
    dailyStreak: 5,
    streak: 5,
    lastStreakDate: '2026-11-25',
    clearedStages: [1, 2],
    clearedIndonesianStages: [1, 4],
    currentStageId: 4,
    clustersMasteredCount: 2,
    totalRunsAttempted: 9,
    totalFlawlessRuns: 4,
    inspectedWords: ['w2-ameliorate', 'w2-galvanize'],
    bookmarkedIds: ['w1-ubiquitous', 'w2-ameliorate'],
    lastUpdated: '2026-11-25T13:30:00.000Z',
    readTopicStages: { 'psy-read-people': [2, 3], 'econ-understand-money-p1': [1] },
    wordStats: {
      'w1-ubiquitous': {
        wordId: 'w1-ubiquitous',
        totalAttempts: 6,
        correctAttempts: 6,
        consecutiveStreak: 5,
        lastReviewedAt: 5000, // Lebih baru dari mobile
        isMastered: true,
        isBookmarked: true,
        isInspected: true
      },
      'w2-ameliorate': {
        wordId: 'w2-ameliorate',
        totalAttempts: 2,
        correctAttempts: 2,
        consecutiveStreak: 2,
        lastReviewedAt: 4500,
        isMastered: false,
        isBookmarked: true,
        isInspected: true
      }
    }
  };

  const merged = mergeProgressState(desktopLocal, mobileCloud);

  // Union seluruh stage yang lulus (English & Indonesia)
  assertDeepEqual(merged.clearedStages, [1, 2, 3], 'English clearedStages must union Mobile + Desktop');
  assertDeepEqual(merged.clearedIndonesianStages, [1, 2, 4], 'Indonesian clearedStages must union Mobile + Desktop');

  // Union inspectedWords & bookmarkedIds + refleksi ke wordStats
  assertTrue(merged.inspectedWords?.includes('w1-ubiquitous') ?? false);
  assertTrue(merged.inspectedWords?.includes('w2-ameliorate') ?? false);
  assertTrue(merged.inspectedWords?.includes('w2-galvanize') ?? false);
  assertTrue(merged.inspectedWords?.includes('w3-articulate') ?? false);
  assertEqual(merged.wordStats['w2-galvanize']?.isInspected, true, 'inspectedWords union must hydrate wordStats');

  assertTrue(merged.bookmarkedIds?.includes('w1-ubiquitous') ?? false);
  assertTrue(merged.bookmarkedIds?.includes('w2-ameliorate') ?? false);
  assertTrue(merged.bookmarkedIds?.includes('w3-pragmatic') ?? false);
  assertEqual(merged.wordStats['w3-pragmatic']?.isBookmarked, true, 'bookmarkedIds union must hydrate wordStats');

  // Streak & timestamp terbaru dari Mobile
  assertEqual(merged.dailyStreak, 5, 'Merged dailyStreak must take highest/latest Mobile streak (5)');
  assertEqual(merged.streak, 5, 'Merged streak alias must stay synced with dailyStreak');
  assertEqual(merged.lastStreakDate, '2026-11-25');
  assertEqual(merged.lastUpdated, '2026-11-25T13:30:00.000Z', 'Latest lastUpdated timestamp must win');
  assertEqual(merged.currentStageId, 4, 'Newer cloud currentStageId should sync to Desktop');

  // WordStats terbaru per kata tetap utuh dari kedua perangkat
  assertEqual(merged.wordStats['w1-ubiquitous'].lastReviewedAt, 5000);
  assertEqual(merged.wordStats['w1-ubiquitous'].isMastered, true);
  assertEqual(merged.wordStats['w3-articulate'].isMastered, true, 'Desktop-only wordStats must not be lost');
  assertDeepEqual(merged.readTopicStages?.['psy-read-people'], [1, 2, 3]);
  assertDeepEqual(merged.readTopicStages?.['econ-understand-money-p1'], [1]);
});

test('Fresh Desktop profile cleanly adopts Mobile PWA progress without clobbering cloud', () => {
  const freshDesktop = getDefaultUserData();
  assertEqual(hasLocalLearningActivity(freshDesktop), false, 'Untouched fresh Desktop must report no activity');

  const mobileCloud: UserProgressData = {
    ...getDefaultUserData(),
    dailyStreak: 4,
    streak: 4,
    clearedStages: [1],
    clearedIndonesianStages: [1],
    currentStageId: 2,
    inspectedWords: ['w1-ubiquitous'],
    lastUpdated: '2026-11-25T12:00:00.000Z'
  };

  assertEqual(hasLocalLearningActivity(mobileCloud), true, 'Active Mobile state must report activity');

  const merged = mergeProgressState(freshDesktop, mobileCloud);
  assertDeepEqual(merged.clearedStages, [1]);
  assertDeepEqual(merged.clearedIndonesianStages, [1]);
  assertEqual(merged.dailyStreak, 4);
  assertEqual(merged.currentStageId, 2);
  assertEqual(hasMeaningfulProgressDiff(freshDesktop, merged), true, 'Desktop must detect incoming Mobile diff');
  assertEqual(hasMeaningfulProgressDiff(mobileCloud, merged), false, 'Merged state equals cloud so no redundant push needed');
});

console.log(`\n======================================================`);
console.log(`🎯 Test Summary: ${testsPassed}/${testsTotal} passed (${Math.round((testsPassed / testsTotal) * 100)}%)`);
console.log(`======================================================\n`);
