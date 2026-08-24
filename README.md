# Rachmananta Ibnu Fajar Portfolio

Portfolio Next.js 15 dengan website publik berbahasa Inggris dan CMS admin berbahasa Indonesia. Konten aktif disimpan sebagai satu snapshot tervalidasi di Supabase PostgreSQL; admin mengedit draft, melakukan full-site preview, lalu publish secara atomik.

## Stack

- Next.js 15, React 19, TypeScript, Tailwind CSS
- Supabase PostgreSQL, Auth, dan Storage
- Zod, React Hook Form, dan Supabase SSR
- Vitest untuk unit test kontrak data dan selector

## Menjalankan secara lokal

```bash
npm install
copy .env.example .env.local
npm run dev
```

Tanpa environment Supabase, website publik tetap berjalan menggunakan seed snapshot di `src/lib/portfolio/seed.ts`. Route admin akan menampilkan bahwa Supabase belum dikonfigurasi.

## Setup Supabase

1. Buat project Supabase dan nonaktifkan public signup pada pengaturan Auth. Aktifkan email/password.
2. Jalankan migration `supabase/migrations/202608240001_portfolio_admin.sql` melalui Supabase CLI atau SQL Editor. Migration membuat tabel, RLS, RPC publish/restore/delete-media, dan bucket `portfolio-media`.
3. Buat satu user admin melalui Supabase Dashboard > Authentication > Users.
4. Masukkan UUID user tersebut ke allowlist melalui SQL Editor:

```sql
insert into public.admin_users (user_id)
values ('UUID-USER-DARI-SUPABASE-AUTH');
```

5. Isi `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_SECRET_KEY=your-secret-key
```

`SUPABASE_SECRET_KEY` hanya diperlukan oleh seed lokal. Jangan memakai atau mengirim secret key ke Client Component/browser.

6. Bootstrap draft dan publication versi pertama secara idempotent:

```bash
npm run seed:portfolio
```

7. Buka `/admin/login`, login dengan akun allowlist, lalu kelola draft di `/admin/content`.

## Alur admin

- **Save Draft** memvalidasi seluruh dokumen dengan Zod dan tidak mengubah situs publik.
- **Preview situs** mengaktifkan Next.js Draft Mode setelah verifikasi admin. Banner preview menyediakan aksi keluar.
- **Publish** memanggil fungsi PostgreSQL atomik, mengarsipkan versi aktif, menaikkan nomor versi, mempertahankan maksimal 10 revisi, dan merevalidasi cache/path publik.
- **Restore** hanya menyalin revisi terpilih ke draft. Admin harus preview dan publish kembali.
- Slug project published dikunci di editor. Aksi khusus dapat membukanya; saat disimpan, redirect slug lama ditambahkan otomatis.
- Media menerima JPG/PNG/WebP maksimal 5 MB dengan alt text wajib. RPC menolak penghapusan asset yang masih direferensikan oleh draft, publication, atau revision.

## Vercel

Tambahkan tiga environment variable publik berikut untuk Development, Preview, dan Production:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (gunakan origin deployment yang sesuai)

Jangan tambahkan `SUPABASE_SECRET_KEY` ke runtime Vercel kecuali ada workflow bootstrap terpisah yang benar-benar membutuhkannya. Terapkan migration dan seed sebelum smoke test Vercel Preview.

## Validasi

```bash
npm run lint
npm test
npm run build
```

Dengan production server berjalan (`npm start`), jalankan smoke test responsive, reduced-motion, dan keyboard focus menggunakan Chrome/Chromium:

```bash
npm run smoke:responsive
```

Test RLS/Auth/Storage end-to-end memerlukan project Supabase test dan akun allowlist. Website publik tidak lagi mengimpor `src/data` saat runtime; folder tersebut dipertahankan hanya sebagai sumber bootstrap/testing untuk seed yang identik dengan konten awal (9 projects dan 23 certifications).
