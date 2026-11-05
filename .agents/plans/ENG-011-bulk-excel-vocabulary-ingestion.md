# ENG-011 — Bulk Excel Vocabulary Ingestion (423 New Words, Stage 04–46) & Optional Field UI Polish

Status:
APPROVED

Risk Level:
MEDIUM

---

# 1. Objective

1. **Ingestion & Kurasi Master Vocabulary**:
   - Memproses file `Master_Vocabulary_432_Unique.xlsx` (432 entri kata unik).
   - Melakukan pembersihan nama kata secara deterministik (huruf kecil / `lowercase`, menghapus format penjelasan dalam kurung seperti `"Implying (Verb (-ing form))"` menjadi `"imply"`).
   - Menghapus 9 kata yang sudah ada di Stage 1–3 (`ubiquitous`, `exacerbate`, `scrutinize`, `corroborate`, `mitigate`, `substantiate`, `pragmatic`, `meticulous`, `fastidious`), sehingga tersisa tepat 423 kata baru.
   - Memetakan dan menormalisasi `part_of_speech` dari format majemuk (seperti `"Noun / Verb"`, `"Adjective / Noun"`) menjadi salah satu union valid: `'verb' | 'adjective' | 'noun' | 'adverb'`.
   - Menghasilkan kolom `translation` yang ringkas, bersih, dan ramah pengetikan (1–3 frasa sinonim dipisahkan tanda `/`) dari kolom `Arti (Indonesia)` agar pengguna dapat menjawab kuis ketik (`TYPE_TRANSLATION` dan `TYPE_WORD_EN`) secara presisi.
   - Menempatkan penjelasan lengkap dari `Arti (Indonesia)` ke dalam kolom `definition`.
   - Mengelompokkan 423 kata baru tersebut ke dalam Stage 04 hingga Stage 46 (10 kata per stage untuk Stage 04–45, dan 3 kata untuk Stage 46) sehingga total kosakata sistem menjadi 453 kata.

2. **Ketahanan UI Terhadap Kolom Opsional Kosong (UI Polish)**:
   - `src/components/DailyLabView.tsx`: Pastikan badge/label fonetik tidak merender kotak/elemen kosong jika `phonetic` bernilai kosong (`""`). Sembunyikan blok "CONTOH PENGGUNAAN & TERJEMAHAN" secara rapi jika `contextSentences` tidak memiliki contoh kalimat bahasa Inggris yang valid.
   - `src/components/NeuralVerbRetentionView.tsx`: Hindari render bullet pemisah (`•`) yang menggantung jika `phonetic` kosong. Sembunyikan kartu contoh penggunaan jika kalimat contoh belum tersedia.
   - `src/components/WordDetailModal.tsx`: Sembunyikan badge fonetik dan blok contoh penggunaan jika bernilai kosong.
   - `src/services/vocabService.ts`: Perluas fungsi normalisasi `part_of_speech` agar dapat mengurai format string gabungan seperti `"Noun / Verb"` dan `"Adjective / Noun"`.

3. **Integrasi Pengunggahan ke Google Spreadsheet (Hostless Backend)**:
   - Perbarui handler `doPost(e)` di `GOOGLE_SHEETS_SETUP.md` (`Code.gs`) untuk mendukung aksi batch ingestion (`action === 'appendVocab'` / `'appendVocabBatch'`).
   - Sediakan 2 jalur pengunggahan sekaligus:
     * **Jalur A (Automated HTTP Script)**: Script Node.js `scripts/import_master_excel.mjs` yang mengirimkan batch kata via POST ke `VITE_GOOGLE_SHEETS_API_URL`.
     * **Jalur B (1-Detik Copy-Paste TSV)**: File `Master_Vocabulary_Ready_For_Sheets.tsv` (10 kolom presisi) yang dapat langsung ditempelkan pengguna ke baris 32 tab `Vocabulary` di Google Sheets tanpa harus deploy ulang skrip jika tidak diinginkan.
   - Lakukan reset sanitasi pada tab `UserProgress` via POST HTTP ke `VITE_GOOGLE_SHEETS_API_URL` agar progres kembali bersih (`clearedStages: []`, `dailyStreak: 1`, `wordStats: {}`).

---

# 2. Reason

1. **Kebutuhan Kurikulum Kosakata Komprehensif**: Lexicon Lab saat ini baru memiliki 30 kata (Stage 1–3). Pengguna memiliki master dataset 432 kata level B2–C2 yang perlu dimasukkan ke dalam alur belajar harian dan retensi memori.
2. **Kerapian Tampilan Saat Data Parsial**: Pada data baru dari Excel, kolom `phonetic` dan `contextSentences` mungkin belum terisi. Jika komponen UI tidak melakukan *conditional rendering* dengan ketat, pengguna akan melihat kotak kosong, teks `undefined`, atau bullet pemisah yang menggantung.
3. **Kompatibilitas Tipe & Input Kuis**: Jawaban kuis ketik (`TYPE_TRANSLATION`) membutuhkan format terjemahan yang manusiawi. Kolom `Arti (Indonesia)` di Excel seringkali berbentuk paragraf panjang dengan tanda baca rumit; oleh karena itu, perlu diekstrak kata/frasa kuncinya menjadi format `translation` yang dapat divalidasi oleh `isExactTranslationMatch`.

---

# 3. Files to Modify

- `src/components/DailyLabView.tsx` — Conditional rendering untuk `phonetic` dan `contextSentences`.
- `src/components/NeuralVerbRetentionView.tsx` — Conditional rendering untuk `phonetic` dan `primaryContext`.
- `src/components/WordDetailModal.tsx` — Conditional rendering untuk `phonetic` dan `contextSentences`.
- `src/services/vocabService.ts` — Peningkatan parser `part_of_speech` majemuk.
- `GOOGLE_SHEETS_SETUP.md` — Dokumentasi dan kode `Code.gs` dengan handler batch append.
- `.agents/TASKS.md` — Pembaruan task backlog ke In Progress / Completed.

---

# 4. Files to Create

- `.agents/plans/ENG-011-bulk-excel-vocabulary-ingestion.md` (Dokumen plan ini).
- `scripts/import_master_excel.mjs` — Script parsing Excel, pembersihan data, pembuatan TSV, dan POST HTTP.
- `Master_Vocabulary_Ready_For_Sheets.tsv` — File data tabular 10 kolom siap tempel ke Google Sheets.

---

# 5. In-Scope Behavior

### A. Parser & Normalisasi Excel
- Membaca `Master_Vocabulary_432_Unique.xlsx` menggunakan openpyxl / helper subprocess tanpa menambah dependency external npm.
- Membersihkan 432 entri:
  * Menghapus format penanda seperti `(Verb (-ing form))` dan mengubah nama kata menjadi huruf kecil murni (misal `"imply"`).
  * Menyaring 9 kata yang bertabrakan dengan Stage 1–3 (`ubiquitous`, `exacerbate`, `scrutinize`, `corroborate`, `mitigate`, `substantiate`, `pragmatic`, `meticulous`, `fastidious`).
  * Memetakan kelas kata gabungan: jika terdapat komponen `verb` dan definisi Indonesia diawali kata kerja (`me-` / `ber-`), petakan ke `'verb'`. Untuk lainnya, ambil kelas kata dominan yang valid (`'verb' | 'adjective' | 'noun' | 'adverb'`).
  * Mengekstrak 1–3 padanan terjemahan utama yang dipisahkan `/` untuk kolom `translation`.
  * Membagi 423 kata ke dalam 43 stage baru (Stage 04 s/d Stage 46).
- Menyimpan hasil olahan ke file `Master_Vocabulary_Ready_For_Sheets.tsv` dengan 10 kolom standar database.

### B. Polish UI Komponen
- Di `DailyLabView.tsx`, `NeuralVerbRetentionView.tsx`, dan `WordDetailModal.tsx`:
  * Komponen fonetik hanya ditampilkan jika `phonetic?.trim().length > 0`.
  * Blok contoh kalimat hanya dirender jika terdapat minimal 1 kalimat dengan teks bahasa Inggris (`ctx.english?.trim().length > 0`).

### C. Sanitasi State Cloud
- Mengirimkan POST request ke `VITE_GOOGLE_SHEETS_API_URL` dengan payload user progress kosong (`clearedStages: []`, `dailyStreak: 1`, `wordStats: {}`) untuk memastikan kondisi awal bersih.

---

# 6. Out-of-Scope Behavior

- Tidak mengubah logika algoritma kuis Zero-Tolerance (`retentionAlgorithm.ts`).
- Tidak mengubah skema data inti `WordItem` atau `UserProgressData`.
- Tidak menginstall library npm eksternal baru (`dependencies` / `devDependencies` tetap tidak bertambah).

---

# 7. Untouched Components

- `src/utils/retentionAlgorithm.ts`
- `src/utils/storage.ts`
- `src/types/lexicon.ts`
- `src/components/HeaderHUD.tsx`
- `src/components/MemoryMatrixView.tsx`

---

# 8. Dependencies

- Menggunakan modul bawaan Node.js (`fs`, `path`, `child_process`) dan Python 3 sistem (`openpyxl`) yang sudah tersedia pada lingkungan Mac pengguna.
- Paket npm baru: **None**.

---

# 9. Data / Database Impact

- **Schema change**: NO (tetap 10 kolom pada tab `Vocabulary` dan 3 kolom pada tab `UserProgress`).
- **Production data mutation**: YES (penambahan baris 423 kata baru ke tab `Vocabulary` dan reset tab `UserProgress` ke kondisi awal).
- **Migration**: Otomatis melalui TSV / script batch POST.

---

# 10. Risks & Mitigations

| Risiko | Tingkat | Mitigasi |
| :--- | :--- | :--- |
| Terjemahan dari Excel terlalu panjang untuk kuis ketik | MEDIUM | Script melakukan ekstraksi cerdas 1–3 frasa inti dan memisahkan sinonim dengan `/`, sehingga toleran terhadap variasi jawaban pada `isExactTranslationMatch`. |
| Duplikasi kata dengan Stage 1–3 | LOW | Script memiliki filter set eksplisit untuk 9 kata yang sudah ada sebelumnya. |
| Elemen UI kosong saat fonetik/contoh tidak ada | LOW | Implementasi conditional rendering ketat pada 3 komponen terkait. |
| Timeout atau error CORS saat POST batch ke Google Sheets | LOW | Script membagi POST ke dalam batch per-stage atau menyediakan file TSV langsung untuk copy-paste 1-detik. |

---

# 11. Oracle Contract

## Normal Case
- **Input**: Data kata dengan `phonetic: ""` dan `contextSentences: []`.
- **Expected Result**: Halaman Flashcard, Modal Detail Kata, dan Tes Retensi tidak merender badge fonetik kosong atau kotak "Contoh Penggunaan" kosong.

## Multi-Part-of-Speech Case
- **Input**: `part_of_speech = "Noun / Verb"`, definisi diawali `"Meninggalkan..."`.
- **Expected Result**: Ternormalisasi menjadi `'verb'`.

## Bulk Ingestion TSV & Data Count
- **Input**: Ingestion 432 baris dari `Master_Vocabulary_432_Unique.xlsx`.
- **Expected Result**: Tepat 423 baris baru dihasilkan di `Master_Vocabulary_Ready_For_Sheets.tsv`, terbagi dari `stage_id = 4` hingga `stage_id = 46`. Total kata dalam database menjadi 453.

---

# 12. Required Verification

- Script verifikasi integritas data TSV (memastikan 423 baris, 10 kolom per baris, tidak ada undefined).
- `npm run typecheck` untuk validasi seluruh kode TypeScript.
- `npm run build` untuk memverifikasi bundle produksi tidak mengalami error.
- Autonomous QA test suite (`autonomous_qa_engineer`).

---

# 13. QA Handoff

Autonomous QA Engineer akan:
1. Memverifikasi keberadaan dan integritas file `Master_Vocabulary_Ready_For_Sheets.tsv` (423 entri kata, Stage 4–46).
2. Memverifikasi bahwa build produksi `npm run build` dan pemeriksaan tipe `npm run typecheck` lulus 100% tanpa error.
3. Memverifikasi fungsi normalisasi kelas kata majemuk di `vocabService.ts`.

---

# 14. Approval

- **Approved by**: User (Developer & Auditor)
- **Approved date**: 2026-11-05
- **Approval evidence**: Instruksi eksplisit pengguna pada tiket ENG-011.

