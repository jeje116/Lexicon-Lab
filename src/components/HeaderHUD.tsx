import React from 'react';
import { 
  Flame, 
  ShieldAlert, 
  Layers, 
  Volume2, 
  VolumeX, 
  Command,
  Database,
  RefreshCw
} from 'lucide-react';

interface HeaderHUDProps {
  dailyStreak: number;
  clustersMasteredCount: number;
  totalLexemesLearned: number;
  soundEnabled: boolean;
  syncStatus?: 'connected' | 'mock' | 'syncing' | 'cache';
  onToggleSound: () => void;
  onOpenHotkeys: () => void;
  onResetData: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  dailyStreak,
  clustersMasteredCount,
  totalLexemesLearned,
  soundEnabled,
  syncStatus = 'mock',
  onToggleSound,
  onOpenHotkeys,
  onResetData
}) => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 select-none shadow-sm">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Sisi Kiri: Logo Bersih & Telemetri Desktop */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse glow-blue shrink-0" />
            <span className="font-mono text-sm sm:text-base font-extrabold tracking-wider text-slate-900 uppercase truncate">
              LEXICON<span className="text-blue-600">LAB</span>
            </span>
          </div>

          <span className="hidden lg:inline-block text-slate-300">|</span>

          {/* Desktop Version Tag */}
          <span className="hidden lg:inline-block text-slate-500 font-sans text-xs">
            Studio Masteri Kosa Kata
          </span>

          {/* Elimination Zero Tolerance Status Tag (Desktop & Tablets) */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-mono text-[11px] tracking-wide animate-subtle-pulse shrink-0">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span className="font-medium whitespace-nowrap">ZERO-TOLERANCE (1 SALAH = RESET TOTAL)</span>
          </div>
        </div>

        {/* Sisi Kanan: Streak, Status Sync & Tombol Audio Saja di Mobile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Google Sheets Data Sync Status Badge */}
          {syncStatus === 'connected' && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] tracking-wide shrink-0">
              <Database className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold">Sheets: Live</span>
            </div>
          )}
          {syncStatus === 'syncing' && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[11px] tracking-wide shrink-0">
              <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
              <span>Sheets: Syncing...</span>
            </div>
          )}
          {syncStatus === 'cache' && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px] tracking-wide shrink-0">
              <Database className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Sheets: Cached</span>
            </div>
          )}
          {syncStatus === 'mock' && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 font-mono text-[11px] tracking-wide shrink-0" title="Menggunakan data lokal bawaan. Setup Google Sheets di GOOGLE_SHEETS_SETUP.md">
              <Database className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Sheets: Mock Fallback</span>
            </div>
          )}
          
          {/* Quick Cluster Counter (Large Desktop Saja) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700">
            <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              <strong className="text-slate-900 tabular-nums font-bold">{clustersMasteredCount}</strong> Stage
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600">
              <strong className="text-slate-800 tabular-nums font-bold">{totalLexemesLearned}</strong> Kata
            </span>
          </div>

          {/* Daily Streak Flame */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs shadow-sm shrink-0">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-600 animate-bounce shrink-0" />
            <span className="font-bold tabular-nums tracking-wide">{dailyStreak}D</span>
            <span className="text-[10px] text-amber-700 hidden sm:inline uppercase font-bold">STREAK</span>
          </div>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center shrink-0 shadow-sm ${
              soundEnabled 
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-blue-600' 
                : 'bg-red-50 border-red-200 text-red-600'
            }`}
            title={soundEnabled ? 'Efek Suara Aktif (Klik untuk Matikan)' : 'Efek Suara Dimatikan (Klik untuk Aktifkan)'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Hotkey Helper Button (Desktop only) */}
          <button
            onClick={onOpenHotkeys}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors cursor-pointer min-h-[36px]"
            title="Daftar Pintasan Keyboard"
          >
            <Command className="w-3.5 h-3.5 text-slate-500" />
            <span>TOMBOL</span>
          </button>

          {/* Reset Demo Button (Desktop only) */}
          <button
            onClick={onResetData}
            className="hidden sm:inline-block text-xs font-mono text-slate-400 hover:text-slate-600 transition-colors cursor-pointer px-2 py-1"
            title="Reset progres ke awal"
          >
            RESET
          </button>
        </div>
      </div>
    </header>
  );
};
