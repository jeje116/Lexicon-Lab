/**
 * Utilitas evaluasi kesamaan jawaban berbasis Levenshtein Similarity,
 * pemecahan sinonim (/, ;, ,), serta normalisasi tanda baca dan spasi.
 */

export interface AnswerSimilarityResult {
  isCorrect: boolean;
  similarity: number;
  isExact: boolean;
  matchedCandidate: string;
  expectedAnswer: string;
  feedbackMessage?: string;
}

export const DEFAULT_SIMILARITY_THRESHOLD = 0.8;

/**
 * Normalisasi teks: huruf kecil, hapus tanda baca (-, /, (, ), ., ,, ;, dll.),
 * rapikan spasi berlebih menjadi 1 spasi.
 */
export function normalizeWithSpaces(text: string): string {
  return String(text || '')
    .toLowerCase()
    .replace(/[-/().,;:'"!?]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalisasi teks tanpa spasi untuk menoleransi perbedaan spasi bahasa Indonesia
 * (contoh: "di mana" vs "dimana", "kerja sama" vs "kerjasama").
 */
export function normalizeWithoutSpaces(text: string): string {
  return normalizeWithSpaces(text).replace(/\s+/g, '');
}

/**
 * Menghitung Levenshtein Edit Distance antara string a dan b.
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Pastikan b lebih pendek untuk efisiensi memori O(min(m, n))
  let s1 = a;
  let s2 = b;
  if (s1.length < s2.length) {
    s1 = b;
    s2 = a;
  }

  let prevRow = new Array<number>(s2.length + 1);
  let currRow = new Array<number>(s2.length + 1);

  for (let j = 0; j <= s2.length; j++) {
    prevRow[j] = j;
  }

  for (let i = 1; i <= s1.length; i++) {
    currRow[0] = i;
    const ch1 = s1.charCodeAt(i - 1);

    for (let j = 1; j <= s2.length; j++) {
      const cost = ch1 === s2.charCodeAt(j - 1) ? 0 : 1;
      const deletion = prevRow[j] + 1;
      const insertion = currRow[j - 1] + 1;
      const substitution = prevRow[j - 1] + cost;
      currRow[j] = Math.min(deletion, insertion, substitution);
    }

    const temp = prevRow;
    prevRow = currRow;
    currRow = temp;
  }

  return prevRow[s2.length];
}

/**
 * Menghitung rasio kemiripan karakter [0.0 .. 1.0]:
 * 1 - (levenshteinDistance(a, b) / Math.max(a.length, b.length))
 */
export function calculateLevenshteinSimilarity(a: string, b: string): number {
  if (!a && !b) return 1.0;
  if (!a || !b) return 0.0;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshteinDistance(a, b);
  return 1 - dist / maxLen;
}

/**
 * Memecah expectedAnswer berdasarkan delimiter '/', ';', atau ',' menjadi
 * kandidat jawaban valid (termasuk versi gabungan utuh).
 * Contoh: "Ada di mana-mana / Merajalela"
 *   -> ["Ada di mana-mana", "Merajalela", "Ada di mana-mana / Merajalela"]
 */
export function extractSynonymCandidates(expectedAnswer: string): string[] {
  const trimmed = String(expectedAnswer || '').trim();
  if (!trimmed) return [];

  const parts = trimmed
    .split(/[/;,]/)
    .map((part) => part.trim())
    .filter(Boolean);

  const candidates = new Set<string>();
  parts.forEach((part) => candidates.add(part));
  candidates.add(trimmed);

  return Array.from(candidates);
}

/**
 * Mengevaluasi kemiripan jawaban pengguna terhadap jawaban yang diharapkan.
 * - Normalisasi tanda baca & spasi (versi spasi normal + tanpa spasi)
 * - Pemecahan sinonim (/, ;, ,)
 * - Levenshtein Similarity dengan ambang batas default >= 0.80 (80%)
 * - Jika 0.80 <= similarity < 1.0, menyertakan feedbackMessage lembut
 */
export function evaluateAnswerSimilarity(
  userInput: string,
  expectedAnswer: string,
  threshold: number = DEFAULT_SIMILARITY_THRESHOLD
): AnswerSimilarityResult {
  const rawExpected = String(expectedAnswer || '').trim();
  const inputSpaced = normalizeWithSpaces(userInput);
  const inputNoSpace = normalizeWithoutSpaces(userInput);

  if (!inputSpaced || !rawExpected) {
    return {
      isCorrect: false,
      similarity: 0,
      isExact: false,
      matchedCandidate: '',
      expectedAnswer: rawExpected
    };
  }

  const candidates = extractSynonymCandidates(rawExpected);
  let bestSimilarity = 0;
  let bestCandidate = rawExpected;

  for (const candidate of candidates) {
    const candSpaced = normalizeWithSpaces(candidate);
    const candNoSpace = normalizeWithoutSpaces(candidate);
    if (!candSpaced) continue;

    const simSpaced = calculateLevenshteinSimilarity(inputSpaced, candSpaced);
    const simNoSpace = calculateLevenshteinSimilarity(inputNoSpace, candNoSpace);
    const candidateSim = Math.max(simSpaced, simNoSpace);

    if (candidateSim > bestSimilarity) {
      bestSimilarity = candidateSim;
      bestCandidate = candidate;
    }

    if (bestSimilarity === 1.0) {
      break;
    }
  }

  const isCorrect = bestSimilarity >= threshold;
  const isExact = bestSimilarity === 1.0;
  const feedbackMessage =
    isCorrect && bestSimilarity < 1.0
      ? `Tepat! (Ejaan baku lengkap: ${rawExpected})`
      : undefined;

  return {
    isCorrect,
    similarity: bestSimilarity,
    isExact,
    matchedCandidate: bestCandidate,
    expectedAnswer: rawExpected,
    feedbackMessage
  };
}
