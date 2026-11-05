# ENG-010 — Bidirectional (2-Way) Retention Engine & Hostless Google Sheets Full-Database Sync

Status:
APPROVED

Risk Level:
HIGH

---

# 1. Objective

1. **Normalisasi ID Kata Deterministik**: Menyelaraskan skema ID kosa kata antara `src/data/mockLexicon.ts` dan Google Apps Script (`Code.gs`) ke format semantik `w{stageId}-{wordSlug}` (contoh: `w1-ubiquitous`) serta menyediakan migrasi backward-compatibility pada `src/utils/storage.ts` agar riwayat `wordStats` pengguna di `localStorage` tidak terputus atau ter-reset saat beralih dari Mock ke Live Sheets.
2. **Bidirectional (2-Way) Retrieval pada Retention Test**:
   - Membuka filter kata pada `NeuralVerbRetentionView.tsx` agar menguji seluruh kosa kata dari stage yang telah lulus (`clearedStages`), mencakup seluruh kelas kata (`verb`, `adjective`, `noun`, `adverb`).
   - Memperluas tipe `QuizVariant` menjadi 4 variasi pengujian 2-arah:
     1. `TYPE_TRANSLATION` (EN $\rightarrow$ Ketik Arti ID): Tampilkan kata Inggris, pengguna mengetik arti bahasa Indonesia (validasi presisi via `isExactTranslationMatch`).
     2. `TYPE_WORD_EN` (ID $\rightarrow$ Ketik Kata EN): Tampilkan arti bahasa Indonesia + chip kelas kata, pengguna wajib mengetik kata Inggris target secara presisi.
     3. `MCQ_DEFINITION` (Definisi ID $\rightarrow$ Pilih Kata EN): Tampilkan kalimat definisi bahasa Indonesia, 4 opsi kata target bahasa Inggris.
     4. `MCQ_WORD_TO_DEF` (Kata EN $\rightarrow$ Pilih Definisi ID): Tampilkan kata bahasa Inggris (+ audio TTS), 4 opsi kalimat definisi bahasa Indonesia.
   - Menjamin isolasi penuh pada kuis stage eliminasi (`DailyLabView.tsx` / ADR-005) sehingga tetap berjalan stabil 20 soal (10 ketik + 10 pilgan) tanpa regresi.
3. **Otomasi Setup Google Sheets & Cloud Progress Sync**:
   - Memperbarui skrip `Code.gs` di `GOOGLE_SHEETS_SETUP.md` dengan:
     - Fungsi 1-klik `setupDatabase()` untuk otomatis membuat tab `Vocabulary` (10 kolom header + 30 data awal) dan tab `UserProgress` (schema `['user_id', 'progress_json', 'updated_at']`).
     - Handler `doGet(e)` dengan parameter `?action=getProgress` untuk membaca progress cloud, dan default `?action=getVocab` untuk membaca bank kata (100% backward-compatible).
     - Handler `doPost(e)` untuk menerima payload string JSON `UserProgressData` via `Content-Type: text/plain;charset=utf-8` (bebas kendala CORS preflight Netlify).
   - Menambahkan fungsi `fetchCloudUserProgress()` dan `pushCloudUserProgress()` di `src/services/vocabService.ts`.
   - Mengimplementasikan *smart-merge* (`mergeUserProgress`) di `src/utils/storage.ts` untuk menggabungkan data lokal dan cloud saat mount secara deterministik, serta *debounced auto-sync* di `src/App.tsx`.

---

# 2. Reason

1. **Fragmentasi ID**: Saat ini `mockLexicon.ts` menggunakan ID bertipe `stg1-01`, sedangkan `Code.gs` menghasilkan `w1-ubiquitous`. Inkonsistensi ini menyebabkan `wordStats` di `localStorage` tidak cocok (*orphaned keys*) saat pengguna beralih mode data, menghilangkan akumulasi kurva retensi.
2. **Retensi 1-Arah & Terbatas Verba**: Modul retensi saat ini hanya mengambil kata kerja (`partOfSpeech === 'verb'`) dan hanya menguji pemahaman pasif (melihat kata Inggris lalu mengetik arti/memilih kata). Penguasaan bahasa aktif membutuhkan *bidirectional retrieval practice* (menguji kemampuan memproduksi kata Inggris dari arti/definisi bahasa Indonesia dan sebaliknya untuk seluruh kelas kata).
3. **Database Tanpa State Progres**: Google Sheets saat ini hanya bertindak sebagai *read-only tabular dictionary*. Tanpa sinkronisasi dua arah untuk `UserProgressData`, progres belajar dan streak pengguna hilang jika berganti perangkat atau membersihkan cache browser.

---

# 3. Files to Modify

- `src/types/lexicon.ts` — Perluas union `QuizVariant` untuk mendukung 4 varian 2-arah.
- `src/data/mockLexicon.ts` — Normalisasi ID 30 kata menjadi format deterministik `w{stageId}-{wordSlug}`.
- `src/utils/storage.ts` — Tambahkan helper migrasi ID lama (`stgX-YY` ke `wX-word`) dan fungsi `mergeUserProgress`.
- `src/utils/retentionAlgorithm.ts` — Perbarui generator/sampler dan helper validasi pencocokan kata bahasa Inggris.
- `src/components/NeuralVerbRetentionView.tsx` — Buka filter ke semua kelas kata, implementasikan render UI dan evaluasi 4 varian 2-arah, perbarui header modul.
- `src/services/vocabService.ts` — Tambahkan endpoint getter `fetchCloudUserProgress` dan setter `pushCloudUserProgress`.
- `src/App.tsx` — Integrasikan smart-merge data saat mount dan debounced auto-sync ke cloud saat progres berubah.
- `GOOGLE_SHEETS_SETUP.md` — Perbarui dokumentasi dan kode `Code.gs` (`setupDatabase`, `doGet`, `doPost`).
- `.agents/TASKS.md` — Perbarui status task ENG-010 ke In Progress.

---

# 4. Files to Create

None.

---

# 5. In-Scope Behavior

### A. Normalisasi ID & Migrasi
- ID di `mockLexicon.ts` diseragamkan dengan formula `Code.gs`: `'w' + stageId + '-' + word.toLowerCase().replace(/[^a-z0-9]/g, '-')`.
- `loadUserData()` di `src/utils/storage.ts` mendeteksi kunci legacy (misal `stg1-01`) dan memigrasikannya secara transparan ke ID baru sehingga statistik riwayat tetap utuh.

### B. Bidirectional Retention Engine (4 Varian)
- `retentionPool` di `NeuralVerbRetentionView.tsx` mengambil semua kata dari `clearedStages` (seluruh `partOfSpeech`, fallback stage 1 jika belum ada cleared stage).
- Header modul diperbarui menjadi `RETENSI MEMORI 2-ARAH`.
- 4 Varian Soal Retensi:
  1. `TYPE_TRANSLATION`: Menampilkan kata target EN, input arti ID. Validasi: `isExactTranslationMatch(input, target.translation)`.
  2. `TYPE_WORD_EN`: Menampilkan arti ID + badge POS, input kata target EN. Validasi: pembersihan case-insensitive dan exact match terhadap `target.word`.
  3. `MCQ_DEFINITION`: Menampilkan definisi ID, 4 pilihan kata EN (1 benar + 3 distraktor).
  4. `MCQ_WORD_TO_DEF`: Menampilkan kata target EN + audio TTS, 4 pilihan definisi ID (1 benar + 3 distraktor definisi acak).
- Setiap kali menjawab benar atau salah, `onRecordResult(wordId, isCorrect)` dipanggil, memperbarui `wordStats` dan memicu background sync.

### C. Cloud Progress Sync & Smart-Merge
- Di `GOOGLE_SHEETS_SETUP.md`:
  - Fungsi `setupDatabase()` membuat tab `Vocabulary` dan tab `UserProgress` secara otomatis bila belum ada.
  - `doGet(e)`:
    - `e.parameter.action === 'getProgress'`: Mengambil baris record `UserProgressData` dan mengembalikan JSON `{ status: 'success', data: ... }`.
    - Tanpa query / `action === 'getVocab'`: Mengembalikan JSON array `WordItem[]`.
  - `doPost(e)`:
    - Menerima payload JSON string dari request body, menyimpannya ke tab `UserProgress` beserta timestamp `updatedAt`.
- Di `src/services/vocabService.ts`:
  - `fetchCloudUserProgress()`: Mengambil data cloud dengan timeout 8 detik, mengembalikan `UserProgressData | null`.
  - `pushCloudUserProgress(data)`: Mengirim POST stringified JSON dengan header `Content-Type: text/plain;charset=utf-8` untuk mencegah preflight CORS block.
- Di `src/utils/storage.ts`:
  - `mergeUserProgress(local, remote)`:
    - `dailyStreak`: `Math.max(local.dailyStreak, remote.dailyStreak)`.
    - `clearedStages`: Union array tanpa duplikasi `Array.from(new Set([...local.clearedStages, ...remote.clearedStages]))`.
    - `totalRunsAttempted`: `Math.max(local.totalRunsAttempted, remote.totalRunsAttempted)`.
    - `totalFlawlessRuns`: `Math.max(local.totalFlawlessRuns, remote.totalFlawlessRuns)`.
    - `wordStats`: Union kunci; untuk tiap kata, pilih entri dengan `totalAttempts` lebih besar atau `lastReviewedAt` lebih baru.
- Di `src/App.tsx`:
  - Saat mount, setelah inisialisasi kosa kata, panggil `fetchCloudUserProgress()`. Jika ada data cloud, lakukan `mergeUserProgress` dan simpan ke local state + `localStorage`.
  - Sinkronisasi awan dilakukan secara debounced (~1500ms) saat `userData` berubah akibat jawaban kuis/retensi atau bookmark.

---

# 6. Out-of-Scope Behavior

- Tidak mengubah mekanisme Zero-Tolerance pada Stage Quiz (`DailyLabView.tsx` tetap menerapkan aturan baku 20 soal interleaved: 10 TYPE_TRANSLATION + 10 MCQ_DEFINITION).
- Tidak menambahkan sistem autentikasi multi-user login (Google OAuth/Firebase); penyimpanan progress cloud menggunakan single-tenant profile via Google Sheet pribadi developer.
- Tidak mengubah palet warna Porcelain Slate Light Mode.

---

# 7. Untouched Components

- `src/components/DailyLabView.tsx` (alur interaktif 20 soal dan aturan eliminasi tidak berubah)
- `src/components/CommandSidebar.tsx`
- `src/components/BottomNav.tsx`
- `src/components/WordDetailModal.tsx`
- `src/components/HotkeyHelperModal.tsx`
- `public/_redirects`
- `netlify.toml`

---

# 8. Dependencies

New dependencies:
None.

Semua fitur diimplementasikan menggunakan TypeScript native, React hooks bawaan (`useEffect`, `useState`, `useRef`, `useCallback`), Web Audio API / SpeechSynthesis yang sudah ada, serta Google Apps Script standard library (`SpreadsheetApp`, `ContentService`).

---

# 9. Data / Database Impact

Schema change:
YES (Penambahan tab `UserProgress` pada Google Sheets dengan kolom: `user_id`, `progress_json`, `updated_at`).

Production data mutation:
NO (Hanya berinteraksi dengan Google Sheets pribadi pengguna via API URL yang dikonfigurasi).

Migration:
Otomatis via fungsi `setupDatabase()` di Google Apps Script dan migrasi kunci legacy di `src/utils/storage.ts`.

Rollback:
Jika cloud sync gagal atau URL endpoint kosong, aplikasi otomatis beroperasi 100% menggunakan `localStorage` lokal tanpa crash.

---

# 10. Risks

Functional:
- *Risk*: Kegagalan jaringan atau latensi lambat saat push progress cloud membuat UI freeze.
  *Mitigasi*: Push cloud dieksekusi secara asinkron di background tanpa memblokir state UI lokal (fire-and-forget dengan error logging hening).
- *Risk*: Inkonsistensi casing atau spasi saat user mengetik kata bahasa Inggris pada varian `TYPE_WORD_EN`.
  *Mitigasi*: Normalisasi ketat `input.trim().toLowerCase()` dan exact comparison terhadap kata target yang juga di-trim.

Security:
- *Risk*: Data injection atau CORS block pada endpoint Apps Script.
  *Mitigasi*: Request dikirim dengan format text/plain yang diizinkan CORS dan divalidasi `JSON.parse` di sisi Apps Script; sanitasi tipe data di sisi TypeScript client.

Data integrity:
- *Risk*: Timpaan data lokal oleh cloud (atau sebaliknya) yang menyebabkan progres hilang.
  *Mitigasi*: Algoritma `mergeUserProgress` hanya mengambil nilai maksimum (`Math.max`), union dari `clearedStages`, dan statistik kata dengan `lastReviewedAt` / `totalAttempts` tertinggi.

---

# 11. Oracle Contract

## Normal Case
1. **Retensi 2-Arah**:
   - *Input*: Membuka tab "Retensi Kosa Kata".
   - *Expected*: Menampilkan kosa kata acak dari seluruh kelas kata (`verb`, `adjective`, dll.) dalam salah satu dari 4 varian (`TYPE_TRANSLATION`, `TYPE_WORD_EN`, `MCQ_DEFINITION`, `MCQ_WORD_TO_DEF`).
   - *Input*: Pada varian `TYPE_WORD_EN`, kata target adalah "ubiquitous", pengguna mengetik "ubiquitous" atau "Ubiquitous ".
   - *Expected*: Jawaban dinyatakan benar, suara denting sukses berbunyi, layar "Jawaban Benar!" muncul, dan `wordStats['w1-ubiquitous'].correctAttempts` bertambah 1.
2. **Cloud Progress Sync**:
   - *Input*: `VITE_GOOGLE_SHEETS_API_URL` terhubung, pengguna menyelesaikan kuis / tes retensi.
   - *Expected*: Payload JSON progres terkirim ke `doPost` Apps Script dan tersimpan di tab `UserProgress`. Saat aplikasi direfresh di browser berbeda dengan URL yang sama, progres terambil kembali via `doGet(?action=getProgress)`.

## Boundary Case
- *Input*: Pengguna belum menyelesaikan stage apa pun (`clearedStages` kosong).
- *Expected*: Modul retensi otomatis fallback ke kosa kata Stage 1 (tidak menampilkan layar terkunci atau crash).
- *Input*: Pengguna memasukkan spasi di awal/akhir atau huruf kapital pada `TYPE_WORD_EN` (misal: `"  lucid  "`).
- *Expected*: Sistem otomatis melakukan pembersihan trim & lower-case sehingga jawaban dievaluasi benar.

## Error Case
- *Input*: Koneksi internet terputus saat aplikasi memanggil `pushCloudUserProgress`.
- *Expected*: Error tertangkap di catch block, aplikasi tetap menyimpan progres ke `localStorage`, dan pengguna tidak merasakan interupsi tampilan.
- *Input*: Tab `UserProgress` di Google Sheets belum dibuat atau mengembalikan error.
- *Expected*: `fetchCloudUserProgress()` mengembalikan `null`, aplikasi menggunakan data `localStorage` lokal secara aman.

## Regression Case
- *Existing Behavior*: Kuis Stage di `DailyLabView.tsx` mewajibkan 20 soal berturut-turut tanpa cela (10 ketik arti + 10 pilihan ganda kata).
- *Expected Unchanged Behavior*: Mekanisme kuis 20 soal di `DailyLabView.tsx` tetap bekerja 100% normal dan kelulusan stage tetap mencatat stage ID ke `clearedStages`.

---

# 12. Required Verification (web_test_strategy)

Mengacu pada protokol `/web_test_strategy`:
- **Static Verification**: `npm run typecheck` (`tsc --noEmit`) wajib lulus tanpa error.
- **Unit & Algorithmic Verification**:
  - Pengujian fungsi `mergeUserProgress` (memastikan union stage dan resolusi konflik kata).
  - Pengujian 4 varian generator retensi dan validasi exact match EN/ID.
  - Pengujian migrasi kunci legacy `stgX-YY` ke `wX-word`.
- **Smoke & Build Verification**:
  - `npm run build` berhasil menghasilkan bundle `dist/` lengkap dengan `_redirects`.
  - Simulasi pemanggilan endpoint Google Sheets (Mock & Live fallback).

---

# 13. QA Handoff

Kontrak instruksi untuk `/autonomous_qa_engineer`:
1. **Target Verification Script**: Buat skrip verifikasi logika unit di `src/__tests__/retention_engine_and_sync.test.ts` (atau test harness mandiri berbasis TypeScript/Node) untuk memverifikasi:
   - Paritas `mergeUserProgress` (local vs remote merge).
   - Validasi ketikan `TYPE_WORD_EN` (casing, trimming, exact matching).
   - Struktur data respons Apps Script `doGet` dan payload `doPost`.
2. **Blast Radius Check**:
   - Pastikan `DailyLabView.tsx` dan `HeaderHUD.tsx` tidak mengalami regresi.
   - Pastikan build produksi (`npm run build`) berjalan bersih dengan exit code 0.

---

# 14. Approval

Approved by:
User

Approved date:
2026-11-05

Approval evidence:
Explicit authorization in user prompt: "Plan ENG-010 telah direview dan resmi berstatus APPROVED. Anda diizinkan untuk mengeksekusi perubahan kode sesuai cakupan file yang disetujui di dalam plan."

