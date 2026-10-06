'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
	interface Window {
		ScrollCraft?: {
			mount: (root?: string | Element | Document, opts?: Record<string, unknown>) => unknown;
		};
	}
}

/**
 * Boots the scrollcraft runtime once the SSR'd DOM is in place — and again
 * after every route change: App Router swaps the page DOM without remounting
 * the layout, so the single boot left the NEW page's data-sc-in /
 * data-sc-cue elements unobserved (opacity 0 until a manual refresh).
 * ponytail: old instances keep an idle rAF loop over detached elements
 * (engine exposes no destroy); harmless — drop when upstream ships one.
 */
export default function ScrollCraftMount() {
	const pathname = usePathname();

	useEffect(() => {
		if (!window.ScrollCraft) {
			console.warn('scrollcraft runtime failed to load');
			return;
		}
		// One frame so React has committed the new route's DOM before we collect.
		const id = requestAnimationFrame(() => window.ScrollCraft!.mount());
		return () => cancelAnimationFrame(id);
	}, [pathname]);

	return null;
}
