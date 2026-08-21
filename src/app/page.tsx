import Image from 'next/image';
import Link from 'next/link';
import { credibilityHighlights, profile } from '@/data/profile';
import { experienceData, techGroups } from '@/data/experience';
import {
	featuredProjects,
	projectCategoryLabels,
	researchProjects,
	type Project,
} from '@/data/projects';

function TechPills({ items }: { items: readonly string[] }) {
	return (
		<div className='mt-4 flex flex-wrap gap-2'>
			{items.map((item) => (
				<span key={item} className='rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700'>
					{item}
				</span>
			))}
		</div>
	);
}

function ConceptualVisual({ project }: { project: Project }) {
	const steps = project.visual?.steps ?? [project.visual?.label ?? 'Project workflow'];

	return (
		<div className='relative overflow-hidden rounded-xl border border-slate-200 bg-slate-950 p-5 text-slate-100 sm:p-7'>
			<div className='absolute right-0 top-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full border border-blue-400/20' />
			<div className='absolute bottom-0 left-0 h-24 w-24 -translate-x-1/3 translate-y-1/3 rounded-full border border-indigo-300/15' />
			<p className='relative text-xs font-semibold uppercase tracking-[0.16em] text-blue-300'>
				{project.visual?.label ?? 'Technical workflow'}
			</p>
			<div className='relative mt-6 flex flex-wrap items-center gap-2'>
				{steps.map((step, index) => (
					<div key={step} className='flex items-center gap-2'>
						<span className='rounded-md border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-200'>
							{step}
						</span>
						{index < steps.length - 1 && <span className='text-blue-300' aria-hidden='true'>-&gt;</span>}
					</div>
				))}
			</div>
			<div className='relative mt-8 grid grid-cols-6 gap-1.5' aria-hidden='true'>
				{Array.from({ length: 18 }, (_, index) => (
					<span
						key={index}
						className={`h-1.5 rounded-full ${index % 5 === 0 ? 'bg-blue-400' : index % 3 === 0 ? 'bg-indigo-400/70' : 'bg-slate-700'}`}
					/>
				))}
			</div>
		</div>
	);
}

function FeaturedWork({ project, index }: { project: Project; index: number }) {
	const categories = project.categories.slice(0, 3);
	const content = (
		<div className='flex flex-col justify-center'>
			<p className='text-sm font-semibold text-blue-700'>0{index + 1}</p>
			<div className='mt-3 flex flex-wrap gap-2'>
				{categories.map((category) => (
					<span key={category} className='text-xs font-semibold uppercase tracking-[0.09em] text-slate-500'>
						{projectCategoryLabels[category]}
					</span>
				))}
			</div>
			<h3 className='mt-4 text-balance text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl'>
				{project.shortTitle ?? project.title}
			</h3>
			{project.subtitle && <p className='mt-2 text-base font-medium text-slate-600'>{project.subtitle}</p>}
			<p className='mt-5 max-w-xl leading-7 text-slate-600'>{project.summary}</p>
			<div className='mt-5 space-y-1 text-sm text-slate-600'>
				{project.role && <p><span className='font-semibold text-slate-800'>Role:</span> {project.role}</p>}
				{project.context && <p>{project.context}</p>}
			</div>
			<TechPills items={project.tech} />
			<div className='mt-7 flex flex-wrap gap-4'>
				<Link href={`/projects/${project.slug}`} className='inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800'>
					View Case Study <span className='ml-1.5' aria-hidden='true'>-&gt;</span>
				</Link>
				{project.githubUrl && (
					<a
						href={project.githubUrl}
						target='_blank'
						rel='noreferrer'
						className='inline-flex items-center text-sm font-semibold text-slate-700 hover:text-slate-950'>
						View Repository <span className='ml-1.5' aria-hidden='true'>-&gt;</span>
					</a>
				)}
			</div>
		</div>
	);

	return (
		<article className='grid gap-8 border-t border-slate-200 py-10 first:border-t-0 first:pt-0 md:grid-cols-2 md:gap-12 md:py-14'>
			<div className={index % 2 === 0 ? '' : 'md:order-2'}>{content}</div>
			<div className={index % 2 === 0 ? '' : 'md:order-1'}>
				<ConceptualVisual project={project} />
			</div>
		</article>
	);
}

export default function HomePage() {
	return (
		<>
			<section className='site-container py-14 sm:py-20 lg:py-24'>
				<div className='grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.7fr)] lg:gap-20'>
					<div>
						<p className='eyebrow'>{profile.eyebrow}</p>
						<h1 className='mt-5 max-w-3xl text-balance text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl'>
							{profile.name}
						</h1>
						<p className='mt-4 text-xl font-semibold tracking-tight text-blue-700 sm:text-2xl'>{profile.role}</p>
						<p className='mt-6 max-w-2xl text-lg leading-8 text-slate-600'>{profile.intro}</p>
						<div className='mt-8 flex flex-wrap gap-3'>
							<Link href='/projects' className='inline-flex items-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800'>
								View Projects
							</Link>
							<a
								href={profile.links.resume.href}
								target='_blank'
								rel='noreferrer'
								className='inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50'>
								View Resume
							</a>
						</div>
						<div className='mt-7 flex items-center gap-5 text-sm font-semibold'>
							<a href={profile.links.github.href} target='_blank' rel='noreferrer' className='text-slate-600 hover:text-blue-700'>
								GitHub
							</a>
							<a href={profile.links.linkedin.href} target='_blank' rel='noreferrer' className='text-slate-600 hover:text-blue-700'>
								LinkedIn
							</a>
						</div>
					</div>

					<div className='relative mx-auto w-full max-w-sm lg:max-w-none'>
						<div className='relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm'>
							<Image
								src={profile.portrait.src}
								alt={profile.portrait.alt}
								fill
								priority
								sizes='(min-width: 1024px) 32vw, (min-width: 640px) 60vw, 90vw'
								className='object-cover object-center'
							/>
						</div>
						<div className='absolute -bottom-4 -left-4 hidden rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm sm:block'>
							<p className='text-xs font-semibold uppercase tracking-[0.1em] text-slate-500'>Current focus</p>
							<p className='mt-1 text-sm font-semibold text-slate-900'>ML, CV, Android, and software systems</p>
						</div>
					</div>
				</div>
			</section>

			<section className='border-y border-slate-200 bg-white'>
				<div className='site-container grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4'>
					{credibilityHighlights.map((item) => (
						<div key={item.value} className='px-0 py-6 sm:px-5 lg:px-6'>
							<p className='text-base font-bold tracking-tight text-slate-950'>{item.value}</p>
							<p className='mt-1 text-sm text-slate-600'>{item.label}</p>
						</div>
					))}
				</div>
			</section>

			<section className='site-container page-section' aria-labelledby='selected-work-heading'>
				<div className='max-w-2xl'>
					<p className='eyebrow'>Selected Work</p>
					<h2 id='selected-work-heading' className='mt-4 text-balance text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl'>
						Machine learning research, product delivery, and mobile development.
					</h2>
					<p className='mt-4 leading-7 text-slate-600'>
						A focused selection of work across research, an internship contribution, and an ML-integrated Android capstone.
					</p>
				</div>
				<div className='mt-12'>
					{featuredProjects.map((project, index) => <FeaturedWork key={project.slug} project={project} index={index} />)}
				</div>
				<Link href='/projects' className='mt-2 inline-flex rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50'>
					View All Projects
				</Link>
			</section>

			<section className='border-y border-slate-200 bg-white'>
				<div className='site-container page-section'>
					<div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>
						<div className='max-w-2xl'>
							<p className='eyebrow'>Research &amp; Computer Vision</p>
							<h2 className='mt-4 text-3xl font-bold tracking-tight text-slate-950'>Additional applied research</h2>
						</div>
						<Link href='/research' className='text-sm font-semibold text-blue-700 hover:text-blue-800'>
							View research <span aria-hidden='true'>-&gt;</span>
						</Link>
					</div>
					<div className='mt-8 grid gap-5 md:grid-cols-2'>
						{researchProjects.filter((project) => project.slug !== 'nids-optimization').map((project) => (
							<article key={project.slug} className='surface rounded-xl p-6'>
								<div className='flex flex-wrap gap-2'>
									{project.categories.slice(0, 2).map((category) => (
										<span key={category} className='text-xs font-semibold uppercase tracking-[0.09em] text-blue-700'>
											{projectCategoryLabels[category]}
										</span>
									))}
								</div>
								<h3 className='mt-3 text-xl font-bold tracking-tight text-slate-950'>{project.shortTitle ?? project.title}</h3>
								<p className='mt-3 leading-7 text-slate-600'>{project.summary}</p>
								<Link href={`/projects/${project.slug}`} className='mt-5 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800'>
									View case study <span className='ml-1.5' aria-hidden='true'>-&gt;</span>
								</Link>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className='site-container page-section grid gap-12 lg:grid-cols-[0.7fr_1.3fr]' aria-labelledby='experience-heading'>
				<div>
					<p className='eyebrow'>Technical Experience</p>
					<h2 id='experience-heading' className='mt-4 text-3xl font-bold tracking-tight text-slate-950'>
						Professional and cohort experience.
					</h2>
					<Link href='/about' className='mt-6 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800'>
						View background <span className='ml-1.5' aria-hidden='true'>-&gt;</span>
					</Link>
				</div>
				<div className='divide-y divide-slate-200 border-y border-slate-200'>
					{experienceData.map((experience) => (
						<article key={experience.organization} className='py-6 first:pt-6'>
							<div className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8'>
								<h3 className='font-bold text-slate-950'>{experience.organization}</h3>
								<p className='text-sm text-slate-500'>{experience.period}</p>
							</div>
							<p className='mt-2 font-medium text-blue-700'>{experience.role}</p>
							{experience.context && <p className='mt-2 text-sm leading-6 text-slate-600'>{experience.context}</p>}
						</article>
					))}
				</div>
			</section>

			<section className='border-y border-slate-200 bg-white'>
				<div className='site-container page-section'>
					<div className='max-w-2xl'>
						<p className='eyebrow'>Technical Toolkit</p>
						<h2 className='mt-4 text-3xl font-bold tracking-tight text-slate-950'>Grouped by practice area.</h2>
					</div>
					<div className='mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{techGroups.map((group) => (
							<article key={group.name} className='surface rounded-xl p-5'>
								<h3 className='font-semibold text-slate-950'>{group.name}</h3>
								<TechPills items={group.items} />
							</article>
						))}
					</div>
				</div>
			</section>

			<section className='site-container page-section'>
				<div className='rounded-2xl border border-slate-200 bg-slate-950 px-6 py-10 text-white sm:px-10 sm:py-12'>
					<p className='eyebrow text-blue-300'>Start a conversation</p>
					<h2 className='mt-4 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl'>Interested in working together?</h2>
					<p className='mt-4 max-w-xl leading-7 text-slate-300'>
						I&apos;m open to software engineering, machine learning, and mobile development opportunities.
					</p>
					<div className='mt-7 flex flex-wrap gap-4'>
						<Link href='/contact' className='rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100'>
							Get in Touch
						</Link>
						<a href={profile.links.linkedin.href} target='_blank' rel='noreferrer' className='rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-slate-400 hover:bg-slate-900'>
							LinkedIn
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
