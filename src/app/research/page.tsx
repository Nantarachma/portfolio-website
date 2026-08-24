import type { Metadata } from 'next';
import Link from 'next/link';
import { getPortfolioContent } from '@/lib/portfolio/repository';
import { getResearchProjects } from '@/lib/portfolio/selectors';
import type { PortfolioProject } from '@/lib/portfolio/schema';

export const metadata: Metadata = {
	title: 'Research',
	description:
		'Machine learning and computer vision research by Rachmananta Ibnu Fajar, including NIDS optimization and image classification work.',
};

const researchSlugs = new Set([
	'nids-optimization',
	'corn-leaf-disease-classification',
	'bone-fracture-detection',
]);

const categoryLabel = (category: string) => category.replaceAll('-', ' ');

export default async function ResearchPage() {
	const content = await getPortfolioContent();
	const researchProjects = getResearchProjects(content);
	const selectedResearch = researchProjects.filter((project) => researchSlugs.has(project.slug));
	const thesisProject = selectedResearch.find((project) => project.slug === 'nids-optimization');
	const computerVisionProjects = selectedResearch.filter((project) => project.slug !== 'nids-optimization');

	return (
		<>
			<header className='border-b border-slate-200'>
				<div className='site-container page-section pb-12 md:pb-16'>
					<p className='eyebrow'>Research</p>
					<h1 className='text-balance mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl'>
						Research &amp; Computer Vision
					</h1>
					<p className='mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg'>
						Machine learning and computer vision work focused on transparent technical approaches rather than unverified performance claims.
					</p>
				</div>
			</header>

			<div className='site-container page-section space-y-20 md:space-y-28'>
				<section aria-labelledby='thesis-heading'>
					<SectionIntro
						eyebrow='Undergraduate thesis'
						heading='Network intrusion detection optimization'
						id='thesis-heading'
						description='Thesis research on optimizing a Network Intrusion Detection System with model explainability.'
					/>
					{thesisProject ? <ResearchArticle project={thesisProject} featured /> : null}
				</section>

				<section aria-labelledby='computer-vision-heading'>
					<SectionIntro
						eyebrow='Image classification studies'
						heading='Computer vision'
						id='computer-vision-heading'
						description='Research projects involving hybrid visual features, deep learning, and image preprocessing.'
					/>
					<div className='mt-8 grid gap-6 lg:grid-cols-2'>
						{computerVisionProjects.map((project) => (
							<ResearchArticle key={project.slug} project={project} />
						))}
					</div>
				</section>

				<section aria-labelledby='research-navigation-heading' className='border-t border-slate-200 pt-12 md:pt-16'>
					<h2 id='research-navigation-heading' className='text-2xl font-bold tracking-tight text-slate-950'>
						Explore technical work
					</h2>
					<p className='mt-3 max-w-2xl leading-7 text-slate-600'>
						Project case studies describe verified context, contributions, technical approach, and available evidence.
					</p>
					<Link
						href='/projects'
						className='mt-6 inline-flex items-center rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800'>
						View all projects <span aria-hidden='true' className='ml-2'>&rarr;</span>
					</Link>
				</section>
			</div>
		</>
	);
}

function ResearchArticle({
	project,
	featured = false,
}: {
	project: PortfolioProject;
	featured?: boolean;
}) {
	const workflow = project.caseStudy?.workflow ?? project.visual?.steps;
	const methodology = project.caseStudy?.methodology;
	const evidence = project.caseStudy?.evidence;

	return (
		<article
			className={
				'surface mt-8 overflow-hidden rounded-xl ' +
				(featured ? 'lg:grid lg:grid-cols-[1.05fr_0.95fr]' : '')
			}>
			<div className='p-6 sm:p-8'>
				<div className='flex flex-wrap gap-2'>
					{project.categories.map((category) => (
						<span
							key={category}
							className='rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold capitalize text-blue-800'>
							{categoryLabel(category)}
						</span>
					))}
				</div>
				<h3 className='mt-5 text-2xl font-bold tracking-tight text-slate-950'>{project.title}</h3>
				{project.subtitle ? <p className='mt-2 font-medium text-slate-700'>{project.subtitle}</p> : null}
				<p className='mt-5 leading-7 text-slate-600'>{project.summary}</p>

				<dl className='mt-6 grid gap-4 border-t border-slate-200 pt-6 text-sm sm:grid-cols-2'>
					{project.role ? (
						<div>
							<dt className='font-bold uppercase tracking-[0.12em] text-slate-500'>Role</dt>
							<dd className='mt-1 font-medium leading-6 text-slate-800'>{project.role}</dd>
						</div>
					) : null}
					{project.context ? (
						<div>
							<dt className='font-bold uppercase tracking-[0.12em] text-slate-500'>Context</dt>
							<dd className='mt-1 font-medium leading-6 text-slate-800'>{project.context}</dd>
						</div>
					) : null}
				</dl>

				<div className='mt-6'>
					<h4 className='text-sm font-bold uppercase tracking-[0.12em] text-slate-500'>Technology</h4>
					<ul className='mt-3 flex flex-wrap gap-2'>
						{project.tech.map((technology) => (
							<li key={technology} className='rounded-md bg-slate-100 px-2.5 py-1.5 text-sm font-medium text-slate-700'>
								{technology}
							</li>
						))}
					</ul>
				</div>

				{methodology?.length ? (
					<div className='mt-6'>
						<h4 className='text-sm font-bold uppercase tracking-[0.12em] text-slate-500'>Technical approach</h4>
						<ul className='mt-3 space-y-2 text-sm leading-6 text-slate-600'>
							{methodology.map((method) => (
								<li key={method} className='flex gap-3'>
									<span aria-hidden='true' className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600' />
									<span>{method}</span>
								</li>
							))}
						</ul>
					</div>
				) : null}

				<div className='mt-7 flex flex-wrap items-center gap-4'>
					<Link
						href={'/projects/' + project.slug}
						className='inline-flex items-center font-semibold text-blue-700 transition-colors hover:text-blue-900'>
						View case study <span aria-hidden='true' className='ml-2'>&rarr;</span>
					</Link>
					{evidence?.map((item) =>
						item.href ? (
							<a
								key={item.href}
								href={item.href}
								target='_blank'
								rel='noreferrer'
								className='inline-flex items-center text-sm font-semibold text-slate-700 transition-colors hover:text-slate-950'>
								{item.label} <span aria-hidden='true' className='ml-2'>↗</span>
							</a>
						) : null,
					)}
				</div>
			</div>

			{workflow?.length ? (
				<div className='border-t border-slate-200 bg-slate-50 p-6 sm:p-8 lg:border-l lg:border-t-0'>
					<p className='text-xs font-bold uppercase tracking-[0.14em] text-slate-500'>Conceptual workflow</p>
					<ol className='mt-6 space-y-3' aria-label={project.title + ' conceptual workflow'}>
						{workflow.map((step, index) => (
							<li key={step} className='flex items-center gap-3'>
								<span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-bold text-slate-700'>
									{String(index + 1).padStart(2, '0')}
								</span>
								<span className='text-sm font-medium leading-6 text-slate-700'>{step}</span>
							</li>
						))}
					</ol>
				</div>
			) : null}
		</article>
	);
}

function SectionIntro({
	eyebrow,
	heading,
	id,
	description,
}: {
	eyebrow: string;
	heading: string;
	id: string;
	description: string;
}) {
	return (
		<div className='max-w-2xl'>
			<p className='eyebrow'>{eyebrow}</p>
			<h2 id={id} className='mt-3 text-3xl font-bold tracking-tight text-slate-950'>
				{heading}
			</h2>
			<p className='mt-3 leading-7 text-slate-600'>{description}</p>
		</div>
	);
}
