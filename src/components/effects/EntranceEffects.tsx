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
		}
		type State = { cur?: number };
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
		let boot = false; // true setelah frame pertama → item baru = mulai dr 0
		let dirty = true;
		const collect = () => {
			items = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).map((el) => ({
				el,
				back: isBack(el),
				near: true, // default optimis; IO segera mengkoreksi
				raw: 0,
			}));
			for (const it of items) observer.observe(it.el);
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

			// PASS 1 — baca semua rect (tanpa write apa pun di sela baca)
			for (const it of items) {
				if (!it.near) continue;
				const rect = it.el.getBoundingClientRect();
				it.raw = clamp01((start - rect.top) / band);
			}

			// PASS 2 — easing + catch-up tween + write
			for (const it of items) {
				if (!it.near) continue;
				const target = it.back ? backOut(it.raw) : smooth(it.raw);
				const st = stateOf(it.el);
				if (st.cur === undefined) st.cur = boot ? 0 : target; // item baru → dr 0
				const d = target - st.cur;
				if (Math.abs(d) > 0.004) {
					// lompat besar (elemen baru / fast-jump) → ease pelan;
					// beda kecil (scroll halus) → snap biar scrub responsif
					st.cur = Math.abs(d) > 0.2 ? st.cur + d * 0.28 : target;
					chasing = true;
				}
				writeP(it.el, st.cur);
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
		window.addEventListener('resize', schedule, { passive: true });

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
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			if (raf) window.cancelAnimationFrame(raf);
			window.clearTimeout(moTimer);
			mo.disconnect();
			observer.disconnect();
		};
	}, [pathname]);

	return null;
}
