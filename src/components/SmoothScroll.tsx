'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

/**
 * Smooth scrolling with Lenis driven by the GSAP ticker (the canonical
 * gsap + lenis pairing). autoRaf:false — one rAF loop owns both, so Lenis
 * and gsap can never fight. The scrollcraft engine only reads scrollY /
 * scroll events, which Lenis keeps firing normally, so every scrubbed
 * cue keeps working untouched.
 *
 * ponytail: per-viewport lerp tuning and anchor scrollTo wiring skipped —
 * add when in-page anchor transitions feel too abrupt.
 */
export default function SmoothScroll() {
	useEffect(() => {
		const lenis = new Lenis({
			autoRaf: false,
			lerp: 0.12,
			smoothWheel: true,
			syncTouch: false,
			/* Project rule: every device gets the effects (BRIEF.md —
			   prefers-reduced-motion is ignored site-wide). Lenis defaults
			   this to true, which silently drops the easing to native
			   instant scrolling whenever the OS/Chrome reports reduce —
			   that is why the smooth scroll "had no effect". */
			respectReducedMotion: false,
		});

		const tick = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(tick);
			lenis.destroy();
		};
	}, []);

	return null;
}
