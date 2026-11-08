import React from 'react';
import { BookOpen, Zap, Grid3X3, Flame, Compass } from 'lucide-react';
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
  criticalDecayCount,
  isStageCleared,
  activeBranchId = 'english',
  branchTopics = [],
  selectedTopicId,
  onSelectTopic,
  onSelectBranch
}) => {
  // Sembunyikan BottomNav secara otomatis saat sesi kuis aktif
  if (activeBranchId === 'english' && currentMode === 'stage' && stagePhase === 'quiz') {
    return null;
  }

  const isEnglishBranch = activeBranchId === 'english';
  const isIndoBranch = activeBranchId === 'kosa-kata-indonesia';
  const isQuizActive = false;

  const navItems = isIndoBranch ? [
    {
      id: 'stage' as TerminalMode,
      label: 'Stage Lab',
      icon: BookOpen,
      iconColor: 'text-blue-600',
      badge: isStageCleared ? 'LULUS' : '10 KATA',
      badgeColor: isStageCleared 
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-blue-50 text-blue-700 border-blue-200'
    }
  ] : [
    {
      id: 'stage' as TerminalMode,
      label: 'Stage Lab',
      icon: isQuizActive ? Flame : BookOpen,
      iconColor: isQuizActive ? 'text-red-600' : 'text-blue-600',
      badge: isQuizActive ? 'KUIS' : isStageCleared ? 'LULUS' : '10 KATA',
      badgeColor: isQuizActive 
        ? 'bg-red-50 text-red-700 border-red-200' 
        : isStageCleared 
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'retention' as TerminalMode,
      label: 'Retensi',
      icon: Zap,
      iconColor: 'text-amber-600',
      badge: 'SRS',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'matrix' as TerminalMode,
      label: 'Matriks',
      icon: Grid3X3,
      iconColor: 'text-emerald-600',
      badge: criticalDecayCount > 0 ? `${criticalDecayCount} REVIEW` : 'AMAN',
      badgeColor: criticalDecayCount > 0 
        ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' 
        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  if (!isEnglishBranch && !isIndoBranch) {
    return (
      <nav 
        aria-label="Navigasi Topik" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]"
      >
        <div className="flex items-center justify-between h-16 max-w-md mx-auto px-3 gap-2">
          {/* List topik dalam cabang */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 py-1">
            {branchTopics.map((topic, idx) => {
              const isSelected = selectedTopicId === topic.topicId;
              return (
                <button
                  key={topic.topicId}
                  onClick={() => onSelectTopic && onSelectTopic(topic.topicId)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate max-w-[140px]">{topic.topicTitle || `Topik ${idx + 1}`}</span>
                  <span className="text-[10px] font-mono opacity-80">({topic.readStagesCount}/{topic.totalStages})</span>
                </button>
              );
            })}
          </div>

          {/* Tombol Cepat Kembali ke English Lexicon */}
          {onSelectBranch && (
            <button
              onClick={() => onSelectBranch('english')}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-mono font-bold shrink-0 flex items-center gap-1"
              title="Kembali ke English Lexicon"
            >
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>English</span>
            </button>
          )}
        </div>
      </nav>
    );
  }

  return (
    <nav 
      aria-label="Navigasi Utama" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]"
    >
      <div className={`grid ${navItems.length === 1 ? 'grid-cols-1' : 'grid-cols-3'} h-16 max-w-md mx-auto px-2`}>
        {navItems.map((item) => {
          const isActive = currentMode === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectMode(item.id)}
              className={`flex flex-col items-center justify-center relative py-1 min-h-[48px] transition-all cursor-pointer group ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Active top pill indicator */}
              {isActive && (
                <span className="absolute top-0 w-10 h-0.5 bg-blue-600 rounded-full" />
              )}

              {/* Icon Container with subtle glow on active */}
              <div className="relative mb-0.5">
                <div className={`p-1.5 rounded-xl transition-transform active:scale-90 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 shadow-sm' 
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Micro Badge for status */}
                {item.badge && (
                  <span className={`absolute -top-1 -right-2 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full border leading-none scale-90 ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Punchy Label */}
              <span className={`text-[11px] font-medium tracking-tight truncate max-w-[90px] ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
