import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface HotkeyHelperModalProps {
  onClose: () => void;
}

export const HotkeyHelperModal: React.FC<HotkeyHelperModalProps> = ({ onClose }) => {
  const shortcuts = [
    { key: '1, 2, 3, 4', desc: 'Pilih opsi pilihan ganda langsung pada kuis' },
    { key: 'Enter', desc: 'Kirim jawaban ketik pada kuis atau sesi retensi' },
    { key: 'Spasi / Panah Kanan', desc: 'Lanjut ke kata berikutnya pada flashcard stage' },
    { key: 'Panah Kiri', desc: 'Kembali ke kata sebelumnya pada flashcard stage' },
    { key: 'Alt + 1', desc: 'Pindah ke Tab 01: Stage Lab' },
    { key: 'Alt + 2', desc: 'Pindah ke Tab 02: Retensi Kata Kerja' },
    { key: 'Alt + 3', desc: 'Pindah ke Tab 03: Matriks Memori' },
    { key: 'Esc', desc: 'Tutup jendela modal yang sedang aktif' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 pr-10">
          <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 shrink-0">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              PINTASAN KEYBOARD
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              Navigasi berkecepatan tinggi untuk pengalaman belajar tanpa hambatan
            </p>
          </div>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-[60vh] overflow-y-auto">
          {shortcuts.map((sc, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-2"
            >
              <span className="text-slate-700 font-sans text-xs font-medium">{sc.desc}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white text-blue-700 border border-slate-200 font-bold text-[10px] sm:text-[11px] shadow-sm shrink-0">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold cursor-pointer min-h-[40px] shadow-sm transition-colors"
          >
            MENGERTI [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
