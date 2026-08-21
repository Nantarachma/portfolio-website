import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import Badge from '@/components/ui/Badge';
import ProjectVisual from '@/components/projects/ProjectVisual';
import {
	projectCategoryLabels,
	type Project,
} from '@/data/projects';

export interface ProjectCardProps {
	project: Project;
	variant?: 'default' | 'featured';
	className?: string;
}

export default function ProjectCard({
	project,
	variant = 'default',
	className = '',
}: ProjectCardProps) {
	const isFeatured = variant === 'featured';
	const visibleTech = project.tech.slice(0, isFeatured ? 7 : 5);

	return (
		<article
			className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md ${
				isFeatured ? 'lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]' : 'flex h-full flex-col'
			} ${className}`}>
			<ProjectVisual
				project={project}
				className={
					isFeatured
						? 'min-h-72 rounded-none border-0 border-b border-slate-800 lg:min-h-full lg:border-b-0 lg:border-r'
						: 'min-h-52 rounded-none border-0 border-b border-slate-800'
				}
			/>

			<div className='flex min-w-0 flex-1 flex-col p-6 sm:p-7'>
				<div className='flex flex-wrap gap-2'>
					{project.categories.map((category) => (
						<Badge key={category} tone={category === 'machine-learning' ? 'accent' : 'subtle'}>
							{projectCategoryLabels[category]}
						</Badge>
					))}
				</div>

				<div className='mt-5'>
					<h3 className='text-xl font-bold tracking-tight text-slate-950 sm:text-2xl'>
						{project.title}
					</h3>
					{project.subtitle ? (
						<p className='mt-1 text-sm font-medium text-slate-600'>{project.subtitle}</p>
					) : null}
				</div>

				<p className='mt-4 text-sm leading-6 text-slate-600'>{project.summary}</p>

				{project.role || project.context || project.period ? (
					<div className='mt-5 border-l-2 border-blue-200 pl-3 text-sm leading-6 text-slate-600'>
						{project.role ? <p className='font-semibold text-slate-800'>{project.role}</p> : null}
						{project.context ? <p>{project.context}</p> : null}
						{project.period ? <p>{project.period}</p> : null}
					</div>
				) : null}

				<div className='mt-5 flex flex-wrap gap-2'>
					{visibleTech.map((technology) => (
						<Badge key={technology} tone='neutral'>
							{technology}
						</Badge>
					))}
					{project.tech.length > visibleTech.length ? (
						<Badge tone='neutral'>+{project.tech.length - visibleTech.length}</Badge>
					) : null}
				</div>

				<div className='mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-100 pt-5'>
					<Link
						href={`/projects/${project.slug}`}
						className='inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'>
						View Case Study
						<FiArrowRight aria-hidden='true' className='size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
					</Link>
					{project.githubUrl ? (
						<a
							href={project.githubUrl}
							target='_blank'
							rel='noreferrer noopener'
							className='inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'>
							<FiGithub aria-hidden='true' className='size-4' />
							Repository
						</a>
					) : null}
					{project.demoUrl || project.externalUrl ? (
						<a
							href={project.demoUrl ?? project.externalUrl}
							target='_blank'
							rel='noreferrer noopener'
							className='inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'>
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
