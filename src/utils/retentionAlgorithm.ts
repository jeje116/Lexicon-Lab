import { WordItem, WordRetentionStats, MemoryTier, QuizQuestion, QuizQuestionOption } from '../types/lexicon';

/**
 * Menghitung persentase akurasi historis (0 - 100)
 */
export function calculateAccuracy(stats?: WordRetentionStats): number {
  if (!stats || stats.totalAttempts === 0) return 0;
  return Math.round((stats.correctAttempts / stats.totalAttempts) * 100);
}

/**
 * Formula Retensi Spaced Repetition (Ebbinghaus):
 * R = e^(-t / S)
 * t = hari sejak ulasan terakhir
 * S = faktor stabilitas memori berdasarkan streak berturut-turut
 */
export function calculateRetentionStrength(stats?: WordRetentionStats): number {
  if (!stats || stats.lastReviewedAt === 0) return 30; // Nilai dasar belum diulas

  const daysElapsed = Math.max(0, (Date.now() - stats.lastReviewedAt) / (1000 * 60 * 60 * 24));
  const stability = Math.max(1, (stats.consecutiveStreak + 1) * 2.2);
  const accuracyMultiplier = stats.totalAttempts > 0 ? (stats.correctAttempts / stats.totalAttempts) : 0.5;

  const retention = Math.exp(-daysElapsed / stability) * 100 * (0.4 + 0.6 * accuracyMultiplier);
  return Math.min(100, Math.max(5, Math.round(retention)));
}

/**
 * Klasifikasi Tier Memori:
 * KRITIS (<40%), RENTAN (40-69%), AKTIF (70-89%), TERSIMPAN (90-100%)
 */
export function getMemoryTier(stats?: WordRetentionStats): MemoryTier {
  if (!stats || stats.totalAttempts === 0) return 'VULNERABLE';
  const retention = calculateRetentionStrength(stats);
  const accuracy = calculateAccuracy(stats);

  if (accuracy < 45 || retention < 40) return 'CRITICAL';
  if (retention < 70 || accuracy < 70) return 'VULNERABLE';
  if (retention < 90 || stats.consecutiveStreak < 4) return 'CONSOLIDATING';
  return 'CRYSTALLIZED';
}

export function getMemoryTierLabelIndonesian(tier: MemoryTier): string {
  switch (tier) {
    case 'CRITICAL': return 'KRITIS';
    case 'VULNERABLE': return 'RENTAN';
    case 'CONSOLIDATING': return 'AKTIF';
    case 'CRYSTALLIZED': return 'TERSIMPAN';
  }
}

/**
 * Menghitung bobot undian untuk Tes Retensi Kata Kerja:
 * Bobot tinggi = lebih sering muncul dalam tes.
 */
export function calculateVerbDrawWeight(stats?: WordRetentionStats): {
  weight: number;
  priorityLabel: 'KRITIS' | 'TINGGI' | 'SEDANG' | 'STABIL';
} {
  if (!stats || stats.totalAttempts === 0) {
    return { weight: 3.2, priorityLabel: 'KRITIS' };
  }

  const accuracy = stats.correctAttempts / stats.totalAttempts;
  const failRate = 1 - accuracy;
  const daysSince = Math.min(14, (Date.now() - stats.lastReviewedAt) / (1000 * 60 * 60 * 24));
  const decayFactor = daysSince / 7;

  let weight = (failRate * 4.0) + (decayFactor * 1.5) + (stats.consecutiveStreak === 0 ? 1.5 : 0);

  if (stats.totalAttempts < 3) weight += 1.0;

  if (stats.consecutiveStreak >= 5) {
    weight = Math.max(0.3, weight * 0.35);
  }

  const finalWeight = Math.round(Math.max(0.2, weight) * 10) / 10;

  let priorityLabel: 'KRITIS' | 'TINGGI' | 'SEDANG' | 'STABIL' = 'SEDANG';
  if (finalWeight >= 3.5) priorityLabel = 'KRITIS';
  else if (finalWeight >= 2.2) priorityLabel = 'TINGGI';
  else if (finalWeight <= 0.8) priorityLabel = 'STABIL';

  return { weight: finalWeight, priorityLabel };
}

/**
 * Sampel kata kerja acak terbobot dari stage yang sudah selesai (SRS)
 */
export function sampleWeightedVerbs(
  verbs: WordItem[],
  statsMap: Record<string, WordRetentionStats>,
  count: number = 5
): WordItem[] {
  if (verbs.length <= count) return [...verbs];

  const pool = [...verbs];
  const selected: WordItem[] = [];

  for (let i = 0; i < count; i++) {
    if (pool.length === 0) break;

    const weights = pool.map(v => calculateVerbDrawWeight(statsMap[v.id]).weight);
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let randomVal = Math.random() * totalWeight;

    let chosenIdx = 0;
    for (let j = 0; j < pool.length; j++) {
      randomVal -= weights[j];
      if (randomVal <= 0) {
        chosenIdx = j;
        break;
      }
    }

    selected.push(pool[chosenIdx]);
    pool.splice(chosenIdx, 1);
  }

  return selected;
}

/**
 * Pengacakan array algoritma Fisher-Yates
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Mengekstrak daftar kemungkinan jawaban arti bahasa Indonesia yang valid
 * Contoh: "Asal-asalan / Sekadar formalitas" -> ["asal-asalan", "sekadar formalitas", "asal asalan", "formalitas"]
 */
export function extractAcceptedAnswers(rawTranslation: string): string[] {
  const cleaned = rawTranslation.toLowerCase();
  const rawParts = cleaned.split(/[/,;]/).map(p => p.trim()).filter(Boolean);
  
  const results = new Set<string>();

  // Masukkan string penuh
  results.add(cleaned.trim());

  rawParts.forEach(part => {
    results.add(part);
    
    // Variasi tanda hubung: misal "asal-asalan" <-> "asal asalan"
    if (part.includes('-')) {
      results.add(part.replace(/-/g, ' '));
    }

    // Ekstraksi kata-kata kunci utama jika lebih dari 1 kata
    const subWords = part.split(/\s+/).filter(w => w.length >= 4);
    subWords.forEach(sw => {
      // Hapus kata sambung umum
      if (!['atau', 'yang', 'pada', 'dari', 'untuk', 'serta', 'oleh'].includes(sw)) {
        results.add(sw);
      }
    });
  });

  return Array.from(results);
}

/**
 * Pencocokan ketikan terjemahan 100% presisi (Exact Match, case-insensitive & auto-trim)
 * Mendukung pencocokan teks penuh atau bagian alternatif yang dipisahkan garis miring (/), koma (,), atau titik koma (;)
 * Serta normalisasi tanda hubung ("asal-asalan" <-> "asal asalan")
 */
export function isExactTranslationMatch(userInput: string, targetTranslation: string): boolean {
  const cleanInput = userInput.trim().toLowerCase();
  const cleanTarget = targetTranslation.trim().toLowerCase();
  if (!cleanInput || !cleanTarget) return false;

  // 1. Cocok persis 100% dengan keseluruhan string target
  if (cleanInput === cleanTarget) return true;

  // 2. Normalisasi tanda hubung untuk target utama
  if (cleanInput.replace(/-/g, ' ') === cleanTarget.replace(/-/g, ' ')) return true;

  // 3. Jika target memiliki pemisah alternatif (seperti 'mengaburkan / memperkeruh')
  const parts = cleanTarget.split(/[/,;]/).map(p => p.trim()).filter(Boolean);
  if (parts.length > 1) {
    for (const part of parts) {
      if (cleanInput === part) return true;
      if (cleanInput.replace(/-/g, ' ') === part.replace(/-/g, ' ')) return true;
    }
  }

  return false;
}

/**
 * Memeriksa kecocokan ketikan pengguna dengan arti bahasa Indonesia (dengan toleransi)
 */
export function isTranslationMatch(
  userInput: string,
  acceptedAnswers: string[] = [],
  rawTranslation: string = ''
): boolean {
  const cleanInput = userInput.trim().toLowerCase().replace(/[^\w\s-]/g, '');
  if (!cleanInput) return false;

  const normalizedInputNoHyphen = cleanInput.replace(/-/g, ' ');

  // Periksa langsung ke accepted answers
  for (const ans of acceptedAnswers) {
    const cleanAns = ans.trim().toLowerCase().replace(/[^\w\s-]/g, '');
    const cleanAnsNoHyphen = cleanAns.replace(/-/g, ' ');

    if (cleanInput === cleanAns || normalizedInputNoHyphen === cleanAnsNoHyphen) {
      return true;
    }

    // Jika input cukup panjang (>= 4 karakter), cek apakah mencocokkan kata kunci
    if (cleanInput.length >= 4) {
      if (cleanAns.includes(cleanInput) || cleanInput.includes(cleanAns)) {
        return true;
      }
      if (cleanAnsNoHyphen.includes(normalizedInputNoHyphen) || normalizedInputNoHyphen.includes(cleanAnsNoHyphen)) {
        return true;
      }
    }
  }

  // Fallback memeriksa ke raw translation
  const cleanRaw = rawTranslation.trim().toLowerCase();
  if (cleanRaw.includes(cleanInput)) return true;

  return false;
}

/**
 * Menghasilkan Soal Kuis Stage Eliminasi 20 Soal Acak Total (Interleaved Randomization - Zero Tolerance)
 * ATURAN BAKU:
 * Dari 10 kata dalam stage, sistem menghasilkan 20 soal independen:
 * - 10 soal Varian A: TYPE_TRANSLATION (Ketik Arti Bahasa Indonesia 100% Persis)
 * - 10 soal Varian B: MCQ_DEFINITION (Pilih Kata Bahasa Inggris dari 4 Pilihan Ganda Definisi)
 * Ke-20 soal ini diacak total (shuffled) dengan Fisher-Yates, sehingga varian soal muncul dinamis.
 */
export function generateStageQuizQuestions(stageWords: WordItem[], allWordsPool: WordItem[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  stageWords.forEach((wordItem) => {
    // 1. Varian A: Uji Arti (Wajib Ketik Terjemahan 100% Persis)
    questions.push({
      id: `sq-type-${wordItem.id}`,
      wordId: wordItem.id,
      targetWord: wordItem.word,
      variant: 'TYPE_TRANSLATION',
      prompt: 'Ketik arti / terjemahan bahasa Indonesia:',
      challengeText: wordItem.word,
      correctAnswer: wordItem.translation,
      translation: wordItem.translation,
      definition: wordItem.definition,
      partOfSpeech: wordItem.partOfSpeech,
      phonetic: wordItem.phonetic
    });

    // 2. Varian B: Uji Definisi (4 Pilihan Ganda Kata Bahasa Inggris)
    const otherWords = allWordsPool.filter(w => w.id !== wordItem.id);
    const samePos = otherWords.filter(w => w.partOfSpeech === wordItem.partOfSpeech);
    const candidateDistractors = samePos.length >= 3 ? samePos : otherWords;
    const shuffledDistractors = shuffleArray(candidateDistractors).slice(0, 3);

    const options: QuizQuestionOption[] = [
      {
        text: wordItem.word,
        isCorrect: true
      },
      ...shuffledDistractors.map(d => ({
        text: d.word,
        isCorrect: false
      }))
    ];

    questions.push({
      id: `sq-mcq-${wordItem.id}`,
      wordId: wordItem.id,
      targetWord: wordItem.word,
      variant: 'MCQ_DEFINITION',
      prompt: 'Pilih kata bahasa Inggris yang sesuai dengan definisi di atas:',
      challengeText: wordItem.definition,
      options: shuffleArray(options),
      correctAnswer: wordItem.word,
      translation: wordItem.translation,
      definition: wordItem.definition,
      partOfSpeech: wordItem.partOfSpeech,
      phonetic: wordItem.phonetic
    });
  });

  // Acak total 20 soal (interleaved)
  return shuffleArray(questions);
}
