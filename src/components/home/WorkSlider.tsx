import Link from 'next/link';
import HorizontalScroller from './HorizontalScroller';
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

export default function WorkSlider({ projects, categoryLabels }: WorkSliderProps) {
	return (
		<section
			id='work'
			data-nav-section='work'
			className='page-block block-overlap border-b border-slate-200 bg-[#fbfbf7]'>
			<div className='site-container page-section'>
				<div className='grid gap-6 border-b border-slate-200 pb-9 md:grid-cols-12 md:items-end'>
					<div className='md:col-span-7'>
						<p className='eyebrow'>Selected work</p>
						<h2 className='section-title mt-4 max-w-3xl text-balance font-bold text-slate-950'>
							Case studies shaped by method, implementation, and evidence.
						</h2>
					</div>
					<div className='md:col-span-4 md:col-start-9 md:border-l md:border-slate-200 md:pl-6'>
						<p className='leading-7 text-slate-600'>
							Machine learning research, product delivery, and an ML-integrated Android capstone.
						</p>
						<Link
							href='/projects'
							className='group mt-4 inline-flex items-center text-sm font-bold text-slate-950 transition-colors duration-200 hover:text-blue-700'>
							View all projects <Arrow />
						</Link>
					</div>
				</div>

				<div className='mt-8 -mx-0'>
					<HorizontalScroller label='Selected work slider'>
						{projects.map((project, index) => (
							<article
								key={project.slug}
								className='case-card surface flex flex-col bg-white p-5 [--reveal-delay:60ms]'
								data-reveal>
								<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>
									Case / {String(index + 1).padStart(2, '0')}
								</p>
								<div className='mt-4 flex flex-wrap gap-x-3 gap-y-1'>
									{project.categories.slice(0, 3).map((category) => (
										<span
											key={category}
											className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700'>
											{categoryLabels[category]}
										</span>
									))}
								</div>
								<h3 className='safe-wrap mt-3 text-xl font-bold tracking-[-0.035em] text-slate-950'>
									{project.shortTitle ?? project.title}
								</h3>
								{project.subtitle ? <p className='mt-1.5 text-sm font-semibold text-blue-700'>{project.subtitle}</p> : null}
								<div className='mt-4'>
									<ProjectVisual project={project} className='min-h-40' />
								</div>
								<p className='mt-4 line-clamp-3 leading-6 text-slate-600'>{project.summary}</p>
								<ul className='mt-4 flex flex-wrap gap-1.5' aria-label='Technologies used'>
									{project.tech.slice(0, 4).map((item) => (
										<li
											key={item}
											className='border border-slate-200 bg-[#fbfbf7] px-2 py-0.5 text-[10px] font-semibold text-slate-700'>
											{item}
										</li>
									))}
								</ul>
								<div className='mt-auto pt-5'>
									<Link
										href={`/projects/${project.slug}`}
										className='group inline-flex items-center text-sm font-bold text-slate-950 transition-colors duration-200 hover:text-blue-700'>
										View case study <Arrow />
									</Link>
								</div>
							</article>
						))}
					</HorizontalScroller>
				</div>
			</div>
		</section>
	);
}
