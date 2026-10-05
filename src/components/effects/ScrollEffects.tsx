'use client';

import { useEffect } from 'react';

export const SECTION_EVENT = 'portfolio:section';

/**
 * Bespoke page behaviours layered on the scrollcraft runtime: header theme
 * following the block underneath it, anchor scroll-spy, and the career-trail
 * signature driven by page progress (--sc-trail-p on [data-sc-trail]).
 */
export default function ScrollEffects() {
	useEffect(() => {
		const header = document.querySelector<HTMLElement>('.site-header');
		const blocks = Array.from(document.querySelectorAll<HTMLElement>('main > *:not(.trail)'));
		const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-section]'));
		const trail = document.querySelector<HTMLElement>('[data-sc-trail]');
		const nodes = trail ? Array.from(trail.querySelectorAll<HTMLElement>('[data-at]')) : [];
		let frame = 0;
		let lastTheme: string | null = null;
		let lastSection = '';
		let lastTrail = -1;

		const update = () => {
			frame = 0;
			const probeY = (header?.offsetHeight ?? 0) + 2;

			let theme = '';
			// Later blocks stack above the pinned hero, so the last match wins.
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
			// Scroll-spy: last section whose top has passed the viewport middle wins.
			for (const section of sections) {
				if (section.getBoundingClientRect().top <= mid) active = section.dataset.navSection ?? '';
			}
			if (active !== lastSection) {
				lastSection = active;
				window.dispatchEvent(new CustomEvent(SECTION_EVENT, { detail: active }));
			}

			// Signature: the career trail draws with page progress.
			const max = document.documentElement.scrollHeight - window.innerHeight;
			const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
			if (trail && Math.abs(p - lastTrail) > 0.001) {
				lastTrail = p;
				trail.style.setProperty('--sc-trail-p', p.toFixed(4));
				for (const node of nodes) {
					node.classList.toggle('is-passed', p + 0.015 >= Number(node.dataset.at));
				}
			}
		};

		const request = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', request, { passive: true });
		window.addEventListener('resize', request);

		return () => {
			window.removeEventListener('scroll', request);
			window.removeEventListener('resize', request);
			if (frame) window.cancelAnimationFrame(frame);
		};
	}, []);

	return null;
}
