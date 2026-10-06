import type { PortfolioContent } from '@/lib/portfolio/schema';

type TechGroup = PortfolioContent['techGroups'][number];

export default function ToolkitBlock({ techGroups }: { techGroups: readonly TechGroup[] }) {
	return (
		<section
			id='toolkit'
			data-header-theme='dark'
			data-sc-act='flow'
			data-sc-spotlight
			className='page-block block-overlap toolkit-surface bg-void text-ink'>
			<div className='site-container page-section'>
				<div className='border-b border-rule pb-4' data-sc-in>
					{/* Wrapper cue: block-level in/out (kinetic only staggers the
					    line units inside, parent stays at opacity 1). */}
					<div data-sc-cue='0.05 0.67 0.3 0.05'>
						<h2
							className='section-title max-w-3xl text-balance text-ink'
							data-sc-cue='0.05 0.67 0.3 0.05'
							data-sc-kinetic='lines'>
							Grouped by practice area.
						</h2>
					</div>
					<p className='mt-3 max-w-[65ch] text-sm leading-6 text-dim'>
						The stack used across research pipelines, Android applications, and web products.
					</p>
				</div>

				<div className='mt-4 grid border-l border-t border-rule md:grid-cols-2 lg:grid-cols-3' data-sc-in data-sc-stagger='60'>
					{techGroups.map((group, index) => (
						<article
							key={group.contentId}
							className={`card-pad border-b border-r border-rule bg-plate transition-colors duration-200 hover:bg-raised ${
								index === techGroups.length - 1 ? 'md:col-span-2 lg:col-span-3' : ''
							}`}>
							<h3 className='font-mono text-sm font-bold uppercase tracking-[0.08em] text-ink'>{group.name}</h3>
							<ul className='mt-2 flex flex-wrap gap-1.5' aria-label={`${group.name} skills`}>
								{group.items.map((item) => (
									<li
										key={item}
										className='border border-rule bg-void px-2 py-0.5 font-mono text-[10px] font-semibold leading-4 tracking-[0.02em] text-dim'>
										{item}
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
