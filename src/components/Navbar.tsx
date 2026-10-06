'use client';

import { useEffect, useState } from 'react';
import type { PortfolioProfile } from '@/lib/portfolio/schema';

const wib = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Asia/Jakarta',
	hour: '2-digit',
	minute: '2-digit',
	hour12: false,
});

/**
 * Filmic minimal bar: wordmark on the left, a live WIB clock on the right.
 * No menu, no CTA (grammar decisions, 2026-10) — the scrollcraft progress
 * hairline at the very top edge carries the "where am I" signal.
 */
export default function Navbar({ profile }: { profile: PortfolioProfile }) {
	const [time, setTime] = useState('');

	useEffect(() => {
		const tick = () => setTime(wib.format(new Date()));
		tick();
		const id = window.setInterval(tick, 30_000);
		return () => window.clearInterval(id);
	}, []);

	/* Publish the bar's real height so every clearance rule (pinned contact
	   stage, short-screen work intro) clears the actual bar on this device,
	   not the 3.25rem token guess (fonts can grow the line box).
	   NOTE: it MUST be a different variable than --site-header-height — that
	   token feeds .site-header__inner's min-height, so publishing the measured
	   size there creates a divergent feedback loop (bar grows, RO fires…). */
	useEffect(() => {
		const header = document.querySelector('.site-header');
		if (!header) return;
		const publish = () =>
			document.documentElement.style.setProperty(
				'--site-header-h',
				`${Math.ceil(header.getBoundingClientRect().height)}px`,
			);
		publish();
		const ro = new ResizeObserver(publish);
		ro.observe(header);
		return () => ro.disconnect();
	}, []);

	return (
		<header className='site-header'>
			<div className='site-container site-header__inner site-header__inner--minimal'>
				<a href='#top' className='site-brand' aria-label={`${profile.name} home`}>
					<span className='sm:hidden'>{profile.shortName}</span>
					<span className='hidden sm:inline'>{profile.name}</span>
				</a>
				<p className='font-mono text-[10px] font-semibold tabular-nums uppercase tracking-[0.14em] sm:text-xs'>
					{time ? `${time} WIB` : '--:-- WIB'}
				</p>
			</div>
		</header>
	);
}
