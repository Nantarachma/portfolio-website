import type { CSSProperties } from 'react';

/**
 * Glitch-in heading (batch B): split teks per char di dlm word-wrapper
 * nowrap — tak pernah pecah kata. Tiap char masuk dgn RGB split merah/
 * putih singkat + skew, stagger 30ms (index global --i), sekali jalan
 * saat ancestor kena .sc-in. Heading wajib aria-label utk screen reader.
 */
export default function GlitchChars({ text }: { text: string }) {
	let i = 0;
	return (
		<span aria-hidden='true' className='glitch-in'>
			{text.split(' ').map((word, wi, arr) => [
				// word-wrapper = inline-block nowrap (tak pecah kata);
				// space text-node di LUAR wrapper → peluang line-break.
				<span key={wi} className='glitch-in__word'>
					{[...word].map((ch, ci) => (
						<span key={ci} className='glitch-in__ch' style={{ '--i': i++ } as CSSProperties}>
							{ch}
						</span>
					))}
				</span>,
				wi < arr.length - 1 ? ' ' : null,
			])}
		</span>
	);
}
