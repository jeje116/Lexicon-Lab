import { useState } from 'react';
import { 
  Grid3X3, 
  Search, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Bookmark, 
  Activity,
  Volume2
} from 'lucide-react';
import { WordItem, WordRetentionStats } from '../types/lexicon';
import { calculateRetentionStrength, getMemoryTier } from '../utils/retentionAlgorithm';
import { WordDetailModal } from './WordDetailModal';
import { playTactileClick, speakLexeme } from '../utils/audio';

interface MemoryMatrixViewProps {
  allWords: WordItem[];
  statsMap: Record<string, WordRetentionStats>;
  onToggleBookmark: (wordId: string) => void;
  soundEnabled: boolean;
}

export const MemoryMatrixView: React.FC<MemoryMatrixViewProps> = ({
  allWords,
  statsMap,
  onToggleBookmark,
  soundEnabled
}) => {
  const [filterType, setFilterType] = useState<'all' | 'verb' | 'adjective' | 'critical' | 'mastered' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<WordItem | null>(null);

  // Filter calculations
  const filteredWords = allWords.filter(word => {
    const stats = statsMap[word.id];
    const tier = getMemoryTier(stats);
    const isBookmarked = stats?.isBookmarked;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match = word.word.toLowerCase().includes(q) || 
                    word.translation.toLowerCase().includes(q) ||
                    word.definition.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filterType === 'verb') return word.partOfSpeech === 'verb';
    if (filterType === 'adjective') return word.partOfSpeech === 'adjective';
    if (filterType === 'critical') return tier === 'CRITICAL' || tier === 'VULNERABLE';
    if (filterType === 'mastered') return stats?.isMastered || tier === 'CRYSTALLIZED';
    if (filterType === 'bookmarked') return isBookmarked;

    return true;
  });

  const totalCount = allWords.length;
  const criticalCount = allWords.filter(w => getMemoryTier(statsMap[w.id]) === 'CRITICAL').length;
  const vulnerableCount = allWords.filter(w => getMemoryTier(statsMap[w.id]) === 'VULNERABLE').length;
  const masteredCount = allWords.filter(w => statsMap[w.id]?.isMastered || getMemoryTier(statsMap[w.id]) === 'CRYSTALLIZED').length;

  const averageRetention = Math.round(
    allWords.reduce((sum, w) => sum + calculateRetentionStrength(statsMap[w.id]), 0) / (totalCount || 1)
  );

  const handleWordClick = (word: WordItem) => {
    playTactileClick(soundEnabled);
    setSelectedWord(word);
  };

  const filterButtons = [
    { id: 'all', label: 'Semua Kata', count: totalCount },
    { id: 'verb', label: 'Kata Kerja', count: allWords.filter(w => w.partOfSpeech === 'verb').length },
    { id: 'adjective', label: 'Kata Sifat', count: allWords.filter(w => w.partOfSpeech === 'adjective').length },
    { id: 'critical', label: 'Perlu Diulang', count: criticalCount + vulnerableCount, alert: criticalCount > 0 },
    { id: 'mastered', label: 'Dikuasai', count: masteredCount },
    { id: 'bookmarked', label: 'Ditandai', count: allWords.filter(w => statsMap[w.id]?.isBookmarked).length },
  ];

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-3.5rem)] space-y-4 sm:space-y-6 pb-24 md:pb-8">
      
      {/* Top Header & Telemetry Summary */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shrink-0">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  MATRIKS RETENSI MEMORI
                </h2>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-bold">
                  KURVA EBBINGHAUS
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-sans mt-0.5">
                Pemantauan kekuatan memori dan pembusukan retensi seluruh kosa kata yang telah dipelajari.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-[11px] sm:text-xs font-bold">
              KESEHATAN MEMORI: <strong className="text-emerald-700 tabular-nums">{averageRetention}%</strong>
            </div>
          </div>
        </div>

        {/* 4 Status Tiers Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-4 font-mono">
          <div className="p-3 sm:p-3.5 rounded-xl bg-red-50/70 border border-red-200">
            <div className="text-[10px] text-red-700 font-bold uppercase mb-1 flex items-center justify-between">
              <span>KRITIS (&lt;40%)</span>
              <AlertTriangle className="w-3 h-3 text-red-600" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-red-700 tabular-nums">
              {criticalCount} <span className="text-[10px] font-normal text-slate-500">kata</span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="text-[10px] text-amber-800 font-bold uppercase mb-1 flex items-center justify-between">
              <span>RENTAN (40-70%)</span>
              <Clock className="w-3 h-3 text-amber-600" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-700 tabular-nums">
              {vulnerableCount} <span className="text-[10px] font-normal text-slate-500">kata</span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="text-[10px] text-blue-800 font-bold uppercase mb-1 flex items-center justify-between">
              <span>KONSOLIDASI</span>
              <Activity className="w-3 h-3 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-blue-700 tabular-nums">
              {allWords.filter(w => getMemoryTier(statsMap[w.id]) === 'CONSOLIDATING').length} <span className="text-[10px] font-normal text-slate-500">kata</span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="text-[10px] text-emerald-800 font-bold uppercase mb-1 flex items-center justify-between">
              <span>DIKUASAI (&gt;90%)</span>
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 tabular-nums">
              {masteredCount} <span className="text-[10px] font-normal text-slate-500">kata</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-2.5">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kata bahasa Inggris atau terjemahan Indonesia..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
          />
        </div>

        {/* Scrollable Filter Chips for Mobile & Desktop */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {filterButtons.map((btn) => {
            const isActive = filterType === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => {
                  playTactileClick(soundEnabled);
                  setFilterType(btn.id as any);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 min-h-[38px] ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                }`}
              >
                <span>{btn.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {btn.count}
                </span>
                {btn.alert && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lexeme Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredWords.map((word) => {
          const stats = statsMap[word.id];
          const retention = calculateRetentionStrength(stats);
          const tier = getMemoryTier(stats);
          const isBookmarked = stats?.isBookmarked;

          const tierColor = 
            tier === 'CRYSTALLIZED' ? 'text-emerald-800 border-emerald-200 bg-emerald-50' :
            tier === 'CONSOLIDATING' ? 'text-blue-800 border-blue-200 bg-blue-50' :
            tier === 'VULNERABLE' ? 'text-amber-800 border-amber-200 bg-amber-50' :
            'text-red-800 border-red-200 bg-red-50';

          const tierLabelIndo = 
            tier === 'CRYSTALLIZED' ? 'Mengkristal' :
            tier === 'CONSOLIDATING' ? 'Konsolidasi' :
            tier === 'VULNERABLE' ? 'Rentan' : 'Kritis';

          return (
            <div
              key={word.id}
              onClick={() => handleWordClick(word)}
              className="group p-5 rounded-2xl bg-white hover:bg-blue-50/20 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {word.partOfSpeech}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-slate-500">
                      {word.cefr}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakLexeme(word.word);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                      title="Dengar suara"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(word.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-amber-500 transition-colors"
                      title={isBookmarked ? 'Hapus bookmark' : 'Tandai kata'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Word & Indonesian Translation */}
                <h4 className="text-lg font-extrabold text-slate-900 uppercase font-sans tracking-tight group-hover:text-blue-600 transition-colors">
                  {word.word}
                </h4>
                <p className="text-xs sm:text-sm font-bold text-blue-900 font-sans mt-0.5 line-clamp-1">
                  {word.translation}
                </p>

                {/* Brief Definition */}
                <p className="text-xs text-slate-600 font-sans mt-1.5 line-clamp-2 leading-relaxed">
                  {word.definition}
                </p>
              </div>

              {/* Bottom Retention Bar */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${tierColor}`}>
                  {tierLabelIndo}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Retensi:</span>
                  <span className={`font-bold tabular-nums text-xs ${
                    retention > 70 ? 'text-emerald-700' : retention > 40 ? 'text-amber-700' : 'text-red-600'
                  }`}>
                    {retention}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWords.length === 0 && (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl font-sans text-sm text-slate-500 shadow-sm">
          Tidak ada kosa kata yang cocok dengan filter atau pencarian Anda.
        </div>
      )}

      {/* Word Detail Inspection Modal */}
      {selectedWord && (
        <WordDetailModal
          word={selectedWord}
          stats={statsMap[selectedWord.id]}
          onClose={() => setSelectedWord(null)}
          onToggleBookmark={onToggleBookmark}
          soundEnabled={soundEnabled}
        />
      )}
    </div>
  );
};
