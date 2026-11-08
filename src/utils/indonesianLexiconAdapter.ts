import { KnowledgeStageItem, WordItem, QuizQuestion, QuizQuestionOption, PartOfSpeech } from '../types/lexicon';
import { shuffleArray } from './retentionAlgorithm';

/**
 * Ekstrak kata utama, kelas kata, inti makna, dan definisi dari KnowledgeStageItem
 */
export function parseIndonesianStageItem(item: KnowledgeStageItem) {
  // Format stageTitle: "01. Eksentrik (Adjektiva)"
  const title = item.stageTitle || '';
  const match = title.match(/^(?:\d+\.\s*)?([^(]+)(?:\s*\(([^)]+)\))?/);
  const rawWord = match ? match[1].trim() : title;
  const rawPos = match && match[2] ? match[2].trim() : '';

  let posBadge = 'Kata';
  let partOfSpeech: PartOfSpeech = 'noun';

  if (/adjektiva/i.test(rawPos)) {
    posBadge = 'Kata Sifat (Adjektiva)';
    partOfSpeech = 'adjective';
  } else if (/nomina/i.test(rawPos)) {
    posBadge = 'Kata Benda (Nomina)';
    partOfSpeech = 'noun';
  } else if (/verba/i.test(rawPos)) {
    posBadge = 'Kata Kerja (Verba)';
    partOfSpeech = 'verb';
  } else if (/adverbia/i.test(rawPos)) {
    posBadge = 'Kata Keterangan (Adverbia)';
    partOfSpeech = 'adverb';
  } else if (rawPos) {
    posBadge = rawPos;
  }

  // Ambil inti makna yang diapit ==...==
  const content = item.content || '';
  const coreMatch = content.match(/==([^=]+)==/);
  const rawCoreMeaning = coreMatch 
    ? coreMatch[1].trim() 
    : content.split('\n\n')[0] || '';
  
  // Kapitalisasi huruf pertama inti makna
  const coreMeaning = rawCoreMeaning 
    ? rawCoreMeaning.charAt(0).toUpperCase() + rawCoreMeaning.slice(1)
    : '';

  // Bersihkan teks konten untuk definisi lengkap (hapus == dan ** tapi jaga format bersih)
  const cleanedContent = content.replace(/==([^=]+)==/g, '$1').replace(/\*\*/g, '');

  return {
    word: rawWord.toLowerCase(),
    posBadge,
    partOfSpeech,
    coreMeaning,
    cleanedContent
  };
}

/**
 * Konversi 500 KnowledgeStageItem kosa kata indonesia menjadi WordItem[]
 */
export function convertIndonesianStagesToWordItems(items: KnowledgeStageItem[]): WordItem[] {
  return items.map((item) => {
    const { word, posBadge, partOfSpeech, coreMeaning, cleanedContent } = parseIndonesianStageItem(item);
    
    // stageId numerik dari topicId 'id-stage-XX' (1..50)
    const stageMatch = item.topicId.match(/id-stage-(\d+)/);
    const stageId = stageMatch ? parseInt(stageMatch[1], 10) : item.stageId;
    const wordSlug = word.replace(/[^a-z0-9]/g, '-');
    const wordId = `id-w${stageId}-${wordSlug}`;

    const contextSentences = (item.keyPoints || []).map((kp) => {
      const cleanKp = kp.replace(/\*\*/g, '').trim();
      return {
        english: cleanKp,
        indonesian: cleanKp,
        clozeEnglish: cleanKp.replace(new RegExp(`\\b${word}\\b`, 'gi'), '________')
      };
    });

    return {
      id: wordId,
      word,
      phonetic: posBadge,
      partOfSpeech,
      cefr: 'C1',
      translation: coreMeaning,
      definition: cleanedContent,
      contextSentences,
      stageId,
      stageTitle: item.topicTitle || `Stage ${String(stageId).padStart(2, '0')}`
    };
  });
}

/**
 * Generator Soal 2-Arah untuk Kosa Kata Indonesia:
 * - Arah 1 (Arti -> Kosa Kata): Ditampilkan Inti Makna / Definisi -> Ketik Kosa Kata Bahasa Indonesia (100% Exact Match)
 * - Arah 2 (Kosa Kata -> Arti): Ditampilkan Kosa Kata Bahasa Indonesia -> Pilih 1 dari 4 Pilihan Ganda Inti Makna
 */
export function generateIndonesianStageQuizQuestions(
  stageWords: WordItem[],
  allWordsPool: WordItem[]
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  stageWords.forEach((wordItem) => {
    // Arah 1: Arti -> Kosa Kata (Wajib Ketik Kata Bahasa Indonesia)
    questions.push({
      id: `id-quiz-type-${wordItem.id}`,
      wordId: wordItem.id,
      targetWord: wordItem.word,
      variant: 'TYPE_TRANSLATION',
      prompt: 'Ketik kosa kata Bahasa Indonesia yang tepat untuk arti di atas:',
      challengeText: wordItem.translation, // Tampilkan Inti Makna
      correctAnswer: wordItem.word,        // Jawaban ketik adalah kata targetnya
      translation: wordItem.translation,
      definition: wordItem.definition,
      partOfSpeech: wordItem.partOfSpeech,
      phonetic: wordItem.phonetic
    });

    // Arah 2: Kosa Kata -> Arti (4 Pilihan Ganda Inti Makna)
    const otherWords = allWordsPool.filter(w => w.id !== wordItem.id);
    const samePos = otherWords.filter(w => w.partOfSpeech === wordItem.partOfSpeech);
    const candidateDistractors = samePos.length >= 3 ? samePos : otherWords;
    const shuffledDistractors = shuffleArray(candidateDistractors).slice(0, 3);

    const options: QuizQuestionOption[] = [
      {
        text: wordItem.translation,
        isCorrect: true
      },
      ...shuffledDistractors.map(d => ({
        text: d.translation,
        isCorrect: false
      }))
    ];

    questions.push({
      id: `id-quiz-mcq-${wordItem.id}`,
      wordId: wordItem.id,
      targetWord: wordItem.word,
      variant: 'MCQ_DEFINITION',
      prompt: 'Pilih arti / pengertian yang tepat untuk kosa kata di atas:',
      challengeText: wordItem.word.toUpperCase(), // Tampilkan KOSA KATA
      options: shuffleArray(options),
      correctAnswer: wordItem.translation,       // Jawaban pilihan adalah Inti Makna
      translation: wordItem.translation,
      definition: wordItem.definition,
      partOfSpeech: wordItem.partOfSpeech,
      phonetic: wordItem.phonetic
    });
  });

  return shuffleArray(questions);
}

