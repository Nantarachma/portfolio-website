'use client';

import dynamic from 'next/dynamic';

/** Three.js is heavy: load it only on the client, after first paint. */
const HeroNetwork = dynamic(() => import('./HeroNetwork'), {
	ssr: false,
	loading: () => null,
});

export default function HeroNetworkLazy() {
	return <HeroNetwork />;
}
