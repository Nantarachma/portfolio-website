'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Entrance layer A: magnetic buttons + drawn section rules.
 *
 * Magnetic: pointer-driven (bukan scroll) — tombol tertarik ±14px ke
 * kursor, squash scale(1.05,.95), ghost chromatic merah ikut menggeser
 * (via filter drop-shadow), release dengan spring (transition CSS).
 * Destabilize rate utk drag terasa ringan; melepas = data-mag=0 →
 * transition spring cubic-bezier(0.22,1.4,0.36,1) menarik balik.
 *
 * Draw rules: garis pemisah section (border-b/t 3px) digambar scaleX
 * 0→1 saat section masuk viewport — terpisah dari engine reveal.
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

		// ---- drawn rules ----
		const rules = Array.from(document.querySelectorAll<HTMLElement>('[data-draw-b], [data-draw-t]'));
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						(entry.target as HTMLElement).dataset.drawn = '1';
						io.unobserve(entry.target);
					}
				}
			},
			// threshold fraksi ELEMEN — section tinggi (hero pin 4x) tak
			// pernah mencapai 0.15 fraksi viewport → trigger di tepi masuk.
			{ threshold: 0.01, rootMargin: '-8% 0px' },
		);
		for (const r of rules) io.observe(r);

		return () => {
			for (const el of magEls) {
				el.removeEventListener('pointermove', onMove as EventListener);
				el.removeEventListener('pointerleave', onLeave as EventListener);
			}
			io.disconnect();
		};
	}, [pathname]);

	return null;
}
