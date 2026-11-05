import { WordItem, PartOfSpeech, CEFRLevel, UserProgressData } from '../types/lexicon';
import { ALL_WORDS_POOL } from '../data/mockLexicon';

const VOCAB_CACHE_KEY = 'lexicon_vocab_cache_v1';
const VOCAB_CACHE_TIME_KEY = 'lexicon_vocab_cache_time_v1';
const FETCH_TIMEOUT_MS = 8000;

export type VocabDataSource = 'connected' | 'cache' | 'mock';

export interface VocabFetchResult {
  words: WordItem[];
  source: VocabDataSource;
  error?: string;
}

/**
 * Validasi dan normalisasi objek data dari respons Google Apps Script
 */
function isValidWordItem(item: unknown): item is WordItem {
  if (!item || typeof item !== 'object') return false;
  const w = item as Record<string, unknown>;

  return (
    typeof w.id === 'string' &&
    typeof w.word === 'string' &&
    typeof w.translation === 'string' &&
    typeof w.stageId === 'number' &&
    Array.isArray(w.contextSentences)
  );
}

/**
 * Normalisasi kelas kata (part of speech), termasuk format gabungan seperti "Noun / Verb"
 */
export function normalizePartOfSpeech(rawPos: unknown, indonesianText: string = ''): PartOfSpeech {
  const str = String(rawPos || '').toLowerCase();
  const validPos: PartOfSpeech[] = ['verb', 'adjective', 'noun', 'adverb'];

  if (validPos.includes(str as PartOfSpeech)) {
    return str as PartOfSpeech;
  }

  // Jika format gabungan (misal "noun / verb" atau "adjective, noun")
  const tokens = str.split(/[\/,|]/).map((t) => t.trim());

  // Jika mengandung 'verb' dan definisi / arti bahasa Indonesia diawali awalan verba (me-, ber-, di-)
  if (tokens.includes('verb')) {
    const trimmedId = indonesianText.trim().toLowerCase();
    if (trimmedId.startsWith('me') || trimmedId.startsWith('ber') || trimmedId.startsWith('di')) {
      return 'verb';
    }
  }

  // Ambil token pertama yang valid
  for (const token of tokens) {
    if (validPos.includes(token as PartOfSpeech)) {
      return token as PartOfSpeech;
    }
  }

  return 'verb';
}

/**
 * Normalisasi data untuk memastikan kompatibilitas tipe yang ketat
 */
function normalizeWordItems(rawList: unknown[]): WordItem[] {
  return rawList
    .filter(isValidWordItem)
    .map((raw) => {
      const translationStr = String(raw.translation || '');
      const definitionStr = String(raw.definition || '');
      const partOfSpeech = normalizePartOfSpeech(raw.partOfSpeech, translationStr || definitionStr);

      const validCefr: CEFRLevel[] = ['B2', 'C1', 'C2'];
      const rawCefr = String(raw.cefr).toUpperCase() as CEFRLevel;
      const cefr: CEFRLevel = validCefr.includes(rawCefr) ? rawCefr : 'B2';

      return {
        id: String(raw.id),
        word: String(raw.word),
        phonetic: String(raw.phonetic || ''),
        partOfSpeech,
        cefr,
        translation: translationStr,
        definition: definitionStr,
        contextSentences: Array.isArray(raw.contextSentences) ? raw.contextSentences : [],
        stageId: Number(raw.stageId) || 1,
        stageTitle: String(raw.stageTitle || `Stage ${raw.stageId || 1}`),
        clusterId: Number(raw.stageId) || 1,
        clusterTitle: String(raw.stageTitle || `Stage ${raw.stageId || 1}`)
      };
    });
}

/**
 * Membaca data kosa kata yang tersimpan di localStorage
 */
function getCachedVocab(): WordItem[] | null {
  try {
    const raw = localStorage.getItem(VOCAB_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return normalizeWordItems(parsed);
    }
  } catch (e) {
    console.warn('[VocabService] Gagal membaca cache localStorage:', e);
  }
  return null;
}

/**
 * Menyimpan data kosa kata yang berhasil di-fetch ke localStorage
 */
function saveCachedVocab(words: WordItem[]): void {
  try {
    localStorage.setItem(VOCAB_CACHE_KEY, JSON.stringify(words));
    localStorage.setItem(VOCAB_CACHE_TIME_KEY, Date.now().toString());
  } catch (e) {
    console.warn('[VocabService] Gagal menyimpan cache ke localStorage:', e);
  }
}

/**
 * Fetch kosa kata dari Google Sheets Web App endpoint dengan graceful fallback ke cache / mock
 */
export async function fetchVocabularyData(): Promise<VocabFetchResult> {
  const apiUrl = import.meta.env.VITE_GOOGLE_SHEETS_API_URL?.trim();

  // Jika URL endpoint belum dikonfigurasi, gunakan cache atau mock bawaan
  if (!apiUrl) {
    const cached = getCachedVocab();
    if (cached && cached.length > 0) {
      return { words: cached, source: 'cache' };
    }
    return { words: ALL_WORDS_POOL, source: 'mock' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (!Array.isArray(json)) {
      throw new Error('Format data tidak valid: respons bukan berupa array');
    }

    const normalizedWords = normalizeWordItems(json);

    if (normalizedWords.length === 0) {
      throw new Error('Data Google Sheets kosong atau tidak memiliki kolom yang sesuai');
    }

    // Berhasil: simpan ke cache
    saveCachedVocab(normalizedWords);

    return {
      words: normalizedWords,
      source: 'connected'
    };

  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.warn('[VocabService] Fetch Google Sheets gagal, beralih ke fallback:', errorMessage);

    // Fallback 1: Coba gunakan data cache lokal jika ada
    const cached = getCachedVocab();
    if (cached && cached.length > 0) {
      return {
        words: cached,
        source: 'cache',
        error: errorMessage
      };
    }

    // Fallback 2: Gunakan data mock statis
    return {
      words: ALL_WORDS_POOL,
      source: 'mock',
      error: errorMessage
    };
  }
}

/**
 * Mengambil progres pengguna dari Google Sheets (tab UserProgress)
 */
export async function fetchCloudUserProgress(): Promise<UserProgressData | null> {
  const apiUrl = import.meta.env.VITE_GOOGLE_SHEETS_API_URL?.trim();
  if (!apiUrl) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const separator = apiUrl.includes('?') ? '&' : '?';
    const progressUrl = `${apiUrl}${separator}action=getProgress`;

    const response = await fetch(progressUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const json = await response.json();
    if (json && json.status === 'success' && json.data && typeof json.data === 'object') {
      return json.data as UserProgressData;
    }
    return null;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[VocabService] Fetch Cloud Progress gagal atau offline:', err);
    return null;
  }
}

/**
 * Menyimpan progres pengguna ke Google Sheets (tab UserProgress via doPost)
 * Menggunakan Content-Type: text/plain;charset=utf-8 untuk menghindari kendala CORS preflight di browser
 */
export async function pushCloudUserProgress(data: UserProgressData): Promise<boolean> {
  const apiUrl = import.meta.env.VITE_GOOGLE_SHEETS_API_URL?.trim();
  if (!apiUrl) return false;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[VocabService] Push Cloud Progress gagal (background sync):', err);
    return false;
  }
}

