'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnimatedText from '@/components/AnimatedText';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiKotlin, SiFlutter } from 'react-icons/si';
import { MdDesignServices } from 'react-icons/md';
import TypewriterEffect from '@/components/TypewriterEffect';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
	return (
		<div className='container mx-auto px-4 py-12'>
			{/* Hero Section */}
			<ScrollReveal
				direction='down'
				delay={0.5}
				distance={50}
				duration={1}
				easing={[0.42, 0, 0.58, 1]}
				opacity={0.9}>
				<section className='flex flex-col md:flex-row items-center justify-between gap-8 py-16'>
					<div className='md:w-1/2 space-y-6'>
						<h1 className='text-5xl font-bold tracking-tight'>
							Allo, My name is{' '}
							<span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
								<TypewriterEffect
									texts={['Rachmananta Ibnu Fajar']}
									typingSpeed={100}
									erasingSpeed={80}
									delayAfterType={2000}
								/>
							</span>
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
			</ScrollReveal>

			{/* Featured Projects */}
			<ScrollReveal
				direction='right'
				delay={0.7}
				distance={50}
				duration={1}
				easing={[0.42, 0, 0.58, 1]}
				opacity={0.9}>
				<section className='py-16'>
					<h2 className='text-3xl font-bold mb-10 text-center'>My Projects</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{projects
							.filter((project) => [1, 4, 5].includes(project.id))
							.map((project) => (
								<ProjectCard key={project.id} project={project} />
							))}
					</div>
					<div className='text-center mt-12'>
						<Link
							href='/projects'
							className='px-8 py-3.5 border border-blue-300 rounded-lg font-medium text-blue-600 dark:text-blue-400 
  hover:bg-gradient-to-r from-blue-50 to-indigo-50 dark:hover:bg-gradient-to-r dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20
  hover:border-blue-400 hover:shadow-md transition-all duration-300 group inline-flex items-center gap-2'>
							Check All Of My Projects
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 transform transition-transform group-hover:translate-x-1'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
									clipRule='evenodd'
								/>
							</svg>
						</Link>
					</div>
				</section>
			</ScrollReveal>

			{/* Skills Section */}
			<ScrollReveal
				direction='up'
				delay={0.7}
				distance={50}
				duration={1}
				easing={[0.42, 0, 0.58, 1]}
				opacity={0.9}>
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
			</ScrollReveal>
		</div>
	);
}
