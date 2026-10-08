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
		const SELECTOR =
			'[data-sc-in], [data-sc-stagger] > *, [data-draw-b], [data-draw-t], .action-word, .eyebrow';
		// easing back (overshoot) utk entrance yg butuh pantulan:
		// flip kartu, stamp caption, pop action-word.
		const isBack = (el: HTMLElement) =>
			el.classList.contains('flip3d__inner') ||
			el.classList.contains('caption-box') ||
			el.classList.contains('action-word');

		let items: { el: HTMLElement; back: boolean }[] = [];
		let dirty = true;
		const collect = () => {
			items = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).map((el) => ({
				el,
				back: isBack(el),
			}));
			dirty = false;
		};

		const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
		const smooth = (t: number) => t * t * (3 - 2 * t);
		const backOut = (t: number) => {
			// easeOutBack: tembus sedikit >1 lalu settle — overshoot utk
			// flip/stamp selayaknya keyframe aslinya.
			const c1 = 1.70158;
			const c3 = c1 + 1;
			const u = t - 1;
			return 1 + c3 * u * u * u + c1 * u * u;
		};

		let raf = 0;
		const frame = () => {
			raf = 0;
			if (dirty) collect();
			const vh = window.innerHeight;
			const band = vh * 0.45;
			const start = vh * 0.92;
			for (const it of items) {
				const rect = it.el.getBoundingClientRect();
				const raw = clamp01((start - rect.top) / band);
				const eased = it.back ? backOut(raw) : smooth(raw);
				const v = eased.toFixed(4);
				if (it.el.dataset.pCache !== v) {
					it.el.style.setProperty('--p', v);
					it.el.dataset.pCache = v;
				}
			}
		};
		const schedule = () => {
			if (!raf) raf = window.requestAnimationFrame(frame);
		};

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
		};
	}, [pathname]);

	return null;
}
