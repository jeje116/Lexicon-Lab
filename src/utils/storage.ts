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
    if (!stat || typeof stat !== 'object') continue;
    const targetKey = LEGACY_ID_MAP[key] || key;
    result[targetKey] = {
      ...stat,
      wordId: targetKey
    };
  }

  return result;
}

/**
 * Normalisasi array ID kata dengan migrasi legacy key
 */
function normalizeWordIdList(ids?: string[]): string[] {
  if (!Array.isArray(ids)) return [];
  return Array.from(
    new Set(
      ids
        .filter((id): id is string => typeof id === 'string' && id.trim().length > 0)
        .map((id) => LEGACY_ID_MAP[id] || id)
    )
  ).sort();
}

/**
 * Sinkronisasi array inspectedWords & bookmarkedIds dengan wordStats
 */
export function syncDerivedProgressFields(data: UserProgressData): UserProgressData {
  const wordStats = migrateLegacyWordStats(data.wordStats || {});
  const inspectedSet = new Set<string>(normalizeWordIdList(data.inspectedWords));
  const bookmarkedSet = new Set<string>(normalizeWordIdList(data.bookmarkedIds));

  for (const [wordId, stat] of Object.entries(wordStats)) {
    if (stat.isInspected) inspectedSet.add(wordId);
    if (stat.isBookmarked) bookmarkedSet.add(wordId);
  }

  // Pastikan setiap ID pada array inspectedWords / bookmarkedIds juga tercermin di wordStats
  for (const wordId of inspectedSet) {
    if (!wordStats[wordId]) {
      wordStats[wordId] = {
        wordId,
        totalAttempts: 0,
        correctAttempts: 0,
        consecutiveStreak: 0,
        lastReviewedAt: 0,
        isMastered: false,
        isBookmarked: bookmarkedSet.has(wordId),
        isInspected: true
      };
    } else if (!wordStats[wordId].isInspected) {
      wordStats[wordId] = { ...wordStats[wordId], isInspected: true };
    }
  }

  for (const wordId of bookmarkedSet) {
    if (!wordStats[wordId]) {
      wordStats[wordId] = {
        wordId,
        totalAttempts: 0,
        correctAttempts: 0,
        consecutiveStreak: 0,
        lastReviewedAt: 0,
        isMastered: false,
        isBookmarked: true,
        isInspected: inspectedSet.has(wordId)
      };
    } else if (!wordStats[wordId].isBookmarked) {
      wordStats[wordId] = { ...wordStats[wordId], isBookmarked: true };
    }
  }

  const effectiveStreak = Math.max(data.dailyStreak || 0, data.streak || 0);
  const clearedStages = Array.isArray(data.clearedStages)
    ? Array.from(new Set(data.clearedStages)).sort((a, b) => a - b)
    : [];
  const clearedIndonesianStages = Array.isArray(data.clearedIndonesianStages)
    ? Array.from(new Set(data.clearedIndonesianStages)).sort((a, b) => a - b)
    : [];

  return {
    ...data,
    dailyStreak: effectiveStreak,
    streak: effectiveStreak,
    clustersMasteredCount: Math.max(data.clustersMasteredCount || 0, clearedStages.length),
    wordStats,
    inspectedWords: Array.from(inspectedSet).sort(),
    bookmarkedIds: Array.from(bookmarkedSet).sort(),
    clearedStages,
    clearedIndonesianStages,
    readTopicStages: data.readTopicStages || {}
  };
}

export function getDefaultUserData(): UserProgressData {
  return {
    dailyStreak: 1,
    streak: 1,
    lastStreakDate: new Date().toISOString().split('T')[0],
    clearedStages: [], // Stage yang sudah lulus 100% (20/20)
    currentStageId: 1, // Stage yang sedang dipelajari
    clustersMasteredCount: 0,
    totalRunsAttempted: 0,
    totalFlawlessRuns: 0,
    soundEnabled: true,
    speechRate: 1.0,
    wordStats: { ...INITIAL_WORD_STATS },
    inspectedWords: [],
    bookmarkedIds: [],
    readTopicStages: {},
    clearedIndonesianStages: [],
    lastUpdated: ''
  };
}

export function loadUserData(): UserProgressData {
  if (typeof window === 'undefined') return getDefaultUserData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultUserData();
    const parsed = JSON.parse(raw);
    const migratedStats = migrateLegacyWordStats(parsed.wordStats || {});

    return syncDerivedProgressFields({
      ...getDefaultUserData(),
      ...parsed,
      wordStats: {
        ...INITIAL_WORD_STATS,
        ...migratedStats
      },
      readTopicStages: parsed.readTopicStages || {}
    });
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return getDefaultUserData();
  }
}

export function saveUserData(data: UserProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    const normalized = syncDerivedProgressFields(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
}

function parseIsoTimestamp(iso?: string): number {
  if (!iso || typeof iso !== 'string') return 0;
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? 0 : ms;
}

/**
 * Resolusi konflik lintas perangkat (Mobile PWA <-> Desktop) berbasis timestamp & progres tertinggi.
 * - Membandingkan lastUpdated antara lokal dan cloud.
 * - Union clearedStages, clearedIndonesianStages, inspectedWords, bookmarkedIds, dan readTopicStages.
 * - Mengambil wordStats dengan timestamp/attempts terbaru dan menjaga streak tertinggi/terbaru.
 */
export function mergeProgressState(
  local: UserProgressData,
  cloud?: UserProgressData | null
): UserProgressData {
  if (!cloud) return local;

  const localTs = parseIsoTimestamp(local.lastUpdated);
  const cloudTs = parseIsoTimestamp(cloud.lastUpdated);
  const isCloudNewer = cloudTs > localTs;

  const migratedLocalStats = migrateLegacyWordStats(local.wordStats || {});
  const migratedCloudStats = migrateLegacyWordStats(cloud.wordStats || {});

  // 1. Union clearedStages (English Lexicon)
  const localStages = Array.isArray(local.clearedStages) ? local.clearedStages : [];
  const cloudStages = Array.isArray(cloud.clearedStages) ? cloud.clearedStages : [];
  const mergedStages = Array.from(new Set([...localStages, ...cloudStages])).sort((a, b) => a - b);

  // 2. Union clearedIndonesianStages (Kosa Kata Indonesia)
  const localIndoStages = Array.isArray(local.clearedIndonesianStages) ? local.clearedIndonesianStages : [];
  const cloudIndoStages = Array.isArray(cloud.clearedIndonesianStages) ? cloud.clearedIndonesianStages : [];
  const mergedIndoStages = Array.from(new Set([...localIndoStages, ...cloudIndoStages])).sort((a, b) => a - b);

  // 3. Union inspectedWords & bookmarkedIds (baik dari array eksplisit maupun dari wordStats)
  const inspectedSet = new Set<string>([
    ...normalizeWordIdList(local.inspectedWords),
    ...normalizeWordIdList(cloud.inspectedWords)
  ]);
  const bookmarkedSet = new Set<string>([
    ...normalizeWordIdList(local.bookmarkedIds),
    ...normalizeWordIdList(cloud.bookmarkedIds)
  ]);

  // 4. Merge wordStats berbasis timestamp lastReviewedAt terbaru & totalAttempts tertinggi
  const mergedWordStats: Record<string, WordRetentionStats> = {
    ...INITIAL_WORD_STATS,
    ...migratedLocalStats
  };

  for (const [wordId, cloudStat] of Object.entries(migratedCloudStats)) {
    const localStat = mergedWordStats[wordId];
    if (!localStat) {
      mergedWordStats[wordId] = { ...cloudStat, wordId };
      continue;
    }

    const pickCloud =
      cloudStat.lastReviewedAt > localStat.lastReviewedAt ||
      (cloudStat.lastReviewedAt === localStat.lastReviewedAt && cloudStat.totalAttempts > localStat.totalAttempts) ||
      (cloudStat.lastReviewedAt === localStat.lastReviewedAt &&
        cloudStat.totalAttempts === localStat.totalAttempts &&
        isCloudNewer);

    const primary = pickCloud ? cloudStat : localStat;
    const secondary = pickCloud ? localStat : cloudStat;

    mergedWordStats[wordId] = {
      ...primary,
      wordId,
      // Pertahankan jumlah percobaan kumulatif tertinggi bila timestamp berdekatan
      totalAttempts: Math.max(primary.totalAttempts, secondary.totalAttempts),
      correctAttempts: Math.max(primary.correctAttempts, secondary.correctAttempts),
      // Flag kumulatif jika pernah dikuasai/ditandai/ditelaah di salah satu perangkat
      isMastered: primary.isMastered || secondary.isMastered,
      isBookmarked: primary.isBookmarked || secondary.isBookmarked,
      isInspected: primary.isInspected || secondary.isInspected
    };
  }

  // Kumpulkan semua flag inspected & bookmarked dari wordStats ke dalam union set
  for (const [wordId, stat] of Object.entries(mergedWordStats)) {
    if (stat.isInspected) inspectedSet.add(wordId);
    if (stat.isBookmarked) bookmarkedSet.add(wordId);
  }

  // Pastikan setiap ID di inspectedSet / bookmarkedSet hadir di mergedWordStats
  for (const wordId of inspectedSet) {
    if (!mergedWordStats[wordId]) {
      mergedWordStats[wordId] = {
        wordId,
        totalAttempts: 0,
        correctAttempts: 0,
        consecutiveStreak: 0,
        lastReviewedAt: 0,
        isMastered: false,
        isBookmarked: bookmarkedSet.has(wordId),
        isInspected: true
      };
    } else {
      mergedWordStats[wordId] = { ...mergedWordStats[wordId], isInspected: true };
    }
  }

  for (const wordId of bookmarkedSet) {
    if (!mergedWordStats[wordId]) {
      mergedWordStats[wordId] = {
        wordId,
        totalAttempts: 0,
        correctAttempts: 0,
        consecutiveStreak: 0,
        lastReviewedAt: 0,
        isMastered: false,
        isBookmarked: true,
        isInspected: inspectedSet.has(wordId)
      };
    } else {
      mergedWordStats[wordId] = { ...mergedWordStats[wordId], isBookmarked: true };
    }
  }

  // 5. Streak & tanggal terbaru (ambil progres tertinggi / terbaru tanpa regresi)
  const localStreak = Math.max(local.dailyStreak || 0, local.streak || 0);
  const cloudStreak = Math.max(cloud.dailyStreak || 0, cloud.streak || 0);
  const mergedStreak = Math.max(localStreak, cloudStreak);

  const latestStreakDate =
    (local.lastStreakDate || '') >= (cloud.lastStreakDate || '')
      ? local.lastStreakDate
      : cloud.lastStreakDate || local.lastStreakDate;

  // 6. Merge readTopicStages deterministik
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

  // 7. Timestamp lastUpdated terbaru
  const latestUpdated =
    cloudTs >= localTs
      ? (cloud.lastUpdated || local.lastUpdated || new Date().toISOString())
      : (local.lastUpdated || cloud.lastUpdated || new Date().toISOString());

  // 8. Stage aktif: ikuti perangkat terbaru jika cloud lebih baru, selain itu pertahankan lokal
  const resolvedStageId = isCloudNewer
    ? (cloud.currentStageId || local.currentStageId || 1)
    : (local.currentStageId || cloud.currentStageId || 1);

  return {
    dailyStreak: mergedStreak,
    streak: mergedStreak,
    lastStreakDate: latestStreakDate,
    clearedStages: mergedStages,
    clearedIndonesianStages: mergedIndoStages,
    currentStageId: resolvedStageId,
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
    inspectedWords: Array.from(inspectedSet).sort(),
    bookmarkedIds: Array.from(bookmarkedSet).sort(),
    readTopicStages: mergedReadStages,
    lastUpdated: latestUpdated
  };
}

/**
 * Alias kompatibilitas mundur untuk mergeProgressState
 */
export const mergeUserProgress = mergeProgressState;

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
