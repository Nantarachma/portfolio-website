import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import Badge from '@/components/ui/Badge';
import ProjectVisual from '@/components/projects/ProjectVisual';
import type { PortfolioProject, PortfolioProjectCategory } from '@/lib/portfolio/schema';

export interface ProjectCardProps {
	project: PortfolioProject;
	categoryLabels: Record<PortfolioProjectCategory, string>;
	variant?: 'default' | 'featured';
	layout?: 'stacked' | 'split' | 'split-reverse';
	className?: string;
}

export default function ProjectCard({
	project,
	categoryLabels,
	variant = 'default',
	layout = 'stacked',
	className = '',
}: ProjectCardProps) {
	const isFeatured = variant === 'featured';
	const isSplit = isFeatured || layout !== 'stacked';
	const isReversed = layout === 'split-reverse';
	const visibleTech = project.tech.slice(0, isFeatured ? 7 : 5);
	const projectNumber = String(project.id).padStart(2, '0');

	return (
		<article
			/* Same pointer-tilt as the Selected Works rack (engine gates it to
			   hover + fine pointers, so touch devices never get it). */
			data-sc-tilt='6'
			className={`surface group relative h-full overflow-hidden ${
				isSplit ? 'lg:grid lg:grid-cols-[minmax(15rem,0.82fr)_minmax(0,1.18fr)]' : 'flex flex-col'
			} ${className}`}>
			<ProjectVisual
				project={project}
				className={
					isSplit
						? `min-h-64 border-0 border-b border-rule lg:min-h-full lg:border-b-0 ${isReversed ? 'lg:order-2 lg:border-l' : 'lg:border-r'}`
						: 'min-h-52 border-0 border-b border-rule'
				}
			/>

			<div className={`card-pad flex min-w-0 flex-1 flex-col ${isReversed ? 'lg:order-1' : ''}`}>
				<div className='flex items-start justify-between gap-4'>
					<p className='font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-flare'>
						<span className='text-dim'>Case / </span>
						{projectNumber}
					</p>
					<p className='border-l border-rule pl-3 text-right text-[10px] font-medium uppercase tracking-[0.12em] text-dim'>
						Project record
					</p>
				</div>

				<div className='mt-5 flex flex-wrap gap-x-3 gap-y-2'>
					{project.categories.map((category) => (
						<span key={category} className={`text-[11px] font-semibold uppercase tracking-[0.1em] ${category === 'machine-learning' ? 'text-flare' : 'text-dim'}`}>
							{categoryLabels[category]}
						</span>
					))}
				</div>

				<div className='mt-4'>
					<h3 className='safe-wrap text-xl font-bold tracking-[-0.03em] text-ink sm:text-2xl'>
						{project.title}
					</h3>
					{project.subtitle ? (
						<p className='mt-2 text-sm font-medium leading-6 text-dim'>{project.subtitle}</p>
					) : null}
				</div>

				<p className='mt-4 text-sm leading-6 text-dim'>{project.summary}</p>

				{project.role || project.context || project.period ? (
					<dl className='mt-5 grid gap-3 border-l-2 border-blueprint pl-3 text-sm leading-5 text-dim'>
						{project.role ? (
							<div>
								<dt className='sr-only'>Role</dt>
								<dd className='font-semibold text-ink'>{project.role}</dd>
							</div>
						) : null}
						{project.context ? (
							<div>
								<dt className='sr-only'>Context</dt>
								<dd>{project.context}</dd>
							</div>
						) : null}
						{project.period ? (
							<div>
								<dt className='sr-only'>Period</dt>
								<dd>{project.period}</dd>
							</div>
						) : null}
					</dl>
				) : null}

				<div className='mt-5 flex flex-wrap gap-1.5'>
					{visibleTech.map((technology) => (
						<Badge key={technology} tone='neutral'>
							{technology}
						</Badge>
					))}
					{project.tech.length > visibleTech.length ? (
						<Badge tone='neutral'>+{project.tech.length - visibleTech.length}</Badge>
					) : null}
				</div>

				<div className={`mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-5 ${isSplit ? 'lg:mt-auto' : ''}`}>
					<Link
						href={`/projects/${project.slug}`}
						className='touch-target inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:text-flare'>
						View Case Study
						<FiArrowRight aria-hidden='true' className='size-4 transition-transform duration-200 group-hover:translate-x-1' />
					</Link>
					{project.githubUrl ? (
						<a
							href={project.githubUrl}
							target='_blank'
							rel='noreferrer noopener'
							className='touch-target inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-dim transition-colors duration-200 hover:text-flare'>
							<FiGithub aria-hidden='true' className='size-4' />
							Repository
						</a>
					) : null}
					{project.demoUrl || project.externalUrl ? (
						<a
							href={project.demoUrl ?? project.externalUrl}
							target='_blank'
							rel='noreferrer noopener'
							className='touch-target inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-dim transition-colors duration-200 hover:text-flare'>
							View Source
							<FiArrowUpRight aria-hidden='true' className='size-4' />
						</a>
					) : null}
				</div>
			</div>
		</article>
	);
}

export { ProjectCard };
