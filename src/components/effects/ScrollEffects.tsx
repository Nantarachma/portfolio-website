'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Bespoke page behaviour layered on the scrollcraft runtime: the header
 * theme follows whichever main block sits under the header line. One
 * IntersectionObserver strip observer; no scroll listeners, no rAF, no
 * React state per frame. (The scroll-spy died with the minimal filmic nav.)
 */
export default function ScrollEffects() {
	// Rebuild on route change: App Router swaps `main`'s children without
	// remounting this layout component, so a mount-once observer would keep
	// watching detached blocks and the header theme went stale after
	// client-side navigation.
	const pathname = usePathname();

	useEffect(() => {
		const header = document.querySelector<HTMLElement>('.site-header');
		const blocks = Array.from(document.querySelectorAll<HTMLElement>('main > *'));
		let themeObserver: IntersectionObserver | undefined;
		let lastTheme = '';

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

		buildThemeObserver();

		let resizeTimer = 0;
		const onResize = () => {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(buildThemeObserver, 150);
		};
		window.addEventListener('resize', onResize, { passive: true });

		// Header height changes move the theme strip: rebuild so data-theme
		// is never dropped after a layout shift.
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
			headerObserver?.disconnect();
			window.clearTimeout(resizeTimer);
			window.clearTimeout(headerTimer);
			window.removeEventListener('resize', onResize);
		};
	}, [pathname]);

	return null;
}
