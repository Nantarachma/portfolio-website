import type { Metadata } from 'next';
import Link from 'next/link';
import { getPortfolioContent } from '@/lib/portfolio/repository';
import { getFeaturedCertifications, getResearchProjects } from '@/lib/portfolio/selectors';

export const metadata: Metadata = {
	title: 'About',
	description:
		'Experience, education, research, leadership, and selected certifications for Rachmananta Ibnu Fajar.',
};

const primaryResearchSlugs = new Set([
	'nids-optimization',
	'corn-leaf-disease-classification',
	'bone-fracture-detection',
]);

const categoryLabel = (category: string) => category.replaceAll('-', ' ');


export default async function AboutPage() {
	const content = await getPortfolioContent();
	const { profile, education, certifications, experience: experienceData, leadership: leadershipData } = content;
	const researchProjects = getResearchProjects(content);
	const selectedResearch = researchProjects.filter((project) => primaryResearchSlugs.has(project.slug));
	const selectedCertifications = getFeaturedCertifications(content);
	const additionalCertifications = certifications.filter(
		(certification) => !selectedCertifications.some((selected) => selected.title === certification.title),
	);

	return (
		<>
			<header className='site-container page-section border-b border-slate-200 pb-12 md:pb-16'>
				<p className='eyebrow'>About</p>
				<div className='mt-5 max-w-3xl'>
					<h1 className='text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl'>
						{profile.name}
					</h1>
					<p className='mt-4 text-lg font-medium text-slate-800'>{profile.role}</p>
					<p className='mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg'>
						{profile.intro}
					</p>
				</div>
			</header>

			<div className='site-container page-section space-y-20 md:space-y-28'>
				<section aria-labelledby='experience-heading'>
					<SectionIntro
						eyebrow='Technical experience'
						heading='Experience'
						id='experience-heading'
						description='Applied software engineering and native Android development experience.'
					/>
					<div className='mt-8 grid gap-5 lg:grid-cols-2'>
						{experienceData.map((experience) => (
							<article key={experience.organization + experience.role} className='surface rounded-xl p-6'>
								<header>
									<p className='text-sm font-semibold text-blue-700'>{experience.period}</p>
									<h3 className='mt-2 text-xl font-bold tracking-tight text-slate-950'>{experience.role}</h3>
									<p className='mt-1 font-medium text-slate-700'>{experience.organization}</p>
									{experience.location ? (
										<p className='mt-1 text-sm text-slate-500'>{experience.location}</p>
									) : null}
								</header>
								{experience.context ? (
									<p className='mt-5 leading-7 text-slate-600'>{experience.context}</p>
								) : null}
								<ul className='mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600'>
									{experience.contributions.map((contribution) => (
										<li key={contribution} className='flex gap-3'>
											<span aria-hidden='true' className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600' />
											<span>{contribution}</span>
										</li>
									))}
								</ul>
							</article>
						))}
					</div>
				</section>

				<section aria-labelledby='education-heading' className='border-y border-slate-200 py-12 md:py-16'>
					<div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-start'>
						<div>
							<SectionIntro eyebrow='Academic foundation' heading='Education' id='education-heading' />
							<h3 className='mt-7 text-xl font-bold text-slate-950'>{education.degree}</h3>
							<p className='mt-1 font-medium text-slate-700'>{education.institution}</p>
							<p className='mt-3 text-sm font-medium text-slate-500'>{education.period}</p>
						</div>
						<dl className='surface grid divide-y divide-slate-200 rounded-xl'>
							<div className='p-5'>
								<dt className='text-xs font-bold uppercase tracking-[0.14em] text-slate-500'>GPA</dt>
								<dd className='mt-2 text-xl font-bold text-slate-950'>{education.gpa}</dd>
							</div>
							<div className='p-5'>
								<dt className='text-xs font-bold uppercase tracking-[0.14em] text-slate-500'>Undergraduate thesis</dt>
								<dd className='mt-2 text-sm font-medium leading-6 text-slate-800'>{education.thesis}</dd>
							</div>
						</dl>
					</div>
				</section>

				<section aria-labelledby='research-heading'>
					<div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>
						<SectionIntro
							eyebrow='Machine learning and computer vision'
							heading='Research'
							id='research-heading'
							description='Selected research work in intrusion detection and image classification.'
						/>
						<Link
							href='/research'
							className='inline-flex w-fit items-center font-semibold text-blue-700 transition-colors hover:text-blue-900'>
							View research <span aria-hidden='true' className='ml-2'>&rarr;</span>
						</Link>
					</div>
					<div className='mt-8 grid gap-5 lg:grid-cols-3'>
						{selectedResearch.map((project) => (
							<article key={project.slug} className='surface flex flex-col rounded-xl p-6'>
								<div className='flex flex-wrap gap-2'>
									{project.categories.slice(0, 2).map((category) => (
										<span
											key={category}
											className='rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold capitalize text-blue-800'>
											{categoryLabel(category)}
										</span>
									))}
								</div>
								<h3 className='mt-5 text-xl font-bold tracking-tight text-slate-950'>{project.title}</h3>
								<p className='mt-3 leading-7 text-slate-600'>{project.summary}</p>
								{project.role ? <p className='mt-4 text-sm font-semibold text-slate-700'>{project.role}</p> : null}
								<Link
									href={'/projects/' + project.slug}
									className='mt-6 inline-flex items-center font-semibold text-blue-700 transition-colors hover:text-blue-900'>
									View case study <span aria-hidden='true' className='ml-2'>&rarr;</span>
								</Link>
							</article>
						))}
					</div>
				</section>

				<section aria-labelledby='leadership-heading'>
					<SectionIntro
						eyebrow='Organizational experience'
						heading='Leadership'
						id='leadership-heading'
						description='Leadership is presented separately from technical experience to keep each role in context.'
					/>
					<div className='mt-8 grid gap-5 lg:grid-cols-2'>
						{leadershipData.map((role) => (
							<article key={role.organization + role.role} className='surface rounded-xl p-6'>
								<p className='text-sm font-semibold text-blue-700'>{role.period}</p>
								<h3 className='mt-2 text-xl font-bold tracking-tight text-slate-950'>{role.role}</h3>
								<p className='mt-1 font-medium text-slate-700'>{role.organization}</p>
								<div className='mt-5 flex flex-wrap gap-2'>
									{role.focus.map((area) => (
										<span key={area} className='rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700'>
											{area}
										</span>
									))}
								</div>
							</article>
						))}
					</div>
				</section>

				<section aria-labelledby='certifications-heading' className='border-t border-slate-200 pt-12 md:pt-16'>
					<SectionIntro
						eyebrow='Continued learning'
						heading='Selected certifications'
						id='certifications-heading'
						description='Relevant Android, machine learning, cloud, backend, and programming credentials.'
					/>
					<ul className='mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{selectedCertifications.map((certification) => (
							<li key={certification.title} className='surface rounded-xl p-5'>
								<h3 className='font-bold leading-6 text-slate-950'>{certification.title}</h3>
								<p className='mt-2 text-sm text-slate-600'>
									{certification.issuer}
									{certification.issueDate ? (
										<>
											{' '}<span aria-hidden='true'>&middot;</span> {certification.issueDate}
										</>
									) : null}
								</p>
								{certification.url ? (
									<a
										href={certification.url}
										target='_blank'
										rel='noreferrer'
										className='mt-4 inline-flex items-center text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900'>
										View credential <span aria-hidden='true' className='ml-2'>↗</span>
									</a>
								) : null}
							</li>
						))}
					</ul>

					{additionalCertifications.length > 0 ? (
						<details className='surface mt-6 rounded-xl px-5 py-4'>
							<summary className='cursor-pointer font-semibold text-slate-800'>View additional certifications</summary>
							<ul className='mt-5 grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2'>
								{additionalCertifications.map((certification) => (
									<li key={certification.title} className='flex items-start justify-between gap-4 text-sm'>
										<div>
											<p className='font-semibold text-slate-800'>{certification.title}</p>
											<p className='mt-1 text-slate-500'>{certification.issuer}</p>
										</div>
										{certification.url ? (
											<a
												href={certification.url}
												target='_blank'
												rel='noreferrer'
												className='shrink-0 font-semibold text-blue-700 transition-colors hover:text-blue-900'>
												View
											</a>
										) : null}
									</li>
								))}
							</ul>
						</details>
					) : null}
				</section>
			</div>
		</>
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
	description?: string;
}) {
	return (
		<div className='max-w-2xl'>
			<p className='eyebrow'>{eyebrow}</p>
			<h2 id={id} className='mt-3 text-3xl font-bold tracking-tight text-slate-950'>
				{heading}
			</h2>
			{description ? <p className='mt-3 leading-7 text-slate-600'>{description}</p> : null}
		</div>
	);
}
