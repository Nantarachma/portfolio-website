import type { Metadata } from 'next';
import ProjectFilters from '@/components/projects/ProjectFilters';
import { getPortfolioContent } from '@/lib/portfolio/repository';
import { getCategoryLabels, getFilterCategories } from '@/lib/portfolio/selectors';

export const metadata: Metadata = {
	title: 'Projects',
	description: 'Machine learning, computer vision, Android, web, research, and UI/UX work by Rachmananta Ibnu Fajar.',
};

export default async function ProjectsPage() {
	const content = await getPortfolioContent();
	const { projects } = content;
	const categoryLabels = getCategoryLabels(content);
	const filterCategories = getFilterCategories(content);

	return (
		<div className='site-container page-section'>
			<header className='page-header grid gap-8 border-b border-rule lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end lg:gap-12'>
				<div className='max-w-4xl'>
					<p className='eyebrow'>Project index</p>
					<h1 className='page-title safe-wrap mt-5 max-w-3xl text-balance text-ink'>
						Technical work across research and product development.
					</h1>
					<p className='lead-text mt-5 text-dim'>
						Explore machine learning, computer vision, mobile, web, research, and UI/UX work. Every card links to a focused case study; external links appear only when they are verified.
					</p>
				</div>

				<dl className='grid grid-cols-2 gap-x-5 gap-y-5 border-t border-rule pt-5 text-sm lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0'>
					<div>
						<dt className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-dim'>Records</dt>
						<dd className='mt-1 text-lg font-bold tracking-tight text-ink'>{projects.length} projects</dd>
					</div>
					<div>
						<dt className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-dim'>Format</dt>
						<dd className='mt-1 font-medium text-ink'>Case-study archive</dd>
					</div>
				</dl>
			</header>

			<section className='mt-8 sm:mt-10' aria-label='Project catalogue'>
				<ProjectFilters
					projects={projects}
					filterCategories={filterCategories}
					categoryLabels={categoryLabels}
				/>
			</section>
		</div>
	);
}
