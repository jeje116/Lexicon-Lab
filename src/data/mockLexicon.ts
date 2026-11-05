import { WordItem, WordRetentionStats } from '../types/lexicon';

export const STAGE_LIST = [
  {
    "id": 1,
    "title": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": 2,
    "title": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": 3,
    "title": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": 4,
    "title": "Stage 04: Master Lexicon 04"
  },
  {
    "id": 5,
    "title": "Stage 05: Master Lexicon 05"
  },
  {
    "id": 6,
    "title": "Stage 06: Master Lexicon 06"
  },
  {
    "id": 7,
    "title": "Stage 07: Master Lexicon 07"
  },
  {
    "id": 8,
    "title": "Stage 08: Master Lexicon 08"
  },
  {
    "id": 9,
    "title": "Stage 09: Master Lexicon 09"
  },
  {
    "id": 10,
    "title": "Stage 10: Master Lexicon 10"
  },
  {
    "id": 11,
    "title": "Stage 11: Master Lexicon 11"
  },
  {
    "id": 12,
    "title": "Stage 12: Master Lexicon 12"
  },
  {
    "id": 13,
    "title": "Stage 13: Master Lexicon 13"
  },
  {
    "id": 14,
    "title": "Stage 14: Master Lexicon 14"
  },
  {
    "id": 15,
    "title": "Stage 15: Master Lexicon 15"
  },
  {
    "id": 16,
    "title": "Stage 16: Master Lexicon 16"
  },
  {
    "id": 17,
    "title": "Stage 17: Master Lexicon 17"
  },
  {
    "id": 18,
    "title": "Stage 18: Master Lexicon 18"
  },
  {
    "id": 19,
    "title": "Stage 19: Master Lexicon 19"
  },
  {
    "id": 20,
    "title": "Stage 20: Master Lexicon 20"
  },
  {
    "id": 21,
    "title": "Stage 21: Master Lexicon 21"
  },
  {
    "id": 22,
    "title": "Stage 22: Master Lexicon 22"
  },
  {
    "id": 23,
    "title": "Stage 23: Master Lexicon 23"
  },
  {
    "id": 24,
    "title": "Stage 24: Master Lexicon 24"
  },
  {
    "id": 25,
    "title": "Stage 25: Master Lexicon 25"
  },
  {
    "id": 26,
    "title": "Stage 26: Master Lexicon 26"
  },
  {
    "id": 27,
    "title": "Stage 27: Master Lexicon 27"
  },
  {
    "id": 28,
    "title": "Stage 28: Master Lexicon 28"
  },
  {
    "id": 29,
    "title": "Stage 29: Master Lexicon 29"
  },
  {
    "id": 30,
    "title": "Stage 30: Master Lexicon 30"
  },
  {
    "id": 31,
    "title": "Stage 31: Master Lexicon 31"
  },
  {
    "id": 32,
    "title": "Stage 32: Master Lexicon 32"
  },
  {
    "id": 33,
    "title": "Stage 33: Master Lexicon 33"
  },
  {
    "id": 34,
    "title": "Stage 34: Master Lexicon 34"
  },
  {
    "id": 35,
    "title": "Stage 35: Master Lexicon 35"
  },
  {
    "id": 36,
    "title": "Stage 36: Master Lexicon 36"
  },
  {
    "id": 37,
    "title": "Stage 37: Master Lexicon 37"
  },
  {
    "id": 38,
    "title": "Stage 38: Master Lexicon 38"
  },
  {
    "id": 39,
    "title": "Stage 39: Master Lexicon 39"
  },
  {
    "id": 40,
    "title": "Stage 40: Master Lexicon 40"
  },
  {
    "id": 41,
    "title": "Stage 41: Master Lexicon 41"
  },
  {
    "id": 42,
    "title": "Stage 42: Master Lexicon 42"
  },
  {
    "id": 43,
    "title": "Stage 43: Master Lexicon 43"
  },
  {
    "id": 44,
    "title": "Stage 44: Master Lexicon 44"
  },
  {
    "id": 45,
    "title": "Stage 45: Master Lexicon 45"
  },
  {
    "id": 46,
    "title": "Stage 46: Master Lexicon 46"
  }
];

export const ALL_WORDS_POOL: WordItem[] = [
  {
    "id": "w1-ubiquitous",
    "word": "ubiquitous",
    "phonetic": "/juːˈbɪk.wɪ.təs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Ada di mana-mana / Merajalela",
    "definition": "Hadir, muncul, atau ditemukan di mana-mana secara bersamaan dalam kehidupan sehari-hari.",
    "contextSentences": [
      {
        "english": "Smartphones have become so ubiquitous that their absence in daily life is now viewed as an anomaly.",
        "indonesian": "Ponsel pintar telah menjadi begitu merajalela sehingga ketiadaannya dalam kehidupan sehari-hari kini dianggap aneh.",
        "clozeEnglish": "Smartphones have become so ________ that their absence in daily life is now viewed as an anomaly."
      }
    ],
    "stageId": 1,
    "stageTitle": "Stage 01: Presisi Dialektika & Retorika Kritis",
    "clusterId": 1,
    "clusterTitle": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": "w1-anachronistic",
    "word": "anachronistic",
    "phonetic": "/əˌnæk.rəˈnɪs.tɪk/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Ketinggalan zaman / Anakronistis",
    "definition": "Berada di luar era yang tepat atau sangat kuno sehingga tidak cocok lagi dengan masa kini.",
    "contextSentences": [
      {
        "english": "In an era of instant algorithmic trading, paper ticker tapes appear charmingly anachronistic.",
        "indonesian": "Di era perdagangan algoritma instan, pita pencatat harga kertas tampak sangat ketinggalan zaman.",
        "clozeEnglish": "In an era of instant algorithmic trading, paper ticker tapes appear charmingly ________."
      }
    ],
    "stageId": 1,
    "stageTitle": "Stage 01: Presisi Dialektika & Retorika Kritis",
    "clusterId": 1,
    "clusterTitle": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": "w1-obfuscate",
    "word": "obfuscate",
    "phonetic": "/ˈɒb.fʌs.keɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengaburkan / Memperkeruh",
    "definition": "Membuat sesuatu menjadi tidak jelas, membingungkan, atau sengaja disamarkan agar sulit dipahami.",
    "contextSentences": [
      {
        "english": "The company attempted to obfuscate the financial losses by burying them in dense footnotes.",
        "indonesian": "Perusahaan berusaha mengaburkan kerugian finansial dengan menyembunyikannya di catatan kaki yang padat.",
        "clozeEnglish": "The company attempted to ________ the financial losses by burying them in dense footnotes."
      }
    ],
    "stageId": 1,
    "stageTitle": "Stage 01: Presisi Dialektika & Retorika Kritis",
    "clusterId": 1,
    "clusterTitle": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": "w1-perfunctory",
    "word": "perfunctory",
    "phonetic": "/pəˈfʌŋk.tər.i/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Asal-asalan / Sekadar formalitas",
    "definition": "Dilakukan dengan usaha minimal, tergesa-gesa, atau sekadar memenuhi kewajiban rutin tanpa rasa peduli.",
    "contextSentences": [
      {
        "english": "The inspector cast a perfunctory glance at the manifest before stamping the container permit.",
        "indonesian": "Petugas pemeriksa hanya melihat sekilas secara asal-asalan ke manifes sebelum membubuhkan stempel izin.",
        "clozeEnglish": "The inspector cast a ________ glance at the manifest before stamping the container permit."
      }
    ],
    "stageId": 1,
    "stageTitle": "Stage 01: Presisi Dialektika & Retorika Kritis",
    "clusterId": 1,
    "clusterTitle": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": "w1-perspicacious",
    "word": "perspicacious",
    "phonetic": "/ˌpɜː.spɪˈkeɪ.ʃəs/",
    "partOfSpeech": "adjective",
    "cefr": "C2",
    "translation": "Cerdik / Berpandangan tajam",
    "definition": "Memiliki pemahaman yang sangat tajam, cepat mengerti, dan mampu melihat rincian yang terlewatkan orang lain.",
    "contextSentences": [
      {
        "english": "Thanks to perspicacious forecasting, the fund liquidated risky assets before the market crash.",
        "indonesian": "Berkat ramalan yang cerdik dan tajam, dana investasi mencairkan aset berisiko sebelum pasar anjlok.",
        "clozeEnglish": "Thanks to ________ forecasting, the fund liquidated risky assets before the market crash."
      }
    ],
    "stageId": 1,
    "stageTitle": "Stage 01: Presisi Dialektika & Retorika Kritis",
    "clusterId": 1,
    "clusterTitle": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": "w1-epitomize",
    "word": "epitomize",
    "phonetic": "/ɪˈpɪt.ə.maɪz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menjadi contoh sempurna / Mewakili",
    "definition": "Menjadi contoh paling representatif atau puncak perwujudan dari suatu sifat, gaya, atau kualitas.",
    "contextSentences": [
      {
        "english": "His calm resolve under immense pressure seemed to epitomize true leadership.",
        "indonesian": "Ketegaran tenangnya di bawah tekanan berat tampak menjadi contoh sempurna kepemimpinan sejati.",
        "clozeEnglish": "His calm resolve under immense pressure seemed to ________ true leadership."
      }
    ],
    "stageId": 1,
    "stageTitle": "Stage 01: Presisi Dialektika & Retorika Kritis",
    "clusterId": 1,
    "clusterTitle": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": "w1-exacerbate",
    "word": "exacerbate",
    "phonetic": "/ɪɡˈzæs.ə.beɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memperburuk / Memperparah",
    "definition": "Menjadikan suatu masalah, penyakit, ketegangan, atau situasi buruk menjadi jauh lebih parah.",
    "contextSentences": [
      {
        "english": "Imposing severe trade tariffs will only exacerbate domestic inflation.",
        "indonesian": "Penerapan tarif dagang yang berat hanya akan memperparah inflasi domestik.",
        "clozeEnglish": "Imposing severe trade tariffs will only ________ domestic inflation."
      }
    ],
    "stageId": 1,
    "stageTitle": "Stage 01: Presisi Dialektika & Retorika Kritis",
    "clusterId": 1,
    "clusterTitle": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": "w1-esoteric",
    "word": "esoteric",
    "phonetic": "/ˌes.əˈter.ɪk/",
    "partOfSpeech": "adjective",
    "cefr": "C2",
    "translation": "Eksoteris / Hanya dipahami segelintir orang",
    "definition": "Ditujukan untuk atau hanya mungkin dimengerti oleh segelintir orang yang memiliki pengetahuan khusus yang mendalam.",
    "contextSentences": [
      {
        "english": "The monograph explored esoteric mathematical formulations that baffled non-specialists.",
        "indonesian": "Monograf tersebut meneliti rumusan matematika esoteris yang membingungkan para non-ahli.",
        "clozeEnglish": "The monograph explored ________ mathematical formulations that baffled non-specialists."
      }
    ],
    "stageId": 1,
    "stageTitle": "Stage 01: Presisi Dialektika & Retorika Kritis",
    "clusterId": 1,
    "clusterTitle": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": "w1-equivocate",
    "word": "equivocate",
    "phonetic": "/ɪˈkwɪv.ə.keɪt/",
    "partOfSpeech": "verb",
    "cefr": "C2",
    "translation": "Berbicara mendua / Berbelit-belit",
    "definition": "Menggunakan bahasa yang ambigu atau tidak jelas untuk menyembunyikan kebenaran atau menghindari komitmen.",
    "contextSentences": [
      {
        "english": "When questioned about campaign financing, the candidate began to equivocate.",
        "indonesian": "Ketika ditanya mengenai sumber dana kampanye, calon tersebut mulai berbicara berbelit-belit.",
        "clozeEnglish": "When questioned about campaign financing, the candidate began to ________."
      }
    ],
    "stageId": 1,
    "stageTitle": "Stage 01: Presisi Dialektika & Retorika Kritis",
    "clusterId": 1,
    "clusterTitle": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": "w1-sagacious",
    "word": "sagacious",
    "phonetic": "/səˈɡeɪ.ʃəs/",
    "partOfSpeech": "adjective",
    "cefr": "C2",
    "translation": "Bijaksana / Berwawasan luas",
    "definition": "Menunjukkan pertimbangan yang matang, pandangan jernih, dan kearifan mendalam dalam mengambil keputusan.",
    "contextSentences": [
      {
        "english": "The mentor was respected for her sagacious guidance during critical corporate disputes.",
        "indonesian": "Sang mentor sangat dihormati atas bimbingannya yang bijaksana selama sengketa perusahaan.",
        "clozeEnglish": "The mentor was respected for her ________ guidance during critical corporate disputes."
      }
    ],
    "stageId": 1,
    "stageTitle": "Stage 01: Presisi Dialektika & Retorika Kritis",
    "clusterId": 1,
    "clusterTitle": "Stage 01: Presisi Dialektika & Retorika Kritis"
  },
  {
    "id": "w2-ameliorate",
    "word": "ameliorate",
    "phonetic": "/əˈmiː.li.ə.reɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memperbaiki / Meringankan",
    "definition": "Membuat sesuatu yang buruk, menyakitkan, atau tidak memuaskan menjadi jauh lebih baik dan tertahankan.",
    "contextSentences": [
      {
        "english": "Direct cash assistance helped to ameliorate poverty in rural regions.",
        "indonesian": "Bantuan tunai langsung membantu meringankan kemiskinan di daerah pedesaan.",
        "clozeEnglish": "Direct cash assistance helped to ________ poverty in rural regions."
      }
    ],
    "stageId": 2,
    "stageTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik",
    "clusterId": 2,
    "clusterTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": "w2-galvanize",
    "word": "galvanize",
    "phonetic": "/ˈɡæl.və.naɪz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menggerakkan / Memantik Aksi",
    "definition": "Mengejutkan atau menyemangati seseorang atau masyarakat luas sehingga segera mengambil tindakan nyata.",
    "contextSentences": [
      {
        "english": "The investigative documentary served to galvanize public opinion against chemical dumping.",
        "indonesian": "Dokumenter investigasi tersebut berhasil menggerakkan opini publik untuk menolak pembuangan limbah kimia.",
        "clozeEnglish": "The investigative documentary served to ________ public opinion against chemical dumping."
      }
    ],
    "stageId": 2,
    "stageTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik",
    "clusterId": 2,
    "clusterTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": "w2-repudiate",
    "word": "repudiate",
    "phonetic": "/rɪˈpjuː.di.eɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menolak keras / Mengingkari",
    "definition": "Menolak untuk menerima, mengakui, atau diasosiasikan dengan suatu klaim, teori, atau perjanjian secara tegas.",
    "contextSentences": [
      {
        "english": "The laboratory issued a statement to repudiate the falsified research findings.",
        "indonesian": "Laboratorium mengeluarkan pernyataan tegas untuk menolak temuan penelitian yang dipalsukan.",
        "clozeEnglish": "The laboratory issued a statement to ________ the falsified research findings."
      }
    ],
    "stageId": 2,
    "stageTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik",
    "clusterId": 2,
    "clusterTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": "w2-truncate",
    "word": "truncate",
    "phonetic": "/trʌŋˈkeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memotong / Mempersingkat",
    "definition": "Mempersingkat atau memotong ujung sesuatu (seperti teks, waktu, atau data) sehingga menjadi tidak utuh.",
    "contextSentences": [
      {
        "english": "Due to time limits, the moderator had to truncate the debate session.",
        "indonesian": "Karena keterbatasan waktu, moderator harus mempersingkat sesi debat.",
        "clozeEnglish": "Due to time limits, the moderator had to ________ the debate session."
      }
    ],
    "stageId": 2,
    "stageTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik",
    "clusterId": 2,
    "clusterTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": "w2-vacillate",
    "word": "vacillate",
    "phonetic": "/ˈvæs.ɪ.leɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Ragu-ragu / Terombang-ambing",
    "definition": "Bimbang atau terus berganti-ganti pendapat, perasaan, atau keputusan tanpa ketetapan hati.",
    "contextSentences": [
      {
        "english": "The committee began to vacillate between approving the loan or demanding more collateral.",
        "indonesian": "Komite mulai terombang-ambing antara menyetujui pinjaman atau meminta agunan tambahan.",
        "clozeEnglish": "The committee began to ________ between approving the loan or demanding more collateral."
      }
    ],
    "stageId": 2,
    "stageTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik",
    "clusterId": 2,
    "clusterTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": "w2-vindicate",
    "word": "vindicate",
    "phonetic": "/ˈvɪn.dɪ.keɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membenarkan / Membersihkan nama",
    "definition": "Membuktikan bahwa seseorang atau suatu tindakan itu benar, adil, atau bebas dari kesalahan setelah dicurigai.",
    "contextSentences": [
      {
        "english": "Subsequent DNA evidence helped to vindicate the wrongly accused defendant.",
        "indonesian": "Bukti DNA berikutnya berhasil membersihkan nama terdakwa yang dituduh secara keliru.",
        "clozeEnglish": "Subsequent DNA evidence helped to ________ the wrongly accused defendant."
      }
    ],
    "stageId": 2,
    "stageTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik",
    "clusterId": 2,
    "clusterTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": "w2-extrapolate",
    "word": "extrapolate",
    "phonetic": "/ɪkˈstræp.ə.leɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengekstrapolasi / Memperkirakan",
    "definition": "Memperkirakan atau memproyeksikan tren masa depan berdasarkan fakta, data, atau tren yang sudah diketahui saat ini.",
    "contextSentences": [
      {
        "english": "We can extrapolate future sales based on the fourth-quarter consumer trend.",
        "indonesian": "Kita dapat memperkirakan penjualan masa depan berdasarkan tren konsumen kuartal keempat.",
        "clozeEnglish": "We can ________ future sales based on the fourth-quarter consumer trend."
      }
    ],
    "stageId": 2,
    "stageTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik",
    "clusterId": 2,
    "clusterTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": "w2-delineate",
    "word": "delineate",
    "phonetic": "/dɪˈlɪn.i.eɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menggambarkan rinci / Membatasi batas",
    "definition": "Menjelaskan, mendeskripsikan, atau menetapkan batasan sesuatu secara sangat terperinci dan presisi.",
    "contextSentences": [
      {
        "english": "The contract must clearly delineate the rights and obligations of both parties.",
        "indonesian": "Kontrak tersebut harus secara jelas menggambarkan hak dan kewajiban kedua belah pihak.",
        "clozeEnglish": "The contract must clearly ________ the rights and obligations of both parties."
      }
    ],
    "stageId": 2,
    "stageTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik",
    "clusterId": 2,
    "clusterTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": "w2-scrutinize",
    "word": "scrutinize",
    "phonetic": "/ˈskruː.tɪ.naɪz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Meneliti cermat / Memeriksa saksama",
    "definition": "Memeriksa atau meneliti seseorang atau dokumen secara sangat teliti, kritis, dan mendalam.",
    "contextSentences": [
      {
        "english": "Regulators will scrutinize every ledger entry to trace the missing funds.",
        "indonesian": "Regulator akan meneliti setiap entri buku besar untuk melacak dana yang hilang.",
        "clozeEnglish": "Regulators will ________ every ledger entry to trace the missing funds."
      }
    ],
    "stageId": 2,
    "stageTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik",
    "clusterId": 2,
    "clusterTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": "w2-corroborate",
    "word": "corroborate",
    "phonetic": "/kəˈrɒb.ə.reɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menguatkan bukti / Mengonfirmasi",
    "definition": "Menyediakan informasi atau bukti baru yang memperkuat atau mendukung kebenaran suatu teori, pernyataan, atau temuan.",
    "contextSentences": [
      {
        "english": "Independent laboratory tests helped to corroborate the researchers' initial findings.",
        "indonesian": "Uji laboratorium independen membantu menguatkan bukti temuan awal para peneliti.",
        "clozeEnglish": "Independent laboratory tests helped to ________ the researchers' initial findings."
      }
    ],
    "stageId": 2,
    "stageTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik",
    "clusterId": 2,
    "clusterTitle": "Stage 02: Aksi, Dinamika & Transformasi Sistemik"
  },
  {
    "id": "w3-articulate",
    "word": "articulate",
    "phonetic": "/ɑːˈtɪk.jə.leɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menyatakan jelas / Mengartikulasikan",
    "definition": "Mengungkapkan ide, pikiran, atau argumen dengan sangat jelas dan fasih menggunakan kata-kata yang tepat.",
    "contextSentences": [
      {
        "english": "She was able to articulate the complex scientific theory in terms anyone could understand.",
        "indonesian": "Ia mampu menyatakan teori ilmiah yang rumit dengan sangat jelas sehingga bisa dipahami siapa saja.",
        "clozeEnglish": "She was able to ________ the complex scientific theory in terms anyone could understand."
      }
    ],
    "stageId": 3,
    "stageTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi",
    "clusterId": 3,
    "clusterTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": "w3-mitigate",
    "word": "mitigate",
    "phonetic": "/ˈmɪt.ɪ.ɡeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Meringankan / Meredam bahaya",
    "definition": "Membuat sesuatu menjadi tidak terlalu parah, berbahaya, atau merusak.",
    "contextSentences": [
      {
        "english": "Planting mangroves along the coast will help mitigate coastal erosion.",
        "indonesian": "Menanam bakau di sepanjang pantai akan membantu meredam erosi pantai.",
        "clozeEnglish": "Planting mangroves along the coast will help ________ coastal erosion."
      }
    ],
    "stageId": 3,
    "stageTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi",
    "clusterId": 3,
    "clusterTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": "w3-proliferate",
    "word": "proliferate",
    "phonetic": "/prəˈlɪf.ər.eɪt/",
    "partOfSpeech": "verb",
    "cefr": "C2",
    "translation": "Menjamur / Berkembang biak pesat",
    "definition": "Meningkat dalam jumlah atau menyebar dengan sangat cepat dalam waktu singkat.",
    "contextSentences": [
      {
        "english": "Digital payment platforms began to proliferate across emerging economies.",
        "indonesian": "Platform pembayaran digital mulai menjamur dan berkembang pesat di seluruh negara berkembang.",
        "clozeEnglish": "Digital payment platforms began to ________ across emerging economies."
      }
    ],
    "stageId": 3,
    "stageTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi",
    "clusterId": 3,
    "clusterTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": "w3-substantiate",
    "word": "substantiate",
    "phonetic": "/səbˈstæn.ʃi.eɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membuktikan kebenaran / Mengabsahkan",
    "definition": "Menyediakan fakta atau bukti yang cukup untuk membuktikan kebenaran suatu klaim.",
    "contextSentences": [
      {
        "english": "The plaintiff could not substantiate his claims of intellectual property theft.",
        "indonesian": "Penggugat tidak dapat membuktikan kebenaran klaimnya terkait pencurian kekayaan intelektual.",
        "clozeEnglish": "The plaintiff could not ________ his claims of intellectual property theft."
      }
    ],
    "stageId": 3,
    "stageTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi",
    "clusterId": 3,
    "clusterTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": "w3-elucidate",
    "word": "elucidate",
    "phonetic": "/iˈluː.sɪ.deɪt/",
    "partOfSpeech": "verb",
    "cefr": "C2",
    "translation": "Menerangkan lugas / Memperjelas",
    "definition": "Menjelaskan atau menerangkan sesuatu secara mendalam sehingga menjadi terang benderang dan mudah dimengerti.",
    "contextSentences": [
      {
        "english": "The keynote speaker attempted to elucidate the ethical dilemmas of artificial intelligence.",
        "indonesian": "Pembicara utama berusaha menerangkan lugas dilema etika dari kecerdasan buatan.",
        "clozeEnglish": "The keynote speaker attempted to ________ the ethical dilemmas of artificial intelligence."
      }
    ],
    "stageId": 3,
    "stageTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi",
    "clusterId": 3,
    "clusterTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": "w3-pragmatic",
    "word": "pragmatic",
    "phonetic": "/præɡˈmæt.ɪk/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Praktis / Berorientasi hasil nyata",
    "definition": "Menyelesaikan masalah secara bijak, realistis, dan berorientasi pada hasil nyata daripada teori semata.",
    "contextSentences": [
      {
        "english": "We need a pragmatic approach to renewable energy transition rather than idealistic slogans.",
        "indonesian": "Kita memerlukan pendekatan praktis dan realistis terhadap transisi energi terbarukan daripada sekadar slogan idealis.",
        "clozeEnglish": "We need a ________ approach to renewable energy transition rather than idealistic slogans."
      }
    ],
    "stageId": 3,
    "stageTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi",
    "clusterId": 3,
    "clusterTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": "w3-tenuous",
    "word": "tenuous",
    "phonetic": "/ˈten.ju.əs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Sangat lemah / Renggang / Tipis",
    "definition": "Sangat rapuh, lemah, tipis, atau tidak pasti sehingga mudah runtuh atau diragukan kebenarannya.",
    "contextSentences": [
      {
        "english": "The link between the two events was tenuous at best.",
        "indonesian": "Kaitan antara kedua peristiwa tersebut sangatlah lemah dan meragukan.",
        "clozeEnglish": "The link between the two events was ________ at best."
      }
    ],
    "stageId": 3,
    "stageTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi",
    "clusterId": 3,
    "clusterTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": "w3-meticulous",
    "word": "meticulous",
    "phonetic": "/məˈtɪk.jə.ləs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Sangat teliti / Cermat mendalam",
    "definition": "Memperhatikan setiap detail kecil secara sangat cermat, hati-hati, dan presisi tinggi.",
    "contextSentences": [
      {
        "english": "Her meticulous research methodology earned unanimous praise from peer reviewers.",
        "indonesian": "Metodologi penelitiannya yang sangat teliti mendapat pujian bulat dari para peninjau sejawat.",
        "clozeEnglish": "Her ________ research methodology earned unanimous praise from peer reviewers."
      }
    ],
    "stageId": 3,
    "stageTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi",
    "clusterId": 3,
    "clusterTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": "w3-superfluous",
    "word": "superfluous",
    "phonetic": "/suːˈpɜː.flu.əs/",
    "partOfSpeech": "adjective",
    "cefr": "C2",
    "translation": "Berlebihan / Tidak diperlukan",
    "definition": "Lebih banyak dari yang dibutuhkan atau diperlukan; mubazir sehingga pantas disingkirkan.",
    "contextSentences": [
      {
        "english": "The editor trimmed superfluous paragraphs to enhance the article's pacing.",
        "indonesian": "Editor memangkas paragraf yang berlebihan dan tidak diperlukan untuk mempercepat tempo artikel.",
        "clozeEnglish": "The editor trimmed ________ paragraphs to enhance the article's pacing."
      }
    ],
    "stageId": 3,
    "stageTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi",
    "clusterId": 3,
    "clusterTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": "w3-fastidious",
    "word": "fastidious",
    "phonetic": "/fæsˈtɪd.i.əs/",
    "partOfSpeech": "adjective",
    "cefr": "C2",
    "translation": "Sangat rewel / Menuntut kesempurnaan",
    "definition": "Sangat peduli terhadap kerapian, kesempurnaan, atau ketepatan detail dan sulit sekali dibuat puas.",
    "contextSentences": [
      {
        "english": "The chef was fastidious about the temperature and presentation of each dish.",
        "indonesian": "Sang koki sangat rewel dan menuntut kesempurnaan atas suhu dan penyajian setiap hidangan.",
        "clozeEnglish": "The chef was ________ about the temperature and presentation of each dish."
      }
    ],
    "stageId": 3,
    "stageTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi",
    "clusterId": 3,
    "clusterTitle": "Stage 03: Investigasi, Penalaran & Klarifikasi"
  },
  {
    "id": "w4-abandon",
    "word": "abandon",
    "phonetic": "/əˈbæn.dən/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Meninggalkan / Menghentikan",
    "definition": "Meninggalkan atau menghentikan sesuatu, sering kali karena tidak dapat atau tidak ingin melanjutkannya.",
    "contextSentences": [
      {
        "english": "After reviewing the losses, the company had to abandon its expansion plan.",
        "indonesian": "Setelah meninjau kerugian, perusahaan terpaksa membatalkan rencana ekspansinya.",
        "clozeEnglish": "After reviewing the losses, the company had to ________ its expansion plan."
      }
    ],
    "stageId": 4,
    "stageTitle": "Stage 04: Master Lexicon 04",
    "clusterId": 4,
    "clusterTitle": "Stage 04: Master Lexicon 04"
  },
  {
    "id": "w4-abolish",
    "word": "abolish",
    "phonetic": "/əˈbɑ.lɪʃ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menghapuskan / Meniadakan",
    "definition": "Menghapuskan secara resmi suatu hukum, sistem, kebiasaan, atau praktik.",
    "contextSentences": [
      {
        "english": "The government plans to abolish the outdated reporting requirement.",
        "indonesian": "Pemerintah berencana menghapus persyaratan pelaporan yang sudah usang.",
        "clozeEnglish": "The government plans to ________ the outdated reporting requirement."
      }
    ],
    "stageId": 4,
    "stageTitle": "Stage 04: Master Lexicon 04",
    "clusterId": 4,
    "clusterTitle": "Stage 04: Master Lexicon 04"
  },
  {
    "id": "w4-absolute",
    "word": "absolute",
    "phonetic": "/ˈæb.səˌlut/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Mutlak / Absolut",
    "definition": "Mutlak atau sepenuhnya; tidak dibatasi oleh pengecualian.",
    "contextSentences": [
      {
        "english": "The director demanded absolute accuracy in the final report.",
        "indonesian": "Direktur menuntut akurasi mutlak dalam laporan akhir.",
        "clozeEnglish": "The director demanded ________ accuracy in the final report."
      }
    ],
    "stageId": 4,
    "stageTitle": "Stage 04: Master Lexicon 04",
    "clusterId": 4,
    "clusterTitle": "Stage 04: Master Lexicon 04"
  },
  {
    "id": "w4-abstain",
    "word": "abstain",
    "phonetic": "/əbˈsteɪn/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menahan diri / Tidak memilih",
    "definition": "Menahan diri untuk tidak melakukan sesuatu; dalam voting berarti tidak memberikan suara.",
    "contextSentences": [
      {
        "english": "The director chose to abstain from the vote because of a conflict of interest.",
        "indonesian": "Direktur memilih untuk tidak memberikan suara karena adanya konflik kepentingan.",
        "clozeEnglish": "The director chose to ________ from the vote because of a conflict of interest."
      }
    ],
    "stageId": 4,
    "stageTitle": "Stage 04: Master Lexicon 04",
    "clusterId": 4,
    "clusterTitle": "Stage 04: Master Lexicon 04"
  },
  {
    "id": "w4-abundant",
    "word": "abundant",
    "phonetic": "/əˈbʌn.dənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Berlimpah / Melimpah",
    "definition": "Berlimpah atau tersedia dalam jumlah besar.",
    "contextSentences": [
      {
        "english": "The region has abundant resources for renewable-energy development.",
        "indonesian": "Wilayah tersebut memiliki sumber daya yang melimpah untuk pengembangan energi terbarukan.",
        "clozeEnglish": "The region has ________ resources for renewable-energy development."
      }
    ],
    "stageId": 4,
    "stageTitle": "Stage 04: Master Lexicon 04",
    "clusterId": 4,
    "clusterTitle": "Stage 04: Master Lexicon 04"
  },
  {
    "id": "w4-academic",
    "word": "academic",
    "phonetic": "/ˌæ.kəˈdɛ.mɪk/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Akademis / Ilmiah",
    "definition": "Berkaitan dengan pendidikan, kegiatan belajar, atau dunia akademis.",
    "contextSentences": [
      {
        "english": "The researcher published an academic article on data governance.",
        "indonesian": "Peneliti tersebut menerbitkan artikel akademis tentang tata kelola data.",
        "clozeEnglish": "The researcher published an ________ article on data governance."
      }
    ],
    "stageId": 4,
    "stageTitle": "Stage 04: Master Lexicon 04",
    "clusterId": 4,
    "clusterTitle": "Stage 04: Master Lexicon 04"
  },
  {
    "id": "w4-acceptable",
    "word": "acceptable",
    "phonetic": "/ækˈsɛp.tə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Dapat Diterima / Layak",
    "definition": "Dapat diterima karena memenuhi standar atau persyaratan.",
    "contextSentences": [
      {
        "english": "The revised terms were acceptable to both parties.",
        "indonesian": "Ketentuan yang telah direvisi dapat diterima oleh kedua pihak.",
        "clozeEnglish": "The revised terms were ________ to both parties."
      }
    ],
    "stageId": 4,
    "stageTitle": "Stage 04: Master Lexicon 04",
    "clusterId": 4,
    "clusterTitle": "Stage 04: Master Lexicon 04"
  },
  {
    "id": "w4-accommodate",
    "word": "accommodate",
    "phonetic": "/əˈkɑ.məˌdeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menampung / Menyesuaikan",
    "definition": "Menyediakan ruang/kebutuhan bagi seseorang atau menyesuaikan sesuatu agar sesuai.",
    "contextSentences": [
      {
        "english": "The platform can accommodate a large number of users during peak hours.",
        "indonesian": "Platform tersebut dapat menampung banyak pengguna pada jam sibuk.",
        "clozeEnglish": "The platform can ________ a large number of users during peak hours."
      }
    ],
    "stageId": 4,
    "stageTitle": "Stage 04: Master Lexicon 04",
    "clusterId": 4,
    "clusterTitle": "Stage 04: Master Lexicon 04"
  },
  {
    "id": "w4-accomplish",
    "word": "accomplish",
    "phonetic": "/əˈkɑm.plɪʃ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menyelesaikan / Mencapai",
    "definition": "Berhasil menyelesaikan tugas atau mencapai tujuan.",
    "contextSentences": [
      {
        "english": "The team hopes to accomplish all project objectives before the deadline.",
        "indonesian": "Tim tersebut berharap dapat menyelesaikan seluruh sasaran proyek sebelum tenggat waktu.",
        "clozeEnglish": "The team hopes to ________ all project objectives before the deadline."
      }
    ],
    "stageId": 4,
    "stageTitle": "Stage 04: Master Lexicon 04",
    "clusterId": 4,
    "clusterTitle": "Stage 04: Master Lexicon 04"
  },
  {
    "id": "w4-accomplishment",
    "word": "accomplishment",
    "phonetic": "/əˈkɑm.plɪʃ.mənt/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Pencapaian / Prestasi",
    "definition": "Pencapaian atau keberhasilan menyelesaikan sesuatu.",
    "contextSentences": [
      {
        "english": "Reaching the target was a major accomplishment for the entire team.",
        "indonesian": "Mencapai target tersebut merupakan pencapaian besar bagi seluruh tim.",
        "clozeEnglish": "Reaching the target was a major ________ for the entire team."
      }
    ],
    "stageId": 4,
    "stageTitle": "Stage 04: Master Lexicon 04",
    "clusterId": 4,
    "clusterTitle": "Stage 04: Master Lexicon 04"
  },
  {
    "id": "w5-accountable",
    "word": "accountable",
    "phonetic": "/əˈkaʊn.tə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Bertanggung jawab / Akuntabel",
    "definition": "Harus bertanggung jawab dan dapat dimintai penjelasan atas tindakan atau hasil.",
    "contextSentences": [
      {
        "english": "Department heads are accountable for meeting the targets approved by the board.",
        "indonesian": "Kepala departemen bertanggung jawab untuk memenuhi target yang telah disetujui direksi.",
        "clozeEnglish": "Department heads are ________ for meeting the targets approved by the board."
      }
    ],
    "stageId": 5,
    "stageTitle": "Stage 05: Master Lexicon 05",
    "clusterId": 5,
    "clusterTitle": "Stage 05: Master Lexicon 05"
  },
  {
    "id": "w5-accurate",
    "word": "accurate",
    "phonetic": "/ˈæ.kjɚ.ət/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Akurat / Tepat",
    "definition": "Tepat dan bebas dari kesalahan.",
    "contextSentences": [
      {
        "english": "The report gives an accurate account of the trial results.",
        "indonesian": "Laporan tersebut memberikan uraian yang akurat mengenai hasil uji coba.",
        "clozeEnglish": "The report gives an ________ account of the trial results."
      }
    ],
    "stageId": 5,
    "stageTitle": "Stage 05: Master Lexicon 05",
    "clusterId": 5,
    "clusterTitle": "Stage 05: Master Lexicon 05"
  },
  {
    "id": "w5-achieve",
    "word": "achieve",
    "phonetic": "/əˈtʃiv/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mencapai / Meraih",
    "definition": "Mencapai tujuan atau hasil melalui usaha.",
    "contextSentences": [
      {
        "english": "The company aims to achieve a ten-percent reduction in operating costs.",
        "indonesian": "Perusahaan bertujuan mencapai pengurangan biaya operasional sebesar sepuluh persen.",
        "clozeEnglish": "The company aims to ________ a ten-percent reduction in operating costs."
      }
    ],
    "stageId": 5,
    "stageTitle": "Stage 05: Master Lexicon 05",
    "clusterId": 5,
    "clusterTitle": "Stage 05: Master Lexicon 05"
  },
  {
    "id": "w5-acknowledge",
    "word": "acknowledge",
    "phonetic": "/ækˈnɑ.lɪdʒ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengakui / Menyadari",
    "definition": "Mengakui, menyadari, atau memberikan pengakuan atas sesuatu.",
    "contextSentences": [
      {
        "english": "The report should acknowledge the limitations of the available dataset.",
        "indonesian": "Laporan tersebut harus mengakui keterbatasan kumpulan data yang tersedia.",
        "clozeEnglish": "The report should ________ the limitations of the available dataset."
      }
    ],
    "stageId": 5,
    "stageTitle": "Stage 05: Master Lexicon 05",
    "clusterId": 5,
    "clusterTitle": "Stage 05: Master Lexicon 05"
  },
  {
    "id": "w5-acquaint",
    "word": "acquaint",
    "phonetic": "/əˈkweɪnt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengenalkan / Memperkenalkan",
    "definition": "Membuat seseorang mengenal atau memahami sesuatu; sering dalam pola acquaint yourself with.",
    "contextSentences": [
      {
        "english": "The onboarding session will acquaint new employees with the company's procedures.",
        "indonesian": "Sesi orientasi akan mengenalkan prosedur perusahaan kepada karyawan baru.",
        "clozeEnglish": "The onboarding session will ________ new employees with the company's procedures."
      }
    ],
    "stageId": 5,
    "stageTitle": "Stage 05: Master Lexicon 05",
    "clusterId": 5,
    "clusterTitle": "Stage 05: Master Lexicon 05"
  },
  {
    "id": "w5-acquire",
    "word": "acquire",
    "phonetic": "/əˈkwaɪ.ɚ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memperoleh / Mendapatkan",
    "definition": "Memperoleh atau mendapatkan sesuatu, termasuk pengetahuan dan keterampilan.",
    "contextSentences": [
      {
        "english": "The research team needs to acquire reliable data before testing the hypothesis.",
        "indonesian": "Tim riset perlu memperoleh data yang andal sebelum menguji hipotesis.",
        "clozeEnglish": "The research team needs to ________ reliable data before testing the hypothesis."
      }
    ],
    "stageId": 5,
    "stageTitle": "Stage 05: Master Lexicon 05",
    "clusterId": 5,
    "clusterTitle": "Stage 05: Master Lexicon 05"
  },
  {
    "id": "w5-acumen",
    "word": "acumen",
    "phonetic": "/əˈkju.mən/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Ketajaman / Kecerdasan",
    "definition": "Ketajaman penilaian dan kemampuan mengambil keputusan, khususnya dalam bisnis.",
    "contextSentences": [
      {
        "english": "Her business acumen helped the company identify promising investment opportunities.",
        "indonesian": "Ketajaman bisnisnya membantu perusahaan mengidentifikasi peluang investasi yang menjanjikan.",
        "clozeEnglish": "Her business ________ helped the company identify promising investment opportunities."
      }
    ],
    "stageId": 5,
    "stageTitle": "Stage 05: Master Lexicon 05",
    "clusterId": 5,
    "clusterTitle": "Stage 05: Master Lexicon 05"
  },
  {
    "id": "w5-adapt",
    "word": "adapt",
    "phonetic": "/əˈdæpt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Beradaptasi / Menyesuaikan",
    "definition": "Menyesuaikan diri atau mengubah sesuatu agar cocok dengan kondisi baru.",
    "contextSentences": [
      {
        "english": "The organization must adapt its strategy to changing market conditions.",
        "indonesian": "Organisasi tersebut harus menyesuaikan strateginya dengan kondisi pasar yang berubah.",
        "clozeEnglish": "The organization must ________ its strategy to changing market conditions."
      }
    ],
    "stageId": 5,
    "stageTitle": "Stage 05: Master Lexicon 05",
    "clusterId": 5,
    "clusterTitle": "Stage 05: Master Lexicon 05"
  },
  {
    "id": "w5-adaptable",
    "word": "adaptable",
    "phonetic": "/əˈdæp.tə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Adaptif / Fleksibel",
    "definition": "Mudah menyesuaikan diri terhadap perubahan atau situasi baru.",
    "contextSentences": [
      {
        "english": "An adaptable employee can respond effectively when project priorities change.",
        "indonesian": "Karyawan yang mudah beradaptasi dapat merespons dengan efektif ketika prioritas proyek berubah.",
        "clozeEnglish": "An ________ employee can respond effectively when project priorities change."
      }
    ],
    "stageId": 5,
    "stageTitle": "Stage 05: Master Lexicon 05",
    "clusterId": 5,
    "clusterTitle": "Stage 05: Master Lexicon 05"
  },
  {
    "id": "w5-adequate",
    "word": "adequate",
    "phonetic": "/ˈæ.də.kwət/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Memadai / Cukup",
    "definition": "Memadai atau cukup untuk memenuhi kebutuhan tertentu.",
    "contextSentences": [
      {
        "english": "The committee considered the proposal adequate after reviewing all available evidence.",
        "indonesian": "Komite menilai proposal tersebut memadai setelah meninjau seluruh bukti yang tersedia.",
        "clozeEnglish": "The committee considered the proposal ________ after reviewing all available evidence."
      }
    ],
    "stageId": 5,
    "stageTitle": "Stage 05: Master Lexicon 05",
    "clusterId": 5,
    "clusterTitle": "Stage 05: Master Lexicon 05"
  },
  {
    "id": "w6-adhere",
    "word": "adhere",
    "phonetic": "/ədˈhɪɹ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mematuhi / Melekat",
    "definition": "Mematuhi aturan/prinsip; juga berarti melekat pada permukaan.",
    "contextSentences": [
      {
        "english": "All departments must adhere to the revised data-governance policy.",
        "indonesian": "Semua departemen harus mematuhi kebijakan tata kelola data yang telah direvisi.",
        "clozeEnglish": "All departments must ________ to the revised data-governance policy."
      }
    ],
    "stageId": 6,
    "stageTitle": "Stage 06: Master Lexicon 06",
    "clusterId": 6,
    "clusterTitle": "Stage 06: Master Lexicon 06"
  },
  {
    "id": "w6-adjacent",
    "word": "adjacent",
    "phonetic": "/əˈdʒeɪ.sənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Bersebelahan / Berdekatan",
    "definition": "Bersebelahan atau berdekatan langsung.",
    "contextSentences": [
      {
        "english": "The archive is adjacent to the main research building.",
        "indonesian": "Arsip tersebut berada bersebelahan dengan gedung penelitian utama.",
        "clozeEnglish": "The archive is ________ to the main research building."
      }
    ],
    "stageId": 6,
    "stageTitle": "Stage 06: Master Lexicon 06",
    "clusterId": 6,
    "clusterTitle": "Stage 06: Master Lexicon 06"
  },
  {
    "id": "w6-adjust",
    "word": "adjust",
    "phonetic": "/əˈdʒʌst/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menyesuaikan / Mengatur",
    "definition": "Mengubah sedikit agar lebih tepat atau sesuai.",
    "contextSentences": [
      {
        "english": "The analyst adjusted the model to reflect the latest data.",
        "indonesian": "Analis menyesuaikan model tersebut agar mencerminkan data terbaru.",
        "clozeEnglish": "The analyst ________ed the model to reflect the latest data."
      }
    ],
    "stageId": 6,
    "stageTitle": "Stage 06: Master Lexicon 06",
    "clusterId": 6,
    "clusterTitle": "Stage 06: Master Lexicon 06"
  },
  {
    "id": "w6-administer",
    "word": "administer",
    "phonetic": "/ədˈmɪ.nə.stɚ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengelola / Mengurus",
    "definition": "Mengelola sesuatu secara resmi; juga memberikan obat atau tindakan.",
    "contextSentences": [
      {
        "english": "The research team will administer the survey to 500 participants.",
        "indonesian": "Tim riset akan memberikan survei kepada 500 peserta.",
        "clozeEnglish": "The research team will ________ the survey to 500 participants."
      }
    ],
    "stageId": 6,
    "stageTitle": "Stage 06: Master Lexicon 06",
    "clusterId": 6,
    "clusterTitle": "Stage 06: Master Lexicon 06"
  },
  {
    "id": "w6-adopt",
    "word": "adopt",
    "phonetic": "/əˈdɑpt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengadopsi / Menerapkan",
    "definition": "Mengadopsi anak atau mulai menggunakan suatu metode, kebijakan, atau pendekatan.",
    "contextSentences": [
      {
        "english": "The board decided to adopt the revised policy next quarter.",
        "indonesian": "Dewan memutuskan untuk menerapkan kebijakan yang telah direvisi pada kuartal berikutnya.",
        "clozeEnglish": "The board decided to ________ the revised policy next quarter."
      }
    ],
    "stageId": 6,
    "stageTitle": "Stage 06: Master Lexicon 06",
    "clusterId": 6,
    "clusterTitle": "Stage 06: Master Lexicon 06"
  },
  {
    "id": "w6-advance",
    "word": "advance",
    "phonetic": "/ədˈvæns/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memajukan / Berkembang",
    "definition": "Memajukan, bergerak maju, atau berkembang.",
    "contextSentences": [
      {
        "english": "The research may advance our understanding of the issue.",
        "indonesian": "Penelitian tersebut dapat memajukan pemahaman kita tentang persoalan itu.",
        "clozeEnglish": "The research may ________ our understanding of the issue."
      }
    ],
    "stageId": 6,
    "stageTitle": "Stage 06: Master Lexicon 06",
    "clusterId": 6,
    "clusterTitle": "Stage 06: Master Lexicon 06"
  },
  {
    "id": "w6-advantage",
    "word": "advantage",
    "phonetic": "/ædˈvæn.tɪdʒ/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Keuntungan / Manfaat",
    "definition": "Keuntungan atau kondisi yang memberi posisi lebih baik.",
    "contextSentences": [
      {
        "english": "The new platform gives the company a competitive advantage in the market.",
        "indonesian": "Platform baru tersebut memberikan keunggulan kompetitif bagi perusahaan di pasar.",
        "clozeEnglish": "The new platform gives the company a competitive ________ in the market."
      }
    ],
    "stageId": 6,
    "stageTitle": "Stage 06: Master Lexicon 06",
    "clusterId": 6,
    "clusterTitle": "Stage 06: Master Lexicon 06"
  },
  {
    "id": "w6-advantageous",
    "word": "advantageous",
    "phonetic": "/ˌæd.vənˈteɪ.dʒəs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Menguntungkan / Bermanfaat",
    "definition": "Menguntungkan atau memberi peluang/posisi yang lebih baik.",
    "contextSentences": [
      {
        "english": "Early access to the dataset gave the research team an advantageous position.",
        "indonesian": "Akses awal ke kumpulan data memberikan posisi yang menguntungkan bagi tim penelitian.",
        "clozeEnglish": "Early access to the dataset gave the research team an ________ position."
      }
    ],
    "stageId": 6,
    "stageTitle": "Stage 06: Master Lexicon 06",
    "clusterId": 6,
    "clusterTitle": "Stage 06: Master Lexicon 06"
  },
  {
    "id": "w6-adversary",
    "word": "adversary",
    "phonetic": "/ˈæd.vɚˌsɛ.ɹi/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Lawan / Penantang",
    "definition": "Lawan dalam kompetisi, konflik, atau perdebatan.",
    "contextSentences": [
      {
        "english": "The company treated its main adversary as a serious competitor during the negotiations.",
        "indonesian": "Perusahaan tersebut memperlakukan lawan utamanya sebagai pesaing serius selama negosiasi.",
        "clozeEnglish": "The company treated its main ________ as a serious competitor during the negotiations."
      }
    ],
    "stageId": 6,
    "stageTitle": "Stage 06: Master Lexicon 06",
    "clusterId": 6,
    "clusterTitle": "Stage 06: Master Lexicon 06"
  },
  {
    "id": "w6-adverse",
    "word": "adverse",
    "phonetic": "/ædˈvɝs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Buruk / Merugikan",
    "definition": "Buruk atau merugikan; sering untuk kondisi dan dampak.",
    "contextSentences": [
      {
        "english": "The organization faced adverse conditions during the transition.",
        "indonesian": "Organisasi tersebut menghadapi kondisi yang buruk selama masa peralihan.",
        "clozeEnglish": "The organization faced ________ conditions during the transition."
      }
    ],
    "stageId": 6,
    "stageTitle": "Stage 06: Master Lexicon 06",
    "clusterId": 6,
    "clusterTitle": "Stage 06: Master Lexicon 06"
  },
  {
    "id": "w7-adversity",
    "word": "adversity",
    "phonetic": "/ædˈvɝ.sɪˌti/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Kesulitan / Kemalangan",
    "definition": "Kesulitan atau keadaan berat yang harus dihadapi.",
    "contextSentences": [
      {
        "english": "The organization maintained its research program despite severe adversity.",
        "indonesian": "Organisasi tersebut mempertahankan program penelitiannya meskipun menghadapi kesulitan berat.",
        "clozeEnglish": "The organization maintained its research program despite severe ________."
      }
    ],
    "stageId": 7,
    "stageTitle": "Stage 07: Master Lexicon 07",
    "clusterId": 7,
    "clusterTitle": "Stage 07: Master Lexicon 07"
  },
  {
    "id": "w7-advocate",
    "word": "advocate",
    "phonetic": "/ˈæd.və.kət/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mendukung / Membela",
    "definition": "Mendukung atau membela gagasan/hak secara terbuka; sebagai nomina berarti pendukung/pembela.",
    "contextSentences": [
      {
        "english": "Several experts advocate stronger safeguards for personal data.",
        "indonesian": "Sejumlah pakar menganjurkan perlindungan yang lebih kuat bagi data pribadi.",
        "clozeEnglish": "Several experts ________ stronger safeguards for personal data."
      }
    ],
    "stageId": 7,
    "stageTitle": "Stage 07: Master Lexicon 07",
    "clusterId": 7,
    "clusterTitle": "Stage 07: Master Lexicon 07"
  },
  {
    "id": "w7-aesthetic",
    "word": "aesthetic",
    "phonetic": "/ɛsˈθɛ.tɪk/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Estetis / Artistik",
    "definition": "Berkaitan dengan keindahan atau nilai artistik.",
    "contextSentences": [
      {
        "english": "The redesign improved the application's aesthetic appeal.",
        "indonesian": "Desain ulang tersebut meningkatkan daya tarik estetis aplikasi.",
        "clozeEnglish": "The redesign improved the application's ________ appeal."
      }
    ],
    "stageId": 7,
    "stageTitle": "Stage 07: Master Lexicon 07",
    "clusterId": 7,
    "clusterTitle": "Stage 07: Master Lexicon 07"
  },
  {
    "id": "w7-affect",
    "word": "affect",
    "phonetic": "/əˈfɛkt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memengaruhi / Berdampak",
    "definition": "Mempengaruhi atau menimbulkan perubahan pada sesuatu.",
    "contextSentences": [
      {
        "english": "Changes in interest rates can affect long-term investment decisions.",
        "indonesian": "Perubahan suku bunga dapat memengaruhi keputusan investasi jangka panjang.",
        "clozeEnglish": "Changes in interest rates can ________ long-term investment decisions."
      }
    ],
    "stageId": 7,
    "stageTitle": "Stage 07: Master Lexicon 07",
    "clusterId": 7,
    "clusterTitle": "Stage 07: Master Lexicon 07"
  },
  {
    "id": "w7-aggregate",
    "word": "aggregate",
    "phonetic": "/ˈæ.ɡɹə.ɡət/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Gabungan / Keseluruhan",
    "definition": "Keseluruhan atau total gabungan dari beberapa bagian; sebagai verba berarti menggabungkan.",
    "contextSentences": [
      {
        "english": "The aggregate value of the transactions increased by eight percent during the quarter.",
        "indonesian": "Nilai keseluruhan transaksi meningkat sebesar delapan persen selama kuartal tersebut.",
        "clozeEnglish": "The ________ value of the transactions increased by eight percent during the quarter."
      }
    ],
    "stageId": 7,
    "stageTitle": "Stage 07: Master Lexicon 07",
    "clusterId": 7,
    "clusterTitle": "Stage 07: Master Lexicon 07"
  },
  {
    "id": "w7-aggressive",
    "word": "aggressive",
    "phonetic": "/əˈɡɹɛ.sɪv/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Agresif / Menyerang",
    "definition": "Agresif, sangat tegas, atau cenderung menyerang/menekan.",
    "contextSentences": [
      {
        "english": "The company adopted an aggressive pricing strategy to gain market share.",
        "indonesian": "Perusahaan menerapkan strategi penetapan harga yang agresif untuk merebut pangsa pasar.",
        "clozeEnglish": "The company adopted an ________ pricing strategy to gain market share."
      }
    ],
    "stageId": 7,
    "stageTitle": "Stage 07: Master Lexicon 07",
    "clusterId": 7,
    "clusterTitle": "Stage 07: Master Lexicon 07"
  },
  {
    "id": "w7-align",
    "word": "align",
    "phonetic": "/əˈlaɪn/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menyelaraskan / Meluruskan",
    "definition": "Menyelaraskan atau menempatkan sesuatu agar sejalan.",
    "contextSentences": [
      {
        "english": "The manager will align the team's objectives with the company's strategy.",
        "indonesian": "Manajer akan menyelaraskan tujuan tim dengan strategi perusahaan.",
        "clozeEnglish": "The manager will ________ the team's objectives with the company's strategy."
      }
    ],
    "stageId": 7,
    "stageTitle": "Stage 07: Master Lexicon 07",
    "clusterId": 7,
    "clusterTitle": "Stage 07: Master Lexicon 07"
  },
  {
    "id": "w7-alleviate",
    "word": "alleviate",
    "phonetic": "/əˈli.viˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Meringankan / Meredakan",
    "definition": "Meringankan rasa sakit, beban, atau dampak masalah.",
    "contextSentences": [
      {
        "english": "The revised schedule should alleviate pressure on the operations team.",
        "indonesian": "Jadwal yang telah direvisi seharusnya mengurangi tekanan pada tim operasional.",
        "clozeEnglish": "The revised schedule should ________ pressure on the operations team."
      }
    ],
    "stageId": 7,
    "stageTitle": "Stage 07: Master Lexicon 07",
    "clusterId": 7,
    "clusterTitle": "Stage 07: Master Lexicon 07"
  },
  {
    "id": "w7-allocate",
    "word": "allocate",
    "phonetic": "/ˈæ.ləˌkeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengalokasikan / Membagikan",
    "definition": "Mengalokasikan dana, waktu, atau sumber daya untuk tujuan tertentu.",
    "contextSentences": [
      {
        "english": "The board will allocate additional funds to the research program.",
        "indonesian": "Dewan akan mengalokasikan dana tambahan untuk program penelitian.",
        "clozeEnglish": "The board will ________ additional funds to the research program."
      }
    ],
    "stageId": 7,
    "stageTitle": "Stage 07: Master Lexicon 07",
    "clusterId": 7,
    "clusterTitle": "Stage 07: Master Lexicon 07"
  },
  {
    "id": "w7-alter",
    "word": "alter",
    "phonetic": "/ˈɔl.tɚ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengubah / Menyesuaikan",
    "definition": "Mengubah sesuatu, biasanya tanpa mengubah keseluruhan sifat dasarnya.",
    "contextSentences": [
      {
        "english": "The team had to alter the schedule after the supplier delay.",
        "indonesian": "Tim tersebut harus mengubah jadwal setelah pemasok mengalami keterlambatan.",
        "clozeEnglish": "The team had to ________ the schedule after the supplier delay."
      }
    ],
    "stageId": 7,
    "stageTitle": "Stage 07: Master Lexicon 07",
    "clusterId": 7,
    "clusterTitle": "Stage 07: Master Lexicon 07"
  },
  {
    "id": "w8-alternative",
    "word": "alternative",
    "phonetic": "/ɔlˈtɝ.nə.tɪv/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Alternatif / Pilihan",
    "definition": "Pilihan lain sebagai pengganti.",
    "contextSentences": [
      {
        "english": "The committee selected an alternative that reduced costs without compromising quality.",
        "indonesian": "Komite memilih alternatif yang mengurangi biaya tanpa mengorbankan kualitas.",
        "clozeEnglish": "The committee selected an ________ that reduced costs without compromising quality."
      }
    ],
    "stageId": 8,
    "stageTitle": "Stage 08: Master Lexicon 08",
    "clusterId": 8,
    "clusterTitle": "Stage 08: Master Lexicon 08"
  },
  {
    "id": "w8-altruistic",
    "word": "altruistic",
    "phonetic": "/ˌɔl.tɹuˈɪ.stɪk/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Dermawan / Tidak egois",
    "definition": "Mengutamakan kesejahteraan orang lain daripada kepentingan diri sendiri.",
    "contextSentences": [
      {
        "english": "Her altruistic decision to fund the scholarship program benefited dozens of students.",
        "indonesian": "Keputusannya yang mengutamakan kepentingan orang lain untuk mendanai program beasiswa memberi manfaat bagi puluhan siswa.",
        "clozeEnglish": "Her ________ decision to fund the scholarship program benefited dozens of students."
      }
    ],
    "stageId": 8,
    "stageTitle": "Stage 08: Master Lexicon 08",
    "clusterId": 8,
    "clusterTitle": "Stage 08: Master Lexicon 08"
  },
  {
    "id": "w8-amateur",
    "word": "amateur",
    "phonetic": "/ˈæ.məˌtɝ/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Amatir / Nonprofesional",
    "definition": "Orang yang melakukan kegiatan sebagai hobi, bukan profesi; juga berarti tidak profesional.",
    "contextSentences": [
      {
        "english": "The competition is open to every amateur who meets the entry requirements.",
        "indonesian": "Kompetisi tersebut terbuka bagi setiap peserta amatir yang memenuhi persyaratan.",
        "clozeEnglish": "The competition is open to every ________ who meets the entry requirements."
      }
    ],
    "stageId": 8,
    "stageTitle": "Stage 08: Master Lexicon 08",
    "clusterId": 8,
    "clusterTitle": "Stage 08: Master Lexicon 08"
  },
  {
    "id": "w8-ambiguous",
    "word": "ambiguous",
    "phonetic": "/æmˈbɪ.ɡju.əs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Ambigu / Bermakna Ganda",
    "definition": "Tidak jelas atau memiliki lebih dari satu kemungkinan makna.",
    "contextSentences": [
      {
        "english": "The contract contains ambiguous wording that could lead to disputes.",
        "indonesian": "Kontrak tersebut memuat susunan kata yang ambigu dan dapat menimbulkan perselisihan.",
        "clozeEnglish": "The contract contains ________ wording that could lead to disputes."
      }
    ],
    "stageId": 8,
    "stageTitle": "Stage 08: Master Lexicon 08",
    "clusterId": 8,
    "clusterTitle": "Stage 08: Master Lexicon 08"
  },
  {
    "id": "w8-ambitious",
    "word": "ambitious",
    "phonetic": "/æmˈbɪ.ʃəs/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Ambisius / Penuh Cita-cita",
    "definition": "Memiliki cita-cita besar dan dorongan kuat untuk mencapai keberhasilan.",
    "contextSentences": [
      {
        "english": "The team proposed an ambitious research agenda for the next three years.",
        "indonesian": "Tim tersebut mengusulkan agenda penelitian yang ambisius untuk tiga tahun ke depan.",
        "clozeEnglish": "The team proposed an ________ research agenda for the next three years."
      }
    ],
    "stageId": 8,
    "stageTitle": "Stage 08: Master Lexicon 08",
    "clusterId": 8,
    "clusterTitle": "Stage 08: Master Lexicon 08"
  },
  {
    "id": "w8-ambivalent",
    "word": "ambivalent",
    "phonetic": "/æmˈbɪ.və.lənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Ambivalen / Berperasaan Dua",
    "definition": "Memiliki perasaan yang bertentangan terhadap sesuatu; sekaligus tertarik dan ragu/tidak suka.",
    "contextSentences": [
      {
        "english": "Investors remained ambivalent about the merger because its benefits were uncertain.",
        "indonesian": "Para investor masih memiliki perasaan campur aduk terhadap merger tersebut karena manfaatnya belum pasti.",
        "clozeEnglish": "Investors remained ________ about the merger because its benefits were uncertain."
      }
    ],
    "stageId": 8,
    "stageTitle": "Stage 08: Master Lexicon 08",
    "clusterId": 8,
    "clusterTitle": "Stage 08: Master Lexicon 08"
  },
  {
    "id": "w8-amend",
    "word": "amend",
    "phonetic": "/əˈmɛnd/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengubah / Merevisi",
    "definition": "Mengubah atau memperbaiki dokumen, aturan, atau pernyataan secara resmi.",
    "contextSentences": [
      {
        "english": "The legal team proposed to amend the contract before signing.",
        "indonesian": "Tim hukum mengusulkan untuk mengubah kontrak sebelum ditandatangani.",
        "clozeEnglish": "The legal team proposed to ________ the contract before signing."
      }
    ],
    "stageId": 8,
    "stageTitle": "Stage 08: Master Lexicon 08",
    "clusterId": 8,
    "clusterTitle": "Stage 08: Master Lexicon 08"
  },
  {
    "id": "w8-amicable",
    "word": "amicable",
    "phonetic": "/ˈæ.mɪ.kə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Ramah / Bersahabat",
    "definition": "Ramah dan damai, tanpa permusuhan atau perselisihan.",
    "contextSentences": [
      {
        "english": "The two companies reached an amicable settlement without going to court.",
        "indonesian": "Kedua perusahaan mencapai penyelesaian secara damai tanpa harus membawa perkara ke pengadilan.",
        "clozeEnglish": "The two companies reached an ________ settlement without going to court."
      }
    ],
    "stageId": 8,
    "stageTitle": "Stage 08: Master Lexicon 08",
    "clusterId": 8,
    "clusterTitle": "Stage 08: Master Lexicon 08"
  },
  {
    "id": "w8-analyze",
    "word": "analyze",
    "phonetic": "/ˈæ.nəˌlaɪz/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menganalisis / Memeriksa",
    "definition": "Menganalisis dengan memeriksa bagian, data, atau bukti secara terperinci.",
    "contextSentences": [
      {
        "english": "Researchers analyze the data before drawing conclusions.",
        "indonesian": "Para peneliti menganalisis data sebelum menarik kesimpulan.",
        "clozeEnglish": "Researchers ________ the data before drawing conclusions."
      }
    ],
    "stageId": 8,
    "stageTitle": "Stage 08: Master Lexicon 08",
    "clusterId": 8,
    "clusterTitle": "Stage 08: Master Lexicon 08"
  },
  {
    "id": "w8-annual",
    "word": "annual",
    "phonetic": "/ˈæn.ju.əl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Tahunan / Setahun sekali",
    "definition": "Terjadi atau diterbitkan setiap tahun.",
    "contextSentences": [
      {
        "english": "The company publishes its annual performance review every January.",
        "indonesian": "Perusahaan menerbitkan tinjauan kinerja tahunannya setiap Januari.",
        "clozeEnglish": "The company publishes its ________ performance review every January."
      }
    ],
    "stageId": 8,
    "stageTitle": "Stage 08: Master Lexicon 08",
    "clusterId": 8,
    "clusterTitle": "Stage 08: Master Lexicon 08"
  },
  {
    "id": "w9-anticipate",
    "word": "anticipate",
    "phonetic": "/ænˈtɪ.səˌpeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengantisipasi / Memperkirakan",
    "definition": "Memperkirakan sesuatu yang akan terjadi dan bersiap menghadapinya.",
    "contextSentences": [
      {
        "english": "The analysts anticipate a rise in demand during the next quarter.",
        "indonesian": "Para analis memperkirakan kenaikan permintaan pada kuartal berikutnya.",
        "clozeEnglish": "The analysts ________ a rise in demand during the next quarter."
      }
    ],
    "stageId": 9,
    "stageTitle": "Stage 09: Master Lexicon 09",
    "clusterId": 9,
    "clusterTitle": "Stage 09: Master Lexicon 09"
  },
  {
    "id": "w9-apex",
    "word": "apex",
    "phonetic": "/ˈeɪˌpɛks/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Puncak / Titik tertinggi",
    "definition": "Titik atau bagian tertinggi dari sesuatu.",
    "contextSentences": [
      {
        "english": "The company reached the apex of its market influence after the merger.",
        "indonesian": "Perusahaan tersebut mencapai puncak pengaruh pasarnya setelah merger.",
        "clozeEnglish": "The company reached the ________ of its market influence after the merger."
      }
    ],
    "stageId": 9,
    "stageTitle": "Stage 09: Master Lexicon 09",
    "clusterId": 9,
    "clusterTitle": "Stage 09: Master Lexicon 09"
  },
  {
    "id": "w9-apparent",
    "word": "apparent",
    "phonetic": "/əˈpɛ.ɹənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Jelas / Nyata",
    "definition": "Jelas terlihat atau mudah dipahami dari keadaan yang ada.",
    "contextSentences": [
      {
        "english": "The cause of the discrepancy became apparent after the audit.",
        "indonesian": "Penyebab ketidaksesuaian tersebut menjadi jelas setelah audit.",
        "clozeEnglish": "The cause of the discrepancy became ________ after the audit."
      }
    ],
    "stageId": 9,
    "stageTitle": "Stage 09: Master Lexicon 09",
    "clusterId": 9,
    "clusterTitle": "Stage 09: Master Lexicon 09"
  },
  {
    "id": "w9-append",
    "word": "append",
    "phonetic": "/əˈpɛnd/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menambahkan / Melampirkan",
    "definition": "Menambahkan sesuatu pada bagian akhir dokumen atau daftar.",
    "contextSentences": [
      {
        "english": "Please append the supporting documents to the final report.",
        "indonesian": "Silakan lampirkan dokumen pendukung pada laporan akhir.",
        "clozeEnglish": "Please ________ the supporting documents to the final report."
      }
    ],
    "stageId": 9,
    "stageTitle": "Stage 09: Master Lexicon 09",
    "clusterId": 9,
    "clusterTitle": "Stage 09: Master Lexicon 09"
  },
  {
    "id": "w9-appreciate",
    "word": "appreciate",
    "phonetic": "/əˈpɹi.ʃiˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menghargai / Memahami",
    "definition": "Menghargai; juga memahami nilai atau pentingnya sesuatu.",
    "contextSentences": [
      {
        "english": "The director appreciated the team's careful analysis of the risks.",
        "indonesian": "Direktur menghargai analisis risiko yang dilakukan tim dengan cermat.",
        "clozeEnglish": "The director ________d the team's careful analysis of the risks."
      }
    ],
    "stageId": 9,
    "stageTitle": "Stage 09: Master Lexicon 09",
    "clusterId": 9,
    "clusterTitle": "Stage 09: Master Lexicon 09"
  },
  {
    "id": "w9-apprehensive",
    "word": "apprehensive",
    "phonetic": "/ˌæ.pɹɪˈhɛn.sɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Cemas / Khawatir",
    "definition": "Merasa khawatir atau cemas tentang sesuatu yang mungkin terjadi.",
    "contextSentences": [
      {
        "english": "Researchers were apprehensive about publishing the preliminary findings.",
        "indonesian": "Para peneliti merasa khawatir untuk menerbitkan temuan awal tersebut.",
        "clozeEnglish": "Researchers were ________ about publishing the preliminary findings."
      }
    ],
    "stageId": 9,
    "stageTitle": "Stage 09: Master Lexicon 09",
    "clusterId": 9,
    "clusterTitle": "Stage 09: Master Lexicon 09"
  },
  {
    "id": "w9-approach",
    "word": "approach",
    "phonetic": "/əˈpɹoʊtʃ/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Pendekatan / Cara",
    "definition": "Pendekatan/cara menangani sesuatu; sebagai verba berarti mendekati atau mulai membahas.",
    "contextSentences": [
      {
        "english": "The team adopted an approach that balanced cost, speed, and reliability.",
        "indonesian": "Tim tersebut menerapkan pendekatan yang menyeimbangkan biaya, kecepatan, dan keandalan.",
        "clozeEnglish": "The team adopted an ________ that balanced cost, speed, and reliability."
      }
    ],
    "stageId": 9,
    "stageTitle": "Stage 09: Master Lexicon 09",
    "clusterId": 9,
    "clusterTitle": "Stage 09: Master Lexicon 09"
  },
  {
    "id": "w9-appropriate",
    "word": "appropriate",
    "phonetic": "/əˈpɹoʊ.pɹi.ət/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Sesuai / Pantas",
    "definition": "Sesuai atau pantas untuk situasi tertentu.",
    "contextSentences": [
      {
        "english": "The committee selected an appropriate method for the evaluation.",
        "indonesian": "Komite memilih metode yang sesuai untuk evaluasi tersebut.",
        "clozeEnglish": "The committee selected an ________ method for the evaluation."
      }
    ],
    "stageId": 9,
    "stageTitle": "Stage 09: Master Lexicon 09",
    "clusterId": 9,
    "clusterTitle": "Stage 09: Master Lexicon 09"
  },
  {
    "id": "w9-approximate",
    "word": "approximate",
    "phonetic": "/əˈpɹɑk.sə.mət/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Perkiraan / Mendekati",
    "definition": "Perkiraan yang mendekati nilai sebenarnya, tetapi tidak persis.",
    "contextSentences": [
      {
        "english": "The analyst provided an approximate estimate of the project's total cost.",
        "indonesian": "Analis memberikan perkiraan biaya total proyek tersebut.",
        "clozeEnglish": "The analyst provided an ________ estimate of the project's total cost."
      }
    ],
    "stageId": 9,
    "stageTitle": "Stage 09: Master Lexicon 09",
    "clusterId": 9,
    "clusterTitle": "Stage 09: Master Lexicon 09"
  },
  {
    "id": "w9-aptitude",
    "word": "aptitude",
    "phonetic": "/ˈæp.təˌtud/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Bakat / Kecakapan",
    "definition": "Bakat atau kemampuan alami untuk mempelajari/melakukan sesuatu.",
    "contextSentences": [
      {
        "english": "The candidate's aptitude for quantitative analysis made her a strong fit for the role.",
        "indonesian": "Bakat kandidat tersebut dalam analisis kuantitatif membuatnya sangat cocok untuk posisi itu.",
        "clozeEnglish": "The candidate's ________ for quantitative analysis made her a strong fit for the role."
      }
    ],
    "stageId": 9,
    "stageTitle": "Stage 09: Master Lexicon 09",
    "clusterId": 9,
    "clusterTitle": "Stage 09: Master Lexicon 09"
  },
  {
    "id": "w10-arbitrary",
    "word": "arbitrary",
    "phonetic": "/ˈɑɹ.bəˌtɹɛ.ɹi/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Sewenang-wenang / Sembarangan",
    "definition": "Ditentukan secara sewenang-wenang atau tanpa alasan/prinsip yang jelas.",
    "contextSentences": [
      {
        "english": "The committee considered the proposal arbitrary after reviewing all available evidence.",
        "indonesian": "Komite menilai proposal tersebut sewenang-wenang setelah meninjau seluruh bukti yang tersedia.",
        "clozeEnglish": "The committee considered the proposal ________ after reviewing all available evidence."
      }
    ],
    "stageId": 10,
    "stageTitle": "Stage 10: Master Lexicon 10",
    "clusterId": 10,
    "clusterTitle": "Stage 10: Master Lexicon 10"
  },
  {
    "id": "w10-arrogant",
    "word": "arrogant",
    "phonetic": "/ˈɛ.ɹə.ɡənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Sombong / Angkuh",
    "definition": "Sombong dan merasa diri lebih penting/unggul daripada orang lain.",
    "contextSentences": [
      {
        "english": "The arrogant executive dismissed feedback from experienced colleagues.",
        "indonesian": "Eksekutif yang sombong itu mengabaikan masukan dari rekan-rekan yang berpengalaman.",
        "clozeEnglish": "The ________ executive dismissed feedback from experienced colleagues."
      }
    ],
    "stageId": 10,
    "stageTitle": "Stage 10: Master Lexicon 10",
    "clusterId": 10,
    "clusterTitle": "Stage 10: Master Lexicon 10"
  },
  {
    "id": "w10-aspire",
    "word": "aspire",
    "phonetic": "/əˈspaɪɹ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Bercita-cita / Mengidamkan",
    "definition": "Bercita-cita atau berusaha mencapai sesuatu yang tinggi.",
    "contextSentences": [
      {
        "english": "Many graduates aspire to lead research teams in the future.",
        "indonesian": "Banyak lulusan bercita-cita memimpin tim penelitian pada masa mendatang.",
        "clozeEnglish": "Many graduates ________ to lead research teams in the future."
      }
    ],
    "stageId": 10,
    "stageTitle": "Stage 10: Master Lexicon 10",
    "clusterId": 10,
    "clusterTitle": "Stage 10: Master Lexicon 10"
  },
  {
    "id": "w10-assertion",
    "word": "assertion",
    "phonetic": "/əˈsɝ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Pernyataan / Klaim",
    "definition": "Pernyataan atau klaim yang disampaikan dengan tegas.",
    "contextSentences": [
      {
        "english": "The analyst challenged the assertion that higher spending always improves performance.",
        "indonesian": "Analis tersebut mempertanyakan klaim bahwa pengeluaran yang lebih tinggi selalu meningkatkan kinerja.",
        "clozeEnglish": "The analyst challenged the ________ that higher spending always improves performance."
      }
    ],
    "stageId": 10,
    "stageTitle": "Stage 10: Master Lexicon 10",
    "clusterId": 10,
    "clusterTitle": "Stage 10: Master Lexicon 10"
  },
  {
    "id": "w10-assertive",
    "word": "assertive",
    "phonetic": "/əˈsɝ.tɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Tegas / Percaya Diri",
    "definition": "Tegas menyampaikan pendapat/kebutuhan dengan percaya diri tanpa agresif.",
    "contextSentences": [
      {
        "english": "An assertive negotiator can defend a position without dismissing opposing views.",
        "indonesian": "Negosiator yang tegas dapat mempertahankan pendiriannya tanpa mengabaikan pandangan yang berlawanan.",
        "clozeEnglish": "An ________ negotiator can defend a position without dismissing opposing views."
      }
    ],
    "stageId": 10,
    "stageTitle": "Stage 10: Master Lexicon 10",
    "clusterId": 10,
    "clusterTitle": "Stage 10: Master Lexicon 10"
  },
  {
    "id": "w10-assess",
    "word": "assess",
    "phonetic": "/əˈsɛs/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menilai / Mengevaluasi",
    "definition": "Menilai atau memperkirakan kualitas, kondisi, risiko, atau nilai sesuatu.",
    "contextSentences": [
      {
        "english": "The committee will assess the proposal against the published criteria.",
        "indonesian": "Komite akan menilai proposal tersebut berdasarkan kriteria yang telah dipublikasikan.",
        "clozeEnglish": "The committee will ________ the proposal against the published criteria."
      }
    ],
    "stageId": 10,
    "stageTitle": "Stage 10: Master Lexicon 10",
    "clusterId": 10,
    "clusterTitle": "Stage 10: Master Lexicon 10"
  },
  {
    "id": "w10-assign",
    "word": "assign",
    "phonetic": "/əˈsaɪn/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menugaskan / Menetapkan",
    "definition": "Memberikan tugas atau menetapkan orang pada peran tertentu.",
    "contextSentences": [
      {
        "english": "The manager will assign each analyst a specific area of responsibility.",
        "indonesian": "Manajer akan memberikan setiap analis bidang tanggung jawab tertentu.",
        "clozeEnglish": "The manager will ________ each analyst a specific area of responsibility."
      }
    ],
    "stageId": 10,
    "stageTitle": "Stage 10: Master Lexicon 10",
    "clusterId": 10,
    "clusterTitle": "Stage 10: Master Lexicon 10"
  },
  {
    "id": "w10-assist",
    "word": "assist",
    "phonetic": "/əˈsɪst/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Membantu / Memberikan dukungan",
    "definition": "Membantu atau memberikan dukungan.",
    "contextSentences": [
      {
        "english": "The new tool can assist researchers in checking large datasets.",
        "indonesian": "Alat baru tersebut dapat membantu peneliti memeriksa kumpulan data berukuran besar.",
        "clozeEnglish": "The new tool can ________ researchers in checking large datasets."
      }
    ],
    "stageId": 10,
    "stageTitle": "Stage 10: Master Lexicon 10",
    "clusterId": 10,
    "clusterTitle": "Stage 10: Master Lexicon 10"
  },
  {
    "id": "w10-assume",
    "word": "assume",
    "phonetic": "/əˈsum/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menganggap / Berasumsi",
    "definition": "Menganggap sesuatu benar tanpa bukti yang cukup; juga mengambil tanggung jawab/peran.",
    "contextSentences": [
      {
        "english": "The model should not assume that demand will remain constant.",
        "indonesian": "Model tersebut tidak boleh menganggap bahwa permintaan akan tetap konstan.",
        "clozeEnglish": "The model should not ________ that demand will remain constant."
      }
    ],
    "stageId": 10,
    "stageTitle": "Stage 10: Master Lexicon 10",
    "clusterId": 10,
    "clusterTitle": "Stage 10: Master Lexicon 10"
  },
  {
    "id": "w10-assure",
    "word": "assure",
    "phonetic": "/əˈʃʊɹ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Meyakinkan / Menjamin",
    "definition": "Meyakinkan seseorang bahwa sesuatu benar atau akan berjalan baik.",
    "contextSentences": [
      {
        "english": "The project manager assured stakeholders that the data would remain confidential.",
        "indonesian": "Manajer proyek meyakinkan para pemangku kepentingan bahwa data akan tetap rahasia.",
        "clozeEnglish": "The project manager ________d stakeholders that the data would remain confidential."
      }
    ],
    "stageId": 10,
    "stageTitle": "Stage 10: Master Lexicon 10",
    "clusterId": 10,
    "clusterTitle": "Stage 10: Master Lexicon 10"
  },
  {
    "id": "w11-astonish",
    "word": "astonish",
    "phonetic": "/əˈstɑ.nɪʃ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengejutkan / Menakjubkan",
    "definition": "Sangat mengejutkan atau membuat seseorang takjub.",
    "contextSentences": [
      {
        "english": "The unexpected result astonished the review committee.",
        "indonesian": "Hasil yang tidak terduga itu mengejutkan komite penelaah.",
        "clozeEnglish": "The unexpected result ________ed the review committee."
      }
    ],
    "stageId": 11,
    "stageTitle": "Stage 11: Master Lexicon 11",
    "clusterId": 11,
    "clusterTitle": "Stage 11: Master Lexicon 11"
  },
  {
    "id": "w11-attach",
    "word": "attach",
    "phonetic": "/əˈtætʃ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Melampirkan / Menghubungkan",
    "definition": "Melampirkan dokumen atau menghubungkan satu benda dengan benda lain.",
    "contextSentences": [
      {
        "english": "Please attach the supporting documents to the application.",
        "indonesian": "Silakan lampirkan dokumen pendukung pada permohonan tersebut.",
        "clozeEnglish": "Please ________ the supporting documents to the application."
      }
    ],
    "stageId": 11,
    "stageTitle": "Stage 11: Master Lexicon 11",
    "clusterId": 11,
    "clusterTitle": "Stage 11: Master Lexicon 11"
  },
  {
    "id": "w11-attain",
    "word": "attain",
    "phonetic": "/əˈteɪn/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Meraih / Mencapai",
    "definition": "Mencapai tingkat, standar, atau tujuan setelah usaha.",
    "contextSentences": [
      {
        "english": "The team worked for months to attain the required accuracy level.",
        "indonesian": "Tim tersebut bekerja selama berbulan-bulan untuk mencapai tingkat akurasi yang disyaratkan.",
        "clozeEnglish": "The team worked for months to ________ the required accuracy level."
      }
    ],
    "stageId": 11,
    "stageTitle": "Stage 11: Master Lexicon 11",
    "clusterId": 11,
    "clusterTitle": "Stage 11: Master Lexicon 11"
  },
  {
    "id": "w11-attitude",
    "word": "attitude",
    "phonetic": "/ˈæ.təˌtud/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Sikap / Cara pandang",
    "definition": "Sikap atau cara pandang terhadap seseorang/sesuatu.",
    "contextSentences": [
      {
        "english": "A constructive attitude helps teams respond effectively to setbacks.",
        "indonesian": "Sikap konstruktif membantu tim merespons kemunduran secara efektif.",
        "clozeEnglish": "A constructive ________ helps teams respond effectively to setbacks."
      }
    ],
    "stageId": 11,
    "stageTitle": "Stage 11: Master Lexicon 11",
    "clusterId": 11,
    "clusterTitle": "Stage 11: Master Lexicon 11"
  },
  {
    "id": "w11-attribute",
    "word": "attribute",
    "phonetic": "/ˈæ.tɹəbˌjut/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Ciri / Atribut",
    "definition": "Ciri/kualitas yang melekat; sebagai verba berarti menganggap sesuatu disebabkan oleh faktor tertentu.",
    "contextSentences": [
      {
        "english": "Reliability is an important attribute of any analytical system.",
        "indonesian": "Keandalan merupakan ciri penting dari setiap sistem analitis.",
        "clozeEnglish": "Reliability is an important ________ of any analytical system."
      }
    ],
    "stageId": 11,
    "stageTitle": "Stage 11: Master Lexicon 11",
    "clusterId": 11,
    "clusterTitle": "Stage 11: Master Lexicon 11"
  },
  {
    "id": "w11-authentic",
    "word": "authentic",
    "phonetic": "/əˈθɛn.tɪk/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Asli / Otentik",
    "definition": "Asli, otentik, atau tulus; bukan tiruan/kepura-puraan.",
    "contextSentences": [
      {
        "english": "The committee considered the proposal authentic after reviewing all available evidence.",
        "indonesian": "Komite menilai proposal tersebut asli setelah meninjau seluruh bukti yang tersedia.",
        "clozeEnglish": "The committee considered the proposal ________ after reviewing all available evidence."
      }
    ],
    "stageId": 11,
    "stageTitle": "Stage 11: Master Lexicon 11",
    "clusterId": 11,
    "clusterTitle": "Stage 11: Master Lexicon 11"
  },
  {
    "id": "w11-authorize",
    "word": "authorize",
    "phonetic": "/ˈɔ.θɚˌaɪz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengesahkan / Memberi wewenang",
    "definition": "Memberikan izin atau wewenang resmi.",
    "contextSentences": [
      {
        "english": "Only the finance director can authorize payments above this threshold.",
        "indonesian": "Hanya direktur keuangan yang dapat mengesahkan pembayaran di atas batas ini.",
        "clozeEnglish": "Only the finance director can ________ payments above this threshold."
      }
    ],
    "stageId": 11,
    "stageTitle": "Stage 11: Master Lexicon 11",
    "clusterId": 11,
    "clusterTitle": "Stage 11: Master Lexicon 11"
  },
  {
    "id": "w11-automate",
    "word": "automate",
    "phonetic": "/ˈɔ.təˌmeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengotomatiskan / Mengotomatisasi",
    "definition": "Mengotomatiskan proses menggunakan mesin atau perangkat lunak.",
    "contextSentences": [
      {
        "english": "The company plans to automate routine checks in its reporting process.",
        "indonesian": "Perusahaan berencana mengotomatiskan pemeriksaan rutin dalam proses pelaporannya.",
        "clozeEnglish": "The company plans to ________ routine checks in its reporting process."
      }
    ],
    "stageId": 11,
    "stageTitle": "Stage 11: Master Lexicon 11",
    "clusterId": 11,
    "clusterTitle": "Stage 11: Master Lexicon 11"
  },
  {
    "id": "w11-available",
    "word": "available",
    "phonetic": "/əˈveɪ.lə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Tersedia / Siap Pakai",
    "definition": "Tersedia atau dapat digunakan/diperoleh.",
    "contextSentences": [
      {
        "english": "All supporting documents are available through the secure portal.",
        "indonesian": "Semua dokumen pendukung tersedia melalui portal yang aman.",
        "clozeEnglish": "All supporting documents are ________ through the secure portal."
      }
    ],
    "stageId": 11,
    "stageTitle": "Stage 11: Master Lexicon 11",
    "clusterId": 11,
    "clusterTitle": "Stage 11: Master Lexicon 11"
  },
  {
    "id": "w11-aware",
    "word": "aware",
    "phonetic": "/əˈwɛɹ/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Menyadari / Tahu",
    "definition": "Menyadari atau mengetahui keberadaan/fakta tentang sesuatu.",
    "contextSentences": [
      {
        "english": "The board is aware of the potential risks.",
        "indonesian": "Dewan menyadari potensi risiko tersebut.",
        "clozeEnglish": "The board is ________ of the potential risks."
      }
    ],
    "stageId": 11,
    "stageTitle": "Stage 11: Master Lexicon 11",
    "clusterId": 11,
    "clusterTitle": "Stage 11: Master Lexicon 11"
  },
  {
    "id": "w12-awkward",
    "word": "awkward",
    "phonetic": "/ˈɑ.kwɚd/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Canggung / Kaku",
    "definition": "Canggung, tidak nyaman, atau sulit ditangani.",
    "contextSentences": [
      {
        "english": "The team had to resolve an awkward situation during the negotiation.",
        "indonesian": "Tim tersebut harus menyelesaikan situasi canggung selama negosiasi.",
        "clozeEnglish": "The team had to resolve an ________ situation during the negotiation."
      }
    ],
    "stageId": 12,
    "stageTitle": "Stage 12: Master Lexicon 12",
    "clusterId": 12,
    "clusterTitle": "Stage 12: Master Lexicon 12"
  },
  {
    "id": "w12-background",
    "word": "background",
    "phonetic": "/ˈbækˌɡɹaʊnd/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Latar belakang / Konteks",
    "definition": "Latar belakang, pengalaman, atau konteks yang mendasari sesuatu.",
    "contextSentences": [
      {
        "english": "Her background in statistics helped her interpret the research results.",
        "indonesian": "Latar belakangnya dalam bidang statistika membantunya menafsirkan hasil penelitian.",
        "clozeEnglish": "Her ________ in statistics helped her interpret the research results."
      }
    ],
    "stageId": 12,
    "stageTitle": "Stage 12: Master Lexicon 12",
    "clusterId": 12,
    "clusterTitle": "Stage 12: Master Lexicon 12"
  },
  {
    "id": "w12-behalf",
    "word": "behalf",
    "phonetic": "/bɪˈhæf/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Atas nama / Kepentingan",
    "definition": "Kepentingan atau nama pihak lain; umum dalam frasa on behalf of.",
    "contextSentences": [
      {
        "english": "The director spoke on behalf of the entire research team.",
        "indonesian": "Direktur berbicara atas nama seluruh tim riset.",
        "clozeEnglish": "The director spoke on ________ of the entire research team."
      }
    ],
    "stageId": 12,
    "stageTitle": "Stage 12: Master Lexicon 12",
    "clusterId": 12,
    "clusterTitle": "Stage 12: Master Lexicon 12"
  },
  {
    "id": "w12-beneficial",
    "word": "beneficial",
    "phonetic": "/ˌbɛ.nəˈfɪ.ʃəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Bermanfaat / Menguntungkan",
    "definition": "Bermanfaat atau memberikan dampak baik.",
    "contextSentences": [
      {
        "english": "The board adopted a beneficial strategy to manage operational risks.",
        "indonesian": "Dewan mengadopsi strategi yang bermanfaat untuk mengelola risiko operasional.",
        "clozeEnglish": "The board adopted a ________ strategy to manage operational risks."
      }
    ],
    "stageId": 12,
    "stageTitle": "Stage 12: Master Lexicon 12",
    "clusterId": 12,
    "clusterTitle": "Stage 12: Master Lexicon 12"
  },
  {
    "id": "w12-benefit",
    "word": "benefit",
    "phonetic": "/ˈbɛ.nə.fɪt/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Manfaat / Keuntungan",
    "definition": "Manfaat/keuntungan; sebagai verba berarti memberi manfaat.",
    "contextSentences": [
      {
        "english": "One major benefit of automation is the reduction of repetitive work.",
        "indonesian": "Salah satu manfaat utama otomatisasi adalah berkurangnya pekerjaan yang berulang.",
        "clozeEnglish": "One major ________ of automation is the reduction of repetitive work."
      }
    ],
    "stageId": 12,
    "stageTitle": "Stage 12: Master Lexicon 12",
    "clusterId": 12,
    "clusterTitle": "Stage 12: Master Lexicon 12"
  },
  {
    "id": "w12-benevolent",
    "word": "benevolent",
    "phonetic": "/bəˈnɛ.və.lənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Dermawan / Baik hati",
    "definition": "Baik hati dan ingin membantu orang lain, sering melalui kemurahan hati.",
    "contextSentences": [
      {
        "english": "A benevolent foundation funded scholarships for students from low-income families.",
        "indonesian": "Yayasan yang dermawan itu mendanai beasiswa bagi siswa dari keluarga berpenghasilan rendah.",
        "clozeEnglish": "A ________ foundation funded scholarships for students from low-income families."
      }
    ],
    "stageId": 12,
    "stageTitle": "Stage 12: Master Lexicon 12",
    "clusterId": 12,
    "clusterTitle": "Stage 12: Master Lexicon 12"
  },
  {
    "id": "w12-benign",
    "word": "benign",
    "phonetic": "/bɪˈnaɪn/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Jinak / Tidak Berbahaya",
    "definition": "Tidak berbahaya atau tidak ganas; juga dapat berarti lembut/ramah.",
    "contextSentences": [
      {
        "english": "The review confirmed that the change was benign and required no further action.",
        "indonesian": "Peninjauan memastikan bahwa perubahan tersebut tidak berbahaya dan tidak memerlukan tindakan lanjutan.",
        "clozeEnglish": "The review confirmed that the change was ________ and required no further action."
      }
    ],
    "stageId": 12,
    "stageTitle": "Stage 12: Master Lexicon 12",
    "clusterId": 12,
    "clusterTitle": "Stage 12: Master Lexicon 12"
  },
  {
    "id": "w12-bias",
    "word": "bias",
    "phonetic": "/ˈbaɪ.əs/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Keberpihakan / Prasangka",
    "definition": "Keberpihakan atau prasangka yang membuat penilaian tidak netral.",
    "contextSentences": [
      {
        "english": "The analyst checked the dataset for bias before drawing conclusions.",
        "indonesian": "Analis memeriksa kumpulan data untuk mendeteksi bias sebelum menarik kesimpulan.",
        "clozeEnglish": "The analyst checked the dataset for ________ before drawing conclusions."
      }
    ],
    "stageId": 12,
    "stageTitle": "Stage 12: Master Lexicon 12",
    "clusterId": 12,
    "clusterTitle": "Stage 12: Master Lexicon 12"
  },
  {
    "id": "w12-bizarre",
    "word": "bizarre",
    "phonetic": "/bəˈzɑɹ/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Aneh / Tidak Lazim",
    "definition": "Sangat aneh atau tidak lazim.",
    "contextSentences": [
      {
        "english": "The organization faced bizarre conditions during the transition.",
        "indonesian": "Organisasi tersebut menghadapi kondisi yang aneh selama masa peralihan.",
        "clozeEnglish": "The organization faced ________ conditions during the transition."
      }
    ],
    "stageId": 12,
    "stageTitle": "Stage 12: Master Lexicon 12",
    "clusterId": 12,
    "clusterTitle": "Stage 12: Master Lexicon 12"
  },
  {
    "id": "w12-blueprint",
    "word": "blueprint",
    "phonetic": "/ˈbluˌpɹɪnt/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Cetak biru / Rancangan",
    "definition": "Rancangan dasar atau rencana terperinci untuk membangun/melaksanakan sesuatu.",
    "contextSentences": [
      {
        "english": "The proposal provides a blueprint for the next phase of development.",
        "indonesian": "Proposal tersebut menyediakan rancangan dasar untuk tahap pengembangan berikutnya.",
        "clozeEnglish": "The proposal provides a ________ for the next phase of development."
      }
    ],
    "stageId": 12,
    "stageTitle": "Stage 12: Master Lexicon 12",
    "clusterId": 12,
    "clusterTitle": "Stage 12: Master Lexicon 12"
  },
  {
    "id": "w13-bond",
    "word": "bond",
    "phonetic": "/ˈbɑnd/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Ikatan / Hubungan",
    "definition": "Ikatan fisik, kimia, sosial, atau emosional.",
    "contextSentences": [
      {
        "english": "Years of collaboration created a strong bond between the two research teams.",
        "indonesian": "Bertahun-tahun bekerja sama membentuk ikatan yang kuat antara kedua tim riset.",
        "clozeEnglish": "Years of collaboration created a strong ________ between the two research teams."
      }
    ],
    "stageId": 13,
    "stageTitle": "Stage 13: Master Lexicon 13",
    "clusterId": 13,
    "clusterTitle": "Stage 13: Master Lexicon 13"
  },
  {
    "id": "w13-boundary",
    "word": "boundary",
    "phonetic": "/ˈbaʊn.dɚ.i/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Batas / Batasan",
    "definition": "Batas fisik, wilayah, aturan, atau batas personal.",
    "contextSentences": [
      {
        "english": "The agreement clearly defines the boundary between the two teams' responsibilities.",
        "indonesian": "Perjanjian tersebut dengan jelas menetapkan batas tanggung jawab kedua tim.",
        "clozeEnglish": "The agreement clearly defines the ________ between the two teams' responsibilities."
      }
    ],
    "stageId": 13,
    "stageTitle": "Stage 13: Master Lexicon 13",
    "clusterId": 13,
    "clusterTitle": "Stage 13: Master Lexicon 13"
  },
  {
    "id": "w13-brief",
    "word": "brief",
    "phonetic": "/ˈbɹif/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Singkat / Ringkas",
    "definition": "Singkat atau berlangsung sebentar; juga ringkasan/instruksi singkat.",
    "contextSentences": [
      {
        "english": "The director delivered a brief summary of the audit findings.",
        "indonesian": "Direktur menyampaikan ringkasan singkat mengenai temuan audit.",
        "clozeEnglish": "The director delivered a ________ summary of the audit findings."
      }
    ],
    "stageId": 13,
    "stageTitle": "Stage 13: Master Lexicon 13",
    "clusterId": 13,
    "clusterTitle": "Stage 13: Master Lexicon 13"
  },
  {
    "id": "w13-brilliant",
    "word": "brilliant",
    "phonetic": "/ˈbɹɪl.jənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Cemerlang / Brilian",
    "definition": "Sangat cerdas atau luar biasa; juga sangat terang.",
    "contextSentences": [
      {
        "english": "The analyst proposed a brilliant solution to a complex operational problem.",
        "indonesian": "Analis mengusulkan solusi cemerlang untuk masalah operasional yang rumit.",
        "clozeEnglish": "The analyst proposed a ________ solution to a complex operational problem."
      }
    ],
    "stageId": 13,
    "stageTitle": "Stage 13: Master Lexicon 13",
    "clusterId": 13,
    "clusterTitle": "Stage 13: Master Lexicon 13"
  },
  {
    "id": "w13-bulk",
    "word": "bulk",
    "phonetic": "/ˈbʌlk/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Sebagian besar / Jumlah besar",
    "definition": "Bagian terbesar atau jumlah besar dari sesuatu.",
    "contextSentences": [
      {
        "english": "The bulk of the budget was allocated to laboratory equipment.",
        "indonesian": "Sebagian besar anggaran dialokasikan untuk peralatan laboratorium.",
        "clozeEnglish": "The ________ of the budget was allocated to laboratory equipment."
      }
    ],
    "stageId": 13,
    "stageTitle": "Stage 13: Master Lexicon 13",
    "clusterId": 13,
    "clusterTitle": "Stage 13: Master Lexicon 13"
  },
  {
    "id": "w13-calculate",
    "word": "calculate",
    "phonetic": "/ˈkæl.kjəˌleɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menghitung / Mengalkulasi",
    "definition": "Menghitung secara matematis.",
    "contextSentences": [
      {
        "english": "The system can calculate the total cost automatically.",
        "indonesian": "Sistem tersebut dapat menghitung total biaya secara otomatis.",
        "clozeEnglish": "The system can ________ the total cost automatically."
      }
    ],
    "stageId": 13,
    "stageTitle": "Stage 13: Master Lexicon 13",
    "clusterId": 13,
    "clusterTitle": "Stage 13: Master Lexicon 13"
  },
  {
    "id": "w13-campaign",
    "word": "campaign",
    "phonetic": "/kæmˈpeɪn/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Kampanye / Gerakan",
    "definition": "Kegiatan terencana untuk mencapai tujuan, misalnya promosi atau gerakan publik.",
    "contextSentences": [
      {
        "english": "The company launched a campaign to raise awareness of data privacy.",
        "indonesian": "Perusahaan meluncurkan kampanye untuk meningkatkan kesadaran tentang privasi data.",
        "clozeEnglish": "The company launched a ________ to raise awareness of data privacy."
      }
    ],
    "stageId": 13,
    "stageTitle": "Stage 13: Master Lexicon 13",
    "clusterId": 13,
    "clusterTitle": "Stage 13: Master Lexicon 13"
  },
  {
    "id": "w13-candid",
    "word": "candid",
    "phonetic": "/ˈkæn.dəd/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Jujur / Terus terang",
    "definition": "Jujur dan terus terang, bahkan ketika menyampaikan hal yang sulit.",
    "contextSentences": [
      {
        "english": "The director gave a candid assessment of the project's weaknesses.",
        "indonesian": "Direktur tersebut memberikan penilaian yang jujur dan terus terang mengenai kelemahan proyek.",
        "clozeEnglish": "The director gave a ________ assessment of the project's weaknesses."
      }
    ],
    "stageId": 13,
    "stageTitle": "Stage 13: Master Lexicon 13",
    "clusterId": 13,
    "clusterTitle": "Stage 13: Master Lexicon 13"
  },
  {
    "id": "w13-capable",
    "word": "capable",
    "phonetic": "/ˈkeɪ.pə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Mampu / Cakap",
    "definition": "Mampu melakukan sesuatu atau memiliki kapasitas yang diperlukan.",
    "contextSentences": [
      {
        "english": "The team is capable of completing the review ahead of schedule.",
        "indonesian": "Tim tersebut mampu menyelesaikan peninjauan lebih cepat dari jadwal.",
        "clozeEnglish": "The team is ________ of completing the review ahead of schedule."
      }
    ],
    "stageId": 13,
    "stageTitle": "Stage 13: Master Lexicon 13",
    "clusterId": 13,
    "clusterTitle": "Stage 13: Master Lexicon 13"
  },
  {
    "id": "w13-capacity",
    "word": "capacity",
    "phonetic": "/kəˈpæ.sə.ti/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Kapasitas / Kemampuan maksimum",
    "definition": "Kapasitas atau kemampuan maksimum untuk menampung/melakukan sesuatu.",
    "contextSentences": [
      {
        "english": "The laboratory has the capacity to process hundreds of samples each day.",
        "indonesian": "Laboratorium tersebut memiliki kapasitas untuk memproses ratusan sampel setiap hari.",
        "clozeEnglish": "The laboratory has the ________ to process hundreds of samples each day."
      }
    ],
    "stageId": 13,
    "stageTitle": "Stage 13: Master Lexicon 13",
    "clusterId": 13,
    "clusterTitle": "Stage 13: Master Lexicon 13"
  },
  {
    "id": "w14-capture",
    "word": "capture",
    "phonetic": "/ˈkæp.tʃɚ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menangkap / Mengabadikan",
    "definition": "Menangkap, merekam, atau mengabadikan sesuatu.",
    "contextSentences": [
      {
        "english": "The survey was designed to capture changes in customer behavior.",
        "indonesian": "Survei tersebut dirancang untuk menangkap perubahan perilaku pelanggan.",
        "clozeEnglish": "The survey was designed to ________ changes in customer behavior."
      }
    ],
    "stageId": 14,
    "stageTitle": "Stage 14: Master Lexicon 14",
    "clusterId": 14,
    "clusterTitle": "Stage 14: Master Lexicon 14"
  },
  {
    "id": "w14-catalyst",
    "word": "catalyst",
    "phonetic": "/ˈkæ.tə.ləst/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Katalis / Pemicu",
    "definition": "Sesuatu yang memicu atau mempercepat perubahan.",
    "contextSentences": [
      {
        "english": "The new policy became a catalyst for broader organizational reform.",
        "indonesian": "Kebijakan baru tersebut menjadi pemicu reformasi organisasi yang lebih luas.",
        "clozeEnglish": "The new policy became a ________ for broader organizational reform."
      }
    ],
    "stageId": 14,
    "stageTitle": "Stage 14: Master Lexicon 14",
    "clusterId": 14,
    "clusterTitle": "Stage 14: Master Lexicon 14"
  },
  {
    "id": "w14-category",
    "word": "category",
    "phonetic": "/ˈkæ.təˌɡɔ.ɹi/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Kategori / Golongan",
    "definition": "Kelompok yang menggolongkan hal-hal berdasarkan kesamaan.",
    "contextSentences": [
      {
        "english": "Each transaction was assigned to the correct category for analysis.",
        "indonesian": "Setiap transaksi dimasukkan ke kategori yang tepat untuk dianalisis.",
        "clozeEnglish": "Each transaction was assigned to the correct ________ for analysis."
      }
    ],
    "stageId": 14,
    "stageTitle": "Stage 14: Master Lexicon 14",
    "clusterId": 14,
    "clusterTitle": "Stage 14: Master Lexicon 14"
  },
  {
    "id": "w14-caution",
    "word": "caution",
    "phonetic": "/ˈkɑ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Kehati-hatian / Peringatan",
    "definition": "Kehati-hatian atau peringatan agar menghindari risiko.",
    "contextSentences": [
      {
        "english": "The report advises caution when interpreting preliminary results.",
        "indonesian": "Laporan tersebut menyarankan kehati-hatian saat menafsirkan hasil awal.",
        "clozeEnglish": "The report advises ________ when interpreting preliminary results."
      }
    ],
    "stageId": 14,
    "stageTitle": "Stage 14: Master Lexicon 14",
    "clusterId": 14,
    "clusterTitle": "Stage 14: Master Lexicon 14"
  },
  {
    "id": "w14-cease",
    "word": "cease",
    "phonetic": "/ˈsis/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Berhenti / Menghentikan",
    "definition": "Berhenti atau menghentikan suatu kegiatan.",
    "contextSentences": [
      {
        "english": "The factory will cease operations during the scheduled maintenance period.",
        "indonesian": "Pabrik akan menghentikan operasinya selama masa pemeliharaan terjadwal.",
        "clozeEnglish": "The factory will ________ operations during the scheduled maintenance period."
      }
    ],
    "stageId": 14,
    "stageTitle": "Stage 14: Master Lexicon 14",
    "clusterId": 14,
    "clusterTitle": "Stage 14: Master Lexicon 14"
  },
  {
    "id": "w14-challenge",
    "word": "challenge",
    "phonetic": "/ˈtʃæ.ləndʒ/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Tantangan / Kesulitan",
    "definition": "Tantangan atau tugas sulit yang menguji kemampuan.",
    "contextSentences": [
      {
        "english": "The team treated the unexpected delay as a manageable challenge.",
        "indonesian": "Tim tersebut menganggap penundaan tak terduga sebagai tantangan yang masih dapat ditangani.",
        "clozeEnglish": "The team treated the unexpected delay as a manageable ________."
      }
    ],
    "stageId": 14,
    "stageTitle": "Stage 14: Master Lexicon 14",
    "clusterId": 14,
    "clusterTitle": "Stage 14: Master Lexicon 14"
  },
  {
    "id": "w14-channel",
    "word": "channel",
    "phonetic": "/ˈtʃæ.nəl/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Saluran / Jalur",
    "definition": "Saluran komunikasi, media, atau jalur untuk mengalirkan sesuatu.",
    "contextSentences": [
      {
        "english": "The secure channel allowed the departments to exchange sensitive files.",
        "indonesian": "Saluran aman tersebut memungkinkan departemen bertukar berkas sensitif.",
        "clozeEnglish": "The secure ________ allowed the departments to exchange sensitive files."
      }
    ],
    "stageId": 14,
    "stageTitle": "Stage 14: Master Lexicon 14",
    "clusterId": 14,
    "clusterTitle": "Stage 14: Master Lexicon 14"
  },
  {
    "id": "w14-chapter",
    "word": "chapter",
    "phonetic": "/ˈtʃæp.tɚ/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Bab / Babak",
    "definition": "Bab buku atau tahap/periode dalam kehidupan.",
    "contextSentences": [
      {
        "english": "The successful launch marked a new chapter in the company's development.",
        "indonesian": "Peluncuran yang sukses menandai babak baru dalam perkembangan perusahaan.",
        "clozeEnglish": "The successful launch marked a new ________ in the company's development."
      }
    ],
    "stageId": 14,
    "stageTitle": "Stage 14: Master Lexicon 14",
    "clusterId": 14,
    "clusterTitle": "Stage 14: Master Lexicon 14"
  },
  {
    "id": "w14-chart",
    "word": "chart",
    "phonetic": "/ˈtʃɑɹt/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Grafik / Bagan",
    "definition": "Bagan/grafik yang menyajikan informasi secara visual.",
    "contextSentences": [
      {
        "english": "The chart illustrates how revenue changed over the last five quarters.",
        "indonesian": "Grafik tersebut menggambarkan perubahan pendapatan selama lima kuartal terakhir.",
        "clozeEnglish": "The ________ illustrates how revenue changed over the last five quarters."
      }
    ],
    "stageId": 14,
    "stageTitle": "Stage 14: Master Lexicon 14",
    "clusterId": 14,
    "clusterTitle": "Stage 14: Master Lexicon 14"
  },
  {
    "id": "w14-chemical",
    "word": "chemical",
    "phonetic": "/ˈkɛ.mə.kəl/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Zat kimia / Bahan kimia",
    "definition": "Zat kimia atau bahan yang memiliki komposisi kimia tertentu.",
    "contextSentences": [
      {
        "english": "The technician labeled each chemical before storing it.",
        "indonesian": "Teknisi memberi label pada setiap zat kimia sebelum menyimpannya.",
        "clozeEnglish": "The technician labeled each ________ before storing it."
      }
    ],
    "stageId": 14,
    "stageTitle": "Stage 14: Master Lexicon 14",
    "clusterId": 14,
    "clusterTitle": "Stage 14: Master Lexicon 14"
  },
  {
    "id": "w15-circumstance",
    "word": "circumstance",
    "phonetic": "/ˈsɝ.kəmˌstæns/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Keadaan / Kondisi",
    "definition": "Keadaan atau kondisi yang mempengaruhi suatu peristiwa.",
    "contextSentences": [
      {
        "english": "Under these circumstances, the committee postponed the final decision.",
        "indonesian": "Dalam keadaan seperti ini, komite menunda keputusan akhir.",
        "clozeEnglish": "Under these ________s, the committee postponed the final decision."
      }
    ],
    "stageId": 15,
    "stageTitle": "Stage 15: Master Lexicon 15",
    "clusterId": 15,
    "clusterTitle": "Stage 15: Master Lexicon 15"
  },
  {
    "id": "w15-cite",
    "word": "cite",
    "phonetic": "/ˈsaɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengutip / Merujuk",
    "definition": "Mengutip atau menyebutkan sumber sebagai bukti/rujukan.",
    "contextSentences": [
      {
        "english": "The report cites several peer-reviewed studies to support its conclusion.",
        "indonesian": "Laporan tersebut mengutip sejumlah penelitian yang telah ditelaah sejawat untuk mendukung kesimpulannya.",
        "clozeEnglish": "The report ________s several peer-reviewed studies to support its conclusion."
      }
    ],
    "stageId": 15,
    "stageTitle": "Stage 15: Master Lexicon 15",
    "clusterId": 15,
    "clusterTitle": "Stage 15: Master Lexicon 15"
  },
  {
    "id": "w15-civil",
    "word": "civil",
    "phonetic": "/ˈsɪ.vəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Sipil / Perdata",
    "definition": "Berkaitan dengan warga sipil/hukum perdata; juga berarti sopan dalam interaksi.",
    "contextSentences": [
      {
        "english": "The parties maintained a civil discussion despite their disagreement.",
        "indonesian": "Kedua pihak tetap berdiskusi dengan sopan meskipun tidak sependapat.",
        "clozeEnglish": "The parties maintained a ________ discussion despite their disagreement."
      }
    ],
    "stageId": 15,
    "stageTitle": "Stage 15: Master Lexicon 15",
    "clusterId": 15,
    "clusterTitle": "Stage 15: Master Lexicon 15"
  },
  {
    "id": "w15-clarify",
    "word": "clarify",
    "phonetic": "/ˈklɛ.ɹəˌfaɪ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memperjelas / Mengklarifikasi",
    "definition": "Menjelaskan agar sesuatu menjadi lebih jelas dan tidak membingungkan.",
    "contextSentences": [
      {
        "english": "The analyst asked the client to clarify the requirements before development began.",
        "indonesian": "Analis meminta klien memperjelas persyaratan sebelum pengembangan dimulai.",
        "clozeEnglish": "The analyst asked the client to ________ the requirements before development began."
      }
    ],
    "stageId": 15,
    "stageTitle": "Stage 15: Master Lexicon 15",
    "clusterId": 15,
    "clusterTitle": "Stage 15: Master Lexicon 15"
  },
  {
    "id": "w15-classic",
    "word": "classic",
    "phonetic": "/ˈklæ.sɪk/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Klasik / Ikonis",
    "definition": "Klasik atau dianggap sebagai contoh terbaik/abadi dari jenisnya.",
    "contextSentences": [
      {
        "english": "The case is a classic example of poor project governance.",
        "indonesian": "Kasus tersebut merupakan contoh klasik tata kelola proyek yang buruk.",
        "clozeEnglish": "The case is a ________ example of poor project governance."
      }
    ],
    "stageId": 15,
    "stageTitle": "Stage 15: Master Lexicon 15",
    "clusterId": 15,
    "clusterTitle": "Stage 15: Master Lexicon 15"
  },
  {
    "id": "w15-clause",
    "word": "clause",
    "phonetic": "/ˈklɔz/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Klausul / Ketentuan",
    "definition": "Bagian atau ketentuan dalam kontrak; dalam tata bahasa, klausa.",
    "contextSentences": [
      {
        "english": "The contract includes a clause that protects confidential information.",
        "indonesian": "Kontrak tersebut memuat klausul yang melindungi informasi rahasia.",
        "clozeEnglish": "The contract includes a ________ that protects confidential information."
      }
    ],
    "stageId": 15,
    "stageTitle": "Stage 15: Master Lexicon 15",
    "clusterId": 15,
    "clusterTitle": "Stage 15: Master Lexicon 15"
  },
  {
    "id": "w15-code",
    "word": "code",
    "phonetic": "/ˈkoʊd/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Kode / Aturan",
    "definition": "Kode/sandi atau seperangkat aturan dan standar perilaku.",
    "contextSentences": [
      {
        "english": "Every employee must follow the company's code of conduct.",
        "indonesian": "Setiap karyawan harus mematuhi kode etik perusahaan.",
        "clozeEnglish": "Every employee must follow the company's ________ of conduct."
      }
    ],
    "stageId": 15,
    "stageTitle": "Stage 15: Master Lexicon 15",
    "clusterId": 15,
    "clusterTitle": "Stage 15: Master Lexicon 15"
  },
  {
    "id": "w15-cognitive",
    "word": "cognitive",
    "phonetic": "/ˈkɑɡ.nɪ.tɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Kognitif / Mental",
    "definition": "Berkaitan dengan proses mental seperti berpikir, mengingat, dan memahami.",
    "contextSentences": [
      {
        "english": "The study examined cognitive changes after intensive training.",
        "indonesian": "Studi tersebut meneliti perubahan kognitif setelah pelatihan intensif.",
        "clozeEnglish": "The study examined ________ changes after intensive training."
      }
    ],
    "stageId": 15,
    "stageTitle": "Stage 15: Master Lexicon 15",
    "clusterId": 15,
    "clusterTitle": "Stage 15: Master Lexicon 15"
  },
  {
    "id": "w15-cognizant",
    "word": "cognizant",
    "phonetic": "/ˈkɑɡ.nə.zənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Menyadari / Memahami",
    "definition": "Menyadari atau memahami fakta/risiko secara jelas.",
    "contextSentences": [
      {
        "english": "The research team is cognizant of the ethical implications of the study.",
        "indonesian": "Tim penelitian menyadari implikasi etis dari studi tersebut.",
        "clozeEnglish": "The research team is ________ of the ethical implications of the study."
      }
    ],
    "stageId": 15,
    "stageTitle": "Stage 15: Master Lexicon 15",
    "clusterId": 15,
    "clusterTitle": "Stage 15: Master Lexicon 15"
  },
  {
    "id": "w15-coherent",
    "word": "coherent",
    "phonetic": "/koʊˈhɪ.ɹənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Logis / Padu",
    "definition": "Logis, padu, dan mudah dipahami karena bagian-bagiannya saling terhubung.",
    "contextSentences": [
      {
        "english": "The report provides a coherent explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang logis tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 15,
    "stageTitle": "Stage 15: Master Lexicon 15",
    "clusterId": 15,
    "clusterTitle": "Stage 15: Master Lexicon 15"
  },
  {
    "id": "w16-cohesive",
    "word": "cohesive",
    "phonetic": "/koʊˈhi.sɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Terpadu / Kompak",
    "definition": "Terpadu, kompak, dan membentuk kesatuan yang kuat.",
    "contextSentences": [
      {
        "english": "The committee considered the proposal cohesive after reviewing all available evidence.",
        "indonesian": "Komite menilai proposal tersebut terpadu setelah meninjau seluruh bukti yang tersedia.",
        "clozeEnglish": "The committee considered the proposal ________ after reviewing all available evidence."
      }
    ],
    "stageId": 16,
    "stageTitle": "Stage 16: Master Lexicon 16",
    "clusterId": 16,
    "clusterTitle": "Stage 16: Master Lexicon 16"
  },
  {
    "id": "w16-coincide",
    "word": "coincide",
    "phonetic": "/ˌkoʊ.ɪnˈsaɪd/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Bertepatan / Bersamaan",
    "definition": "Terjadi pada waktu yang sama atau kebetulan sesuai.",
    "contextSentences": [
      {
        "english": "The product launch will coincide with the company's annual conference.",
        "indonesian": "Peluncuran produk akan bertepatan dengan konferensi tahunan perusahaan.",
        "clozeEnglish": "The product launch will ________ with the company's annual conference."
      }
    ],
    "stageId": 16,
    "stageTitle": "Stage 16: Master Lexicon 16",
    "clusterId": 16,
    "clusterTitle": "Stage 16: Master Lexicon 16"
  },
  {
    "id": "w16-collaborate",
    "word": "collaborate",
    "phonetic": "/kəˈlæ.bɚˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Bekerja sama / Berkolaborasi",
    "definition": "Bekerja sama dengan pihak lain untuk mencapai tujuan bersama.",
    "contextSentences": [
      {
        "english": "The two universities will collaborate on a study of urban mobility.",
        "indonesian": "Kedua universitas akan bekerja sama dalam penelitian tentang mobilitas perkotaan.",
        "clozeEnglish": "The two universities will ________ on a study of urban mobility."
      }
    ],
    "stageId": 16,
    "stageTitle": "Stage 16: Master Lexicon 16",
    "clusterId": 16,
    "clusterTitle": "Stage 16: Master Lexicon 16"
  },
  {
    "id": "w16-collaborative",
    "word": "collaborative",
    "phonetic": "/kəˈlæ.bɚˌeɪ.tɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Kolaboratif / Bersama",
    "definition": "Dilakukan melalui kerja sama beberapa orang/kelompok.",
    "contextSentences": [
      {
        "english": "The project used a collaborative approach involving three departments.",
        "indonesian": "Proyek tersebut menggunakan pendekatan kolaboratif yang melibatkan tiga departemen.",
        "clozeEnglish": "The project used a ________ approach involving three departments."
      }
    ],
    "stageId": 16,
    "stageTitle": "Stage 16: Master Lexicon 16",
    "clusterId": 16,
    "clusterTitle": "Stage 16: Master Lexicon 16"
  },
  {
    "id": "w16-collapse",
    "word": "collapse",
    "phonetic": "/kəˈlæps/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Runtuh / Ambruk",
    "definition": "Runtuh atau gagal secara tiba-tiba; juga kehilangan kesadaran.",
    "contextSentences": [
      {
        "english": "The system may collapse if the servers are overloaded.",
        "indonesian": "Sistem tersebut dapat mengalami keruntuhan jika server kelebihan beban.",
        "clozeEnglish": "The system may ________ if the servers are overloaded."
      }
    ],
    "stageId": 16,
    "stageTitle": "Stage 16: Master Lexicon 16",
    "clusterId": 16,
    "clusterTitle": "Stage 16: Master Lexicon 16"
  },
  {
    "id": "w16-colleague",
    "word": "colleague",
    "phonetic": "/ˈkɑ.liɡ/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Rekan kerja / Kolega",
    "definition": "Rekan kerja atau orang dalam profesi yang sama.",
    "contextSentences": [
      {
        "english": "A colleague reviewed the analysis before it was submitted.",
        "indonesian": "Seorang rekan kerja meninjau analisis tersebut sebelum diserahkan.",
        "clozeEnglish": "A ________ reviewed the analysis before it was submitted."
      }
    ],
    "stageId": 16,
    "stageTitle": "Stage 16: Master Lexicon 16",
    "clusterId": 16,
    "clusterTitle": "Stage 16: Master Lexicon 16"
  },
  {
    "id": "w16-commemorate",
    "word": "commemorate",
    "phonetic": "/kəˈmɛ.mɚˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memperingati / Mengenang",
    "definition": "Memperingati peristiwa/orang penting agar tetap diingat.",
    "contextSentences": [
      {
        "english": "The organization will commemorate the project's tenth anniversary this year.",
        "indonesian": "Organisasi tersebut akan memperingati ulang tahun proyek yang kesepuluh tahun ini.",
        "clozeEnglish": "The organization will ________ the project's tenth anniversary this year."
      }
    ],
    "stageId": 16,
    "stageTitle": "Stage 16: Master Lexicon 16",
    "clusterId": 16,
    "clusterTitle": "Stage 16: Master Lexicon 16"
  },
  {
    "id": "w16-commence",
    "word": "commence",
    "phonetic": "/kəˈmɛns/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memulai / Mengawali",
    "definition": "Memulai, terutama acara atau kegiatan formal.",
    "contextSentences": [
      {
        "english": "The review will commence once all documents have been received.",
        "indonesian": "Peninjauan akan dimulai setelah semua dokumen diterima.",
        "clozeEnglish": "The review will ________ once all documents have been received."
      }
    ],
    "stageId": 16,
    "stageTitle": "Stage 16: Master Lexicon 16",
    "clusterId": 16,
    "clusterTitle": "Stage 16: Master Lexicon 16"
  },
  {
    "id": "w16-commensurate",
    "word": "commensurate",
    "phonetic": "/kəˈmɛn.sɚ.ət/",
    "partOfSpeech": "adjective",
    "cefr": "C2",
    "translation": "Sebanding / Proporsional",
    "definition": "Sebanding atau proporsional dengan sesuatu.",
    "contextSentences": [
      {
        "english": "The compensation should be commensurate with the responsibilities of the role.",
        "indonesian": "Kompensasi seharusnya sebanding dengan tanggung jawab jabatan tersebut.",
        "clozeEnglish": "The compensation should be ________ with the responsibilities of the role."
      }
    ],
    "stageId": 16,
    "stageTitle": "Stage 16: Master Lexicon 16",
    "clusterId": 16,
    "clusterTitle": "Stage 16: Master Lexicon 16"
  },
  {
    "id": "w16-commission",
    "word": "commission",
    "phonetic": "/kəˈmɪ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Komisi / Penugasan",
    "definition": "Komisi atas penjualan; juga komite atau pemberian tugas resmi.",
    "contextSentences": [
      {
        "english": "The commission will review the evidence and publish its findings.",
        "indonesian": "Komisi tersebut akan meninjau bukti dan menerbitkan temuannya.",
        "clozeEnglish": "The ________ will review the evidence and publish its findings."
      }
    ],
    "stageId": 16,
    "stageTitle": "Stage 16: Master Lexicon 16",
    "clusterId": 16,
    "clusterTitle": "Stage 16: Master Lexicon 16"
  },
  {
    "id": "w17-commit",
    "word": "commit",
    "phonetic": "/kəˈmɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Berkomitmen / Menjalankan",
    "definition": "Berkomitmen; juga melakukan tindakan tertentu, termasuk kesalahan/kejahatan.",
    "contextSentences": [
      {
        "english": "The team must commit to a clear testing schedule.",
        "indonesian": "Tim tersebut harus berkomitmen pada jadwal pengujian yang jelas.",
        "clozeEnglish": "The team must ________ to a clear testing schedule."
      }
    ],
    "stageId": 17,
    "stageTitle": "Stage 17: Master Lexicon 17",
    "clusterId": 17,
    "clusterTitle": "Stage 17: Master Lexicon 17"
  },
  {
    "id": "w17-commodity",
    "word": "commodity",
    "phonetic": "/kəˈmɑ.də.ti/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Komoditas / Barang dagangan",
    "definition": "Barang mentah atau produk dasar yang diperdagangkan.",
    "contextSentences": [
      {
        "english": "Copper remains an important commodity in global manufacturing.",
        "indonesian": "Tembaga tetap menjadi komoditas penting dalam industri manufaktur global.",
        "clozeEnglish": "Copper remains an important ________ in global manufacturing."
      }
    ],
    "stageId": 17,
    "stageTitle": "Stage 17: Master Lexicon 17",
    "clusterId": 17,
    "clusterTitle": "Stage 17: Master Lexicon 17"
  },
  {
    "id": "w17-communicate",
    "word": "communicate",
    "phonetic": "/kəmˈju.nəˌkeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Berkomunikasi / Menyampaikan",
    "definition": "Menyampaikan informasi atau berinteraksi dengan orang lain.",
    "contextSentences": [
      {
        "english": "The analyst must communicate the findings clearly to senior management.",
        "indonesian": "Analis harus menyampaikan temuan tersebut dengan jelas kepada manajemen senior.",
        "clozeEnglish": "The analyst must ________ the findings clearly to senior management."
      }
    ],
    "stageId": 17,
    "stageTitle": "Stage 17: Master Lexicon 17",
    "clusterId": 17,
    "clusterTitle": "Stage 17: Master Lexicon 17"
  },
  {
    "id": "w17-community",
    "word": "community",
    "phonetic": "/kəmˈju.nə.ti/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Komunitas / Kelompok orang",
    "definition": "Komunitas atau kelompok orang dengan kepentingan/lokasi bersama.",
    "contextSentences": [
      {
        "english": "The research team consulted the local community before beginning the project.",
        "indonesian": "Tim riset berkonsultasi dengan masyarakat setempat sebelum memulai proyek.",
        "clozeEnglish": "The research team consulted the local ________ before beginning the project."
      }
    ],
    "stageId": 17,
    "stageTitle": "Stage 17: Master Lexicon 17",
    "clusterId": 17,
    "clusterTitle": "Stage 17: Master Lexicon 17"
  },
  {
    "id": "w17-compelling",
    "word": "compelling",
    "phonetic": "/kəmˈpɛ.lɪŋ/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Meyakinkan / Menarik",
    "definition": "Sangat meyakinkan, menarik, atau kuat sehingga sulit diabaikan.",
    "contextSentences": [
      {
        "english": "The report provides a compelling explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang meyakinkan tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 17,
    "stageTitle": "Stage 17: Master Lexicon 17",
    "clusterId": 17,
    "clusterTitle": "Stage 17: Master Lexicon 17"
  },
  {
    "id": "w17-compensate",
    "word": "compensate",
    "phonetic": "/ˈkɑm.pənˌseɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memberi kompensasi / Mengganti rugi",
    "definition": "Memberi ganti rugi atau menyeimbangkan kekurangan/kerugian.",
    "contextSentences": [
      {
        "english": "The supplier agreed to compensate customers for the service interruption.",
        "indonesian": "Pemasok setuju memberikan kompensasi kepada pelanggan atas gangguan layanan.",
        "clozeEnglish": "The supplier agreed to ________ customers for the service interruption."
      }
    ],
    "stageId": 17,
    "stageTitle": "Stage 17: Master Lexicon 17",
    "clusterId": 17,
    "clusterTitle": "Stage 17: Master Lexicon 17"
  },
  {
    "id": "w17-compile",
    "word": "compile",
    "phonetic": "/kəmˈpaɪl/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menyusun / Menghimpun",
    "definition": "Mengumpulkan dan menyusun informasi menjadi satu dokumen/daftar.",
    "contextSentences": [
      {
        "english": "The researcher will compile the survey responses into a single dataset.",
        "indonesian": "Peneliti akan menghimpun jawaban survei ke dalam satu kumpulan data.",
        "clozeEnglish": "The researcher will ________ the survey responses into a single dataset."
      }
    ],
    "stageId": 17,
    "stageTitle": "Stage 17: Master Lexicon 17",
    "clusterId": 17,
    "clusterTitle": "Stage 17: Master Lexicon 17"
  },
  {
    "id": "w17-complacent",
    "word": "complacent",
    "phonetic": "/kəmˈpleɪ.sənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Puas diri / Lengah",
    "definition": "Terlalu puas diri sehingga kehilangan kewaspadaan atau motivasi berkembang.",
    "contextSentences": [
      {
        "english": "The team became complacent after several consecutive quarters of growth.",
        "indonesian": "Tim tersebut menjadi terlalu berpuas diri setelah mencatat pertumbuhan selama beberapa kuartal berturut-turut.",
        "clozeEnglish": "The team became ________ after several consecutive quarters of growth."
      }
    ],
    "stageId": 17,
    "stageTitle": "Stage 17: Master Lexicon 17",
    "clusterId": 17,
    "clusterTitle": "Stage 17: Master Lexicon 17"
  },
  {
    "id": "w17-complex",
    "word": "complex",
    "phonetic": "/ˈkɑm.plɛks/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Rumit / Kompleks",
    "definition": "Rumit dan terdiri dari banyak bagian yang saling terkait.",
    "contextSentences": [
      {
        "english": "The committee considered the proposal complex after reviewing all available evidence.",
        "indonesian": "Komite menilai proposal tersebut rumit setelah meninjau seluruh bukti yang tersedia.",
        "clozeEnglish": "The committee considered the proposal ________ after reviewing all available evidence."
      }
    ],
    "stageId": 17,
    "stageTitle": "Stage 17: Master Lexicon 17",
    "clusterId": 17,
    "clusterTitle": "Stage 17: Master Lexicon 17"
  },
  {
    "id": "w17-compliance",
    "word": "compliance",
    "phonetic": "/kəmˈplaɪ.əns/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Kepatuhan / Ketaatan",
    "definition": "Kepatuhan terhadap aturan, standar, atau persyaratan.",
    "contextSentences": [
      {
        "english": "The company strengthened its compliance with international reporting standards.",
        "indonesian": "Perusahaan tersebut meningkatkan kepatuhannya terhadap standar pelaporan internasional.",
        "clozeEnglish": "The company strengthened its ________ with international reporting standards."
      }
    ],
    "stageId": 17,
    "stageTitle": "Stage 17: Master Lexicon 17",
    "clusterId": 17,
    "clusterTitle": "Stage 17: Master Lexicon 17"
  },
  {
    "id": "w18-comply",
    "word": "comply",
    "phonetic": "/kəmˈplaɪ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mematuhi / Taat",
    "definition": "Mematuhi aturan, perintah, atau standar.",
    "contextSentences": [
      {
        "english": "Every supplier must comply with the updated quality standards.",
        "indonesian": "Setiap pemasok harus mematuhi standar kualitas yang telah diperbarui.",
        "clozeEnglish": "Every supplier must ________ with the updated quality standards."
      }
    ],
    "stageId": 18,
    "stageTitle": "Stage 18: Master Lexicon 18",
    "clusterId": 18,
    "clusterTitle": "Stage 18: Master Lexicon 18"
  },
  {
    "id": "w18-component",
    "word": "component",
    "phonetic": "/kəmˈpoʊ.nənt/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Komponen / Unsur",
    "definition": "Bagian atau unsur penyusun suatu sistem/benda.",
    "contextSentences": [
      {
        "english": "Data quality is a critical component of a reliable analytical system.",
        "indonesian": "Kualitas data merupakan komponen penting dari sistem analitis yang andal.",
        "clozeEnglish": "Data quality is a critical ________ of a reliable analytical system."
      }
    ],
    "stageId": 18,
    "stageTitle": "Stage 18: Master Lexicon 18",
    "clusterId": 18,
    "clusterTitle": "Stage 18: Master Lexicon 18"
  },
  {
    "id": "w18-compound",
    "word": "compound",
    "phonetic": "/ˈkɑm.paʊnd/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Senyawa / Gabungan",
    "definition": "Senyawa; gabungan beberapa unsur; sebagai verba memperburuk/memperparah.",
    "contextSentences": [
      {
        "english": "The laboratory identified the compound through a series of controlled tests.",
        "indonesian": "Laboratorium mengidentifikasi senyawa tersebut melalui serangkaian uji terkontrol.",
        "clozeEnglish": "The laboratory identified the ________ through a series of controlled tests."
      }
    ],
    "stageId": 18,
    "stageTitle": "Stage 18: Master Lexicon 18",
    "clusterId": 18,
    "clusterTitle": "Stage 18: Master Lexicon 18"
  },
  {
    "id": "w18-comprehend",
    "word": "comprehend",
    "phonetic": "/ˌkɑm.pɹiˈhɛnd/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memahami / Mengerti",
    "definition": "Memahami makna sesuatu secara menyeluruh.",
    "contextSentences": [
      {
        "english": "The team struggled to comprehend the full impact of the policy change.",
        "indonesian": "Tim tersebut kesulitan memahami dampak penuh dari perubahan kebijakan itu.",
        "clozeEnglish": "The team struggled to ________ the full impact of the policy change."
      }
    ],
    "stageId": 18,
    "stageTitle": "Stage 18: Master Lexicon 18",
    "clusterId": 18,
    "clusterTitle": "Stage 18: Master Lexicon 18"
  },
  {
    "id": "w18-comprehensive",
    "word": "comprehensive",
    "phonetic": "/ˌkɑm.pɹiˈhɛn.sɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Menyeluruh / Komprehensif",
    "definition": "Lengkap dan mencakup semua aspek penting.",
    "contextSentences": [
      {
        "english": "The report provides a comprehensive explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang menyeluruh tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 18,
    "stageTitle": "Stage 18: Master Lexicon 18",
    "clusterId": 18,
    "clusterTitle": "Stage 18: Master Lexicon 18"
  },
  {
    "id": "w18-comprise",
    "word": "comprise",
    "phonetic": "/kəmˈpɹaɪz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mencakup / Terdiri atas",
    "definition": "Terdiri atas atau mencakup beberapa bagian.",
    "contextSentences": [
      {
        "english": "The assessment will comprise three independent components.",
        "indonesian": "Penilaian tersebut akan mencakup tiga komponen yang berdiri sendiri.",
        "clozeEnglish": "The assessment will ________ three independent components."
      }
    ],
    "stageId": 18,
    "stageTitle": "Stage 18: Master Lexicon 18",
    "clusterId": 18,
    "clusterTitle": "Stage 18: Master Lexicon 18"
  },
  {
    "id": "w18-compulsory",
    "word": "compulsory",
    "phonetic": "/kəmˈpʌl.sɚ.i/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Wajib / Harus",
    "definition": "Wajib karena aturan atau ketentuan.",
    "contextSentences": [
      {
        "english": "Attendance at the safety briefing is compulsory for all contractors.",
        "indonesian": "Kehadiran dalam pengarahan keselamatan wajib bagi seluruh kontraktor.",
        "clozeEnglish": "Attendance at the safety briefing is ________ for all contractors."
      }
    ],
    "stageId": 18,
    "stageTitle": "Stage 18: Master Lexicon 18",
    "clusterId": 18,
    "clusterTitle": "Stage 18: Master Lexicon 18"
  },
  {
    "id": "w18-compute",
    "word": "compute",
    "phonetic": "/kəmpˈjut/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menghitung / Memproses",
    "definition": "Menghitung, terutama dengan komputer atau metode matematis.",
    "contextSentences": [
      {
        "english": "The software can compute the results within seconds.",
        "indonesian": "Perangkat lunak tersebut dapat menghitung hasilnya dalam hitungan detik.",
        "clozeEnglish": "The software can ________ the results within seconds."
      }
    ],
    "stageId": 18,
    "stageTitle": "Stage 18: Master Lexicon 18",
    "clusterId": 18,
    "clusterTitle": "Stage 18: Master Lexicon 18"
  },
  {
    "id": "w18-conceive",
    "word": "conceive",
    "phonetic": "/kənˈsiv/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membayangkan / Merancang",
    "definition": "Membayangkan, membentuk gagasan, atau merancang konsep.",
    "contextSentences": [
      {
        "english": "The team conceived a new approach to reduce processing time.",
        "indonesian": "Tim tersebut merancang pendekatan baru untuk mengurangi waktu pemrosesan.",
        "clozeEnglish": "The team ________d a new approach to reduce processing time."
      }
    ],
    "stageId": 18,
    "stageTitle": "Stage 18: Master Lexicon 18",
    "clusterId": 18,
    "clusterTitle": "Stage 18: Master Lexicon 18"
  },
  {
    "id": "w18-concentrate",
    "word": "concentrate",
    "phonetic": "/ˈkɑn.sənˌtɹeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Berkonsentrasi / Memusatkan",
    "definition": "Memusatkan perhatian atau usaha pada sesuatu.",
    "contextSentences": [
      {
        "english": "The analysts need to concentrate on the most material risks.",
        "indonesian": "Para analis perlu memusatkan perhatian pada risiko yang paling signifikan.",
        "clozeEnglish": "The analysts need to ________ on the most material risks."
      }
    ],
    "stageId": 18,
    "stageTitle": "Stage 18: Master Lexicon 18",
    "clusterId": 18,
    "clusterTitle": "Stage 18: Master Lexicon 18"
  },
  {
    "id": "w19-concept",
    "word": "concept",
    "phonetic": "/ˈkɑn.sɛpt/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Konsep / Gagasan",
    "definition": "Gagasan atau ide abstrak tentang sesuatu.",
    "contextSentences": [
      {
        "english": "The lecturer explained the concept through a practical example.",
        "indonesian": "Dosen tersebut menjelaskan konsep itu melalui contoh praktis.",
        "clozeEnglish": "The lecturer explained the ________ through a practical example."
      }
    ],
    "stageId": 19,
    "stageTitle": "Stage 19: Master Lexicon 19",
    "clusterId": 19,
    "clusterTitle": "Stage 19: Master Lexicon 19"
  },
  {
    "id": "w19-conciliate",
    "word": "conciliate",
    "phonetic": "/kənˈsɪl.i.eɪt/",
    "partOfSpeech": "verb",
    "cefr": "C2",
    "translation": "Mendamaikan / Menenangkan",
    "definition": "Menenangkan atau mendamaikan pihak yang berselisih.",
    "contextSentences": [
      {
        "english": "The mediator tried to conciliate both parties before formal negotiations resumed.",
        "indonesian": "Mediator berusaha mendamaikan kedua pihak sebelum negosiasi formal dilanjutkan.",
        "clozeEnglish": "The mediator tried to ________ both parties before formal negotiations resumed."
      }
    ],
    "stageId": 19,
    "stageTitle": "Stage 19: Master Lexicon 19",
    "clusterId": 19,
    "clusterTitle": "Stage 19: Master Lexicon 19"
  },
  {
    "id": "w19-conclude",
    "word": "conclude",
    "phonetic": "/kənˈklud/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menyimpulkan / Mengakhiri",
    "definition": "Menyimpulkan atau mengakhiri sesuatu.",
    "contextSentences": [
      {
        "english": "The committee will conclude the review by the end of the month.",
        "indonesian": "Komite akan mengakhiri peninjauan pada akhir bulan ini.",
        "clozeEnglish": "The committee will ________ the review by the end of the month."
      }
    ],
    "stageId": 19,
    "stageTitle": "Stage 19: Master Lexicon 19",
    "clusterId": 19,
    "clusterTitle": "Stage 19: Master Lexicon 19"
  },
  {
    "id": "w19-concur",
    "word": "concur",
    "phonetic": "/kənˈkɝ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Sepakat / Setuju",
    "definition": "Setuju atau memiliki pendapat yang sama.",
    "contextSentences": [
      {
        "english": "The reviewers concur with the assessment presented in the final report.",
        "indonesian": "Para penelaah sependapat dengan penilaian yang disampaikan dalam laporan akhir.",
        "clozeEnglish": "The reviewers ________ with the assessment presented in the final report."
      }
    ],
    "stageId": 19,
    "stageTitle": "Stage 19: Master Lexicon 19",
    "clusterId": 19,
    "clusterTitle": "Stage 19: Master Lexicon 19"
  },
  {
    "id": "w19-concurrent",
    "word": "concurrent",
    "phonetic": "/kənˈkɝ.ənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Bersamaan / Serentak",
    "definition": "Terjadi pada waktu yang bersamaan.",
    "contextSentences": [
      {
        "english": "The system can process concurrent requests without delays.",
        "indonesian": "Sistem tersebut dapat memproses permintaan secara bersamaan tanpa keterlambatan.",
        "clozeEnglish": "The system can process ________ requests without delays."
      }
    ],
    "stageId": 19,
    "stageTitle": "Stage 19: Master Lexicon 19",
    "clusterId": 19,
    "clusterTitle": "Stage 19: Master Lexicon 19"
  },
  {
    "id": "w19-condone",
    "word": "condone",
    "phonetic": "/kənˈdoʊn/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membiarkan / Menoleransi",
    "definition": "Membiarkan atau menerima perilaku salah tanpa mengecam/menghukum.",
    "contextSentences": [
      {
        "english": "The company does not condone the misuse of confidential data.",
        "indonesian": "Perusahaan tidak membenarkan penyalahgunaan data rahasia.",
        "clozeEnglish": "The company does not ________ the misuse of confidential data."
      }
    ],
    "stageId": 19,
    "stageTitle": "Stage 19: Master Lexicon 19",
    "clusterId": 19,
    "clusterTitle": "Stage 19: Master Lexicon 19"
  },
  {
    "id": "w19-conducive",
    "word": "conducive",
    "phonetic": "/kənˈdu.sɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Mendukung / Menunjang",
    "definition": "Menciptakan kondisi yang mendukung sesuatu terjadi/berkembang.",
    "contextSentences": [
      {
        "english": "A quiet workspace is conducive to focused analytical work.",
        "indonesian": "Ruang kerja yang tenang mendukung pekerjaan analitis yang membutuhkan konsentrasi.",
        "clozeEnglish": "A quiet workspace is ________ to focused analytical work."
      }
    ],
    "stageId": 19,
    "stageTitle": "Stage 19: Master Lexicon 19",
    "clusterId": 19,
    "clusterTitle": "Stage 19: Master Lexicon 19"
  },
  {
    "id": "w19-conduct",
    "word": "conduct",
    "phonetic": "/ˈkɑn.dəkt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Melaksanakan / Memimpin",
    "definition": "Melaksanakan atau memimpin kegiatan; sebagai nomina berarti perilaku.",
    "contextSentences": [
      {
        "english": "The institute will conduct an independent evaluation of the program.",
        "indonesian": "Lembaga tersebut akan melaksanakan evaluasi independen terhadap program itu.",
        "clozeEnglish": "The institute will ________ an independent evaluation of the program."
      }
    ],
    "stageId": 19,
    "stageTitle": "Stage 19: Master Lexicon 19",
    "clusterId": 19,
    "clusterTitle": "Stage 19: Master Lexicon 19"
  },
  {
    "id": "w19-confer",
    "word": "confer",
    "phonetic": "/kənˈfɝ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Berunding / Berkonsultasi",
    "definition": "Berdiskusi/berunding sebelum mengambil keputusan; juga memberikan gelar/hak.",
    "contextSentences": [
      {
        "english": "The directors will confer with legal advisers before making a decision.",
        "indonesian": "Para direktur akan berkonsultasi dengan penasihat hukum sebelum mengambil keputusan.",
        "clozeEnglish": "The directors will ________ with legal advisers before making a decision."
      }
    ],
    "stageId": 19,
    "stageTitle": "Stage 19: Master Lexicon 19",
    "clusterId": 19,
    "clusterTitle": "Stage 19: Master Lexicon 19"
  },
  {
    "id": "w19-confine",
    "word": "confine",
    "phonetic": "/kənˈfaɪn/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membatasi / Mengurung",
    "definition": "Membatasi atau menahan seseorang/sesuatu dalam ruang lingkup tertentu.",
    "contextSentences": [
      {
        "english": "The report confines its analysis to data collected during the pilot phase.",
        "indonesian": "Laporan tersebut membatasi analisisnya pada data yang dikumpulkan selama tahap uji coba.",
        "clozeEnglish": "The report ________s its analysis to data collected during the pilot phase."
      }
    ],
    "stageId": 19,
    "stageTitle": "Stage 19: Master Lexicon 19",
    "clusterId": 19,
    "clusterTitle": "Stage 19: Master Lexicon 19"
  },
  {
    "id": "w20-confirm",
    "word": "confirm",
    "phonetic": "/kənˈfɝm/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memastikan / Mengonfirmasi",
    "definition": "Memastikan atau menyatakan bahwa informasi benar.",
    "contextSentences": [
      {
        "english": "The team must confirm the figures before publication.",
        "indonesian": "Tim tersebut harus memastikan angka-angka itu sebelum diterbitkan.",
        "clozeEnglish": "The team must ________ the figures before publication."
      }
    ],
    "stageId": 20,
    "stageTitle": "Stage 20: Master Lexicon 20",
    "clusterId": 20,
    "clusterTitle": "Stage 20: Master Lexicon 20"
  },
  {
    "id": "w20-conflict",
    "word": "conflict",
    "phonetic": "/ˈkɑn.flɪkt/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Konflik / Pertentangan",
    "definition": "Pertentangan atau perselisihan antara orang, ide, atau kepentingan.",
    "contextSentences": [
      {
        "english": "The conflict delayed the negotiations for several months.",
        "indonesian": "Konflik tersebut menunda negosiasi selama beberapa bulan.",
        "clozeEnglish": "The ________ delayed the negotiations for several months."
      }
    ],
    "stageId": 20,
    "stageTitle": "Stage 20: Master Lexicon 20",
    "clusterId": 20,
    "clusterTitle": "Stage 20: Master Lexicon 20"
  },
  {
    "id": "w20-conform",
    "word": "conform",
    "phonetic": "/kənˈfɔɹm/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mematuhi / Menyesuaikan",
    "definition": "Menyesuaikan diri dengan aturan atau standar.",
    "contextSentences": [
      {
        "english": "All test results must conform to the approved measurement standard.",
        "indonesian": "Semua hasil pengujian harus sesuai dengan standar pengukuran yang disetujui.",
        "clozeEnglish": "All test results must ________ to the approved measurement standard."
      }
    ],
    "stageId": 20,
    "stageTitle": "Stage 20: Master Lexicon 20",
    "clusterId": 20,
    "clusterTitle": "Stage 20: Master Lexicon 20"
  },
  {
    "id": "w20-conscientious",
    "word": "conscientious",
    "phonetic": "/ˌkɑn.ʃiˈɛn.ʃəs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Teliti / Bertanggung jawab",
    "definition": "Bersungguh-sungguh, bertanggung jawab, dan cermat dalam menjalankan tugas.",
    "contextSentences": [
      {
        "english": "A conscientious auditor verifies every figure before approving the report.",
        "indonesian": "Auditor yang bertanggung jawab dan cermat memeriksa setiap angka sebelum menyetujui laporan.",
        "clozeEnglish": "A ________ auditor verifies every figure before approving the report."
      }
    ],
    "stageId": 20,
    "stageTitle": "Stage 20: Master Lexicon 20",
    "clusterId": 20,
    "clusterTitle": "Stage 20: Master Lexicon 20"
  },
  {
    "id": "w20-consent",
    "word": "consent",
    "phonetic": "/kənˈsɛnt/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Persetujuan / Izin",
    "definition": "Persetujuan atau izin yang diberikan secara sadar.",
    "contextSentences": [
      {
        "english": "Researchers obtained informed consent from every participant.",
        "indonesian": "Para peneliti memperoleh persetujuan berdasarkan informasi dari setiap peserta.",
        "clozeEnglish": "Researchers obtained informed ________ from every participant."
      }
    ],
    "stageId": 20,
    "stageTitle": "Stage 20: Master Lexicon 20",
    "clusterId": 20,
    "clusterTitle": "Stage 20: Master Lexicon 20"
  },
  {
    "id": "w20-consequent",
    "word": "consequent",
    "phonetic": "/ˈkɑn.sə.kwənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Sebagai akibat / Konsekuen",
    "definition": "Terjadi sebagai akibat dari sesuatu.",
    "contextSentences": [
      {
        "english": "The consequent delays affected the final delivery date.",
        "indonesian": "Keterlambatan yang terjadi sebagai akibatnya memengaruhi tanggal pengiriman akhir.",
        "clozeEnglish": "The ________ delays affected the final delivery date."
      }
    ],
    "stageId": 20,
    "stageTitle": "Stage 20: Master Lexicon 20",
    "clusterId": 20,
    "clusterTitle": "Stage 20: Master Lexicon 20"
  },
  {
    "id": "w20-considerable",
    "word": "considerable",
    "phonetic": "/kənˈsɪ.dɚ.ə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Signifikan / Cukup besar",
    "definition": "Cukup besar atau penting dalam jumlah/tingkat/pengaruh.",
    "contextSentences": [
      {
        "english": "The project requires considerable investment in infrastructure.",
        "indonesian": "Proyek tersebut membutuhkan investasi yang cukup besar dalam infrastruktur.",
        "clozeEnglish": "The project requires ________ investment in infrastructure."
      }
    ],
    "stageId": 20,
    "stageTitle": "Stage 20: Master Lexicon 20",
    "clusterId": 20,
    "clusterTitle": "Stage 20: Master Lexicon 20"
  },
  {
    "id": "w20-consist",
    "word": "consist",
    "phonetic": "/kənˈsɪst/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Terdiri atas / Berisi",
    "definition": "Terdiri atas; umumnya diikuti preposisi of.",
    "contextSentences": [
      {
        "english": "The training program will consist of three practical modules.",
        "indonesian": "Program pelatihan akan terdiri atas tiga modul praktis.",
        "clozeEnglish": "The training program will ________ of three practical modules."
      }
    ],
    "stageId": 20,
    "stageTitle": "Stage 20: Master Lexicon 20",
    "clusterId": 20,
    "clusterTitle": "Stage 20: Master Lexicon 20"
  },
  {
    "id": "w20-conspicuous",
    "word": "conspicuous",
    "phonetic": "/kənˈspɪ.kju.əs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Mencolok / Menonjol",
    "definition": "Mencolok dan mudah terlihat/menarik perhatian.",
    "contextSentences": [
      {
        "english": "A conspicuous error in the report was corrected before publication.",
        "indonesian": "Kesalahan yang mencolok dalam laporan tersebut diperbaiki sebelum diterbitkan.",
        "clozeEnglish": "A ________ error in the report was corrected before publication."
      }
    ],
    "stageId": 20,
    "stageTitle": "Stage 20: Master Lexicon 20",
    "clusterId": 20,
    "clusterTitle": "Stage 20: Master Lexicon 20"
  },
  {
    "id": "w20-constant",
    "word": "constant",
    "phonetic": "/ˈkɑn.stənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Tetap / Terus-menerus",
    "definition": "Terus-menerus atau tidak berubah.",
    "contextSentences": [
      {
        "english": "The system requires constant monitoring to detect errors early.",
        "indonesian": "Sistem tersebut memerlukan pemantauan terus-menerus untuk mendeteksi kesalahan sejak dini.",
        "clozeEnglish": "The system requires ________ monitoring to detect errors early."
      }
    ],
    "stageId": 20,
    "stageTitle": "Stage 20: Master Lexicon 20",
    "clusterId": 20,
    "clusterTitle": "Stage 20: Master Lexicon 20"
  },
  {
    "id": "w21-constitute",
    "word": "constitute",
    "phonetic": "/ˈkɑn.stəˌtut/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membentuk / Menyusun",
    "definition": "Membentuk, menyusun, atau dianggap sebagai bagian dari sesuatu.",
    "contextSentences": [
      {
        "english": "These findings constitute strong evidence of a broader trend.",
        "indonesian": "Temuan-temuan ini merupakan bukti kuat dari tren yang lebih luas.",
        "clozeEnglish": "These findings ________ strong evidence of a broader trend."
      }
    ],
    "stageId": 21,
    "stageTitle": "Stage 21: Master Lexicon 21",
    "clusterId": 21,
    "clusterTitle": "Stage 21: Master Lexicon 21"
  },
  {
    "id": "w21-constraint",
    "word": "constraint",
    "phonetic": "/kənˈstɹeɪnt/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Kendala / Batasan",
    "definition": "Kendala atau batasan yang membatasi tindakan/sumber daya.",
    "contextSentences": [
      {
        "english": "A limited budget remains the main constraint on the project.",
        "indonesian": "Anggaran yang terbatas masih menjadi kendala utama proyek tersebut.",
        "clozeEnglish": "A limited budget remains the main ________ on the project."
      }
    ],
    "stageId": 21,
    "stageTitle": "Stage 21: Master Lexicon 21",
    "clusterId": 21,
    "clusterTitle": "Stage 21: Master Lexicon 21"
  },
  {
    "id": "w21-construct",
    "word": "construct",
    "phonetic": "/kənˈstɹʌkt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Membangun / Menyusun",
    "definition": "Membangun secara fisik atau menyusun gagasan/argumen.",
    "contextSentences": [
      {
        "english": "The engineers will construct a model to test the proposed design.",
        "indonesian": "Para insinyur akan membangun model untuk menguji desain yang diusulkan.",
        "clozeEnglish": "The engineers will ________ a model to test the proposed design."
      }
    ],
    "stageId": 21,
    "stageTitle": "Stage 21: Master Lexicon 21",
    "clusterId": 21,
    "clusterTitle": "Stage 21: Master Lexicon 21"
  },
  {
    "id": "w21-crucial",
    "word": "crucial",
    "phonetic": "/ˈkɹu.ʃəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Krusial / Sangat penting",
    "definition": "Sangat penting dan menentukan hasil.",
    "contextSentences": [
      {
        "english": "Accurate documentation is crucial to reproducible research.",
        "indonesian": "Dokumentasi yang akurat sangat penting bagi penelitian yang dapat direplikasi.",
        "clozeEnglish": "Accurate documentation is ________ to reproducible research."
      }
    ],
    "stageId": 21,
    "stageTitle": "Stage 21: Master Lexicon 21",
    "clusterId": 21,
    "clusterTitle": "Stage 21: Master Lexicon 21"
  },
  {
    "id": "w21-deceptive",
    "word": "deceptive",
    "phonetic": "/dɪˈsɛp.tɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Menyesatkan / Menipu",
    "definition": "Menyesatkan atau memberikan kesan yang tidak sesuai kenyataan.",
    "contextSentences": [
      {
        "english": "The report provides a deceptive explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang menyesatkan tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 21,
    "stageTitle": "Stage 21: Master Lexicon 21",
    "clusterId": 21,
    "clusterTitle": "Stage 21: Master Lexicon 21"
  },
  {
    "id": "w21-decisive",
    "word": "decisive",
    "phonetic": "/dɪˈsaɪ.sɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Tegas / Menentukan",
    "definition": "Tegas dan mampu mengambil keputusan; juga menentukan hasil.",
    "contextSentences": [
      {
        "english": "The manager took decisive action after reviewing the evidence.",
        "indonesian": "Manajer mengambil tindakan tegas setelah meninjau bukti.",
        "clozeEnglish": "The manager took ________ action after reviewing the evidence."
      }
    ],
    "stageId": 21,
    "stageTitle": "Stage 21: Master Lexicon 21",
    "clusterId": 21,
    "clusterTitle": "Stage 21: Master Lexicon 21"
  },
  {
    "id": "w21-deduce",
    "word": "deduce",
    "phonetic": "/dɪˈdus/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menyimpulkan / Menalar",
    "definition": "Menarik kesimpulan secara logis dari bukti/informasi.",
    "contextSentences": [
      {
        "english": "From the transaction pattern, the analyst could deduce the likely source of the error.",
        "indonesian": "Dari pola transaksi tersebut, analis dapat menyimpulkan kemungkinan sumber kesalahan.",
        "clozeEnglish": "From the transaction pattern, the analyst could ________ the likely source of the error."
      }
    ],
    "stageId": 21,
    "stageTitle": "Stage 21: Master Lexicon 21",
    "clusterId": 21,
    "clusterTitle": "Stage 21: Master Lexicon 21"
  },
  {
    "id": "w21-deficient",
    "word": "deficient",
    "phonetic": "/dɪˈfɪ.ʃənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Kurang / Tidak memadai",
    "definition": "Kurang atau tidak mencukupi standar/kebutuhan.",
    "contextSentences": [
      {
        "english": "The proposal was deficient in its treatment of operational risk.",
        "indonesian": "Proposal tersebut kurang memadai dalam membahas risiko operasional.",
        "clozeEnglish": "The proposal was ________ in its treatment of operational risk."
      }
    ],
    "stageId": 21,
    "stageTitle": "Stage 21: Master Lexicon 21",
    "clusterId": 21,
    "clusterTitle": "Stage 21: Master Lexicon 21"
  },
  {
    "id": "w21-deficit",
    "word": "deficit",
    "phonetic": "/ˈdɛ.fə.sət/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Kekurangan / Defisit",
    "definition": "Kekurangan atau selisih negatif antara kebutuhan dan jumlah tersedia.",
    "contextSentences": [
      {
        "english": "The annual report revealed a significant deficit in the operating budget.",
        "indonesian": "Laporan tahunan mengungkap kekurangan yang signifikan dalam anggaran operasional.",
        "clozeEnglish": "The annual report revealed a significant ________ in the operating budget."
      }
    ],
    "stageId": 21,
    "stageTitle": "Stage 21: Master Lexicon 21",
    "clusterId": 21,
    "clusterTitle": "Stage 21: Master Lexicon 21"
  },
  {
    "id": "w21-depict",
    "word": "depict",
    "phonetic": "/dɪˈpɪkt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menggambarkan / Melukiskan",
    "definition": "Menggambarkan melalui kata, gambar, film, atau bentuk seni.",
    "contextSentences": [
      {
        "english": "The chart depicts changes in demand over the last five years.",
        "indonesian": "Grafik tersebut menggambarkan perubahan permintaan selama lima tahun terakhir.",
        "clozeEnglish": "The chart ________s changes in demand over the last five years."
      }
    ],
    "stageId": 21,
    "stageTitle": "Stage 21: Master Lexicon 21",
    "clusterId": 21,
    "clusterTitle": "Stage 21: Master Lexicon 21"
  },
  {
    "id": "w22-deprive",
    "word": "deprive",
    "phonetic": "/dɪˈpɹaɪv/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Merampas / Menghalangi",
    "definition": "Menghalangi seseorang memperoleh sesuatu yang dibutuhkan/haknya.",
    "contextSentences": [
      {
        "english": "A system outage could deprive remote staff of access to essential records.",
        "indonesian": "Gangguan sistem dapat membuat staf jarak jauh kehilangan akses ke catatan penting.",
        "clozeEnglish": "A system outage could ________ remote staff of access to essential records."
      }
    ],
    "stageId": 22,
    "stageTitle": "Stage 22: Master Lexicon 22",
    "clusterId": 22,
    "clusterTitle": "Stage 22: Master Lexicon 22"
  },
  {
    "id": "w22-derive",
    "word": "derive",
    "phonetic": "/dɚˈaɪv/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memperoleh / Berasal",
    "definition": "Mendapatkan atau berasal dari suatu sumber.",
    "contextSentences": [
      {
        "english": "The team derives useful insights from the customer feedback.",
        "indonesian": "Tim memperoleh wawasan yang berguna dari umpan balik pelanggan.",
        "clozeEnglish": "The team ________s useful insights from the customer feedback."
      }
    ],
    "stageId": 22,
    "stageTitle": "Stage 22: Master Lexicon 22",
    "clusterId": 22,
    "clusterTitle": "Stage 22: Master Lexicon 22"
  },
  {
    "id": "w22-designate",
    "word": "designate",
    "phonetic": "/ˈdɛ.zəɡˌneɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menunjuk / Menetapkan",
    "definition": "Menetapkan atau menunjuk untuk fungsi/status tertentu.",
    "contextSentences": [
      {
        "english": "The director will designate one analyst to oversee data quality.",
        "indonesian": "Direktur akan menunjuk seorang analis untuk mengawasi kualitas data.",
        "clozeEnglish": "The director will ________ one analyst to oversee data quality."
      }
    ],
    "stageId": 22,
    "stageTitle": "Stage 22: Master Lexicon 22",
    "clusterId": 22,
    "clusterTitle": "Stage 22: Master Lexicon 22"
  },
  {
    "id": "w22-deteriorate",
    "word": "deteriorate",
    "phonetic": "/dɪˈtɪ.ɹi.ɚˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memburuk / Merosot",
    "definition": "Menjadi semakin buruk secara bertahap.",
    "contextSentences": [
      {
        "english": "Road conditions began to deteriorate after several days of heavy rain.",
        "indonesian": "Kondisi jalan mulai memburuk setelah beberapa hari hujan deras.",
        "clozeEnglish": "Road conditions began to ________ after several days of heavy rain."
      }
    ],
    "stageId": 22,
    "stageTitle": "Stage 22: Master Lexicon 22",
    "clusterId": 22,
    "clusterTitle": "Stage 22: Master Lexicon 22"
  },
  {
    "id": "w22-deterrent",
    "word": "deterrent",
    "phonetic": "/dɪˈtɝ.ɹənt/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Pencegah / Penghalang",
    "definition": "Faktor yang mencegah tindakan karena adanya konsekuensi.",
    "contextSentences": [
      {
        "english": "The audit requirement acts as a deterrent against careless reporting.",
        "indonesian": "Persyaratan audit berfungsi sebagai pencegah pelaporan yang ceroboh.",
        "clozeEnglish": "The audit requirement acts as a ________ against careless reporting."
      }
    ],
    "stageId": 22,
    "stageTitle": "Stage 22: Master Lexicon 22",
    "clusterId": 22,
    "clusterTitle": "Stage 22: Master Lexicon 22"
  },
  {
    "id": "w22-detrimental",
    "word": "detrimental",
    "phonetic": "/ˌdɛ.tɹəˈmɛn.təl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Merugikan / Merusak",
    "definition": "Merugikan atau memberikan dampak buruk.",
    "contextSentences": [
      {
        "english": "Poor data quality can be detrimental to the credibility of a study.",
        "indonesian": "Kualitas data yang buruk dapat merugikan kredibilitas suatu penelitian.",
        "clozeEnglish": "Poor data quality can be ________ to the credibility of a study."
      }
    ],
    "stageId": 22,
    "stageTitle": "Stage 22: Master Lexicon 22",
    "clusterId": 22,
    "clusterTitle": "Stage 22: Master Lexicon 22"
  },
  {
    "id": "w22-deviate",
    "word": "deviate",
    "phonetic": "/ˈdi.viˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menyimpang / Melenceng",
    "definition": "Menyimpang dari jalur, rencana, standar, atau kebiasaan.",
    "contextSentences": [
      {
        "english": "The project team must not deviate from the approved safety protocol.",
        "indonesian": "Tim proyek tidak boleh menyimpang dari protokol keselamatan yang telah disetujui.",
        "clozeEnglish": "The project team must not ________ from the approved safety protocol."
      }
    ],
    "stageId": 22,
    "stageTitle": "Stage 22: Master Lexicon 22",
    "clusterId": 22,
    "clusterTitle": "Stage 22: Master Lexicon 22"
  },
  {
    "id": "w22-deviation",
    "word": "deviation",
    "phonetic": "/ˌdi.viˈeɪ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Penyimpangan / Deviasi",
    "definition": "Penyimpangan dari standar atau pola yang diharapkan.",
    "contextSentences": [
      {
        "english": "Any deviation from the approved procedure must be documented.",
        "indonesian": "Setiap penyimpangan dari prosedur yang disetujui harus didokumentasikan.",
        "clozeEnglish": "Any ________ from the approved procedure must be documented."
      }
    ],
    "stageId": 22,
    "stageTitle": "Stage 22: Master Lexicon 22",
    "clusterId": 22,
    "clusterTitle": "Stage 22: Master Lexicon 22"
  },
  {
    "id": "w22-devise",
    "word": "devise",
    "phonetic": "/dɪˈvaɪz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Merancang / Menciptakan",
    "definition": "Merancang atau menemukan rencana/metode setelah berpikir.",
    "contextSentences": [
      {
        "english": "The team devised a method to reduce processing errors.",
        "indonesian": "Tim tersebut merancang metode untuk mengurangi kesalahan pemrosesan.",
        "clozeEnglish": "The team ________d a method to reduce processing errors."
      }
    ],
    "stageId": 22,
    "stageTitle": "Stage 22: Master Lexicon 22",
    "clusterId": 22,
    "clusterTitle": "Stage 22: Master Lexicon 22"
  },
  {
    "id": "w22-dilemma",
    "word": "dilemma",
    "phonetic": "/dɪˈlɛ.mə/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Dilema / Pilihan sulit",
    "definition": "Situasi sulit yang mengharuskan memilih di antara pilihan yang sama-sama tidak mudah.",
    "contextSentences": [
      {
        "english": "The manager faced a dilemma when both options carried serious risks.",
        "indonesian": "Manajer menghadapi dilema ketika kedua pilihan memiliki risiko serius.",
        "clozeEnglish": "The manager faced a ________ when both options carried serious risks."
      }
    ],
    "stageId": 22,
    "stageTitle": "Stage 22: Master Lexicon 22",
    "clusterId": 22,
    "clusterTitle": "Stage 22: Master Lexicon 22"
  },
  {
    "id": "w23-diligence",
    "word": "diligence",
    "phonetic": "/ˈdɪ.lə.dʒəns/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Ketekunan / Ketelitian",
    "definition": "Ketekunan dan kehati-hatian dalam melakukan pekerjaan.",
    "contextSentences": [
      {
        "english": "Her diligence ensured that every figure was checked before publication.",
        "indonesian": "Ketekunannya memastikan setiap angka diperiksa sebelum diterbitkan.",
        "clozeEnglish": "Her ________ ensured that every figure was checked before publication."
      }
    ],
    "stageId": 23,
    "stageTitle": "Stage 23: Master Lexicon 23",
    "clusterId": 23,
    "clusterTitle": "Stage 23: Master Lexicon 23"
  },
  {
    "id": "w23-diligent",
    "word": "diligent",
    "phonetic": "/ˈdɪ.lɪ.dʒənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Tekun / Rajin",
    "definition": "Rajin, tekun, dan bekerja dengan penuh perhatian.",
    "contextSentences": [
      {
        "english": "Diligent researchers document their methods so others can reproduce the study.",
        "indonesian": "Peneliti yang tekun mendokumentasikan metode mereka agar peneliti lain dapat mengulangi studi tersebut.",
        "clozeEnglish": "________ researchers document their methods so others can reproduce the study."
      }
    ],
    "stageId": 23,
    "stageTitle": "Stage 23: Master Lexicon 23",
    "clusterId": 23,
    "clusterTitle": "Stage 23: Master Lexicon 23"
  },
  {
    "id": "w23-diminish",
    "word": "diminish",
    "phonetic": "/dɪˈmɪ.nɪʃ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengurangi / Menyusut",
    "definition": "Berkurang atau membuat sesuatu menjadi lebih kecil/lemah.",
    "contextSentences": [
      {
        "english": "The new controls may diminish the risk of unauthorized access.",
        "indonesian": "Pengendalian baru tersebut dapat mengurangi risiko akses tanpa izin.",
        "clozeEnglish": "The new controls may ________ the risk of unauthorized access."
      }
    ],
    "stageId": 23,
    "stageTitle": "Stage 23: Master Lexicon 23",
    "clusterId": 23,
    "clusterTitle": "Stage 23: Master Lexicon 23"
  },
  {
    "id": "w23-discern",
    "word": "discern",
    "phonetic": "/dɪˈsɝn/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membedakan / Mengenali",
    "definition": "Mengenali atau membedakan sesuatu yang samar melalui pengamatan/penilaian.",
    "contextSentences": [
      {
        "english": "The analyst struggled to discern a meaningful pattern in the small dataset.",
        "indonesian": "Analis kesulitan mengenali pola yang bermakna dalam kumpulan data yang kecil.",
        "clozeEnglish": "The analyst struggled to ________ a meaningful pattern in the small dataset."
      }
    ],
    "stageId": 23,
    "stageTitle": "Stage 23: Master Lexicon 23",
    "clusterId": 23,
    "clusterTitle": "Stage 23: Master Lexicon 23"
  },
  {
    "id": "w23-discreet",
    "word": "discreet",
    "phonetic": "/dɪˈskɹit/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Bijaksana / Berhati-hati",
    "definition": "Berhati-hati agar tidak menarik perhatian atau membocorkan informasi pribadi.",
    "contextSentences": [
      {
        "english": "The adviser made a discreet inquiry to protect the client's privacy.",
        "indonesian": "Penasihat tersebut mengajukan pertanyaan secara hati-hati untuk melindungi privasi klien.",
        "clozeEnglish": "The adviser made a ________ inquiry to protect the client's privacy."
      }
    ],
    "stageId": 23,
    "stageTitle": "Stage 23: Master Lexicon 23",
    "clusterId": 23,
    "clusterTitle": "Stage 23: Master Lexicon 23"
  },
  {
    "id": "w23-discrepancy",
    "word": "discrepancy",
    "phonetic": "/dɪˈskɹɛ.pən.si/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Ketidaksesuaian / Selisih",
    "definition": "Perbedaan/ketidaksesuaian antara dua data atau fakta yang seharusnya selaras.",
    "contextSentences": [
      {
        "english": "The auditor investigated a discrepancy between the two financial statements.",
        "indonesian": "Auditor menyelidiki ketidaksesuaian antara kedua laporan keuangan tersebut.",
        "clozeEnglish": "The auditor investigated a ________ between the two financial statements."
      }
    ],
    "stageId": 23,
    "stageTitle": "Stage 23: Master Lexicon 23",
    "clusterId": 23,
    "clusterTitle": "Stage 23: Master Lexicon 23"
  },
  {
    "id": "w23-dispute",
    "word": "dispute",
    "phonetic": "/dɪspˈjut/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Perselisihan / Sengketa",
    "definition": "Perselisihan atau perdebatan; sebagai verba berarti memperdebatkan.",
    "contextSentences": [
      {
        "english": "The dispute was resolved after both parties agreed to independent mediation.",
        "indonesian": "Perselisihan itu diselesaikan setelah kedua pihak menyetujui mediasi independen.",
        "clozeEnglish": "The ________ was resolved after both parties agreed to independent mediation."
      }
    ],
    "stageId": 23,
    "stageTitle": "Stage 23: Master Lexicon 23",
    "clusterId": 23,
    "clusterTitle": "Stage 23: Master Lexicon 23"
  },
  {
    "id": "w23-disrupt",
    "word": "disrupt",
    "phonetic": "/dɪsˈɹʌpt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengganggu / Mengacaukan",
    "definition": "Mengganggu atau menghentikan kelancaran suatu proses.",
    "contextSentences": [
      {
        "english": "A network failure could disrupt the entire reporting process.",
        "indonesian": "Kegagalan jaringan dapat mengganggu seluruh proses pelaporan.",
        "clozeEnglish": "A network failure could ________ the entire reporting process."
      }
    ],
    "stageId": 23,
    "stageTitle": "Stage 23: Master Lexicon 23",
    "clusterId": 23,
    "clusterTitle": "Stage 23: Master Lexicon 23"
  },
  {
    "id": "w23-disseminate",
    "word": "disseminate",
    "phonetic": "/dɪˈsɛ.məˌneɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menyebarkan / Menyebarluaskan",
    "definition": "Menyebarluaskan informasi/pengetahuan kepada banyak orang.",
    "contextSentences": [
      {
        "english": "The agency will disseminate the findings through its public research portal.",
        "indonesian": "Lembaga tersebut akan menyebarluaskan temuan melalui portal riset publiknya.",
        "clozeEnglish": "The agency will ________ the findings through its public research portal."
      }
    ],
    "stageId": 23,
    "stageTitle": "Stage 23: Master Lexicon 23",
    "clusterId": 23,
    "clusterTitle": "Stage 23: Master Lexicon 23"
  },
  {
    "id": "w23-distinct",
    "word": "distinct",
    "phonetic": "/dɪˈstɪŋkt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Berbeda / Jelas",
    "definition": "Jelas berbeda dan mudah dibedakan.",
    "contextSentences": [
      {
        "english": "The analysis revealed a distinct difference between the two groups.",
        "indonesian": "Analisis tersebut mengungkap perbedaan yang jelas antara kedua kelompok.",
        "clozeEnglish": "The analysis revealed a ________ difference between the two groups."
      }
    ],
    "stageId": 23,
    "stageTitle": "Stage 23: Master Lexicon 23",
    "clusterId": 23,
    "clusterTitle": "Stage 23: Master Lexicon 23"
  },
  {
    "id": "w24-distort",
    "word": "distort",
    "phonetic": "/dɪˈstɔɹt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memutarbalikkan / Menyimpangkan",
    "definition": "Memutarbalikkan atau mengubah bentuk/makna sehingga tidak akurat.",
    "contextSentences": [
      {
        "english": "Selective reporting can distort the interpretation of the results.",
        "indonesian": "Pelaporan yang selektif dapat menyimpangkan penafsiran hasil.",
        "clozeEnglish": "Selective reporting can ________ the interpretation of the results."
      }
    ],
    "stageId": 24,
    "stageTitle": "Stage 24: Master Lexicon 24",
    "clusterId": 24,
    "clusterTitle": "Stage 24: Master Lexicon 24"
  },
  {
    "id": "w24-distortion",
    "word": "distortion",
    "phonetic": "/dɪˈstɔɹ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Distorsi / Penyimpangan",
    "definition": "Perubahan bentuk/makna asli yang membuatnya tidak akurat.",
    "contextSentences": [
      {
        "english": "The journalist corrected the distortion in the original report.",
        "indonesian": "Jurnalis tersebut memperbaiki penyimpangan dalam laporan asli.",
        "clozeEnglish": "The journalist corrected the ________ in the original report."
      }
    ],
    "stageId": 24,
    "stageTitle": "Stage 24: Master Lexicon 24",
    "clusterId": 24,
    "clusterTitle": "Stage 24: Master Lexicon 24"
  },
  {
    "id": "w24-elaborate",
    "word": "elaborate",
    "phonetic": "/ɪˈlæ.bɹət/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Merinci / Menjelaskan",
    "definition": "Menjelaskan lebih rinci; sebagai adjektiva berarti rumit/terperinci.",
    "contextSentences": [
      {
        "english": "The researcher was asked to elaborate on the limitations of the study.",
        "indonesian": "Peneliti diminta menjelaskan secara lebih rinci keterbatasan studi tersebut.",
        "clozeEnglish": "The researcher was asked to ________ on the limitations of the study."
      }
    ],
    "stageId": 24,
    "stageTitle": "Stage 24: Master Lexicon 24",
    "clusterId": 24,
    "clusterTitle": "Stage 24: Master Lexicon 24"
  },
  {
    "id": "w24-elicit",
    "word": "elicit",
    "phonetic": "/ɪˈlɪ.sɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memancing / Memunculkan",
    "definition": "Memunculkan atau memancing respons, informasi, atau emosi.",
    "contextSentences": [
      {
        "english": "The interviewer used open questions to elicit detailed responses.",
        "indonesian": "Pewawancara menggunakan pertanyaan terbuka untuk memancing jawaban yang terperinci.",
        "clozeEnglish": "The interviewer used open questions to ________ detailed responses."
      }
    ],
    "stageId": 24,
    "stageTitle": "Stage 24: Master Lexicon 24",
    "clusterId": 24,
    "clusterTitle": "Stage 24: Master Lexicon 24"
  },
  {
    "id": "w24-eloquent",
    "word": "eloquent",
    "phonetic": "/ˈɛ.lə.kwənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Fasih / Pandai bicara",
    "definition": "Fasih dan mampu menyampaikan gagasan secara meyakinkan.",
    "contextSentences": [
      {
        "english": "The researcher gave an eloquent explanation of the results.",
        "indonesian": "Peneliti tersebut memberikan penjelasan yang fasih dan meyakinkan tentang hasil penelitian.",
        "clozeEnglish": "The researcher gave an ________ explanation of the results."
      }
    ],
    "stageId": 24,
    "stageTitle": "Stage 24: Master Lexicon 24",
    "clusterId": 24,
    "clusterTitle": "Stage 24: Master Lexicon 24"
  },
  {
    "id": "w24-elusive",
    "word": "elusive",
    "phonetic": "/ɪˈlu.sɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Sulit dicapai / Sukar dipahami",
    "definition": "Sulit ditemukan, dicapai, ditangkap, atau dipahami.",
    "contextSentences": [
      {
        "english": "A reliable solution remained elusive despite months of testing.",
        "indonesian": "Solusi yang andal tetap sulit ditemukan meskipun pengujian telah berlangsung selama berbulan-bulan.",
        "clozeEnglish": "A reliable solution remained ________ despite months of testing."
      }
    ],
    "stageId": 24,
    "stageTitle": "Stage 24: Master Lexicon 24",
    "clusterId": 24,
    "clusterTitle": "Stage 24: Master Lexicon 24"
  },
  {
    "id": "w24-embody",
    "word": "embody",
    "phonetic": "/ɪmˈbɑ.di/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mewujudkan / Melambangkan",
    "definition": "Mewujudkan atau menjadi contoh nyata suatu kualitas/ide.",
    "contextSentences": [
      {
        "english": "The organization aims to embody its core values in every policy.",
        "indonesian": "Organisasi tersebut berupaya mewujudkan nilai-nilai intinya dalam setiap kebijakan.",
        "clozeEnglish": "The organization aims to ________ its core values in every policy."
      }
    ],
    "stageId": 24,
    "stageTitle": "Stage 24: Master Lexicon 24",
    "clusterId": 24,
    "clusterTitle": "Stage 24: Master Lexicon 24"
  },
  {
    "id": "w24-empathy",
    "word": "empathy",
    "phonetic": "/ˈɛm.pə.θi/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Empati / Kepedulian",
    "definition": "Kemampuan memahami dan ikut merasakan perasaan/sudut pandang orang lain.",
    "contextSentences": [
      {
        "english": "Managers need empathy to understand the concerns of their employees.",
        "indonesian": "Manajer membutuhkan empati untuk memahami kekhawatiran karyawannya.",
        "clozeEnglish": "Managers need ________ to understand the concerns of their employees."
      }
    ],
    "stageId": 24,
    "stageTitle": "Stage 24: Master Lexicon 24",
    "clusterId": 24,
    "clusterTitle": "Stage 24: Master Lexicon 24"
  },
  {
    "id": "w24-emphasize",
    "word": "emphasize",
    "phonetic": "/ˈɛm.fəˌsaɪz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menekankan / Menegaskan",
    "definition": "Menekankan pentingnya suatu hal.",
    "contextSentences": [
      {
        "english": "The report emphasizes the importance of independent verification.",
        "indonesian": "Laporan tersebut menekankan pentingnya verifikasi independen.",
        "clozeEnglish": "The report ________s the importance of independent verification."
      }
    ],
    "stageId": 24,
    "stageTitle": "Stage 24: Master Lexicon 24",
    "clusterId": 24,
    "clusterTitle": "Stage 24: Master Lexicon 24"
  },
  {
    "id": "w24-empower",
    "word": "empower",
    "phonetic": "/ɪmˈpaʊ.ɚ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memberdayakan / Menguatkan",
    "definition": "Memberi wewenang, kemampuan, atau kepercayaan diri kepada orang lain.",
    "contextSentences": [
      {
        "english": "The training program aims to empower employees to make informed decisions.",
        "indonesian": "Program pelatihan tersebut bertujuan memberdayakan karyawan agar dapat mengambil keputusan berdasarkan informasi.",
        "clozeEnglish": "The training program aims to ________ employees to make informed decisions."
      }
    ],
    "stageId": 24,
    "stageTitle": "Stage 24: Master Lexicon 24",
    "clusterId": 24,
    "clusterTitle": "Stage 24: Master Lexicon 24"
  },
  {
    "id": "w25-emulate",
    "word": "emulate",
    "phonetic": "/ˈɛm.jəˌleɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Meniru / Meneladani",
    "definition": "Meniru seseorang yang dikagumi dengan tujuan menyamai keberhasilannya.",
    "contextSentences": [
      {
        "english": "The startup hopes to emulate the operating model of successful firms.",
        "indonesian": "Perusahaan rintisan tersebut berharap dapat meniru model operasional perusahaan yang sukses.",
        "clozeEnglish": "The startup hopes to ________ the operating model of successful firms."
      }
    ],
    "stageId": 25,
    "stageTitle": "Stage 25: Master Lexicon 25",
    "clusterId": 25,
    "clusterTitle": "Stage 25: Master Lexicon 25"
  },
  {
    "id": "w25-encompass",
    "word": "encompass",
    "phonetic": "/ɛnˈkʌm.pəs/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mencakup / Meliputi",
    "definition": "Mencakup atau meliputi berbagai hal dalam satu lingkup.",
    "contextSentences": [
      {
        "english": "The analysis will encompass financial, operational, and regulatory factors.",
        "indonesian": "Analisis tersebut akan mencakup faktor keuangan, operasional, dan regulasi.",
        "clozeEnglish": "The analysis will ________ financial, operational, and regulatory factors."
      }
    ],
    "stageId": 25,
    "stageTitle": "Stage 25: Master Lexicon 25",
    "clusterId": 25,
    "clusterTitle": "Stage 25: Master Lexicon 25"
  },
  {
    "id": "w25-encounter",
    "word": "encounter",
    "phonetic": "/ɪnˈkaʊn.tɚ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menghadapi / Menemui",
    "definition": "Bertemu atau mengalami sesuatu, sering kali secara tidak terduga.",
    "contextSentences": [
      {
        "english": "The implementation team may encounter unexpected technical challenges.",
        "indonesian": "Tim implementasi mungkin menghadapi tantangan teknis yang tidak terduga.",
        "clozeEnglish": "The implementation team may ________ unexpected technical challenges."
      }
    ],
    "stageId": 25,
    "stageTitle": "Stage 25: Master Lexicon 25",
    "clusterId": 25,
    "clusterTitle": "Stage 25: Master Lexicon 25"
  },
  {
    "id": "w25-endeavor",
    "word": "endeavor",
    "phonetic": "/ɪnˈdɛ.vɚ/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Upaya / Usaha",
    "definition": "Usaha sungguh-sungguh; sebagai verba berarti berupaya keras.",
    "contextSentences": [
      {
        "english": "The research endeavor required careful planning and sustained funding.",
        "indonesian": "Upaya penelitian tersebut membutuhkan perencanaan cermat dan pendanaan berkelanjutan.",
        "clozeEnglish": "The research ________ required careful planning and sustained funding."
      }
    ],
    "stageId": 25,
    "stageTitle": "Stage 25: Master Lexicon 25",
    "clusterId": 25,
    "clusterTitle": "Stage 25: Master Lexicon 25"
  },
  {
    "id": "w25-endure",
    "word": "endure",
    "phonetic": "/ɛndˈjʊɹ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Bertahan / Menanggung",
    "definition": "Menahan atau bertahan melalui kesulitan; tetap berlangsung dalam waktu lama.",
    "contextSentences": [
      {
        "english": "The system was designed to endure heavy workloads over long periods.",
        "indonesian": "Sistem tersebut dirancang untuk menahan beban kerja berat dalam jangka panjang.",
        "clozeEnglish": "The system was designed to ________ heavy workloads over long periods."
      }
    ],
    "stageId": 25,
    "stageTitle": "Stage 25: Master Lexicon 25",
    "clusterId": 25,
    "clusterTitle": "Stage 25: Master Lexicon 25"
  },
  {
    "id": "w25-enhance",
    "word": "enhance",
    "phonetic": "/ɛnˈhæns/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Meningkatkan / Memperkuat",
    "definition": "Meningkatkan kualitas, nilai, atau daya tarik.",
    "contextSentences": [
      {
        "english": "The update is expected to enhance the accuracy of the forecasting model.",
        "indonesian": "Pembaruan tersebut diharapkan meningkatkan akurasi model peramalan.",
        "clozeEnglish": "The update is expected to ________ the accuracy of the forecasting model."
      }
    ],
    "stageId": 25,
    "stageTitle": "Stage 25: Master Lexicon 25",
    "clusterId": 25,
    "clusterTitle": "Stage 25: Master Lexicon 25"
  },
  {
    "id": "w25-envisage",
    "word": "envisage",
    "phonetic": "/ɛnˈvɪ.zɪdʒ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membayangkan / Memperkirakan",
    "definition": "Membayangkan atau memperkirakan kemungkinan masa depan.",
    "contextSentences": [
      {
        "english": "The company envisages a gradual expansion into regional markets.",
        "indonesian": "Perusahaan membayangkan ekspansi bertahap ke pasar regional.",
        "clozeEnglish": "The company ________s a gradual expansion into regional markets."
      }
    ],
    "stageId": 25,
    "stageTitle": "Stage 25: Master Lexicon 25",
    "clusterId": 25,
    "clusterTitle": "Stage 25: Master Lexicon 25"
  },
  {
    "id": "w25-equitable",
    "word": "equitable",
    "phonetic": "/ˈɛ.kwə.tə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Adil / Setara",
    "definition": "Adil dan wajar dalam pembagian/perlakuan.",
    "contextSentences": [
      {
        "english": "The policy aims to ensure equitable access to public services.",
        "indonesian": "Kebijakan tersebut bertujuan memastikan akses yang adil terhadap layanan publik.",
        "clozeEnglish": "The policy aims to ensure ________ access to public services."
      }
    ],
    "stageId": 25,
    "stageTitle": "Stage 25: Master Lexicon 25",
    "clusterId": 25,
    "clusterTitle": "Stage 25: Master Lexicon 25"
  },
  {
    "id": "w25-eradicate",
    "word": "eradicate",
    "phonetic": "/ɪˈɹæ.dəˌkeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memberantas / Memusnahkan",
    "definition": "Memberantas atau menghilangkan hingga ke akar.",
    "contextSentences": [
      {
        "english": "The initiative aims to eradicate avoidable errors in the approval process.",
        "indonesian": "Inisiatif tersebut bertujuan memberantas kesalahan yang dapat dihindari dalam proses persetujuan.",
        "clozeEnglish": "The initiative aims to ________ avoidable errors in the approval process."
      }
    ],
    "stageId": 25,
    "stageTitle": "Stage 25: Master Lexicon 25",
    "clusterId": 25,
    "clusterTitle": "Stage 25: Master Lexicon 25"
  },
  {
    "id": "w25-erroneous",
    "word": "erroneous",
    "phonetic": "/ɛˈɹoʊ.ni.əs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Keliru / Tidak tepat",
    "definition": "Keliru atau tidak benar karena kesalahan informasi/penalaran.",
    "contextSentences": [
      {
        "english": "The report provides an erroneous explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang keliru tentang temuan penelitian.",
        "clozeEnglish": "The report provides an ________ explanation of the findings."
      }
    ],
    "stageId": 25,
    "stageTitle": "Stage 25: Master Lexicon 25",
    "clusterId": 25,
    "clusterTitle": "Stage 25: Master Lexicon 25"
  },
  {
    "id": "w26-evaluate",
    "word": "evaluate",
    "phonetic": "/ɪˈvæl.juˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menilai / Mengevaluasi",
    "definition": "Menilai kualitas, nilai, atau efektivitas berdasarkan kriteria.",
    "contextSentences": [
      {
        "english": "The committee will evaluate each proposal before allocating funds.",
        "indonesian": "Komite akan mengevaluasi setiap proposal sebelum mengalokasikan dana.",
        "clozeEnglish": "The committee will ________ each proposal before allocating funds."
      }
    ],
    "stageId": 26,
    "stageTitle": "Stage 26: Master Lexicon 26",
    "clusterId": 26,
    "clusterTitle": "Stage 26: Master Lexicon 26"
  },
  {
    "id": "w26-evoke",
    "word": "evoke",
    "phonetic": "/ɪˈvoʊk/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membangkitkan / Memunculkan",
    "definition": "Membangkitkan ingatan, perasaan, atau reaksi.",
    "contextSentences": [
      {
        "english": "The documentary evoked a strong response from the academic community.",
        "indonesian": "Film dokumenter tersebut membangkitkan respons kuat dari komunitas akademis.",
        "clozeEnglish": "The documentary ________d a strong response from the academic community."
      }
    ],
    "stageId": 26,
    "stageTitle": "Stage 26: Master Lexicon 26",
    "clusterId": 26,
    "clusterTitle": "Stage 26: Master Lexicon 26"
  },
  {
    "id": "w26-execute",
    "word": "execute",
    "phonetic": "/ˈɛk.səˌkjut/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Melaksanakan / Menjalankan",
    "definition": "Melaksanakan rencana/perintah atau menjalankan tugas.",
    "contextSentences": [
      {
        "english": "The team executed the revised strategy within the approved budget.",
        "indonesian": "Tim melaksanakan strategi yang telah direvisi sesuai anggaran yang disetujui.",
        "clozeEnglish": "The team ________d the revised strategy within the approved budget."
      }
    ],
    "stageId": 26,
    "stageTitle": "Stage 26: Master Lexicon 26",
    "clusterId": 26,
    "clusterTitle": "Stage 26: Master Lexicon 26"
  },
  {
    "id": "w26-exemplify",
    "word": "exemplify",
    "phonetic": "/ɪɡˈzɛm.pləˌfaɪ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mencontohkan / Menggambarkan",
    "definition": "Menjadi contoh nyata atau menggambarkan suatu kualitas.",
    "contextSentences": [
      {
        "english": "The case can exemplify the importance of careful risk management.",
        "indonesian": "Kasus tersebut dapat menjadi contoh pentingnya pengelolaan risiko yang cermat.",
        "clozeEnglish": "The case can ________ the importance of careful risk management."
      }
    ],
    "stageId": 26,
    "stageTitle": "Stage 26: Master Lexicon 26",
    "clusterId": 26,
    "clusterTitle": "Stage 26: Master Lexicon 26"
  },
  {
    "id": "w26-exert",
    "word": "exert",
    "phonetic": "/ɪɡˈzɝt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengerahkan / Menggunakan",
    "definition": "Menggunakan tenaga, usaha, atau pengaruh untuk mencapai sesuatu.",
    "contextSentences": [
      {
        "english": "The regulator may exert additional pressure on firms that ignore the guidelines.",
        "indonesian": "Regulator dapat memberikan tekanan tambahan kepada perusahaan yang mengabaikan pedoman.",
        "clozeEnglish": "The regulator may ________ additional pressure on firms that ignore the guidelines."
      }
    ],
    "stageId": 26,
    "stageTitle": "Stage 26: Master Lexicon 26",
    "clusterId": 26,
    "clusterTitle": "Stage 26: Master Lexicon 26"
  },
  {
    "id": "w26-explicit",
    "word": "explicit",
    "phonetic": "/ɪkˈsplɪ.sət/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Jelas / Gamblang",
    "definition": "Dinyatakan secara langsung dan jelas, tanpa tersirat.",
    "contextSentences": [
      {
        "english": "The contract contains explicit instructions about data retention.",
        "indonesian": "Kontrak tersebut memuat instruksi yang gamblang mengenai penyimpanan data.",
        "clozeEnglish": "The contract contains ________ instructions about data retention."
      }
    ],
    "stageId": 26,
    "stageTitle": "Stage 26: Master Lexicon 26",
    "clusterId": 26,
    "clusterTitle": "Stage 26: Master Lexicon 26"
  },
  {
    "id": "w26-extract",
    "word": "extract",
    "phonetic": "/ˈɛkˌstɹækt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengekstrak / Mengambil",
    "definition": "Mengambil atau mengeluarkan bagian/zat/informasi dari sesuatu.",
    "contextSentences": [
      {
        "english": "The software can extract key information from thousands of documents.",
        "indonesian": "Perangkat lunak tersebut dapat mengekstrak informasi penting dari ribuan dokumen.",
        "clozeEnglish": "The software can ________ key information from thousands of documents."
      }
    ],
    "stageId": 26,
    "stageTitle": "Stage 26: Master Lexicon 26",
    "clusterId": 26,
    "clusterTitle": "Stage 26: Master Lexicon 26"
  },
  {
    "id": "w26-fabricate",
    "word": "fabricate",
    "phonetic": "/ˈfæ.bɹəˌkeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memalsukan / Mengarang",
    "definition": "Mengarang atau memalsukan informasi/bukti; juga membuat sesuatu.",
    "contextSentences": [
      {
        "english": "The investigator found that the witness had attempted to fabricate evidence.",
        "indonesian": "Penyelidik menemukan bahwa saksi tersebut berusaha memalsukan bukti.",
        "clozeEnglish": "The investigator found that the witness had attempted to ________ evidence."
      }
    ],
    "stageId": 26,
    "stageTitle": "Stage 26: Master Lexicon 26",
    "clusterId": 26,
    "clusterTitle": "Stage 26: Master Lexicon 26"
  },
  {
    "id": "w26-facilitate",
    "word": "facilitate",
    "phonetic": "/fəˈsɪ.ləˌteɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memudahkan / Memperlancar",
    "definition": "Memudahkan atau memperlancar proses.",
    "contextSentences": [
      {
        "english": "The new platform will facilitate communication between regional offices.",
        "indonesian": "Platform baru tersebut akan mempermudah komunikasi antar kantor regional.",
        "clozeEnglish": "The new platform will ________ communication between regional offices."
      }
    ],
    "stageId": 26,
    "stageTitle": "Stage 26: Master Lexicon 26",
    "clusterId": 26,
    "clusterTitle": "Stage 26: Master Lexicon 26"
  },
  {
    "id": "w26-fascinate",
    "word": "fascinate",
    "phonetic": "/ˈfæ.səˌneɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memikat / Menarik",
    "definition": "Menarik perhatian atau membuat sangat tertarik.",
    "contextSentences": [
      {
        "english": "The findings fascinated researchers across several disciplines.",
        "indonesian": "Temuan tersebut menarik perhatian para peneliti dari berbagai disiplin ilmu.",
        "clozeEnglish": "The findings ________d researchers across several disciplines."
      }
    ],
    "stageId": 26,
    "stageTitle": "Stage 26: Master Lexicon 26",
    "clusterId": 26,
    "clusterTitle": "Stage 26: Master Lexicon 26"
  },
  {
    "id": "w27-fatigue",
    "word": "fatigue",
    "phonetic": "/fəˈtiɡ/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Kelelahan / Keletihan",
    "definition": "Kelelahan fisik atau mental yang berat.",
    "contextSentences": [
      {
        "english": "Severe fatigue can reduce a researcher's ability to make accurate judgments.",
        "indonesian": "Kelelahan berat dapat mengurangi kemampuan peneliti untuk membuat penilaian yang akurat.",
        "clozeEnglish": "Severe ________ can reduce a researcher's ability to make accurate judgments."
      }
    ],
    "stageId": 27,
    "stageTitle": "Stage 27: Master Lexicon 27",
    "clusterId": 27,
    "clusterTitle": "Stage 27: Master Lexicon 27"
  },
  {
    "id": "w27-favorable",
    "word": "favorable",
    "phonetic": "/ˈfeɪ.vɚ.ə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Menguntungkan / Positif",
    "definition": "Menguntungkan atau menunjukkan penilaian/keadaan positif.",
    "contextSentences": [
      {
        "english": "The committee gave the proposal a favorable assessment.",
        "indonesian": "Komite memberikan penilaian positif terhadap proposal tersebut.",
        "clozeEnglish": "The committee gave the proposal a ________ assessment."
      }
    ],
    "stageId": 27,
    "stageTitle": "Stage 27: Master Lexicon 27",
    "clusterId": 27,
    "clusterTitle": "Stage 27: Master Lexicon 27"
  },
  {
    "id": "w27-feasible",
    "word": "feasible",
    "phonetic": "/ˈfi.zə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Layak / Memungkinkan",
    "definition": "Layak dan praktis untuk dilaksanakan berdasarkan kondisi/sumber daya.",
    "contextSentences": [
      {
        "english": "The board adopted a feasible strategy to manage operational risks.",
        "indonesian": "Dewan mengadopsi strategi yang layak untuk mengelola risiko operasional.",
        "clozeEnglish": "The board adopted a ________ strategy to manage operational risks."
      }
    ],
    "stageId": 27,
    "stageTitle": "Stage 27: Master Lexicon 27",
    "clusterId": 27,
    "clusterTitle": "Stage 27: Master Lexicon 27"
  },
  {
    "id": "w27-finite",
    "word": "finite",
    "phonetic": "/ˈfaɪˌnaɪt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Terbatas / Berhingga",
    "definition": "Terbatas jumlah atau durasinya; tidak tak terbatas.",
    "contextSentences": [
      {
        "english": "The team must complete the study within a finite budget.",
        "indonesian": "Tim harus menyelesaikan penelitian tersebut dengan anggaran yang terbatas.",
        "clozeEnglish": "The team must complete the study within a ________ budget."
      }
    ],
    "stageId": 27,
    "stageTitle": "Stage 27: Master Lexicon 27",
    "clusterId": 27,
    "clusterTitle": "Stage 27: Master Lexicon 27"
  },
  {
    "id": "w27-flawless",
    "word": "flawless",
    "phonetic": "/ˈflɔ.ləs/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Sempurna / Tanpa cela",
    "definition": "Sempurna tanpa cacat atau kesalahan.",
    "contextSentences": [
      {
        "english": "The team delivered a nearly flawless presentation to the board.",
        "indonesian": "Tim tersebut menyampaikan presentasi yang nyaris sempurna kepada dewan.",
        "clozeEnglish": "The team delivered a nearly ________ presentation to the board."
      }
    ],
    "stageId": 27,
    "stageTitle": "Stage 27: Master Lexicon 27",
    "clusterId": 27,
    "clusterTitle": "Stage 27: Master Lexicon 27"
  },
  {
    "id": "w27-fluctuate",
    "word": "fluctuate",
    "phonetic": "/ˈflʌk.tʃəˌweɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Berfluktuasi / Naik turun",
    "definition": "Berubah naik-turun secara tidak tetap.",
    "contextSentences": [
      {
        "english": "Exchange rates fluctuate in response to global economic developments.",
        "indonesian": "Nilai tukar berfluktuasi sebagai respons terhadap perkembangan ekonomi global.",
        "clozeEnglish": "Exchange rates ________ in response to global economic developments."
      }
    ],
    "stageId": 27,
    "stageTitle": "Stage 27: Master Lexicon 27",
    "clusterId": 27,
    "clusterTitle": "Stage 27: Master Lexicon 27"
  },
  {
    "id": "w27-fluency",
    "word": "fluency",
    "phonetic": "/ˈflu.ən.si/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Kefasihan / Kelancaran",
    "definition": "Kefasihan atau kemampuan menggunakan bahasa secara lancar.",
    "contextSentences": [
      {
        "english": "Regular speaking practice improves fluency in professional discussions.",
        "indonesian": "Latihan berbicara secara rutin meningkatkan kefasihan dalam diskusi profesional.",
        "clozeEnglish": "Regular speaking practice improves ________ in professional discussions."
      }
    ],
    "stageId": 27,
    "stageTitle": "Stage 27: Master Lexicon 27",
    "clusterId": 27,
    "clusterTitle": "Stage 27: Master Lexicon 27"
  },
  {
    "id": "w27-forecast",
    "word": "forecast",
    "phonetic": "/ˈfɔɹˌkæst/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Prakiraan / Ramalan",
    "definition": "Perkiraan tentang kondisi/peristiwa di masa depan.",
    "contextSentences": [
      {
        "english": "The latest forecast predicts moderate growth next year.",
        "indonesian": "Prakiraan terbaru memprediksi pertumbuhan moderat tahun depan.",
        "clozeEnglish": "The latest ________ predicts moderate growth next year."
      }
    ],
    "stageId": 27,
    "stageTitle": "Stage 27: Master Lexicon 27",
    "clusterId": 27,
    "clusterTitle": "Stage 27: Master Lexicon 27"
  },
  {
    "id": "w27-formidable",
    "word": "formidable",
    "phonetic": "/ˈfɔɹ.mə.də.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Tangguh / Sulit dihadapi",
    "definition": "Sangat kuat, tangguh, atau sulit dihadapi.",
    "contextSentences": [
      {
        "english": "The research team faced a formidable challenge when the initial model failed.",
        "indonesian": "Tim penelitian menghadapi tantangan besar ketika model awal gagal.",
        "clozeEnglish": "The research team faced a ________ challenge when the initial model failed."
      }
    ],
    "stageId": 27,
    "stageTitle": "Stage 27: Master Lexicon 27",
    "clusterId": 27,
    "clusterTitle": "Stage 27: Master Lexicon 27"
  },
  {
    "id": "w27-formulate",
    "word": "formulate",
    "phonetic": "/ˈfɔɹm.jəˌleɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Merumuskan / Menyusun",
    "definition": "Menyusun atau merumuskan rencana/ide secara sistematis.",
    "contextSentences": [
      {
        "english": "The policy team will formulate recommendations based on the research.",
        "indonesian": "Tim kebijakan akan merumuskan rekomendasi berdasarkan penelitian tersebut.",
        "clozeEnglish": "The policy team will ________ recommendations based on the research."
      }
    ],
    "stageId": 27,
    "stageTitle": "Stage 27: Master Lexicon 27",
    "clusterId": 27,
    "clusterTitle": "Stage 27: Master Lexicon 27"
  },
  {
    "id": "w28-foster",
    "word": "foster",
    "phonetic": "/ˈfɑ.stɚ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menumbuhkan / Mendorong",
    "definition": "Mendorong perkembangan atau menumbuhkan hubungan/kualitas.",
    "contextSentences": [
      {
        "english": "The program is intended to foster collaboration across departments.",
        "indonesian": "Program tersebut dimaksudkan untuk mendorong kolaborasi antar departemen.",
        "clozeEnglish": "The program is intended to ________ collaboration across departments."
      }
    ],
    "stageId": 28,
    "stageTitle": "Stage 28: Master Lexicon 28",
    "clusterId": 28,
    "clusterTitle": "Stage 28: Master Lexicon 28"
  },
  {
    "id": "w28-fragile",
    "word": "fragile",
    "phonetic": "/ˈfɹæ.dʒəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Rapuh / Rentan",
    "definition": "Mudah rusak, pecah, atau rentan.",
    "contextSentences": [
      {
        "english": "The agreement remained fragile after the prolonged negotiations.",
        "indonesian": "Kesepakatan tersebut tetap rapuh setelah negosiasi yang berkepanjangan.",
        "clozeEnglish": "The agreement remained ________ after the prolonged negotiations."
      }
    ],
    "stageId": 28,
    "stageTitle": "Stage 28: Master Lexicon 28",
    "clusterId": 28,
    "clusterTitle": "Stage 28: Master Lexicon 28"
  },
  {
    "id": "w28-framework",
    "word": "framework",
    "phonetic": "/ˈfɹeɪmˌwɝk/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Kerangka / Struktur",
    "definition": "Kerangka dasar yang menjadi struktur suatu sistem/rencana.",
    "contextSentences": [
      {
        "english": "The framework provides a consistent basis for evaluating proposals.",
        "indonesian": "Kerangka tersebut menyediakan dasar yang konsisten untuk mengevaluasi proposal.",
        "clozeEnglish": "The ________ provides a consistent basis for evaluating proposals."
      }
    ],
    "stageId": 28,
    "stageTitle": "Stage 28: Master Lexicon 28",
    "clusterId": 28,
    "clusterTitle": "Stage 28: Master Lexicon 28"
  },
  {
    "id": "w28-frugal",
    "word": "frugal",
    "phonetic": "/ˈfɹu.ɡəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Hemat / Cermat",
    "definition": "Hemat dan cermat menggunakan uang/sumber daya.",
    "contextSentences": [
      {
        "english": "The board adopted a frugal strategy to manage operational risks.",
        "indonesian": "Dewan mengadopsi strategi yang hemat untuk mengelola risiko operasional.",
        "clozeEnglish": "The board adopted a ________ strategy to manage operational risks."
      }
    ],
    "stageId": 28,
    "stageTitle": "Stage 28: Master Lexicon 28",
    "clusterId": 28,
    "clusterTitle": "Stage 28: Master Lexicon 28"
  },
  {
    "id": "w28-fulfill",
    "word": "fulfill",
    "phonetic": "/fʊlˈfɪl/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memenuhi / Menunaikan",
    "definition": "Memenuhi janji, kewajiban, syarat, atau harapan.",
    "contextSentences": [
      {
        "english": "The supplier must fulfill all contractual obligations by the deadline.",
        "indonesian": "Pemasok harus memenuhi seluruh kewajiban kontraktual sebelum tenggat waktu.",
        "clozeEnglish": "The supplier must ________ all contractual obligations by the deadline."
      }
    ],
    "stageId": 28,
    "stageTitle": "Stage 28: Master Lexicon 28",
    "clusterId": 28,
    "clusterTitle": "Stage 28: Master Lexicon 28"
  },
  {
    "id": "w28-fundamental",
    "word": "fundamental",
    "phonetic": "/ˌfʌn.dəˈmɛn.təl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Mendasar / Pokok",
    "definition": "Mendasar dan menjadi landasan utama.",
    "contextSentences": [
      {
        "english": "Clear communication is fundamental to successful collaboration.",
        "indonesian": "Komunikasi yang jelas merupakan hal mendasar bagi kerja sama yang berhasil.",
        "clozeEnglish": "Clear communication is ________ to successful collaboration."
      }
    ],
    "stageId": 28,
    "stageTitle": "Stage 28: Master Lexicon 28",
    "clusterId": 28,
    "clusterTitle": "Stage 28: Master Lexicon 28"
  },
  {
    "id": "w28-genuine",
    "word": "genuine",
    "phonetic": "/ˈdʒɛn.jə.wən/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Asli / Tulus",
    "definition": "Asli, sungguhan, atau tulus.",
    "contextSentences": [
      {
        "english": "The manager expressed genuine concern about the reliability of the findings.",
        "indonesian": "Manajer menyampaikan kekhawatiran yang tulus mengenai keandalan temuan tersebut.",
        "clozeEnglish": "The manager expressed ________ concern about the reliability of the findings."
      }
    ],
    "stageId": 28,
    "stageTitle": "Stage 28: Master Lexicon 28",
    "clusterId": 28,
    "clusterTitle": "Stage 28: Master Lexicon 28"
  },
  {
    "id": "w28-genuinely",
    "word": "genuinely",
    "phonetic": "/ˈdʒɛn.jə.wən.li/",
    "partOfSpeech": "adverb",
    "cefr": "B2",
    "translation": "Sungguh-sungguh / Tulus",
    "definition": "Secara tulus atau benar-benar.",
    "contextSentences": [
      {
        "english": "The manager genuinely appreciated the team's transparency.",
        "indonesian": "Manajer tersebut benar-benar menghargai keterbukaan tim.",
        "clozeEnglish": "The manager ________ appreciated the team's transparency."
      }
    ],
    "stageId": 28,
    "stageTitle": "Stage 28: Master Lexicon 28",
    "clusterId": 28,
    "clusterTitle": "Stage 28: Master Lexicon 28"
  },
  {
    "id": "w28-grasp",
    "word": "grasp",
    "phonetic": "/ˈɡɹæsp/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memahami / Menggenggam",
    "definition": "Memahami; juga menggenggam erat.",
    "contextSentences": [
      {
        "english": "New analysts must grasp the assumptions behind the forecasting model.",
        "indonesian": "Analis baru harus memahami asumsi di balik model peramalan.",
        "clozeEnglish": "New analysts must ________ the assumptions behind the forecasting model."
      }
    ],
    "stageId": 28,
    "stageTitle": "Stage 28: Master Lexicon 28",
    "clusterId": 28,
    "clusterTitle": "Stage 28: Master Lexicon 28"
  },
  {
    "id": "w28-gratify",
    "word": "gratify",
    "phonetic": "/ˈɡɹæ.təˌfaɪ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memuaskan / Menyenangkan",
    "definition": "Memberi kepuasan atau kesenangan.",
    "contextSentences": [
      {
        "english": "Positive feedback can gratify employees who have worked under pressure.",
        "indonesian": "Umpan balik positif dapat menyenangkan karyawan yang telah bekerja di bawah tekanan.",
        "clozeEnglish": "Positive feedback can ________ employees who have worked under pressure."
      }
    ],
    "stageId": 28,
    "stageTitle": "Stage 28: Master Lexicon 28",
    "clusterId": 28,
    "clusterTitle": "Stage 28: Master Lexicon 28"
  },
  {
    "id": "w29-gratitude",
    "word": "gratitude",
    "phonetic": "/ˈɡɹæ.təˌtud/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Syukur / Terima kasih",
    "definition": "Rasa syukur atau terima kasih.",
    "contextSentences": [
      {
        "english": "The director expressed gratitude to the team for its careful work.",
        "indonesian": "Direktur menyampaikan rasa terima kasih kepada tim atas pekerjaan mereka yang cermat.",
        "clozeEnglish": "The director expressed ________ to the team for its careful work."
      }
    ],
    "stageId": 29,
    "stageTitle": "Stage 29: Master Lexicon 29",
    "clusterId": 29,
    "clusterTitle": "Stage 29: Master Lexicon 29"
  },
  {
    "id": "w29-gregarious",
    "word": "gregarious",
    "phonetic": "/ɡɹəˈɡɛ.ɹi.əs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Ramah / Suka bergaul",
    "definition": "Senang bergaul dan berada bersama orang lain.",
    "contextSentences": [
      {
        "english": "The gregarious consultant quickly built relationships with colleagues across departments.",
        "indonesian": "Konsultan yang senang bergaul itu dengan cepat membangun hubungan dengan rekan kerja di berbagai departemen.",
        "clozeEnglish": "The ________ consultant quickly built relationships with colleagues across departments."
      }
    ],
    "stageId": 29,
    "stageTitle": "Stage 29: Master Lexicon 29",
    "clusterId": 29,
    "clusterTitle": "Stage 29: Master Lexicon 29"
  },
  {
    "id": "w29-grievance",
    "word": "grievance",
    "phonetic": "/ˈɡɹi.vəns/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Keluhan / Keberatan",
    "definition": "Keluhan atau rasa ketidakadilan, terutama dalam konteks formal/kerja.",
    "contextSentences": [
      {
        "english": "The employee submitted a formal grievance about the unfair workload.",
        "indonesian": "Karyawan tersebut mengajukan keluhan resmi mengenai beban kerja yang tidak adil.",
        "clozeEnglish": "The employee submitted a formal ________ about the unfair workload."
      }
    ],
    "stageId": 29,
    "stageTitle": "Stage 29: Master Lexicon 29",
    "clusterId": 29,
    "clusterTitle": "Stage 29: Master Lexicon 29"
  },
  {
    "id": "w29-guarantee",
    "word": "guarantee",
    "phonetic": "/ˌɡɛ.ɹənˈti/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menjamin / Memastikan",
    "definition": "Menjamin atau memberikan kepastian; juga jaminan.",
    "contextSentences": [
      {
        "english": "The contract cannot guarantee that delivery will occur before Friday.",
        "indonesian": "Kontrak tersebut tidak dapat menjamin bahwa pengiriman akan dilakukan sebelum Jumat.",
        "clozeEnglish": "The contract cannot ________ that delivery will occur before Friday."
      }
    ],
    "stageId": 29,
    "stageTitle": "Stage 29: Master Lexicon 29",
    "clusterId": 29,
    "clusterTitle": "Stage 29: Master Lexicon 29"
  },
  {
    "id": "w29-gullible",
    "word": "gullible",
    "phonetic": "/ˈɡʌ.lə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Mudah tertipu / Naif",
    "definition": "Mudah percaya sehingga mudah ditipu.",
    "contextSentences": [
      {
        "english": "Gullible investors may accept unrealistic promises without checking the evidence.",
        "indonesian": "Investor yang mudah tertipu mungkin menerima janji yang tidak realistis tanpa memeriksa buktinya.",
        "clozeEnglish": "________ investors may accept unrealistic promises without checking the evidence."
      }
    ],
    "stageId": 29,
    "stageTitle": "Stage 29: Master Lexicon 29",
    "clusterId": 29,
    "clusterTitle": "Stage 29: Master Lexicon 29"
  },
  {
    "id": "w29-halt",
    "word": "halt",
    "phonetic": "/ˈhɔlt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menghentikan / Berhenti",
    "definition": "Menghentikan atau berhenti, biasanya secara tiba-tiba/resmi.",
    "contextSentences": [
      {
        "english": "The regulator ordered the company to halt the unsafe operation.",
        "indonesian": "Regulator memerintahkan perusahaan untuk menghentikan operasi yang tidak aman.",
        "clozeEnglish": "The regulator ordered the company to ________ the unsafe operation."
      }
    ],
    "stageId": 29,
    "stageTitle": "Stage 29: Master Lexicon 29",
    "clusterId": 29,
    "clusterTitle": "Stage 29: Master Lexicon 29"
  },
  {
    "id": "w29-heed",
    "word": "heed",
    "phonetic": "/ˈhid/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengindahkan / Memperhatikan",
    "definition": "Memperhatikan dan menindaklanjuti nasihat/peringatan.",
    "contextSentences": [
      {
        "english": "The project manager chose to heed the auditor's warning.",
        "indonesian": "Manajer proyek memilih untuk mengindahkan peringatan auditor.",
        "clozeEnglish": "The project manager chose to ________ the auditor's warning."
      }
    ],
    "stageId": 29,
    "stageTitle": "Stage 29: Master Lexicon 29",
    "clusterId": 29,
    "clusterTitle": "Stage 29: Master Lexicon 29"
  },
  {
    "id": "w29-hierarchy",
    "word": "hierarchy",
    "phonetic": "/ˈhaɪ.ɚˌɑɹ.ki/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Hierarki / Tingkatan",
    "definition": "Sistem tingkatan atau urutan otoritas dari atas ke bawah.",
    "contextSentences": [
      {
        "english": "The organizational hierarchy clarifies reporting responsibilities.",
        "indonesian": "Hierarki organisasi memperjelas tanggung jawab pelaporan.",
        "clozeEnglish": "The organizational ________ clarifies reporting responsibilities."
      }
    ],
    "stageId": 29,
    "stageTitle": "Stage 29: Master Lexicon 29",
    "clusterId": 29,
    "clusterTitle": "Stage 29: Master Lexicon 29"
  },
  {
    "id": "w29-highlight",
    "word": "highlight",
    "phonetic": "/ˈhaɪˌlaɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menyoroti / Menekankan",
    "definition": "Menyoroti atau menekankan bagian penting.",
    "contextSentences": [
      {
        "english": "The report highlights the need for stronger internal controls.",
        "indonesian": "Laporan tersebut menyoroti perlunya pengendalian internal yang lebih kuat.",
        "clozeEnglish": "The report ________s the need for stronger internal controls."
      }
    ],
    "stageId": 29,
    "stageTitle": "Stage 29: Master Lexicon 29",
    "clusterId": 29,
    "clusterTitle": "Stage 29: Master Lexicon 29"
  },
  {
    "id": "w29-hinder",
    "word": "hinder",
    "phonetic": "/ˈhɪn.dɚ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menghambat / Menghalangi",
    "definition": "Menghambat atau membuat kemajuan lebih sulit.",
    "contextSentences": [
      {
        "english": "Unclear requirements can hinder progress during software development.",
        "indonesian": "Persyaratan yang tidak jelas dapat menghambat kemajuan selama pengembangan perangkat lunak.",
        "clozeEnglish": "Unclear requirements can ________ progress during software development."
      }
    ],
    "stageId": 29,
    "stageTitle": "Stage 29: Master Lexicon 29",
    "clusterId": 29,
    "clusterTitle": "Stage 29: Master Lexicon 29"
  },
  {
    "id": "w30-holistic",
    "word": "holistic",
    "phonetic": "/hoʊˈlɪ.stɪk/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Menyeluruh / Holistik",
    "definition": "Melihat sesuatu sebagai keseluruhan, bukan hanya bagian terpisah.",
    "contextSentences": [
      {
        "english": "The team adopted a holistic approach to evaluating organizational performance.",
        "indonesian": "Tim tersebut mengadopsi pendekatan menyeluruh untuk mengevaluasi kinerja organisasi.",
        "clozeEnglish": "The team adopted a ________ approach to evaluating organizational performance."
      }
    ],
    "stageId": 30,
    "stageTitle": "Stage 30: Master Lexicon 30",
    "clusterId": 30,
    "clusterTitle": "Stage 30: Master Lexicon 30"
  },
  {
    "id": "w30-hypothesis",
    "word": "hypothesis",
    "phonetic": "/haɪˈpɑ.θə.səs/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Hipotesis / Dugaan",
    "definition": "Penjelasan/dugaan sementara yang perlu diuji.",
    "contextSentences": [
      {
        "english": "The researchers tested the hypothesis with a controlled experiment.",
        "indonesian": "Para peneliti menguji hipotesis tersebut melalui eksperimen terkontrol.",
        "clozeEnglish": "The researchers tested the ________ with a controlled experiment."
      }
    ],
    "stageId": 30,
    "stageTitle": "Stage 30: Master Lexicon 30",
    "clusterId": 30,
    "clusterTitle": "Stage 30: Master Lexicon 30"
  },
  {
    "id": "w30-hypothesize",
    "word": "hypothesize",
    "phonetic": "/haɪˈpɑ.θəˌsaɪz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengajukan hipotesis / Menduga",
    "definition": "Mengajukan dugaan/hipotesis untuk diuji.",
    "contextSentences": [
      {
        "english": "The researchers hypothesize that the decline is linked to seasonal demand.",
        "indonesian": "Para peneliti mengajukan hipotesis bahwa penurunan tersebut berkaitan dengan permintaan musiman.",
        "clozeEnglish": "The researchers ________ that the decline is linked to seasonal demand."
      }
    ],
    "stageId": 30,
    "stageTitle": "Stage 30: Master Lexicon 30",
    "clusterId": 30,
    "clusterTitle": "Stage 30: Master Lexicon 30"
  },
  {
    "id": "w30-hypothetical",
    "word": "hypothetical",
    "phonetic": "/ˌhaɪ.pəˈθɛ.tə.kəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Hipotetis / Pengandaian",
    "definition": "Berdasarkan pengandaian, bukan kejadian nyata yang sedang dibahas.",
    "contextSentences": [
      {
        "english": "The lecturer presented a hypothetical case to explain the regulation.",
        "indonesian": "Dosen menyajikan kasus hipotetis untuk menjelaskan peraturan tersebut.",
        "clozeEnglish": "The lecturer presented a ________ case to explain the regulation."
      }
    ],
    "stageId": 30,
    "stageTitle": "Stage 30: Master Lexicon 30",
    "clusterId": 30,
    "clusterTitle": "Stage 30: Master Lexicon 30"
  },
  {
    "id": "w30-illuminate",
    "word": "illuminate",
    "phonetic": "/ˌɪˈlu.mɪ.nɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menerangi / Memperjelas",
    "definition": "Menerangi atau memperjelas suatu gagasan.",
    "contextSentences": [
      {
        "english": "The diagram helps illuminate the relationship between the variables.",
        "indonesian": "Diagram tersebut membantu memperjelas hubungan antara variabel-variabel itu.",
        "clozeEnglish": "The diagram helps ________ the relationship between the variables."
      }
    ],
    "stageId": 30,
    "stageTitle": "Stage 30: Master Lexicon 30",
    "clusterId": 30,
    "clusterTitle": "Stage 30: Master Lexicon 30"
  },
  {
    "id": "w30-immerse",
    "word": "immerse",
    "phonetic": "/ˌɪˈmɝs/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Membenamkan / Mendalami",
    "definition": "Membenamkan diri secara fisik atau melibatkan diri sepenuhnya dalam kegiatan.",
    "contextSentences": [
      {
        "english": "The training allows participants to immerse themselves in realistic case studies.",
        "indonesian": "Pelatihan tersebut memungkinkan peserta mendalami studi kasus yang realistis.",
        "clozeEnglish": "The training allows participants to ________ themselves in realistic case studies."
      }
    ],
    "stageId": 30,
    "stageTitle": "Stage 30: Master Lexicon 30",
    "clusterId": 30,
    "clusterTitle": "Stage 30: Master Lexicon 30"
  },
  {
    "id": "w30-impartial",
    "word": "impartial",
    "phonetic": "/ˌɪmˈpɑɹ.ʃəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Tidak memihak / Netral",
    "definition": "Tidak memihak dan menilai secara adil.",
    "contextSentences": [
      {
        "english": "An impartial reviewer assessed the proposal without personal bias.",
        "indonesian": "Penelaah yang tidak memihak menilai proposal tersebut tanpa prasangka pribadi.",
        "clozeEnglish": "An ________ reviewer assessed the proposal without personal bias."
      }
    ],
    "stageId": 30,
    "stageTitle": "Stage 30: Master Lexicon 30",
    "clusterId": 30,
    "clusterTitle": "Stage 30: Master Lexicon 30"
  },
  {
    "id": "w30-impeccable",
    "word": "impeccable",
    "phonetic": "/ˌɪmˈpɛ.kə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Sempurna / Tanpa cela",
    "definition": "Sangat sempurna dan tanpa cela.",
    "contextSentences": [
      {
        "english": "The analyst maintained impeccable records throughout the project.",
        "indonesian": "Analis tersebut menjaga catatan yang sempurna selama proyek berlangsung.",
        "clozeEnglish": "The analyst maintained ________ records throughout the project."
      }
    ],
    "stageId": 30,
    "stageTitle": "Stage 30: Master Lexicon 30",
    "clusterId": 30,
    "clusterTitle": "Stage 30: Master Lexicon 30"
  },
  {
    "id": "w30-impending",
    "word": "impending",
    "phonetic": "/ˌɪmˈpɛn.dɪŋ/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Segera terjadi / Akan datang",
    "definition": "Akan segera terjadi, sering bernuansa penting/mengkhawatirkan.",
    "contextSentences": [
      {
        "english": "The team prepared for the impending deadline by reallocating resources.",
        "indonesian": "Tim tersebut bersiap menghadapi tenggat yang semakin dekat dengan mengalokasikan ulang sumber daya.",
        "clozeEnglish": "The team prepared for the ________ deadline by reallocating resources."
      }
    ],
    "stageId": 30,
    "stageTitle": "Stage 30: Master Lexicon 30",
    "clusterId": 30,
    "clusterTitle": "Stage 30: Master Lexicon 30"
  },
  {
    "id": "w30-implement",
    "word": "implement",
    "phonetic": "/ˈɪm.plə.mənt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menerapkan / Melaksanakan",
    "definition": "Menerapkan atau melaksanakan rencana/kebijakan/sistem.",
    "contextSentences": [
      {
        "english": "The organization will implement the new data-retention policy next month.",
        "indonesian": "Organisasi akan menerapkan kebijakan penyimpanan data yang baru bulan depan.",
        "clozeEnglish": "The organization will ________ the new data-retention policy next month."
      }
    ],
    "stageId": 30,
    "stageTitle": "Stage 30: Master Lexicon 30",
    "clusterId": 30,
    "clusterTitle": "Stage 30: Master Lexicon 30"
  },
  {
    "id": "w31-implication",
    "word": "implication",
    "phonetic": "/ˌɪm.pləˈkeɪ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Implikasi / Konsekuensi",
    "definition": "Kemungkinan dampak, konsekuensi, atau makna tersirat dari sesuatu.",
    "contextSentences": [
      {
        "english": "One important implication of the findings is the need for further research.",
        "indonesian": "Salah satu implikasi penting dari temuan tersebut adalah perlunya penelitian lanjutan.",
        "clozeEnglish": "One important ________ of the findings is the need for further research."
      }
    ],
    "stageId": 31,
    "stageTitle": "Stage 31: Master Lexicon 31",
    "clusterId": 31,
    "clusterTitle": "Stage 31: Master Lexicon 31"
  },
  {
    "id": "w31-implicit",
    "word": "implicit",
    "phonetic": "/ˌɪmˈplɪ.sət/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Tersirat / Tidak langsung",
    "definition": "Tersirat atau dipahami tanpa dinyatakan secara langsung.",
    "contextSentences": [
      {
        "english": "The report provides an implicit explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang tersirat tentang temuan penelitian.",
        "clozeEnglish": "The report provides an ________ explanation of the findings."
      }
    ],
    "stageId": 31,
    "stageTitle": "Stage 31: Master Lexicon 31",
    "clusterId": 31,
    "clusterTitle": "Stage 31: Master Lexicon 31"
  },
  {
    "id": "w31-imply",
    "word": "imply",
    "phonetic": "/ˌɪmˈplaɪ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menyiratkan / Mengindikasikan",
    "definition": "Menyiratkan atau memberi kesan secara tidak langsung.",
    "contextSentences": [
      {
        "english": "The findings imply that customer demand is becoming more price-sensitive.",
        "indonesian": "Temuan tersebut menyiratkan bahwa permintaan pelanggan semakin sensitif terhadap harga.",
        "clozeEnglish": "The findings ________ that customer demand is becoming more price-sensitive."
      }
    ],
    "stageId": 31,
    "stageTitle": "Stage 31: Master Lexicon 31",
    "clusterId": 31,
    "clusterTitle": "Stage 31: Master Lexicon 31"
  },
  {
    "id": "w31-impose",
    "word": "impose",
    "phonetic": "/ˌɪmˈpoʊz/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memberlakukan / Memaksakan aturan",
    "definition": "Memberlakukan atau memaksakan aturan/beban kepada pihak lain.",
    "contextSentences": [
      {
        "english": "The regulator may impose stricter reporting requirements next year.",
        "indonesian": "Regulator mungkin memberlakukan persyaratan pelaporan yang lebih ketat tahun depan.",
        "clozeEnglish": "The regulator may ________ stricter reporting requirements next year."
      }
    ],
    "stageId": 31,
    "stageTitle": "Stage 31: Master Lexicon 31",
    "clusterId": 31,
    "clusterTitle": "Stage 31: Master Lexicon 31"
  },
  {
    "id": "w31-improvise",
    "word": "improvise",
    "phonetic": "/ˈɪm.pɹəˌvaɪz/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Berimprovisasi / Bertindak spontan",
    "definition": "Melakukan atau membuat sesuatu secara spontan tanpa persiapan.",
    "contextSentences": [
      {
        "english": "When the presentation system failed, the speaker had to improvise a solution.",
        "indonesian": "Ketika sistem presentasi gagal, pembicara harus mencari solusi secara spontan.",
        "clozeEnglish": "When the presentation system failed, the speaker had to ________ a solution."
      }
    ],
    "stageId": 31,
    "stageTitle": "Stage 31: Master Lexicon 31",
    "clusterId": 31,
    "clusterTitle": "Stage 31: Master Lexicon 31"
  },
  {
    "id": "w31-impulsive",
    "word": "impulsive",
    "phonetic": "/ˌɪmˈpʌl.sɪv/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Impulsif / Spontan",
    "definition": "Bertindak tiba-tiba berdasarkan dorongan tanpa mempertimbangkan akibat.",
    "contextSentences": [
      {
        "english": "The board rejected an impulsive decision to sell the company's assets.",
        "indonesian": "Dewan menolak keputusan impulsif untuk menjual aset perusahaan.",
        "clozeEnglish": "The board rejected an ________ decision to sell the company's assets."
      }
    ],
    "stageId": 31,
    "stageTitle": "Stage 31: Master Lexicon 31",
    "clusterId": 31,
    "clusterTitle": "Stage 31: Master Lexicon 31"
  },
  {
    "id": "w31-incentive",
    "word": "incentive",
    "phonetic": "/ˌɪnˈsɛn.tɪv/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Insentif / Pendorong",
    "definition": "Insentif atau dorongan yang memotivasi tindakan.",
    "contextSentences": [
      {
        "english": "The bonus served as an incentive for staff to meet the quarterly target.",
        "indonesian": "Bonus tersebut menjadi insentif bagi staf untuk mencapai target kuartalan.",
        "clozeEnglish": "The bonus served as an ________ for staff to meet the quarterly target."
      }
    ],
    "stageId": 31,
    "stageTitle": "Stage 31: Master Lexicon 31",
    "clusterId": 31,
    "clusterTitle": "Stage 31: Master Lexicon 31"
  },
  {
    "id": "w31-inclination",
    "word": "inclination",
    "phonetic": "/ˌɪn.kləˈneɪ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Kecenderungan / Keinginan",
    "definition": "Kecenderungan atau keinginan untuk melakukan sesuatu.",
    "contextSentences": [
      {
        "english": "She has a strong inclination toward independent research.",
        "indonesian": "Ia memiliki kecenderungan kuat terhadap penelitian mandiri.",
        "clozeEnglish": "She has a strong ________ toward independent research."
      }
    ],
    "stageId": 31,
    "stageTitle": "Stage 31: Master Lexicon 31",
    "clusterId": 31,
    "clusterTitle": "Stage 31: Master Lexicon 31"
  },
  {
    "id": "w31-incorporate",
    "word": "incorporate",
    "phonetic": "/ˌɪnˈkɔɹ.pɚˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menggabungkan / Memasukkan",
    "definition": "Menggabungkan atau memasukkan sesuatu sebagai bagian dari keseluruhan.",
    "contextSentences": [
      {
        "english": "The revised model will incorporate feedback from the pilot study.",
        "indonesian": "Model yang telah direvisi akan memasukkan umpan balik dari studi percontohan.",
        "clozeEnglish": "The revised model will ________ feedback from the pilot study."
      }
    ],
    "stageId": 31,
    "stageTitle": "Stage 31: Master Lexicon 31",
    "clusterId": 31,
    "clusterTitle": "Stage 31: Master Lexicon 31"
  },
  {
    "id": "w31-indifferent",
    "word": "indifferent",
    "phonetic": "/ˌɪnˈdɪ.fɹənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Acuh / Apatis",
    "definition": "Tidak peduli atau tidak menunjukkan minat/perasaan khusus.",
    "contextSentences": [
      {
        "english": "Some investors remained indifferent to the warning signs.",
        "indonesian": "Beberapa investor tetap tidak peduli terhadap tanda-tanda peringatan tersebut.",
        "clozeEnglish": "Some investors remained ________ to the warning signs."
      }
    ],
    "stageId": 31,
    "stageTitle": "Stage 31: Master Lexicon 31",
    "clusterId": 31,
    "clusterTitle": "Stage 31: Master Lexicon 31"
  },
  {
    "id": "w32-inevitable",
    "word": "inevitable",
    "phonetic": "/ˌɪˈnɛ.və.tə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Tak terhindarkan / Pasti",
    "definition": "Pasti terjadi dan tidak dapat dihindari.",
    "contextSentences": [
      {
        "english": "Some delays are inevitable during a major transition.",
        "indonesian": "Beberapa keterlambatan tidak dapat dihindari selama masa peralihan besar.",
        "clozeEnglish": "Some delays are ________ during a major transition."
      }
    ],
    "stageId": 32,
    "stageTitle": "Stage 32: Master Lexicon 32",
    "clusterId": 32,
    "clusterTitle": "Stage 32: Master Lexicon 32"
  },
  {
    "id": "w32-inevitably",
    "word": "inevitably",
    "phonetic": "/ˌɪˈnɛ.və.tə.bli/",
    "partOfSpeech": "adverb",
    "cefr": "B2",
    "translation": "Pasti / Niscaya",
    "definition": "Dengan cara yang tidak dapat dihindari; pasti sebagai akibat.",
    "contextSentences": [
      {
        "english": "If costs continue to rise, the project will inevitably require a revised budget.",
        "indonesian": "Jika biaya terus meningkat, proyek tersebut pada akhirnya pasti membutuhkan anggaran yang direvisi.",
        "clozeEnglish": "If costs continue to rise, the project will ________ require a revised budget."
      }
    ],
    "stageId": 32,
    "stageTitle": "Stage 32: Master Lexicon 32",
    "clusterId": 32,
    "clusterTitle": "Stage 32: Master Lexicon 32"
  },
  {
    "id": "w32-infallible",
    "word": "infallible",
    "phonetic": "/ˌɪnˈfæ.lə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C2",
    "translation": "Tak keliru / Selalu benar",
    "definition": "Tidak mungkin salah atau selalu tepat.",
    "contextSentences": [
      {
        "english": "No forecasting model is infallible, even when it uses extensive data.",
        "indonesian": "Tidak ada model peramalan yang selalu benar, bahkan ketika menggunakan data yang sangat luas.",
        "clozeEnglish": "No forecasting model is ________, even when it uses extensive data."
      }
    ],
    "stageId": 32,
    "stageTitle": "Stage 32: Master Lexicon 32",
    "clusterId": 32,
    "clusterTitle": "Stage 32: Master Lexicon 32"
  },
  {
    "id": "w32-inference",
    "word": "inference",
    "phonetic": "/ˈɪn.fɚ.əns/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Inferensi / Kesimpulan",
    "definition": "Kesimpulan yang ditarik dari bukti dan penalaran.",
    "contextSentences": [
      {
        "english": "The inference was supported by several independent observations.",
        "indonesian": "Kesimpulan tersebut didukung oleh beberapa pengamatan independen.",
        "clozeEnglish": "The ________ was supported by several independent observations."
      }
    ],
    "stageId": 32,
    "stageTitle": "Stage 32: Master Lexicon 32",
    "clusterId": 32,
    "clusterTitle": "Stage 32: Master Lexicon 32"
  },
  {
    "id": "w32-influential",
    "word": "influential",
    "phonetic": "/ˌɪn.fluˈɛn.ʃəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Berpengaruh / Berwibawa",
    "definition": "Memiliki pengaruh besar terhadap orang atau keputusan.",
    "contextSentences": [
      {
        "english": "An influential report changed how policymakers approached the issue.",
        "indonesian": "Laporan yang berpengaruh mengubah cara pembuat kebijakan menangani persoalan tersebut.",
        "clozeEnglish": "An ________ report changed how policymakers approached the issue."
      }
    ],
    "stageId": 32,
    "stageTitle": "Stage 32: Master Lexicon 32",
    "clusterId": 32,
    "clusterTitle": "Stage 32: Master Lexicon 32"
  },
  {
    "id": "w32-inherent",
    "word": "inherent",
    "phonetic": "/ɪnˈhɪ.ɹənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Melekat / Bawaan",
    "definition": "Melekat sebagai sifat dasar dan tidak terpisahkan.",
    "contextSentences": [
      {
        "english": "Every complex project carries inherent risks that require careful management.",
        "indonesian": "Setiap proyek yang kompleks memiliki risiko bawaan yang memerlukan pengelolaan cermat.",
        "clozeEnglish": "Every complex project carries ________ risks that require careful management."
      }
    ],
    "stageId": 32,
    "stageTitle": "Stage 32: Master Lexicon 32",
    "clusterId": 32,
    "clusterTitle": "Stage 32: Master Lexicon 32"
  },
  {
    "id": "w32-initiate",
    "word": "initiate",
    "phonetic": "/ˌɪˈnɪ.ʃiˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memulai / Memprakarsai",
    "definition": "Memulai atau memprakarsai suatu proses.",
    "contextSentences": [
      {
        "english": "The board will initiate an independent review of the incident.",
        "indonesian": "Dewan akan memulai peninjauan independen atas insiden tersebut.",
        "clozeEnglish": "The board will ________ an independent review of the incident."
      }
    ],
    "stageId": 32,
    "stageTitle": "Stage 32: Master Lexicon 32",
    "clusterId": 32,
    "clusterTitle": "Stage 32: Master Lexicon 32"
  },
  {
    "id": "w32-innovative",
    "word": "innovative",
    "phonetic": "/ˈɪ.nəˌveɪ.tɪv/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Inovatif / Kreatif",
    "definition": "Memperkenalkan ide/metode baru yang kreatif.",
    "contextSentences": [
      {
        "english": "The firm introduced an innovative method for reducing operating costs.",
        "indonesian": "Perusahaan tersebut memperkenalkan metode inovatif untuk mengurangi biaya operasional.",
        "clozeEnglish": "The firm introduced an ________ method for reducing operating costs."
      }
    ],
    "stageId": 32,
    "stageTitle": "Stage 32: Master Lexicon 32",
    "clusterId": 32,
    "clusterTitle": "Stage 32: Master Lexicon 32"
  },
  {
    "id": "w32-inquisitive",
    "word": "inquisitive",
    "phonetic": "/ˌɪnˈkwɪ.zɪ.tɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Ingin tahu / Penasaran",
    "definition": "Memiliki rasa ingin tahu dan suka menyelidiki.",
    "contextSentences": [
      {
        "english": "An inquisitive researcher asks questions that challenge common assumptions.",
        "indonesian": "Peneliti yang ingin tahu mengajukan pertanyaan yang menantang asumsi umum.",
        "clozeEnglish": "An ________ researcher asks questions that challenge common assumptions."
      }
    ],
    "stageId": 32,
    "stageTitle": "Stage 32: Master Lexicon 32",
    "clusterId": 32,
    "clusterTitle": "Stage 32: Master Lexicon 32"
  },
  {
    "id": "w32-insight",
    "word": "insight",
    "phonetic": "/ˈɪnˌsaɪt/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Wawasan / Pemahaman",
    "definition": "Wawasan atau pemahaman mendalam tentang sesuatu.",
    "contextSentences": [
      {
        "english": "The interviews provided valuable insight into employee behavior.",
        "indonesian": "Wawancara tersebut memberikan wawasan berharga tentang perilaku karyawan.",
        "clozeEnglish": "The interviews provided valuable ________ into employee behavior."
      }
    ],
    "stageId": 32,
    "stageTitle": "Stage 32: Master Lexicon 32",
    "clusterId": 32,
    "clusterTitle": "Stage 32: Master Lexicon 32"
  },
  {
    "id": "w33-integrity",
    "word": "integrity",
    "phonetic": "/ˌɪnˈtɛ.ɡɹə.ti/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Integritas / Kejujuran",
    "definition": "Kejujuran dan keteguhan memegang prinsip moral.",
    "contextSentences": [
      {
        "english": "Data integrity is essential to the credibility of the study.",
        "indonesian": "Integritas data sangat penting bagi kredibilitas penelitian.",
        "clozeEnglish": "Data ________ is essential to the credibility of the study."
      }
    ],
    "stageId": 33,
    "stageTitle": "Stage 33: Master Lexicon 33",
    "clusterId": 33,
    "clusterTitle": "Stage 33: Master Lexicon 33"
  },
  {
    "id": "w33-jeopardize",
    "word": "jeopardize",
    "phonetic": "/ˈdʒɛ.pɚˌdaɪz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membahayakan / Mengancam",
    "definition": "Membahayakan atau menempatkan sesuatu dalam risiko.",
    "contextSentences": [
      {
        "english": "Ignoring the security warning could jeopardize customer information.",
        "indonesian": "Mengabaikan peringatan keamanan dapat membahayakan informasi pelanggan.",
        "clozeEnglish": "Ignoring the security warning could ________ customer information."
      }
    ],
    "stageId": 33,
    "stageTitle": "Stage 33: Master Lexicon 33",
    "clusterId": 33,
    "clusterTitle": "Stage 33: Master Lexicon 33"
  },
  {
    "id": "w33-jeopardy",
    "word": "jeopardy",
    "phonetic": "/ˈdʒɛ.pɚ.di/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Bahaya / Ancaman",
    "definition": "Keadaan terancam atau berisiko mengalami kerugian.",
    "contextSentences": [
      {
        "english": "The project was in jeopardy after its main funding source withdrew.",
        "indonesian": "Proyek tersebut berada dalam bahaya setelah sumber pendanaan utamanya ditarik.",
        "clozeEnglish": "The project was in ________ after its main funding source withdrew."
      }
    ],
    "stageId": 33,
    "stageTitle": "Stage 33: Master Lexicon 33",
    "clusterId": 33,
    "clusterTitle": "Stage 33: Master Lexicon 33"
  },
  {
    "id": "w33-justification",
    "word": "justification",
    "phonetic": "/ˌdʒʌ.stə.fəˈkeɪ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Pembenaran / Alasan",
    "definition": "Alasan/pembenaran yang dapat diterima.",
    "contextSentences": [
      {
        "english": "The committee requested a clear justification for the additional expense.",
        "indonesian": "Komite meminta alasan yang jelas untuk pengeluaran tambahan tersebut.",
        "clozeEnglish": "The committee requested a clear ________ for the additional expense."
      }
    ],
    "stageId": 33,
    "stageTitle": "Stage 33: Master Lexicon 33",
    "clusterId": 33,
    "clusterTitle": "Stage 33: Master Lexicon 33"
  },
  {
    "id": "w33-justify",
    "word": "justify",
    "phonetic": "/ˈdʒʌ.stəˌfaɪ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Membenarkan / Menjustifikasi",
    "definition": "Memberikan alasan yang masuk akal untuk membenarkan tindakan/keputusan.",
    "contextSentences": [
      {
        "english": "The manager must justify the additional expenditure with measurable benefits.",
        "indonesian": "Manajer harus membenarkan pengeluaran tambahan tersebut dengan manfaat yang terukur.",
        "clozeEnglish": "The manager must ________ the additional expenditure with measurable benefits."
      }
    ],
    "stageId": 33,
    "stageTitle": "Stage 33: Master Lexicon 33",
    "clusterId": 33,
    "clusterTitle": "Stage 33: Master Lexicon 33"
  },
  {
    "id": "w33-juxtapose",
    "word": "juxtapose",
    "phonetic": "/ˌdʒʌk.stəˈpoʊz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menyandingkan / Membandingkan",
    "definition": "Menempatkan dua hal berdampingan untuk menunjukkan perbedaan/kemiripan.",
    "contextSentences": [
      {
        "english": "The article juxtaposes two competing explanations of the same event.",
        "indonesian": "Artikel tersebut menyandingkan dua penjelasan yang saling bersaing mengenai peristiwa yang sama.",
        "clozeEnglish": "The article ________s two competing explanations of the same event."
      }
    ],
    "stageId": 33,
    "stageTitle": "Stage 33: Master Lexicon 33",
    "clusterId": 33,
    "clusterTitle": "Stage 33: Master Lexicon 33"
  },
  {
    "id": "w33-keen",
    "word": "keen",
    "phonetic": "/ˈkin/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Antusias / Tajam",
    "definition": "Sangat tertarik/antusias; juga tajam dalam pengamatan atau pikiran.",
    "contextSentences": [
      {
        "english": "The analyst has a keen eye for inconsistencies in financial reports.",
        "indonesian": "Analis tersebut memiliki ketajaman dalam menemukan ketidakkonsistenan pada laporan keuangan.",
        "clozeEnglish": "The analyst has a ________ eye for inconsistencies in financial reports."
      }
    ],
    "stageId": 33,
    "stageTitle": "Stage 33: Master Lexicon 33",
    "clusterId": 33,
    "clusterTitle": "Stage 33: Master Lexicon 33"
  },
  {
    "id": "w33-kinship",
    "word": "kinship",
    "phonetic": "/ˈkɪnˌʃɪp/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Kekerabatan / Kedekatan",
    "definition": "Hubungan kekerabatan atau perasaan kedekatan/kesamaan.",
    "contextSentences": [
      {
        "english": "A sense of kinship developed among the researchers after years of collaboration.",
        "indonesian": "Rasa kekerabatan berkembang di antara para peneliti setelah bertahun-tahun bekerja sama.",
        "clozeEnglish": "A sense of ________ developed among the researchers after years of collaboration."
      }
    ],
    "stageId": 33,
    "stageTitle": "Stage 33: Master Lexicon 33",
    "clusterId": 33,
    "clusterTitle": "Stage 33: Master Lexicon 33"
  },
  {
    "id": "w33-knowledgeable",
    "word": "knowledgeable",
    "phonetic": "/ˈnɑ.lə.dʒə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Berpengetahuan / Paham",
    "definition": "Memiliki banyak pengetahuan tentang suatu bidang.",
    "contextSentences": [
      {
        "english": "A knowledgeable specialist explained the technical limitations of the model.",
        "indonesian": "Seorang spesialis yang berpengetahuan luas menjelaskan keterbatasan teknis model tersebut.",
        "clozeEnglish": "A ________ specialist explained the technical limitations of the model."
      }
    ],
    "stageId": 33,
    "stageTitle": "Stage 33: Master Lexicon 33",
    "clusterId": 33,
    "clusterTitle": "Stage 33: Master Lexicon 33"
  },
  {
    "id": "w33-lament",
    "word": "lament",
    "phonetic": "/ləˈmɛnt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Meratapi / Menyesali",
    "definition": "Meratapi atau mengungkapkan kesedihan/penyesalan.",
    "contextSentences": [
      {
        "english": "The director lamented the loss of experienced staff.",
        "indonesian": "Direktur tersebut meratapi hilangnya staf yang berpengalaman.",
        "clozeEnglish": "The director ________ed the loss of experienced staff."
      }
    ],
    "stageId": 33,
    "stageTitle": "Stage 33: Master Lexicon 33",
    "clusterId": 33,
    "clusterTitle": "Stage 33: Master Lexicon 33"
  },
  {
    "id": "w34-legible",
    "word": "legible",
    "phonetic": "/ˈlɛ.dʒə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Terbaca / Jelas",
    "definition": "Jelas dan mudah dibaca.",
    "contextSentences": [
      {
        "english": "The scanned contract must remain legible after compression.",
        "indonesian": "Kontrak yang dipindai harus tetap terbaca setelah dikompresi.",
        "clozeEnglish": "The scanned contract must remain ________ after compression."
      }
    ],
    "stageId": 34,
    "stageTitle": "Stage 34: Master Lexicon 34",
    "clusterId": 34,
    "clusterTitle": "Stage 34: Master Lexicon 34"
  },
  {
    "id": "w34-legitimate",
    "word": "legitimate",
    "phonetic": "/ləˈdʒɪ.tə.mət/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Sah / Masuk akal",
    "definition": "Sah menurut hukum/aturan atau dapat dibenarkan secara logis.",
    "contextSentences": [
      {
        "english": "The customer raised a legitimate concern about data privacy.",
        "indonesian": "Pelanggan menyampaikan kekhawatiran yang sah mengenai privasi data.",
        "clozeEnglish": "The customer raised a ________ concern about data privacy."
      }
    ],
    "stageId": 34,
    "stageTitle": "Stage 34: Master Lexicon 34",
    "clusterId": 34,
    "clusterTitle": "Stage 34: Master Lexicon 34"
  },
  {
    "id": "w34-leisure",
    "word": "leisure",
    "phonetic": "/ˈlɛ.ʒɚ/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Waktu luang / Rekreasi",
    "definition": "Waktu luang untuk beristirahat atau melakukan kegiatan pilihan.",
    "contextSentences": [
      {
        "english": "The analyst uses her leisure time to read research papers and improve her skills.",
        "indonesian": "Analis tersebut menggunakan waktu luangnya untuk membaca makalah penelitian dan meningkatkan keterampilannya.",
        "clozeEnglish": "The analyst uses her ________ time to read research papers and improve her skills."
      }
    ],
    "stageId": 34,
    "stageTitle": "Stage 34: Master Lexicon 34",
    "clusterId": 34,
    "clusterTitle": "Stage 34: Master Lexicon 34"
  },
  {
    "id": "w34-lethargic",
    "word": "lethargic",
    "phonetic": "/ləˈθɑɹ.dʒɪk/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Lesu / Lemas",
    "definition": "Lesu, lamban, dan kekurangan energi.",
    "contextSentences": [
      {
        "english": "The team felt lethargic after working through the night.",
        "indonesian": "Tim tersebut merasa lesu setelah bekerja sepanjang malam.",
        "clozeEnglish": "The team felt ________ after working through the night."
      }
    ],
    "stageId": 34,
    "stageTitle": "Stage 34: Master Lexicon 34",
    "clusterId": 34,
    "clusterTitle": "Stage 34: Master Lexicon 34"
  },
  {
    "id": "w34-leverage",
    "word": "leverage",
    "phonetic": "/ˈlɛ.vɚ.ɪdʒ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memanfaatkan / Mendayagunakan",
    "definition": "Memanfaatkan aset/kekuatan/situasi untuk memperoleh hasil lebih besar.",
    "contextSentences": [
      {
        "english": "The company can leverage existing data to improve customer service.",
        "indonesian": "Perusahaan dapat memanfaatkan data yang sudah ada untuk meningkatkan layanan pelanggan.",
        "clozeEnglish": "The company can ________ existing data to improve customer service."
      }
    ],
    "stageId": 34,
    "stageTitle": "Stage 34: Master Lexicon 34",
    "clusterId": 34,
    "clusterTitle": "Stage 34: Master Lexicon 34"
  },
  {
    "id": "w34-liaise",
    "word": "liaise",
    "phonetic": "/liˈeɪz/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Berkoordinasi / Berhubungan",
    "definition": "Berhubungan dan berkoordinasi dengan pihak lain.",
    "contextSentences": [
      {
        "english": "The project lead will liaise with external partners throughout the implementation.",
        "indonesian": "Pimpinan proyek akan berkoordinasi dengan mitra eksternal selama implementasi.",
        "clozeEnglish": "The project lead will ________ with external partners throughout the implementation."
      }
    ],
    "stageId": 34,
    "stageTitle": "Stage 34: Master Lexicon 34",
    "clusterId": 34,
    "clusterTitle": "Stage 34: Master Lexicon 34"
  },
  {
    "id": "w34-linger",
    "word": "linger",
    "phonetic": "/ˈlɪŋ.ɡɚ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Bertahan / Berlama-lama",
    "definition": "Bertahan lebih lama atau enggan menghilang/pergi.",
    "contextSentences": [
      {
        "english": "Concerns about data privacy continued to linger after the announcement.",
        "indonesian": "Kekhawatiran tentang privasi data terus bertahan setelah pengumuman tersebut.",
        "clozeEnglish": "Concerns about data privacy continued to ________ after the announcement."
      }
    ],
    "stageId": 34,
    "stageTitle": "Stage 34: Master Lexicon 34",
    "clusterId": 34,
    "clusterTitle": "Stage 34: Master Lexicon 34"
  },
  {
    "id": "w34-literal",
    "word": "literal",
    "phonetic": "/ˈlɪ.tɚ.əl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Harfiah / Literal",
    "definition": "Harfiah; sesuai arti kata sebenarnya, bukan kiasan.",
    "contextSentences": [
      {
        "english": "A literal translation may not preserve the original meaning.",
        "indonesian": "Terjemahan harfiah mungkin tidak mempertahankan makna aslinya.",
        "clozeEnglish": "A ________ translation may not preserve the original meaning."
      }
    ],
    "stageId": 34,
    "stageTitle": "Stage 34: Master Lexicon 34",
    "clusterId": 34,
    "clusterTitle": "Stage 34: Master Lexicon 34"
  },
  {
    "id": "w34-lucid",
    "word": "lucid",
    "phonetic": "/ˈlu.səd/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Jelas / Jernih",
    "definition": "Jernih, jelas, dan mudah dipahami.",
    "contextSentences": [
      {
        "english": "The report provides a lucid explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang jelas tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 34,
    "stageTitle": "Stage 34: Master Lexicon 34",
    "clusterId": 34,
    "clusterTitle": "Stage 34: Master Lexicon 34"
  },
  {
    "id": "w34-lucrative",
    "word": "lucrative",
    "phonetic": "/ˈlu.kɹə.tɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Menguntungkan / Produktif",
    "definition": "Menghasilkan keuntungan finansial yang besar.",
    "contextSentences": [
      {
        "english": "The firm entered a lucrative market with strong growth prospects.",
        "indonesian": "Perusahaan tersebut memasuki pasar yang sangat menguntungkan dengan prospek pertumbuhan kuat.",
        "clozeEnglish": "The firm entered a ________ market with strong growth prospects."
      }
    ],
    "stageId": 34,
    "stageTitle": "Stage 34: Master Lexicon 34",
    "clusterId": 34,
    "clusterTitle": "Stage 34: Master Lexicon 34"
  },
  {
    "id": "w35-magnitude",
    "word": "magnitude",
    "phonetic": "/ˈmæɡ.nəˌtud/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Besaran / Skala",
    "definition": "Ukuran, skala, atau tingkat besarnya suatu hal.",
    "contextSentences": [
      {
        "english": "The team underestimated the magnitude of the operational change.",
        "indonesian": "Tim tersebut meremehkan besarnya perubahan operasional.",
        "clozeEnglish": "The team underestimated the ________ of the operational change."
      }
    ],
    "stageId": 35,
    "stageTitle": "Stage 35: Master Lexicon 35",
    "clusterId": 35,
    "clusterTitle": "Stage 35: Master Lexicon 35"
  },
  {
    "id": "w35-mandate",
    "word": "mandate",
    "phonetic": "/ˈmænˌdeɪt/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Mandat / Perintah",
    "definition": "Perintah resmi, wewenang, atau amanat dari pihak yang berhak.",
    "contextSentences": [
      {
        "english": "The agency received a mandate to improve public access to information.",
        "indonesian": "Lembaga tersebut menerima mandat untuk meningkatkan akses masyarakat terhadap informasi.",
        "clozeEnglish": "The agency received a ________ to improve public access to information."
      }
    ],
    "stageId": 35,
    "stageTitle": "Stage 35: Master Lexicon 35",
    "clusterId": 35,
    "clusterTitle": "Stage 35: Master Lexicon 35"
  },
  {
    "id": "w35-mandatory",
    "word": "mandatory",
    "phonetic": "/ˈmæn.dəˌtɔ.ɹi/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Wajib / Keharusan",
    "definition": "Wajib menurut aturan atau ketentuan.",
    "contextSentences": [
      {
        "english": "Annual security training is mandatory for all employees.",
        "indonesian": "Pelatihan keamanan tahunan wajib diikuti oleh semua karyawan.",
        "clozeEnglish": "Annual security training is ________ for all employees."
      }
    ],
    "stageId": 35,
    "stageTitle": "Stage 35: Master Lexicon 35",
    "clusterId": 35,
    "clusterTitle": "Stage 35: Master Lexicon 35"
  },
  {
    "id": "w35-manifest",
    "word": "manifest",
    "phonetic": "/ˈmæ.nəˌfɛst/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menunjukkan / Mewujudkan",
    "definition": "Menunjukkan atau memperlihatkan secara nyata; sebagai adjektiva berarti jelas/nyata.",
    "contextSentences": [
      {
        "english": "The underlying problem may manifest itself as repeated system failures.",
        "indonesian": "Masalah mendasar tersebut dapat muncul dalam bentuk kegagalan sistem yang berulang.",
        "clozeEnglish": "The underlying problem may ________ itself as repeated system failures."
      }
    ],
    "stageId": 35,
    "stageTitle": "Stage 35: Master Lexicon 35",
    "clusterId": 35,
    "clusterTitle": "Stage 35: Master Lexicon 35"
  },
  {
    "id": "w35-manipulate",
    "word": "manipulate",
    "phonetic": "/məˈnɪp.jəˌleɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memanipulasi / Mengendalikan",
    "definition": "Mengendalikan atau mempengaruhi sesuatu/seseorang, kadang demi keuntungan pribadi.",
    "contextSentences": [
      {
        "english": "The analyst must not manipulate the dataset to obtain a preferred result.",
        "indonesian": "Analis tidak boleh memanipulasi kumpulan data untuk memperoleh hasil yang diinginkan.",
        "clozeEnglish": "The analyst must not ________ the dataset to obtain a preferred result."
      }
    ],
    "stageId": 35,
    "stageTitle": "Stage 35: Master Lexicon 35",
    "clusterId": 35,
    "clusterTitle": "Stage 35: Master Lexicon 35"
  },
  {
    "id": "w35-milestone",
    "word": "milestone",
    "phonetic": "/ˈmaɪlˌstoʊn/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Tonggak / Pencapaian",
    "definition": "Tahap/peristiwa penting dalam perkembangan atau pencapaian.",
    "contextSentences": [
      {
        "english": "Completing the first trial was a major milestone for the research team.",
        "indonesian": "Menyelesaikan uji coba pertama merupakan tonggak penting bagi tim riset.",
        "clozeEnglish": "Completing the first trial was a major ________ for the research team."
      }
    ],
    "stageId": 35,
    "stageTitle": "Stage 35: Master Lexicon 35",
    "clusterId": 35,
    "clusterTitle": "Stage 35: Master Lexicon 35"
  },
  {
    "id": "w35-moderate",
    "word": "moderate",
    "phonetic": "/ˈmɑ.dɚ.ət/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Sedang / Moderat",
    "definition": "Sedang atau tidak berlebihan; sebagai verba berarti mengendalikan/memandu diskusi.",
    "contextSentences": [
      {
        "english": "The company expects moderate growth during the next financial year.",
        "indonesian": "Perusahaan memperkirakan pertumbuhan moderat pada tahun keuangan berikutnya.",
        "clozeEnglish": "The company expects ________ growth during the next financial year."
      }
    ],
    "stageId": 35,
    "stageTitle": "Stage 35: Master Lexicon 35",
    "clusterId": 35,
    "clusterTitle": "Stage 35: Master Lexicon 35"
  },
  {
    "id": "w35-modify",
    "word": "modify",
    "phonetic": "/ˈmɑ.dəˌfaɪ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengubah / Memodifikasi",
    "definition": "Mengubah sebagian agar lebih sesuai atau lebih baik.",
    "contextSentences": [
      {
        "english": "The engineer will modify the prototype after reviewing the initial test results.",
        "indonesian": "Insinyur tersebut akan memodifikasi prototipe setelah meninjau hasil pengujian awal.",
        "clozeEnglish": "The engineer will ________ the prototype after reviewing the initial test results."
      }
    ],
    "stageId": 35,
    "stageTitle": "Stage 35: Master Lexicon 35",
    "clusterId": 35,
    "clusterTitle": "Stage 35: Master Lexicon 35"
  },
  {
    "id": "w35-mundane",
    "word": "mundane",
    "phonetic": "/mənˈdeɪn/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Rutin / Biasa",
    "definition": "Biasa, rutin, dan kurang menarik.",
    "contextSentences": [
      {
        "english": "Automation allows analysts to spend less time on mundane tasks.",
        "indonesian": "Otomatisasi memungkinkan analis menghabiskan lebih sedikit waktu untuk tugas-tugas rutin yang membosankan.",
        "clozeEnglish": "Automation allows analysts to spend less time on ________ tasks."
      }
    ],
    "stageId": 35,
    "stageTitle": "Stage 35: Master Lexicon 35",
    "clusterId": 35,
    "clusterTitle": "Stage 35: Master Lexicon 35"
  },
  {
    "id": "w35-narrative",
    "word": "narrative",
    "phonetic": "/ˈnæ.ɹə.tɪv/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Narasi / Cerita",
    "definition": "Narasi atau rangkaian cerita/peristiwa.",
    "contextSentences": [
      {
        "english": "The report presents a clear narrative of how the policy evolved.",
        "indonesian": "Laporan tersebut menyajikan narasi yang jelas tentang perkembangan kebijakan itu.",
        "clozeEnglish": "The report presents a clear ________ of how the policy evolved."
      }
    ],
    "stageId": 35,
    "stageTitle": "Stage 35: Master Lexicon 35",
    "clusterId": 35,
    "clusterTitle": "Stage 35: Master Lexicon 35"
  },
  {
    "id": "w36-navigate",
    "word": "navigate",
    "phonetic": "/ˈnæ.vəˌɡeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menavigasi / Mengarahkan",
    "definition": "Mengarahkan perjalanan atau menemukan jalan keluar dalam situasi rumit.",
    "contextSentences": [
      {
        "english": "The team must navigate complex regulatory requirements before launching the service.",
        "indonesian": "Tim harus menavigasi persyaratan regulasi yang rumit sebelum meluncurkan layanan.",
        "clozeEnglish": "The team must ________ complex regulatory requirements before launching the service."
      }
    ],
    "stageId": 36,
    "stageTitle": "Stage 36: Master Lexicon 36",
    "clusterId": 36,
    "clusterTitle": "Stage 36: Master Lexicon 36"
  },
  {
    "id": "w36-neglect",
    "word": "neglect",
    "phonetic": "/nəˈɡlɛkt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengabaikan / Menelantarkan",
    "definition": "Mengabaikan atau tidak merawat/memperhatikan sebagaimana mestinya.",
    "contextSentences": [
      {
        "english": "Organizations should not neglect basic cybersecurity practices.",
        "indonesian": "Organisasi tidak boleh mengabaikan praktik dasar keamanan siber.",
        "clozeEnglish": "Organizations should not ________ basic cybersecurity practices."
      }
    ],
    "stageId": 36,
    "stageTitle": "Stage 36: Master Lexicon 36",
    "clusterId": 36,
    "clusterTitle": "Stage 36: Master Lexicon 36"
  },
  {
    "id": "w36-negligible",
    "word": "negligible",
    "phonetic": "/ˈnɛ.ɡlə.dʒə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Sepele / Tak berarti",
    "definition": "Sangat kecil/tidak signifikan sehingga dapat diabaikan.",
    "contextSentences": [
      {
        "english": "The difference between the two estimates is negligible.",
        "indonesian": "Perbedaan antara kedua perkiraan tersebut dapat diabaikan.",
        "clozeEnglish": "The difference between the two estimates is ________."
      }
    ],
    "stageId": 36,
    "stageTitle": "Stage 36: Master Lexicon 36",
    "clusterId": 36,
    "clusterTitle": "Stage 36: Master Lexicon 36"
  },
  {
    "id": "w36-negotiate",
    "word": "negotiate",
    "phonetic": "/nəˈɡoʊ.ʃiˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Berunding / Bernegosiasi",
    "definition": "Berunding untuk mencapai kesepakatan.",
    "contextSentences": [
      {
        "english": "The procurement team will negotiate the contract terms with the supplier.",
        "indonesian": "Tim pengadaan akan merundingkan ketentuan kontrak dengan pemasok.",
        "clozeEnglish": "The procurement team will ________ the contract terms with the supplier."
      }
    ],
    "stageId": 36,
    "stageTitle": "Stage 36: Master Lexicon 36",
    "clusterId": 36,
    "clusterTitle": "Stage 36: Master Lexicon 36"
  },
  {
    "id": "w36-notion",
    "word": "notion",
    "phonetic": "/ˈnoʊ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Gagasan / Anggapan",
    "definition": "Gagasan, konsep, atau keyakinan tentang sesuatu.",
    "contextSentences": [
      {
        "english": "The notion that more data always leads to better decisions is misleading.",
        "indonesian": "Anggapan bahwa semakin banyak data selalu menghasilkan keputusan yang lebih baik itu menyesatkan.",
        "clozeEnglish": "The ________ that more data always leads to better decisions is misleading."
      }
    ],
    "stageId": 36,
    "stageTitle": "Stage 36: Master Lexicon 36",
    "clusterId": 36,
    "clusterTitle": "Stage 36: Master Lexicon 36"
  },
  {
    "id": "w36-notorious",
    "word": "notorious",
    "phonetic": "/noʊˈtɔ.ɹi.əs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Terkenal buruk / Bereputasi buruk",
    "definition": "Terkenal karena hal buruk/negatif.",
    "contextSentences": [
      {
        "english": "The intersection is notorious for frequent traffic delays.",
        "indonesian": "Persimpangan tersebut terkenal buruk karena sering mengalami kemacetan.",
        "clozeEnglish": "The intersection is ________ for frequent traffic delays."
      }
    ],
    "stageId": 36,
    "stageTitle": "Stage 36: Master Lexicon 36",
    "clusterId": 36,
    "clusterTitle": "Stage 36: Master Lexicon 36"
  },
  {
    "id": "w36-nuance",
    "word": "nuance",
    "phonetic": "/ˈnu.ɑns/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Nuansa / Perbedaan halus",
    "definition": "Perbedaan makna/perasaan yang sangat halus.",
    "contextSentences": [
      {
        "english": "The analyst considered every nuance before interpreting the survey responses.",
        "indonesian": "Analis tersebut mempertimbangkan setiap nuansa sebelum menafsirkan jawaban survei.",
        "clozeEnglish": "The analyst considered every ________ before interpreting the survey responses."
      }
    ],
    "stageId": 36,
    "stageTitle": "Stage 36: Master Lexicon 36",
    "clusterId": 36,
    "clusterTitle": "Stage 36: Master Lexicon 36"
  },
  {
    "id": "w36-objective",
    "word": "objective",
    "phonetic": "/əbˈdʒɛk.tɪv/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Tujuan / Sasaran",
    "definition": "Tujuan yang ingin dicapai; sebagai adjektiva berarti netral dan berdasarkan fakta.",
    "contextSentences": [
      {
        "english": "Our primary objective is to improve the accuracy of the forecasting model.",
        "indonesian": "Tujuan utama kami adalah meningkatkan akurasi model peramalan.",
        "clozeEnglish": "Our primary ________ is to improve the accuracy of the forecasting model."
      }
    ],
    "stageId": 36,
    "stageTitle": "Stage 36: Master Lexicon 36",
    "clusterId": 36,
    "clusterTitle": "Stage 36: Master Lexicon 36"
  },
  {
    "id": "w36-obligation",
    "word": "obligation",
    "phonetic": "/ˌɑ.bləˈɡeɪ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Kewajiban / Tanggung jawab",
    "definition": "Kewajiban karena hukum, janji, atau moral.",
    "contextSentences": [
      {
        "english": "The company has a legal obligation to protect customer information.",
        "indonesian": "Perusahaan memiliki kewajiban hukum untuk melindungi informasi pelanggan.",
        "clozeEnglish": "The company has a legal ________ to protect customer information."
      }
    ],
    "stageId": 36,
    "stageTitle": "Stage 36: Master Lexicon 36",
    "clusterId": 36,
    "clusterTitle": "Stage 36: Master Lexicon 36"
  },
  {
    "id": "w36-oblivious",
    "word": "oblivious",
    "phonetic": "/əˈblɪ.vi.əs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Tidak sadar / Tidak menyadari",
    "definition": "Tidak menyadari apa yang terjadi di sekitar.",
    "contextSentences": [
      {
        "english": "The manager was oblivious to the growing dissatisfaction within the team.",
        "indonesian": "Manajer tersebut tidak menyadari meningkatnya ketidakpuasan di dalam tim.",
        "clozeEnglish": "The manager was ________ to the growing dissatisfaction within the team."
      }
    ],
    "stageId": 36,
    "stageTitle": "Stage 36: Master Lexicon 36",
    "clusterId": 36,
    "clusterTitle": "Stage 36: Master Lexicon 36"
  },
  {
    "id": "w37-obscure",
    "word": "obscure",
    "phonetic": "/əbsˈkjʊɹ/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Samar / Tidak jelas",
    "definition": "Tidak jelas, tidak dikenal luas, atau sulit dipahami.",
    "contextSentences": [
      {
        "english": "The paper cites an obscure theory that few researchers have examined.",
        "indonesian": "Makalah tersebut mengutip teori yang tidak dikenal luas dan jarang diteliti.",
        "clozeEnglish": "The paper cites an ________ theory that few researchers have examined."
      }
    ],
    "stageId": 37,
    "stageTitle": "Stage 37: Master Lexicon 37",
    "clusterId": 37,
    "clusterTitle": "Stage 37: Master Lexicon 37"
  },
  {
    "id": "w37-obsolete",
    "word": "obsolete",
    "phonetic": "/ˈɑb.səˌlit/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Usang / Ketinggalan zaman",
    "definition": "Usang dan tidak lagi digunakan karena digantikan sesuatu yang lebih baru.",
    "contextSentences": [
      {
        "english": "The company replaced its obsolete reporting system with a modern platform.",
        "indonesian": "Perusahaan mengganti sistem pelaporan yang usang dengan platform modern.",
        "clozeEnglish": "The company replaced its ________ reporting system with a modern platform."
      }
    ],
    "stageId": 37,
    "stageTitle": "Stage 37: Master Lexicon 37",
    "clusterId": 37,
    "clusterTitle": "Stage 37: Master Lexicon 37"
  },
  {
    "id": "w37-obstinate",
    "word": "obstinate",
    "phonetic": "/ˈɑb.stə.nət/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Keras kepala / Bandel",
    "definition": "Keras kepala dan sulit mengubah pendirian.",
    "contextSentences": [
      {
        "english": "The obstinate negotiator refused to consider the revised terms.",
        "indonesian": "Negosiator yang keras kepala tersebut menolak mempertimbangkan ketentuan yang telah direvisi.",
        "clozeEnglish": "The ________ negotiator refused to consider the revised terms."
      }
    ],
    "stageId": 37,
    "stageTitle": "Stage 37: Master Lexicon 37",
    "clusterId": 37,
    "clusterTitle": "Stage 37: Master Lexicon 37"
  },
  {
    "id": "w37-omit",
    "word": "omit",
    "phonetic": "/oʊˈmɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menghilangkan / Melewatkan",
    "definition": "Tidak memasukkan atau melewatkan sesuatu.",
    "contextSentences": [
      {
        "english": "The editor decided to omit details that were irrelevant to the main argument.",
        "indonesian": "Editor memutuskan untuk menghilangkan detail yang tidak relevan dengan argumen utama.",
        "clozeEnglish": "The editor decided to ________ details that were irrelevant to the main argument."
      }
    ],
    "stageId": 37,
    "stageTitle": "Stage 37: Master Lexicon 37",
    "clusterId": 37,
    "clusterTitle": "Stage 37: Master Lexicon 37"
  },
  {
    "id": "w37-oppose",
    "word": "oppose",
    "phonetic": "/əˈpoʊz/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menentang / Melawan",
    "definition": "Menentang atau menyatakan ketidaksetujuan.",
    "contextSentences": [
      {
        "english": "Several analysts oppose the proposal because its assumptions are unrealistic.",
        "indonesian": "Sejumlah analis menentang proposal tersebut karena asumsinya tidak realistis.",
        "clozeEnglish": "Several analysts ________ the proposal because its assumptions are unrealistic."
      }
    ],
    "stageId": 37,
    "stageTitle": "Stage 37: Master Lexicon 37",
    "clusterId": 37,
    "clusterTitle": "Stage 37: Master Lexicon 37"
  },
  {
    "id": "w37-optimistic",
    "word": "optimistic",
    "phonetic": "/ˌɑp.təˈmɪ.stɪk/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Optimistis / Penuh harapan",
    "definition": "Memiliki harapan/dugaan positif tentang masa depan.",
    "contextSentences": [
      {
        "english": "The board remains optimistic about the project's long-term prospects.",
        "indonesian": "Dewan tetap optimistis terhadap prospek jangka panjang proyek tersebut.",
        "clozeEnglish": "The board remains ________ about the project's long-term prospects."
      }
    ],
    "stageId": 37,
    "stageTitle": "Stage 37: Master Lexicon 37",
    "clusterId": 37,
    "clusterTitle": "Stage 37: Master Lexicon 37"
  },
  {
    "id": "w37-overlook",
    "word": "overlook",
    "phonetic": "/ˈoʊ.vɚˌlʊk/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengabaikan / Melewatkan",
    "definition": "Tidak menyadari/melewatkan; juga memaafkan kesalahan kecil.",
    "contextSentences": [
      {
        "english": "The reviewer did not overlook the inconsistency in the final table.",
        "indonesian": "Penelaah tersebut tidak melewatkan ketidakkonsistenan dalam tabel akhir.",
        "clozeEnglish": "The reviewer did not ________ the inconsistency in the final table."
      }
    ],
    "stageId": 37,
    "stageTitle": "Stage 37: Master Lexicon 37",
    "clusterId": 37,
    "clusterTitle": "Stage 37: Master Lexicon 37"
  },
  {
    "id": "w37-paradigm",
    "word": "paradigm",
    "phonetic": "/ˈpɛ.ɹəˌdaɪm/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Paradigma / Pola",
    "definition": "Model atau pola dasar yang menjadi cara memahami/melakukan sesuatu.",
    "contextSentences": [
      {
        "english": "The discovery led to a paradigm shift in the field.",
        "indonesian": "Penemuan tersebut memicu perubahan paradigma dalam bidang itu.",
        "clozeEnglish": "The discovery led to a ________ shift in the field."
      }
    ],
    "stageId": 37,
    "stageTitle": "Stage 37: Master Lexicon 37",
    "clusterId": 37,
    "clusterTitle": "Stage 37: Master Lexicon 37"
  },
  {
    "id": "w37-paradox",
    "word": "paradox",
    "phonetic": "/ˈpɛ.ɹəˌdɑks/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Paradoks / Pertentangan semu",
    "definition": "Situasi/pernyataan yang tampak bertentangan tetapi mengandung kebenaran.",
    "contextSentences": [
      {
        "english": "The paradox is that greater efficiency sometimes creates additional complexity.",
        "indonesian": "Paradoksnya adalah bahwa efisiensi yang lebih tinggi terkadang justru menciptakan kerumitan tambahan.",
        "clozeEnglish": "The ________ is that greater efficiency sometimes creates additional complexity."
      }
    ],
    "stageId": 37,
    "stageTitle": "Stage 37: Master Lexicon 37",
    "clusterId": 37,
    "clusterTitle": "Stage 37: Master Lexicon 37"
  },
  {
    "id": "w37-paradoxical",
    "word": "paradoxical",
    "phonetic": "/ˌpɛ.ɹəˈdɑk.sɪ.kəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Paradoksal / Bertentangan semu",
    "definition": "Tampak bertentangan atau tidak masuk akal, tetapi mungkin benar.",
    "contextSentences": [
      {
        "english": "It is paradoxical that stricter controls can sometimes slow down routine work.",
        "indonesian": "Sungguh paradoks bahwa pengendalian yang lebih ketat terkadang dapat memperlambat pekerjaan rutin.",
        "clozeEnglish": "It is ________ that stricter controls can sometimes slow down routine work."
      }
    ],
    "stageId": 37,
    "stageTitle": "Stage 37: Master Lexicon 37",
    "clusterId": 37,
    "clusterTitle": "Stage 37: Master Lexicon 37"
  },
  {
    "id": "w38-parameter",
    "word": "parameter",
    "phonetic": "/pɚˈæ.mə.tɚ/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Parameter / Batasan",
    "definition": "Batasan atau kriteria yang menentukan ruang lingkup suatu proses.",
    "contextSentences": [
      {
        "english": "The model uses several parameters to estimate future demand.",
        "indonesian": "Model tersebut menggunakan beberapa parameter untuk memperkirakan permintaan di masa depan.",
        "clozeEnglish": "The model uses several ________s to estimate future demand."
      }
    ],
    "stageId": 38,
    "stageTitle": "Stage 38: Master Lexicon 38",
    "clusterId": 38,
    "clusterTitle": "Stage 38: Master Lexicon 38"
  },
  {
    "id": "w38-peculiar",
    "word": "peculiar",
    "phonetic": "/pəˈkjul.jɚ/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Aneh / Unik",
    "definition": "Aneh atau memiliki ciri khas yang tidak biasa.",
    "contextSentences": [
      {
        "english": "The analyst noticed a peculiar pattern in the transaction records.",
        "indonesian": "Analis tersebut melihat pola yang tidak lazim dalam catatan transaksi.",
        "clozeEnglish": "The analyst noticed a ________ pattern in the transaction records."
      }
    ],
    "stageId": 38,
    "stageTitle": "Stage 38: Master Lexicon 38",
    "clusterId": 38,
    "clusterTitle": "Stage 38: Master Lexicon 38"
  },
  {
    "id": "w38-pensive",
    "word": "pensive",
    "phonetic": "/ˈpɛn.sɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Murung / Merenung",
    "definition": "Tampak sedang berpikir mendalam atau merenung.",
    "contextSentences": [
      {
        "english": "The director appeared pensive while considering the proposed changes.",
        "indonesian": "Direktur tampak merenung ketika mempertimbangkan perubahan yang diusulkan.",
        "clozeEnglish": "The director appeared ________ while considering the proposed changes."
      }
    ],
    "stageId": 38,
    "stageTitle": "Stage 38: Master Lexicon 38",
    "clusterId": 38,
    "clusterTitle": "Stage 38: Master Lexicon 38"
  },
  {
    "id": "w38-perceive",
    "word": "perceive",
    "phonetic": "/pɚˈsiv/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memahami / Menangkap",
    "definition": "Melihat, menyadari, atau menafsirkan sesuatu dengan cara tertentu.",
    "contextSentences": [
      {
        "english": "Customers may perceive the sudden price increase as unfair.",
        "indonesian": "Pelanggan mungkin menganggap kenaikan harga yang mendadak sebagai tindakan yang tidak adil.",
        "clozeEnglish": "Customers may ________ the sudden price increase as unfair."
      }
    ],
    "stageId": 38,
    "stageTitle": "Stage 38: Master Lexicon 38",
    "clusterId": 38,
    "clusterTitle": "Stage 38: Master Lexicon 38"
  },
  {
    "id": "w38-perpetual",
    "word": "perpetual",
    "phonetic": "/pɚˈpɛ.tʃu.əl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Terus-menerus / Abadi",
    "definition": "Terus-menerus atau berlangsung tanpa henti.",
    "contextSentences": [
      {
        "english": "The team struggled with perpetual changes to the project scope.",
        "indonesian": "Tim tersebut kesulitan menghadapi perubahan ruang lingkup proyek yang terus-menerus.",
        "clozeEnglish": "The team struggled with ________ changes to the project scope."
      }
    ],
    "stageId": 38,
    "stageTitle": "Stage 38: Master Lexicon 38",
    "clusterId": 38,
    "clusterTitle": "Stage 38: Master Lexicon 38"
  },
  {
    "id": "w38-persevere",
    "word": "persevere",
    "phonetic": "/pɚ.səˈvɪɹ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Bertekun / Pantang menyerah",
    "definition": "Terus berusaha meskipun menghadapi kesulitan.",
    "contextSentences": [
      {
        "english": "The research team continued to persevere despite repeated setbacks.",
        "indonesian": "Tim riset terus bertekun meskipun berulang kali mengalami kemunduran.",
        "clozeEnglish": "The research team continued to ________ despite repeated setbacks."
      }
    ],
    "stageId": 38,
    "stageTitle": "Stage 38: Master Lexicon 38",
    "clusterId": 38,
    "clusterTitle": "Stage 38: Master Lexicon 38"
  },
  {
    "id": "w38-pervasive",
    "word": "pervasive",
    "phonetic": "/pɚˈveɪ.sɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Meluas / Meresap",
    "definition": "Tersebar luas dan mempengaruhi banyak bagian/area.",
    "contextSentences": [
      {
        "english": "The report describes the pervasive influence of digital platforms on communication.",
        "indonesian": "Laporan tersebut menggambarkan pengaruh luas platform digital terhadap komunikasi.",
        "clozeEnglish": "The report describes the ________ influence of digital platforms on communication."
      }
    ],
    "stageId": 38,
    "stageTitle": "Stage 38: Master Lexicon 38",
    "clusterId": 38,
    "clusterTitle": "Stage 38: Master Lexicon 38"
  },
  {
    "id": "w38-pivotal",
    "word": "pivotal",
    "phonetic": "/ˈpɪ.və.təl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Krusial / Menentukan",
    "definition": "Sangat penting dan berperan menentukan hasil.",
    "contextSentences": [
      {
        "english": "The pilot study played a pivotal role in securing further funding.",
        "indonesian": "Studi percontohan tersebut memainkan peran yang sangat menentukan dalam memperoleh pendanaan lanjutan.",
        "clozeEnglish": "The pilot study played a ________ role in securing further funding."
      }
    ],
    "stageId": 38,
    "stageTitle": "Stage 38: Master Lexicon 38",
    "clusterId": 38,
    "clusterTitle": "Stage 38: Master Lexicon 38"
  },
  {
    "id": "w38-plausible",
    "word": "plausible",
    "phonetic": "/ˈplɔ.zə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Masuk akal / Meyakinkan",
    "definition": "Tampak masuk akal atau dapat dipercaya, meski belum terbukti.",
    "contextSentences": [
      {
        "english": "The report provides a plausible explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang masuk akal tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 38,
    "stageTitle": "Stage 38: Master Lexicon 38",
    "clusterId": 38,
    "clusterTitle": "Stage 38: Master Lexicon 38"
  },
  {
    "id": "w38-precedence",
    "word": "precedence",
    "phonetic": "/ˈpɹɛ.sə.dəns/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Prioritas / Kedudukan utama",
    "definition": "Prioritas atau keadaan didahulukan daripada hal lain.",
    "contextSentences": [
      {
        "english": "During an emergency, public safety takes precedence over convenience.",
        "indonesian": "Dalam keadaan darurat, keselamatan publik lebih diutamakan daripada kenyamanan.",
        "clozeEnglish": "During an emergency, public safety takes ________ over convenience."
      }
    ],
    "stageId": 38,
    "stageTitle": "Stage 38: Master Lexicon 38",
    "clusterId": 38,
    "clusterTitle": "Stage 38: Master Lexicon 38"
  },
  {
    "id": "w39-precise",
    "word": "precise",
    "phonetic": "/pɹɪˈsaɪs/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Tepat / Akurat",
    "definition": "Tepat dan akurat dengan detail yang jelas.",
    "contextSentences": [
      {
        "english": "The report provides a precise explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang tepat tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 39,
    "stageTitle": "Stage 39: Master Lexicon 39",
    "clusterId": 39,
    "clusterTitle": "Stage 39: Master Lexicon 39"
  },
  {
    "id": "w39-prerequisite",
    "word": "prerequisite",
    "phonetic": "/pɹiˈɹɛ.kwə.zət/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Prasyarat / Syarat awal",
    "definition": "Syarat yang harus dipenuhi sebelum sesuatu dilakukan.",
    "contextSentences": [
      {
        "english": "A strong foundation in statistics is a prerequisite for this course.",
        "indonesian": "Dasar statistika yang kuat merupakan prasyarat untuk mengikuti mata kuliah ini.",
        "clozeEnglish": "A strong foundation in statistics is a ________ for this course."
      }
    ],
    "stageId": 39,
    "stageTitle": "Stage 39: Master Lexicon 39",
    "clusterId": 39,
    "clusterTitle": "Stage 39: Master Lexicon 39"
  },
  {
    "id": "w39-prevalent",
    "word": "prevalent",
    "phonetic": "/ˈpɹɛ.və.lənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Lazim / Umum",
    "definition": "Lazim atau sering ditemukan pada tempat/waktu tertentu.",
    "contextSentences": [
      {
        "english": "Remote collaboration has become prevalent across many industries.",
        "indonesian": "Kolaborasi jarak jauh telah menjadi hal yang lazim di berbagai industri.",
        "clozeEnglish": "Remote collaboration has become ________ across many industries."
      }
    ],
    "stageId": 39,
    "stageTitle": "Stage 39: Master Lexicon 39",
    "clusterId": 39,
    "clusterTitle": "Stage 39: Master Lexicon 39"
  },
  {
    "id": "w39-proficient",
    "word": "proficient",
    "phonetic": "/pɹɑˈfɪ.ʃənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Mahir / Terampil",
    "definition": "Mahir dan kompeten dalam suatu bidang/keterampilan.",
    "contextSentences": [
      {
        "english": "The position requires analysts who are proficient in statistical methods.",
        "indonesian": "Posisi tersebut membutuhkan analis yang mahir menggunakan metode statistik.",
        "clozeEnglish": "The position requires analysts who are ________ in statistical methods."
      }
    ],
    "stageId": 39,
    "stageTitle": "Stage 39: Master Lexicon 39",
    "clusterId": 39,
    "clusterTitle": "Stage 39: Master Lexicon 39"
  },
  {
    "id": "w39-profound",
    "word": "profound",
    "phonetic": "/pɹoʊˈfaʊnd/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Mendalam / Berarti",
    "definition": "Sangat mendalam atau memiliki dampak/pengaruh besar.",
    "contextSentences": [
      {
        "english": "The policy change had a profound effect on local businesses.",
        "indonesian": "Perubahan kebijakan tersebut memberikan dampak mendalam terhadap usaha lokal.",
        "clozeEnglish": "The policy change had a ________ effect on local businesses."
      }
    ],
    "stageId": 39,
    "stageTitle": "Stage 39: Master Lexicon 39",
    "clusterId": 39,
    "clusterTitle": "Stage 39: Master Lexicon 39"
  },
  {
    "id": "w39-prominent",
    "word": "prominent",
    "phonetic": "/ˈpɹɑ.mə.nənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Terkemuka / Menonjol",
    "definition": "Terkenal, penting, atau mudah terlihat/menonjol.",
    "contextSentences": [
      {
        "english": "A prominent researcher reviewed the study before publication.",
        "indonesian": "Seorang peneliti terkemuka meninjau studi tersebut sebelum diterbitkan.",
        "clozeEnglish": "A ________ researcher reviewed the study before publication."
      }
    ],
    "stageId": 39,
    "stageTitle": "Stage 39: Master Lexicon 39",
    "clusterId": 39,
    "clusterTitle": "Stage 39: Master Lexicon 39"
  },
  {
    "id": "w39-prosperity",
    "word": "prosperity",
    "phonetic": "/pɹɑˈspɛ.ɹə.ti/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Kemakmuran / Kesejahteraan",
    "definition": "Kemakmuran atau keadaan sejahtera, sering terkait ekonomi.",
    "contextSentences": [
      {
        "english": "Long-term prosperity depends on stable institutions and productive investment.",
        "indonesian": "Kemakmuran jangka panjang bergantung pada institusi yang stabil dan investasi produktif.",
        "clozeEnglish": "Long-term ________ depends on stable institutions and productive investment."
      }
    ],
    "stageId": 39,
    "stageTitle": "Stage 39: Master Lexicon 39",
    "clusterId": 39,
    "clusterTitle": "Stage 39: Master Lexicon 39"
  },
  {
    "id": "w39-qualify",
    "word": "qualify",
    "phonetic": "/ˈkwɑ.ləˌfaɪ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memenuhi syarat / Melayakkan",
    "definition": "Memenuhi syarat; juga membuat seseorang memenuhi kriteria.",
    "contextSentences": [
      {
        "english": "Applicants must qualify for the grant by meeting the published criteria.",
        "indonesian": "Pelamar harus memenuhi syarat untuk memperoleh hibah dengan memenuhi kriteria yang dipublikasikan.",
        "clozeEnglish": "Applicants must ________ for the grant by meeting the published criteria."
      }
    ],
    "stageId": 39,
    "stageTitle": "Stage 39: Master Lexicon 39",
    "clusterId": 39,
    "clusterTitle": "Stage 39: Master Lexicon 39"
  },
  {
    "id": "w39-quantitative",
    "word": "quantitative",
    "phonetic": "/ˈkwɑn.tɪˌteɪ.tɪv/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Kuantitatif / Berdasarkan angka",
    "definition": "Berkaitan dengan jumlah/angka yang dapat diukur.",
    "contextSentences": [
      {
        "english": "The team collected quantitative data from more than 500 participants.",
        "indonesian": "Tim tersebut mengumpulkan data kuantitatif dari lebih dari 500 peserta.",
        "clozeEnglish": "The team collected ________ data from more than 500 participants."
      }
    ],
    "stageId": 39,
    "stageTitle": "Stage 39: Master Lexicon 39",
    "clusterId": 39,
    "clusterTitle": "Stage 39: Master Lexicon 39"
  },
  {
    "id": "w39-quota",
    "word": "quota",
    "phonetic": "/ˈkwoʊ.tə/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Kuota / Jatah",
    "definition": "Batas atau target jumlah tertentu.",
    "contextSentences": [
      {
        "english": "The sales team reached its monthly quota ahead of schedule.",
        "indonesian": "Tim penjualan mencapai kuota bulanannya lebih cepat dari jadwal.",
        "clozeEnglish": "The sales team reached its monthly ________ ahead of schedule."
      }
    ],
    "stageId": 39,
    "stageTitle": "Stage 39: Master Lexicon 39",
    "clusterId": 39,
    "clusterTitle": "Stage 39: Master Lexicon 39"
  },
  {
    "id": "w40-quote",
    "word": "quote",
    "phonetic": "/ˈkwoʊt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengutip / Menyitir",
    "definition": "Mengutip kata-kata persis dari sumber lain; sebagai nomina berarti kutipan/penawaran harga.",
    "contextSentences": [
      {
        "english": "The report quotes the original source to support its central claim.",
        "indonesian": "Laporan tersebut mengutip sumber asli untuk mendukung klaim utamanya.",
        "clozeEnglish": "The report ________s the original source to support its central claim."
      }
    ],
    "stageId": 40,
    "stageTitle": "Stage 40: Master Lexicon 40",
    "clusterId": 40,
    "clusterTitle": "Stage 40: Master Lexicon 40"
  },
  {
    "id": "w40-radical",
    "word": "radical",
    "phonetic": "/ˈɹæ.də.kəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Radikal / Mendasar",
    "definition": "Radikal; sangat mendasar, drastis, atau jauh berbeda dari kebiasaan.",
    "contextSentences": [
      {
        "english": "The committee considered the proposal radical after reviewing all available evidence.",
        "indonesian": "Komite menilai proposal tersebut radikal setelah meninjau seluruh bukti yang tersedia.",
        "clozeEnglish": "The committee considered the proposal ________ after reviewing all available evidence."
      }
    ],
    "stageId": 40,
    "stageTitle": "Stage 40: Master Lexicon 40",
    "clusterId": 40,
    "clusterTitle": "Stage 40: Master Lexicon 40"
  },
  {
    "id": "w40-reassure",
    "word": "reassure",
    "phonetic": "/ˌɹi.əˈʃʊɹ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menenangkan / Meyakinkan",
    "definition": "Menenangkan seseorang dengan mengurangi keraguan/ketakutan.",
    "contextSentences": [
      {
        "english": "The project manager reassured clients that their records were secure.",
        "indonesian": "Manajer proyek meyakinkan klien bahwa catatan mereka aman.",
        "clozeEnglish": "The project manager ________d clients that their records were secure."
      }
    ],
    "stageId": 40,
    "stageTitle": "Stage 40: Master Lexicon 40",
    "clusterId": 40,
    "clusterTitle": "Stage 40: Master Lexicon 40"
  },
  {
    "id": "w40-reconcile",
    "word": "reconcile",
    "phonetic": "/ˈɹɛ.kənˌsaɪl/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mendamaikan / Mencocokkan",
    "definition": "Mendamaikan perbedaan atau mencocokkan dua catatan/data.",
    "contextSentences": [
      {
        "english": "The accountant must reconcile the figures before closing the monthly report.",
        "indonesian": "Akuntan harus mencocokkan angka-angka tersebut sebelum menutup laporan bulanan.",
        "clozeEnglish": "The accountant must ________ the figures before closing the monthly report."
      }
    ],
    "stageId": 40,
    "stageTitle": "Stage 40: Master Lexicon 40",
    "clusterId": 40,
    "clusterTitle": "Stage 40: Master Lexicon 40"
  },
  {
    "id": "w40-rectify",
    "word": "rectify",
    "phonetic": "/ˈɹɛk.təˌfaɪ/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Memperbaiki / Membetulkan",
    "definition": "Memperbaiki kesalahan atau kondisi yang tidak tepat.",
    "contextSentences": [
      {
        "english": "The developer worked quickly to rectify the error in the payment module.",
        "indonesian": "Pengembang segera bekerja untuk memperbaiki kesalahan pada modul pembayaran.",
        "clozeEnglish": "The developer worked quickly to ________ the error in the payment module."
      }
    ],
    "stageId": 40,
    "stageTitle": "Stage 40: Master Lexicon 40",
    "clusterId": 40,
    "clusterTitle": "Stage 40: Master Lexicon 40"
  },
  {
    "id": "w40-redundant",
    "word": "redundant",
    "phonetic": "/ɹɪˈdʌn.dənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Berlebihan / Tidak diperlukan",
    "definition": "Tidak diperlukan lagi karena berlebihan atau sudah digantikan.",
    "contextSentences": [
      {
        "english": "The new platform made several manual reporting steps redundant.",
        "indonesian": "Platform baru tersebut membuat beberapa langkah pelaporan manual tidak lagi diperlukan.",
        "clozeEnglish": "The new platform made several manual reporting steps ________."
      }
    ],
    "stageId": 40,
    "stageTitle": "Stage 40: Master Lexicon 40",
    "clusterId": 40,
    "clusterTitle": "Stage 40: Master Lexicon 40"
  },
  {
    "id": "w40-refine",
    "word": "refine",
    "phonetic": "/ɹəˈfaɪn/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menyempurnakan / Memurnikan",
    "definition": "Menyempurnakan atau memperbaiki kualitas/ketepatan.",
    "contextSentences": [
      {
        "english": "The team will refine the model after reviewing the validation results.",
        "indonesian": "Tim akan menyempurnakan model setelah meninjau hasil validasi.",
        "clozeEnglish": "The team will ________ the model after reviewing the validation results."
      }
    ],
    "stageId": 40,
    "stageTitle": "Stage 40: Master Lexicon 40",
    "clusterId": 40,
    "clusterTitle": "Stage 40: Master Lexicon 40"
  },
  {
    "id": "w40-reiterate",
    "word": "reiterate",
    "phonetic": "/ɹiˈɪ.tɚˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Mengulangi / Menegaskan kembali",
    "definition": "Mengulangi pernyataan untuk menegaskan kembali.",
    "contextSentences": [
      {
        "english": "The chairperson had to reiterate the deadline at the end of the meeting.",
        "indonesian": "Ketua harus menegaskan kembali tenggat waktu pada akhir rapat.",
        "clozeEnglish": "The chairperson had to ________ the deadline at the end of the meeting."
      }
    ],
    "stageId": 40,
    "stageTitle": "Stage 40: Master Lexicon 40",
    "clusterId": 40,
    "clusterTitle": "Stage 40: Master Lexicon 40"
  },
  {
    "id": "w40-relentless",
    "word": "relentless",
    "phonetic": "/ɹɪˈlɛnt.lɪs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Gigih / Tak henti-henti",
    "definition": "Terus-menerus dan tidak mengendur; gigih tanpa henti.",
    "contextSentences": [
      {
        "english": "The project team faced relentless pressure to deliver the product on time.",
        "indonesian": "Tim proyek menghadapi tekanan tanpa henti untuk mengirimkan produk tepat waktu.",
        "clozeEnglish": "The project team faced ________ pressure to deliver the product on time."
      }
    ],
    "stageId": 40,
    "stageTitle": "Stage 40: Master Lexicon 40",
    "clusterId": 40,
    "clusterTitle": "Stage 40: Master Lexicon 40"
  },
  {
    "id": "w40-relevant",
    "word": "relevant",
    "phonetic": "/ˈɹɛ.lə.vənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Relevan / Berkaitan",
    "definition": "Berhubungan langsung dan penting bagi topik/tujuan.",
    "contextSentences": [
      {
        "english": "Please include only relevant evidence in the final report.",
        "indonesian": "Harap sertakan hanya bukti yang relevan dalam laporan akhir.",
        "clozeEnglish": "Please include only ________ evidence in the final report."
      }
    ],
    "stageId": 40,
    "stageTitle": "Stage 40: Master Lexicon 40",
    "clusterId": 40,
    "clusterTitle": "Stage 40: Master Lexicon 40"
  },
  {
    "id": "w41-reluctant",
    "word": "reluctant",
    "phonetic": "/ɹɪˈlʌk.tənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Enggan / Segan",
    "definition": "Enggan atau tidak bersedia melakukan sesuatu.",
    "contextSentences": [
      {
        "english": "Several employees were reluctant to adopt the new procedure.",
        "indonesian": "Beberapa karyawan enggan menerapkan prosedur baru tersebut.",
        "clozeEnglish": "Several employees were ________ to adopt the new procedure."
      }
    ],
    "stageId": 41,
    "stageTitle": "Stage 41: Master Lexicon 41",
    "clusterId": 41,
    "clusterTitle": "Stage 41: Master Lexicon 41"
  },
  {
    "id": "w41-resilience",
    "word": "resilience",
    "phonetic": "/ɹɪˈzɪ.li.əns/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Ketangguhan / Daya lenting",
    "definition": "Ketangguhan atau kemampuan untuk pulih dari kesulitan.",
    "contextSentences": [
      {
        "english": "The resilience of the network was tested during the service outage.",
        "indonesian": "Ketangguhan jaringan tersebut diuji selama gangguan layanan.",
        "clozeEnglish": "The ________ of the network was tested during the service outage."
      }
    ],
    "stageId": 41,
    "stageTitle": "Stage 41: Master Lexicon 41",
    "clusterId": 41,
    "clusterTitle": "Stage 41: Master Lexicon 41"
  },
  {
    "id": "w41-resilient",
    "word": "resilient",
    "phonetic": "/ɹɪˈzɪl.jənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Tangguh / Ulet",
    "definition": "Mampu pulih/beradaptasi dengan cepat setelah kesulitan.",
    "contextSentences": [
      {
        "english": "A resilient organization can recover quickly from unexpected disruptions.",
        "indonesian": "Organisasi yang tangguh dapat pulih dengan cepat dari gangguan yang tidak terduga.",
        "clozeEnglish": "A ________ organization can recover quickly from unexpected disruptions."
      }
    ],
    "stageId": 41,
    "stageTitle": "Stage 41: Master Lexicon 41",
    "clusterId": 41,
    "clusterTitle": "Stage 41: Master Lexicon 41"
  },
  {
    "id": "w41-resolve",
    "word": "resolve",
    "phonetic": "/ɹiˈzɑlv/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menyelesaikan / Memecahkan",
    "definition": "Menyelesaikan masalah; juga memutuskan dengan tegas.",
    "contextSentences": [
      {
        "english": "The two departments met to resolve the disagreement over data ownership.",
        "indonesian": "Kedua departemen bertemu untuk menyelesaikan perselisihan mengenai kepemilikan data.",
        "clozeEnglish": "The two departments met to ________ the disagreement over data ownership."
      }
    ],
    "stageId": 41,
    "stageTitle": "Stage 41: Master Lexicon 41",
    "clusterId": 41,
    "clusterTitle": "Stage 41: Master Lexicon 41"
  },
  {
    "id": "w41-retain",
    "word": "retain",
    "phonetic": "/ɹɪˈteɪn/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mempertahankan / Menyimpan",
    "definition": "Mempertahankan atau tetap memiliki sesuatu.",
    "contextSentences": [
      {
        "english": "The company introduced new opportunities to retain experienced employees.",
        "indonesian": "Perusahaan memperkenalkan peluang baru untuk mempertahankan karyawan berpengalaman.",
        "clozeEnglish": "The company introduced new opportunities to ________ experienced employees."
      }
    ],
    "stageId": 41,
    "stageTitle": "Stage 41: Master Lexicon 41",
    "clusterId": 41,
    "clusterTitle": "Stage 41: Master Lexicon 41"
  },
  {
    "id": "w41-robust",
    "word": "robust",
    "phonetic": "/ɹoʊˈbʌst/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Kuat / Kokoh",
    "definition": "Kuat, kokoh, dan dapat diandalkan; juga pertumbuhan yang solid.",
    "contextSentences": [
      {
        "english": "The board adopted a robust strategy to manage operational risks.",
        "indonesian": "Dewan mengadopsi strategi yang kuat untuk mengelola risiko operasional.",
        "clozeEnglish": "The board adopted a ________ strategy to manage operational risks."
      }
    ],
    "stageId": 41,
    "stageTitle": "Stage 41: Master Lexicon 41",
    "clusterId": 41,
    "clusterTitle": "Stage 41: Master Lexicon 41"
  },
  {
    "id": "w41-saturate",
    "word": "saturate",
    "phonetic": "/ˈsæ.tʃɚˌeɪt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menjenuhkan / Memenuhi",
    "definition": "Memenuhi hingga jenuh; juga membuat sesuatu benar-benar basah.",
    "contextSentences": [
      {
        "english": "The company chose not to saturate the market with similar products.",
        "indonesian": "Perusahaan memilih untuk tidak memenuhi pasar dengan produk-produk serupa.",
        "clozeEnglish": "The company chose not to ________ the market with similar products."
      }
    ],
    "stageId": 41,
    "stageTitle": "Stage 41: Master Lexicon 41",
    "clusterId": 41,
    "clusterTitle": "Stage 41: Master Lexicon 41"
  },
  {
    "id": "w41-scrutiny",
    "word": "scrutiny",
    "phonetic": "/ˈskɹu.tə.ni/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Pemeriksaan / Pengawasan",
    "definition": "Pemeriksaan/pengamatan yang sangat teliti dan kritis.",
    "contextSentences": [
      {
        "english": "The financial statements came under close scrutiny during the audit.",
        "indonesian": "Laporan keuangan tersebut diperiksa secara saksama selama audit.",
        "clozeEnglish": "The financial statements came under close ________ during the audit."
      }
    ],
    "stageId": 41,
    "stageTitle": "Stage 41: Master Lexicon 41",
    "clusterId": 41,
    "clusterTitle": "Stage 41: Master Lexicon 41"
  },
  {
    "id": "w41-sequence",
    "word": "sequence",
    "phonetic": "/ˈsi.kwəns/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Urutan / Rangkaian",
    "definition": "Urutan atau rangkaian hal/peristiwa.",
    "contextSentences": [
      {
        "english": "The analyst examined the sequence of events leading to the failure.",
        "indonesian": "Analis tersebut memeriksa urutan peristiwa yang menyebabkan kegagalan.",
        "clozeEnglish": "The analyst examined the ________ of events leading to the failure."
      }
    ],
    "stageId": 41,
    "stageTitle": "Stage 41: Master Lexicon 41",
    "clusterId": 41,
    "clusterTitle": "Stage 41: Master Lexicon 41"
  },
  {
    "id": "w41-sincere",
    "word": "sincere",
    "phonetic": "/sɪnˈsɪɹ/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Tulus / Ikhlas",
    "definition": "Tulus dan jujur, bukan berpura-pura.",
    "contextSentences": [
      {
        "english": "The company issued a sincere apology and outlined steps to prevent a recurrence.",
        "indonesian": "Perusahaan menyampaikan permintaan maaf yang tulus dan menjelaskan langkah-langkah untuk mencegah kejadian serupa.",
        "clozeEnglish": "The company issued a ________ apology and outlined steps to prevent a recurrence."
      }
    ],
    "stageId": 41,
    "stageTitle": "Stage 41: Master Lexicon 41",
    "clusterId": 41,
    "clusterTitle": "Stage 41: Master Lexicon 41"
  },
  {
    "id": "w42-stagnant",
    "word": "stagnant",
    "phonetic": "/ˈstæɡ.nənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Mandek / Stagnan",
    "definition": "Mandek dan tidak berkembang/bergerak.",
    "contextSentences": [
      {
        "english": "Revenue remained stagnant for two quarters despite higher spending.",
        "indonesian": "Pendapatan tetap mandek selama dua kuartal meskipun pengeluaran meningkat.",
        "clozeEnglish": "Revenue remained ________ for two quarters despite higher spending."
      }
    ],
    "stageId": 42,
    "stageTitle": "Stage 42: Master Lexicon 42",
    "clusterId": 42,
    "clusterTitle": "Stage 42: Master Lexicon 42"
  },
  {
    "id": "w42-stimulate",
    "word": "stimulate",
    "phonetic": "/ˈstɪm.jəˌleɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Merangsang / Mendorong",
    "definition": "Merangsang atau mendorong aktivitas/perkembangan.",
    "contextSentences": [
      {
        "english": "The policy is designed to stimulate investment in research and development.",
        "indonesian": "Kebijakan tersebut dirancang untuk mendorong investasi dalam penelitian dan pengembangan.",
        "clozeEnglish": "The policy is designed to ________ investment in research and development."
      }
    ],
    "stageId": 42,
    "stageTitle": "Stage 42: Master Lexicon 42",
    "clusterId": 42,
    "clusterTitle": "Stage 42: Master Lexicon 42"
  },
  {
    "id": "w42-strenuous",
    "word": "strenuous",
    "phonetic": "/ˈstɹɛn.ju.əs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Berat / Menguras tenaga",
    "definition": "Memerlukan tenaga atau usaha fisik/mental yang besar.",
    "contextSentences": [
      {
        "english": "The fieldwork involved strenuous physical activity in difficult conditions.",
        "indonesian": "Kerja lapangan tersebut melibatkan aktivitas fisik yang berat dalam kondisi sulit.",
        "clozeEnglish": "The fieldwork involved ________ physical activity in difficult conditions."
      }
    ],
    "stageId": 42,
    "stageTitle": "Stage 42: Master Lexicon 42",
    "clusterId": 42,
    "clusterTitle": "Stage 42: Master Lexicon 42"
  },
  {
    "id": "w42-substantial",
    "word": "substantial",
    "phonetic": "/səbˈstæn.ʃəl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Signifikan / Besar",
    "definition": "Besar, penting, atau signifikan dalam jumlah/nilai/dampak.",
    "contextSentences": [
      {
        "english": "The new process delivered a substantial improvement in efficiency.",
        "indonesian": "Proses baru tersebut menghasilkan peningkatan efisiensi yang signifikan.",
        "clozeEnglish": "The new process delivered a ________ improvement in efficiency."
      }
    ],
    "stageId": 42,
    "stageTitle": "Stage 42: Master Lexicon 42",
    "clusterId": 42,
    "clusterTitle": "Stage 42: Master Lexicon 42"
  },
  {
    "id": "w42-subtle",
    "word": "subtle",
    "phonetic": "/ˈsʌ.təl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Halus / Samar",
    "definition": "Halus atau tidak mencolok sehingga mudah terlewat.",
    "contextSentences": [
      {
        "english": "The report provides a subtle explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang halus tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 42,
    "stageTitle": "Stage 42: Master Lexicon 42",
    "clusterId": 42,
    "clusterTitle": "Stage 42: Master Lexicon 42"
  },
  {
    "id": "w42-surpass",
    "word": "surpass",
    "phonetic": "/sɚˈpæs/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Melampaui / Mengungguli",
    "definition": "Melampaui atau mengungguli pencapaian sebelumnya/pihak lain.",
    "contextSentences": [
      {
        "english": "The latest results are expected to surpass the team's original target.",
        "indonesian": "Hasil terbaru diperkirakan akan melampaui target awal tim.",
        "clozeEnglish": "The latest results are expected to ________ the team's original target."
      }
    ],
    "stageId": 42,
    "stageTitle": "Stage 42: Master Lexicon 42",
    "clusterId": 42,
    "clusterTitle": "Stage 42: Master Lexicon 42"
  },
  {
    "id": "w42-suspend",
    "word": "suspend",
    "phonetic": "/səˈspɛnd/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menangguhkan / Menunda",
    "definition": "Menangguhkan sementara atau menghentikan untuk sementara.",
    "contextSentences": [
      {
        "english": "The committee decided to suspend the project until the risks were reviewed.",
        "indonesian": "Komite memutuskan untuk menangguhkan proyek sampai risikonya ditinjau.",
        "clozeEnglish": "The committee decided to ________ the project until the risks were reviewed."
      }
    ],
    "stageId": 42,
    "stageTitle": "Stage 42: Master Lexicon 42",
    "clusterId": 42,
    "clusterTitle": "Stage 42: Master Lexicon 42"
  },
  {
    "id": "w42-sustain",
    "word": "sustain",
    "phonetic": "/səˈsteɪn/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mempertahankan / Menopang",
    "definition": "Mempertahankan agar tetap berlangsung; juga menanggung/mengalami.",
    "contextSentences": [
      {
        "english": "The company must innovate continuously to sustain long-term growth.",
        "indonesian": "Perusahaan harus terus berinovasi untuk mempertahankan pertumbuhan jangka panjang.",
        "clozeEnglish": "The company must innovate continuously to ________ long-term growth."
      }
    ],
    "stageId": 42,
    "stageTitle": "Stage 42: Master Lexicon 42",
    "clusterId": 42,
    "clusterTitle": "Stage 42: Master Lexicon 42"
  },
  {
    "id": "w42-tangible",
    "word": "tangible",
    "phonetic": "/ˈtæn.dʒə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Nyata / Konkret",
    "definition": "Nyata, dapat disentuh, dirasakan, atau dibuktikan.",
    "contextSentences": [
      {
        "english": "The project delivered tangible benefits within its first six months.",
        "indonesian": "Proyek tersebut menghasilkan manfaat nyata dalam enam bulan pertama.",
        "clozeEnglish": "The project delivered ________ benefits within its first six months."
      }
    ],
    "stageId": 42,
    "stageTitle": "Stage 42: Master Lexicon 42",
    "clusterId": 42,
    "clusterTitle": "Stage 42: Master Lexicon 42"
  },
  {
    "id": "w42-tenacious",
    "word": "tenacious",
    "phonetic": "/təˈneɪ.ʃəs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Gigih / Ulet",
    "definition": "Gigih dan tidak mudah menyerah.",
    "contextSentences": [
      {
        "english": "A tenacious researcher continued testing the hypothesis despite repeated setbacks.",
        "indonesian": "Peneliti yang gigih terus menguji hipotesis tersebut meskipun berulang kali mengalami hambatan.",
        "clozeEnglish": "A ________ researcher continued testing the hypothesis despite repeated setbacks."
      }
    ],
    "stageId": 42,
    "stageTitle": "Stage 42: Master Lexicon 42",
    "clusterId": 42,
    "clusterTitle": "Stage 42: Master Lexicon 42"
  },
  {
    "id": "w43-terminate",
    "word": "terminate",
    "phonetic": "/ˈtɝ.məˌneɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengakhiri / Memberhentikan",
    "definition": "Mengakhiri atau memberhentikan secara resmi.",
    "contextSentences": [
      {
        "english": "The organization may terminate the agreement if the supplier breaches its terms.",
        "indonesian": "Organisasi dapat mengakhiri perjanjian jika pemasok melanggar ketentuannya.",
        "clozeEnglish": "The organization may ________ the agreement if the supplier breaches its terms."
      }
    ],
    "stageId": 43,
    "stageTitle": "Stage 43: Master Lexicon 43",
    "clusterId": 43,
    "clusterTitle": "Stage 43: Master Lexicon 43"
  },
  {
    "id": "w43-thrive",
    "word": "thrive",
    "phonetic": "/ˈθɹaɪv/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Berkembang / Berjaya",
    "definition": "Berkembang dengan baik atau sukses.",
    "contextSentences": [
      {
        "english": "Small businesses thrive when they have access to reliable financing.",
        "indonesian": "Usaha kecil berkembang pesat ketika memperoleh akses ke pendanaan yang andal.",
        "clozeEnglish": "Small businesses ________ when they have access to reliable financing."
      }
    ],
    "stageId": 43,
    "stageTitle": "Stage 43: Master Lexicon 43",
    "clusterId": 43,
    "clusterTitle": "Stage 43: Master Lexicon 43"
  },
  {
    "id": "w43-transition",
    "word": "transition",
    "phonetic": "/tɹænˈzɪ.ʃən/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Peralihan / Transisi",
    "definition": "Peralihan dari satu keadaan/tahap ke keadaan lain.",
    "contextSentences": [
      {
        "english": "The transition to the new system required extensive staff training.",
        "indonesian": "Peralihan ke sistem baru membutuhkan pelatihan staf secara ekstensif.",
        "clozeEnglish": "The ________ to the new system required extensive staff training."
      }
    ],
    "stageId": 43,
    "stageTitle": "Stage 43: Master Lexicon 43",
    "clusterId": 43,
    "clusterTitle": "Stage 43: Master Lexicon 43"
  },
  {
    "id": "w43-trivial",
    "word": "trivial",
    "phonetic": "/ˈtɹɪ.vi.əl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Sepele / Remeh",
    "definition": "Sepele dan tidak terlalu penting.",
    "contextSentences": [
      {
        "english": "The reviewer asked the authors to remove trivial details from the report.",
        "indonesian": "Penelaah meminta penulis menghapus detail sepele dari laporan tersebut.",
        "clozeEnglish": "The reviewer asked the authors to remove ________ details from the report."
      }
    ],
    "stageId": 43,
    "stageTitle": "Stage 43: Master Lexicon 43",
    "clusterId": 43,
    "clusterTitle": "Stage 43: Master Lexicon 43"
  },
  {
    "id": "w43-ultimate",
    "word": "ultimate",
    "phonetic": "/ˈʌl.tə.mət/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Utama / Terakhir",
    "definition": "Paling utama/akhir atau tujuan tertinggi.",
    "contextSentences": [
      {
        "english": "The ultimate goal is to improve the reliability of the system.",
        "indonesian": "Tujuan utamanya adalah meningkatkan keandalan sistem.",
        "clozeEnglish": "The ________ goal is to improve the reliability of the system."
      }
    ],
    "stageId": 43,
    "stageTitle": "Stage 43: Master Lexicon 43",
    "clusterId": 43,
    "clusterTitle": "Stage 43: Master Lexicon 43"
  },
  {
    "id": "w43-unanimous",
    "word": "unanimous",
    "phonetic": "/juˈnæ.nə.məs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Bulat / Sepakat",
    "definition": "Disetujui semua pihak tanpa perbedaan pendapat.",
    "contextSentences": [
      {
        "english": "The committee reached a unanimous decision to approve the proposal.",
        "indonesian": "Komite mencapai keputusan bulat untuk menyetujui proposal tersebut.",
        "clozeEnglish": "The committee reached a ________ decision to approve the proposal."
      }
    ],
    "stageId": 43,
    "stageTitle": "Stage 43: Master Lexicon 43",
    "clusterId": 43,
    "clusterTitle": "Stage 43: Master Lexicon 43"
  },
  {
    "id": "w43-underlying",
    "word": "underlying",
    "phonetic": "/ˌʌn.dɚˈlaɪ.ɪŋ/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Mendasar / Tersembunyi",
    "definition": "Mendasari atau menjadi penyebab/fondasi yang tidak selalu terlihat.",
    "contextSentences": [
      {
        "english": "The investigation identified the underlying cause of the system failure.",
        "indonesian": "Investigasi tersebut mengidentifikasi penyebab mendasar kegagalan sistem.",
        "clozeEnglish": "The investigation identified the ________ cause of the system failure."
      }
    ],
    "stageId": 43,
    "stageTitle": "Stage 43: Master Lexicon 43",
    "clusterId": 43,
    "clusterTitle": "Stage 43: Master Lexicon 43"
  },
  {
    "id": "w43-undermine",
    "word": "undermine",
    "phonetic": "/ˈʌn.dɚˌmaɪn/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Melemahkan / Merusak",
    "definition": "Melemahkan secara bertahap, sering terkait kepercayaan/otoritas.",
    "contextSentences": [
      {
        "english": "Repeated delays can undermine confidence in the project team.",
        "indonesian": "Keterlambatan yang berulang dapat merusak kepercayaan terhadap tim proyek.",
        "clozeEnglish": "Repeated delays can ________ confidence in the project team."
      }
    ],
    "stageId": 43,
    "stageTitle": "Stage 43: Master Lexicon 43",
    "clusterId": 43,
    "clusterTitle": "Stage 43: Master Lexicon 43"
  },
  {
    "id": "w43-uniform",
    "word": "uniform",
    "phonetic": "/ˈju.nəˌfɔɹm/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Seragam / Konsisten",
    "definition": "Seragam atau konsisten; tidak banyak variasi.",
    "contextSentences": [
      {
        "english": "All departments must follow a uniform reporting procedure.",
        "indonesian": "Semua departemen harus mengikuti prosedur pelaporan yang seragam.",
        "clozeEnglish": "All departments must follow a ________ reporting procedure."
      }
    ],
    "stageId": 43,
    "stageTitle": "Stage 43: Master Lexicon 43",
    "clusterId": 43,
    "clusterTitle": "Stage 43: Master Lexicon 43"
  },
  {
    "id": "w43-uphold",
    "word": "uphold",
    "phonetic": "/əpˈhoʊld/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Menjunjung / Menegakkan",
    "definition": "Menjunjung atau mempertahankan hukum, prinsip, atau standar.",
    "contextSentences": [
      {
        "english": "The institution is committed to upholding high standards of research integrity.",
        "indonesian": "Institusi tersebut berkomitmen untuk menjunjung standar tinggi integritas penelitian.",
        "clozeEnglish": "The institution is committed to ________ing high standards of research integrity."
      }
    ],
    "stageId": 43,
    "stageTitle": "Stage 43: Master Lexicon 43",
    "clusterId": 43,
    "clusterTitle": "Stage 43: Master Lexicon 43"
  },
  {
    "id": "w44-utilize",
    "word": "utilize",
    "phonetic": "/ˈju.təˌlaɪz/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memanfaatkan / Menggunakan",
    "definition": "Memanfaatkan/menggunakan sesuatu untuk tujuan tertentu.",
    "contextSentences": [
      {
        "english": "The analysts will utilize existing data to improve the forecast.",
        "indonesian": "Para analis akan memanfaatkan data yang tersedia untuk meningkatkan prakiraan.",
        "clozeEnglish": "The analysts will ________ existing data to improve the forecast."
      }
    ],
    "stageId": 44,
    "stageTitle": "Stage 44: Master Lexicon 44",
    "clusterId": 44,
    "clusterTitle": "Stage 44: Master Lexicon 44"
  },
  {
    "id": "w44-utmost",
    "word": "utmost",
    "phonetic": "/ˈʌtˌmoʊst/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Maksimal / Paling tinggi",
    "definition": "Terbesar atau maksimal; biasanya dalam frasa the utmost care/importance.",
    "contextSentences": [
      {
        "english": "The auditors exercised the utmost care when reviewing the records.",
        "indonesian": "Para auditor menerapkan kehati-hatian maksimal saat meninjau catatan.",
        "clozeEnglish": "The auditors exercised the ________ care when reviewing the records."
      }
    ],
    "stageId": 44,
    "stageTitle": "Stage 44: Master Lexicon 44",
    "clusterId": 44,
    "clusterTitle": "Stage 44: Master Lexicon 44"
  },
  {
    "id": "w44-vacant",
    "word": "vacant",
    "phonetic": "/ˈveɪ.kənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Kosong / Lowong",
    "definition": "Kosong atau belum terisi.",
    "contextSentences": [
      {
        "english": "The vacant position will be filled after the recruitment process.",
        "indonesian": "Posisi yang lowong tersebut akan diisi setelah proses rekrutmen.",
        "clozeEnglish": "The ________ position will be filled after the recruitment process."
      }
    ],
    "stageId": 44,
    "stageTitle": "Stage 44: Master Lexicon 44",
    "clusterId": 44,
    "clusterTitle": "Stage 44: Master Lexicon 44"
  },
  {
    "id": "w44-vague",
    "word": "vague",
    "phonetic": "/ˈveɪɡ/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Samar / Tidak jelas",
    "definition": "Samar, tidak jelas, atau kurang detail.",
    "contextSentences": [
      {
        "english": "The report provides a vague explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang samar tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 44,
    "stageTitle": "Stage 44: Master Lexicon 44",
    "clusterId": 44,
    "clusterTitle": "Stage 44: Master Lexicon 44"
  },
  {
    "id": "w44-valid",
    "word": "valid",
    "phonetic": "/ˈvæ.lɪd/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Sah / Berlaku",
    "definition": "Sah atau memiliki dasar logika/fakta yang kuat.",
    "contextSentences": [
      {
        "english": "The report provides a valid explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang sah tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 44,
    "stageTitle": "Stage 44: Master Lexicon 44",
    "clusterId": 44,
    "clusterTitle": "Stage 44: Master Lexicon 44"
  },
  {
    "id": "w44-validate",
    "word": "validate",
    "phonetic": "/ˈvæ.lə.deɪt/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Memvalidasi / Mengesahkan",
    "definition": "Mengesahkan atau membuktikan bahwa sesuatu benar/berlaku.",
    "contextSentences": [
      {
        "english": "Independent tests will validate the accuracy of the results.",
        "indonesian": "Pengujian independen akan memvalidasi keakuratan hasil tersebut.",
        "clozeEnglish": "Independent tests will ________ the accuracy of the results."
      }
    ],
    "stageId": 44,
    "stageTitle": "Stage 44: Master Lexicon 44",
    "clusterId": 44,
    "clusterTitle": "Stage 44: Master Lexicon 44"
  },
  {
    "id": "w44-variable",
    "word": "variable",
    "phonetic": "/ˈvɛ.ɹi.ə.bəl/",
    "partOfSpeech": "noun",
    "cefr": "B2",
    "translation": "Variabel / Faktor",
    "definition": "Faktor/unsur yang dapat berubah; sebagai adjektiva berarti berubah-ubah.",
    "contextSentences": [
      {
        "english": "The researcher controlled each variable during the experiment.",
        "indonesian": "Peneliti mengendalikan setiap variabel selama eksperimen.",
        "clozeEnglish": "The researcher controlled each ________ during the experiment."
      }
    ],
    "stageId": 44,
    "stageTitle": "Stage 44: Master Lexicon 44",
    "clusterId": 44,
    "clusterTitle": "Stage 44: Master Lexicon 44"
  },
  {
    "id": "w44-verbose",
    "word": "verbose",
    "phonetic": "/vɚˈboʊs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Bertele-tele / Panjang lebar",
    "definition": "Bertele-tele dan menggunakan terlalu banyak kata.",
    "contextSentences": [
      {
        "english": "The report provides a verbose explanation of the findings.",
        "indonesian": "Laporan tersebut memberikan penjelasan yang bertele-tele tentang temuan penelitian.",
        "clozeEnglish": "The report provides a ________ explanation of the findings."
      }
    ],
    "stageId": 44,
    "stageTitle": "Stage 44: Master Lexicon 44",
    "clusterId": 44,
    "clusterTitle": "Stage 44: Master Lexicon 44"
  },
  {
    "id": "w44-versatile",
    "word": "versatile",
    "phonetic": "/ˈvɝ.sə.təl/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Serbaguna / Fleksibel",
    "definition": "Serbaguna atau mampu menjalankan banyak fungsi.",
    "contextSentences": [
      {
        "english": "The software is versatile enough to support several research workflows.",
        "indonesian": "Perangkat lunak tersebut cukup serbaguna untuk mendukung beberapa alur kerja penelitian.",
        "clozeEnglish": "The software is ________ enough to support several research workflows."
      }
    ],
    "stageId": 44,
    "stageTitle": "Stage 44: Master Lexicon 44",
    "clusterId": 44,
    "clusterTitle": "Stage 44: Master Lexicon 44"
  },
  {
    "id": "w44-viable",
    "word": "viable",
    "phonetic": "/ˈvaɪ.ə.bəl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Layak / Berpotensi berhasil",
    "definition": "Layak dan berpotensi berhasil/bertahan.",
    "contextSentences": [
      {
        "english": "The team identified a viable alternative within the available budget.",
        "indonesian": "Tim tersebut menemukan alternatif yang layak dalam batas anggaran yang tersedia.",
        "clozeEnglish": "The team identified a ________ alternative within the available budget."
      }
    ],
    "stageId": 44,
    "stageTitle": "Stage 44: Master Lexicon 44",
    "clusterId": 44,
    "clusterTitle": "Stage 44: Master Lexicon 44"
  },
  {
    "id": "w45-vibrant",
    "word": "vibrant",
    "phonetic": "/ˈvaɪ.bɹənt/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Semarak / Penuh energi",
    "definition": "Penuh energi, semarak, atau hidup; juga warna yang kuat.",
    "contextSentences": [
      {
        "english": "The city has a vibrant technology sector that attracts skilled workers.",
        "indonesian": "Kota tersebut memiliki sektor teknologi yang dinamis dan menarik tenaga kerja terampil.",
        "clozeEnglish": "The city has a ________ technology sector that attracts skilled workers."
      }
    ],
    "stageId": 45,
    "stageTitle": "Stage 45: Master Lexicon 45",
    "clusterId": 45,
    "clusterTitle": "Stage 45: Master Lexicon 45"
  },
  {
    "id": "w45-vigilant",
    "word": "vigilant",
    "phonetic": "/ˈvɪ.dʒə.lənt/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Waspada / Siaga",
    "definition": "Waspada dan terus memperhatikan kemungkinan bahaya/masalah.",
    "contextSentences": [
      {
        "english": "Security staff remained vigilant during the public event.",
        "indonesian": "Petugas keamanan tetap waspada selama acara publik.",
        "clozeEnglish": "Security staff remained ________ during the public event."
      }
    ],
    "stageId": 45,
    "stageTitle": "Stage 45: Master Lexicon 45",
    "clusterId": 45,
    "clusterTitle": "Stage 45: Master Lexicon 45"
  },
  {
    "id": "w45-volatile",
    "word": "volatile",
    "phonetic": "/ˈvɑ.lə.təl/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Labil / Mudah berubah",
    "definition": "Mudah berubah drastis atau tidak stabil; juga mudah menguap.",
    "contextSentences": [
      {
        "english": "The organization faced volatile conditions during the transition.",
        "indonesian": "Organisasi tersebut menghadapi kondisi yang labil selama masa peralihan.",
        "clozeEnglish": "The organization faced ________ conditions during the transition."
      }
    ],
    "stageId": 45,
    "stageTitle": "Stage 45: Master Lexicon 45",
    "clusterId": 45,
    "clusterTitle": "Stage 45: Master Lexicon 45"
  },
  {
    "id": "w45-wander",
    "word": "wander",
    "phonetic": "/ˈwɑn.dɚ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Mengembara / Berkeliaran",
    "definition": "Berkeliaran/berjalan tanpa tujuan; pikiran juga dapat melayang.",
    "contextSentences": [
      {
        "english": "During the discussion, the conversation began to wander away from the main issue.",
        "indonesian": "Selama diskusi, percakapan mulai menyimpang dari pokok persoalan.",
        "clozeEnglish": "During the discussion, the conversation began to ________ away from the main issue."
      }
    ],
    "stageId": 45,
    "stageTitle": "Stage 45: Master Lexicon 45",
    "clusterId": 45,
    "clusterTitle": "Stage 45: Master Lexicon 45"
  },
  {
    "id": "w45-warrant",
    "word": "warrant",
    "phonetic": "/ˈwɔ.ɹənt/",
    "partOfSpeech": "verb",
    "cefr": "C1",
    "translation": "Membenarkan / Menjamin",
    "definition": "Membenarkan/membuat sesuatu layak dilakukan; juga surat perintah resmi.",
    "contextSentences": [
      {
        "english": "The unexplained discrepancy may warrant a further investigation.",
        "indonesian": "Ketidaksesuaian yang belum terjelaskan itu mungkin membenarkan penyelidikan lanjutan.",
        "clozeEnglish": "The unexplained discrepancy may ________ a further investigation."
      }
    ],
    "stageId": 45,
    "stageTitle": "Stage 45: Master Lexicon 45",
    "clusterId": 45,
    "clusterTitle": "Stage 45: Master Lexicon 45"
  },
  {
    "id": "w45-widespread",
    "word": "widespread",
    "phonetic": "/ˈwaɪdˈspɹɛd/",
    "partOfSpeech": "adjective",
    "cefr": "B2",
    "translation": "Meluas / Tersebar luas",
    "definition": "Tersebar luas atau ditemukan di banyak tempat/kalangan.",
    "contextSentences": [
      {
        "english": "The survey found widespread support for the proposed reform.",
        "indonesian": "Survei tersebut menemukan dukungan luas terhadap reformasi yang diusulkan.",
        "clozeEnglish": "The survey found ________ support for the proposed reform."
      }
    ],
    "stageId": 45,
    "stageTitle": "Stage 45: Master Lexicon 45",
    "clusterId": 45,
    "clusterTitle": "Stage 45: Master Lexicon 45"
  },
  {
    "id": "w45-withdraw",
    "word": "withdraw",
    "phonetic": "/wɪðˈdɹɔ/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menarik / Mundur",
    "definition": "Menarik kembali, mengambil uang, atau mundur dari partisipasi.",
    "contextSentences": [
      {
        "english": "The company decided to withdraw the proposal after receiving new evidence.",
        "indonesian": "Perusahaan memutuskan untuk menarik proposal setelah menerima bukti baru.",
        "clozeEnglish": "The company decided to ________ the proposal after receiving new evidence."
      }
    ],
    "stageId": 45,
    "stageTitle": "Stage 45: Master Lexicon 45",
    "clusterId": 45,
    "clusterTitle": "Stage 45: Master Lexicon 45"
  },
  {
    "id": "w45-yield",
    "word": "yield",
    "phonetic": "/ˈjild/",
    "partOfSpeech": "verb",
    "cefr": "B2",
    "translation": "Menghasilkan / Menyerah",
    "definition": "Menghasilkan; juga menyerah/mengalah atau memberikan jalan.",
    "contextSentences": [
      {
        "english": "The revised process is expected to yield more reliable results.",
        "indonesian": "Proses yang telah direvisi diharapkan menghasilkan hasil yang lebih andal.",
        "clozeEnglish": "The revised process is expected to ________ more reliable results."
      }
    ],
    "stageId": 45,
    "stageTitle": "Stage 45: Master Lexicon 45",
    "clusterId": 45,
    "clusterTitle": "Stage 45: Master Lexicon 45"
  },
  {
    "id": "w45-yielding",
    "word": "yielding",
    "phonetic": "/ˈjil.dɪŋ/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Mudah mengalah / Lentur",
    "definition": "Mudah mengalah/lentur; tidak kaku.",
    "contextSentences": [
      {
        "english": "The yielding material reduced the impact of repeated pressure.",
        "indonesian": "Bahan yang lentur tersebut mengurangi dampak tekanan yang berulang.",
        "clozeEnglish": "The ________ material reduced the impact of repeated pressure."
      }
    ],
    "stageId": 45,
    "stageTitle": "Stage 45: Master Lexicon 45",
    "clusterId": 45,
    "clusterTitle": "Stage 45: Master Lexicon 45"
  },
  {
    "id": "w45-zeal",
    "word": "zeal",
    "phonetic": "/ˈzil/",
    "partOfSpeech": "noun",
    "cefr": "C1",
    "translation": "Semangat / Antusiasme",
    "definition": "Semangat atau antusiasme yang kuat.",
    "contextSentences": [
      {
        "english": "She approached the project with remarkable zeal.",
        "indonesian": "Ia menjalankan proyek tersebut dengan semangat yang luar biasa.",
        "clozeEnglish": "She approached the project with remarkable ________."
      }
    ],
    "stageId": 45,
    "stageTitle": "Stage 45: Master Lexicon 45",
    "clusterId": 45,
    "clusterTitle": "Stage 45: Master Lexicon 45"
  },
  {
    "id": "w46-zealous",
    "word": "zealous",
    "phonetic": "/ˈzɛ.ləs/",
    "partOfSpeech": "adjective",
    "cefr": "C1",
    "translation": "Antusias / Bersemangat",
    "definition": "Sangat antusias dan berdedikasi, kadang sampai berlebihan.",
    "contextSentences": [
      {
        "english": "The zealous campaigner devoted every weekend to promoting the environmental initiative.",
        "indonesian": "Aktivis yang sangat bersemangat itu menghabiskan setiap akhir pekan untuk mempromosikan inisiatif lingkungan.",
        "clozeEnglish": "The ________ campaigner devoted every weekend to promoting the environmental initiative."
      }
    ],
    "stageId": 46,
    "stageTitle": "Stage 46: Master Lexicon 46",
    "clusterId": 46,
    "clusterTitle": "Stage 46: Master Lexicon 46"
  },
  {
    "id": "w46-zenith",
    "word": "zenith",
    "phonetic": "/ˈzi.nəθ/",
    "partOfSpeech": "noun",
    "cefr": "C2",
    "translation": "Puncak / Titik tertinggi",
    "definition": "Titik tertinggi atau puncak keberhasilan.",
    "contextSentences": [
      {
        "english": "The company reached the zenith of its market influence after the merger.",
        "indonesian": "Perusahaan mencapai puncak pengaruh pasarnya setelah merger.",
        "clozeEnglish": "The company reached the ________ of its market influence after the merger."
      }
    ],
    "stageId": 46,
    "stageTitle": "Stage 46: Master Lexicon 46",
    "clusterId": 46,
    "clusterTitle": "Stage 46: Master Lexicon 46"
  }
];

// Initial baseline stats (Clean production state: empty)
export const INITIAL_WORD_STATS: Record<string, WordRetentionStats> = {};
