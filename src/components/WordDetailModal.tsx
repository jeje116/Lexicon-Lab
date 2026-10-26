import React from 'react';
import { 
  X, 
  Volume2, 
  Bookmark, 
  Clock, 
  Award, 
  Flame, 
  Activity, 
  BookOpen
} from 'lucide-react';
import { WordItem, WordRetentionStats } from '../types/lexicon';
import { calculateAccuracy, calculateRetentionStrength, getMemoryTier } from '../utils/retentionAlgorithm';
import { speakLexeme, playTactileClick } from '../utils/audio';

interface WordDetailModalProps {
  word: WordItem;
  stats?: WordRetentionStats;
  onClose: () => void;
  onToggleBookmark: (wordId: string) => void;
  soundEnabled: boolean;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  word,
  stats,
  onClose,
  onToggleBookmark,
  soundEnabled
}) => {
  const accuracy = calculateAccuracy(stats);
  const retention = calculateRetentionStrength(stats);
  const memoryTier = getMemoryTier(stats);
  const isBookmarked = stats?.isBookmarked || false;

  const handlePlayAudio = () => {
    playTactileClick(soundEnabled);
    speakLexeme(word.word);
  };

  const partOfSpeechLabel = {
    verb: 'KATA KERJA (VERB)',
    adjective: 'KATA SIFAT (ADJECTIVE)',
    noun: 'KATA BENDA (NOUN)',
    adverb: 'KATA KETERANGAN (ADVERB)'
  }[word.partOfSpeech] || word.partOfSpeech.toUpperCase();

  const tierLabel = {
    CRITICAL: 'KRITIS (<40%)',
    VULNERABLE: 'RENTAN (40-70%)',
    CONSOLIDATING: 'KONSOLIDASI (70-90%)',
    CRYSTALLIZED: 'MENGKRISTAL (>90%)'
  }[memoryTier];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Modal */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pr-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 mb-1">
              <span className="text-blue-600 font-bold uppercase">STAGE #{word.stageId || word.clusterId}</span>
              <span>·</span>
              <span className="truncate max-w-[220px]">{word.stageTitle || word.clusterTitle}</span>
            </div>
            
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase font-sans tracking-tight">
                {word.word}
              </h2>
              <span className="font-mono text-sm sm:text-base text-blue-600">
                {word.phonetic}
              </span>
              <button
                onClick={handlePlayAudio}
                className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                title="Dengarkan Pelafalan"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                {partOfSpeechLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                LEVEL {word.cefr}
              </span>
            </div>
          </div>

          <button
            onClick={() => onToggleBookmark(word.id)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] ${
              isBookmarked 
                ? 'bg-amber-50 border-amber-300 text-amber-800' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isBookmarked ? 'TERTANDAI' : 'TANDAI'}</span>
          </button>
        </div>

        {/* Telemetry Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-slate-400 uppercase text-[10px] mb-0.5 flex items-center gap-1 font-bold">
              <Activity className="w-3 h-3 text-blue-600 shrink-0" />
              <span>AKURASI</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 tabular-nums">
              {accuracy}%
            </div>
            <div className="text-[10px] text-slate-500 font-sans">
              {stats?.correctAttempts || 0}/{stats?.totalAttempts || 0} benar
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-slate-400 uppercase text-[10px] mb-0.5 flex items-center gap-1 font-bold">
              <Clock className="w-3 h-3 text-amber-600 shrink-0" />
              <span>RETENSI</span>
            </div>
            <div className={`text-base font-extrabold tabular-nums ${
              retention > 70 ? 'text-emerald-700' : retention > 40 ? 'text-amber-700' : 'text-red-600'
            }`}>
              {retention}%
            </div>
            <div className="text-[10px] text-slate-500 font-sans">
              Kekuatan memori
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-slate-400 uppercase text-[10px] mb-0.5 flex items-center gap-1 font-bold">
              <Flame className="w-3 h-3 text-amber-600 shrink-0" />
              <span>STREAK</span>
            </div>
            <div className="text-base font-extrabold text-amber-700 tabular-nums">
              {stats?.consecutiveStreak || 0}x
            </div>
            <div className="text-[10px] text-slate-500 font-sans">
              Berturut-turut
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-slate-400 uppercase text-[10px] mb-0.5 flex items-center gap-1 font-bold">
              <Award className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>STATUS</span>
            </div>
            <div className={`text-xs font-bold mt-0.5 truncate ${
              memoryTier === 'CRYSTALLIZED' ? 'text-emerald-700' :
              memoryTier === 'CONSOLIDATING' ? 'text-blue-700' :
              memoryTier === 'VULNERABLE' ? 'text-amber-700' : 'text-red-600'
            }`}>
              {tierLabel}
            </div>
            <div className="text-[10px] text-slate-500 font-sans">
              {stats?.isMastered ? 'Dikuasai' : 'Sedang Dipelajari'}
            </div>
          </div>
        </div>

        {/* Terjemahan Langsung & Definisi Bahasa Indonesia */}
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 mb-6 space-y-3">
          <div>
            <div className="text-[10px] font-mono text-blue-700 uppercase tracking-wider mb-1 font-bold">
              ARTI / TERJEMAHAN LANGSUNG:
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-blue-950 font-sans">
              {word.translation}
            </p>
          </div>

          <div className="pt-3 border-t border-blue-200/60">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1 font-bold">
              DEFINISI LENGKAP:
            </div>
            <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed font-medium">
              {word.definition}
            </p>
          </div>
        </div>

        {/* Contoh Kalimat Kontekstual & Terjemahan */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 uppercase font-bold">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>CONTOH PENGGUNAAN & TERJEMAHAN:</span>
          </div>
          {word.contextSentences.map((ctx, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <p className="text-slate-900 font-sans text-xs sm:text-sm font-semibold leading-relaxed">
                "{ctx.english}"
              </p>
              <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed border-t border-slate-200/60 pt-1.5">
                → {ctx.indonesian}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
