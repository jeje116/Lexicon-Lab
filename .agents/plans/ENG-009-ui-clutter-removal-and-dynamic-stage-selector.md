# ENG-009 — UI Clutter Removal (HeaderHUD) & Dynamic Stage Selector (DailyLabView)

Status:
APPROVED

Risk Level:
LOW

---

# 1. Objective

1. Bersihkan seluruh teks tidak relevan pada header atas: hapus teks "Studio Masteri Kosa Kata" dan badge merah "ZERO-TOLERANCE (1 SALAH = RESET TOTAL)". Sisi kiri header kini hanya menampilkan logo bersih `LEXICONLAB` dengan pulsing blue dot.
2. Ubah tombol pemilihan stage di `DailyLabView` agar dinamis mengekstraksi seluruh `stageId` unik dari `allWords`, bukan hardcoded `[1, 2, 3]`.

---

# 2. Reason

- Sesuai prinsip UI/UX Zero-Clutter & Porcelain Slate Light Mode, header atas tidak boleh memuat label redundan atau badge teknis yang mengalihkan perhatian dari proses belajar.
- Aplikasi terintegrasi dengan Google Sheets dinamis yang dapat memuat lebih dari 3 stage; selektor stage statis `[1, 2, 3]` membatasi navigasi hanya ke 3 stage awal dan tidak mencerminkan data dinamis dari spreadsheet.

---

# 3. Files to Modify

- `src/components/HeaderHUD.tsx`
- `src/components/DailyLabView.tsx`
- `.agents/TASKS.md`

---

# 4. Files to Create

None.

---

# 5. In-Scope Behavior

- Di `HeaderHUD.tsx`:
  - Hapus pemisah `<span className="hidden lg:inline-block text-slate-300">|</span>`.
  - Hapus tag versi desktop `<span className="hidden lg:inline-block text-slate-500 font-sans text-xs">Studio Masteri Kosa Kata</span>`.
  - Hapus badge merah zero tolerance `<div className="hidden md:flex items-center gap-1.5 ...">ZERO-TOLERANCE...</div>`.
  - Bersihkan impor yang tidak terpakai (`ShieldAlert`).
- Di `DailyLabView.tsx`:
  - Destruktur `allWords = []` dari props `DailyLabViewProps`.
  - Hitung `availableStages = Array.from(new Set(allWords.map((w) => w.stageId).filter(Boolean))).sort((a, b) => a - b)`.
  - `const stagesToRender = availableStages.length > 0 ? availableStages : [1];`.
  - Ganti `[1, 2, 3].map(...)` dengan `stagesToRender.map(...)`.
  - Tambahkan penanganan horizontal scroll jika stage berjumlah banyak.

---

# 6. Out-of-Scope Behavior

- Tidak mengubah logika kuis, state zero-tolerance, atau pembobotan algoritma retensi.
- Tidak mengubah skema data atau komponen lain.

---

# 7. Untouched Components

- `src/components/NeuralVerbRetentionView.tsx`
- `src/components/MemoryMatrixView.tsx`
- `src/components/WordDetailModal.tsx`
- `src/components/HotkeyHelperModal.tsx`
- `src/utils/*`
- `src/services/*`

---

# 8. Dependencies

New dependencies:
None.

---

# 9. Data / Database Impact

Schema change: NO
Production data mutation: NO
Migration: N/A
Rollback: Revert `HeaderHUD.tsx` dan `DailyLabView.tsx`.

---

# 10. Risks

Functional: None.
Regression: None.

---

# 11. Oracle Contract

## Normal Case
Input / action:
Buka aplikasi di browser lokal atau jalankan pemeriksaan build.

Expected result:
- Header kiri hanya menampilkan dot biru dan `LEXICONLAB`. Teks "Studio Masteri Kosa Kata" dan badge "ZERO-TOLERANCE..." tidak lagi ada di DOM.
- Di DailyLabView, tombol stage dirender berdasarkan data `allWords`. Jika `allWords` memuat stage 1, 2, 3, ketiga tombol muncul. Jika ada data stage tambahan dari spreadsheet, tombol stage tambahan otomatis muncul.

## Boundary Case
Input / action:
`allWords` bernilai array kosong `[]`.

Expected result:
Fallback `stagesToRender` menghasilkan `[1]`, tidak melempar error runtime.

---

# 12. Required Verification

- `npx tsc --noEmit` -> PASS (0 error)
- `npm run build` -> PASS (0 error)

---

# 13. QA Handoff

Autonomous QA verification:
- Inspect header DOM structure.
- Inspect stage list rendering logic.
- Typecheck & build execution.

---

# 14. Approval

Approved by: User
Approved date: 2026-10-28
Approval evidence: Permintaan tugas eksplisit dari pengguna.

---

# 15. Plan Deviations

None.
