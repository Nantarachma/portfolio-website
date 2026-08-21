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

export interface ProjectFiltersProps {
	projects: readonly Project[];
}

export default function ProjectFilters({ projects }: ProjectFiltersProps) {
	const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('all');

	const filteredProjects = useMemo(
		() =>
			selectedFilter === 'all'
				? projects
				: projects.filter((project) => project.categories.includes(selectedFilter)),
		[projects, selectedFilter],
	);

	return (
		<div>
			<div className='flex flex-wrap gap-2' aria-label='Filter projects by category'>
				<button
					type='button'
					onClick={() => setSelectedFilter('all')}
					aria-pressed={selectedFilter === 'all'}
					className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
						selectedFilter === 'all'
							? 'border-blue-700 bg-blue-700 text-white'
							: 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-800'
					}`}>
					All
				</button>
				{projectFilterCategories.map((category) => {
					const isSelected = selectedFilter === category;

					return (
						<button
							key={category}
							type='button'
							onClick={() => setSelectedFilter(category)}
							aria-pressed={isSelected}
							className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
								isSelected
									? 'border-blue-700 bg-blue-700 text-white'
									: 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-800'
							}`}>
							{projectCategoryLabels[category]}
						</button>
					);
				})}
			</div>

			<p className='mt-5 text-sm text-slate-600' aria-live='polite'>
				Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
			</p>

			<div className='mt-8 grid gap-6 md:grid-cols-2'>
				{filteredProjects.map((project) => (
					<ProjectCard key={project.slug} project={project} />
				))}
			</div>
		</div>
	);
}
