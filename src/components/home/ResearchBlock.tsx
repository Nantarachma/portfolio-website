import Link from 'next/link';
import ProjectVisual from '@/components/projects/ProjectVisual';
import type { PortfolioProject, PortfolioProjectCategory } from '@/lib/portfolio/schema';

interface ResearchBlockProps {
	projects: readonly PortfolioProject[];
	thesis: PortfolioProject | undefined;
	categoryLabels: Record<PortfolioProjectCategory, string>;
}

function Arrow() {
	return (
		<span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>
			&rarr;
		</span>
	);
}

function ResearchCard({
	project,
	categoryLabels,
	featured = false,
}: {
	project: PortfolioProject;
	categoryLabels: Record<PortfolioProjectCategory, string>;
	featured?: boolean;
}) {
	return (
		<article
			className={`card-pad group border-[3px] border-ink bg-void shadow-[5px_5px_0_0_var(--shadow-plate-0)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--shadow-plate-1)] ${
				featured ? 'lg:col-span-2' : ''
			}`}>
			<div className='flex flex-wrap gap-x-3 gap-y-1'>
				{project.categories.slice(0, 2).map((category) => (
					<span
						key={category}
						className='text-[10px] font-semibold uppercase tracking-[0.16em] text-flare'>
						{categoryLabels[category]}
					</span>
				))}
			</div>
			<div className='mt-2.5 grid gap-2 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start'>
				<div className='min-w-0'>
					<h3 className='safe-wrap text-lg font-bold tracking-[-0.03em] text-ink sm:text-xl'>
						{project.shortTitle ?? project.title}
					</h3>
					{project.context ? (
						<p className='mt-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-flare'>
							{project.context}
						</p>
					) : null}
					<p className='mt-2.5 text-sm leading-6 text-dim'>{project.summary}</p>
					<Link
						href={`/projects/${project.slug}`}
						className='group/link mt-4 inline-flex items-center text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:text-flare'>
						View case study <Arrow />
					</Link>
				</div>
				<div data-sc-parallax='0.12'>
					<ProjectVisual project={project} className='min-h-32' />
				</div>
			</div>
		</article>
	);
}

/** Chapter: research. Visuals drift slower than their text (parallax layer). */
export default function ResearchBlock({ projects, thesis, categoryLabels }: ResearchBlockProps) {
	const others = projects.filter((project) => project.slug !== thesis?.slug);

	return (
		<section
			id='research'
			data-nav-section='research'
			data-sc-act='flow'
			className='page-block block-overlap border-b-[3px] border-b-ink bg-plate'>
			<div className='site-container page-section'>
				<div className='border-b border-rule pb-4' data-sc-cue='0.05 0.51 0.25 0.2'>
					<h2 className='section-title max-w-3xl text-ink'>Additional applied research.</h2>
					<p className='caption-box mt-3 max-w-[65ch] text-sm leading-6'>
						Machine learning and computer vision work focused on transparent technical approaches rather than
						unverified performance claims.
					</p>
				</div>

				<div className='mt-4 grid gap-3 lg:grid-cols-2' data-sc-in data-sc-stagger='80'>
					{thesis ? <ResearchCard project={thesis} categoryLabels={categoryLabels} featured /> : null}
					{others.map((project) => (
						<ResearchCard key={project.slug} project={project} categoryLabels={categoryLabels} />
					))}
				</div>
			</div>
		</section>
	);
}
