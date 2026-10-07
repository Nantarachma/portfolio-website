'use client';

import { useMemo, useState } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import type { PortfolioProject, PortfolioProjectCategory } from '@/lib/portfolio/schema';

type ProjectFilter = 'all' | PortfolioProjectCategory;

const cardLayouts = ['split', 'stacked', 'stacked', 'split-reverse', 'stacked', 'stacked'] as const;

export interface ProjectFiltersProps {
	projects: readonly PortfolioProject[];
	filterCategories: readonly PortfolioProjectCategory[];
	categoryLabels: Record<PortfolioProjectCategory, string>;
}

export default function ProjectFilters({ projects, filterCategories, categoryLabels }: ProjectFiltersProps) {
	const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('all');
	const filterOptions = useMemo(
		() => [
			{
				value: 'all' as const,
				label: 'All',
				count: projects.length,
			},
			...filterCategories.map((category) => ({
				value: category,
				label: categoryLabels[category],
				count: projects.filter((project) => project.categories.includes(category)).length,
			})),
		],
		[categoryLabels, filterCategories, projects],
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
			<div className='project-filter-bar sticky z-20 -mx-1 border-y border-rule bg-void/95 px-1 py-3.5 backdrop-blur sm:-mx-2 sm:px-2'>
				<div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
					<div className='flex items-center justify-between gap-4 lg:block'>
						<p id='project-filter-label' className='font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-dim'>
							Filter / discipline
						</p>
						<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-flare lg:hidden'>
							{String(filteredProjects.length).padStart(2, '0')} records
						</p>
					</div>
					<div className='project-filter-scroll -mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:thin] lg:overflow-visible'>
						<div className='flex w-max gap-2 lg:w-full lg:flex-wrap' role='group' aria-labelledby='project-filter-label'>
							{filterOptions.map((option) => {
								const isSelected = selectedFilter === option.value;

								return (
									<button
										key={option.value}
										type='button'
										onClick={() => setSelectedFilter(option.value)}
										aria-pressed={isSelected}
										aria-controls='project-results'
										className={`touch-target inline-flex items-center gap-2 border px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.1em] whitespace-nowrap transition-[background-color,border-color,color] duration-200 ${
											isSelected
												? 'border-blueprint bg-plate text-ink'
												: 'border-rule text-dim hover:border-blueprint hover:text-ink'
										}`}>
										<span className={`size-1.5 ${isSelected ? 'bg-blueprint' : 'bg-rule-strong'}`} aria-hidden='true' />
										{option.label}
										<span className={`font-mono text-[10px] ${isSelected ? 'text-flare' : 'text-dim'}`}>
											{String(option.count).padStart(2, '0')}
										</span>
									</button>
								);
							})}
						</div>
					</div>
					<p className='hidden font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-flare lg:block'>
						{String(filteredProjects.length).padStart(2, '0')} records
					</p>
				</div>
			</div>

			<p className='mt-5 text-sm text-dim' aria-live='polite'>
				Showing <span className='font-semibold text-ink'>{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'} in <span className='font-semibold text-ink'>{selectedLabel}</span>
			</p>

			<div id='project-results' className='card-grid mt-7 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3'>
				{filteredProjects.map((project, index) => {
					const layout = cardLayouts[index % cardLayouts.length];

					return (
						<ProjectCard
							key={project.slug}
							project={project}
							categoryLabels={categoryLabels}
							layout={layout}
							className={layout === 'stacked' ? '' : 'md:col-span-2 lg:col-span-3'}
						/>
					);
				})}
			</div>
		</div>
	);
}
