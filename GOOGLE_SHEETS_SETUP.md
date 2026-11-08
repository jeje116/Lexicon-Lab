# Panduan Integrasi Google Sheets & Google Apps Script (Lexicon Lab)

Dokumen ini menjelaskan struktur basis data Google Sheets dan kode **Google Apps Script (`Code.gs`)** yang mendukung arsitektur *hostless backend*:
1. **Penyedia Kosa Kata Dinamis** (Tab `Vocabulary`).
2. **Penyimpan Progres Belajar Cloud** (Tab `UserProgress`).
3. **Otomasi Setup 1-Klik** (`setupDatabase()`) untuk menginisialisasi kedua tab dan mengisi 30 kata awal tanpa perlu ketik manual.

---

## 1. Langkah Cepat Setup 1-Klik (Hanya 3 Menit)

1. Buka spreadsheet baru di [Google Sheets](https://sheets.new) (atau spreadsheet yang sudah ada).
2. Di menu atas, buka: **Extensions** > **Apps Script**.
3. Hapus seluruh isi default file `Code.gs`, lalu **salin dan tempel seluruh kode di Bagian 2** di bawah ini ke editor.
4. Di bilah toolbar atas Apps Script, pilih fungsi **`setupDatabase`** dari menu dropdown (di sebelah tombol *Debug* dan *Run*).
5. Klik tombol **Run** (Jalankan). 
   *(Jika muncul jendela 'Authorization Required', klik Continue > pilih akun Google Anda > Advanced > Go to (project name) > Allow)*.
   *Selesai! Kedua tab `Vocabulary` (berisi 30 kosa kata Stage 1–3) dan `UserProgress` akan langsung dibuat otomatis.*
6. Deploy Web App:
   * Klik tombol biru **Deploy** (kanan atas) > pilih **New deployment** (atau jika sudah pernah deploy, pilih **Manage deployments** > klik ikon pensil > ubah versi ke **New version**).
   * Pastikan **Execute as**: `Me` dan **Who has access**: **`Anyone`** (Wajib agar dapat diakses web tanpa login).
   * Klik **Deploy**, lalu salin **Web app URL** yang berakhiran `/exec`.
7. Masukkan Web app URL tersebut ke file `.env` proyek React:
   ```bash
   VITE_GOOGLE_SHEETS_API_URL="https://script.google.com/macros/s/AKfycb.../exec"
   ```

---

## 2. Kode Lengkap Google Apps Script (`Code.gs`)

Salin seluruh kode di bawah ini ke editor Google Apps Script:

```javascript
/**
 * Lexicon Lab - Google Apps Script Hostless API (v2.0)
 * Menghubungkan Google Sheets ke React Lexicon Lab:
 * - Ingestion Kosa Kata (Tab 'Vocabulary')
 * - Sinkronisasi Progres Cloud (Tab 'UserProgress')
 * - Otomasi Inisialisasi Database (setupDatabase)
 */

/**
 * 1. FUNGSI SETUP OTOMATIS 1-KLIK
 * Jalankan fungsi ini sekali dari editor Apps Script untuk membuat dan mengisi tabel secara instan.
 */
function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // A. Inisialisasi Tab Vocabulary
  var vocabSheet = ss.getSheetByName('Vocabulary');
  if (!vocabSheet) {
    vocabSheet = ss.insertSheet('Vocabulary');
  }

  var vocabHeaders = [
    'stage_id', 'stage_title', 'word', 'phonetic', 'part_of_speech',
    'cefr', 'translation', 'definition', 'example_en', 'example_id'
  ];

  if (vocabSheet.getLastRow() === 0) {
    vocabSheet.appendRow(vocabHeaders);
    vocabSheet.getRange(1, 1, 1, vocabHeaders.length).setFontWeight('bold').setBackground('#f1f5f9');
  }

  // Jika tab Vocabulary masih kosong, isi dengan 30 kata baseline
  if (vocabSheet.getLastRow() <= 1) {
    var seedWords = [
      // STAGE 1
      [1, "Stage 01: Presisi Dialektika & Retorika Kritis", "ubiquitous", "/juːˈbɪk.wɪ.təs/", "adjective", "C1", "Ada di mana-mana / Merajalela", "Hadir, muncul, atau ditemukan di mana-mana secara bersamaan dalam kehidupan sehari-hari.", "Smartphones have become so ubiquitous that their absence in daily life is now viewed as an anomaly.", "Ponsel pintar telah menjadi begitu merajalela sehingga ketiadaannya dalam kehidupan sehari-hari kini dianggap aneh."],
      [1, "Stage 01: Presisi Dialektika & Retorika Kritis", "anachronistic", "/əˌnæk.rəˈnɪs.tɪk/", "adjective", "C1", "Ketinggalan zaman / Anakronistis", "Berada di luar era yang tepat atau sangat kuno sehingga tidak cocok lagi dengan masa kini.", "In an era of instant algorithmic trading, paper ticker tapes appear charmingly anachronistic.", "Di era perdagangan algoritma instan, pita pencatat harga kertas tampak sangat ketinggalan zaman."],
      [1, "Stage 01: Presisi Dialektika & Retorika Kritis", "obfuscate", "/ˈɒb.fʌs.keɪt/", "verb", "C1", "Mengaburkan / Memperkeruh", "Membuat sesuatu menjadi tidak jelas, membingungkan, atau sengaja disamarkan agar sulit dipahami.", "The company attempted to obfuscate the financial losses by burying them in dense footnotes.", "Perusahaan berusaha mengaburkan kerugian finansial dengan menyembunyikannya di catatan kaki yang padat."],
      [1, "Stage 01: Presisi Dialektika & Retorika Kritis", "perfunctory", "/pəˈfʌŋk.tər.i/", "adjective", "C1", "Asal-asalan / Sekadar formalitas", "Dilakukan dengan usaha minimal, tergesa-gesa, atau sekadar memenuhi kewajiban rutin tanpa rasa peduli.", "The inspector cast a perfunctory glance at the manifest before stamping the container permit.", "Petugas pemeriksa hanya melihat sekilas secara asal-asalan ke manifes sebelum membubuhkan stempel izin."],
      [1, "Stage 01: Presisi Dialektika & Retorika Kritis", "perspicacious", "/ˌpɜː.spɪˈkeɪ.ʃəs/", "adjective", "C2", "Cerdik / Berpandangan tajam", "Memiliki pemahaman yang sangat tajam, cepat mengerti, dan mampu melihat rincian yang terlewatkan orang lain.", "Thanks to perspicacious forecasting, the fund liquidated risky assets before the market crash.", "Berkat ramalan yang cerdik dan tajam, dana investasi mencairkan aset berisiko sebelum pasar anjlok."],
      [1, "Stage 01: Presisi Dialektika & Retorika Kritis", "epitomize", "/ɪˈpɪt.ə.maɪz/", "verb", "C1", "Menjadi contoh sempurna / Mewakili", "Menjadi contoh paling representatif atau puncak perwujudan dari suatu sifat, gaya, atau kualitas.", "His calm resolve under immense pressure seemed to epitomize true leadership.", "Ketegaran tenangnya di bawah tekanan berat tampak menjadi contoh sempurna kepemimpinan sejati."],
      [1, "Stage 01: Presisi Dialektika & Retorika Kritis", "exacerbate", "/ɪɡˈzæs.ə.beɪt/", "verb", "C1", "Memperburuk / Memperparah", "Menjadikan suatu masalah, penyakit, ketegangan, atau situasi buruk menjadi jauh lebih parah.", "Imposing severe trade tariffs will only exacerbate domestic inflation.", "Penerapan tarif dagang yang berat hanya akan memperparah inflasi domestik."],
      [1, "Stage 01: Presisi Dialektika & Retorika Kritis", "esoteric", "/ˌes.əˈter.ɪk/", "adjective", "C2", "Eksoteris / Hanya dipahami segelintir orang", "Ditujukan untuk atau hanya mungkin dimengerti oleh segelintir orang yang memiliki pengetahuan khusus yang mendalam.", "The monograph explored esoteric mathematical formulations that baffled non-specialists.", "Monograf tersebut meneliti rumusan matematika esoteris yang membingungkan para non-ahli."],
      [1, "Stage 01: Presisi Dialektika & Retorika Kritis", "equivocate", "/ɪˈkwɪv.ə.keɪt/", "verb", "C2", "Berbicara mendua / Berbelit-belit", "Menggunakan bahasa yang ambigu atau tidak jelas untuk menyembunyikan kebenaran atau menghindari komitmen.", "When questioned about campaign financing, the candidate began to equivocate.", "Ketika ditanya mengenai sumber dana kampanye, calon tersebut mulai berbicara berbelit-belit."],
      [1, "Stage 01: Presisi Dialektika & Retorika Kritis", "sagacious", "/səˈɡeɪ.ʃəs/", "adjective", "C2", "Bijaksana / Berwawasan luas", "Menunjukkan pertimbangan yang matang, pandangan jernih, dan kearifan mendalam dalam mengambil keputusan.", "The mentor was respected for her sagacious guidance during critical corporate disputes.", "Sang mentor sangat dihormati atas bimbingannya yang bijaksana selama sengketa perusahaan."],

      // STAGE 2
      [2, "Stage 02: Aksi, Dinamika & Transformasi Sistemik", "ameliorate", "/əˈmiː.li.ə.reɪt/", "verb", "C1", "Memperbaiki / Meringankan", "Membuat sesuatu yang buruk, menyakitkan, atau tidak memuaskan menjadi jauh lebih baik dan tertahankan.", "Direct cash assistance helped to ameliorate poverty in rural regions.", "Bantuan tunai langsung membantu meringankan kemiskinan di daerah pedesaan."],
      [2, "Stage 02: Aksi, Dinamika & Transformasi Sistemik", "galvanize", "/ˈɡæl.və.naɪz/", "verb", "C1", "Menggerakkan / Memantik Aksi", "Mengejutkan atau menyemangati seseorang atau masyarakat luas sehingga segera mengambil tindakan nyata.", "The investigative documentary served to galvanize public opinion against chemical dumping.", "Dokumenter investigasi tersebut berhasil menggerakkan opini publik untuk menolak pembuangan limbah kimia."],
      [2, "Stage 02: Aksi, Dinamika & Transformasi Sistemik", "repudiate", "/rɪˈpjuː.di.eɪt/", "verb", "C1", "Menolak keras / Mengingkari", "Menolak untuk menerima, mengakui, atau diasosiasikan dengan suatu klaim, teori, atau perjanjian secara tegas.", "The laboratory issued a statement to repudiate the falsified research findings.", "Laboratorium mengeluarkan pernyataan tegas untuk menolak temuan penelitian yang dipalsukan."],
      [2, "Stage 02: Aksi, Dinamika & Transformasi Sistemik", "truncate", "/trʌŋˈkeɪt/", "verb", "B2", "Memotong / Mempersingkat", "Mempersingkat atau memotong ujung sesuatu (seperti teks, waktu, atau data) sehingga menjadi tidak utuh.", "Due to time limits, the moderator had to truncate the debate session.", "Karena keterbatasan waktu, moderator harus mempersingkat sesi debat."],
      [2, "Stage 02: Aksi, Dinamika & Transformasi Sistemik", "vacillate", "/ˈvæs.ɪ.leɪt/", "verb", "C1", "Ragu-ragu / Terombang-ambing", "Bimbang atau terus berganti-ganti pendapat, perasaan, atau keputusan tanpa ketetapan hati.", "The committee began to vacillate between approving the loan or demanding more collateral.", "Komite mulai terombang-ambing antara menyetujui pinjaman atau meminta agunan tambahan."],
      [2, "Stage 02: Aksi, Dinamika & Transformasi Sistemik", "vindicate", "/ˈvɪn.dɪ.keɪt/", "verb", "C1", "Membenarkan / Membersihkan nama", "Membuktikan bahwa seseorang atau suatu tindakan itu benar, adil, atau bebas dari kesalahan setelah dicurigai.", "Subsequent DNA evidence helped to vindicate the wrongly accused defendant.", "Bukti DNA berikutnya berhasil membersihkan nama terdakwa yang dituduh secara keliru."],
      [2, "Stage 02: Aksi, Dinamika & Transformasi Sistemik", "extrapolate", "/ɪkˈstræp.ə.leɪt/", "verb", "C1", "Mengekstrapolasi / Memperkirakan", "Memperkirakan atau memproyeksikan tren masa depan berdasarkan fakta, data, atau tren yang sudah diketahui saat ini.", "We can extrapolate future sales based on the fourth-quarter consumer trend.", "Kita dapat memperkirakan penjualan masa depan berdasarkan tren konsumen kuartal keempat."],
      [2, "Stage 02: Aksi, Dinamika & Transformasi Sistemik", "delineate", "/dɪˈlɪn.i.eɪt/", "verb", "C1", "Menggambarkan rinci / Membatasi batas", "Menjelaskan, mendeskripsikan, atau menetapkan batasan sesuatu secara sangat terperinci dan presisi.", "The contract must clearly delineate the rights and obligations of both parties.", "Kontrak tersebut harus secara jelas menggambarkan hak dan kewajiban kedua belah pihak."],
      [2, "Stage 02: Aksi, Dinamika & Transformasi Sistemik", "scrutinize", "/ˈskruː.tɪ.naɪz/", "verb", "C1", "Meneliti cermat / Memeriksa saksama", "Memeriksa atau meneliti seseorang atau dokumen secara sangat teliti, kritis, dan mendalam.", "Regulators will scrutinize every ledger entry to trace the missing funds.", "Regulator akan meneliti setiap entri buku besar untuk melacak dana yang hilang."],
      [2, "Stage 02: Aksi, Dinamika & Transformasi Sistemik", "corroborate", "/kəˈrɒb.ə.reɪt/", "verb", "C1", "Menguatkan bukti / Mengonfirmasi", "Menyediakan informasi atau bukti baru yang memperkuat atau mendukung kebenaran suatu teori, pernyataan, atau temuan.", "Independent laboratory tests helped to corroborate the researchers' initial findings.", "Uji laboratorium independen membantu menguatkan bukti temuan awal para peneliti."],

      // STAGE 3
      [3, "Stage 03: Investigasi, Penalaran & Klarifikasi", "articulate", "/ɑːˈtɪk.jə.leɪt/", "verb", "C1", "Menyatakan jelas / Mengartikulasikan", "Mengungkapkan ide, pikiran, atau argumen dengan sangat jelas dan fasih menggunakan kata-kata yang tepat.", "She was able to articulate the complex scientific theory in terms anyone could understand.", "Ia mampu menyatakan teori ilmiah yang rumit dengan sangat jelas sehingga bisa dipahami siapa saja."],
      [3, "Stage 03: Investigasi, Penalaran & Klarifikasi", "mitigate", "/ˈmɪt.ɪ.ɡeɪt/", "verb", "C1", "Meringankan / Meredam bahaya", "Membuat sesuatu menjadi tidak terlalu parah, berbahaya, atau merusak.", "Planting mangroves along the coast will help mitigate coastal erosion.", "Menanam bakau di sepanjang pantai akan membantu meredam erosi pantai."],
      [3, "Stage 03: Investigasi, Penalaran & Klarifikasi", "proliferate", "/prəˈlɪf.ər.eɪt/", "verb", "C2", "Menjamur / Berkembang biak pesat", "Meningkat dalam jumlah atau menyebar dengan sangat cepat dalam waktu singkat.", "Digital payment platforms began to proliferate across emerging economies.", "Platform pembayaran digital mulai menjamur dan berkembang pesat di seluruh negara berkembang."],
      [3, "Stage 03: Investigasi, Penalaran & Klarifikasi", "substantiate", "/səbˈstæn.ʃi.eɪt/", "verb", "C1", "Membuktikan kebenaran / Mengabsahkan", "Menyediakan fakta atau bukti yang cukup untuk membuktikan kebenaran suatu klaim.", "The plaintiff could not substantiate his claims of intellectual property theft.", "Penggugat tidak dapat membuktikan kebenaran klaimnya terkait pencurian kekayaan intelektual."],
      [3, "Stage 03: Investigasi, Penalaran & Klarifikasi", "elucidate", "/iˈluː.sɪ.deɪt/", "verb", "C2", "Menerangkan lugas / Memperjelas", "Menjelaskan atau menerangkan sesuatu secara mendalam sehingga menjadi terang benderang dan mudah dimengerti.", "The keynote speaker attempted to elucidate the ethical dilemmas of artificial intelligence.", "Pembicara utama berusaha menerangkan lugas dilema etika dari kecerdasan buatan."],
      [3, "Stage 03: Investigasi, Penalaran & Klarifikasi", "pragmatic", "/præɡˈmæt.ɪk/", "adjective", "B2", "Praktis / Berorientasi hasil nyata", "Menyelesaikan masalah secara bijak, realistis, dan berorientasi pada hasil nyata daripada teori semata.", "We need a pragmatic approach to renewable energy transition rather than idealistic slogans.", "Kita memerlukan pendekatan praktis dan realistis terhadap transisi energi terbarukan daripada sekadar slogan idealis."],
      [3, "Stage 03: Investigasi, Penalaran & Klarifikasi", "tenuous", "/ˈten.ju.əs/", "adjective", "C1", "Sangat lemah / Renggang / Tipis", "Sangat rapuh, lemah, tipis, atau tidak pasti sehingga mudah runtuh atau diragukan kebenarannya.", "The link between the two events was tenuous at best.", "Kaitan antara kedua peristiwa tersebut sangatlah lemah dan meragukan."],
      [3, "Stage 03: Investigasi, Penalaran & Klarifikasi", "meticulous", "/məˈtɪk.jə.ləs/", "adjective", "C1", "Sangat teliti / Cermat mendalam", "Memperhatikan setiap detail kecil secara sangat cermat, hati-hati, dan presisi tinggi.", "Her meticulous research methodology earned unanimous praise from peer reviewers.", "Metodologi penelitiannya yang sangat teliti mendapat pujian bulat dari para peninjau sejawat."],
      [3, "Stage 03: Investigasi, Penalaran & Klarifikasi", "superfluous", "/suːˈpɜː.flu.əs/", "adjective", "C2", "Berlebihan / Tidak diperlukan", "Lebih banyak dari yang dibutuhkan atau diperlukan; mubazir sehingga pantas disingkirkan.", "The editor trimmed superfluous paragraphs to enhance the article's pacing.", "Editor memangkas paragraf yang berlebihan dan tidak diperlukan untuk mempercepat tempo artikel."],
      [3, "Stage 03: Investigasi, Penalaran & Klarifikasi", "fastidious", "/fæsˈtɪd.i.əs/", "adjective", "C2", "Sangat rewel / Menuntut kesempurnaan", "Sangat peduli terhadap kerapian, kesempurnaan, atau ketepatan detail dan sulit sekali dibuat puas.", "The chef was fastidious about the temperature and presentation of each dish.", "Sang koki sangat rewel dan menuntut kesempurnaan atas suhu dan penyajian setiap hidangan."]
    ];

    vocabSheet.getRange(2, 1, seedWords.length, seedWords[0].length).setValues(seedWords);
  }

  // B. Inisialisasi Tab UserProgress
  var progressSheet = ss.getSheetByName('UserProgress');
  if (!progressSheet) {
    progressSheet = ss.insertSheet('UserProgress');
  }

  var progressHeaders = ['user_id', 'progress_json', 'updated_at'];
  if (progressSheet.getLastRow() === 0) {
    progressSheet.appendRow(progressHeaders);
    progressSheet.getRange(1, 1, 1, progressHeaders.length).setFontWeight('bold').setBackground('#f1f5f9');
    progressSheet.appendRow(['default', '{}', new Date().toISOString()]);
  }

  // C. Inisialisasi Tab KnowledgeTopics
  setupKnowledgeTopics();

  // D. Bersihkan Tab Nyasar dari Project Lain (Ternak Duit / Sheet1)
  var straySheets = ['BrokerSummary', 'BrokerAnalysis', 'ScrapeLog', 'IngestionJobs', 'Sheet1'];
  for (var s = 0; s < straySheets.length; s++) {
    var stray = ss.getSheetByName(straySheets[s]);
    if (stray && ss.getSheets().length > 1) {
      ss.deleteSheet(stray);
    }
  }

  Logger.log("Database setup & cleanup selesai! Tab 'Vocabulary', 'UserProgress', dan 'KnowledgeTopics' siap digunakan, dan tab Ternak Duit telah dihapus.");
}

/**
 * Inisialisasi Tab KnowledgeTopics (8 kolom)
 */
function setupKnowledgeTopics() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var topicSheet = ss.getSheetByName('KnowledgeTopics');
  if (!topicSheet) {
    topicSheet = ss.insertSheet('KnowledgeTopics');
  }

  var headers = [
    'branch_id', 'branch_title', 'topic_id', 'topic_title',
    'stage_id', 'stage_title', 'content', 'key_points'
  ];

  if (topicSheet.getLastRow() === 0) {
    topicSheet.appendRow(headers);
    topicSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#f1f5f9');
  }

  return topicSheet;
}

/**
 * 2. HANDLER GET (doGet)
 * - action=getProgress : Mengambil data JSON UserProgressData
 * - default (action=getVocab) : Mengambil array WordItem[] kosa kata
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = (e && e.parameter && e.parameter.action) ? String(e.parameter.action).trim() : 'getVocab';

    // A. Mode Progres Pengguna
    if (action === 'getProgress') {
      var progressSheet = ss.getSheetByName('UserProgress');
      if (!progressSheet) {
        return createJsonResponse({ status: 'empty', data: null });
      }

      var progressData = progressSheet.getDataRange().getValues();
      if (progressData.length <= 1) {
        return createJsonResponse({ status: 'empty', data: null });
      }

      var rawJson = String(progressData[1][1] || '').trim();
      var updatedAt = progressData[1][2] || '';

      if (!rawJson || rawJson === '{}') {
        return createJsonResponse({ status: 'empty', data: null });
      }

      var parsed = JSON.parse(rawJson);
      return createJsonResponse({
        status: 'success',
        data: parsed,
        updatedAt: updatedAt
      });
    }

    // B. Mode Pengetahuan / Topik Multi-Branch (action=getTopics)
    if (action === 'getTopics') {
      var topicSheet = ss.getSheetByName('KnowledgeTopics');
      if (!topicSheet) {
        return createJsonResponse([]);
      }

      var topicData = topicSheet.getDataRange().getValues();
      if (topicData.length <= 1) {
        return createJsonResponse([]);
      }

      var topicHeaders = topicData[0].map(function(h) { 
        return String(h).trim().toLowerCase(); 
      });

      var colBranchId = topicHeaders.indexOf('branch_id');
      var colBranchTitle = topicHeaders.indexOf('branch_title');
      var colTopicId = topicHeaders.indexOf('topic_id');
      var colTopicTitle = topicHeaders.indexOf('topic_title');
      var colStageId = topicHeaders.indexOf('stage_id');
      var colStageTitle = topicHeaders.indexOf('stage_title');
      var colContent = topicHeaders.indexOf('content');
      var colKeyPoints = topicHeaders.indexOf('key_points');

      var topics = [];

      for (var t = 1; t < topicData.length; t++) {
        var tRow = topicData[t];
        var topicId = String(tRow[colTopicId >= 0 ? colTopicId : 2] || '').trim();
        var rawStageId = tRow[colStageId >= 0 ? colStageId : 4];
        var stageId = parseInt(rawStageId, 10) || 1;
        var content = String(tRow[colContent >= 0 ? colContent : 6] || '').trim();
        if (!topicId || !content) continue;

        var branchId = String(tRow[colBranchId >= 0 ? colBranchId : 0] || 'general').trim();
        var branchTitle = String(tRow[colBranchTitle >= 0 ? colBranchTitle : 1] || 'General').trim();
        var topicTitle = String(tRow[colTopicTitle >= 0 ? colTopicTitle : 3] || 'Untitled Topic').trim();
        var stageTitle = String(tRow[colStageTitle >= 0 ? colStageTitle : 5] || ('Bagian ' + stageId)).trim();
        var rawKeyPoints = String(tRow[colKeyPoints >= 0 ? colKeyPoints : 7] || '').trim();
        var keyPoints = rawKeyPoints ? rawKeyPoints.split('|').map(function(s) { return s.trim(); }).filter(Boolean) : [];

        topics.push({
          id: topicId + '-s' + stageId,
          branchId: branchId,
          branchTitle: branchTitle,
          topicId: topicId,
          topicTitle: topicTitle,
          stageId: stageId,
          stageTitle: stageTitle,
          content: content,
          keyPoints: keyPoints
        });
      }

      return createJsonResponse(topics);
    }

    // C. Mode Kosa Kata (Default)
    var sheet = ss.getSheetByName('Vocabulary');
    if (!sheet) {
      return createJsonResponse({
        status: 'error',
        message: "Sheet 'Vocabulary' tidak ditemukan. Jalankan fungsi 'setupDatabase' di Apps Script terlebih dahulu."
      }, 404);
    }

    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse([]);
    }

    var headers = data[0].map(function(h) { 
      return String(h).trim().toLowerCase(); 
    });

    var colStageId = headers.indexOf('stage_id');
    var colStageTitle = headers.indexOf('stage_title');
    var colWord = headers.indexOf('word');
    var colPhonetic = headers.indexOf('phonetic');
    var colPos = headers.indexOf('part_of_speech');
    var colCefr = headers.indexOf('cefr');
    var colTranslation = headers.indexOf('translation');
    var colDefinition = headers.indexOf('definition');
    var colExampleEn = headers.indexOf('example_en');
    var colExampleId = headers.indexOf('example_id');

    var words = [];

    for (var i = 1; i < data.length; i++) {
      var row = data[i];

      var word = String(row[colWord >= 0 ? colWord : 2] || '').trim();
      if (!word) continue;

      var rawStageId = row[colStageId >= 0 ? colStageId : 0];
      var stageId = parseInt(rawStageId, 10) || 1;

      var stageTitle = String(row[colStageTitle >= 0 ? colStageTitle : 1] || '').trim() || ('Stage ' + stageId);
      var phonetic = String(row[colPhonetic >= 0 ? colPhonetic : 3] || '').trim();
      var translation = String(row[colTranslation >= 0 ? colTranslation : 6] || '').trim();
      var definition = String(row[colDefinition >= 0 ? colDefinition : 7] || '').trim();
      var rawPos = String(row[colPos >= 0 ? colPos : 4] || '').toLowerCase().trim();
      var partOfSpeech = normalizePartOfSpeechGas(rawPos, translation || definition);
      
      var rawCefr = String(row[colCefr >= 0 ? colCefr : 5] || '').toUpperCase().trim();
      var cefr = ['B2', 'C1', 'C2'].indexOf(rawCefr) >= 0 ? rawCefr : 'B2';
      var exampleEn = String(row[colExampleEn >= 0 ? colExampleEn : 8] || '').trim();
      var exampleId = String(row[colExampleId >= 0 ? colExampleId : 9] || '').trim();

      var escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var clozeEnglish = exampleEn;
      if (exampleEn) {
        var wordRegex = new RegExp('\\b' + escapedWord + '\\b', 'gi');
        if (wordRegex.test(exampleEn)) {
          clozeEnglish = exampleEn.replace(wordRegex, '________');
        } else {
          clozeEnglish = exampleEn.replace(new RegExp(escapedWord, 'gi'), '________');
        }
      }

      // ID deterministik w{stageId}-{wordSlug}
      var wordId = 'w' + stageId + '-' + word.toLowerCase().replace(/[^a-z0-9]/g, '-');

      words.push({
        id: wordId,
        word: word,
        phonetic: phonetic,
        partOfSpeech: partOfSpeech,
        cefr: cefr,
        translation: translation,
        definition: definition,
        contextSentences: [
          {
            english: exampleEn,
            indonesian: exampleId,
            clozeEnglish: clozeEnglish
          }
        ],
        stageId: stageId,
        stageTitle: stageTitle
      });
    }

    return createJsonResponse(words);

  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: err.toString()
    }, 500);
  }
}

/**
 * 3. HANDLER POST (doPost)
 * - action === 'appendVocab' : Menambahkan kosa kata baru secara bulk (tanpa duplikasi)
 * - default : Menyimpan progress pengguna ke tab 'UserProgress'
 */
function doPost(e) {
  try {
    var rawBody = (e && e.postData && e.postData.contents) ? e.postData.contents : '';
    if (!rawBody) {
      return createJsonResponse({ status: 'error', message: 'Payload body kosong' }, 400);
    }

    // Validasi apakah payload merupakan format JSON valid
    var parsed = JSON.parse(rawBody);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // A. Mode Bulk Append Vocabulary
    if (parsed && (parsed.action === 'appendVocab' || parsed.action === 'appendVocabBatch')) {
      var vocabSheet = ss.getSheetByName('Vocabulary');
      if (!vocabSheet) {
        return createJsonResponse({ status: 'error', message: "Sheet 'Vocabulary' tidak ditemukan. Jalankan 'setupDatabase' terlebih dahulu." }, 404);
      }

      var data = vocabSheet.getDataRange().getValues();
      var existingWords = {};
      var colWord = 2; // Default Kolom C (0-indexed = 2)

      if (data.length > 0) {
        var headers = data[0].map(function(h) { return String(h).trim().toLowerCase(); });
        var foundCol = headers.indexOf('word');
        if (foundCol >= 0) colWord = foundCol;

        for (var i = 1; i < data.length; i++) {
          var existingWord = String(data[i][colWord] || '').trim().toLowerCase();
          if (existingWord) existingWords[existingWord] = true;
        }
      }

      var incomingWords = Array.isArray(parsed.words) ? parsed.words : [];
      var rowsToAdd = [];
      var skippedDuplicates = 0;

      for (var j = 0; j < incomingWords.length; j++) {
        var item = incomingWords[j];
        var wordStr = '';
        var rowData = [];

        if (Array.isArray(item)) {
          wordStr = String(item[2] || '').trim();
          var rawP = String(item[4] || 'verb');
          rowData = [
            item[0] || 1,
            item[1] || ('Stage ' + (item[0] || 1)),
            wordStr,
            item[3] || '',
            normalizePartOfSpeechGas(rawP, String(item[6] || item[7] || '')),
            item[5] || 'B2',
            item[6] || '',
            item[7] || '',
            item[8] || '',
            item[9] || ''
          ];
        } else if (item && typeof item === 'object') {
          wordStr = String(item.word || '').trim();
          var sId = parseInt(item.stage_id || item.stageId, 10) || 1;
          var sTitle = String(item.stage_title || item.stageTitle || ('Stage ' + (sId < 10 ? '0' + sId : sId))).trim();
          var transStr = String(item.translation || '').trim();
          var defStr = String(item.definition || '').trim();
          rowData = [
            sId,
            sTitle,
            wordStr,
            String(item.phonetic || '').trim(),
            normalizePartOfSpeechGas(item.part_of_speech || item.partOfSpeech || 'verb', transStr || defStr),
            String(item.cefr || 'B2').toUpperCase().trim(),
            transStr,
            defStr,
            String(item.example_en || item.exampleEn || '').trim(),
            String(item.example_id || item.exampleId || '').trim()
          ];
        }

        if (!wordStr) continue;

        var lowerWord = wordStr.toLowerCase();
        if (existingWords[lowerWord]) {
          skippedDuplicates++;
          continue;
        }

        existingWords[lowerWord] = true;
        rowsToAdd.push(rowData);
      }

      if (rowsToAdd.length > 0) {
        var startRow = vocabSheet.getLastRow() + 1;
        vocabSheet.getRange(startRow, 1, rowsToAdd.length, 10).setValues(rowsToAdd);
      }

      return createJsonResponse({
        status: 'success',
        message: rowsToAdd.length + ' kosa kata baru berhasil ditambahkan.',
        addedCount: rowsToAdd.length,
        skippedDuplicates: skippedDuplicates,
        totalWordsInSheet: vocabSheet.getLastRow() - 1
      });
    }

    // B. Mode Bulk Sync KnowledgeTopics (action === 'syncTopics')
    if (parsed && parsed.action === 'syncTopics') {
      var topicSheet = setupKnowledgeTopics();
      if (topicSheet.getLastRow() > 1) {
        topicSheet.getRange(2, 1, topicSheet.getLastRow() - 1, 8).clearContent();
      }
      var incomingTopics = Array.isArray(parsed.topics) ? parsed.topics : [];
      var topicRows = [];
      for (var k = 0; k < incomingTopics.length; k++) {
        var tItem = incomingTopics[k];
        topicRows.push([
          String(tItem.branchId || tItem.branch_id || 'psychology'),
          String(tItem.branchTitle || tItem.branch_title || 'Psychology & Life'),
          String(tItem.topicId || tItem.topic_id || 'psy-read-people'),
          String(tItem.topicTitle || tItem.topic_title || ''),
          Number(tItem.stageId || tItem.stage_id || (k + 1)),
          String(tItem.stageTitle || tItem.stage_title || ''),
          String(tItem.content || ''),
          Array.isArray(tItem.keyPoints) ? tItem.keyPoints.join(' | ') : String(tItem.key_points || '')
        ]);
      }
      if (topicRows.length > 0) {
        topicSheet.getRange(2, 1, topicRows.length, 8).setValues(topicRows);
      }
      return createJsonResponse({
        status: 'success',
        message: topicRows.length + ' bagian KnowledgeTopics berhasil disinkronkan.',
        totalTopicsInSheet: topicRows.length
      });
    }

    // C. Mode Default: Simpan Progres Belajar (UserProgress)
    var progressSheet = ss.getSheetByName('UserProgress');
    if (!progressSheet) {
      progressSheet = ss.insertSheet('UserProgress');
      progressSheet.appendRow(['user_id', 'progress_json', 'updated_at']);
    }

    var nowIso = new Date().toISOString();

    // Baris ke-2 selalu dialokasikan untuk profile default
    if (progressSheet.getLastRow() < 2) {
      progressSheet.appendRow(['default', JSON.stringify(parsed), nowIso]);
    } else {
      progressSheet.getRange(2, 2).setValue(JSON.stringify(parsed));
      progressSheet.getRange(2, 3).setValue(nowIso);
    }

    return createJsonResponse({
      status: 'success',
      message: 'Progres pengguna berhasil disimpan di Google Sheets',
      updatedAt: nowIso
    });

  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: err.toString()
    }, 500);
  }
}

/**
 * Utilitas pembentuk response JSON dengan CORS Header
 */
function createJsonResponse(dataObject) {
  var output = ContentService.createTextOutput(JSON.stringify(dataObject));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Normalisasi kelas kata (part of speech), termasuk format gabungan seperti "Noun / Verb"
 */
function normalizePartOfSpeechGas(posStr, indonesianText) {
  var str = String(posStr || '').toLowerCase().trim();
  var validPos = ['verb', 'adjective', 'noun', 'adverb'];
  if (validPos.indexOf(str) >= 0) return str;

  var tokens = str.split(/[\/,|]/).map(function(t) { return t.trim(); });
  if (tokens.indexOf('verb') >= 0) {
    var indo = String(indonesianText || '').toLowerCase().trim();
    if (indo.indexOf('me') === 0 || indo.indexOf('ber') === 0 || indo.indexOf('di') === 0) {
      return 'verb';
    }
  }

  for (var i = 0; i < tokens.length; i++) {
    if (validPos.indexOf(tokens[i]) >= 0) return tokens[i];
  }

  return 'verb';
}
```

---

## 3. Struktur Kolom Tab

### Tab 1: `Vocabulary` (10 Kolom)

| Kolom | Header | Tipe Data | Keterangan |
| :--- | :--- | :--- | :--- |
| **A** | `stage_id` | Angka | ID Stage (misal `1`, `2`, `3`) |
| **B** | `stage_title` | Teks | Judul/tema stage |
| **C** | `word` | Teks | Kata bahasa Inggris target |
| **D** | `phonetic` | Teks | Simbol fonetik IPA (misal `/pərˈsiːv/`) |
| **E** | `part_of_speech` | Teks | `verb`, `adjective`, `noun`, atau `adverb` |
| **F** | `cefr` | Teks | `B2`, `C1`, atau `C2` |
| **G** | `translation` | Teks | Terjemahan bahasa Indonesia |
| **H** | `definition` | Teks | Definisi lengkap bahasa Indonesia |
| **I** | `example_en` | Teks | Contoh kalimat bahasa Inggris |
| **J** | `example_id` | Teks | Terjemahan contoh kalimat bahasa Indonesia |

### Tab 2: `UserProgress` (3 Kolom)

| Kolom | Header | Tipe Data | Keterangan |
| :--- | :--- | :--- | :--- |
| **A** | `user_id` | Teks | ID pengguna (`default`) |
| **B** | `progress_json` | Teks Panjang | String JSON objek `UserProgressData` (streak, clearedStages, wordStats) |
| **C** | `updated_at` | Teks ISO-8601 | Timestamp terakhir kali data disimpan |
