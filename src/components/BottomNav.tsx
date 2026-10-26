import React from 'react';
import { BookOpen, Zap, Grid3X3, Flame } from 'lucide-react';
import { TerminalMode, StagePhase } from '../types/lexicon';

interface BottomNavProps {
  currentMode: TerminalMode;
  onSelectMode: (mode: TerminalMode) => void;
  stagePhase: StagePhase;
  criticalDecayCount: number;
  isStageCleared: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentMode,
  onSelectMode,
  stagePhase,
  criticalDecayCount,
  isStageCleared
}) => {
  // Sembunyikan BottomNav secara otomatis saat sesi kuis aktif
  if (currentMode === 'stage' && stagePhase === 'quiz') {
    return null;
  }

  const isQuizActive = false;

  const navItems = [
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

  return (
    <nav 
      aria-label="Navigasi Utama" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]"
    >
      <div className="grid grid-cols-3 h-16 max-w-md mx-auto px-2">
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
