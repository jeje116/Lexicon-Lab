# ENG-001 — Scaffolding React Vite & Google AI Studio UI Layout

Status:
COMPLETED

Risk Level:
LOW

---

# 1. Objective

Menyiapkan fondasi dan kerangka kerja aplikasi React berbasis Vite, mengonfigurasi sistem token desain bertema Google AI Studio (dark theme minimalis, neutral borders, Google blue accent), serta mengimplementasikan struktur layout dashboard modular yang terdiri dari Top Header, Left Sidebar navigation, dan Main Canvas area.

---

# 2. Reason

Proyek baru dimulai dari repositori kosong (greenfield). Sebelum logic pembelajaran kosa kata (ENG-002 s/d ENG-006) dapat dibangun, diperlukan environment pengembangan yang cepat, terstruktur, type-safe, serta antarmuka visual dasar yang selaras dengan panduan desain Google AI Studio (ADR-001).

---

# 3. Files to Modify

- `None` (proyek baru, tidak ada kode aplikasi sebelumnya yang dimodifikasi).

---

# 4. Files to Create

- `package.json` (konfigurasi dependensi dan skrip proyek Vite + React)
- `vite.config.ts` (konfigurasi Vite bundler)
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` (konfigurasi TypeScript)
- `index.html` (entry point HTML dengan font Inter/Roboto & JetBrains Mono)
- `src/main.tsx` (entry point React)
- `src/App.tsx` (komponen root aplikasi mengintegrasikan layout utama)
- `src/index.css` (definisi CSS tokens Google AI Studio: surface, canvas, border, accent, typography)
- `src/types/navigation.ts` (tipe navigasi view: 'daily-words' | 'daily-quiz' | 'retention-test' | 'stats')
- `src/components/layout/MainLayout.tsx` (komposisi layout split-view)
- `src/components/layout/Header.tsx` (top bar: status koneksi/storage, level indicator, user streak/badge)
- `src/components/layout/Sidebar.tsx` (navigasi samping modular: Daily Words, Daily Quiz, Retention Test, Stats)
- `src/components/workspace/WorkspacePlaceholder.tsx` (canvas utama dengan AI Studio prompt/card style placeholder)

---

# 5. In-Scope Behavior

- Inisialisasi tooling React 18/19 dengan TypeScript dan Vite pada workspace root.
- Konfigurasi token warna dan style Google AI Studio:
  - Background canvas netral gelap (`#131314` / `#1e1f20`)
  - Elevated surfaces / card background (`#1e1f20` / `#282a2c`)
  - Hairline borders (`#3c4043` / `#444746`)
  - Primary accent blue (`#1a73e8` / `#8ab4f8`)
  - High-contrast typography (Putih/Off-white `#e3e3e3`, muted `#9aa0a6`, monospace badges `#c4c7c5`)
- Layout dashboard fungsional:
  - Header: Menampilkan judul platform, status badge ("Session Ready", "Storage: Local Mock"), dan user level tag ("CEFR B2").
  - Sidebar: Menu navigasi interaktif dengan ikon (`Daily Words`, `Daily Quiz`, `Retention Test`, `Stats`) dengan penanda active state yang bersih.
  - Main Canvas: Area kerja terfokus yang merender view sesuai navigasi yang dipilih (saat ini placeholder card dengan estetika Google AI Studio).
- Responsivitas dasar untuk tampilan desktop dan tablet/mobile drawer toggle.

---

# 6. Out-of-Scope Behavior

- Implementasi vocabulary data fetching atau Google Sheets API (dijadwalkan pada ENG-002 & ENG-006).
- Implementasi flow belajar 10 kata interaktif (dijadwalkan pada ENG-003).
- Implementasi zero-tolerance quiz logic engine (dijadwalkan pada ENG-004).
- Implementasi retention algorithm & verb recall engine (dijadwalkan pada ENG-005).

---

# 7. Untouched Components

- `.agents/` (seluruh workflows, skills, dan core documentation tetap terpelihara).

---

# 8. Dependencies

Proposed packages:
- `react`, `react-dom` (Core UI library)
- `lucide-react` (Koleksi icon minimalis modern untuk navigasi dan status badge)
- `clsx`, `tailwind-merge` (Utility class merging untuk styling bersih)
- Dev Dependencies:
  - `vite`, `@vitejs/plugin-react`
  - `typescript`, `@types/react`, `@types/react-dom`
  - `tailwindcss`, `postcss`, `autoprefixer` (atau modern modular CSS tokens)

---

# 9. Data / Database Impact

- Schema change: `NO`
- Production data mutation: `NO`
- Migration: `N/A`
- Rollback: `N/A`

---

# 10. Risks

- Functional: Routing state sederhana antar section; risiko minimal karena menggunakan localized state toggle sebelum router penuh diperlukan.
- Visual: Inkonsistensi token warna Google AI Studio jika tidak didefinisikan secara tersentralisasi pada `index.css`.
- Build/Runtime: Konflik versi Vite / React TypeScript; dimitigasi dengan menggunakan konfigurasi standar Vite TS template.

---

# 11. Oracle Contract

## Normal Case
- **Input / Action**: Menjalankan dev server `npm run dev` dan membuka aplikasi di browser.
- **Expected Result**:
  - Halaman ter-render dalam mode gelap Google AI Studio tanpa FOUC (flash of unstyled content).
  - Header menampilkan brand title, status badge, dan level indicator.
  - Sidebar menampilkan 4 item navigasi; mengklik salah satu menu akan mengubah active state dan merender judul view yang sesuai di Main Canvas.
  - Console browser bersih dari error dan warning.

## Boundary Case
- **Input / Action**: Mempersempit viewport layar ke ukuran mobile (< 768px).
- **Expected Result**:
  - Sidebar mengecil (collapse) atau dapat di-toggle via burger menu tanpa layout horizontal overflow/breakage.
  - Main Canvas menyesuaikan padding secara proporsional.

## Error Case
- **Input / Action**: Navigasi ke state view yang tidak terdaftar.
- **Expected Result**:
  - Main Canvas secara graceful menampilkan fallback "View Not Found / Under Construction" tanpa crash (unhandled exception).

## Regression Case
- **Input / Action**: Pemeriksaan integritas `.agents/` pasca instalasi node_modules dan file scaffolding.
- **Expected Result**:
  - Tidak ada modifikasi atau penghapusan file di dalam direktori `.agents/`.

---

# 12. Required Verification

- **Syntax & Typecheck**: `npm run build` atau `npx tsc --noEmit` lolos 0 error.
- **Dev Server Startup**: `npm run dev` aktif dan menyajikan bundle lokal.
- **Browser Runtime QA**:
  - Verifikasi elemen DOM: Header (`#app-header`), Sidebar (`#app-sidebar`), Main Canvas (`#app-workspace`).
  - Verifikasi responsivitas pada resolusi desktop (1440x900) dan mobile (375x667).
  - Verifikasi zero console error.

---

# 13. QA Handoff

Instruksi untuk `/autonomous_qa_engineer`:
- Jalankan verifikasi linting dan typecheck.
- Lakukan smoke test pada browser lokal:
  1. Pastikan server dev aktif.
  2. Buka URL lokal via browser tooling.
  3. Periksa keberadaan elemen navigasi, klik tiap menu (`Daily Words`, `Daily Quiz`, `Retention Test`, `Stats`).
  4. Ambil snapshot/screenshot visual untuk konfirmasi keselarasan tema Google AI Studio (warna background gelap `#131314`, accent blue, border subtle).
  5. Konfirmasi tidak ada pesan error merah pada browser console logs.

---

# 14. Approval

Approved by:
User

Approved date:
2026-09-25

Approval evidence:
User request: "Implementasikan seluruh spesifikasi pada plan ENG-001: inisialisasi skeleton project React Vite (TypeScript), setup design tokens Google AI Studio UI, dan bangun komponen kerangka layout dasar (Header, Sidebar, Workspace)."

---

# 15. Plan Deviations

None.
