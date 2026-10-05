'use client';

import { useEffect } from 'react';

declare global {
	interface Window {
		ScrollCraft?: {
			mount: (root?: string | Element | Document, opts?: Record<string, unknown>) => unknown;
		};
	}
}

/** Boots the scrollcraft runtime once the SSR'd DOM is in place. */
export default function ScrollCraftMount() {
	useEffect(() => {
		if (!window.ScrollCraft) {
			console.warn('scrollcraft runtime failed to load');
			return;
		}
		window.ScrollCraft.mount();
	}, []);

	return null;
}
