'use client';

import { useRouter } from 'next/navigation';
import { flushSync } from 'react-dom';
import { useEffect } from 'react';

/**
 * Motion graphic in-out antar halaman (rekomendasi lama: "page transition
 * fade"). Klik link internal di-intercept → document.startViewTransition:
 * frame lama fade-out, frame baru fade-in (View Transitions API, satu
 * animasi utk dua arah). Browser tanpa API → navigasi biasa (tanpa
 * transisi, tak rusak). Link hash (#work), download, target _blank,
 * klik bertenaga (ctrl/meta) → dibiarkan.
 */
export default function PageTransitions() {
	const router = useRouter();

	useEffect(() => {
		const supportsVT = typeof document.startViewTransition === 'function';

		const onClick = (e: MouseEvent) => {
			if (!supportsVT || e.defaultPrevented || e.button !== 0) return;
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
			const a = (e.target as HTMLElement | null)?.closest?.('a');
			if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
			const href = a.getAttribute('href');
			if (!href || !href.startsWith('/') || href.startsWith('//')) return;
			if (href === location.pathname + location.search) return; // route sama → flash percuma

			e.preventDefault();
			e.stopPropagation(); // React Link handler tak jalan — kita yg push
			document.startViewTransition(() => {
				flushSync(() => router.push(href));
			});
		};

		document.addEventListener('click', onClick, true);
		return () => document.removeEventListener('click', onClick, true);
	}, [router]);

	return null;
}
