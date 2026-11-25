import { UserProgressData } from '../types/lexicon';
import { mergeProgressState, syncDerivedProgressFields } from './storage';

const PENDING_SYNC_KEY = 'lexicon_pending_sync_v1';
const LAST_SYNCED_AT_KEY = 'lexicon_last_synced_at_v1';
const FETCH_TIMEOUT_MS = 10000;

export type ProgressSyncState = 'synced' | 'syncing' | 'offline' | 'unconfigured';

export interface PullProgressResult {
  data: UserProgressData | null;
  status: 'synced' | 'empty' | 'offline' | 'unconfigured';
  updatedAt?: string;
}

export interface PushProgressResult {
  ok: boolean;
  status: 'synced' | 'offline' | 'unconfigured';
}

export interface BidirectionalSyncResult {
  merged: UserProgressData;
  status: ProgressSyncState;
  didChangeLocal: boolean;
  pushedToCloud: boolean;
}

function getSheetsApiUrl(): string {
  try {
    const meta = import.meta as unknown as { env?: Record<string, string | undefined> };
    return meta?.env?.VITE_GOOGLE_SHEETS_API_URL?.trim() || '';
  } catch {
    return '';
  }
}

export function isSheetsConfigured(): boolean {
  return Boolean(getSheetsApiUrl());
}

export function hasPendingSync(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(PENDING_SYNC_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setPendingSync(pending: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (pending) {
      localStorage.setItem(PENDING_SYNC_KEY, 'true');
    } else {
      localStorage.removeItem(PENDING_SYNC_KEY);
    }
  } catch (err) {
    console.warn('[SheetsSync] Gagal memperbarui flag pendingSync:', err);
  }
}

export function getLastSyncedAt(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(LAST_SYNCED_AT_KEY);
  } catch {
    return null;
  }
}

function setLastSyncedAt(iso: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LAST_SYNCED_AT_KEY, iso);
  } catch {
    // Abaikan error kuota storage
  }
}

/**
 * Membandingkan isi progres bermakna (mengabaikan perbedaan kecil yang tidak signifikan)
 */
export function hasMeaningfulProgressDiff(a?: UserProgressData | null, b?: UserProgressData | null): boolean {
  if (!a && !b) return false;
  if (!a || !b) return true;

  const normA = syncDerivedProgressFields(a);
  const normB = syncDerivedProgressFields(b);

  const sortObjectKeys = <T,>(obj: Record<string, T>): Record<string, T> => {
    const sorted: Record<string, T> = {};
    for (const k of Object.keys(obj).sort()) {
      sorted[k] = obj[k];
    }
    return sorted;
  };

  const pickCore = (d: UserProgressData) => ({
    dailyStreak: d.dailyStreak,
    lastStreakDate: d.lastStreakDate,
    clearedStages: d.clearedStages,
    clearedIndonesianStages: d.clearedIndonesianStages || [],
    clustersMasteredCount: d.clustersMasteredCount,
    totalRunsAttempted: d.totalRunsAttempted,
    totalFlawlessRuns: d.totalFlawlessRuns,
    inspectedWords: d.inspectedWords || [],
    bookmarkedIds: d.bookmarkedIds || [],
    readTopicStages: sortObjectKeys(d.readTopicStages || {}),
    wordStats: sortObjectKeys(d.wordStats || {})
  });

  return JSON.stringify(pickCore(normA)) !== JSON.stringify(pickCore(normB));
}

/**
 * Mengecek apakah profil lokal memiliki aktivitas belajar nyata (bukan state kosong bawaan)
 */
export function hasLocalLearningActivity(data: UserProgressData): boolean {
  const norm = syncDerivedProgressFields(data);
  const hasStages = norm.clearedStages.length > 0 || (norm.clearedIndonesianStages?.length || 0) > 0;
  const hasWords =
    Object.keys(norm.wordStats || {}).length > 0 ||
    (norm.inspectedWords?.length || 0) > 0 ||
    (norm.bookmarkedIds?.length || 0) > 0;
  const hasReads = Object.values(norm.readTopicStages || {}).some((arr) => arr.length > 0);
  const hasRuns = (norm.totalRunsAttempted || 0) > 0 || (norm.dailyStreak || 1) > 1;
  return hasStages || hasWords || hasReads || hasRuns;
}

/**
 * Menarik progres terbaru dari Google Sheets (tab UserProgress via ?action=getProgress)
 * Dilengkapi cache-busting agar browser mobile/desktop tidak mengembalikan data basi.
 */
export async function pullProgressFromSheets(): Promise<PullProgressResult> {
  const apiUrl = getSheetsApiUrl();
  if (!apiUrl) {
    return { data: null, status: 'unconfigured' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const separator = apiUrl.includes('?') ? '&' : '?';
    const progressUrl = `${apiUrl}${separator}action=getProgress&_t=${Date.now()}`;

    const response = await fetch(progressUrl, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return { data: null, status: 'offline' };
    }

    const json = await response.json();
    if (json && json.status === 'success' && json.data && typeof json.data === 'object') {
      const cloudData = json.data as UserProgressData;
      const resolvedLastUpdated =
        cloudData.lastUpdated ||
        (typeof json.updatedAt === 'string' && json.updatedAt ? json.updatedAt : undefined);

      return {
        data: syncDerivedProgressFields({
          ...cloudData,
          lastUpdated: resolvedLastUpdated
        }),
        status: 'synced',
        updatedAt: resolvedLastUpdated
      };
    }

    if (json && json.status === 'empty') {
      return { data: null, status: 'empty' };
    }

    return { data: null, status: 'empty' };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[SheetsSync] Gagal pullProgressFromSheets (offline/timeout):', err);
    return { data: null, status: 'offline' };
  }
}

/**
 * Mengirim progres lengkap ke Google Sheets (action: 'saveProgress').
 * Jika gagal (offline/jaringan lambat), otomatis menandai pendingSync = true untuk retry.
 */
export async function pushProgressToSheets(data: UserProgressData): Promise<PushProgressResult> {
  const apiUrl = getSheetsApiUrl();
  if (!apiUrl) {
    return { ok: false, status: 'unconfigured' };
  }

  const normalized = syncDerivedProgressFields({
    ...data,
    lastUpdated: data.lastUpdated || new Date().toISOString()
  });

  const payload = {
    action: 'saveProgress',
    ...normalized
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      setPendingSync(true);
      return { ok: false, status: 'offline' };
    }

    setPendingSync(false);
    setLastSyncedAt(new Date().toISOString());
    return { ok: true, status: 'synced' };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[SheetsSync] Gagal pushProgressToSheets, masuk retry queue (pendingSync=true):', err);
    setPendingSync(true);
    return { ok: false, status: 'offline' };
  }
}

/**
 * Sinkronisasi 2-arah penuh (Pull -> Smart Merge -> Push jika ada data lokal lebih baru atau pendingSync).
 */
export async function syncProgressBidirectional(
  localData: UserProgressData,
  options?: { forcePush?: boolean }
): Promise<BidirectionalSyncResult> {
  if (!isSheetsConfigured()) {
    return {
      merged: localData,
      status: 'unconfigured',
      didChangeLocal: false,
      pushedToCloud: false
    };
  }

  const pullResult = await pullProgressFromSheets();

  if (pullResult.status === 'offline') {
    if (options?.forcePush) {
      setPendingSync(true);
    }
    return {
      merged: localData,
      status: 'offline',
      didChangeLocal: false,
      pushedToCloud: false
    };
  }

  const cloudData = pullResult.data;
  const merged = cloudData ? mergeProgressState(localData, cloudData) : localData;
  const didChangeLocal = hasMeaningfulProgressDiff(localData, merged);

  const cloudNeedsUpdate =
    Boolean(options?.forcePush) ||
    hasPendingSync() ||
    (!cloudData && hasLocalLearningActivity(merged)) ||
    (cloudData !== null && hasMeaningfulProgressDiff(cloudData, merged));

  if (cloudNeedsUpdate) {
    const pushRes = await pushProgressToSheets(merged);
    return {
      merged,
      status: pushRes.ok ? 'synced' : 'offline',
      didChangeLocal,
      pushedToCloud: pushRes.ok
    };
  }

  setPendingSync(false);
  setLastSyncedAt(new Date().toISOString());
  return {
    merged,
    status: 'synced',
    didChangeLocal,
    pushedToCloud: false
  };
}
