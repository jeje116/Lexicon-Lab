# Panduan Integrasi Google Sheets & Google Apps Script (Lexicon Lab)

Dokumen ini menjelaskan struktur kolom tabel Google Sheets dan kode **Google Apps Script** yang siap pakai untuk menghubungkan data kosa kata dinamis ke aplikasi **Lexicon Lab**.

---

## 1. Struktur Tabel Spreadsheet

Buat spreadsheet baru di [Google Sheets](https://sheets.new) dan ubah nama tab/sheet pertama menjadi: **`Vocabulary`**.

### Header Baris ke-1 (Wajib Sama Persis)

| Kolom | Nama Header | Tipe Data | Deskripsi & Contoh |
| :--- | :--- | :--- | :--- |
| **A** | `stage_id` | Angka | ID Stage kosa kata (misal: `1`, `2`, `3`) |
| **B** | `stage_title` | Teks | Judul/tema stage (misal: `Cognitive & Sensory Perception`) |
| **C** | `word` | Teks | Kata target bahasa Inggris (misal: `perceive`) |
| **D** | `phonetic` | Teks | Pelafalan fonetik IPA (misal: `/pərˈsiːv/`) |
| **E** | `part_of_speech` | Teks | Kelas kata: `verb`, `adjective`, `noun`, atau `adverb` |
| **F** | `cefr` | Teks | Tingkat kemahiran: `B2`, `C1`, atau `C2` |
| **G** | `translation` | Teks | Terjemahan bahasa Indonesia langsung (misal: `memahami, melihat, menyadari`) |
| **H** | `definition` | Teks | Definisi lengkap dalam bahasa Indonesia |
| **I** | `example_en` | Teks | Contoh kalimat dalam bahasa Inggris |
| **J** | `example_id` | Teks | Terjemahan contoh kalimat ke bahasa Indonesia |

---

### Contoh 5 Baris Data Awal (Siap Salin & Tempel)

Salin baris di bawah ini dan tempelkan langsung mulai dari sel **A2** di Google Sheets Anda:

```tsv
1	Cognitive & Sensory Perception	perceive	/pərˈsiːv/	verb	B2	memahami, melihat, menyadari	Menjadi sadar atau memahami sesuatu melalui indra atau pikiran.	He could perceive a faint light through the dense fog.	Dia bisa melihat seberkas cahaya redup menembus kabut tebal.
1	Cognitive & Sensory Perception	discern	/dɪˈsɜːrn/	verb	C1	membedakan, melihat dengan jelas	Mengenali atau membedakan sesuatu yang samar dengan ketajaman pikiran atau mata.	It was difficult to discern the truth from his vague statements.	Sulit untuk membedakan kebenaran dari pernyataan-pernyataannya yang samar.
1	Cognitive & Sensory Perception	scrutinize	/ˈskruːtənaɪz/	verb	C1	meneliti, memeriksa dengan cermat	Memeriksa sesuatu secara sangat teliti dan kritis hingga ke detail terkecil.	The auditor will scrutinize every single financial transaction.	Auditor akan memeriksa setiap transaksi keuangan dengan sangat teliti.
1	Cognitive & Sensory Perception	subtle	/ˈsʌtl/	adjective	B2	halus, samar, tidak kentara	Sesuatu yang begitu lembut atau tidak mencolok sehingga sulit diperhatikan secara langsung.	There was a subtle change in his tone during the negotiation.	Ada perubahan halus dalam nada bicaranya selama negosiasi.
1	Cognitive & Sensory Perception	lucid	/ˈluːsɪd/	adjective	B2	jelas, mudah dipahami, jernih	Dinyatakan dengan sangat jelas, mudah dimengerti, atau keadaan pikiran yang sadar penuh.	The professor gave a lucid explanation of the quantum principle.	Profesor itu memberikan penjelasan yang sangat jelas tentang prinsip kuantum.
```

---

## 2. Kode Google Apps Script (`Code.gs`)

1. Pada Google Sheets Anda, buka menu: **Extensions** > **Apps Script**.
2. Hapus semua kode bawaan di dalam file `Code.gs`.
3. Salin dan tempel kode berikut:

```javascript
/**
 * Lexicon Lab - Google Apps Script Web App API
 * Menghubungkan Google Sheets tab 'Vocabulary' ke antarmuka React Lexicon Lab
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Vocabulary');

    if (!sheet) {
      return createJsonResponse({
        status: 'error',
        message: "Sheet 'Vocabulary' tidak ditemukan. Pastikan nama tab sheet adalah 'Vocabulary'."
      }, 404);
    }

    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse([]);
    }

    // Ambil baris header (Baris 1)
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

    // Iterasi mulai dari baris 2 (indeks 1)
    for (var i = 1; i < data.length; i++) {
      var row = data[i];

      var word = String(row[colWord >= 0 ? colWord : 2] || '').trim();
      if (!word) continue; // Abaikan baris kosong

      var rawStageId = row[colStageId >= 0 ? colStageId : 0];
      var stageId = parseInt(rawStageId, 10) || 1;

      var stageTitle = String(row[colStageTitle >= 0 ? colStageTitle : 1] || '').trim() || ('Stage ' + stageId);
      var phonetic = String(row[colPhonetic >= 0 ? colPhonetic : 3] || '').trim();
      var rawPos = String(row[colPos >= 0 ? colPos : 4] || '').toLowerCase().trim();
      var partOfSpeech = ['verb', 'adjective', 'noun', 'adverb'].indexOf(rawPos) >= 0 ? rawPos : 'verb';
      
      var rawCefr = String(row[colCefr >= 0 ? colCefr : 5] || '').toUpperCase().trim();
      var cefr = ['B2', 'C1', 'C2'].indexOf(rawCefr) >= 0 ? rawCefr : 'B2';

      var translation = String(row[colTranslation >= 0 ? colTranslation : 6] || '').trim();
      var definition = String(row[colDefinition >= 0 ? colDefinition : 7] || '').trim();
      var exampleEn = String(row[colExampleEn >= 0 ? colExampleEn : 8] || '').trim();
      var exampleId = String(row[colExampleId >= 0 ? colExampleId : 9] || '').trim();

      // Buat kalimat cloze (isi bagian kosong) otomatis
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
 * Format respons JSON dengan Header CORS untuk akses Web Client
 */
function createJsonResponse(dataObject) {
  var output = ContentService.createTextOutput(JSON.stringify(dataObject));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

---

## 3. Langkah Deploy Menjadi Web App

Agar endpoint dapat diakses oleh browser tanpa login:

1. Di editor Apps Script, klik tombol biru **Deploy** (Kanan atas) > pilih **New deployment**.
2. Klik ikon gerigi (Select type) > pilih **Web app**.
3. Isi konfigurasi deployment:
   - **Description**: `Lexicon Lab API v1`
   - **Execute as**: `Me (email-anda@gmail.com)`
   - **Who has access**: **`Anyone`** *(Sangat penting: pilih "Anyone" agar browser dapat mem-fetch data tanpa otentikasi Google).*
4. Klik **Deploy**.
5. Jika muncul jendela otorisasi akun (*Authorization Required*), pilih akun Anda > klik *Advanced* > klik *Go to (project name) (unsafe)* > klik *Allow*.
6. Salin **Web app URL** yang dihasilkan (contoh format: `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 4. Konfigurasi di Aplikasi React Lexicon Lab

1. Buka file `.env` di root proyek ini (atau salin dari `.env.example`).
2. Tempelkan Web app URL ke variabel `VITE_GOOGLE_SHEETS_API_URL`:
   ```bash
   VITE_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
3. Restart dev server (`npm run dev`) atau jalankan build (`npm run build`).
4. Buka aplikasi di browser. Header HUD akan menampilkan badge hijau: **`Sheets: Live`**. Jika URL kosong atau offline, aplikasi secara otomatis menggunakan data cadangan bawaan (**`Data: Local Mock`**).
