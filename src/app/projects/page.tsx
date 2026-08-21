import type { Metadata } from 'next';
import ProjectFilters from '@/components/projects/ProjectFilters';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
	title: 'Projects',
	description: 'Machine learning, computer vision, Android, web, research, and UI/UX work by Rachmananta Ibnu Fajar.',
};

export default function ProjectsPage() {
	return (
		<div className='site-container page-section'>
			<SectionHeading
				as='h1'
				eyebrow='Projects'
				title='Technical work across research and product development.'
				description='Explore machine learning, computer vision, mobile, web, research, and UI/UX work. Every card links to a focused case study; external links appear only when they are verified.'
			/>

			<section className='mt-12' aria-label='Project catalogue'>
				<ProjectFilters projects={projects} />
			</section>
		</div>
	);
}
