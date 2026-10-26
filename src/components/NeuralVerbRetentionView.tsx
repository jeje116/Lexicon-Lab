import { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  ArrowRight, 
  BookOpen, 
  Lock, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  ChevronLeft 
} from 'lucide-react';
import { WordItem, WordRetentionStats, QuizVariant } from '../types/lexicon';
import { 
  sampleWeightedVerbs, 
  shuffleArray, 
  isExactTranslationMatch 
} from '../utils/retentionAlgorithm';
import { 
  playTactileClick, 
  playCorrectChime, 
  playEliminationBuzzer, 
  speakLexeme 
} from '../utils/audio';

interface NeuralVerbRetentionViewProps {
  allWords: WordItem[];
  clearedStages: number[];
  statsMap: Record<string, WordRetentionStats>;
  onRecordResult: (wordId: string, isCorrect: boolean) => void;
  onNavigateToStage: (stageId: number) => void;
  onBackToStage?: () => void;
  soundEnabled: boolean;
}

export const NeuralVerbRetentionView: React.FC<NeuralVerbRetentionViewProps> = ({
  allWords,
  clearedStages,
  statsMap,
  onRecordResult,
  onNavigateToStage,
  onBackToStage,
  soundEnabled
}) => {
  // Hanya ambil kata kerja dari stage yang sudah selesai (atau fallback stage 1 jika belum ada yang cleared)
  const verbPool = allWords.filter(w => {
    if (w.partOfSpeech !== 'verb') return false;
    if (clearedStages.length > 0) {
      return clearedStages.includes(w.stageId);
    }
    return w.stageId === 1;
  });

  const [activeVerb, setActiveVerb] = useState<WordItem | null>(null);
  const [variant, setVariant] = useState<QuizVariant>('TYPE_TRANSLATION');
  const [typedInput, setTypedInput] = useState('');
  const [userTypedAnswer, setUserTypedAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [mcqOptions, setMcqOptions] = useState<{ text: string; isCorrect: boolean }[]>([]);
  const [evalState, setEvalState] = useState<'testing' | 'correct' | 'failed'>('testing');

  const inputRef = useRef<HTMLInputElement>(null);

  // Undi kata kerja acak terbobot dan tentukan varian kuis acak (Ketik Arti atau Pilgan Definisi)
  const drawNextVerb = () => {
    if (verbPool.length === 0) return;
    playTactileClick(soundEnabled);

    const [sampled] = sampleWeightedVerbs(verbPool, statsMap, 1);
    const chosenVerb = sampled || verbPool[Math.floor(Math.random() * verbPool.length)];
    setActiveVerb(chosenVerb);

    // Pilih salah satu dari dua format secara acak
    const chosenVariant: QuizVariant = Math.random() > 0.5 ? 'TYPE_TRANSLATION' : 'MCQ_DEFINITION';
    setVariant(chosenVariant);

    // Reset input & status evaluasi
    setTypedInput('');
    setUserTypedAnswer('');
    setSelectedOption(null);
    setEvalState('testing');

    // Jika varian MCQ_DEFINITION, siapkan 4 opsi pilihan ganda
    if (chosenVariant === 'MCQ_DEFINITION') {
      const otherVerbs = allWords.filter(w => w.partOfSpeech === 'verb' && w.id !== chosenVerb.id);
      const shuffledDistractors = shuffleArray(otherVerbs).slice(0, 3);
      const options = [
        { text: chosenVerb.word, isCorrect: true },
        ...shuffledDistractors.map(d => ({ text: d.word, isCorrect: false }))
      ];
      setMcqOptions(shuffleArray(options));
    }

    // Auto-focus input ketik jika varian ketik
    if (chosenVariant === 'TYPE_TRANSLATION') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  };

  useEffect(() => {
    drawNextVerb();
  }, [clearedStages.length]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (evalState !== 'testing' || !activeVerb) {
        if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') {
          e.preventDefault();
          drawNextVerb();
        }
        return;
      }

      if (variant === 'TYPE_TRANSLATION') {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmitTyping();
        }
      }

      if (variant === 'MCQ_DEFINITION' && mcqOptions.length > 0) {
        const keyNum = parseInt(e.key, 10);
        if (keyNum >= 1 && keyNum <= mcqOptions.length) {
          e.preventDefault();
          handleSelectOption(keyNum - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [evalState, variant, mcqOptions, activeVerb]);

  // Submit Uji Arti (Wajib Ketik - Exact Match 100%)
  const handleSubmitTyping = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (evalState !== 'testing' || !activeVerb || !typedInput.trim()) return;

    const trimmed = typedInput.trim();
    setUserTypedAnswer(trimmed);

    const isMatch = isExactTranslationMatch(trimmed, activeVerb.translation);

    if (isMatch) {
      playCorrectChime(soundEnabled);
      setEvalState('correct');
      onRecordResult(activeVerb.id, true);
    } else {
      playEliminationBuzzer(soundEnabled);
      setEvalState('failed');
      onRecordResult(activeVerb.id, false);
    }
  };

  // Submit Uji Definisi (Pilihan Ganda 4 Opsi)
  const handleSelectOption = (idx: number) => {
    if (evalState !== 'testing' || !activeVerb) return;
    setSelectedOption(idx);
    const chosen = mcqOptions[idx];

    if (chosen.isCorrect) {
      playCorrectChime(soundEnabled);
      setEvalState('correct');
      onRecordResult(activeVerb.id, true);
    } else {
      playEliminationBuzzer(soundEnabled);
      setEvalState('failed');
      onRecordResult(activeVerb.id, false);
    }
  };

  if (!activeVerb) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4 font-sans">
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-slate-900 text-base font-bold">Bank Kata Kerja Belum Terbuka</h3>
        <p className="text-slate-500 text-xs leading-relaxed">
          Selesaikan Stage 01 dengan nilai sempurna 20/20 terlebih dahulu untuk membuka tes retensi kata kerja.
        </p>
        <button
          onClick={() => onNavigateToStage(1)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          Pergi ke Stage 01
        </button>
      </div>
    );
  }

  const primaryContext = activeVerb.contextSentences[0];

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 lg:p-8 max-w-xl mx-auto w-full min-h-[calc(100vh-8rem)] space-y-5 pb-32">
      
      {/* 1. Header Ultra-Bersih: Hanya Tombol Kembali dan Judul */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <button
          onClick={() => onBackToStage ? onBackToStage() : onNavigateToStage(1)}
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          title="Kembali ke Stage"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-extrabold text-slate-900 tracking-tight font-sans">
          RETENSI KATA KERJA
        </h2>
      </div>

      {/* 2. Single Hero Card Kuis Verba */}
      <div className={`bg-white border rounded-3xl p-6 sm:p-8 shadow-sm transition-all space-y-6 ${
        evalState === 'correct'
          ? 'border-emerald-300 ring-2 ring-emerald-100 shadow-md'
          : evalState === 'failed'
          ? 'border-slate-200 shadow-xl'
          : 'border-slate-200/90'
      }`}>

        {/* ==================================================== */}
        {/* TAMPILAN SOAL AKTIF (evalState === 'testing')          */}
        {/* ==================================================== */}
        {evalState === 'testing' && (
          <div className="space-y-5">
            
            {/* Varian A: Ketik Arti */}
            {variant === 'TYPE_TRANSLATION' && (
              <div className="space-y-5">
                <div className="text-center py-4 space-y-2">
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight uppercase font-sans">
                      {activeVerb.word}
                    </div>
                    <button
                      type="button"
                      onClick={() => speakLexeme(activeVerb.word)}
                      className="p-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 cursor-pointer transition-colors active:scale-95 shadow-xs"
                      title="Dengarkan Suara"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-xs font-mono text-blue-600 font-bold">
                    Kata Kerja (Verb) • {activeVerb.phonetic}
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-600">
                  Ketik arti / terjemahan bahasa Indonesia persis seperti yang dipelajari:
                </div>

                <form onSubmit={handleSubmitTyping} className="space-y-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={typedInput}
                    onChange={(e) => setTypedInput(e.target.value)}
                    placeholder="Ketik terjemahan bahasa Indonesia..."
                    autoComplete="off"
                    className="w-full bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl px-5 py-4 text-base sm:text-lg font-sans text-slate-900 placeholder-slate-400 outline-none transition-all shadow-xs"
                  />

                  {/* Tombol Kirim Lega di Bawah Input */}
                  <button
                    type="submit"
                    disabled={!typedInput.trim()}
                    className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer min-h-[48px] active:scale-[0.99]"
                  >
                    <span>KIRIM JAWABAN</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Varian B: Pilihan Ganda Definisi */}
            {variant === 'MCQ_DEFINITION' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                  <span className="font-mono text-[10px] text-blue-700 uppercase tracking-wider block mb-1 font-bold">
                    DEFINISI KATA KERJA:
                  </span>
                  <div className="font-sans text-sm sm:text-base text-slate-900 leading-relaxed font-medium">
                    "{activeVerb.definition}"
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-600">
                  Pilih kata kerja bahasa Inggris yang sesuai dengan definisi di atas:
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  {mcqOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className="w-full p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/30 text-slate-800 text-left transition-all flex items-center justify-between cursor-pointer group min-h-[52px] active:scale-[0.99] shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-mono text-xs font-bold text-slate-500 shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-sans text-sm sm:text-base font-bold uppercase tracking-wide break-words">
                          {opt.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* LAYAR JAWABAN BENAR (evalState === 'correct')         */}
        {/* ==================================================== */}
        {evalState === 'correct' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 shrink-0">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg font-sans">
                    Jawaban Benar!
                  </h3>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300 font-bold">
                    VERIFIKASI SUKSES
                  </span>
                </div>

                <div className="text-sm font-sans text-slate-700 pt-1">
                  Kata kerja <strong className="font-mono uppercase text-slate-900 font-bold">{activeVerb.word}</strong> berhasil dijawab dengan tepat.
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs font-sans text-slate-700 space-y-1 mt-2 shadow-xs">
                  <p>
                    <strong className="text-slate-900">Arti:</strong> {activeVerb.translation}
                  </p>
                  <p>
                    <strong className="text-slate-900">Definisi:</strong> {activeVerb.definition}
                  </p>
                </div>
              </div>
            </div>

            {/* Contoh Kalimat */}
            {primaryContext && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>CONTOH PENGGUNAAN & TERJEMAHAN:</span>
                </span>
                <p className="text-slate-800 font-sans leading-relaxed italic">
                  "{primaryContext.english}"
                </p>
                <p className="text-slate-500 font-sans text-[11px] pt-1 border-t border-slate-200/60">
                  → {primaryContext.indonesian}
                </p>
              </div>
            )}

            {/* Tombol Lanjut Kata Berikutnya */}
            <button
              onClick={drawNextVerb}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-mono text-sm font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[48px] active:scale-[0.99]"
            >
              <span>KATA KERJA BERIKUTNYA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ==================================================== */}
        {/* LAYAR JAWABAN SALAH (evalState === 'failed')          */}
        {/* Bersih, Lega, Bebas Terpotong, & Tanpa Badge Toleransi */}
        {/* ==================================================== */}
        {evalState === 'failed' && (
          <div className="space-y-6 animate-fadeIn">
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
                  {variant === 'TYPE_TRANSLATION'
                    ? (userTypedAnswer || '(Jawaban Kurang Tepat)')
                    : (selectedOption !== null && mcqOptions[selectedOption] ? mcqOptions[selectedOption].text : '(Jawaban Kurang Tepat)')}
                </div>
              </div>

              {/* Jawaban Benar */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                    Jawaban yang Benar:
                  </span>
                  <button
                    onClick={() => speakLexeme(activeVerb.word)}
                    className="text-emerald-700 hover:text-emerald-900 transition-colors p-1 cursor-pointer"
                    title="Dengarkan Suara"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-lg font-extrabold text-emerald-900 uppercase tracking-tight font-sans">
                  {activeVerb.word}{' '}
                  {activeVerb.phonetic && (
                    <span className="text-xs font-mono text-emerald-700 font-normal">
                      {activeVerb.phonetic}
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
                {activeVerb.translation}
              </p>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Definisi Lengkap:
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  {activeVerb.definition}
                </p>
              </div>
            </div>

            {/* Contoh Kalimat Kontekstual */}
            {primaryContext && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase block">
                  Contoh Penggunaan:
                </span>
                <p className="text-slate-800 font-sans italic text-sm">
                  "{primaryContext.english}"
                </p>
                <p className="text-slate-500 font-sans text-xs pt-1 border-t border-slate-200/60">
                  Artinya: "{primaryContext.indonesian}"
                </p>
              </div>
            )}

            {/* Tombol Lanjut */}
            <div className="pt-2">
              <button
                onClick={drawNextVerb}
                className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm font-bold tracking-wider uppercase shadow-md transition-all cursor-pointer min-h-[48px] active:scale-[0.99]"
              >
                Lanjut
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
