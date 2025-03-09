import Link from 'next/link';
import { Project } from '@/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
	// Function to return the appropriate icon SVG based on the icon type
	const getIcon = (iconType: string) => {
		switch (iconType) {
			case 'mobile':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
						/>
					</svg>
				);
			case 'medical':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
						/>
					</svg>
				);
			case 'food':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1 0 .75H12a4.125 4.125 0 0 0-8.25 0v7.635a2.625 2.625 0 0 0 .834 1.926 2.625 2.625 0 0 0 1.916.769H8.25v-1.5H6.75a1.125 1.125 0 0 1-1.125-1.125V4.125C5.625 3.505 5.12 3 4.5 3H4.125A.375.375 0 0 1 4.125 2.25h.75A1.875 1.875 0 0 1 6.75 4.125v7.875c0 .621.504 1.125 1.125 1.125H8.25v1.5h5.965a1.5 1.5 0 0 0 1.351-.893A12.64 12.64 0 0 0 16.5 12c.001-.046 0-.093 0-.14v-7.01A2.25 2.25 0 0 0 14.25 2.25h-1.79l.55-.55a.375.375 0 0 1 .529-.53Z'
						/>
					</svg>
				);
			case 'diagram':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
						/>
					</svg>
				);
			case 'document':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
						/>
					</svg>
				);
			default:
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
						/>
					</svg>
				);
		}
	};

	// Function to determine background gradient based on project type
	const getGradientClass = (iconType: string) => {
		switch (iconType) {
			case 'mobile':
				return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
			case 'medical':
				return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
			case 'food':
				return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200';
			case 'diagram':
				return 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200';
			case 'document':
				return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200';
			default:
				return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
		}
	};

	// Function to determine icon color based on project type
	const getIconColorClass = (iconType: string) => {
		switch (iconType) {
			case 'mobile':
				return 'text-blue-600 bg-blue-100';
			case 'medical':
				return 'text-green-600 bg-green-100';
			case 'food':
				return 'text-orange-600 bg-orange-100';
			case 'diagram':
				return 'text-indigo-600 bg-indigo-100';
			case 'document':
				return 'text-purple-600 bg-purple-100';
			default:
				return 'text-gray-600 bg-gray-100';
		}
	};

	// Function to determine button color based on project type
	const getButtonClass = (iconType: string) => {
		switch (iconType) {
			case 'mobile':
				return 'text-blue-600 hover:bg-blue-100 focus:ring-blue-300';
			case 'medical':
				return 'text-green-600 hover:bg-green-100 focus:ring-green-300';
			case 'food':
				return 'text-orange-600 hover:bg-orange-100 focus:ring-orange-300';
			case 'diagram':
				return 'text-indigo-600 hover:bg-indigo-100 focus:ring-indigo-300';
			case 'document':
				return 'text-purple-600 hover:bg-purple-100 focus:ring-purple-300';
			default:
				return 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300';
		}
	};

	// Get the appropriate classes based on the project type
	const gradientClass = getGradientClass(project.icon);
	const iconColorClass = getIconColorClass(project.icon);
	const buttonClass = getButtonClass(project.icon);

	return (
		<div
			className={`rounded-xl overflow-hidden transition-all duration-300 group hover:shadow-lg border ${gradientClass} hover:translate-y-[-4px]`}>
			<div className='p-6'>
				{/* Project Header */}
				<div className='flex items-center mb-4'>
					<div
						className={`w-12 h-12 flex items-center justify-center rounded-lg mr-4 shadow-sm ${iconColorClass} transform group-hover:scale-110 transition-transform duration-300`}>
						{getIcon(project.icon)}
					</div>
					<h3 className='text-xl font-bold text-gray-800 group-hover:text-gray-900'>
						{project.title}
					</h3>
				</div>

				{/* Description with limited lines */}
				<p className='text-gray-600 mb-5 line-clamp-3 h-[4.5rem]'>{project.description}</p>

				{/* Tags with improved styling */}
				<div className='flex flex-wrap gap-2 mb-5'>
					{project.tags.map((tag, index) => (
						<span
							key={index}
							className='px-2.5 py-1 bg-white bg-opacity-60 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full border border-gray-200'>
							{tag}
						</span>
					))}
				</div>

				{/* Call to action with dynamic styling */}
				<div className='pt-2 border-t border-gray-200'>
					<Link
						href={project.link}
						className={`inline-flex items-center font-medium rounded-lg px-4 py-2 transition-all ${buttonClass} focus:outline-none focus:ring-2 focus:ring-offset-2`}
						target='_blank'
						rel='noreferrer noopener'>
						See More
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M14 5l7 7m0 0l-7 7m7-7H3'
							/>
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
}
