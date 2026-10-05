# Rachmananta Ibnu Fajar Portfolio

Portfolio Next.js 15 berbahasa Inggris: satu halaman scroll (hero, statistik, slider kasus, toolkit, research, tabs background, kontak) plus halaman detail project. Seluruh konten hardcoded di `src/data/*`, divalidasi Zod, tanpa backend, database, atau environment variable.

## Stack

- Next.js 15, React 19, TypeScript, Tailwind CSS
- Zod dan React Hook Form untuk validasi form dan kontrak data
- Vitest untuk unit test kontrak data dan selector
- Efek scroll (sticky stacking, reveal, header auto-ganti tema, slider drag, marquee) murni CSS + DOM tanpa dependency animasi

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Tidak ada `.env` yang dibutuhkan. Supabase, CMS admin, dan auth sudah dihapus dari proyek ini.

## Mengubah konten

Konten dibaca dari `src/data/` melalui snapshot tervalidasi `src/lib/portfolio/seed.ts`:

- `src/data/profile.ts` — nama, peran, tautan, statistik kredibilitas, pendidikan
- `src/data/projects.ts` — daftar project dan kategori
- `src/data/experience.ts` — pengalaman, kepemimpinan, kelompok tech
- `src/data/certifications.ts` — sertifikasi

Ubah file tersebut, lalu jalankan `npm test` (kontrak schema) dan `npm run build`. Gambar taruh di `public/`.

## Route

- `/` — single page; nav anchor `#work`, `#research`, `#about`, `#contact`
- `/projects` — indeks semua project dengan filter
- `/projects/[slug]` — detail/case study
- `/about`, `/contact`, `/research` — redirect permanen ke anchor home
- `/does-not-exist` — 404

## Vercel

Deploy tanpa environment variable apa pun; build cukup `npm run build`.

## Validasi

```bash
npm run lint
npm test
npm run build
```

Dengan production server berjalan (`npm start`), jalankan smoke test responsive, keyboard focus, menu mobile, dan filter project menggunakan Chrome/Chromium:

```bash
npm run smoke:responsive
```
