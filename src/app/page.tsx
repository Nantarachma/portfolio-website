import Image from 'next/image';
import Link from 'next/link';
import AnimatedText from '@/components/AnimatedText';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiKotlin, SiFlutter } from 'react-icons/si';
import { MdDesignServices } from 'react-icons/md';

export default function Home() {
	return (
		<div className='container mx-auto px-4 py-12'>
			{/* Hero Section */}
			<section className='flex flex-col md:flex-row items-center justify-between gap-8 py-16'>
				<div className='md:w-1/2 space-y-6'>
					<h1 className='text-5xl font-bold tracking-tight'>
						Allo, My name is Rachmananta Ibnu Fajar
					</h1>
					<p className='text-xl text-gray-600'>
						Web Developer & Designer that specialized in{' '}
						<span className='font-semibold text-blue-600'>
							<AnimatedText
								words={['Next.js', 'Flutter', 'Kotlin', 'Node.js', 'UI/UX Design']}
								delay={1500}
							/>
						</span>{' '}
					</p>
					<div className='flex gap-4'>
						<Link
							href='/projects'
							className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition'>
							My Projects
						</Link>
						<Link
							href='/contact'
							className='px-6 py-3 border border-gray-300 rounded-md hover:border-gray-400 transition'>
							Contact Me
						</Link>
					</div>
				</div>
				<div className='md:w-1/2 relative h-80 md:h-96 overflow-hidden rounded-lg shadow-xl'>
					<Image
						src='/profile.JPG'
						alt='Rachmananta'
						fill
						className='object-cover'
						priority
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
					/>
				</div>
			</section>

			{/* Featured Projects */}
			<section className='py-16'>
				<h2 className='text-3xl font-bold mb-10 text-center'>My Projects</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{projects.slice(0, 3).map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
				<div className='text-center mt-12'>
					<Link
						href='/projects'
						className='px-6 py-3 border border-gray-300 rounded-md hover:border-gray-400 transition'>
						Check All Of My Projects
					</Link>
				</div>
			</section>

			{/* Skills Section */}
			<section className='py-16 bg-white -mx-4 px-4'>
				<div className='container mx-auto'>
					<h2 className='text-3xl font-bold mb-10 text-center'>Skills</h2>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center'>
						{[
							{
								name: 'React',
								icon: <FaReact className='text-[#61DAFB] text-3xl' />,
								color: 'bg-blue-50 border-blue-200',
								textColor: 'text-blue-800',
							},
							{
								name: 'Next.js',
								icon: <SiNextdotjs className='text-black text-3xl' />,
								color: 'bg-gray-50 border-gray-200',
								textColor: 'text-gray-800',
							},
							{
								name: 'TypeScript',
								icon: <SiTypescript className='text-[#3178C6] text-3xl' />,
								color: 'bg-blue-50 border-blue-200',
								textColor: 'text-blue-800',
							},
							{
								name: 'Tailwind CSS',
								icon: <SiTailwindcss className='text-[#38B2AC] text-3xl' />,
								color: 'bg-cyan-50 border-cyan-200',
								textColor: 'text-cyan-800',
							},
							{
								name: 'Node.js',
								icon: <FaNodeJs className='text-[#339933] text-3xl' />,
								color: 'bg-green-50 border-green-200',
								textColor: 'text-green-800',
							},
							{
								name: 'Kotlin',
								icon: <SiKotlin className='text-[#7F52FF] text-3xl' />,
								color: 'bg-purple-50 border-purple-200',
								textColor: 'text-purple-800',
							},
							{
								name: 'UI/UX Design',
								icon: <MdDesignServices className='text-[#FF7F50] text-3xl' />,
								color: 'bg-pink-50 border-pink-200',
								textColor: 'text-pink-800',
							},
							{
								name: 'Flutter',
								icon: <SiFlutter className='text-[#02569B] text-3xl' />,
								color: 'bg-blue-50 border-blue-200',
								textColor: 'text-blue-800',
							},
						].map((skill) => (
							<div
								key={skill.name}
								className={`p-6 ${skill.color} border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group`}>
								<div className='flex flex-col items-center'>
									<span className='mb-3'>{skill.icon}</span>
									<p className={`font-medium ${skill.textColor}`}>{skill.name}</p>
									<div className='h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 group-hover:w-16 transition-all duration-300'></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
