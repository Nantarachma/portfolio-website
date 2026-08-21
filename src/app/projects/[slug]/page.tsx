import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
	getProjectBySlug,
	getRelatedProjects,
	projectCategoryLabels,
	projectSlugs,
} from '@/data/projects';

type PageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return projectSlugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

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
		<div className='rounded-xl border border-slate-800 bg-slate-950 p-5 sm:p-7'>
			<p className='text-xs font-semibold uppercase tracking-[0.14em] text-blue-300'>{label ?? 'Workflow'}</p>
			<ol className='mt-6 grid gap-3 sm:grid-cols-2'>
				{steps.map((step, index) => (
					<li key={step} className='flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-3 text-sm text-slate-200'>
						<span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-200'>
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
			<h2 className='text-2xl font-bold tracking-tight text-slate-950'>{title}</h2>
			<ul className='mt-5 space-y-3 text-slate-600'>
				{items.map((item) => (
					<li key={item} className='flex gap-3 leading-7'>
						<span className='mt-2 size-1.5 shrink-0 rounded-full bg-blue-600' aria-hidden='true' />
						<span>{item}</span>
					</li>
				))}
			</ul>
		</section>
	);
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) notFound();

	const relatedProjects = getRelatedProjects(project.slug);
	const caseStudy = project.caseStudy;

	return (
		<div className='site-container page-section'>
			<Link href='/projects' className='inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800'>
				<span aria-hidden='true' className='mr-1.5'>&lt;-</span> All projects
			</Link>

			<header className='mt-8 max-w-4xl'>
				<div className='flex flex-wrap gap-2'>
					{project.categories.map((category) => (
						<span key={category} className='rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800'>
							{projectCategoryLabels[category]}
						</span>
					))}
				</div>
				<h1 className='mt-5 text-balance text-4xl font-bold tracking-[-0.035em] text-slate-950 sm:text-5xl'>
					{project.title}
				</h1>
				{project.subtitle && <p className='mt-4 text-xl font-medium text-slate-600'>{project.subtitle}</p>}
				<p className='mt-6 max-w-3xl text-lg leading-8 text-slate-600'>{project.summary}</p>
			</header>

			<section className='mt-12 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4' aria-label='Project details'>
				{[
					{ label: 'Role', value: project.role },
					{ label: 'Context', value: project.context },
					{ label: 'Period', value: project.period },
					{ label: 'Focus', value: project.categories.map((category) => projectCategoryLabels[category]).join(', ') },
				]
					.filter((detail): detail is { label: string; value: string } => Boolean(detail.value))
					.map((detail) => (
						<div key={detail.label} className='bg-white px-5 py-5'>
							<p className='text-xs font-semibold uppercase tracking-[0.1em] text-slate-500'>{detail.label}</p>
							<p className='mt-2 text-sm font-semibold leading-6 text-slate-900'>{detail.value}</p>
						</div>
					))}
			</section>

			<section className='mt-8 rounded-xl border border-slate-200 bg-white p-6 sm:p-8'>
				<h2 className='text-lg font-bold text-slate-950'>Tech stack</h2>
				<div className='mt-4 flex flex-wrap gap-2'>
					{project.tech.map((technology) => (
						<span key={technology} className='rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700'>
							{technology}
						</span>
					))}
				</div>
			</section>

			<div className='mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(17rem,0.42fr)]'>
				<div>
					{caseStudy?.overview && (
						<section>
							<h2 className='text-2xl font-bold tracking-tight text-slate-950'>Overview</h2>
							<p className='mt-5 max-w-3xl leading-8 text-slate-600'>{caseStudy.overview}</p>
						</section>
					)}
					{caseStudy?.objective && (
						<section className='mt-10'>
							<h2 className='text-2xl font-bold tracking-tight text-slate-950'>Problem / objective</h2>
							<p className='mt-5 max-w-3xl leading-8 text-slate-600'>{caseStudy.objective}</p>
						</section>
					)}
					<DetailList title='Contribution' items={caseStudy?.contribution} />
					<DetailList title='Technical approach' items={caseStudy?.methodology} />
				</div>

				<aside>
					<ProjectWorkflow steps={caseStudy?.workflow ?? project.visual?.steps} label={project.visual?.label} />
					{caseStudy?.evidence?.length ? (
						<section className='mt-6 rounded-xl border border-slate-200 bg-white p-5'>
							<h2 className='text-base font-bold text-slate-950'>Evidence &amp; links</h2>
							<ul className='mt-4 space-y-3'>
								{caseStudy.evidence.map((evidence) => (
									<li key={evidence.label}>
										{evidence.href ? (
											<a href={evidence.href} target='_blank' rel='noreferrer' className='text-sm font-semibold text-blue-700 hover:text-blue-800'>
												{evidence.label} <span aria-hidden='true'>-&gt;</span>
											</a>
										) : (
											<p className='text-sm font-semibold text-slate-700'>{evidence.label}</p>
										)}
									</li>
								))}
							</ul>
						</section>
					) : null}
				</aside>
			</div>

			{relatedProjects.length > 0 && (
				<section className='mt-20 border-t border-slate-200 pt-10' aria-labelledby='related-projects-heading'>
					<h2 id='related-projects-heading' className='text-2xl font-bold tracking-tight text-slate-950'>Related projects</h2>
					<div className='mt-6 grid gap-4 md:grid-cols-3'>
						{relatedProjects.map((related) => (
							<Link key={related.slug} href={`/projects/${related.slug}`} className='surface rounded-xl p-5 transition-[border-color,box-shadow] hover:border-blue-300 hover:shadow-sm'>
								<p className='text-xs font-semibold uppercase tracking-[0.09em] text-blue-700'>{related.categories.map((category) => projectCategoryLabels[category]).slice(0, 2).join(' / ')}</p>
								<h3 className='mt-3 font-bold text-slate-950'>{related.shortTitle ?? related.title}</h3>
								<p className='mt-3 line-clamp-3 text-sm leading-6 text-slate-600'>{related.summary}</p>
							</Link>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
