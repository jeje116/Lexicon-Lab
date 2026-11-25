import React from 'react';
import { BookOpen, Zap, Grid3X3, List, Compass } from 'lucide-react';
import { TerminalMode, StagePhase } from '../types/lexicon';
import { BranchTopicSummary } from './CommandSidebar';

interface BottomNavProps {
  currentMode: TerminalMode;
  onSelectMode: (mode: TerminalMode) => void;
  stagePhase: StagePhase;
  criticalDecayCount: number;
  isStageCleared: boolean;
  activeBranchId?: string;
  branchTopics?: BranchTopicSummary[];
  selectedTopicId?: string;
  onSelectTopic?: (topicId: string) => void;
  onSelectBranch?: (branchId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentMode,
  onSelectMode,
  stagePhase,
  activeBranchId = 'english',
  branchTopics = [],
  selectedTopicId,
  onSelectTopic,
  onSelectBranch
}) => {
  const isEnglishBranch = activeBranchId === 'english';
  const isIndoBranch = activeBranchId === 'kosa-kata-indonesia';

  // Sembunyikan BottomNav secara otomatis saat sesi kuis aktif
  if ((isEnglishBranch || isIndoBranch) && currentMode === 'stage' && stagePhase === 'quiz') {
    return null;
  }

  const navItems = [
    {
      id: 'stage' as TerminalMode,
      label: 'Stage Lab',
      icon: BookOpen
    },
    {
      id: 'retention' as TerminalMode,
      label: 'Retensi',
      icon: Zap
    },
    {
      id: 'matrix' as TerminalMode,
      label: 'Matriks',
      icon: Grid3X3
    }
  ];

  // Mode Reader (Psychology, Economics, Statistics, dll.)
  if (!isEnglishBranch && !isIndoBranch) {
    return (
      <nav
        aria-label="Navigasi Topik"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 min-h-[68px] pb-[env(safe-area-inset-bottom)] bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.06)]"
      >
        <div className="flex items-center justify-between min-h-[68px] max-w-md mx-auto px-3 py-2 gap-2">
          {/* Pil Pemilih Topik yang Rapi dengan Truncate & Ikon Daftar Topik */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 min-w-0">
            {branchTopics.map((topic, idx) => {
              const isSelected = selectedTopicId === topic.topicId;
              const isSingleTopic = branchTopics.length === 1;
              return (
                <button
                  key={topic.topicId}
                  type="button"
                  onClick={() => onSelectTopic && onSelectTopic(topic.topicId)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer min-h-[44px] ${
                    isSingleTopic ? 'flex-1 min-w-0' : 'shrink-0 max-w-[205px]'
                  } ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200 text-blue-700 font-bold shadow-2xs'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100'
                  }`}
                  title={topic.topicTitle}
                >
                  <List className="w-4 h-4 shrink-0 text-blue-600" />
                  <span className="truncate flex-1 text-left">
                    {topic.topicTitle || `Topik ${idx + 1}`}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-white/80 text-slate-600 border border-slate-200/70 shrink-0 tabular-nums">
                    {topic.readStagesCount}/{topic.totalStages}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tombol Cepat Kembali ke English Lexicon */}
          {onSelectBranch && (
            <button
              type="button"
              onClick={() => onSelectBranch('english')}
              className="px-3 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-mono font-bold shrink-0 flex items-center gap-1.5 min-h-[44px] cursor-pointer active:scale-95 transition-all"
              title="Kembali ke English Lexicon"
            >
              <Compass className="w-4 h-4 text-blue-600 shrink-0" />
              <span>English</span>
            </button>
          )}
        </div>
      </nav>
    );
  }

  // Mode Vocabulary (English Lexicon / Kosa Kata Indonesia): 3 Tab Simetris Tanpa Badge Mengambang
  return (
    <nav
      aria-label="Navigasi Utama"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 min-h-[68px] pb-[env(safe-area-inset-bottom)] bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.06)]"
    >
      <div className="grid grid-cols-3 min-h-[68px] max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = currentMode === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectMode(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center relative py-2 gap-1 transition-all cursor-pointer group ${
                isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Indikator aktif tipis di sisi atas */}
              {isActive && (
                <span className="absolute top-0 w-10 h-0.5 bg-blue-600 rounded-full" />
              )}

              {/* Ikon bersih tanpa badge mengambang yang menabrak */}
              <div
                className={`p-1.5 rounded-xl transition-transform active:scale-90 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Label ringkas dan simetris */}
              <span
                className={`text-[11px] leading-none tracking-tight truncate max-w-[92px] ${
                  isActive ? 'text-blue-600 font-bold' : 'text-slate-500 font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
