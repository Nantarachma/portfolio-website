import GlitchChars from '@/components/effects/GlitchChars';
import Link from 'next/link';
import ProjectVisual from '@/components/projects/ProjectVisual';
import type { PortfolioProject, PortfolioProjectCategory } from '@/lib/portfolio/schema';

interface WorkSliderProps {
	projects: readonly PortfolioProject[];
	categoryLabels: Record<PortfolioProjectCategory, string>;
}

function Arrow() {
	return (
		<span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>
			&rarr;
		</span>
	);
}

/**
 * THE PEAK: chaptered "Selected work" as a pan act. Vertical scroll sweeps the
 * rack sideways; cards tilt toward the pointer (engine gates to hover/fine).
 */
export default function WorkSlider({ projects, categoryLabels }: WorkSliderProps) {
	return (
		<section
			id='work'
			data-nav-section='work'
			data-sc-act='pan'
			data-sc-span='3.5'
			className='page-block block-overlap border-b-[3px] border-b-ink bg-void'>
			<div className='sc-stage' data-sc-stage>
				<div className='site-container relative flex h-full flex-col justify-center py-8 [@media(max-height:760px)]:justify-start [@media(max-height:760px)]:pt-[calc(var(--site-header-h,3.25rem)+1.5rem)] [@media(max-height:760px)]:pb-4'>
					{/* Onomatopoeia pop saat section masuk */}
					<span className='action-word right-0 top-0 hidden md:block' data-sc-in aria-hidden='true'>
						WHOOSH!
					</span>
					<header className='border-b border-rule pb-5'>
						<p className='eyebrow' data-sc-in>Selected work</p>
						{/* Time-driven entrance only (user call): a plain one-shot
						    reveal with a fixed duration, no scroll scrubbing and no
						    kinetic line assembly on this headline. */}
						<h2
							className='section-title mt-3 max-w-3xl text-balance text-ink'
							data-sc-in
							aria-label='Case studies shaped by method, implementation, and evidence.'>
							<GlitchChars text='Case studies shaped by method, implementation, and evidence.' />
						</h2>
						<p
							className='caption-box mt-3 max-w-[65ch] text-sm leading-6 [@media(max-height:760px)]:hidden'
							data-sc-in>
							Machine learning research, product delivery, and an ML-integrated Android capstone.
						</p>
						<Link
							href='/projects'
							data-sc-in
							className='group mt-3 inline-flex items-center text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:text-flare'>
							View all projects <Arrow />
						</Link>
					</header>

					<div className='rack mt-5' data-sc-pan='0.04'>
						{projects.map((project, i) => (
							<article
								key={project.slug}
								data-sc-tilt='6'
								className='case-card surface flex flex-col border-[3px] border-ink bg-plate p-4'
								style={{ boxShadow: `5px 5px 0 0 var(--shadow-plate-${i % 3})` }}>
								<div className='flex flex-wrap gap-x-3 gap-y-1'>
									{project.categories.slice(0, 3).map((category) => (
										<span
											key={category}
											className='text-[10px] font-semibold uppercase tracking-[0.16em] text-flare'>
											{categoryLabels[category]}
										</span>
									))}
								</div>
								<h3 className='safe-wrap mt-2.5 text-lg font-bold tracking-[-0.03em] text-ink'>
									{project.shortTitle ?? project.title}
								</h3>
								{project.subtitle ? (
									<p className='mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-flare'>
										{project.subtitle}
									</p>
								) : null}
								<div className='mt-3 [@media(max-height:760px)]:hidden'>
									<ProjectVisual project={project} className='min-h-24 sm:min-h-28' />
								</div>
								<p className='mt-3 line-clamp-3 text-sm leading-6 text-dim [@media(max-height:760px)]:line-clamp-2'>{project.summary}</p>
								{/* One bottom group: chips + CTA stick together at the
								    card foot, so tall/short copy never leaves an orphaned
								    void between them. */}
								<div className='mt-auto pt-4'>
									<ul
										className='flex flex-wrap gap-1.5 [@media(max-height:760px)]:hidden'
										aria-label='Technologies used'>
										{project.tech.slice(0, 4).map((item) => (
											<li
												key={item}
												className='border border-rule bg-void px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-ink/85'>
												{item}
											</li>
										))}
									</ul>
									<Link
										href={`/projects/${project.slug}`}
										className='group mt-3 inline-flex items-center text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:text-flare'>
										View case study <Arrow />
									</Link>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
