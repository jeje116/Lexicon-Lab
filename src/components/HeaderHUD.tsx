import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  Layers, 
  Volume2, 
  VolumeX, 
  Command,
  Database,
  RefreshCw,
  ChevronDown,
  Compass,
  CloudOff,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ProgressSyncState } from '../utils/sheetsSync';

export interface LearningBranch {
  id: string;
  title: string;
  badge?: string;
}

interface HeaderHUDProps {
  dailyStreak: number;
  clustersMasteredCount: number;
  totalLexemesLearned: number;
  soundEnabled: boolean;
  syncStatus?: 'connected' | 'mock' | 'syncing' | 'cache';
  progressSyncState?: ProgressSyncState;
  syncError?: string | null;
  hasPendingSync?: boolean;
  lastSyncedAt?: string | null;
  onManualSync?: () => void;
  branches?: LearningBranch[];
  activeBranchId?: string;
  onSelectBranch?: (branchId: string) => void;
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
  progressSyncState = 'unconfigured',
  syncError,
  hasPendingSync = false,
  lastSyncedAt,
  onManualSync,
  branches = [],
  activeBranchId = 'english',
  onSelectBranch,
  onToggleSound,
  onOpenHotkeys,
  onResetData
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  // Status sinkronisasi progres jujur (ANTI false-positive 'Sheets: Synced')
  // Hijau 'Sheets: Synced' HANYA jika progressSyncState === 'synced' dan tidak ada antrean tertunda!
  const isActivelySyncing = progressSyncState === 'syncing' || syncStatus === 'syncing';
  const isNeedsGasUpdate = !isActivelySyncing && progressSyncState === 'needs_gas_update';
  const isSyncError = !isActivelySyncing && progressSyncState === 'error';
  const isOfflineState = !isActivelySyncing && !isNeedsGasUpdate && !isSyncError && (progressSyncState === 'offline' || hasPendingSync);
  const isSyncedLive = !isActivelySyncing && !isNeedsGasUpdate && !isSyncError && !isOfflineState && progressSyncState === 'synced';
  const isCachedOnly = !isActivelySyncing && !isNeedsGasUpdate && !isSyncError && !isOfflineState && !isSyncedLive && syncStatus === 'cache';

  const formattedLastSync = lastSyncedAt
    ? new Date(lastSyncedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    : null;

  const syncTooltip = isActivelySyncing
    ? 'Sedang menyinkronkan progres dengan Google Sheets...'
    : isNeedsGasUpdate
    ? syncError || 'Deployment Google Apps Script belum mendukung getProgress/saveProgress. Deploy ulang Code.gs ke New Version.'
    : isSyncError
    ? syncError || 'Gagal menyinkronkan progres ke tab UserProgress Google Sheets. Klik untuk coba lagi.'
    : isOfflineState
    ? syncError || 'Offline / ada progres tertunda. Klik untuk coba sinkronkan sekarang.'
    : isSyncedLive
    ? `Progres UserProgress tersinkron dengan Google Sheets${formattedLastSync ? ` (${formattedLastSync})` : ''}. Klik untuk sinkronisasi manual sekarang.`
    : 'VITE_GOOGLE_SHEETS_API_URL belum dikonfigurasi (mode lokal).';

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 select-none shadow-xs">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Kiri: Logo Ringkas LEXICONLAB */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-600 animate-pulse glow-blue shrink-0" />
          <span className="font-mono text-xs sm:text-base font-extrabold tracking-wide sm:tracking-wider text-slate-900 uppercase">
            LEXICON<span className="text-blue-600">LAB</span>
          </span>
        </div>

        {/* Tengah (Mobile) / Kiri-Tengah (Desktop): Dropdown Cabang Pembelajaran */}
        {branches.length > 0 && onSelectBranch && (
          <div
            className="relative flex-1 min-w-0 max-w-[165px] sm:flex-initial sm:max-w-[230px] sm:mr-auto"
            ref={dropdownRef}
          >
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-full sm:w-auto flex items-center justify-between gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 text-slate-800 font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              title="Pilih Cabang Pembelajaran"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate flex-1 text-left">
                {activeBranch ? activeBranch.title : 'English Lexicon'}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-150 ${
                  isDropdownOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-1.5 w-64 bg-white/98 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 font-sans">
                <div className="px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                  CABANG PEMBELAJARAN
                </div>
                <div className="space-y-0.5">
                  {branches.map((b) => {
                    const isSelected = b.id === activeBranchId;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          onSelectBranch(b.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm transition-colors text-left cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isSelected ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          />
                          <span className="truncate">{b.title}</span>
                        </div>
                        {b.badge && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md shrink-0 ml-2 ${
                              isSelected ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {b.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Menu Sinkronisasi Cloud untuk Mobile (dan akses cepat) */}
                {onManualSync && (
                  <div className="mt-1.5 pt-1.5 border-t border-slate-100 sm:hidden space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        onManualSync();
                      }}
                      disabled={isActivelySyncing}
                      title={syncTooltip}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer disabled:opacity-60 ${
                        isNeedsGasUpdate || isSyncError
                          ? 'bg-red-50 text-red-700 hover:bg-red-100'
                          : isOfflineState
                          ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                          : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700'
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        {isActivelySyncing ? (
                          <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
                        ) : isNeedsGasUpdate || isSyncError ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        ) : isOfflineState ? (
                          <CloudOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        ) : isSyncedLive ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <Database className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        )}
                        <span className="truncate">
                          {isActivelySyncing
                            ? 'Menyinkronkan...'
                            : isNeedsGasUpdate
                            ? 'Perlu Update GAS'
                            : isSyncError
                            ? 'Sync Gagal · Retry'
                            : isOfflineState
                            ? 'Offline · Coba Sync'
                            : isSyncedLive
                            ? 'Synced · Sync Ulang'
                            : 'Sinkronkan Cloud'}
                        </span>
                      </span>
                      {formattedLastSync && isSyncedLive && !isActivelySyncing && (
                        <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                          {formattedLastSync}
                        </span>
                      )}
                    </button>
                    {(isNeedsGasUpdate || isSyncError) && syncError && (
                      <p className="px-2.5 text-[10px] leading-snug text-red-600 font-sans">
                        {syncError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Kanan: Badge Sync (Desktop), Streak Ringkas & Tombol Audio */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Google Sheets Bi-Directional Sync Pill (Clickable Manual Sync - Desktop) */}
          <button
            type="button"
            onClick={onManualSync}
            disabled={!onManualSync || isActivelySyncing}
            title={syncTooltip}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[11px] tracking-wide shrink-0 transition-all ${
              onManualSync ? 'cursor-pointer active:scale-95' : 'cursor-default'
            } ${
              isActivelySyncing
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : isNeedsGasUpdate || isSyncError
                ? 'bg-red-50 hover:bg-red-100 border-red-200 text-red-700'
                : isOfflineState
                ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800'
                : isSyncedLive
                ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700'
                : isCachedOnly
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500'
            }`}
          >
            {isActivelySyncing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
                <span className="font-semibold">Menyinkronkan...</span>
              </>
            ) : isNeedsGasUpdate ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="font-semibold">Perlu Update GAS</span>
              </>
            ) : isSyncError ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="font-semibold">Sync Gagal</span>
              </>
            ) : isOfflineState ? (
              <>
                <CloudOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="font-semibold">Offline</span>
              </>
            ) : isSyncedLive ? (
              <>
                <Database className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">Sheets: Synced</span>
                <RefreshCw className="w-3 h-3 text-emerald-500 opacity-75 shrink-0" />
              </>
            ) : isCachedOnly ? (
              <>
                <Database className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Sheets: Cached</span>
              </>
            ) : (
              <>
                <Database className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Sheets: Mock</span>
              </>
            )}
          </button>
          
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

          {/* Daily Streak Flame (Ringkas di Mobile) */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs shadow-xs shrink-0">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500 text-amber-600 shrink-0" />
            <span className="font-bold tabular-nums tracking-wide">{dailyStreak}D</span>
            <span className="text-[10px] text-amber-700 hidden sm:inline uppercase font-bold">STREAK</span>
          </div>

          {/* Sound Synthesizer Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className={`w-9 h-9 rounded-xl border transition-colors cursor-pointer flex items-center justify-center shrink-0 shadow-xs ${
              soundEnabled 
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-blue-600' 
                : 'bg-red-50 border-red-200 text-red-600'
            }`}
            title={soundEnabled ? 'Efek Suara Aktif (Klik untuk Matikan)' : 'Efek Suara Dimatikan (Klik untuk Aktifkan)'}
            aria-label={soundEnabled ? 'Matikan suara' : 'Aktifkan suara'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Hotkey Helper Button (Desktop only) */}
          <button
            type="button"
            onClick={onOpenHotkeys}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors cursor-pointer min-h-[36px]"
            title="Daftar Pintasan Keyboard"
          >
            <Command className="w-3.5 h-3.5 text-slate-500" />
            <span>TOMBOL</span>
          </button>

          {/* Reset Demo Button (Desktop only) */}
          <button
            type="button"
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
