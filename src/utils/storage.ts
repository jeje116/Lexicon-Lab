import { UserProgressData, WordRetentionStats } from '../types/lexicon';
import { INITIAL_WORD_STATS } from '../data/mockLexicon';

const STORAGE_KEY = 'lexicon_terminal_progress_v2';

export function getDefaultUserData(): UserProgressData {
  return {
    dailyStreak: 7,
    lastStreakDate: new Date().toISOString().split('T')[0],
    clearedStages: [], // Stage yang sudah lulus 10/10
    currentStageId: 1, // Stage yang sedang dipelajari
    clustersMasteredCount: 0,
    totalRunsAttempted: 0,
    totalFlawlessRuns: 0,
    soundEnabled: true,
    speechRate: 1.0,
    wordStats: { ...INITIAL_WORD_STATS }
  };
}

export function loadUserData(): UserProgressData {
  if (typeof window === 'undefined') return getDefaultUserData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultUserData();
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultUserData(),
      ...parsed,
      wordStats: {
        ...INITIAL_WORD_STATS,
        ...(parsed.wordStats || {})
      }
    };
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return getDefaultUserData();
  }
}

export function saveUserData(data: UserProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
}

export function recordWordAttempt(
  statsMap: Record<string, WordRetentionStats>,
  wordId: string,
  isCorrect: boolean
): Record<string, WordRetentionStats> {
  const current = statsMap[wordId] || {
    wordId,
    totalAttempts: 0,
    correctAttempts: 0,
    consecutiveStreak: 0,
    lastReviewedAt: 0,
    isMastered: false,
    isBookmarked: false,
    isInspected: true
  };

  const nextAttempts = current.totalAttempts + 1;
  const nextCorrect = current.correctAttempts + (isCorrect ? 1 : 0);
  const nextStreak = isCorrect ? current.consecutiveStreak + 1 : 0;
  const isNowMastered = nextCorrect >= 4 && nextStreak >= 3 && (nextCorrect / nextAttempts) >= 0.8;

  return {
    ...statsMap,
    [wordId]: {
      ...current,
      totalAttempts: nextAttempts,
      correctAttempts: nextCorrect,
      consecutiveStreak: nextStreak,
      lastReviewedAt: Date.now(),
      isMastered: isNowMastered,
      isInspected: true
    }
  };
}
