import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getPortfolioContent } from '@/lib/portfolio/repository';
import { getCategoryLabels, getProjectBySlug, getRelatedProjects } from '@/lib/portfolio/selectors';

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const content = await getPortfolioContent();
	const project = getProjectBySlug(content, slug);

	if (!project) {
		return { title: 'Project Not Found' };
	}

	return {
		title: project.shortTitle ?? project.title,
		description: project.summary,
	};
}

function ProjectWorkflow({ steps, label }: { steps?: readonly string[]; label?: string }) {
	if (!steps?.length) return null;

	return (
		<div className='surface card-pad'>
			<p className='font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-signal'>{label ?? 'Workflow'}</p>
			<ol className='mt-6 grid gap-3 sm:grid-cols-2'>
				{steps.map((step, index) => (
					<li key={step} className='flex items-center gap-3 border border-rule bg-plate px-3 py-3 text-sm text-ink'>
						<span className='flex size-6 shrink-0 items-center justify-center bg-signal text-xs font-bold text-void'>
							{index + 1}
						</span>
						{step}
					</li>
				))}
			</ol>
		</div>
	);
}

function DetailList({ title, items }: { title: string; items?: readonly string[] }) {
	if (!items?.length) return null;

	return (
		<section className='mt-10'>
			<h2 className='text-2xl font-bold tracking-tight text-ink'>{title}</h2>
			<ul className='mt-5 space-y-3 text-dim'>
				{items.map((item) => (
					<li key={item} className='flex gap-3 leading-7'>
						<span className='mt-2 size-1.5 shrink-0 bg-signal' aria-hidden='true' />
						<span>{item}</span>
					</li>
				))}
			</ul>
		</section>
	);
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
	const { slug } = await params;
	const content = await getPortfolioContent();
	const redirect = content.projectRedirects.find((item) => item.from === slug);
	if (redirect) permanentRedirect(`/projects/${redirect.to}`);

	const project = getProjectBySlug(content, slug);

	if (!project) notFound();

	const relatedProjects = getRelatedProjects(content, project.slug);
	const projectCategoryLabels = getCategoryLabels(content);
	const caseStudy = project.caseStudy;

	return (
		<div className='site-container page-section'>
			<Link href='/projects' className='touch-target inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:text-signal'>
				<span aria-hidden='true' className='mr-1.5'>&lt;-</span> All projects
			</Link>

			<header className='mt-8 max-w-4xl'>
				<div className='flex flex-wrap gap-2'>
					{project.categories.map((category) => (
						<span key={category} className='border border-rule bg-plate px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal'>
							{projectCategoryLabels[category]}
						</span>
					))}
				</div>
				<h1 className='page-title safe-wrap mt-5 text-balance text-ink'>
					{project.title}
				</h1>
				{project.subtitle && <p className='mt-4 text-xl font-medium text-dim'>{project.subtitle}</p>}
				<p className='lead-text mt-6 text-dim'>{project.summary}</p>
			</header>

			{/* auto-fit: columns follow the number of filled fields — a project
			    without e.g. Period never leaves an empty cell in a fixed 4-col grid. */}
			<section
				className='mt-10 grid gap-px overflow-hidden border border-rule bg-rule [grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))]'
				aria-label='Project details'>
				{[
					{ label: 'Role', value: project.role },
					{ label: 'Context', value: project.context },
					{ label: 'Period', value: project.period },
					{ label: 'Focus', value: project.categories.map((category) => projectCategoryLabels[category]).join(', ') },
				]
					.filter((detail): detail is { label: string; value: string } => Boolean(detail.value))
					.map((detail) => (
						<div key={detail.label} className='bg-void px-5 py-5'>
							<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-dim'>{detail.label}</p>
							<p className='mt-2 text-sm font-semibold leading-6 text-ink'>{detail.value}</p>
						</div>
					))}
			</section>

			<section className='surface card-pad mt-8'>
				<h2 className='text-lg font-bold text-ink'>Tech stack</h2>
				<div className='mt-4 flex flex-wrap gap-2'>
					{project.tech.map((technology) => (
						<span key={technology} className='border border-rule bg-plate px-3 py-1.5 font-mono text-xs font-semibold text-dim'>
							{technology}
						</span>
					))}
				</div>
			</section>

			<div className='content-split mt-12 grid lg:grid-cols-[minmax(0,0.82fr)_minmax(17rem,0.42fr)]'>
				<div>
					{caseStudy?.overview && (
						<section>
							<h2 className='text-2xl font-bold tracking-tight text-ink'>Overview</h2>
							<p className='mt-5 max-w-3xl leading-8 text-dim'>{caseStudy.overview}</p>
						</section>
					)}
					{caseStudy?.objective && (
						<section className='mt-10'>
							<h2 className='text-2xl font-bold tracking-tight text-ink'>Problem / objective</h2>
							<p className='mt-5 max-w-3xl leading-8 text-dim'>{caseStudy.objective}</p>
						</section>
					)}
					<DetailList title='Contribution' items={caseStudy?.contribution} />
					<DetailList title='Technical approach' items={caseStudy?.methodology} />
				</div>

				<aside>
					<ProjectWorkflow steps={caseStudy?.workflow ?? project.visual?.steps} label={project.visual?.label} />
					{caseStudy?.evidence?.length ? (
						<section className='surface mt-6 p-5'>
							<h2 className='text-base font-bold text-ink'>Evidence &amp; links</h2>
							<ul className='mt-4 space-y-3'>
								{caseStudy.evidence.map((evidence) => (
									<li key={evidence.label}>
										{evidence.href ? (
											<a href={evidence.href} target='_blank' rel='noreferrer' className='font-mono text-xs font-bold uppercase tracking-[0.1em] text-ink transition-colors duration-200 hover:text-signal'>
												{evidence.label} <span aria-hidden='true'>-&gt;</span>
											</a>
										) : (
											<p className='text-sm font-semibold text-dim'>{evidence.label}</p>
										)}
									</li>
								))}
							</ul>
						</section>
					) : null}
				</aside>
			</div>

			{relatedProjects.length > 0 && (
				<section className='mt-[var(--space-section-compact)] border-t border-rule pt-10' aria-labelledby='related-projects-heading'>
					<h2 id='related-projects-heading' className='text-2xl font-bold tracking-tight text-ink'>Related projects</h2>
					<div className='card-grid mt-6 grid md:grid-cols-2 lg:grid-cols-3'>
						{relatedProjects.map((related) => (
							<Link key={related.slug} href={`/projects/${related.slug}`} className='surface card-pad min-w-0'>
								<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-signal'>{related.categories.map((category) => projectCategoryLabels[category]).slice(0, 2).join(' / ')}</p>
								<h3 className='mt-3 safe-wrap font-bold text-ink'>{related.shortTitle ?? related.title}</h3>
								<p className='mt-3 line-clamp-3 text-sm leading-6 text-dim'>{related.summary}</p>
							</Link>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
