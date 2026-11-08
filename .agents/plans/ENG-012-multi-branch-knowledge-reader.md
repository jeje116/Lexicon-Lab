# Implementation Plan: ENG-012 — Multi-Branch Knowledge Architecture (Dropdown Branch Switcher, KnowledgeTopics Sheet Sync, & Interactive Concept Reader)

Status:
APPROVED

Approved by:
User

Approved date:
2026-11-07

Approval evidence:
User prompt: "File data lexicon_lab_read_people_like_a_book.tsv (21 stages untuk cabang Psychology & Life -> Read People Like a Book) telah diaudit dan 100% VALID. Plan ENG-012 langsung berstatus APPROVED untuk dieksekusi."

---

## 1. Problem Statement & Motivation
Lexicon Lab telah berhasil mengimplementasikan sistem kosa kata bahasa Inggris (452 kata, 46 stage, 2-way retention engine, dan cloud sync). Untuk berkembang menjadi platform pembelajaran komprehensif ("Learn Anything"), sistem memerlukan arsitektur *multi-branch* yang memungkinkan pengguna beralih antara:
1. **English Lexicon** (Default cabang bahasa Inggris).
2. **Knowledge Branches** (Cabang pengetahuan konseptual, misalnya *Psychology & Life*, *Statistics & Data*, dan topik-topik audiobook/buku seperti *Read People Like a Book*).

Arsitektur ini membutuhkan integrasi Google Sheets tab `KnowledgeTopics`, penyimpanan progres bacaan di `UserProgressData`, pemilih cabang elegan (*Branch Selector Dropdown*) di Header HUD, serta komponen pembaca interaktif (*Interactive Concept Reader*) yang mematuhi estetika Porcelain Slate Light Mode dan Single Floating Dock (ADR-004).

---

## 2. Architecture & Design Principles

### A. Data Schema & Contracts
1. `KnowledgeStageItem`:
   ```typescript
   export interface KnowledgeStageItem {
     id: string;           // format: `${topicId}-s${stageId}`
     branchId: string;     // misal: 'psychology' | 'statistics'
     branchTitle: string;  // misal: 'Psychology & Life'
     topicId: string;      // misal: 'psy-read-people'
     topicTitle: string;   // misal: 'Read People Like a Book – Understanding Human Behavior'
     stageId: number;      // 1..N
     stageTitle: string;
     content: string;      // teks dengan **bold**, ==highlight==, dan \n\n
     keyPoints: string[];  // array poin kunci hasil split '|'
   }
   ```
2. `UserProgressData`:
   - Penambahan `readTopicStages?: Record<string, number[]>` (memetakan `topicId` ke array `stageId` yang telah selesai dibaca).

### B. Google Sheets Tab `KnowledgeTopics` (Hostless Sync)
1. Kolom Tab `KnowledgeTopics` (8 kolom):
   `branch_id`, `branch_title`, `topic_id`, `topic_title`, `stage_id`, `stage_title`, `content`, `key_points`.
2. Endpoint `doGet(e)` dengan `action=getTopics` mengembalikan daftar array `KnowledgeStageItem[]`.
3. Fungsi otomasi 1-klik `setupKnowledgeTopics()` dan pembaruan `setupDatabase()` di `Code.gs`.
4. 3-Tier fallback pada `fetchKnowledgeTopicsData()`: Live Fetch -> LocalStorage Cache (`lexicon_topics_cache_v1`) -> Mock Fallback (`MOCK_KNOWLEDGE_TOPICS`).

### C. UI Navigation & Components
1. **Dropdown Branch Switcher** di kiri atas (`HeaderHUD.tsx`):
   - Menampilkan cabang aktif: `English Lexicon` (default) serta cabang dinamis dari data topik (`Psychology & Life`, `Statistics & Data`).
   - Clean Light Mode dropdown (Slate-50/White, borders, shadows, chevron indicator).
2. **Sidebar Sub-Topics List** (`CommandSidebar.tsx` & Mobile Nav):
   - Saat berada di cabang pengetahuan, menampilkan daftar topik di cabang tersebut beserta total stage dan progres baca (`X / 21 Bagian`).
3. **Interactive Concept Reader (`KnowledgeTopicReaderView.tsx`)**:
   - **Horizontal Stage Selector Strip**: Tombol pil bagian (`Bagian 01` s/d `Bagian 21`), horizontal scrollable dengan indikator selesai dibaca.
   - **Single Hero Card**: Badge topik, nomor bagian, judul bagian (`stageTitle`), konten paragraf dengan parser `**bold**` & `<mark>` `==highlight==`, serta kotak *Key Points* langsung terbuka di bawah paragraf.
   - **Universal Single Floating Dock (ADR-004)**: Tombol navigasi `[ < ]`, pill status/tindakan tengah (`Tandai Selesai` / `Sudah Dibaca`), dan `[ > ]`, lengkap dengan dukungan hotkey keyboard panah Kiri/Kanan.

---

## 3. Verification Plan
1. **Typecheck & Lint**: `npm run typecheck` (`tsc --noEmit`) 0 error.
2. **Autonomous Unit Tests**:
   - Parsing TSV format, pemisahan key points (`|`).
   - Parser markdown/highlight (`**bold**` -> `<strong>`, `==highlight==` -> `<mark>`).
   - Multi-branch filtering dan toggle read stage di `UserProgressData`.
3. **Build & Bundle**: `npm run build` sukses dengan folder `dist/` dan `dist/_redirects`.
4. **Git Delivery**: Commit & push ke GitHub `origin/main`.

