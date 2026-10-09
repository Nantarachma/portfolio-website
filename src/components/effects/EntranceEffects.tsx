'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Entrance layer: magnetic + SCRUB MANAGER.
 *
 * Magnetic: pointer-driven — tombol tertarik ±14px ke kursor, squash
 * scale(1.05,.95), ghost chromatic merah (via filter drop-shadow var
 * --mag-x/y), release spring (CSS transition).
 *
 * Scrub manager: SEMUA entrance (reveal engine, wipe eyebrow, glitch-in
 * chars, stamp caption, flip kartu, line reveal, draw rules, action-word)
 * dinyatakan di CSS sbg fungsi calc(var(--p)). Tugas JS hanya menulis
 * --p per elemen dari posisi viewport-nya, di-ease, tiap frame:
 *   raw = clamp((vh*0.92 - rect.top) / (vh*0.45), 0, 1)
 * Scroll turun → p naik (animasi jalan); balik atas → p mundur; lewati
 * lagi → replay. Rect-based: kebal fast-jump/lompat (bug "teks tak
 * terload" = reveal one-shot engine tak pernah fire saat lompat) dan
 * aman utk section ter-pin (rect diam → p diam di nilai final).
 *
 * FAIL-OPEN: default CSS var(--p, 1) — bila JS gagal/telat, semua
 * konten tampil utuh tanpa animasi; tak pernah stuck tersembunyi.
 *
 * Eksklusi (dispensasi user): marquee, sub heading hero (.hero-role +
 * TextScramble), glitch heading hero (.glitch-text) — loop time-driven
 * mereka tak disentuh. Elemen data-sc-cue dikuasai opacity scruby
 * engine (inline > stylesheet) — dua sistem sama-sama scroll-driven.
 *
 * Collect dijalankan ulang saat DOM berubah (MutationObserver debounced)
 * — kartu hasil filter / navigasi client ikut terkelola walau engine
 * tak pernah mengamatinya (engine collect sekali saat boot).
 */
export default function EntranceEffects() {
	const pathname = usePathname();

	useEffect(() => {
		// ---- magnetic ----
		const magEls = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
		const PULL = 14;

		const onMove = (e: PointerEvent) => {
			const el = (e.currentTarget as HTMLElement) ?? null;
			if (!el) return;
			const r = el.getBoundingClientRect();
			const dx = e.clientX - (r.left + r.width / 2);
			const dy = e.clientY - (r.top + r.height / 2);
			// tarik penuh makin dekat ke pusat (efek "menempel")
			const pull = 0.4;
			const x = Math.max(-PULL, Math.min(PULL, dx * pull));
			const y = Math.max(-PULL, Math.min(PULL, dy * pull));
			el.style.setProperty('--mag-x', `${x.toFixed(2)}px`);
			el.style.setProperty('--mag-y', `${y.toFixed(2)}px`);
			el.dataset.mag = '1';
		};
		const onLeave = (e: PointerEvent) => {
			const el = e.currentTarget as HTMLElement;
			el.dataset.mag = '0';
			el.style.setProperty('--mag-x', '0px');
			el.style.setProperty('--mag-y', '0px');
		};

		for (const el of magEls) {
			el.addEventListener('pointermove', onMove as EventListener);
			el.addEventListener('pointerleave', onLeave as EventListener);
		}

		// ---- flip by press (portrait ID card) ----
		// Delegated: [data-flip] toggle data-flipped → CSS transition
		// time-based. Keyboard: Enter/Space pada elemen fokus (a11y).
		const flipToggle = (el: HTMLElement) => {
			const on = el.dataset.flipped !== '1';
			el.dataset.flipped = on ? '1' : '0';
			el.setAttribute('aria-pressed', on ? 'true' : 'false');
			// transisi halus sesaat (CSS: class hanya utk kartu scrubs,
			// .flip-id di-skip karena sudah punya transisi sendiri)
			el.classList.add('is-flipping');
			window.setTimeout(() => el.classList.remove('is-flipping'), 480);
		};
		const onFlipClick = (e: Event) => {
			const el = (e.target as Element | null)?.closest?.('[data-flip]');
			if (el) flipToggle(el as HTMLElement);
		};
		const onFlipKey = (e: KeyboardEvent) => {
			if (e.key !== 'Enter' && e.key !== ' ') return;
			const el = document.activeElement;
			if (el instanceof HTMLElement && el.hasAttribute('data-flip')) {
				e.preventDefault();
				flipToggle(el);
			}
		};
		document.addEventListener('click', onFlipClick);
		document.addEventListener('keydown', onFlipKey);

		// ---- scrub manager ----
		// Perf: TWO-PASS (baca semua rect dulu → tulis semua) — versi lama
		// menulis di antara baca → reflow dipaksa per elemen per frame.
		// Plus ACTIVE-SET via IO (rootMargin ±100%): elemen jauh di luar
		// viewport tak dibaca tiap frame — cuma ditulis target ekstrem
		// (0 = di bawah layar, 1 = di atas layar) saat statusnya berubah.
		// State per elemen di WeakMap → selamat dari recollect (filter).
		const SELECTOR =
			'[data-sc-in], [data-sc-stagger] > *, [data-draw-b], [data-draw-t], .action-word, .eyebrow';
		const isBack = (el: HTMLElement) =>
			el.classList.contains('flip3d__inner') ||
			el.classList.contains('caption-box') ||
			el.classList.contains('action-word');

		interface Item {
			el: HTMLElement;
			back: boolean;
			near: boolean;
			raw: number;
			// Stagger per-scroll: anak [data-sc-stagger] dpt delay band per
			// index → kartu horizontal (grid 4 kolom / rack) muncul URUT
			// mengikuti scroll, bukan serempak (rect.top sama semua).
			sgIdx: number;
			sgStep: number;
		}
		type State = { cur?: number; wait?: number };
		const state = new WeakMap<HTMLElement, State>();
		const stateOf = (el: HTMLElement) => {
			let s = state.get(el);
			if (!s) {
				s = {};
				state.set(el, s);
			}
			return s;
		};

		let items: Item[] = [];
		// Kartu works (cue engine): fade dikontrol scrollcraft (inline
		// opacity per act progress) → blur disinkronkan dari nilai itu.
		let blurEls: HTMLElement[] = [];
		let boot = false; // true setelah frame pertama → intro selesai
		let introSeq = 0; // slot stagger load intro (hanya item terlihat saat boot)
		let dirty = true;
		const collect = () => {
			// Idx stagger PER BARIS: anak sebaris → 0,1,2…; baris baru RESET
			// ke 0. Grid kolom (toolkit/research) baris bawah sudah telat
			// secara vertikal — jangan ditambah delay idx global (dulu kartu
			// idx 3-5 telat 270-450px dobel). Grid 1 baris (stats 4 kolom)
			// tetap 0..n → urutan per kartu utuh.
			const rowCache = new Map<Element, Map<Element, number>>();
			const rowIdxOf = (parent: Element, child: Element) => {
				let m = rowCache.get(parent);
				if (!m) {
					m = new Map();
					let rowPrev = NaN;
					let idx = 0;
					for (const k of Array.from(parent.children)) {
						const row = Math.round(k.getBoundingClientRect().top / 60);
						idx = row === rowPrev ? idx + 1 : 0;
						m.set(k, idx);
						rowPrev = row;
					}
					rowCache.set(parent, m);
				}
				return m.get(child) ?? 0;
			};

			items = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).map((el) => {
				// anak langsung [data-sc-stagger] → idx per baris + step dr
				// nilai attr (mis stats 70, toolkit 60) → scroll offset
				const sg = el.parentElement?.hasAttribute('data-sc-stagger');
				const sgIdx = sg ? rowIdxOf(el.parentElement!, el) : 0;
				const sgStagger = sg ? parseFloat(el.parentElement!.getAttribute('data-sc-stagger') || '0') : 0;
				return {
					el,
					back: isBack(el),
					near: true, // default optimis; IO segera mengkoreksi
					raw: 0,
					sgIdx,
					sgStep: (sgStagger * window.innerHeight) / 720, // ~0.1vh per index
				};
			});
			for (const it of items) observer.observe(it.el);
			blurEls = Array.from(document.querySelectorAll<HTMLElement>('[data-sc-cue].case-card'));
			dirty = false;
		};

		const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
		const smooth = (t: number) => t * t * (3 - 2 * t);
		const backOut = (t: number) => {
			const c1 = 1.70158;
			const c3 = c1 + 1;
			const u = t - 1;
			return 1 + c3 * u * u * u + c1 * u * u;
		};

		const writeP = (el: HTMLElement, v: number) => {
			const s = v.toFixed(4);
			if (el.dataset.pCache !== s) {
				el.style.setProperty('--p', s);
				el.dataset.pCache = s;
			}
		};

		let raf = 0;
		const frame = () => {
			raf = 0;
			if (dirty) collect();
			const vh = window.innerHeight;
			const band = vh * 0.45;
			const start = vh * 0.92;
			let chasing = false; // masih ada elemen mengejar target?

			// PASS 1 — baca semua rect (tanpa write apa pun di sela baca).
			// Stagger: idx*step mengurangi raw → kartu ke-2/3/4 butuh scroll
			// lebih jauh utk mulai masuk = delay urut per scroll.
			for (const it of items) {
				if (!it.near) continue;
				const rect = it.el.getBoundingClientRect();
				it.raw = clamp01((start - rect.top - it.sgIdx * it.sgStep) / band);
			}

			// PASS 2 — easing + catch-up tween + write
			for (const it of items) {
				if (!it.near) continue;
				const target = it.back ? backOut(it.raw) : smooth(it.raw);
				const st = stateOf(it.el);
				if (st.cur === undefined) {
					if (boot) {
						st.cur = target; // item baru (filter) → langsung target (tween di bawah)
					} else {
						// LOAD INTRO: frame pertama → semua mulai dr 0; item
						// yg targetnya >0 (terlihat pas buka halaman) naik
						// BERURUTAN (stagger 4 frame ≈ 65ms per slot urutan DOM)
						// — choreography time-driven sekali, lalu menyerah kscrub.
						// Item di bawah layar (target 0) tanpa slot → diam.
						st.cur = 0;
						if (target > 0) st.wait = introSeq++ * 4;
					}
				}
				if (st.wait !== undefined && st.wait > 0) {
					st.wait--;
					writeP(it.el, st.cur);
					chasing = true; // frame terus dipanggil selama intro jalan
					continue;
				}
				const d = target - st.cur;
				if (Math.abs(d) > 0.004) {
					// lompat besar (elemen baru / fast-jump) → ease pelan;
					// beda kecil (scroll halus) → snap biar scrub responsif.
					// SNAP bila posisi sudah penuh (raw≥1): kartu harus tuntas
					// di titik penuh — tanpa ini catch-up tween tertinggal dan
					// kartu meninggalkan viewport dlm keadaan setengah (tak
					// terbaca, keluhan research).
					if (it.raw >= 1) st.cur = target;
					else st.cur = Math.abs(d) > 0.2 ? st.cur + d * 0.28 : target;
					chasing = true;
				}
				writeP(it.el, st.cur);
			}
			// Blur utk kartu works: baca opacity tulisan cue engine →
			// (1-op)*6px; snap 'none' di opacity penuh (tulis disimpan di
			// data-attr → tanpa query getComputedStyle per frame).
			for (const el of blurEls) {
				const parsed = parseFloat(el.style.opacity);
				const b = (1 - (isNaN(parsed) ? 1 : parsed)) * 6;
				const v = b > 0.06 ? `blur(${b.toFixed(2)}px)` : 'none';
				if (el.dataset.blurCache !== v) {
					el.style.filter = v;
					el.dataset.blurCache = v;
				}
			}
			boot = true;
			// tween jalan terus walau scroll berhenti (fast-jump / filter:
			// rAF sekali doang akan membekukan p di tengah jalan)
			if (chasing) schedule();
		};
		const schedule = () => {
			if (!raf) raf = window.requestAnimationFrame(frame);
		};

		// ACTIVE-SET: elemen dekat viewport (±100%vh) → masuk loop frame;
		// keluar → tulin ekstrem sekali lalu keluar dari loop.
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					const el = e.target as HTMLElement;
					const item = items.find((i) => i.el === el);
					if (!item) continue;
					if (e.isIntersecting) {
						item.near = true;
						schedule();
					} else {
						item.near = false;
						writeP(el, e.boundingClientRect.top > window.innerHeight ? 0 : 1);
					}
				}
			},
			{ rootMargin: '100% 0px 100% 0px', threshold: 0 },
		);

		collect();
		frame();
		window.addEventListener('scroll', schedule, { passive: true });
		// resize → collect ulang: jumlah kolom grid bisa berubah (md→lg)
		// → idx per baris harus dihitung ulang
		let rsTimer = 0;
		const onResize = () => {
			schedule();
			window.clearTimeout(rsTimer);
			rsTimer = window.setTimeout(() => {
				dirty = true;
				schedule();
			}, 150);
		};
		window.addEventListener('resize', onResize, { passive: true });

		// DOM berubah (filter projects, nav client, hydration) → collect ulang
		let moTimer = 0;
		const mo = new MutationObserver(() => {
			window.clearTimeout(moTimer);
			moTimer = window.setTimeout(() => {
				dirty = true;
				schedule();
			}, 120);
		});
		mo.observe(document.body, { childList: true, subtree: true });

		return () => {
			for (const el of magEls) {
				el.removeEventListener('pointermove', onMove as EventListener);
				el.removeEventListener('pointerleave', onLeave as EventListener);
			}
			document.removeEventListener('click', onFlipClick);
			document.removeEventListener('keydown', onFlipKey);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', onResize);
			window.clearTimeout(rsTimer);
			if (raf) window.cancelAnimationFrame(raf);
			window.clearTimeout(moTimer);
			mo.disconnect();
			observer.disconnect();
		};
	}, [pathname]);

	return null;
}
