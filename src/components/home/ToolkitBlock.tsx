import type { PortfolioContent } from '@/lib/portfolio/schema';

type TechGroup = PortfolioContent['techGroups'][number];

export default function ToolkitBlock({ techGroups }: { techGroups: readonly TechGroup[] }) {
	return (
		<section
			id='toolkit'
			data-header-theme='dark'
			data-sc-spotlight
			className='page-block block-overlap toolkit-surface bg-[#14161a] text-[#eef1f6]'>
			<div className='site-container page-section'>
				<div className='border-b border-white/15 pb-8' data-sc-in>
					<h2 className='section-title max-w-3xl text-balance font-bold text-white'>
						Grouped by practice area.
					</h2>
					<p className='mt-4 max-w-[65ch] leading-7 text-slate-400'>
						The stack used across research pipelines, Android applications, and web products.
					</p>
				</div>

				<div className='mt-8 grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-3' data-sc-in data-sc-stagger='60'>
					{techGroups.map((group, index) => (
						<article
							key={group.contentId}
							className={`card-pad border-b border-r border-white/15 bg-white/[0.04] transition-colors duration-200 hover:bg-white/[0.07] ${
								index === techGroups.length - 1 ? 'md:col-span-2 lg:col-span-3' : ''
							}`}>
							<h3 className='font-bold text-white'>{group.name}</h3>
							<ul className='mt-4 flex flex-wrap gap-2' aria-label={`${group.name} skills`}>
								{group.items.map((item) => (
									<li
										key={item}
										className='border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] text-slate-300'>
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
