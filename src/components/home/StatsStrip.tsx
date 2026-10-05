import type { CSSProperties } from 'react';

interface Stat {
	contentId: string;
	value: string;
	label: string;
}

export default function StatsStrip({ highlights }: { highlights: readonly Stat[] }) {
	return (
		<section className='page-block block-overlap border-b border-slate-200 bg-white' aria-label='Profile in numbers'>
			<div className='site-container py-[var(--space-section-compact)]'>
				<div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-slate-200 pb-5'>
					<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500'>
						In numbers
					</p>
					<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400'>
						Portfolio / 2026
					</p>
				</div>
				<div className='highlight-grid mt-6'>
					{highlights.map((item, index) => (
						<div
							key={item.contentId}
							className='highlight-item'
							data-reveal
							style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}>
							<p className='text-xl font-bold tracking-[-0.03em] text-slate-950 sm:text-2xl'>{item.value}</p>
							<p className='mt-1.5 text-sm leading-5 text-slate-600'>{item.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
