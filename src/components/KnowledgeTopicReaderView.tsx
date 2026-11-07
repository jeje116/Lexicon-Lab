import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { KnowledgeStageItem } from '../types/lexicon';
import { playTactileClick, playCorrectChime } from '../utils/audio';

interface KnowledgeTopicReaderViewProps {
  stages: KnowledgeStageItem[];
  topicTitle: string;
  topicId: string;
  readStageIds: number[];
  onToggleReadStage: (stageId: number) => void;
  onBackToOverview?: () => void;
  soundEnabled: boolean;
}

/**
 * Render teks paragraf dengan format **bold** dan ==highlight==
 */
export function renderFormattedContent(text: string): React.ReactNode[] {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.map((para, pIdx) => {
    // Regex membagi string berdasarkan **bold** dan ==highlight==
    const tokens = para.split(/(\*\*.*?\*\*|==.*?==)/g);

    return (
      <p key={pIdx} className="leading-relaxed text-slate-700 text-base sm:text-lg font-sans">
        {tokens.map((token, tIdx) => {
          if (token.startsWith('**') && token.endsWith('**')) {
            return (
              <strong key={tIdx} className="font-semibold text-slate-900">
                {token.slice(2, -2)}
              </strong>
            );
          }
          if (token.startsWith('==') && token.endsWith('==')) {
            return (
              <mark
                key={tIdx}
                className="bg-amber-100/90 text-slate-900 px-1.5 py-0.5 rounded-md font-medium"
              >
                {token.slice(2, -2)}
              </mark>
            );
          }
          return <span key={tIdx}>{token}</span>;
        })}
      </p>
    );
  });
}

export const KnowledgeTopicReaderView: React.FC<KnowledgeTopicReaderViewProps> = ({
  stages,
  topicTitle,
  topicId: _topicId,
  readStageIds,
  onToggleReadStage,
  onBackToOverview,
  soundEnabled
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  // Fallback aman jika stages kosong
  if (!stages || stages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4 font-sans">
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400">
          <BookOpen className="w-10 h-10" />
        </div>
        <h3 className="text-slate-900 text-lg font-bold">Topik Belum Memiliki Materi</h3>
        <p className="text-slate-500 text-xs leading-relaxed">
          Materi untuk topik ini sedang disiapkan atau belum diisi di Google Sheets.
        </p>
      </div>
    );
  }

  const currentStage = stages[currentStageIndex] || stages[0];
  const isCurrentRead = readStageIds.includes(currentStage.stageId);

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      playTactileClick(soundEnabled);
      setCurrentStageIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      playTactileClick(soundEnabled);
      setCurrentStageIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleRead = () => {
    if (!isCurrentRead) {
      playCorrectChime(soundEnabled);
    } else {
      playTactileClick(soundEnabled);
    }
    onToggleReadStage(currentStage.stageId);
  };

  // Keyboard Navigation: Panah Kiri dan Kanan
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextStage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStageIndex, stages.length, soundEnabled]);

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 lg:p-8 max-w-3xl mx-auto w-full min-h-[calc(100vh-8rem)] space-y-5 pb-36">
      
      {/* 1. Header Navigation & Top Stage Selector Strip */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {onBackToOverview && (
              <button
                onClick={onBackToOverview}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0"
                title="Kembali ke Daftar Topik"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight font-sans truncate">
                {topicTitle}
              </h1>
              <p className="text-[11px] font-mono text-slate-500 font-medium">
                {readStageIds.length} dari {stages.length} bagian selesai dibaca ({Math.round((readStageIds.length / stages.length) * 100)}%)
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold shrink-0">
            <span>Bagian {String(currentStage.stageId).padStart(2, '0')} / {stages.length}</span>
          </div>
        </div>

        {/* Horizontal Stage Selector Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-0.5 border-t border-slate-100 pt-2.5">
          {stages.map((stg, idx) => {
            const isSelected = idx === currentStageIndex;
            const isRead = readStageIds.includes(stg.stageId);
            return (
              <button
                key={stg.id}
                onClick={() => {
                  playTactileClick(soundEnabled);
                  setCurrentStageIndex(idx);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/20'
                    : isRead
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 font-medium'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                {isRead && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                <span>Bagian {String(stg.stageId).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Single Hero Card Pembaca Materi */}
      <article className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        
        {/* Header Bagian */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono text-[11px] font-bold uppercase tracking-wider border border-blue-200/60">
              {currentStage.branchTitle}
            </span>
          </div>
          <div className="font-mono text-xs font-bold text-slate-500">
            BAGIAN {String(currentStage.stageId).padStart(2, '0')} DARI {stages.length}
          </div>
        </div>

        {/* Judul Bagian */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
          {currentStage.stageTitle}
        </h2>

        {/* Konten Materi dengan Paragraph Formatted Renderer */}
        <div className="space-y-5 pt-2">
          {renderFormattedContent(currentStage.content)}
        </div>

        {/* Kotak Poin Kunci (Selalu Terbuka Langsung di Bawah Konten) */}
        {currentStage.keyPoints && currentStage.keyPoints.length > 0 && (
          <div className="mt-8 rounded-2xl bg-indigo-50/70 border border-indigo-100/90 p-5 sm:p-6 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-900 font-mono text-xs uppercase tracking-wider font-bold">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>POIN KUNCI & RINGKASAN PRAKTIS</span>
            </div>
            <ul className="space-y-2.5">
              {currentStage.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-normal">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="flex-1 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      {/* 3. Universal Single Floating Dock di Bawah Layar (ADR-004) */}
      <div className="fixed bottom-4 left-0 right-0 z-30 flex justify-center px-4 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-2xl p-1.5 flex items-center gap-2 pointer-events-auto max-w-lg w-full justify-between">
          
          {/* Tombol Bagian Sebelumnya */}
          <button
            onClick={handlePrevStage}
            disabled={currentStageIndex === 0}
            className="p-3 rounded-xl hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-700 transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px]"
            title="Bagian Sebelumnya (Panah Kiri)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Kapsul Tengah: Status / Tandai Dibaca */}
          <button
            onClick={handleToggleRead}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs min-h-[44px] ${
              isCurrentRead
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-[0.99]'
            }`}
          >
            {isCurrentRead ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">BAGIAN {String(currentStage.stageId).padStart(2, '0')} · SUDAH DIBACA</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-200 shrink-0" />
                <span className="truncate">TANDAI SELESAI DIBACA</span>
              </>
            )}
          </button>

          {/* Tombol Bagian Selanjutnya */}
          <button
            onClick={handleNextStage}
            disabled={currentStageIndex === stages.length - 1}
            className="p-3 rounded-xl hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-700 transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px]"
            title="Bagian Selanjutnya (Panah Kanan)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>
      </div>

    </div>
  );
};
