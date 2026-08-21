import Image from 'next/image';
import Link from 'next/link';
import ProjectVisual from '@/components/projects/ProjectVisual';
import { experienceData, techGroups } from '@/data/experience';
import { credibilityHighlights, profile } from '@/data/profile';
import {
	featuredProjects,
	projectCategoryLabels,
	researchProjects,
	type Project,
} from '@/data/projects';

function Arrow() {
	return <span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>&rarr;</span>;
}

function TechPills({ items }: { items: readonly string[] }) {
	return (
		<ul className='mt-5 flex flex-wrap gap-2' aria-label='Technologies used'>
			{items.map((item) => (
				<li key={item} className='border border-slate-200 bg-[#fbfbf7] px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] text-slate-700'>
					{item}
				</li>
			))}
		</ul>
	);
}

function ProjectMeta({ project }: { project: Project }) {
	return (
		<dl className='mt-6 grid gap-4 border-y border-slate-200 py-4 text-sm sm:grid-cols-2'>
			{project.role ? (
				<div>
					<dt className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Role</dt>
					<dd className='mt-1 font-medium leading-5 text-slate-800'>{project.role}</dd>
				</div>
			) : null}
			{project.context ? (
				<div>
					<dt className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Context</dt>
					<dd className='mt-1 leading-5 text-slate-600'>{project.context}</dd>
				</div>
			) : null}
		</dl>
	);
}

function FeaturedWork({ project, index }: { project: Project; index: number }) {
	const number = String(index + 1).padStart(2, '0');
	const layout = [
		{
			copy: 'lg:col-span-5',
			visual: 'lg:col-span-7',
		},
		{
			copy: 'lg:col-span-4 lg:col-start-9 lg:row-start-1',
			visual: 'lg:col-span-7 lg:row-start-1',
		},
		{
			copy: 'lg:col-span-6 lg:col-start-1',
			visual: 'lg:col-span-5 lg:col-start-8 lg:row-start-1',
		},
	][index % 3];

	return (
		<article className='grid gap-8 border-t border-slate-200 py-10 first:border-t-slate-950 first:pt-7 md:gap-10 md:py-14 lg:grid-cols-12 lg:items-center lg:gap-x-8'>
			<div className={`relative ${layout.copy}`}>
				<div className='flex items-start gap-4'>
					<p className='w-9 shrink-0 border-t-2 border-blue-700 pt-2 font-mono text-xs font-bold tracking-[0.12em] text-blue-700'>{number}</p>
					<div className='min-w-0'>
						<div className='flex flex-wrap gap-x-3 gap-y-1'>
							{project.categories.slice(0, 3).map((category) => (
								<span key={category} className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>
									{projectCategoryLabels[category]}
								</span>
							))}
						</div>
						<h3 className='mt-4 text-balance text-2xl font-bold tracking-[-0.045em] text-slate-950 sm:text-3xl'>
							{project.shortTitle ?? project.title}
						</h3>
						{project.subtitle ? <p className='mt-2 font-medium text-blue-700'>{project.subtitle}</p> : null}
						<p className='mt-5 max-w-xl leading-7 text-slate-600'>{project.summary}</p>
						<ProjectMeta project={project} />
						<TechPills items={project.tech} />
						<div className='mt-7 flex flex-wrap gap-x-6 gap-y-3'>
							<Link href={`/projects/${project.slug}`} className='group inline-flex items-center text-sm font-bold text-slate-950 transition-colors duration-200 hover:text-blue-700'>
								View case study <Arrow />
							</Link>
							{project.githubUrl ? (
								<a
									href={project.githubUrl}
									target='_blank'
									rel='noreferrer'
									className='group inline-flex items-center text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-blue-700'>
									View repository <Arrow />
								</a>
							) : null}
						</div>
					</div>
				</div>
			</div>
			<div className={`relative ${layout.visual}`}>
				<div className='absolute -left-3 -top-3 hidden size-16 border-l border-t border-blue-700 sm:block' aria-hidden='true' />
				<ProjectVisual project={project} className='relative min-h-64 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg sm:min-h-72' />
				<p className='mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Project record / {number}</p>
			</div>
		</article>
	);
}

export default function HomePage() {
	return (
		<>
			<section className='relative isolate overflow-hidden border-b border-slate-200 bg-[#fbfbf7]'>
				<div
					aria-hidden='true'
					className='pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:linear-gradient(to_bottom,black,transparent_76%)]'
				/>
				<div className='site-container relative py-14 sm:py-20 lg:py-24'>
					<div className='grid items-center gap-12 lg:grid-cols-12 lg:gap-x-8'>
						<div className='lg:col-span-7'>
							<div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
								<p className='eyebrow'>{profile.eyebrow}</p>
								<span className='h-px w-8 bg-slate-300' aria-hidden='true' />
								<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Portfolio / 2026</p>
							</div>
							<h1 className='mt-7 max-w-4xl text-balance text-5xl font-bold leading-[0.94] tracking-[-0.065em] text-slate-950 sm:text-6xl lg:text-7xl xl:text-8xl'>
								{profile.name}
							</h1>
							<p className='mt-6 max-w-2xl text-xl font-bold tracking-[-0.035em] text-blue-700 sm:text-2xl'>{profile.role}</p>
							<p className='mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg'>{profile.intro}</p>

							<dl className='mt-9 grid max-w-2xl grid-cols-2 border-y border-slate-200 text-sm sm:grid-cols-3'>
								<div className='border-b border-slate-200 py-4 pr-4 sm:border-b-0 sm:border-r'>
									<dt className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Based in</dt>
									<dd className='mt-1 font-semibold text-slate-900'>{profile.location}</dd>
								</div>
								<div className='border-b border-slate-200 py-4 pl-4 sm:border-b-0 sm:border-r sm:px-4'>
									<dt className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Study</dt>
									<dd className='mt-1 font-semibold text-slate-900'>Final-year Informatics</dd>
								</div>
								<div className='col-span-2 py-4 sm:col-span-1 sm:pl-4'>
									<dt className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Practice</dt>
									<dd className='mt-1 font-semibold text-slate-900'>ML · CV · Software</dd>
								</div>
							</dl>

							<div className='mt-8 flex flex-wrap gap-3'>
								<Link href='/projects' className='group inline-flex items-center border border-slate-950 bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:border-blue-700 hover:bg-blue-700'>
									Explore projects <Arrow />
								</Link>
								<a
									href={profile.links.resume.href}
									target='_blank'
									rel='noreferrer'
									className='group inline-flex items-center border border-slate-300 bg-white/80 px-5 py-3 text-sm font-bold text-slate-900 transition-[border-color,background-color] duration-200 hover:border-blue-700 hover:bg-white'>
									View resume <Arrow />
								</a>
							</div>
							<div className='mt-6 flex items-center gap-5 text-sm font-semibold'>
								<a href={profile.links.github.href} target='_blank' rel='noreferrer' className='border-b border-transparent pb-0.5 text-slate-600 transition-colors duration-200 hover:border-blue-700 hover:text-blue-700'>GitHub</a>
								<a href={profile.links.linkedin.href} target='_blank' rel='noreferrer' className='border-b border-transparent pb-0.5 text-slate-600 transition-colors duration-200 hover:border-blue-700 hover:text-blue-700'>LinkedIn</a>
							</div>
						</div>

						<figure className='relative mx-auto w-full max-w-sm lg:col-span-4 lg:col-start-9 lg:max-w-none'>
							<div className='absolute -right-3 -top-3 size-20 border-r border-t border-blue-700 sm:-right-5 sm:-top-5 sm:size-28' aria-hidden='true' />
							<div className='relative aspect-[4/5] overflow-hidden border border-slate-950 bg-slate-200 p-3 shadow-[10px_10px_0_0_#dbeafe] sm:p-4'>
								<div className='relative h-full overflow-hidden border border-white/70 bg-slate-300'>
									<Image
										src={profile.portrait.src}
										alt={profile.portrait.alt}
										fill
										priority
										sizes='(min-width: 1024px) 28vw, (min-width: 640px) 22rem, calc(100vw - 4rem)'
										className='object-cover object-center'
									/>
								</div>
								<figcaption className='absolute bottom-3 left-3 border border-slate-950 bg-[#fbfbf7] px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700 sm:bottom-4 sm:left-4'>
									Portrait / 01
								</figcaption>
							</div>
							<p className='mt-4 max-w-xs font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Building evidence-led systems across research and product work.</p>
						</figure>
					</div>
				</div>
			</section>

			<section className='border-b border-slate-200 bg-white' aria-label='Profile highlights'>
				<div className='site-container grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4'>
					{credibilityHighlights.map((item, index) => (
						<div key={item.value} className='relative px-0 py-6 sm:px-5 lg:px-6'>
							<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>0{index + 1}</p>
							<p className='mt-2 text-base font-bold tracking-[-0.03em] text-slate-950'>{item.value}</p>
							<p className='mt-1 text-sm leading-5 text-slate-600'>{item.label}</p>
						</div>
					))}
				</div>
			</section>

			<section className='site-container page-section' aria-labelledby='selected-work-heading'>
				<div className='grid gap-6 border-b border-slate-200 pb-9 md:grid-cols-12 md:items-end'>
					<div className='md:col-span-7'>
						<p className='eyebrow'>Selected work</p>
						<h2 id='selected-work-heading' className='mt-4 max-w-3xl text-balance text-3xl font-bold tracking-[-0.05em] text-slate-950 sm:text-4xl lg:text-5xl'>
							Case studies shaped by method, implementation, and evidence.
						</h2>
					</div>
					<p className='leading-7 text-slate-600 md:col-span-4 md:col-start-9 md:border-l md:border-slate-200 md:pl-6'>
						A focused index of machine learning research, product delivery, and an ML-integrated Android capstone.
					</p>
				</div>

				<div>
					{featuredProjects.map((project, index) => <FeaturedWork key={project.slug} project={project} index={index} />)}
				</div>
				<Link href='/projects' className='group inline-flex items-center border-b border-slate-950 pb-1 text-sm font-bold text-slate-950 transition-colors duration-200 hover:border-blue-700 hover:text-blue-700'>
					View all projects <Arrow />
				</Link>
			</section>

			<section className='border-y border-slate-200 bg-[#f2f5fa]'>
				<div className='site-container page-section'>
					<div className='flex flex-col justify-between gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end'>
						<div className='max-w-2xl'>
							<p className='eyebrow'>Research &amp; computer vision</p>
							<h2 className='mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-4xl'>Additional applied research.</h2>
						</div>
						<Link href='/research' className='group inline-flex shrink-0 items-center text-sm font-bold text-slate-950 transition-colors duration-200 hover:text-blue-700'>
							View research <Arrow />
						</Link>
					</div>
					<div className='mt-8 grid border-l border-t border-slate-200 md:grid-cols-2'>
						{researchProjects.filter((project) => project.slug !== 'nids-optimization').map((project, index) => (
							<article key={project.slug} className='group border-b border-r border-slate-200 bg-[#fbfbf7] p-6 transition-[background-color,box-shadow] duration-200 hover:bg-white hover:shadow-[6px_6px_0_0_#dbeafe] sm:p-7'>
								<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>Research / {String(index + 1).padStart(2, '0')}</p>
								<div className='mt-5 flex flex-wrap gap-x-3 gap-y-1'>
									{project.categories.slice(0, 2).map((category) => (
										<span key={category} className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700'>
											{projectCategoryLabels[category]}
										</span>
									))}
								</div>
								<h3 className='mt-3 text-xl font-bold tracking-[-0.035em] text-slate-950'>{project.shortTitle ?? project.title}</h3>
								<p className='mt-3 leading-7 text-slate-600'>{project.summary}</p>
								<Link href={`/projects/${project.slug}`} className='group/link mt-6 inline-flex items-center text-sm font-bold text-slate-950 transition-colors duration-200 hover:text-blue-700'>
									View case study <Arrow />
								</Link>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className='site-container page-section grid gap-12 lg:grid-cols-12' aria-labelledby='experience-heading'>
				<div className='lg:col-span-4'>
					<p className='eyebrow'>Technical experience</p>
					<h2 id='experience-heading' className='mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-4xl'>Professional and cohort experience.</h2>
					<Link href='/about' className='group mt-6 inline-flex items-center text-sm font-bold text-slate-950 transition-colors duration-200 hover:text-blue-700'>
						View background <Arrow />
					</Link>
				</div>
				<div className='border-y border-slate-200 lg:col-span-7 lg:col-start-6'>
					{experienceData.map((experience, index) => (
						<article key={experience.organization} className='grid gap-4 border-t border-slate-200 py-6 first:border-t-0 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-5'>
							<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>0{index + 1}</p>
							<div>
								<div className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8'>
									<h3 className='font-bold text-slate-950'>{experience.organization}</h3>
									<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500'>{experience.period}</p>
								</div>
								<p className='mt-2 font-semibold text-blue-700'>{experience.role}</p>
								{experience.context ? <p className='mt-2 text-sm leading-6 text-slate-600'>{experience.context}</p> : null}
							</div>
						</article>
					))}
				</div>
			</section>

			<section className='border-y border-slate-200 bg-white'>
				<div className='site-container page-section'>
					<div className='max-w-2xl'>
						<p className='eyebrow'>Technical toolkit</p>
						<h2 className='mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-4xl'>Grouped by practice area.</h2>
					</div>
					<div className='mt-8 grid border-l border-t border-slate-200 md:grid-cols-2 lg:grid-cols-3'>
						{techGroups.map((group, index) => (
							<article key={group.name} className='border-b border-r border-slate-200 bg-[#fbfbf7] p-5 sm:p-6'>
								<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>0{index + 1}</p>
								<h3 className='mt-3 font-bold text-slate-950'>{group.name}</h3>
								<TechPills items={group.items} />
							</article>
						))}
					</div>
				</div>
			</section>

			<section className='site-container page-section'>
				<div className='relative overflow-hidden border border-slate-950 bg-slate-950 px-6 py-10 text-white sm:px-10 sm:py-12'>
					<div aria-hidden='true' className='absolute inset-y-0 right-0 hidden w-1/3 border-l border-white/15 bg-[linear-gradient(to_bottom,transparent,rgba(37,99,235,0.35))] lg:block' />
					<div className='relative max-w-2xl'>
						<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-300'>Start a conversation</p>
						<h2 className='mt-4 text-balance text-3xl font-bold tracking-[-0.05em] sm:text-4xl'>Interested in working together?</h2>
						<p className='mt-4 max-w-xl leading-7 text-slate-300'>
							I&apos;m open to software engineering, machine learning, and mobile development opportunities.
						</p>
						<div className='mt-7 flex flex-wrap gap-3'>
							<Link href='/contact' className='group inline-flex items-center bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-colors duration-200 hover:bg-blue-100'>
								Get in touch <Arrow />
							</Link>
							<a href={profile.links.linkedin.href} target='_blank' rel='noreferrer' className='group inline-flex items-center border border-slate-600 px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:border-blue-300 hover:text-blue-200'>
								LinkedIn <Arrow />
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
