# ENG-007 — Konfigurasi Deployment Netlify (Lexicon Lab)

Status:
APPROVED

Risk Level:
LOW

---

# 1. Objective

Siapkan seluruh berkas konfigurasi produksi Netlify agar aplikasi React Vite dapat di-build dan di-deploy dengan aman, mendukung routing Single Page Application (SPA), serta mencegah error 404 saat halaman di-refresh.

---

# 2. Reason

Aplikasi web Lexicon Lab berbasis SPA (Single Page Application) yang memerlukan rewrite / redirect rules ke `/index.html` pada web server hosting Netlify agar routing klien tidak menghasilkan error 404 saat pengguna me-reload halaman atau mengakses rute langsung. Selain itu, konfigurasi build otomatis dan audit file sensitif (.env) pada .gitignore diperlukan untuk keamanan deploy.

---

# 3. Files to Modify

- `.gitignore`
- `.env.example`
- `.agents/TASKS.md`

---

# 4. Files to Create

- `netlify.toml`
- `public/_redirects`

---

# 5. In-Scope Behavior

- Penambahan `netlify.toml` pada root repositori dengan publish directory `dist`, build command `npm run build`, dan redirect rule `/*` ke `/index.html` (status 200).
- Penambahan direktori `public/` dan file `public/_redirects` berisi `/* /index.html 200`.
- Audit dan pemastian `.gitignore` memblokir `.env`, `.env.local`, dan `dist/`.
- Pemastian `.env.example` mencantumkan `VITE_GOOGLE_SHEETS_API_URL=""`.
- Verifikasi build output memastikan `dist/_redirects` tersalin otomatis oleh Vite build.

---

# 6. Out-of-Scope Behavior

- Perubahan pada source code aplikasi (`src/*`).
- Modifikasi UI, audio engine, atau algoritma kuis/retensi.
- Penambahan dependensi npm baru.

---

# 7. Untouched Components

- Seluruh kode di dalam `src/` (`App.tsx`, `components/`, `data/`, `utils/`, `services/`, `types/`).
- `package.json` dan `package-lock.json`.
- `tsconfig.*.json` dan `vite.config.ts`.

---

# 8. Dependencies

New dependencies:
None.

---

# 9. Data / Database Impact

Schema change:
NO

Production data mutation:
NO

Migration:
N/A

Rollback:
Hapus `netlify.toml` dan `public/_redirects`.

---

# 10. Risks

Functional:
None. Build assets statis tidak mengubah runtime logic aplikasi.

Security:
Pastikan kredensial lokal `.env` dan `.env.local` tetap terlindungi di `.gitignore`.

Data integrity:
None.

Regression:
None. Source code aplikasi tidak tersentuh.

Operational:
Netlify build command `npm run build` dan redirect rules harus valid.

---

# 11. Oracle Contract

## Normal Case
Input / action:
Jalankan `npm run build` setelah `public/_redirects` dan `netlify.toml` dibuat.

Expected result:
Vite build sukses (status code 0). File `dist/_redirects` otomatis terbuat dengan isi `/* /index.html 200`. File `netlify.toml` berada di root repositori dengan konfigurasi publish & redirect.

## Boundary Case
Input / action:
Pemeriksaan routing fallback SPA melalui parser Netlify TOML & _redirects.

Expected result:
Redirect rule menargetkan `/*` ke `/index.html` dengan HTTP 200 rewrite.

## Error Case
Input / action:
Cek `.gitignore` terhadap file kredensial.

Expected result:
`.env`, `.env.local`, dan `dist/` ter-ignore sehingga tidak bisa di-commit ke Git.

## Regression Case
Existing behavior:
`tsc -b && vite build` berhasil tanpa error.

Expected unchanged behavior:
`tsc -b && vite build` tetap berhasil dengan 0 error dan zero TypeScript issues.

---

# 12. Required Verification

- `npx tsc --noEmit` -> PASS (0 error)
- `npm run build` -> PASS (0 error)
- `test -f dist/_redirects` -> PASS
- `git check-ignore .env .env.local dist/` -> PASS

---

# 13. QA Handoff

Autonomous QA verification via autonomous_qa_engineer standard:
- Validasi eksistensi dan konten `netlify.toml`.
- Validasi eksistensi dan konten `public/_redirects` serta `dist/_redirects`.
- Validasi `.gitignore` dan `.env.example`.
- Validasi build log bersih.

---

# 14. Approval

Approved by:
User

Approved date:
2026-10-28

Approval evidence:
Instruksi eksplisit pada prompt user: Task: Konfigurasi Deployment Netlify (Lexicon Lab).

---

# 15. Plan Deviations

None.
