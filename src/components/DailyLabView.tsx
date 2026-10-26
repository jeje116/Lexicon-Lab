import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  ShieldAlert, 
  ArrowRight, 
  Flame, 
  RotateCcw, 
  BookOpen, 
  Check, 
  X, 
  Trophy, 
  Zap, 
  Sparkles, 
  Send 
} from 'lucide-react';
import { WordItem, WordRetentionStats, QuizQuestion, StagePhase, TerminalMode } from '../types/lexicon';
import { 
  speakLexeme, 
  playTactileClick, 
  playCorrectChime, 
  playEliminationBuzzer, 
  playVictoryFanfare 
} from '../utils/audio';
import { isExactTranslationMatch } from '../utils/retentionAlgorithm';

interface DailyLabViewProps {
  words: WordItem[];
  allWords: WordItem[];
  statsMap: Record<string, WordRetentionStats>;
  quizQuestions: QuizQuestion[];
  phase: StagePhase;
  onSetPhase: (phase: StagePhase) => void;
  onToggleBookmark: (wordId: string) => void;
  onMarkInspected: (wordId: string) => void;
  onQuizCorrectAnswer: (question: QuizQuestion) => void;
  onQuizEliminationFail: (failedQuestion: QuizQuestion, wrongAnswer: string) => void;
  onQuizFlawlessVictory: () => void;
  onRebootQuiz: () => void;
  onNavigateTab: (tab: TerminalMode) => void;
  currentStageId: number;
  clearedStages: number[];
  onSelectStage: (stageId: number) => void;
  dailyStreak: number;
  clustersMasteredCount: number;
  soundEnabled: boolean;
}

export const DailyLabView: React.FC<DailyLabViewProps> = ({
  words,
  statsMap,
  quizQuestions,
  phase,
  onSetPhase,
  onToggleBookmark,
  onMarkInspected,
  onQuizCorrectAnswer,
  onQuizEliminationFail,
  onQuizFlawlessVictory,
  onRebootQuiz,
  onNavigateTab,
  currentStageId,
  clearedStages,
  onSelectStage,
  dailyStreak,
  soundEnabled
}) => {
  // Status fase kartu belajar (Flashcard Deck)
  const [deckIndex, setDeckIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Status fase kuis 20 soal acak total (Zero-Tolerance)
  const [quizIndex, setQuizIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [failedQuestionData, setFailedQuestionData] = useState<{
    question: QuizQuestion;
    wrongAnswer: string;
    questionNumber: number;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Efek getar & flash merah saat salah (Zero-Tolerance)
  const [screenShake, setScreenShake] = useState(false);
  const [screenFlashCrimson, setScreenFlashCrimson] = useState(false);

  const currentWord = words[deckIndex] || words[0];
  const currentStats = statsMap[currentWord?.id];
  const isBookmarked = currentStats?.isBookmarked || false;
  const inspectedCount = words.filter(w => statsMap[w.id]?.isInspected).length;
  const isAllInspected = inspectedCount === words.length && words.length > 0;

  const currentQ = quizQuestions[quizIndex];

  // Tandai kata pertama sebagai ditelaah saat pertama dibuka
  useEffect(() => {
    if (words[deckIndex]) {
      onMarkInspected(words[deckIndex].id);
    }
  }, [deckIndex, words, onMarkInspected]);

  // Reset state dan auto-focus per soal kuis
  useEffect(() => {
    setSelectedOption(null);
    setQuizFeedback('idle');
    setTypedInput('');

    if (phase === 'quiz' && currentQ?.variant === 'TYPE_TRANSLATION') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [quizIndex, phase, currentQ?.variant]);

  // Keyboard shortcut listener untuk kuis dan navigasi deck
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Navigasi Deck saat di fase deck
      if (phase === 'deck') {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          handleDeckNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handleDeckPrev();
        }
        return;
      }

      // Kuis shortcuts
      if (phase !== 'quiz' || isEvaluating || !currentQ) return;

      // Jika soal tipe ketik: Enter untuk submit
      if (currentQ.variant === 'TYPE_TRANSLATION') {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmitTyping();
        }
      }

      // Jika soal tipe pilihan ganda: Tombol 1, 2, 3, 4
      if (currentQ.variant === 'MCQ_DEFINITION' && currentQ.options) {
        const keyNum = parseInt(e.key, 10);
        if (keyNum >= 1 && keyNum <= currentQ.options.length) {
          e.preventDefault();
          handleSelectOption(keyNum - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentQ, isEvaluating, typedInput, deckIndex, words.length]);

  // Navigasi kartu belajar
  const handleDeckNext = () => {
    playTactileClick(soundEnabled);
    if (deckIndex < words.length - 1) {
      const next = deckIndex + 1;
      setDeckIndex(next);
      onMarkInspected(words[next].id);
    }
  };

  const handleDeckPrev = () => {
    playTactileClick(soundEnabled);
    if (deckIndex > 0) {
      const prev = deckIndex - 1;
      setDeckIndex(prev);
      onMarkInspected(words[prev].id);
    }
  };

  const handlePlayAudio = (wordToSpeak?: string) => {
    const target = wordToSpeak || currentWord?.word;
    if (!target) return;
    setIsPlayingAudio(true);
    speakLexeme(target);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleDeckNext();
      } else {
        handleDeckPrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Memulai Kuis Eliminasi Stage (20 Soal Acak Total)
  const handleStartQuiz = () => {
    if (!isAllInspected) return;
    playTactileClick(soundEnabled);
    setQuizIndex(0);
    setFailedQuestionData(null);
    onSetPhase('quiz');
  };

  // Mengulangi kuis setelah gugur (Zero-Tolerance)
  const handleRestartQuiz = () => {
    playTactileClick(soundEnabled);
    onRebootQuiz();
    setQuizIndex(0);
    setFailedQuestionData(null);
    onSetPhase('quiz');
  };

  // Penanganan jawaban salah (Zero Tolerance: Gugur Langsung, Reset ke 0/20)
  const triggerZeroToleranceFail = (failedQ: QuizQuestion, wrongAnswer: string) => {
    setIsEvaluating(true);
    setQuizFeedback('wrong');
    playEliminationBuzzer(soundEnabled);

    setScreenShake(true);
    setScreenFlashCrimson(true);
    setTimeout(() => setScreenFlashCrimson(false), 400);
    setTimeout(() => setScreenShake(false), 600);

    onQuizEliminationFail(failedQ, wrongAnswer);
    setFailedQuestionData({ 
      question: failedQ, 
      wrongAnswer,
      questionNumber: quizIndex + 1 
    });

    setTimeout(() => {
      setIsEvaluating(false);
      onSetPhase('failed');
    }, 750);
  };

  // Penanganan jawaban benar
  const triggerCorrectProgress = (correctQ: QuizQuestion) => {
    setIsEvaluating(true);
    setQuizFeedback('correct');
    playCorrectChime(soundEnabled);
    onQuizCorrectAnswer(correctQ);

    setTimeout(() => {
      setIsEvaluating(false);
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(prev => prev + 1);
      } else {
        // Sempurna 20/20 soal tuntas!
        playVictoryFanfare(soundEnabled);
        onQuizFlawlessVictory();
        onSetPhase('victory');
      }
    }, 450);
  };

  // Submit Varian A: UJI ARTI (WAJIB KETIK - EXACT MATCH 100%)
  const handleSubmitTyping = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isEvaluating || !currentQ || !typedInput.trim()) return;

    // Evaluasi 100% exact match
    const isMatch = isExactTranslationMatch(
      typedInput,
      currentQ.correctAnswer
    );

    if (isMatch) {
      triggerCorrectProgress(currentQ);
    } else {
      triggerZeroToleranceFail(currentQ, typedInput.trim());
    }
  };

  // Submit Varian B: UJI DEFINISI (PILIHAN GANDA 4 OPSI)
  const handleSelectOption = (index: number) => {
    if (isEvaluating || !currentQ || !currentQ.options) return;
    setSelectedOption(index);
    const chosenOption = currentQ.options[index];

    if (chosenOption.isCorrect) {
      triggerCorrectProgress(currentQ);
    } else {
      triggerZeroToleranceFail(currentQ, chosenOption.text);
    }
  };

  const getPosBadgeIndonesian = (pos: string) => {
    switch (pos) {
      case 'verb': return 'Kata Kerja (Verb)';
      case 'adjective': return 'Kata Sifat (Adjective)';
      case 'noun': return 'Kata Benda (Noun)';
      case 'adverb': return 'Kata Keterangan (Adverb)';
      default: return pos;
    }
  };

  if (!currentWord) {
    return <div className="p-8 text-slate-400 font-mono text-xs">Memuat materi kosakata stage...</div>;
  }

  // ==========================================
  // FASE: GAGAL ELIMINASI (Failure Screen - Light Mode)
  // Bersih, Lega, Bebas Terpotong, & Tanpa Badge Toleransi
  // ==========================================
  if (phase === 'failed' && failedQuestionData) {
    const q = failedQuestionData.question;
    const targetWordItem = words.find(w => w.id === q.wordId) || {
      word: q.targetWord,
      phonetic: q.phonetic || '',
      translation: q.translation,
      definition: q.definition,
      partOfSpeech: q.partOfSpeech || 'verb',
      contextSentences: []
    };

    return (
      <div className="flex-1 flex flex-col justify-center p-4 sm:p-6 max-w-xl mx-auto w-full min-h-[calc(100vh-8rem)] pb-32 animate-fadeIn">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Header Ringkas Tanpa Badge Toleransi */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 shrink-0">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Jawaban Belum Tepat!
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Perhatikan pembetulan di bawah untuk memperkuat daya ingat.
              </p>
            </div>
          </div>

          {/* Komparasi Jawaban yang Lega */}
          <div className="space-y-3">
            {/* Jawaban Pengguna */}
            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200">
              <span className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-wider block mb-1">
                Pilihan / Ketikan Anda:
              </span>
              <div className="text-base font-bold text-red-900 break-words font-sans">
                {failedQuestionData.wrongAnswer || '(Jawaban Kurang Tepat)'}
              </div>
            </div>

            {/* Jawaban Benar */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                  Jawaban yang Benar:
                </span>
                <button
                  onClick={() => speakLexeme(targetWordItem.word)}
                  className="text-emerald-700 hover:text-emerald-900 transition-colors p-1 cursor-pointer"
                  title="Dengarkan Suara"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-lg font-extrabold text-emerald-900 uppercase tracking-tight font-sans">
                {targetWordItem.word}{' '}
                {targetWordItem.phonetic && (
                  <span className="text-xs font-mono text-emerald-700 font-normal">
                    {targetWordItem.phonetic}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Detail Definisi & Terjemahan */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
              Arti / Terjemahan:
            </div>
            <p className="text-base font-bold text-slate-900">
              {targetWordItem.translation}
            </p>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Definisi Lengkap:
              </span>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {targetWordItem.definition}
              </p>
            </div>
          </div>

          {/* Contoh Kalimat Kontekstual */}
          {targetWordItem.contextSentences?.[0] && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-mono text-[10px] text-slate-500 font-bold uppercase block">
                Contoh Penggunaan:
              </span>
              <p className="text-slate-800 font-sans italic text-sm">
                "{targetWordItem.contextSentences[0].english}"
              </p>
              <p className="text-slate-500 font-sans text-xs pt-1 border-t border-slate-200/60">
                Artinya: "{targetWordItem.contextSentences[0].indonesian}"
              </p>
            </div>
          )}

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => onSetPhase('deck')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px]"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>KEMBALI KE FLASHCARD</span>
            </button>

            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ULANGI KUIS (DIACAK)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FASE: MENANG LULUS KUIS (Victory Screen - Light Mode)
  // Berhasil menyelesaikan 20/20 soal acak tanpa salah
  // ==========================================
  if (phase === 'victory') {
    const hasNextStage = currentStageId < 3;

    return (
      <div className="flex-1 flex flex-col justify-center p-4 sm:p-6 max-w-xl mx-auto w-full min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-3.5rem)] animate-fadeIn pb-24">
        <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

          {/* Header Kemenangan */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0">
              <Trophy className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest">
                  20/20 SOAL LULUS (100% PERFECT)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  VERIFIKASI TUNTAS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Stage {String(currentStageId).padStart(2, '0')} Berhasil Ditaklukkan!
              </h2>
            </div>
          </div>

          {/* Telemetri Konsistensi */}
          <div className="grid grid-cols-2 gap-3 mb-5 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
              <div className="text-amber-800 font-bold text-[10px] uppercase mb-1 flex items-center justify-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>KONSISTENSI STREAK</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 tabular-nums">
                {dailyStreak} HARI
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center">
              <div className="text-blue-800 font-bold text-[10px] uppercase mb-1 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>STAGE DIKUASAI</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 tabular-nums">
                {clearedStages.length} STAGE
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 mb-6 leading-relaxed">
            Semua kata kerja dari Stage ini kini otomatis terhubung ke Tab Retensi Kata Kerja dengan sampling probabilitas berbobot Spaced Repetition.
          </div>

          {/* Tombol Lanjutan */}
          <div className="space-y-3">
            {hasNextStage && (
              <button
                onClick={() => {
                  onSelectStage(currentStageId + 1);
                  setDeckIndex(0);
                  onSetPhase('deck');
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer min-h-[48px]"
              >
                <span>BUKA & LANJUT KE STAGE {String(currentStageId + 1).padStart(2, '0')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onNavigateTab('retention')}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-blue-300 text-blue-700 font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px] shadow-sm"
            >
              <Zap className="w-4 h-4 text-amber-600" />
              <span>UJI RETENSI KATA KERJA DARI STAGE YANG LULUS</span>
            </button>

            <button
              onClick={() => onSetPhase('deck')}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px]"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>TINJAU KEMBALI KARTU STAGE INI</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FASE: KUIS STAGE (20 SOAL ACAK TOTAL - INTERLEAVED RANDOMIZATION)
  // Single Clean Card, Progress Bar 2px di Paling Atas, Header Ringkas,
  // dan Tombol KIRIM Berada Lega di Bawah Input (Bebas Tabrakan).
  // ==========================================
  if (phase === 'quiz') {
    return (
      <div className={`flex-1 flex flex-col p-4 sm:p-6 max-w-xl mx-auto w-full min-h-[calc(100vh-4rem)] transition-colors duration-200 pb-20 ${
        screenFlashCrimson ? 'bg-red-50/90' : ''
      } ${screenShake ? 'animate-terminal-shake' : ''}`}>
        
        {/* Progress bar tipis */}
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-slate-200 z-50">
          <div 
            className="h-full bg-blue-600 transition-all duration-300" 
            style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} 
          />
        </div>

        {/* Header ringkas tanpa badge zero tolerance */}
        <div className="flex items-center justify-between py-3 mb-4 border-b border-slate-200 text-xs font-mono">
          <span className="font-extrabold text-slate-900 tracking-wider">
            SOAL {String(quizIndex + 1).padStart(2, '0')} / {quizQuestions.length}
          </span>
          <button 
            onClick={() => onSetPhase('deck')}
            className="text-slate-500 hover:text-slate-900 font-bold px-2 py-1 transition-colors cursor-pointer"
          >
            ✕ Keluar
          </button>
        </div>

        {/* 3. Single Clean Hero Card Kuis */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 my-auto">

          {/* ==================================================== */}
          {/* VARIAN A: UJI ARTI (WAJIB KETIK PERSIS 100%)          */}
          {/* ==================================================== */}
          {currentQ?.variant === 'TYPE_TRANSLATION' && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
                  {currentQ.targetWord}
                </div>
                <div className="text-xs font-mono text-blue-600 font-bold mt-1">
                  Kelas Kata: {getPosBadgeIndonesian(currentQ.partOfSpeech)}
                </div>
              </div>

              <form onSubmit={handleSubmitTyping} className="space-y-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  placeholder="Ketik terjemahan bahasa Indonesia..."
                  autoComplete="off"
                  className="w-full bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl px-5 py-4 text-base font-sans text-slate-900 placeholder-slate-400 outline-none transition-all shadow-sm"
                />
                <button
                  type="submit"
                  disabled={!typedInput.trim() || isEvaluating}
                  className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer min-h-[48px]"
                >
                  <span>KIRIM JAWABAN</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* ==================================================== */}
          {/* VARIAN B: UJI DEFINISI (4 PILIHAN GANDA)              */}
          {/* ==================================================== */}
          {currentQ?.variant === 'MCQ_DEFINITION' && (
            <div className="space-y-4">
              {/* Kotak Definisi Bahasa Indonesia Lengkap */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                <span className="font-mono text-[10px] text-blue-700 uppercase tracking-wider block mb-1 font-bold">
                  DEFINISI LENGKAP:
                </span>
                <div className="font-sans text-sm sm:text-base text-slate-900 leading-relaxed font-medium">
                  "{currentQ.challengeText}"
                </div>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-slate-600">
                {currentQ.prompt || 'Pilih kata bahasa Inggris yang sesuai dengan definisi di atas:'}
              </div>

              {/* 4 OPSI PILIHAN GANDA (Target Sentuh Lega) */}
              <div className="space-y-2.5 sm:space-y-3">
                {currentQ.options?.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = 'bg-white hover:bg-blue-50/30 border-slate-200 hover:border-blue-300 text-slate-800 shadow-xs';

                  if (isSelected) {
                    if (quizFeedback === 'correct') {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md';
                    } else if (quizFeedback === 'wrong') {
                      btnStyle = 'bg-red-50 border-red-500 text-red-900 shadow-md';
                    } else {
                      btnStyle = 'bg-blue-50 border-blue-500 text-blue-900 shadow-md';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isEvaluating}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer group min-h-[52px] active:scale-[0.99] ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-xl bg-slate-100 font-mono text-xs font-bold text-slate-500 flex items-center justify-center shrink-0 border border-slate-200">
                          {idx + 1}
                        </span>
                        <span className="font-sans text-sm sm:text-base font-bold uppercase tracking-wide break-words">
                          {option.text}
                        </span>
                      </div>

                      {isSelected && quizFeedback === 'correct' && (
                        <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {isSelected && quizFeedback === 'wrong' && (
                        <X className="w-5 h-5 text-red-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    );
  }

  // ==========================================
  // FASE: FLASHCARD STAGE (DECK BELAJAR 10 KATA)
  // Single Clean Hero Card + Solusi Single Floating Dock (Tidak Menumpuk)
  // ==========================================
  return (
    <div 
      className="flex-1 flex flex-col p-3 sm:p-6 max-w-xl mx-auto w-full min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-3.5rem)] space-y-4 pb-36 md:pb-28"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* 1. Header Ringkas: Nomor Stage & Judul */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {[1, 2, 3].map(stgNum => {
            const isActive = stgNum === currentStageId;
            const isCleared = clearedStages.includes(stgNum);

            return (
              <button
                key={stgNum}
                onClick={() => {
                  playTactileClick(soundEnabled);
                  onSelectStage(stgNum);
                  setDeckIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isCleared
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <span>STAGE {String(stgNum).padStart(2, '0')}</span>
                {isCleared && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-500 font-bold">
            {inspectedCount}/10 Dibaca
          </span>
        </div>
      </div>

      {/* 2. Single Hero Card Bersih (Bebas Border Bertumpuk) */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        
        {/* Baris Atas: Badge Kelas Kata & Bookmark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200/80">
              {getPosBadgeIndonesian(currentWord.partOfSpeech)}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
              {currentWord.cefr}
            </span>
          </div>

          <button
            onClick={() => onToggleBookmark(currentWord.id)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center ${
              isBookmarked
                ? 'bg-amber-50 border-amber-200 text-amber-600 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
            title={isBookmarked ? 'Hapus Bookmark' : 'Tandai Kata'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Hero Kata Bahasa Inggris + Tombol Audio Suara */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
              {currentWord.word}
            </h1>
            <div className="text-sm font-mono text-slate-400 font-normal">
              {currentWord.phonetic}
            </div>
          </div>

          <button
            onClick={() => handlePlayAudio()}
            disabled={isPlayingAudio}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-xs active:scale-95 ${
              isPlayingAudio
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-600'
            }`}
            title="Dengarkan Pelafalan Asli"
          >
            <Volume2 className={`w-6 h-6 sm:w-7 sm:h-7 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
          </button>
        </div>

        {/* Kotak Sorotan Terjemahan Bahasa Indonesia (Biru Pastel Lembut) */}
        <div className="bg-blue-50 border border-blue-200/70 rounded-2xl p-4 sm:p-5 space-y-1">
          <div className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">
            ARTI / TERJEMAHAN
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-blue-950 tracking-tight">
            {currentWord.translation}
          </div>
        </div>

        {/* Definisi Lengkap Bahasa Indonesia */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
            DEFINISI LENGKAP:
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans font-medium">
            {currentWord.definition}
          </p>
        </div>

        {/* Contoh Kalimat Dwibahasa */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5">
          <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>CONTOH PENGGUNAAN & TERJEMAHAN:</span>
          </div>

          {currentWord.contextSentences.map((ctx, idx) => (
            <div 
              key={idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1"
            >
              <p className="text-xs sm:text-sm font-semibold text-slate-800 font-sans leading-relaxed">
                "{ctx.english}"
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed pt-1 border-t border-slate-200/60">
                → {ctx.indonesian}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Navigation Dock di Flashcard Stage */}
      <div className="fixed bottom-20 md:bottom-8 left-0 right-0 z-30 px-4 max-w-md mx-auto pointer-events-none">
        <div className="flex items-center justify-between gap-2 bg-white/95 border border-slate-200 backdrop-blur-md p-2 rounded-full shadow-lg pointer-events-auto">
          {/* Panah Kiri */}
          <button
            onClick={handleDeckPrev}
            disabled={deckIndex === 0}
            className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-30 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            title="Kata Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Bagian Tengah: Status Atau Tombol Kuis */}
          {isAllInspected ? (
            <button
              onClick={handleStartQuiz}
              className="flex-1 py-3 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer truncate"
            >
              <Flame className="w-4 h-4 fill-white shrink-0" />
              <span className="truncate">MULAI KUIS ({quizQuestions.length} SOAL)</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          ) : (
            <div className="flex-1 text-center font-mono text-xs font-bold text-slate-800 truncate">
              KATA {String(deckIndex + 1).padStart(2, '0')} / {words.length}{' '}
              <span className="text-slate-400 font-normal">({inspectedCount}/{words.length} Dibaca)</span>
            </div>
          )}

          {/* Panah Kanan */}
          <button
            onClick={handleDeckNext}
            disabled={deckIndex === words.length - 1}
            className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-30 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            title="Kata Selanjutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};
