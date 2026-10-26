import React from 'react';
import { 
  BookOpen, 
  Flame, 
  Zap, 
  Grid3X3, 
  ChevronLeft, 
  ChevronRight, 
  Layers,
  AlertTriangle
} from 'lucide-react';
import { TerminalMode, StagePhase } from '../types/lexicon';

interface CommandSidebarProps {
  currentMode: TerminalMode;
  onSelectMode: (mode: TerminalMode) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  inspectedCount: number;
  totalWordsInStage: number;
  criticalDecayCount: number;
  stagePhase: StagePhase;
  isStageCleared: boolean;
  currentStageId: number;
}

export const CommandSidebar: React.FC<CommandSidebarProps> = ({
  currentMode,
  onSelectMode,
  collapsed,
  onToggleCollapse,
  inspectedCount,
  totalWordsInStage,
  criticalDecayCount,
  stagePhase,
  isStageCleared,
  currentStageId
}) => {
  const isQuizActive = stagePhase === 'quiz';

  const navItems = [
    {
      id: 'stage' as TerminalMode,
      number: '01',
      title: 'Stage Lab',
      subtitle: isQuizActive ? 'Stage Quiz Aktif' : `Stage ${String(currentStageId).padStart(2, '0')} (${inspectedCount}/${totalWordsInStage} Kata)`,
      icon: isQuizActive ? Flame : BookOpen,
      badge: isQuizActive ? 'TOLERANSI-NOL' : isStageCleared ? 'CLEARED' : inspectedCount === totalWordsInStage ? 'SIAP KUIS' : `${totalWordsInStage - inspectedCount} LAGI`,
      badgeColor: isQuizActive 
        ? 'text-red-700 border-red-200 bg-red-50' 
        : isStageCleared 
        ? 'text-emerald-700 border-emerald-200 bg-emerald-50'
        : inspectedCount === totalWordsInStage 
        ? 'text-emerald-700 border-emerald-200 bg-emerald-50' 
        : 'text-blue-700 border-blue-200 bg-blue-50'
    },
    {
      id: 'retention' as TerminalMode,
      number: '02',
      title: 'Retensi Kata Kerja',
      subtitle: 'Pengulangan Berbobot (SRS)',
      icon: Zap,
      badge: 'SRS ENGINE',
      badgeColor: 'text-amber-700 border-amber-200 bg-amber-50'
    },
    {
      id: 'matrix' as TerminalMode,
      number: '03',
      title: 'Matriks Memori',
      subtitle: 'Kurva Ebbinghaus & Status',
      icon: Grid3X3,
      badge: criticalDecayCount > 0 ? `${criticalDecayCount} PERLU REVIEW` : 'OPTIMAL',
      badgeColor: criticalDecayCount > 0 ? 'text-amber-700 border-amber-200 bg-amber-50' : 'text-emerald-700 border-emerald-200 bg-emerald-50'
    }
  ];

  return (
    <aside 
      className={`hidden md:flex bg-white border-r border-slate-200 flex-col justify-between transition-all duration-200 select-none ${
        collapsed ? 'w-16' : 'w-64 xl:w-72'
      }`}
    >
      {/* Top: Section Header & Modes */}
      <div className="p-3">
        {/* Strip Header */}
        <div className="flex items-center justify-between px-2 py-2 mb-2 text-slate-400 font-mono text-[11px] tracking-wider uppercase border-b border-slate-100">
          {!collapsed && <span>MODUL SISTEM</span>}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors ml-auto cursor-pointer"
            title={collapsed ? "Perluas Sidebar" : "Perkecil Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = currentMode === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onSelectMode(item.id)}
                className={`w-full text-left rounded-2xl transition-all flex items-center cursor-pointer group relative ${
                  collapsed ? 'p-3 justify-center' : 'p-3 gap-3'
                } ${
                  isActive
                    ? 'bg-blue-50/70 border border-blue-200 text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
                title={collapsed ? `${item.number}. ${item.title}` : undefined}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full shadow-sm" />
                )}

                {/* Mode Icon */}
                <div className={`p-2 rounded-xl transition-colors shrink-0 ${
                  isActive ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 group-hover:text-slate-800'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-slate-400">
                        MODUL {item.number}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                      {item.title}
                    </div>

                    <div className="text-[11px] text-slate-500 truncate font-sans">
                      {item.subtitle}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Telemetry Card (Desktop only, when expanded) */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans">
          <div className="flex items-center gap-1.5 text-slate-800 font-bold mb-2.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>STATUS PROGRESS STAGE</span>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-600">
            <div className="flex justify-between">
              <span>Stage Aktif:</span>
              <span className="text-slate-900 font-bold font-mono">Stage {String(currentStageId).padStart(2, '0')}</span>
            </div>
            <div className="flex justify-between">
              <span>Telaah Kata:</span>
              <span className={inspectedCount === totalWordsInStage ? "text-emerald-700 font-bold font-mono" : "text-amber-700 font-bold font-mono"}>
                {inspectedCount}/{totalWordsInStage}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Status Kuis:</span>
              <span className={isStageCleared ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>
                {isStageCleared ? "CLEARED (10/10)" : "IN_PROGRESS"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Risiko Lupa:</span>
              <span className={criticalDecayCount > 0 ? "text-amber-700 font-bold" : "text-emerald-700 font-bold"}>
                {criticalDecayCount > 0 ? `${criticalDecayCount} Perlu Review` : "Aman"}
              </span>
            </div>
          </div>

          {criticalDecayCount > 0 && (
            <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[10px] text-amber-700 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>Ada kata kerja memudar! Coba Modul 02.</span>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
