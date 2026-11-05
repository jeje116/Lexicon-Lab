# Architectural Decision Records (ADR)

This file contains APPROVED and LOCKED project decisions.
Do not change an existing LOCKED decision without explicit user approval.

---

# ADR-001 — Adopsi Estetika UI Google AI Studio

Status:
LOCKED

Decision:
Antarmuka pengguna mengadopsi bahasa desain Google AI Studio:
- Palet warna gelap/netral (deep dark canvas/surface, hairline borders, elevated dark cards).
- Warna aksen utama: Google Blue (`#1a73e8` / `#8ab4f8`).
- Tata letak: Split view dengan Left Sidebar navigation ramping dan Main Workspace / Canvas terfokus di tengah.
- Tipografi: Clean sans-serif untuk body/heading, tipografi monospace untuk badge status, level CEFR, phonetic symbols, shortcuts, dan metadata.

Implications:
- Menghindari visual yang ramai atau ornamen visual yang tidak fungsional.
- Desain berorientasi pada konsentrasi belajar (focus canvas), menyerupai antarmuka playground/prompt di Google AI Studio.
- Komponen card, badge, dan dialog harus mengikuti standar token desain yang konsisten.

---

# ADR-002 — Zero-Tolerance Policy untuk Daily Quiz

Status:
LOCKED

Decision:
Kuis harian verifikasi 10 kata menerapkan kebijakan kelulusan tanpa toleransi kesalahan (Zero-Tolerance Policy):
- Apabila pengguna membuat 1 (satu) kesalahan dalam menjawab pertanyaan, sesi kuis langsung dihentikan saat itu juga.
- Progres kuis langsung di-reset kembali ke pertanyaan ke-1 (0/10).
- Urutan pertanyaan dan opsi jawaban diacak ulang (shuffled) untuk mencegah hafalan posisi semata.
- Status hari tersebut baru ditandai "Passed / Completed" jika pengguna berhasil menjawab 10/10 pertanyaan secara berturut-turut tanpa cela.

Implications:
- Menjamin penguasaan kosa kata secara tuntas sebelum pengguna dapat menandai hari belajar selesai.
- State engine kuis harus memiliki mekanisme reset deterministik dan reshuffle instan.
- UI harus menampilkan umpan balik kegagalan yang jelas beserta kata yang salah dijawab, kemudian mengembalikan pengguna ke awal kuis dengan transisi cepat dan bersih.

---

# ADR-003 — Model Storage Skema Spreadsheet & Weighted Random Selection untuk Retention Test

Status:
LOCKED

Decision:
1. **Model Storage**:
   - Struktur data kosa kata dan riwayat belajar dirancang kompatibel dengan format tabular Google Sheets (kolom: ID, Word, PartOfSpeech, Level, Definition, Example, TotalAttempts, Failures, LastTestedDate, Status).
   - Pada fase awal, data layer diakses melalui structured JSON mock layer & browser storage dengan antarmuka (interface/service) yang siap dialihkan ke Google Sheets API / Apps Script connector.
2. **Weighted Random Selection untuk Retention Test**:
   - Kata kerja dan kosa kata dalam tes retensi dipilih menggunakan algoritma probabilistik terbobot berdasarkan failure rate:
     $$\text{Weight} = 1 + \left(\frac{\text{Failures}}{\text{Attempts} + 1} \times 10\right) + \text{DecayFactor}(\text{DaysSinceLastTest})$$
   - Kata yang sering salah dijawab atau sudah lama tidak diuji akan mendapatkan bobot kemunculan lebih tinggi.

Implications:
- Data layer harus terisolasi rapi melalui service/repository pattern (tidak langsung mengikat komponen UI ke storage primitif).
- Model data harus mempertahankan counters: `attempts`, `failures`, dan `lastReviewedAt`.
- Algoritma seleksi retensi harus deterministik dan dapat diuji secara independen (unit testable).

---

# ADR-004 — Final UI Light Mode, Single Floating Dock, dan Zero-Clutter Architecture

Status:
LOCKED

Decision:
1. **Light Mode Theme**:
   - Mengadopsi palet warna Porcelain Slate: background `slate-50` (`#F8FAFC`), elevated cards `white`, hairline borders `slate-200/80`, dan tipografi kontras tinggi `slate-900` (`#0F172A`) dengan font sans-serif Plus Jakarta Sans & monospace JetBrains Mono.
   - Efek visual tactile: subtle glow utilities (`glow-blue`, `glow-emerald`, `glow-crimson`), screen shake animation (`animate-terminal-shake`) untuk feedback eliminasi.
2. **Single Floating Dock**:
   - Pada mode Flashcard Stage Lab, navigasi panah kiri `[ < ]`, tombol status/mulai kuis `[ MULAI KUIS (20 SOAL) ]`, dan panah kanan `[ > ]` disatukan ke dalam 1 (satu) bar melayang (Single Floating Dock) di bagian bawah layar tanpa menumpuk.
   - Floating dock otomatis disembunyikan saat fase kuis aktif.
3. **Zero-Clutter Header pada Retensi Kata Kerja**:
   - Menghilangkan seluruh badge sekunder yang berpotensi memicu distraksi kognitif (seperti badge "STAGE #1" atau "SESI: 0/0 Lulus").
   - Header dibuat ultra-bersih hanya memuat tombol kembali dan judul modul `RETENSI KATA KERJA`.
   - Form input ketik memiliki tombol "KIRIM JAWABAN" yang berada lega di bawah input box tanpa bertabrakan dengan placeholder text.

Implications:
- Mengurangi beban visual dan kognitif selama sesi belajar intensif.
- Memastikan navigasi satu tangan yang ergonomis di layar ponsel maupun desktop.

---

# ADR-005 — 20 Soal Acak Total per Stage Kuis (Interleaved Zero-Tolerance Engine)

Status:
LOCKED

Decision:
Kuis kelulusan stage menguji 10 kata per stage dengan total 20 soal independen yang diacak utuh (interleaved Fisher-Yates randomization):
1. **10 Soal Varian A (`TYPE_TRANSLATION`)**:
   - Uji arti bahasa Indonesia dengan pengetikan manual (100% exact translation match).
2. **10 Soal Varian B (`MCQ_DEFINITION`)**:
   - Uji definisi bahasa Inggris dengan 4 pilihan ganda kata target (1 opsi benar + 3 distractors acak ber-part-of-speech sama).
3. **Penyajian Interleaved**:
   - Ke-20 soal tidak disajikan secara berurutan per kata, melainkan diacak penuh sehingga varian pengetikan dan pilihan ganda muncul secara dinamis.
4. **Zero-Tolerance Enforcement**:
   - 1 kesalahan langsung menghentikan kuis ke layar gugur (eliminated), mereset progres menjadi 0/20, dan mengacak ulang urutan ke-20 soal saat kuis di-reboot.
   - Kelulusan stage (`clearedStages`) mutlak memerlukan 20/20 jawaban benar berturut-turut.

Implications:
- Mencegah *positional memory* dan hafalan pola urutan kata.
- Memastikan penguasaan kosa kata secara komprehensif dua arah (Inggris -> Indonesia via pengetikan, Definisi -> Inggris via pilihan ganda).

---

# ADR-006 — Google Apps Script Web App Architecture & Dynamic Data Ingestion

Status:
LOCKED

Decision:
1. **Google Sheets as Tabular Database**:
   - Tab spreadsheet `Vocabulary` digunakan sebagai single source of truth untuk kosa kata, contoh kalimat, fonetik, dan definisi.
   - Endpoint disediakan via Google Apps Script Web App (`doGet(e)`), yang mengonversi data baris menjadi payload JSON berstandar `WordItem` dengan MIME type `application/json` dan automatic CORS headers.
2. **Dynamic Ingestion Layer**:
   - Modul `src/services/vocabService.ts` mengelola ingestion data melalui variabel lingkungan `VITE_GOOGLE_SHEETS_API_URL`.
   - Mengimplementasikan 3-tier fallback strategy:
     1. Live fetch Google Sheets API dengan timeout 8 detik.
     2. LocalStorage cache jika jaringan offline atau fetch gagal.
     3. Hardcoded baseline mock (`ALL_WORDS_POOL`) jika endpoint belum dikonfigurasi.
   - Indikator sinkronisasi di `HeaderHUD` menampilkan status transparan: `Sheets: Live`, `Sheets: Syncing...`, `Sheets: Cached`, atau `Sheets: Mock Fallback`.

Implications:
- Aplikasi tidak akan pernah crash akibat network failure atau URL endpoint yang tidak valid.
- Pengguna dapat mengelola bank kata secara kolaboratif melalui Google Sheets tanpa perlu redeploy kode aplikasi.

---

# ADR-007 — Bidirectional 4-Variant Retention & Hostless Google Sheets Cloud Progress Sync

Status:
LOCKED

Decision:
1. **Bidirectional 4-Variant Retention Engine**:
   - Modul Tes Retensi Memori (`NeuralVerbRetentionView.tsx`) mencakup seluruh kelas kata (`verb`, `adjective`, `noun`, `adverb`) dari stage yang telah tuntas (`clearedStages`).
   - Menerapkan 4 varian kuis 2-arah yang diundi secara acak:
     1. `TYPE_TRANSLATION`: Tampilkan kata Inggris target, ketik arti bahasa Indonesia (100% presisi via `isExactTranslationMatch`).
     2. `TYPE_WORD_EN`: Tampilkan arti bahasa Indonesia + chip kelas kata & CEFR, ketik kata bahasa Inggris target (100% presisi via `isExactWordMatch`).
     3. `MCQ_DEFINITION`: Tampilkan kalimat definisi bahasa Indonesia, pilih kata bahasa Inggris dari 4 opsi.
     4. `MCQ_WORD_TO_DEF`: Tampilkan kata bahasa Inggris target (+ audio TTS), pilih definisi bahasa Indonesia dari 4 opsi.
   - Stage Quiz (`DailyLabView.tsx`) tetap diisolasi mematuhi ADR-005 (20 soal interleaved: 10 ketik arti + 10 pilgan definisi).
2. **Deterministic ID Normalization & Legacy Key Migration**:
   - Skema ID kosa kata di seluruh sistem diseragamkan ke format semantik `w{stageId}-{wordSlug}` (contoh: `w1-ubiquitous`), identik dengan formula Google Apps Script.
   - `src/utils/storage.ts` mengimplementasikan fungsi migrasi otomatis (`migrateLegacyWordStats`) untuk memetakan kunci lama `stgX-YY` ke `wX-word` saat `loadUserData()` dipanggil.
3. **Hostless Google Sheets Cloud Progress Sync & Smart-Merge**:
   - Tab Google Sheets `UserProgress` bertindak sebagai database cloud nir-server untuk menyimpan `UserProgressData` (dailyStreak, clearedStages, totalRuns, wordStats).
   - `Code.gs` mengimplementasikan fungsi 1-klik `setupDatabase()` untuk auto-provisioning tab `Vocabulary` dan `UserProgress`, handler dwimode `doGet(e)` (`action=getProgress` dan default `getVocab`), serta handler `doPost(e)` (menerima payload `Content-Type: text/plain;charset=utf-8` untuk melewati batasan CORS preflight browser).
   - `mergeUserProgress()` di `src/utils/storage.ts` melakukan smart-merge deterministik saat inisialisasi aplikasi (union `clearedStages`, resolusi konflik `wordStats` berdasarkan `totalAttempts` dan `lastReviewedAt` tertinggi, serta akumulasi flag `isMastered` dan `isBookmarked`).
   - Perubahan data pengguna di-push secara asinkron (debounced 1500ms) ke Google Sheets di background.

Implications:
- Memperkuat daya ingat aktif dua arah (produksi dan pemahaman kosa kata bahasa Inggris).
- Progres belajar tersimpan persisten di Google Sheets pribadi pengguna dan dapat disinkronkan lintas perangkat tanpa memerlukan server backend terdedikasi atau login OAuth yang rumit.
- Sistem tahan terhadap jaringan offline berkat arsitektur local-first storage dengan smart-merge.
