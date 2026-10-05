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
			className={`card-pad group border border-slate-200 bg-[#fbfbf7] transition-[border-color,box-shadow] duration-200 hover:border-blue-400 hover:shadow-[6px_6px_0_0_#dbeafe] ${
				featured ? 'lg:col-span-2' : ''
			}`}>
			<div className='flex flex-wrap gap-x-3 gap-y-1'>
				{project.categories.slice(0, 2).map((category) => (
					<span
						key={category}
						className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700'>
						{categoryLabels[category]}
					</span>
				))}
			</div>
			<div className={`mt-5 grid gap-6 ${featured ? 'lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start' : ''}`}>
				<div className='min-w-0'>
					<h3 className='safe-wrap text-xl font-bold tracking-[-0.035em] text-slate-950 sm:text-2xl'>
						{project.shortTitle ?? project.title}
					</h3>
					{project.context ? <p className='mt-2 text-sm font-semibold text-blue-700'>{project.context}</p> : null}
					<p className='mt-3 leading-7 text-slate-600'>{project.summary}</p>
					<Link
						href={`/projects/${project.slug}`}
						className='group/link mt-6 inline-flex items-center text-sm font-bold text-slate-950 transition-colors duration-200 hover:text-blue-700'>
						View case study <Arrow />
					</Link>
				</div>
				<div data-sc-parallax='0.12'>
					<ProjectVisual project={project} className='min-h-44' />
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
			className='page-block block-overlap border-b border-slate-200 bg-[#f2f5fa]'>
			<div className='site-container page-section'>
				<div className='border-b border-slate-200 pb-8' data-sc-in>
					<h2 className='section-title max-w-3xl font-bold text-slate-950'>Additional applied research.</h2>
					<p className='mt-4 max-w-[65ch] leading-7 text-slate-600'>
						Machine learning and computer vision work focused on transparent technical approaches rather than
						unverified performance claims.
					</p>
				</div>

				<div className='mt-8 grid gap-5 lg:grid-cols-2' data-sc-in data-sc-stagger='80'>
					{thesis ? <ResearchCard project={thesis} categoryLabels={categoryLabels} featured /> : null}
					{others.map((project) => (
						<ResearchCard key={project.slug} project={project} categoryLabels={categoryLabels} />
					))}
				</div>
			</div>
		</section>
	);
}
