# Project Context: English Vocabulary & Verb Retention Web App

Last updated: 2026-09-25

---

## 1. Project Overview & Mission

- **Name**: English Vocabulary & Verb Retention Web App
- **Core Mission**: Platform pembelajaran mandiri kosa kata bahasa Inggris harian:
  - **Daily Words**: 10 kosa kata baru per hari yang disesuaikan dengan level kecakapan (A1–C2 / CEFR).
  - **Zero-Tolerance Daily Quiz**: Kuis verifikasi kelulusan dengan sistem gugur ketat (1 kesalahan langsung menghentikan sesi, mereset progres, dan mengacak ulang urutan pertanyaan dari nomor 1).
  - **Distributed Verb Retention Test**: Tes retensi kata kerja terdistribusi berbasis algoritma pembobotan (weighted random selection) untuk memprioritaskan kata yang memiliki riwayat kegagalan tinggi.

---

## 2. UI/UX Design Direction

Mengadopsi estetika clean, modern, dan minimalis yang terinspirasi dari **Google AI Studio**:
- **Color Palette**: Dark theme / netral modern (deep neutral canvas, subtle borders, high-contrast surface cards, primary accent blue `#1a73e8` / `#8ab4f8`).
- **Layout Architecture**: Split view dengan Left Sidebar navigation yang compact/collapsible, Top Header status bar, dan Main Canvas area yang terfokus pada konten belajar dan kuis tanpa distraksi.
- **Typography & Components**:
  - Sans-serif modern (Inter / Roboto) untuk copy antarmuka.
  - Monospace font untuk badges, metadata, shortcuts, level indicators, dan IPA phonetics.
  - Modular cards dengan hairline borders (1px solid border subtle), pill badges, dan action prompts yang presisi.

---

## 3. Architecture & Tech Stack

- **Framework**: React (Vite)
- **Language**: TypeScript / Modern JavaScript
- **Styling**: Tailwind CSS & custom modern CSS tokens matching Google AI Studio design system
- **Icons**: Lucide Icons / Lucide React
- **Data & Storage Layer**:
  - Phase 1: Local structured JSON mock layer & browser localStorage untuk session / state tracking.
  - Phase 2: Google Sheets API / Apps Script connector sebagai remote tabular database (sheet-as-a-database) untuk sinkronisasi kosa kata dan log retensi pengguna.
- **State Management**: React state + custom hooks (decoupled quiz/retention/storage logic)

---

## 4. System Invariants & Rules

1. **Daily Progression**: 10 kata per hari disajikan bertahap sebelum kuis dibuka.
2. **Strict Quiz Gate**: Zero tolerance — kelulusan kuis harian wajib 100% akurat sebelum hari dinyatakan lulus/selesai.
3. **Retention Weighting**: Kata dengan rasio retensi rendah atau sering gagal memiliki probabilitas kemunculan lebih tinggi pada sesi review berkala.

---

## 5. Verified Implementation Baseline (post Final Lexicon Lab Setup)

- **Product Name**: Lexicon Lab
- **Theme**: Light Mode Porcelain Slate (`slate-50` background `#F8FAFC`, `slate-900` text `#0F172A`, `slate-200/80` borders, Plus Jakarta Sans & JetBrains Mono).
- **Core Engine & Architecture**:
  - `src/types/lexicon.ts`: Interface kontrak `WordItem`, `QuizQuestion`, `QuizVariant` (`TYPE_TRANSLATION` & `MCQ_DEFINITION`), `MemoryTier`.
  - `src/data/mockLexicon.ts`: Dataset 30 kata/verba (Stage 01, 02, 03) lengkap dengan definisi, terjemahan, dan kalimat konteks.
  - `src/utils/audio.ts`: Synthesizer Web Audio API (chime, buzzer, fanfare) dan Web Speech synthesis audio player.
  - `src/utils/retentionAlgorithm.ts`: Generator 20 soal acak per stage kuis (10 ketik terjemahan 100% exact match + 10 pilgan definisi 4 opsi), sampling retensi verba terbobot Ebbinghaus, kalkulator decay rate & health gauge.
  - `src/utils/storage.ts`: LocalStorage data adapter untuk streak, clearedStages, bookmarks, dan riwayat retensi kata.
- **UI Components**:
  - `HeaderHUD.tsx`: Header bersih (logo, zero-tolerance badge, streak flame, sound toggle, modal tombol keyboard).
  - `CommandSidebar.tsx`: Navigasi desktop 3 modul (Stage Lab, Retensi Kata Kerja, Matriks Memori).
  - `BottomNav.tsx`: Bottom navigation bar mobile yang otomatis disembunyikan saat kuis berlangsung.
  - `DailyLabView.tsx`: Flashcard single clean card, Single Floating Dock terintegrasi `[ < ] [ MULAI KUIS (20 SOAL) ] [ > ]`, kuis eliminasi 20 soal acak, layar gugur, dan layar kemenangan.
  - `NeuralVerbRetentionView.tsx`: Retensi kata kerja dengan header ultra-bersih tanpa badge distraksi, kuis dinamis ketik atau pilgan, dan tombol submit berada lega di bawah input.
  - `MemoryMatrixView.tsx`: Matriks retensi memori dengan filter level CEFR, filter status memori Ebbinghaus, dan live search.
  - `WordDetailModal.tsx` & `HotkeyHelperModal.tsx`: Modal interaktif detail kata dan shortcut keyboard.
- **Verification Evidence**: `npm run build` PASS (0 errors, 952ms), typecheck PASS (0 errors), end-to-end browser runtime QA PASS dengan zero console errors.

