'use client';

import { useMemo, useState } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import {
	projectCategoryLabels,
	projectFilterCategories,
	type Project,
	type ProjectCategory,
} from '@/data/projects';

type ProjectFilter = 'all' | ProjectCategory;

const cardLayouts = ['split', 'stacked', 'stacked', 'split-reverse', 'stacked', 'stacked'] as const;

export interface ProjectFiltersProps {
	projects: readonly Project[];
}

export default function ProjectFilters({ projects }: ProjectFiltersProps) {
	const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('all');
	const filterOptions = useMemo(
		() => [
			{
				value: 'all' as const,
				label: 'All',
				count: projects.length,
			},
			...projectFilterCategories.map((category) => ({
				value: category,
				label: projectCategoryLabels[category],
				count: projects.filter((project) => project.categories.includes(category)).length,
			})),
		],
		[projects],
	);

	const filteredProjects = useMemo(
		() =>
			selectedFilter === 'all'
				? projects
				: projects.filter((project) => project.categories.includes(selectedFilter)),
		[projects, selectedFilter],
	);
	const selectedLabel = filterOptions.find((option) => option.value === selectedFilter)?.label ?? 'All';

	return (
		<div className='relative'>
			<div className='sticky top-[4.5rem] z-20 -mx-1 border-y border-slate-300 bg-slate-50/95 px-1 py-4 backdrop-blur sm:-mx-2 sm:px-2'>
				<div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
					<div className='flex items-center justify-between gap-4 lg:block'>
						<p id='project-filter-label' className='font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500'>
							Filter / discipline
						</p>
						<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-700 lg:hidden'>
							{String(filteredProjects.length).padStart(2, '0')} records
						</p>
					</div>
					<div className='-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]'>
						<div className='flex w-max gap-2' role='group' aria-labelledby='project-filter-label'>
							{filterOptions.map((option) => {
								const isSelected = selectedFilter === option.value;

								return (
									<button
										key={option.value}
										type='button'
										onClick={() => setSelectedFilter(option.value)}
										aria-pressed={isSelected}
										aria-controls='project-results'
										className={`inline-flex items-center gap-2 border px-3 py-2 text-sm font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
											isSelected
												? 'border-blue-700 bg-blue-700 text-white shadow-sm'
												: 'border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-800'
										}`}>
										<span className={`size-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-300'}`} aria-hidden='true' />
										{option.label}
										<span className={`font-mono text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
											{String(option.count).padStart(2, '0')}
										</span>
									</button>
								);
							})}
						</div>
					</div>
					<p className='hidden font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-700 lg:block'>
						{String(filteredProjects.length).padStart(2, '0')} records
					</p>
				</div>
			</div>

			<p className='mt-5 text-sm text-slate-600' aria-live='polite'>
				Showing <span className='font-semibold text-slate-900'>{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'} in <span className='font-semibold text-slate-900'>{selectedLabel}</span>
			</p>

			<div id='project-results' className='mt-7 grid gap-5 md:grid-cols-2 lg:gap-6'>
				{filteredProjects.map((project, index) => {
					const layout = cardLayouts[index % cardLayouts.length];

					return (
						<ProjectCard
							key={project.slug}
							project={project}
							layout={layout}
							className={layout === 'stacked' ? '' : 'md:col-span-2'}
						/>
					);
				})}
			</div>
		</div>
	);
}
