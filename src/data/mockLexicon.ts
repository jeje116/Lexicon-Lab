import { WordItem, WordRetentionStats } from '../types/lexicon';

export const STAGE_LIST = [
  { id: 1, title: "Stage 01: Presisi Dialektika & Retorika Kritis" },
  { id: 2, title: "Stage 02: Aksi, Dinamika & Transformasi Sistemik" },
  { id: 3, title: "Stage 03: Investigasi, Penalaran & Klarifikasi" }
];

export const ALL_WORDS_POOL: WordItem[] = [
  // ==========================================
  // --- STAGE 01: 10 KOSA KATA / KATA KERJA ---
  // ==========================================
  {
    id: "stg1-01",
    word: "ubiquitous",
    phonetic: "/juːˈbɪk.wɪ.təs/",
    partOfSpeech: "adjective",
    cefr: "C1",
    translation: "Ada di mana-mana / Merajalela",
    definition: "Hadir, muncul, atau ditemukan di mana-mana secara bersamaan dalam kehidupan sehari-hari.",
    contextSentences: [
      {
        english: "Smartphones have become so ubiquitous that their absence in daily life is now viewed as an anomaly.",
        indonesian: "Ponsel pintar telah menjadi begitu merajalela sehingga ketiadaannya dalam kehidupan sehari-hari kini dianggap aneh.",
        clozeEnglish: "Smartphones have become so ________ that their absence in daily life is now viewed as an anomaly."
      },
      {
        english: "Microplastics are now ubiquitous across maritime ecosystems worldwide.",
        indonesian: "Mikroplastik kini ada di mana-mana di seluruh ekosistem maritim dunia.",
        clozeEnglish: "Microplastics are now ________ across maritime ecosystems worldwide."
      }
    ],
    stageId: 1,
    stageTitle: STAGE_LIST[0].title,
    clusterId: 1,
    clusterTitle: STAGE_LIST[0].title
  },
  {
    id: "stg1-02",
    word: "anachronistic",
    phonetic: "/əˌnæk.rəˈnɪs.tɪk/",
    partOfSpeech: "adjective",
    cefr: "C1",
    translation: "Ketinggalan zaman / Anakronistis",
    definition: "Berada di luar era yang tepat atau sangat kuno sehingga tidak cocok lagi dengan masa kini.",
    contextSentences: [
      {
        english: "In an era of instant algorithmic trading, paper ticker tapes appear charmingly anachronistic.",
        indonesian: "Di era perdagangan algoritma instan, pita pencatat harga kertas tampak sangat ketinggalan zaman.",
        clozeEnglish: "In an era of instant algorithmic trading, paper ticker tapes appear charmingly ________."
      },
      {
        english: "Critics argued that the feudal tenure law was an anachronistic relic of the past.",
        indonesian: "Kritikus berpendapat bahwa hukum sewa tanah feodal itu adalah peninggalan usang yang tidak relevan lagi.",
        clozeEnglish: "Critics argued that the feudal tenure law was an ________ relic of the past."
      }
    ],
    stageId: 1,
    stageTitle: STAGE_LIST[0].title,
    clusterId: 1,
    clusterTitle: STAGE_LIST[0].title
  },
  {
    id: "stg1-03",
    word: "obfuscate",
    phonetic: "/ˈɒb.fʌs.keɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Mengaburkan / Memperkeruh",
    definition: "Membuat sesuatu menjadi tidak jelas, membingungkan, atau sengaja disamarkan agar sulit dipahami.",
    contextSentences: [
      {
        english: "The company attempted to obfuscate the financial losses by burying them in dense footnotes.",
        indonesian: "Perusahaan berusaha mengaburkan kerugian finansial dengan menyembunyikannya di catatan kaki yang padat.",
        clozeEnglish: "The company attempted to ________ the financial losses by burying them in dense footnotes."
      },
      {
        english: "Complicated jargon is often used deliberately to obfuscate the core issues.",
        indonesian: "Istilah rumit sering dipakai sengaja untuk memperkeruh masalah inti.",
        clozeEnglish: "Complicated jargon is often used deliberately to ________ the core issues."
      }
    ],
    stageId: 1,
    stageTitle: STAGE_LIST[0].title,
    clusterId: 1,
    clusterTitle: STAGE_LIST[0].title
  },
  {
    id: "stg1-04",
    word: "perfunctory",
    phonetic: "/pəˈfʌŋk.tər.i/",
    partOfSpeech: "adjective",
    cefr: "C1",
    translation: "Asal-asalan / Sekadar formalitas",
    definition: "Dilakukan dengan usaha minimal, tergesa-gesa, atau sekadar memenuhi kewajiban rutin tanpa rasa peduli.",
    contextSentences: [
      {
        english: "The inspector cast a perfunctory glance at the manifest before stamping the container permit.",
        indonesian: "Petugas pemeriksa hanya melihat sekilas secara asal-asalan ke manifes sebelum membubuhkan stempel izin.",
        clozeEnglish: "The inspector cast a ________ glance at the manifest before stamping the container permit."
      },
      {
        english: "His apology felt perfunctory and failed to reassure the offended party.",
        indonesian: "Permintaan maafnya terasa sekadar formalitas dan gagal menenangkan pihak yang tersinggung.",
        clozeEnglish: "His apology felt ________ and failed to reassure the offended party."
      }
    ],
    stageId: 1,
    stageTitle: STAGE_LIST[0].title,
    clusterId: 1,
    clusterTitle: STAGE_LIST[0].title
  },
  {
    id: "stg1-05",
    word: "perspicacious",
    phonetic: "/ˌpɜː.spɪˈkeɪ.ʃəs/",
    partOfSpeech: "adjective",
    cefr: "C2",
    translation: "Cerdik / Berpandangan tajam",
    definition: "Memiliki pemahaman yang sangat tajam, cepat mengerti, dan mampu melihat rincian yang terlewatkan orang lain.",
    contextSentences: [
      {
        english: "Thanks to perspicacious forecasting, the fund liquidated risky assets before the market crash.",
        indonesian: "Berkat ramalan yang cerdik dan tajam, dana investasi mencairkan aset berisiko sebelum pasar anjlok.",
        clozeEnglish: "Thanks to ________ forecasting, the fund liquidated risky assets before the market crash."
      },
      {
        english: "A perspicacious reader will immediately notice the hidden irony in the story.",
        indonesian: "Pembaca yang berpandangan tajam akan langsung menyadari sindiran tersembunyi dalam cerita tersebut.",
        clozeEnglish: "A ________ reader will immediately notice the hidden irony in the story."
      }
    ],
    stageId: 1,
    stageTitle: STAGE_LIST[0].title,
    clusterId: 1,
    clusterTitle: STAGE_LIST[0].title
  },
  {
    id: "stg1-06",
    word: "epitomize",
    phonetic: "/ɪˈpɪt.ə.maɪz/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Menjadi contoh sempurna / Mewakili",
    definition: "Menjadi contoh paling representatif atau puncak perwujudan dari suatu sifat, gaya, atau kualitas.",
    contextSentences: [
      {
        english: "His calm resolve under immense pressure seemed to epitomize true leadership.",
        indonesian: "Ketegaran tenangnya di bawah tekanan berat tampak menjadi contoh sempurna kepemimpinan sejati.",
        clozeEnglish: "His calm resolve under immense pressure seemed to ________ true leadership."
      },
      {
        english: "The minimalist architecture was designed to epitomize modern Scandinavian elegance.",
        indonesian: "Arsitektur minimalis tersebut dirancang untuk mewakili keanggunan Skandinavia modern.",
        clozeEnglish: "The minimalist architecture was designed to ________ modern Scandinavian elegance."
      }
    ],
    stageId: 1,
    stageTitle: STAGE_LIST[0].title,
    clusterId: 1,
    clusterTitle: STAGE_LIST[0].title
  },
  {
    id: "stg1-07",
    word: "exacerbate",
    phonetic: "/ɪɡˈzæs.ə.beɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Memperburuk / Memperparah",
    definition: "Menjadikan suatu masalah, penyakit, ketegangan, atau situasi buruk menjadi jauh lebih parah.",
    contextSentences: [
      {
        english: "Imposing severe trade tariffs will only exacerbate domestic inflation.",
        indonesian: "Penerapan tarif dagang yang berat hanya akan memperparah inflasi domestik.",
        clozeEnglish: "Imposing severe trade tariffs will only ________ domestic inflation."
      },
      {
        english: "Inadequate sleep served to exacerbate his chronic migraines.",
        indonesian: "Kurang tidur malah memperburuk migrain kronis yang dideritanya.",
        clozeEnglish: "Inadequate sleep served to ________ his chronic migraines."
      }
    ],
    stageId: 1,
    stageTitle: STAGE_LIST[0].title,
    clusterId: 1,
    clusterTitle: STAGE_LIST[0].title
  },
  {
    id: "stg1-08",
    word: "esoteric",
    phonetic: "/ˌes.əˈter.ɪk/",
    partOfSpeech: "adjective",
    cefr: "C2",
    translation: "Eksoteris / Hanya dipahami segelintir orang",
    definition: "Ditujukan untuk atau hanya mungkin dimengerti oleh segelintir orang yang memiliki pengetahuan khusus yang mendalam.",
    contextSentences: [
      {
        english: "The monograph explored esoteric mathematical formulations that baffled non-specialists.",
        indonesian: "Monograf tersebut meneliti rumusan matematika esoteris yang membingungkan para non-ahli.",
        clozeEnglish: "The monograph explored ________ mathematical formulations that baffled non-specialists."
      },
      {
        english: "Medieval alchemical texts were intentionally written in highly esoteric metaphors.",
        indonesian: "Teks alkimia abad pertengahan sengaja ditulis dalam metafora yang sangat esoteris.",
        clozeEnglish: "Medieval alchemical texts were intentionally written in highly ________ metaphors."
      }
    ],
    stageId: 1,
    stageTitle: STAGE_LIST[0].title,
    clusterId: 1,
    clusterTitle: STAGE_LIST[0].title
  },
  {
    id: "stg1-09",
    word: "equivocate",
    phonetic: "/ɪˈkwɪv.ə.keɪt/",
    partOfSpeech: "verb",
    cefr: "C2",
    translation: "Berbicara mendua / Berbelit-belit",
    definition: "Menggunakan bahasa yang ambigu atau tidak jelas untuk menyembunyikan kebenaran atau menghindari komitmen.",
    contextSentences: [
      {
        english: "When questioned about campaign financing, the candidate began to equivocate.",
        indonesian: "Ketika ditanya mengenai sumber dana kampanye, calon tersebut mulai berbicara berbelit-belit.",
        clozeEnglish: "When questioned about campaign financing, the candidate began to ________."
      },
      {
        english: "Scientists must not equivocate when communicating public health hazards.",
        indonesian: "Para ilmuwan tidak boleh mengelak atau bermuka dua saat menyampaikan bahaya kesehatan publik.",
        clozeEnglish: "Scientists must not ________ when communicating public health hazards."
      }
    ],
    stageId: 1,
    stageTitle: STAGE_LIST[0].title,
    clusterId: 1,
    clusterTitle: STAGE_LIST[0].title
  },
  {
    id: "stg1-10",
    word: "sagacious",
    phonetic: "/səˈɡeɪ.ʃəs/",
    partOfSpeech: "adjective",
    cefr: "C2",
    translation: "Bijaksana / Berwawasan luas",
    definition: "Menunjukkan pertimbangan yang matang, pandangan jernih, dan kearifan mendalam dalam mengambil keputusan.",
    contextSentences: [
      {
        english: "The mentor was respected for her sagacious guidance during critical corporate disputes.",
        indonesian: "Sang mentor sangat dihormati karena bimbingannya yang bijaksana saat terjadi perselisihan perusahaan.",
        clozeEnglish: "The mentor was respected for her ________ guidance during critical corporate disputes."
      },
      {
        english: "Time proved his investment caution to be remarkably sagacious.",
        indonesian: "Waktu membuktikan bahwa kehati-hatian investasinya sangatlah bijaksana.",
        clozeEnglish: "Time proved his investment caution to be remarkably ________."
      }
    ],
    stageId: 1,
    stageTitle: STAGE_LIST[0].title,
    clusterId: 1,
    clusterTitle: STAGE_LIST[0].title
  },

  // ==========================================
  // --- STAGE 02: 10 KOSA KATA / KATA KERJA ---
  // ==========================================
  {
    id: "stg2-01",
    word: "ameliorate",
    phonetic: "/əˈmiː.li.ə.reɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Memperbaiki / Meringankan",
    definition: "Membuat sesuatu yang buruk, menyakitkan, atau tidak memuaskan menjadi jauh lebih baik dan tertahankan.",
    contextSentences: [
      {
        english: "Direct cash assistance helped to ameliorate poverty in rural regions.",
        indonesian: "Bantuan tunai langsung membantu meringankan kemiskinan di daerah pedesaan.",
        clozeEnglish: "Direct cash assistance helped to ________ poverty in rural regions."
      }
    ],
    stageId: 2,
    stageTitle: STAGE_LIST[1].title,
    clusterId: 2,
    clusterTitle: STAGE_LIST[1].title
  },
  {
    id: "stg2-02",
    word: "galvanize",
    phonetic: "/ˈɡæl.və.naɪz/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Menggerakkan / Memantik Aksi",
    definition: "Mengejutkan atau menyemangati seseorang atau masyarakat luas sehingga segera mengambil tindakan nyata.",
    contextSentences: [
      {
        english: "The investigative documentary served to galvanize public opinion against chemical dumping.",
        indonesian: "Dokumenter investigasi tersebut berhasil menggerakkan opini publik untuk menolak pembuangan limbah kimia.",
        clozeEnglish: "The investigative documentary served to ________ public opinion against chemical dumping."
      }
    ],
    stageId: 2,
    stageTitle: STAGE_LIST[1].title,
    clusterId: 2,
    clusterTitle: STAGE_LIST[1].title
  },
  {
    id: "stg2-03",
    word: "repudiate",
    phonetic: "/rɪˈpjuː.di.eɪt/",
    partOfSpeech: "verb",
    cefr: "C2",
    translation: "Menolak tegas / Menyangkal",
    definition: "Menolak dengan tegas untuk menerima, mengakui, atau diasosiasikan dengan suatu tuduhan atau kewajiban.",
    contextSentences: [
      {
        english: "The minister was forced to repudiate the defamatory remarks made by his campaign aide.",
        indonesian: "Sang menteri terpaksa menyangkal dan menolak tegas pernyataan fitnah yang dilontarkan staf kampanyenya.",
        clozeEnglish: "The minister was forced to ________ the defamatory remarks made by his campaign aide."
      }
    ],
    stageId: 2,
    stageTitle: STAGE_LIST[1].title,
    clusterId: 2,
    clusterTitle: STAGE_LIST[1].title
  },
  {
    id: "stg2-04",
    word: "truncate",
    phonetic: "/trʌŋˈkeɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Memotong / Memendekkan",
    definition: "Memperpendek sesuatu dengan cara memotong bagian ujung atau bagian atasnya secara drastis.",
    contextSentences: [
      {
        english: "Budget deficits compelled the board to truncate the ongoing clinical trials.",
        indonesian: "Defisit anggaran memaksa dewan memotong dan menghentikan uji coba klinis yang sedang berlangsung.",
        clozeEnglish: "Budget deficits compelled the board to ________ the ongoing clinical trials."
      }
    ],
    stageId: 2,
    stageTitle: STAGE_LIST[1].title,
    clusterId: 2,
    clusterTitle: STAGE_LIST[1].title
  },
  {
    id: "stg2-05",
    word: "vacillate",
    phonetic: "/ˈvæs.ɪ.leɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Ragu-ragu / Bimbang",
    definition: "Terombang-ambing di antara pendapat atau tindakan yang berbeda secara terus-menerus tanpa ketegasan.",
    contextSentences: [
      {
        english: "Investors cannot afford to vacillate when market volatility peaks.",
        indonesian: "Investor tidak boleh bimbang dan ragu-ragu ketika volatilitas pasar mencapai puncaknya.",
        clozeEnglish: "Investors cannot afford to ________ when market volatility peaks."
      }
    ],
    stageId: 2,
    stageTitle: STAGE_LIST[1].title,
    clusterId: 2,
    clusterTitle: STAGE_LIST[1].title
  },
  {
    id: "stg2-06",
    word: "vindicate",
    phonetic: "/ˈvɪn.dɪ.keɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Membersihkan nama / Membenarkan",
    definition: "Membuktikan bahwa seseorang atau suatu teori tidak bersalah, benar, atau masuk akal setelah sebelumnya dicurigai.",
    contextSentences: [
      {
        english: "Subsequent DNA evidence arrived just in time to vindicate the wrongly convicted man.",
        indonesian: "Bukti DNA lanjutan tiba tepat waktu untuk membersihkan nama pria yang dihukum secara keliru.",
        clozeEnglish: "Subsequent DNA evidence arrived just in time to ________ the wrongly convicted man."
      }
    ],
    stageId: 2,
    stageTitle: STAGE_LIST[1].title,
    clusterId: 2,
    clusterTitle: STAGE_LIST[1].title
  },
  {
    id: "stg2-07",
    word: "extrapolate",
    phonetic: "/ɪkˈstræp.ə.leɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Mengekstrapolasi / Memperkirakan",
    definition: "Menyimpulkan atau memperkirakan masa depan berdasarkan data atau tren yang telah diketahui saat ini.",
    contextSentences: [
      {
        english: "Epidemiologists tried to extrapolate future infection rates from current hospital admissions.",
        indonesian: "Ahli epidemiologi mencoba memperkirakan tingkat infeksi masa depan dari data rawat inap saat ini.",
        clozeEnglish: "Epidemiologists tried to ________ future infection rates from current hospital admissions."
      }
    ],
    stageId: 2,
    stageTitle: STAGE_LIST[1].title,
    clusterId: 2,
    clusterTitle: STAGE_LIST[1].title
  },
  {
    id: "stg2-08",
    word: "delineate",
    phonetic: "/dɪˈlɪn.i.eɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Menguraikan rinci / Memetakan batas",
    definition: "Menjelaskan, melukiskan, atau memaparkan batas-batas sesuatu secara sangat mendetail dan akurat.",
    contextSentences: [
      {
        english: "The contract must clearly delineate the responsibilities of each contractual partner.",
        indonesian: "Kontrak harus menguraikan secara rinci tanggung jawab dari setiap mitra yang terikat.",
        clozeEnglish: "The contract must clearly ________ the responsibilities of each contractual partner."
      }
    ],
    stageId: 2,
    stageTitle: STAGE_LIST[1].title,
    clusterId: 2,
    clusterTitle: STAGE_LIST[1].title
  },
  {
    id: "stg2-09",
    word: "scrutinize",
    phonetic: "/ˈskruː.tɪ.naɪz/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Meneliti cermat / Menelaah kritis",
    definition: "Memeriksa atau meneliti seseorang atau sesuatu secara menyeluruh dan kritis demi menemukan detail tersembunyi.",
    contextSentences: [
      {
        english: "Regulators will scrutinize every merger transaction exceeding fifty million dollars.",
        indonesian: "Regulator akan meneliti cermat setiap transaksi merger yang melebihi lima puluh juta dolar.",
        clozeEnglish: "Regulators will ________ every merger transaction exceeding fifty million dollars."
      }
    ],
    stageId: 2,
    stageTitle: STAGE_LIST[1].title,
    clusterId: 2,
    clusterTitle: STAGE_LIST[1].title
  },
  {
    id: "stg2-10",
    word: "corroborate",
    phonetic: "/kəˈrɒb.ə.reɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Menguatkan bukti / Mengonfirmasi",
    definition: "Menambahkan informasi atau bukti baru untuk mendukung dan memperkuat teori, pernyataan, atau temuan.",
    contextSentences: [
      {
        english: "Independent laboratory tests helped to corroborate the researchers' initial findings.",
        indonesian: "Uji laboratorium independen membantu menguatkan bukti temuan awal para peneliti.",
        clozeEnglish: "Independent laboratory tests helped to ________ the researchers' initial findings."
      }
    ],
    stageId: 2,
    stageTitle: STAGE_LIST[1].title,
    clusterId: 2,
    clusterTitle: STAGE_LIST[1].title
  },

  // ==========================================
  // --- STAGE 03: 10 KOSA KATA / KATA KERJA ---
  // ==========================================
  {
    id: "stg3-01",
    word: "articulate",
    phonetic: "/ɑːˈtɪk.jə.leɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Menyatakan jelas / Mengartikulasikan",
    definition: "Mengungkapkan ide, pikiran, atau argumen dengan sangat jelas dan fasih menggunakan kata-kata yang tepat.",
    contextSentences: [
      {
        english: "She was able to articulate the complex scientific theory in terms anyone could understand.",
        indonesian: "Ia mampu menyatakan teori ilmiah yang rumit dengan sangat jelas sehingga bisa dipahami siapa saja.",
        clozeEnglish: "She was able to ________ the complex scientific theory in terms anyone could understand."
      }
    ],
    stageId: 3,
    stageTitle: STAGE_LIST[2].title,
    clusterId: 3,
    clusterTitle: STAGE_LIST[2].title
  },
  {
    id: "stg3-02",
    word: "mitigate",
    phonetic: "/ˈmɪt.ɪ.ɡeɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Meringankan / Meredam bahaya",
    definition: "Membuat sesuatu menjadi tidak terlalu parah, berbahaya, atau merusak.",
    contextSentences: [
      {
        english: "Planting mangroves along the coast will help mitigate coastal erosion.",
        indonesian: "Menanam bakau di sepanjang pantai akan membantu meredam erosi pantai.",
        clozeEnglish: "Planting mangroves along the coast will help ________ coastal erosion."
      }
    ],
    stageId: 3,
    stageTitle: STAGE_LIST[2].title,
    clusterId: 3,
    clusterTitle: STAGE_LIST[2].title
  },
  {
    id: "stg3-03",
    word: "proliferate",
    phonetic: "/prəˈlɪf.ər.eɪt/",
    partOfSpeech: "verb",
    cefr: "C2",
    translation: "Menjamur / Berkembang biak pesat",
    definition: "Meningkat dalam jumlah atau menyebar dengan sangat cepat dalam waktu singkat.",
    contextSentences: [
      {
        english: "Digital payment platforms began to proliferate across emerging economies.",
        indonesian: "Platform pembayaran digital mulai menjamur dan berkembang pesat di seluruh negara berkembang.",
        clozeEnglish: "Digital payment platforms began to ________ across emerging economies."
      }
    ],
    stageId: 3,
    stageTitle: STAGE_LIST[2].title,
    clusterId: 3,
    clusterTitle: STAGE_LIST[2].title
  },
  {
    id: "stg3-04",
    word: "substantiate",
    phonetic: "/səbˈstæn.ʃi.eɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    translation: "Membuktikan kebenaran / Mengabsahkan",
    definition: "Menyediakan fakta atau bukti yang cukup untuk membuktikan kebenaran suatu klaim.",
    contextSentences: [
      {
        english: "The plaintiff could not substantiate his claims of intellectual property theft.",
        indonesian: "Penggugat tidak dapat membuktikan kebenaran klaimnya terkait pencurian kekayaan intelektual.",
        clozeEnglish: "The plaintiff could not ________ his claims of intellectual property theft."
      }
    ],
    stageId: 3,
    stageTitle: STAGE_LIST[2].title,
    clusterId: 3,
    clusterTitle: STAGE_LIST[2].title
  },
  {
    id: "stg3-05",
    word: "elucidate",
    phonetic: "/iˈluː.sɪ.deɪt/",
    partOfSpeech: "verb",
    cefr: "C2",
    translation: "Menerangkan lugas / Memperjelas",
    definition: "Menjelaskan atau menerangkan sesuatu secara mendalam sehingga menjadi terang benderang dan mudah dimengerti.",
    contextSentences: [
      {
        english: "The keynote speaker attempted to elucidate the ethical dilemmas of artificial intelligence.",
        indonesian: "Pembicara utama berusaha menerangkan lugas dilema etika dari kecerdasan buatan.",
        clozeEnglish: "The keynote speaker attempted to ________ the ethical dilemmas of artificial intelligence."
      }
    ],
    stageId: 3,
    stageTitle: STAGE_LIST[2].title,
    clusterId: 3,
    clusterTitle: STAGE_LIST[2].title
  },
  {
    id: "stg3-06",
    word: "pragmatic",
    phonetic: "/præɡˈmæt.ɪk/",
    partOfSpeech: "adjective",
    cefr: "B2",
    translation: "Praktis / Berorientasi hasil nyata",
    definition: "Menyelesaikan masalah secara bijak, realistis, dan berorientasi pada hasil nyata daripada teori semata.",
    contextSentences: [
      {
        english: "We need a pragmatic approach to renewable energy transition rather than idealistic slogans.",
        indonesian: "Kita memerlukan pendekatan praktis dan realistis terhadap transisi energi terbarukan daripada sekadar slogan idealis.",
        clozeEnglish: "We need a ________ approach to renewable energy transition rather than idealistic slogans."
      }
    ],
    stageId: 3,
    stageTitle: STAGE_LIST[2].title,
    clusterId: 3,
    clusterTitle: STAGE_LIST[2].title
  },
  {
    id: "stg3-07",
    word: "tenuous",
    phonetic: "/ˈten.ju.əs/",
    partOfSpeech: "adjective",
    cefr: "C1",
    translation: "Sangat lemah / Renggang / Tipis",
    definition: "Sangat rapuh, lemah, tipis, atau tidak pasti sehingga mudah runtuh atau diragukan kebenarannya.",
    contextSentences: [
      {
        english: "The link between the two events was tenuous at best.",
        indonesian: "Kaitan antara kedua peristiwa tersebut sangatlah lemah dan meragukan.",
        clozeEnglish: "The link between the two events was ________ at best."
      }
    ],
    stageId: 3,
    stageTitle: STAGE_LIST[2].title,
    clusterId: 3,
    clusterTitle: STAGE_LIST[2].title
  },
  {
    id: "stg3-08",
    word: "meticulous",
    phonetic: "/məˈtɪk.jə.ləs/",
    partOfSpeech: "adjective",
    cefr: "C1",
    translation: "Sangat teliti / Cermat mendalam",
    definition: "Memperhatikan setiap detail kecil secara sangat cermat, hati-hati, dan presisi tinggi.",
    contextSentences: [
      {
        english: "Her meticulous research methodology earned unanimous praise from peer reviewers.",
        indonesian: "Metodologi penelitiannya yang sangat teliti mendapat pujian bulat dari para peninjau sejawat.",
        clozeEnglish: "Her ________ research methodology earned unanimous praise from peer reviewers."
      }
    ],
    stageId: 3,
    stageTitle: STAGE_LIST[2].title,
    clusterId: 3,
    clusterTitle: STAGE_LIST[2].title
  },
  {
    id: "stg3-09",
    word: "superfluous",
    phonetic: "/suːˈpɜː.flu.əs/",
    partOfSpeech: "adjective",
    cefr: "C2",
    translation: "Berlebihan / Tidak diperlukan",
    definition: "Lebih banyak dari yang dibutuhkan atau diperlukan; mubazir sehingga pantas disingkirkan.",
    contextSentences: [
      {
        english: "The editor trimmed superfluous paragraphs to enhance the article's pacing.",
        indonesian: "Editor memangkas paragraf yang berlebihan dan tidak diperlukan untuk mempercepat tempo artikel.",
        clozeEnglish: "The editor trimmed ________ paragraphs to enhance the article's pacing."
      }
    ],
    stageId: 3,
    stageTitle: STAGE_LIST[2].title,
    clusterId: 3,
    clusterTitle: STAGE_LIST[2].title
  },
  {
    id: "stg3-10",
    word: "fastidious",
    phonetic: "/fæsˈtɪd.i.əs/",
    partOfSpeech: "adjective",
    cefr: "C2",
    translation: "Sangat rewel / Menuntut kesempurnaan",
    definition: "Sangat peduli terhadap kerapian, kesempurnaan, atau ketepatan detail dan sulit sekali dibuat puas.",
    contextSentences: [
      {
        english: "The chef was fastidious about the temperature and presentation of each dish.",
        indonesian: "Sang koki sangat rewel dan menuntut kesempurnaan atas suhu dan penyajian setiap hidangan.",
        clozeEnglish: "The chef was ________ about the temperature and presentation of each dish."
      }
    ],
    stageId: 3,
    stageTitle: STAGE_LIST[2].title,
    clusterId: 3,
    clusterTitle: STAGE_LIST[2].title
  }
];

// Initial mock stats
export const INITIAL_WORD_STATS: Record<string, WordRetentionStats> = {
  "stg1-01": { wordId: "stg1-01", totalAttempts: 6, correctAttempts: 6, consecutiveStreak: 4, lastReviewedAt: Date.now() - 86400000 * 2, isMastered: true, isBookmarked: false, isInspected: true },
  "stg1-02": { wordId: "stg1-02", totalAttempts: 4, correctAttempts: 3, consecutiveStreak: 2, lastReviewedAt: Date.now() - 86400000 * 1, isMastered: false, isBookmarked: true, isInspected: true },
  "stg1-03": { wordId: "stg1-03", totalAttempts: 5, correctAttempts: 2, consecutiveStreak: 0, lastReviewedAt: Date.now() - 86400000 * 3, isMastered: false, isBookmarked: false, isInspected: true },
  "stg1-04": { wordId: "stg1-04", totalAttempts: 3, correctAttempts: 3, consecutiveStreak: 3, lastReviewedAt: Date.now() - 86400000 * 1, isMastered: false, isBookmarked: false, isInspected: true },
  "stg1-05": { wordId: "stg1-05", totalAttempts: 4, correctAttempts: 4, consecutiveStreak: 4, lastReviewedAt: Date.now() - 86400000 * 2, isMastered: true, isBookmarked: false, isInspected: true },
  "stg1-06": { wordId: "stg1-06", totalAttempts: 5, correctAttempts: 4, consecutiveStreak: 2, lastReviewedAt: Date.now() - 86400000 * 2, isMastered: false, isBookmarked: false, isInspected: true },
  "stg1-07": { wordId: "stg1-07", totalAttempts: 6, correctAttempts: 2, consecutiveStreak: 0, lastReviewedAt: Date.now() - 86400000 * 4, isMastered: false, isBookmarked: true, isInspected: true },
  "stg1-08": { wordId: "stg1-08", totalAttempts: 3, correctAttempts: 2, consecutiveStreak: 1, lastReviewedAt: Date.now() - 86400000 * 1, isMastered: false, isBookmarked: false, isInspected: true },
  "stg1-09": { wordId: "stg1-09", totalAttempts: 5, correctAttempts: 1, consecutiveStreak: 0, lastReviewedAt: Date.now() - 86400000 * 5, isMastered: false, isBookmarked: false, isInspected: true },
  "stg1-10": { wordId: "stg1-10", totalAttempts: 4, correctAttempts: 4, consecutiveStreak: 3, lastReviewedAt: Date.now() - 86400000 * 2, isMastered: true, isBookmarked: false, isInspected: true }
};
