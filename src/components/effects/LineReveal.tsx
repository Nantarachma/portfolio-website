'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * Line-by-line mask reveal: teks dipecah per baris berdasarkan offsetTop
 * nyata (wrap otomatis browser) → tiap baris naik dari balik mask,
 * scrub oleh --p (stagger via --lstep dari LineReveal).
 *
 * Fase ukur = word-span REACT (bukan textContent/innerHTML liar) —
 * aman dari race reconciler (versi lama memutasi node milik React;
 * kandidat bug konten hilang saat re-render). Resize → kembali ke fase
 * kata lalu ukur ulang (debounced).
 */
export default function LineReveal({ text }: { text: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const [lines, setLines] = useState<string[] | null>(null);
	const [rev, setRev] = useState(0);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const measure = () => {
			// el berisi word-span hasil render React (data-w) → baca offsetTop
			const nodes = Array.from(el.querySelectorAll<HTMLElement>('[data-w]'));
			if (!nodes.length) return;
			const rows: string[][] = [];
			let lastTop = -Infinity;
			for (const n of nodes) {
				const t = n.offsetTop;
				if (t !== lastTop) {
					rows.push([]);
					lastTop = t;
				}
				rows[rows.length - 1].push(n.dataset.w ?? '');
			}
			const joined = rows.map((r) => r.join(' '));
			// 1 baris & teks identik → biarkan render kata (gaya biasa)
			if (joined.length <= 1 && joined[0] === text) setLines(null);
			else setLines(joined);
		};

		measure();
		let t = 0;
		const onResize = () => {
			window.clearTimeout(t);
			t = window.setTimeout(() => {
				// kembali ke fase kata dulu (rev → effect ulang → ukur ulang)
				setLines(null);
				setRev((r) => r + 1);
			}, 180);
		};
		window.addEventListener('resize', onResize, { passive: true });
		return () => {
			window.clearTimeout(t);
			window.removeEventListener('resize', onResize);
		};
	}, [text, rev]);

	const words = text.split(/\s+/).filter(Boolean);

	if (!lines) {
		// fase ukur: kata2 dirender React (textContent identik utk SR)
		return (
			<span ref={ref}>
				{words.map((w, i) => (
					<span key={i} data-w={w}>
						{w}
						{i < words.length - 1 ? ' ' : null}
					</span>
				))}
			</span>
		);
	}

	return (
		<span
			ref={ref}
			style={
				{
					'--lspan': ((lines.length - 1) * 0.055).toFixed(3),
					'--lwin': '0.6',
				} as CSSProperties
			}>
			{lines.map((line, i) => (
				<span key={i} className='line'>
					<span className='line__i' style={{ '--l': i } as CSSProperties}>
						{line}
					</span>
				</span>
			))}
		</span>
	);
}
