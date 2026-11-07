import { UserProgressData, WordRetentionStats } from '../types/lexicon';
import { INITIAL_WORD_STATS } from '../data/mockLexicon';

const STORAGE_KEY = 'lexicon_terminal_progress_v3';

export const LEGACY_ID_MAP: Record<string, string> = {
  'stg1-01': 'w1-ubiquitous',
  'stg1-02': 'w1-anachronistic',
  'stg1-03': 'w1-obfuscate',
  'stg1-04': 'w1-perfunctory',
  'stg1-05': 'w1-perspicacious',
  'stg1-06': 'w1-epitomize',
  'stg1-07': 'w1-exacerbate',
  'stg1-08': 'w1-esoteric',
  'stg1-09': 'w1-equivocate',
  'stg1-10': 'w1-sagacious',
  'stg2-01': 'w2-ameliorate',
  'stg2-02': 'w2-galvanize',
  'stg2-03': 'w2-repudiate',
  'stg2-04': 'w2-truncate',
  'stg2-05': 'w2-vacillate',
  'stg2-06': 'w2-vindicate',
  'stg2-07': 'w2-extrapolate',
  'stg2-08': 'w2-delineate',
  'stg2-09': 'w2-scrutinize',
  'stg2-10': 'w2-corroborate',
  'stg3-01': 'w3-articulate',
  'stg3-02': 'w3-mitigate',
  'stg3-03': 'w3-proliferate',
  'stg3-04': 'w3-substantiate',
  'stg3-05': 'w3-elucidate',
  'stg3-06': 'w3-pragmatic',
  'stg3-07': 'w3-tenuous',
  'stg3-08': 'w3-meticulous',
  'stg3-09': 'w3-superfluous',
  'stg3-10': 'w3-fastidious'
};

/**
 * Migrasi kunci wordStats lama jika pengguna sebelumnya menyimpan stgX-YY
 */
export function migrateLegacyWordStats(
  rawStats: Record<string, WordRetentionStats> = {}
): Record<string, WordRetentionStats> {
  const result: Record<string, WordRetentionStats> = {};

  for (const [key, stat] of Object.entries(rawStats)) {
    const targetKey = LEGACY_ID_MAP[key] || key;
    result[targetKey] = {
      ...stat,
      wordId: targetKey
    };
  }

  return result;
}

export function getDefaultUserData(): UserProgressData {
  return {
    dailyStreak: 1,
    lastStreakDate: new Date().toISOString().split('T')[0],
    clearedStages: [], // Stage yang sudah lulus 100% (20/20)
    currentStageId: 1, // Stage yang sedang dipelajari
    clustersMasteredCount: 0,
    totalRunsAttempted: 0,
    totalFlawlessRuns: 0,
    soundEnabled: true,
    speechRate: 1.0,
    wordStats: { ...INITIAL_WORD_STATS },
    readTopicStages: {}
  };
}

export function loadUserData(): UserProgressData {
  if (typeof window === 'undefined') return getDefaultUserData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultUserData();
    const parsed = JSON.parse(raw);
    const migratedStats = migrateLegacyWordStats(parsed.wordStats || {});

    return {
      ...getDefaultUserData(),
      ...parsed,
      wordStats: {
        ...INITIAL_WORD_STATS,
        ...migratedStats
      },
      readTopicStages: parsed.readTopicStages || {}
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

/**
 * Smart-merge deterministik antara data lokal dan cloud
 */
export function mergeUserProgress(
  local: UserProgressData,
  cloud?: UserProgressData | null
): UserProgressData {
  if (!cloud) return local;

  const migratedLocalStats = migrateLegacyWordStats(local.wordStats || {});
  const migratedCloudStats = migrateLegacyWordStats(cloud.wordStats || {});

  // Union clearedStages
  const localStages = Array.isArray(local.clearedStages) ? local.clearedStages : [];
  const cloudStages = Array.isArray(cloud.clearedStages) ? cloud.clearedStages : [];
  const mergedStages = Array.from(new Set([...localStages, ...cloudStages])).sort((a, b) => a - b);

  // Union wordStats dengan resolusi konflik deterministik
  const mergedWordStats: Record<string, WordRetentionStats> = {
    ...INITIAL_WORD_STATS,
    ...migratedLocalStats
  };

  for (const [wordId, cloudStat] of Object.entries(migratedCloudStats)) {
    const localStat = mergedWordStats[wordId];
    if (!localStat) {
      mergedWordStats[wordId] = cloudStat;
      continue;
    }

    // Resolusi: pilih entri dengan total attempts lebih tinggi atau timestamp lastReviewedAt lebih baru
    const pickCloud =
      cloudStat.totalAttempts > localStat.totalAttempts ||
      (cloudStat.totalAttempts === localStat.totalAttempts && cloudStat.lastReviewedAt > localStat.lastReviewedAt);

    const primary = pickCloud ? cloudStat : localStat;
    const secondary = pickCloud ? localStat : cloudStat;

    mergedWordStats[wordId] = {
      ...primary,
      wordId,
      // Flag kumulatif jika pernah dikuasai/ditandai di salah satu sisi
      isMastered: primary.isMastered || secondary.isMastered,
      isBookmarked: primary.isBookmarked || secondary.isBookmarked,
      isInspected: primary.isInspected || secondary.isInspected
    };
  }

  const latestStreakDate =
    (local.lastStreakDate || '') >= (cloud.lastStreakDate || '')
      ? local.lastStreakDate
      : cloud.lastStreakDate || local.lastStreakDate;

  // Merge readTopicStages deterministik
  const mergedReadStages: Record<string, number[]> = {
    ...(local.readTopicStages || {})
  };
  if (cloud && cloud.readTopicStages) {
    for (const [topicId, stages] of Object.entries(cloud.readTopicStages)) {
      const existing = mergedReadStages[topicId] || [];
      const incoming = Array.isArray(stages) ? stages : [];
      mergedReadStages[topicId] = Array.from(new Set([...existing, ...incoming])).sort((a, b) => a - b);
    }
  }

  return {
    dailyStreak: Math.max(local.dailyStreak || 0, cloud.dailyStreak || 0),
    lastStreakDate: latestStreakDate,
    clearedStages: mergedStages,
    currentStageId: local.currentStageId || cloud.currentStageId || 1,
    clustersMasteredCount: Math.max(
      local.clustersMasteredCount || 0,
      cloud.clustersMasteredCount || 0,
      mergedStages.length
    ),
    totalRunsAttempted: Math.max(local.totalRunsAttempted || 0, cloud.totalRunsAttempted || 0),
    totalFlawlessRuns: Math.max(local.totalFlawlessRuns || 0, cloud.totalFlawlessRuns || 0),
    soundEnabled: local.soundEnabled !== undefined ? local.soundEnabled : (cloud.soundEnabled ?? true),
    speechRate: local.speechRate || cloud.speechRate || 1.0,
    wordStats: mergedWordStats,
    readTopicStages: mergedReadStages
  };
}

export function markTopicStageRead(
  prevReadTopicStages: Record<string, number[]> = {},
  topicId: string,
  stageId: number
): Record<string, number[]> {
  const currentList = prevReadTopicStages[topicId] || [];
  if (currentList.includes(stageId)) return prevReadTopicStages;
  return {
    ...prevReadTopicStages,
    [topicId]: [...currentList, stageId].sort((a, b) => a - b)
  };
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
