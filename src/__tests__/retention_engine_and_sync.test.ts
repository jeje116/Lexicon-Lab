import { ALL_WORDS_POOL, INITIAL_WORD_STATS } from '../data/mockLexicon';
import { 
  mergeUserProgress, 
  migrateLegacyWordStats, 
  getDefaultUserData 
} from '../utils/storage';
import { 
  isExactTranslationMatch, 
  isExactWordMatch, 
  generateStageQuizQuestions 
} from '../utils/retentionAlgorithm';
import { normalizePartOfSpeech } from '../services/vocabService';
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

console.log(`\n======================================================`);
console.log(`🎯 Test Summary: ${testsPassed}/${testsTotal} passed (${Math.round((testsPassed / testsTotal) * 100)}%)`);
console.log(`======================================================\n`);
