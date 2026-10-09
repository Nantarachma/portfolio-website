'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/** Three.js is heavy: load it only on the client, after first paint. */
const HeroNetwork = dynamic(() => import('./HeroNetwork'), {
	ssr: false,
	loading: () => null,
});

/**
 * Tunda fetch + mount three.js sampai browser idle (requestIdleCallback,
 * fallback timeout). Module eval + shader compile pertama pindah dari
 * window hydration (long task) ke idle → TBT turun. Slot hero kosong dulu,
 * globe muncul belakangan — sama saja dgn dynamic-load biasa, hanya
 * lebih tertunda.
 */
export default function HeroNetworkLazy() {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const start = () => setReady(true);
		if (typeof window.requestIdleCallback === 'function') {
			window.requestIdleCallback(start, { timeout: 1500 });
		} else {
			const t = setTimeout(start, 1500);
			return () => clearTimeout(t);
		}
	}, []);

	if (!ready) return null;
	return <HeroNetwork />;
}
