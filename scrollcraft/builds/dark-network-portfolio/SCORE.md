# SCORE: dark-network-portfolio

Dibaca setelah `BRIEF.md`. Engine tidak diedit; semua bespoke code drive dari `--sc-p` + `data-sc-*` milik halaman ini.

---

## 1. Grammar yang dipilih: **Filmic one-shot** (uniqueness.md §2.1)

Alasan menang: jawaban 6 menempatkan peak di awal sebagai satu arc emosional berkelanjutan (penasaran → kagum → yakin → mantap) dengan satu objek 3D yang di-scrub lewat hero, yaitu bentuk "satu film yang didorong ke bawah". Nav/hero/close mengikuti grammar: fixed minimal bar, full-bleed scrub hero, pinned close dengan spotlight + magnetic CTA. Struktur acts dari jawaban 9 (pin 2.5 → pan rel kasus → flow pendek) adalah leaning `scrub`/`pin`/`drift`/`kinetic` ini.

### 7 grammar lain kalah (satu baris masing-masing)

| Grammar | Kenapa kalah |
|---|---|
| Chaptered editorial | Sudah dipakai baris registry `editorial-portfolio`; juga melarang hero bermedia di atas fold, sementara brief menuntut hero 3D pin. |
| Live surface | Butuh produk yang benar-benar berjalan sebagai surface dengan panel yang compute state; portfolio personal bukan aplikasi. |
| Continuous world | Wajib worldflight: melarang acts, pin, dan copy di atas kanvas; jawaban 9 menuntut act pin + act pan + flow sections. |
| Typographic poster | Melarang scrub dan ground bermedia; brief menjadikan objek 3D sebagai pusat halaman. |
| Gallery / catalog | Hero-nya adalah objek pertama yang sudah tampil tanpa judul terpisah; brief punya hero act pin sendiri sebelum koleksi. |
| Split stage | Butuh dua kolom berlawanan yang dua-duanya berisi sepanjang halaman; isi portfolio tidak punya pasangan before/after. |
| Rhythmic cutlist | Melarang `pin` dan `dwell` total; brief menuntut hero pin span 2.5 dengan 3D di-scrub. |

---

## 2. Feeling curve → score table

Curve lengkap ada di BRIEF.md (ditulis sebelum tabel ini). Acts dan spans:

| # | Act | Device (kit) | Span |
|---|---|---|---|
| 1 | Hero orbit (PEAK) | `pin` + kinetic + bespoke Three.js scrub | **2.5vh** |
| 2 | Stats | `flow` + `count` | 1.0vh |
| 3 | Work rel kasus (5 kartu) | `pan` + `tilt` | 1.8vh |
| 4 | Practice (3 area) | `reveal` | 1.0vh |
| 5 | Toolkit (6 grup) | `kinetic` | 1.2vh |
| 6 | Research (2 paper) | `count` + `parallax` | 0.9vh |
| 7 | About (4 tab) | `flow` + `parallax` | 1.0vh |
| 8 | Contact | `pin` + `cue`/spotlight + magnet | 1.5vh |

Total **8 tagged acts = 10.9vh**, plus marquee skill sebagai intertitle plate pendek: total halaman **~11.3vh**, di band target jawaban 9 (10-12vh). Bukan band 6-7 acts @ 13.6-13.8vh (dimensi fingerprint, sengaja dihindari).

### Score table

| Beat / Emosi | Device | Why |
|---|---|---|
| 1 Recognition / **Penasaran** | `pin` (span 2.5) + bespoke Three.js scrub + kinetic title | Peak: dunia diam lalu terurai di bawah tangan pengunjung. Sunyi `--sc-p` 0.00-0.12 disengaja sebelum node mengorbit. |
| 2 Proof / **Percaya** | `flow` + `count` | Angka nyata (GPA 0.94, Bangkit, SANTIKa, PT IGS) menghitung naik; `count` hanya boleh pada angka asli, langsung setelah klaim hero untuk menanam bukti. |
| 3 Substance / **Kagum** | `pan` + `tilt` | Rel kasus 5 kartu berjalan lateral, membaca sebagai "karya yang bisa dipilih", bukan argumen; energi naik ke rel kasus sesuai kurva. |
| 4 Range / **Paham** | `reveal` | Tiga area praktik dibuka dengan wipe; wipe adalah perubahan state, cocok untuk "ini bidang apa saja". |
| 5 Capability / **Yakin** | `kinetic` | 6 grup toolkit merakit baris demi baris, membuat kapabilitas terasa dirakit di depan mata. |
| 6 Credibility / **Tertarik** | `count` + `parallax` | 2 paper dengan angka dan istilah nyata; parallax tipis di kolom referensi menjaga tetap hidup tanpa mengalahkan peak. |
| 7 Person / **Dekat** | `flow` + `parallax` | Tab experience/education/leadership/certifications mengalir; portrait bergeser beda laju dari teks sebagai dekatnya orang di balik karya. |
| 8 Commitment / **Mantap bekerjasama** | `pin` + `cue` + spotlight + magnet | Halaman berhenti dan merespons; resolusi hangat, satu CTA, globe menyusun kembali sebagai latar. |

Checks:
- 6 keluarga device (`pin`, `flow`, `pan`, `reveal`, `kinetic`, `count`) ≥ 4. ✓
- Tidak ada device dua kali berurutan (urutan primer: pin → flow → pan → reveal → kinetic → count → flow → pin). ✓
- `scrub` video: 0; scrub hanya milik bespoke Three.js di act 1, satu kali. ✓
- Emosi bersebelahan tidak pernah sama. ✓
- Peak = act 1, span 2.5vh, act terbesar berikutnya 1.8vh (margin terlihat). Act sebelum peak: tidak ada, jadi kesunyian dipindah ke kepala act 1 dan didokumentasikan di BRIEF.md. ✓
- Grammar bans terpenuhi: tanpa chapter counter, tanpa hard cut antar ground, tanpa chrome berbentuk alat, satu entry point (nav = bar minimal wordmark + satu CTA, tanpa scroll-spy, tanpa daftar anchor). ✓
- Total 10.9-11.3vh, tiap act punya isi nyata, tanpa pin kosong. ✓

---

## 3. Fingerprint gate vs baris `editorial-portfolio`

Gate: beda minimal **4 dari 6** dimensi terhadap SETIAP baris. Hasil: **6 dari 6**.

| # | Dimensi | `editorial-portfolio` (registry) | `dark-network-portfolio` (rencana) | Beda? |
|---|---|---|---|---|
| 1 | Grammar | Chaptered editorial | Filmic one-shot | ✓ |
| 2 | Nav treatment | Sticky top bar + mobile sheet, anchor scroll-spy (folio) | Fixed minimal bar, wordmark + satu CTA, tanpa scroll-spy dan tanpa index; cara tahu-posisi pindah ke orientasi visual globe | ✓ |
| 3 | Hero device | Title page: tipografi murni di atas plate gelap, tanpa media di atas fold | Pinned full-bleed globe wireframe Three.js di-scrub, tipografi menumpuk di atas scene | ✓ |
| 4 | Act-sequence shape | `flow > flow > pan(5vh)` + plate; ~12vh; peak di rel kasus | `pin(2.5) > flow > pan(1.8) > reveal > kinetic > count > flow > pin`; 8 acts, ~11.3vh; peak di hero (awal) | ✓ |
| 5 | Close pattern | Colophon/masthead plate: teks kecil, link kontak, portrait, CTA sebagai running text | Pinned contact act, ground hangat, spotlight + magnetic CTA, globe reassembled di belakang | ✓ |
| 6 | Signature move | Career-trail rail di margin (garis + milestone node dari `--sc-trail-p`) | Orbiting ML node map: globe wireframe Three.js dengan node topik yang mengorbit & tersambung mengikuti scroll | ✓ |

Signature move: **Orbiting ML node map**. Bespoke, ditulis di halaman: satu globe wireframe prosedural, node topik (ML/CV/Mobile/Web) mengorbit, edge menyambung antar node digambar dari `--sc-p`, pointer mencondongkan poros orbit sedikit. Bukan parameter dari kit, bukan recolour spotlight, bukan tilt yang diubah. Engine tetap disentuh nol.

Yang DIBAGIKAN dengan baris lama (catatan untuk build berikutnya): dunia gelap + biru slate (palet identitas yang sama) dan keberadaan act `pan` untuk rel kasus. Poin itulah yang harus dihindari build berikutnya.
