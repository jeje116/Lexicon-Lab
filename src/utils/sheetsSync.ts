import { UserProgressData } from '../types/lexicon';
import { mergeProgressState, syncDerivedProgressFields } from './storage';

const PENDING_SYNC_KEY = 'lexicon_pending_sync_v1';
const LAST_SYNCED_AT_KEY = 'lexicon_last_synced_at_v1';
const GET_TIMEOUT_MS = 10000;
const POST_TIMEOUT_MS = 12000;

export type ProgressSyncState =
  | 'synced'
  | 'syncing'
  | 'offline'
  | 'error'
  | 'needs_gas_update'
  | 'unconfigured';

export interface SheetsSyncOptions {
  apiUrl?: string;
  fetchFn?: typeof fetch;
  forcePush?: boolean;
}

export interface PullProgressResult {
  data: UserProgressData | null;
  status: 'synced' | 'empty' | 'offline' | 'error' | 'needs_gas_update' | 'unconfigured';
  updatedAt?: string;
  error?: string;
}

export interface PushProgressResult {
  ok: boolean;
  status: 'synced' | 'offline' | 'error' | 'needs_gas_update' | 'unconfigured';
  error?: string;
}

export interface BidirectionalSyncResult {
  merged: UserProgressData;
  status: ProgressSyncState;
  didChangeLocal: boolean;
  pushedToCloud: boolean;
  error?: string;
}

/**
 * WAJIB menggunakan ekspresi literal langsung `import.meta.env.VITE_GOOGLE_SHEETS_API_URL`
 * agar Vite static bundler replacement selalu meng-inline URL saat `vite build` produksi!
 * (JANGAN di-assign ke variabel perantara seperti `const meta = import.meta`.)
 */
function getSheetsApiUrl(overrideUrl?: string): string {
  if (typeof overrideUrl === 'string') {
    return overrideUrl.trim();
  }
  try {
    return (import.meta.env.VITE_GOOGLE_SHEETS_API_URL || '').trim();
  } catch {
    return '';
  }
}

export function isSheetsConfigured(overrideUrl?: string): boolean {
  return Boolean(getSheetsApiUrl(overrideUrl));
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
 * Membandingkan isi progres bermakna secara deterministik (mengabaikan urutan key objek)
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
 * Helper aman untuk membaca body JSON dari respons GAS (karena GAS sering mengembalikan HTTP 200 HTML saat error)
 */
async function parseGasJsonResponse(
  response: Response
): Promise<{ parsed: unknown | null; rawText: string; isHtml: boolean }> {
  const rawText = await response.text();
  const trimmed = rawText.trim();
  const isHtml = /^<!doctype html|^<html/i.test(trimmed);

  if (!trimmed || isHtml) {
    return { parsed: null, rawText: trimmed, isHtml };
  }

  try {
    return { parsed: JSON.parse(trimmed), rawText: trimmed, isHtml: false };
  } catch {
    return { parsed: null, rawText: trimmed, isHtml: false };
  }
}

/**
 * Menarik progres terbaru dari Google Sheets (tab UserProgress via ?action=getProgress).
 * - Bebas custom header agar murni CORS simple GET request (tanpa OPTIONS preflight)
 * - Cache-busting melalui query param `&_t=...`
 * - Timeout tegas 10 detik mencakup fetch DAN pembacaan body agar tidak pernah hang
 * - Mendukung payload `data` berupa object maupun JSON string (double-stringified)
 */
export async function pullProgressFromSheets(options?: SheetsSyncOptions): Promise<PullProgressResult> {
  const apiUrl = getSheetsApiUrl(options?.apiUrl);
  if (!apiUrl) {
    return { data: null, status: 'unconfigured' };
  }

  const fetchImpl = options?.fetchFn || fetch;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GET_TIMEOUT_MS);

  try {
    const separator = apiUrl.includes('?') ? '&' : '?';
    const progressUrl = `${apiUrl}${separator}action=getProgress&_t=${Date.now()}`;

    const response = await fetchImpl(progressUrl, {
      method: 'GET',
      cache: 'no-store',
      redirect: 'follow',
      signal: controller.signal
    });

    if (!response.ok) {
      return {
        data: null,
        status: 'error',
        error: `HTTP ${response.status} saat mengambil progres dari Google Sheets`
      };
    }

    const { parsed, rawText, isHtml } = await parseGasJsonResponse(response);

    if (isHtml || parsed === null) {
      const missingFn = /Script function not found|doGet/i.test(rawText);
      return {
        data: null,
        status: missingFn ? 'needs_gas_update' : 'error',
        error: missingFn
          ? 'Google Apps Script belum memiliki fungsi doGet terbaru. Deploy ulang Code.gs ke New Version.'
          : 'Respons GAS bukan JSON valid (periksa akses Web App "Anyone" atau deploy ulang Code.gs).'
      };
    }

    // Jika GAS lama tidak mengenali action=getProgress, ia jatuh ke default Vocabulary Array
    if (Array.isArray(parsed)) {
      return {
        data: null,
        status: 'needs_gas_update',
        error:
          'Endpoint GAS belum mendukung action=getProgress (mengembalikan array Vocabulary). Salin Code.gs terbaru lalu Manage Deployments -> New Version.'
      };
    }

    if (typeof parsed !== 'object') {
      return {
        data: null,
        status: 'error',
        error: 'Format respons getProgress dari Google Sheets tidak valid.'
      };
    }

    const payload = parsed as Record<string, unknown>;

    if (payload.status === 'error') {
      return {
        data: null,
        status: 'error',
        error: String(payload.message || 'Google Apps Script mengembalikan status error pada getProgress.')
      };
    }

    if (payload.status === 'empty') {
      return { data: null, status: 'empty' };
    }

    if (payload.status === 'success') {
      // Dukung `payload.data` baik berupa object langsung maupun JSON string
      let rawData: unknown = payload.data;
      if (typeof rawData === 'string' && rawData.trim()) {
        try {
          rawData = JSON.parse(rawData);
        } catch {
          return {
            data: null,
            status: 'error',
            error: 'Data JSON di tab UserProgress tidak valid (gagal parse string JSON).'
          };
        }
      }

      if (rawData && typeof rawData === 'object' && !Array.isArray(rawData)) {
        const cloudData = rawData as UserProgressData;
        const resolvedLastUpdated =
          cloudData.lastUpdated ||
          (typeof payload.updatedAt === 'string' && payload.updatedAt ? payload.updatedAt : undefined);

        return {
          data: syncDerivedProgressFields({
            ...cloudData,
            lastUpdated: resolvedLastUpdated
          }),
          status: 'synced',
          updatedAt: resolvedLastUpdated
        };
      }
    }

    return {
      data: null,
      status: 'needs_gas_update',
      error: `Respons getProgress tidak dikenali (status: ${String(payload.status || 'undefined')}). Perbarui deployment Code.gs.`
    };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.warn('[SheetsSync] Gagal pullProgressFromSheets (offline/timeout):', errMsg);
    return {
      data: null,
      status: 'offline',
      error: `Tidak dapat menghubungi Google Sheets (${errMsg})`
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Mengirim progres lengkap ke Google Sheets via POST (action=saveProgress).
 * - WAJIB menggunakan Content-Type: text/plain;charset=utf-8 (tanpa CORS preflight OPTIONS)
 * - WAJIB tanpa mode: 'no-cors' dengan redirect: 'follow' agar respons JSON aktual terbaca
 * - Timeout tegas 12 detik mencakup fetch DAN pembacaan body
 * - Hanya menandai sukses jika GAS mengembalikan JSON { status: 'success' }
 */
export async function pushProgressToSheets(
  data: UserProgressData,
  options?: SheetsSyncOptions
): Promise<PushProgressResult> {
  const apiUrl = getSheetsApiUrl(options?.apiUrl);
  if (!apiUrl) {
    return { ok: false, status: 'unconfigured' };
  }

  const fetchImpl = options?.fetchFn || fetch;
  const normalized = syncDerivedProgressFields({
    ...data,
    lastUpdated: data.lastUpdated || new Date().toISOString()
  });

  const payload = {
    action: 'saveProgress',
    ...normalized
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), POST_TIMEOUT_MS);

  try {
    const separator = apiUrl.includes('?') ? '&' : '?';
    const saveUrl = `${apiUrl}${separator}action=saveProgress`;

    const response = await fetchImpl(saveUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    if (!response.ok) {
      setPendingSync(true);
      return {
        ok: false,
        status: 'error',
        error: `HTTP ${response.status} saat menyimpan progres ke Google Sheets`
      };
    }

    const { parsed, rawText, isHtml } = await parseGasJsonResponse(response);

    if (isHtml || !parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      setPendingSync(true);
      const missingDoPost = /Script function not found|doPost/i.test(rawText);
      return {
        ok: false,
        status: missingDoPost ? 'needs_gas_update' : 'error',
        error: missingDoPost
          ? 'Google Apps Script belum mendukung doPost/saveProgress. Salin Code.gs terbaru lalu Manage Deployments -> New Version.'
          : 'Respons saveProgress dari GAS bukan JSON valid (periksa deployment Web App).'
      };
    }

    const json = parsed as Record<string, unknown>;
    if (json.status !== 'success') {
      setPendingSync(true);
      return {
        ok: false,
        status: 'error',
        error: String(json.message || 'Gagal menyimpan progres ke tab UserProgress Google Sheets.')
      };
    }

    setPendingSync(false);
    setLastSyncedAt(new Date().toISOString());
    return { ok: true, status: 'synced' };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.warn('[SheetsSync] Gagal pushProgressToSheets, masuk retry queue (pendingSync=true):', errMsg);
    setPendingSync(true);
    return {
      ok: false,
      status: 'offline',
      error: `Koneksi gagal saat menyimpan progres (${errMsg})`
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Sinkronisasi 2-arah penuh:
 * 1. Pull progres dari tab UserProgress (?action=getProgress).
 * 2. Jika endpoint gagal / belum mendukung getProgress, JANGAN laporkan 'synced'.
 * 3. Merge progres lokal & cloud via mergeProgressState.
 * 4. Jika hasil merge lebih kaya dari cloud (contoh: Mobile PWA punya clearedStages [1, 2]
 *    sedangkan cloud masih [] / kosong), otomatis dorong (push) ke Google Sheets!
 */
export async function syncProgressBidirectional(
  localData: UserProgressData,
  options?: SheetsSyncOptions
): Promise<BidirectionalSyncResult> {
  if (!isSheetsConfigured(options?.apiUrl)) {
    return {
      merged: localData,
      status: 'unconfigured',
      didChangeLocal: false,
      pushedToCloud: false
    };
  }

  const pullResult = await pullProgressFromSheets(options);

  if (
    pullResult.status === 'offline' ||
    pullResult.status === 'error' ||
    pullResult.status === 'needs_gas_update'
  ) {
    if (options?.forcePush && hasLocalLearningActivity(localData)) {
      setPendingSync(true);
    }
    return {
      merged: localData,
      status: pullResult.status,
      didChangeLocal: false,
      pushedToCloud: false,
      error: pullResult.error
    };
  }

  const cloudData = pullResult.data;
  const merged = cloudData ? mergeProgressState(localData, cloudData) : syncDerivedProgressFields(localData);
  const didChangeLocal =
    hasMeaningfulProgressDiff(localData, merged) ||
    localData.currentStageId !== merged.currentStageId;
  const localHasActivity = hasLocalLearningActivity(merged);

  // Deteksi apakah hasil gabungan lebih kaya dari cloud (mis. Mobile PWA clearedStages [1, 2] > cloud [])
  const mergedRicherThanCloud =
    (cloudData === null && localHasActivity) ||
    (cloudData !== null && hasMeaningfulProgressDiff(cloudData, merged));

  const shouldPushToCloud =
    mergedRicherThanCloud ||
    (hasPendingSync() && localHasActivity) ||
    (Boolean(options?.forcePush) && localHasActivity);

  if (shouldPushToCloud) {
    const pushRes = await pushProgressToSheets(merged, options);
    return {
      merged,
      status: pushRes.ok ? 'synced' : pushRes.status,
      didChangeLocal,
      pushedToCloud: pushRes.ok,
      error: pushRes.error
    };
  }

  // Pull berhasil ('synced' atau 'empty' terkonfirmasi dari Code.gs) dan tidak ada data baru yang perlu di-push
  setPendingSync(false);
  setLastSyncedAt(new Date().toISOString());
  return {
    merged,
    status: 'synced',
    didChangeLocal,
    pushedToCloud: false
  };
}
