export type PartOfSpeech = 'verb' | 'adjective' | 'noun' | 'adverb';
export type CEFRLevel = 'B2' | 'C1' | 'C2';
export type TerminalMode = 'stage' | 'retention' | 'matrix';
export type StagePhase = 'deck' | 'quiz' | 'failed' | 'victory';

export interface ContextSentence {
  english: string;
  indonesian: string;
  clozeEnglish: string;
}

export interface WordItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: PartOfSpeech;
  cefr: CEFRLevel;
  translation: string; // Terjemahan bahasa Indonesia
  definition: string;  // Definisi bahasa Indonesia
  contextSentences: ContextSentence[];
  stageId: number;     // Nomor stage (misal: 1, 2, dst)
  stageTitle: string;
  clusterId?: number;  // Kompatibilitas mundur
  clusterTitle?: string;
}

export interface WordRetentionStats {
  wordId: string;
  totalAttempts: number;
  correctAttempts: number;
  consecutiveStreak: number;
  lastReviewedAt: number; // Unix timestamp ms
  isMastered: boolean;
  isBookmarked: boolean;
  isInspected: boolean;
}

export type MemoryTier = 'CRITICAL' | 'VULNERABLE' | 'CONSOLIDATING' | 'CRYSTALLIZED';

export type QuizVariant = 'TYPE_TRANSLATION' | 'MCQ_DEFINITION';

export interface QuizQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  wordId: string;
  targetWord: string;
  variant: QuizVariant;
  prompt: string;
  challengeText: string; // Kata Inggris (jika ketik arti) atau Kalimat Definisi (jika pilgan)
  options?: QuizQuestionOption[]; // Khusus MCQ_DEFINITION (4 opsi)
  correctAnswer: string;
  translation: string;
  definition: string;
  partOfSpeech: string;
  phonetic?: string;
}

export interface UserProgressData {
  dailyStreak: number;
  lastStreakDate: string; // YYYY-MM-DD
  clearedStages: number[]; // ID Stage yang sudah lulus 100% (10/10)
  currentStageId: number;  // Stage yang sedang aktif dibuka
  clustersMasteredCount: number;
  totalRunsAttempted: number;
  totalFlawlessRuns: number;
  soundEnabled: boolean;
  speechRate: number; // 0.75 atau 1.0
  wordStats: Record<string, WordRetentionStats>;
}
