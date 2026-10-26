import { WordItem, PartOfSpeech, CEFRLevel } from '../types/lexicon';
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
 * Normalisasi data untuk memastikan kompatibilitas tipe yang ketat
 */
function normalizeWordItems(rawList: unknown[]): WordItem[] {
  return rawList
    .filter(isValidWordItem)
    .map((raw) => {
      const validPos: PartOfSpeech[] = ['verb', 'adjective', 'noun', 'adverb'];
      const rawPos = String(raw.partOfSpeech).toLowerCase() as PartOfSpeech;
      const partOfSpeech: PartOfSpeech = validPos.includes(rawPos) ? rawPos : 'verb';

      const validCefr: CEFRLevel[] = ['B2', 'C1', 'C2'];
      const rawCefr = String(raw.cefr).toUpperCase() as CEFRLevel;
      const cefr: CEFRLevel = validCefr.includes(rawCefr) ? rawCefr : 'B2';

      return {
        id: String(raw.id),
        word: String(raw.word),
        phonetic: String(raw.phonetic || ''),
        partOfSpeech,
        cefr,
        translation: String(raw.translation),
        definition: String(raw.definition || ''),
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
