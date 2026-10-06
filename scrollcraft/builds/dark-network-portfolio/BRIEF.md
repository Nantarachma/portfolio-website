# BRIEF: dark-network-portfolio

Status: **interviewed**, 15 jawaban final dari user (tidak boleh ditanya ulang).
Repo: `D:/SKRIPSI/Portofolio/portfolio-website` (Next.js 15 + Tailwind, single-page, deploy Vercel).
Registry: `D:/SKRIPSI/Portofolio/portfolio-website/scrollcraft/FINGERPRINTS.md`.

Kutipan `"..."` = verbatim user. Label **Authored** = keputusan yang tidak dijawab interview, ditulis sendiri dan ditandai.

---

## Step 0: the eight topics

### 1. Vibe (3-5 kata + referensi)
Verbatim: **"Dark-tech cinematic + editorial (wireframe/orbit gelap, biru slate)"**
Referensi dari media lain: tidak ada yang diberikan (jawaban 1 hanya vibe). **Authored:** tanpa referensi eksternal, art direction dibuat dari vibe + estetika yang user pilih di topik 6.

### 2. The scroll journey, section by section (urutan user)
Urutan halaman yang berlaku (evidence dari repo + jawaban 9):
Hero (title page + objek 3D) → Stats (GPA 0.94 / Bangkit / SANTIKa / PT IGS, angka nyata) → Marquee skill → Work, rel kasus 5 kartu → Practice (3 area) → Toolkit (6 grup) → Research (2 paper) → About (tabs: experience / education / leadership / certifications) → Contact (portrait + CTA) → footer colophon.
Verbatim (jawaban 9): **"hero pin act span ~2.5 (3D di-scrub), rel kasus act pan, sisanya flow pendek, total halaman ~10-12vh"**

### 3. The energy curve
Verbatim (jawaban 3): **"Tenang di awal → meningkat ke rel kasus → sunyi sesaat sebelum puncak → resolusi hangat di kontak"**
Verbatim (jawaban 6): **"Peak act = HERO, span terbesar di awal (pin span ~2.5); 'sunyi' = detik tenang di dalam hero sebelum objek 3D terurai"**

### 4. Feeling stage by stage + ONE moment
Verbatim (jawaban 5, emosi per bagian): **"Hero: Penasaran → Kasus: Kagum & Percaya → Toolkit: Yakin kapabilitas → Kontak: Mantap bekerjasama"**
Verbatim (jawaban 6): peak = **"Objek 3D hero (wireframe/ML-network) yang terurai & tersusun mengikuti scroll"** (jawaban 2 juga menyebut ini sebagai peak).
Catatan: energi (keras/diam) dan emosi tidak sejajar. Rel kasus adalah puncak *energi*, hero tetap *peak* yang paling diingat dan dapat ruang scroll terbesar.

### 5. One thing this site should do that no site they have seen
Verbatim (jawaban 4): **"Peta node machine-learning yang mengorbit & menyambung mengikuti scroll (profil = jaringan hidup)"**
Ini benih signature move (lihat SCORE.md).

### 6. How far from premium-minimal
Verbatim (jawaban 10): **"Jauh: brutalist/maximalist dengan 3D sebagai pusat"**
Verbatim (jawaban 11): **"restyle seluruh halaman (semua section ikut bahasa dark-brutalist-editorial baru)"**
Aesthetic family (uniqueness.md §5): Brutalist + sedikit Maximalist, dunia gelap slate, 3D sebagai pusat gravitasi.

### 7. One unbroken world, or distinct scenes?
**Tidak dijawab interview. Authored:** distinct scenes / acts (bukan worldflight). Alasan: jawaban 9 menuntut act pin + act pan + flow sections, dan worldflight (continuous world) melarang acts, pin, dan copy yang menumpuk di atas kanvas. Gaya visual gelap yang konsisten + satu globe yang hidup di hero dan reassembles di kontak memberi rasa satu dunia tanpa mengorbankan struktur acts.

### 8. Assets
Verbatim (jawaban 14): **"murni prosedural Three.js, tanpa KIE key"**
Verbatim (jawaban 7): **"Three.js WebGL (dependency baru, +~180KB lazy, user memilih ini sadar biaya)"**
Konsekuensi: nol aset generatif, nol `KIE_AI_API_KEY`, seluruh visual prosedural (wireframe globe, node, edges, garis). Foto portrait di About/Contact adalah aset yang sudah ada di repo.

---

## Technical + brand rules (standing, menimpa default skill)

- **Engine scrollcraft TIDAK boleh diedit.** Bespoke code drive dari `--sc-p` + `data-sc-*` sendiri.
- **Vendored patches yang sudah ada jangan disentuh:** `prefers-reduced-motion` diabaikan, `color` inherit dibuang.
- **Brand rule: `prefers-reduced-motion` DIABAIKAN sepenuhnya** (standing rule owner). Rule ini menimpa aturan skill (skill sendiri: brand hard rules win). Semua act tetap jalan di bawah reduced-motion. Catat di sini supaya verification pass tidak melaporkannya sebagai bug.
- Angka hanya nyata dari `src/data/*.ts`. Tidak ada stat karangan.
- Em dash terlarang di copy yang terlihat. Pakai titik, koma, titik dua, atau kurung.
- Bahasa UI: Inggris.
- Signature lama `career-trail` diganti signature baru (lihat SCORE.md).

---

## The feeling curve (ditulis sebelum acts ada; satu baris per act: emosi → pemicu di layar)

```
1  Penasaran        bidang gelap hampir mati, judul diam, lalu globe wireframe terurai dan node topik (ML/CV/Mobile/Web) mengorbit menyambung mengikuti scroll
2  Percaya         angka nyata menghitung naik: GPA 0.94, Bangkit, SANTIKa, PT IGS
3  Kagum           rel kasus: 5 kartu berjalan menyamping, visual proyek miring ke arah kursor
4  Paham           tiga area praktik terbuka satu per satu seperti wipe antar bidang
5  Yakin           6 grup toolkit merakit baris demi baris di depan mata
6  Tertarik        2 paper riset mengendap pelan dengan angka dan istilah nyata
7  Dekat           tab experience/education/leadership/certifications, portrait bergeser beda laju dari teks
8  Mantap bekerjasama  resolusi hangat: satu CTA disorot, globe menyusun kembali sebagai latar kontak
```

Tidak ada dua act bersebelahan dengan emosi sama. Aesthetic family: brutalist/maximalist gelap (jawaban 10).

## The peak

- **Act 1 (Hero, pin span 2.5), ruang scroll terbesar di halaman.**
- Kalimat ke teman (before / after): **"the screen sat almost dead and dark, and then the globe broke apart into nodes and rebuilt itself around his profile as I scrolled."**

## The tell-someone sentence

> **It's the site where scrolling takes a dark wireframe globe apart into a live map of machine-learning topics and puts it back together around a person's profile.**

Experience dari sisi pengunjung, bukan nama device. Signature move ada di dalam kalimat ini.

## Authored silence (untuk verifikasi, jangan dikira dead scroll)

- **Sunyi di dalam hero:** pada `--sc-p` **0.00 sampai ~0.12** dari act 1, tidak ada yang bergerak kecuali judul dan bola yang nyaris tak terlihat. Bidang gelap, tanpa cue, tanpa node. Ini "detik tenang sebelum objek 3D terurai" (jawaban 6), disengaja, bukan halaman gagal load.
- **Kontras setelah sunyi:** perubahan visual terbesar halaman ada di act 1 setelah titik itu, dan act 1 memegang span terbesar (2.5vh, act terbesar berikutnya 1.8vh).
- Kontak (act 8) adalah resolusi yang berhenti dan diam dengan konten di layar terakhir, bukan fade ke footer.
