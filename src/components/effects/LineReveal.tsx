'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * Line-by-line mask reveal (batch D): teks dipecah per baris berdasarkan
 * offsetTop nyata (wrap otomatis browser) → tiap baris naik dari balik
 * mask, stagger 55ms. Initial render = teks biasa (aman utk SSR/screen
 * reader); split terjadi setelah mount, identik secara visual utk teks
 * yg sama. Resize → re-measure (debounced).
 */
export default function LineReveal({ text }: { text: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const [lines, setLines] = useState<string[] | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const measure = () => {
			// render kata2 mentah utk ukur posisi baris browser
			el.textContent = text;
			const words = text.split(/\s+/).filter(Boolean);
			el.innerHTML = words
				.map((w) => `<span data-w>${w.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] as string))}</span>`)
				.join(' ');
			const nodes = Array.from(el.querySelectorAll<HTMLElement>('[data-w]'));
			const rows: string[][] = [];
			let lastTop = -Infinity;
			for (const n of nodes) {
				const t = n.offsetTop;
				if (t !== lastTop) {
					rows.push([]);
					lastTop = t;
				}
				rows[rows.length - 1].push(n.textContent ?? '');
			}
			const joined = rows.map((r) => r.join(' '));
			// tak ada perubahan layout nyata → biarkan render asli
			if (joined.length > 1 || joined[0] !== text) setLines(joined);
			else setLines(null);
		};

		measure();
		let t = 0;
		const onResize = () => {
			window.clearTimeout(t);
			t = window.setTimeout(measure, 180);
		};
		window.addEventListener('resize', onResize, { passive: true });
		return () => {
			window.clearTimeout(t);
			window.removeEventListener('resize', onResize);
		};
	}, [text]);

	if (!lines) return <span ref={ref}>{text}</span>;

	return (
		<span ref={ref}>
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
