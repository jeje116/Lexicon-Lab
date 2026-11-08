import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookOpen, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { KnowledgeStageItem } from '../types/lexicon';
import { playTactileClick, playCorrectChime, speakWord } from '../utils/audio';

interface IndonesianVocabLabViewProps {
  stages: KnowledgeStageItem[];
  allStages: KnowledgeStageItem[];
  activeStageNumber: number;
  onSelectStage: (stageNum: number) => void;
  readStageIds: number[];
  onToggleReadStage: (stageId: number) => void;
  bookmarkedIds?: string[];
  onToggleBookmark?: (stageItemId: string) => void;
  soundEnabled: boolean;
}

/**
 * Ekstrak kata utama, kelas kata, dan inti makna dari KnowledgeStageItem
 */
function parseIndonesianStageItem(item: KnowledgeStageItem) {
  // Format stageTitle: "01. Eksentrik (Adjektiva)"
  const title = item.stageTitle || '';
  const match = title.match(/^(?:\d+\.\s*)?([^(]+)(?:\s*\(([^)]+)\))?/);
  const rawWord = match ? match[1].trim() : title;
  const rawPos = match && match[2] ? match[2].trim() : '';

  let posBadge = 'Kata';
  if (/adjektiva/i.test(rawPos)) {
    posBadge = 'Kata Sifat (Adjektiva)';
  } else if (/nomina/i.test(rawPos)) {
    posBadge = 'Kata Benda (Nomina)';
  } else if (/verba/i.test(rawPos)) {
    posBadge = 'Kata Kerja (Verba)';
  } else if (/adverbia/i.test(rawPos)) {
    posBadge = 'Kata Keterangan (Adverbia)';
  } else if (rawPos) {
    posBadge = rawPos;
  }

  // Ambil inti makna yang diapit ==...==
  const content = item.content || '';
  const coreMatch = content.match(/==([^=]+)==/);
  const coreMeaning = coreMatch 
    ? coreMatch[1].trim() 
    : content.split('\n\n')[0] || '';

  // Bersihkan teks konten untuk definisi lengkap (hapus == tapi jaga format)
  const cleanedContent = content.replace(/==([^=]+)==/g, '$1');

  return {
    word: rawWord.toLowerCase(),
    posBadge,
    coreMeaning,
    cleanedContent
  };
}

/**
 * Render teks dalam baris (mendukung **bold**)
 */
function renderInlineFormatted(text: string): React.ReactNode[] {
  return text.split(/(\*\*.*?\*\*)/g).map((segment, idx) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-blue-700 not-italic">
          {segment.slice(2, -2)}
        </strong>
      );
    }
    return <span key={idx}>{segment}</span>;
  });
}

export const IndonesianVocabLabView: React.FC<IndonesianVocabLabViewProps> = ({
  stages,
  allStages,
  activeStageNumber,
  onSelectStage,
  readStageIds,
  onToggleReadStage,
  bookmarkedIds = [],
  onToggleBookmark,
  soundEnabled
}) => {
  const [deckIndex, setDeckIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const MIN_SWIPE_DISTANCE = 105;
  const HORIZONTAL_DOMINANCE_RATIO = 2.0;

  // Reset deckIndex ke 0 saat berganti stage
  useEffect(() => {
    setDeckIndex(0);
  }, [activeStageNumber]);

  // Ekstraksi 50 nomor stage unik
  const stageNumbers = React.useMemo(() => {
    const setNums = new Set<number>();
    allStages.forEach(s => {
      const match = s.topicId.match(/id-stage-(\d+)/);
      if (match) {
        setNums.add(parseInt(match[1], 10));
      } else {
        setNums.add(1);
      }
    });
    return Array.from(setNums).sort((a, b) => a - b);
  }, [allStages]);

  const currentItem = stages[deckIndex] || stages[0];
  const isRead = currentItem ? readStageIds.includes(currentItem.stageId) : false;
  const isBookmarked = currentItem ? bookmarkedIds.includes(currentItem.id) : false;

  const inspectedCount = stages.filter(s => readStageIds.includes(s.stageId)).length;
  const isAllInspected = inspectedCount === stages.length && stages.length > 0;

  const handleDeckNext = () => {
    playTactileClick(soundEnabled);
    if (deckIndex < stages.length - 1) {
      setDeckIndex(prev => prev + 1);
    }
  };

  const handleDeckPrev = () => {
    playTactileClick(soundEnabled);
    if (deckIndex > 0) {
      setDeckIndex(prev => prev - 1);
    }
  };

  const handlePlayAudio = () => {
    if (!currentItem) return;
    const { word } = parseIndonesianStageItem(currentItem);
    setIsPlayingAudio(true);
    speakWord(word, 'id-ID');
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleToggleRead = () => {
    if (!currentItem) return;
    if (!isRead) {
      playCorrectChime(soundEnabled);
    } else {
      playTactileClick(soundEnabled);
    }
    onToggleReadStage(currentItem.stageId);
  };

  const handleNextStage = () => {
    if (activeStageNumber < stageNumbers.length) {
      playTactileClick(soundEnabled);
      onSelectStage(activeStageNumber + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleDeckPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleDeckNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        handlePlayAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deckIndex, stages.length, soundEnabled, currentItem]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const deltaX = touchStartRef.current.x - touchEnd.x;
    const deltaY = touchStartRef.current.y - touchEnd.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX >= MIN_SWIPE_DISTANCE && absX > absY * HORIZONTAL_DOMINANCE_RATIO) {
      if (deltaX > 0) {
        handleDeckNext();
      } else {
        handleDeckPrev();
      }
    }

    touchStartRef.current = null;
  };

  if (!currentItem) {
    return (
      <div className="p-8 text-center text-slate-400 font-mono text-xs">
        Memuat materi kosa kata Indonesia...
      </div>
    );
  }

  const { word, posBadge, coreMeaning, cleanedContent } = parseIndonesianStageItem(currentItem);
  const contentParagraphs = cleanedContent
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean);

  return (
    <div 
      className="flex-1 flex flex-col p-3 sm:p-6 max-w-xl mx-auto w-full min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-3.5rem)] space-y-4 pb-36 md:pb-28"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Header Ringkas: Nomor Stage & Judul Horizontal Strip (STAGE 01..50) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto no-scrollbar py-0.5">
          {stageNumbers.map((stgNum) => {
            const isActive = stgNum === activeStageNumber;
            // Anggap cleared jika semua 10 kata di stage tersebut sudah dibaca
            const topicIdForStg = `id-stage-${String(stgNum).padStart(2, '0')}`;
            const stgStages = allStages.filter(s => s.topicId === topicIdForStg);
            const isCleared = stgStages.length > 0 && stgStages.every(s => readStageIds.includes(s.stageId));

            return (
              <button
                key={stgNum}
                onClick={() => {
                  playTactileClick(soundEnabled);
                  onSelectStage(stgNum);
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isCleared
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <span>STAGE {String(stgNum).padStart(2, '0')}</span>
                {isCleared && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs text-slate-500 font-bold whitespace-nowrap">
            {inspectedCount}/{stages.length} Dibaca
          </span>
        </div>
      </div>

      {/* 2. Hero Vocabulary Flashcard Card (Identik dengan English Lexicon) */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        
        {/* Baris Atas: Badge Kelas Kata & Bookmark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200/80">
              {posBadge}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
              KBBI
            </span>
          </div>

          <button
            onClick={() => onToggleBookmark && onToggleBookmark(currentItem.id)}
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

        {/* Hero Kata Utama + Tombol Audio Suara */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
              {word}
            </h1>
            <div className="text-sm font-mono text-slate-400 font-normal">
              Kata {String(deckIndex + 1).padStart(2, '0')} dari {stages.length}
            </div>
          </div>

          <button
            onClick={handlePlayAudio}
            disabled={isPlayingAudio}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-xs active:scale-95 ${
              isPlayingAudio
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-600'
            }`}
            title="Dengarkan Pelafalan Bahasa Indonesia"
          >
            <Volume2 className={`w-6 h-6 sm:w-7 sm:h-7 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
          </button>
        </div>

        {/* Kotak Sorotan Biru: INTI MAKNA / PENGERTIAN */}
        <div className="bg-blue-50 border border-blue-200/70 rounded-2xl p-4 sm:p-5 space-y-1">
          <div className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">
            INTI MAKNA / PENGERTIAN
          </div>
          <div className="text-base sm:text-lg font-bold text-blue-950 tracking-tight leading-snug">
            {coreMeaning}
          </div>
        </div>

        {/* Definisi Lengkap & Nuansa */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
            DEFINISI LENGKAP & NUANSA:
          </div>
          <div className="space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed font-sans font-medium">
            {contentParagraphs.map((para, pIdx) => (
              <p key={pIdx}>
                {renderInlineFormatted(para)}
              </p>
            ))}
          </div>
        </div>

        {/* Contoh Penggunaan Kalimat */}
        {currentItem.keyPoints && currentItem.keyPoints.length > 0 && (
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>CONTOH PENGGUNAAN KALIMAT:</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
              {currentItem.keyPoints.map((sentence, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 font-sans leading-relaxed">
                    "{renderInlineFormatted(sentence)}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Floating Navigation Dock di Bawah Kartu */}
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

          {/* Bagian Tengah: Status Atau Tombol Lanjut Stage */}
          {isAllInspected && deckIndex === stages.length - 1 && activeStageNumber < stageNumbers.length ? (
            <button
              onClick={handleNextStage}
              className="flex-1 py-3 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer truncate"
            >
              <Sparkles className="w-4 h-4 text-blue-200 shrink-0" />
              <span className="truncate">LANJUT KE STAGE {String(activeStageNumber + 1).padStart(2, '0')}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          ) : (
            <button
              onClick={handleToggleRead}
              className={`flex-1 py-2.5 px-3 rounded-full font-mono text-xs font-bold transition-all cursor-pointer truncate flex items-center justify-center gap-1.5 ${
                isRead
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-blue-600 text-white shadow-xs hover:bg-blue-700'
              }`}
            >
              {isRead && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
              <span className="truncate">
                KATA {String(deckIndex + 1).padStart(2, '0')} / {stages.length} • {isRead ? 'SUDAH DIBACA' : 'TANDAI DIBACA'}
              </span>
            </button>
          )}

          {/* Panah Kanan */}
          <button
            onClick={handleDeckNext}
            disabled={deckIndex === stages.length - 1}
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
