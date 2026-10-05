'use client';

import { useEffect } from 'react';

export const SECTION_EVENT = 'portfolio:section';

/**
 * Bespoke page behaviours layered on the scrollcraft runtime: header theme
 * following the block under the header line, and anchor scroll-spy for the
 * nav. Both are IntersectionObserver strip observers; no scroll listeners,
 * no requestAnimationFrame, no React state per frame. The career-trail
 * signature is pure CSS (see .trail in globals.css).
 */
export default function ScrollEffects() {
	useEffect(() => {
		const header = document.querySelector<HTMLElement>('.site-header');
		const blocks = Array.from(document.querySelectorAll<HTMLElement>('main > *:not(.trail)'));
		const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-section]'));
		let themeObserver: IntersectionObserver | undefined;
		let spyObserver: IntersectionObserver | undefined;
		let lastTheme = '';
		let lastSection = '';

		// Header theme: watch a 1px strip pinned to the header's bottom edge.
		const buildThemeObserver = () => {
			themeObserver?.disconnect();
			const height = header?.offsetHeight ?? 0;
			const seen = new Set<HTMLElement>();
			themeObserver = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) seen.add(entry.target as HTMLElement);
						else seen.delete(entry.target as HTMLElement);
					}
					let theme = '';
					for (const block of blocks) if (seen.has(block)) theme = block.dataset.headerTheme ?? '';
					if (header && theme !== lastTheme) {
						lastTheme = theme;
						if (theme) header.dataset.theme = theme;
						else header.removeAttribute('data-theme');
					}
				},
				{ rootMargin: `-${height}px 0px -${Math.max(0, window.innerHeight - height - 1)}px 0px` },
			);
			for (const block of blocks) themeObserver.observe(block);
		};

		// Scroll-spy: watch a 1px strip across the viewport middle.
		const buildSpyObserver = () => {
			spyObserver?.disconnect();
			const seen = new Set<HTMLElement>();
			spyObserver = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) seen.add(entry.target as HTMLElement);
						else seen.delete(entry.target as HTMLElement);
					}
					let active = '';
					for (const section of sections) if (seen.has(section)) active = section.dataset.navSection ?? '';
					if (active && active !== lastSection) {
						lastSection = active;
						window.dispatchEvent(new CustomEvent(SECTION_EVENT, { detail: active }));
					}
				},
				{ rootMargin: '-50% 0px -50% 0px' },
			);
			for (const section of sections) spyObserver.observe(section);
		};

		buildThemeObserver();
		buildSpyObserver();

		let resizeTimer = 0;
		const onResize = () => {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(() => {
				buildThemeObserver();
				buildSpyObserver();
			}, 150);
		};
		window.addEventListener('resize', onResize, { passive: true });

		// Header height changes (mobile menu opens/closes) move the theme strip:
		// rebuild so data-theme isn't dropped while the menu is open.
		let headerTimer = 0;
		const headerObserver = header
			? new ResizeObserver(() => {
					window.clearTimeout(headerTimer);
					headerTimer = window.setTimeout(buildThemeObserver, 60);
				})
			: undefined;
		headerObserver?.observe(header as Element);

		return () => {
			themeObserver?.disconnect();
			spyObserver?.disconnect();
			headerObserver?.disconnect();
			window.clearTimeout(resizeTimer);
			window.clearTimeout(headerTimer);
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return null;
}
