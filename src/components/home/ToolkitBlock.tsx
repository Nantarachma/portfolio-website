import type { PortfolioContent } from '@/lib/portfolio/schema';

type TechGroup = PortfolioContent['techGroups'][number];

export default function ToolkitBlock({ techGroups }: { techGroups: readonly TechGroup[] }) {
	return (
		<section
			id='toolkit'
			data-header-theme='dark'
			className='page-block block-overlap bg-[#14161a] text-[#eef1f6]'>
			<div className='site-container page-section'>
				<div className='flex flex-col justify-between gap-5 border-b border-white/15 pb-8 sm:flex-row sm:items-end'>
					<div className='max-w-2xl'>
						<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300'>
							Technical toolkit
						</p>
						<h2 className='section-title mt-4 text-balance font-bold text-white'>
							Grouped by practice area.
						</h2>
					</div>
					<p className='max-w-sm text-sm leading-6 text-slate-400'>
						The stack used across research pipelines, Android applications, and web products.
					</p>
				</div>

				<div className='mt-8 grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-3'>
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
