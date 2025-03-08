import Image from 'next/image';
import Link from 'next/link';

interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	tags: string[];
	link: string;
}

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<div className='border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition'>
			<div className='h-48 relative'>
				<Image src={project.image} alt={project.title} fill className='object-cover' />
			</div>
			<div className='p-6'>
				<h3 className='text-xl font-semibold mb-2'>{project.title}</h3>
				<p className='text-gray-600 mb-4'>{project.description}</p>

				<div className='flex flex-wrap gap-2 mb-4'>
					{project.tags.map((tag, index) => (
						<span key={index} className='px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded'>
							{tag}
						</span>
					))}
				</div>

				<Link href={project.link} className='text-blue-600 font-medium hover:underline'>
					Lihat Selengkapnya →
				</Link>
			</div>
		</div>
	);
}
