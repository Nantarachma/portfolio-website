'use client';

import { useEffect } from 'react';

export const SECTION_EVENT = 'portfolio:section';

/**
 * Scroll orchestration for the single-page home: reveal-on-enter,
 * header theme following the block underneath it, and nav active state.
 */
export default function ScrollEffects() {
	useEffect(() => {
		const header = document.querySelector<HTMLElement>('.site-header');
		// Every top-level block is opaque; the last one covering the probe is
		// what the header visually sits on (the sticky hero stays in range all page).
		const blocks = Array.from(document.querySelectorAll<HTMLElement>('main > *'));
		const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-section]'));
		let frame = 0;
		let lastTheme: string | null = null;
		let lastSection = '';

		const update = () => {
			frame = 0;
			const probeY = (header?.offsetHeight ?? 0) + 2;

			let theme = '';
			// Later blocks stack above the sticky hero, so the last match wins.
			for (const block of blocks) {
				const rect = block.getBoundingClientRect();
				if (rect.top <= probeY && rect.bottom > probeY) theme = block.dataset.headerTheme ?? '';
			}
			if (header && theme !== lastTheme) {
				lastTheme = theme;
				if (theme) header.dataset.theme = theme;
				else header.removeAttribute('data-theme');
			}

			const mid = window.innerHeight / 2;
			let active = '';
			// Scroll-spy: last section whose top has passed the viewport middle wins
			// (the pinned hero is always a candidate, so Home holds until one passes it).
			for (const section of sections) {
				if (section.getBoundingClientRect().top <= mid) active = section.dataset.navSection ?? '';
			}
			if (active !== lastSection) {
				lastSection = active;
				window.dispatchEvent(new CustomEvent(SECTION_EVENT, { detail: active }));
			}
		};

		const request = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', request, { passive: true });
		window.addEventListener('resize', request);

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add('is-revealed');
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
		);
		for (const target of document.querySelectorAll<HTMLElement>('[data-reveal]')) observer.observe(target);

		return () => {
			window.removeEventListener('scroll', request);
			window.removeEventListener('resize', request);
			if (frame) window.cancelAnimationFrame(frame);
			observer.disconnect();
		};
	}, []);

	return null;
}
