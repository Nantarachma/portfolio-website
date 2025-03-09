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
						<div className='flex flex-wrap gap-4'>
							{/* Primary Button - My Projects */}
							<Link
								href='/projects'
								className='group relative px-6 py-3 font-medium text-white rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'>
								{/* Animated gradient background */}
								<div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-purple-700 animate-gradient-xy'></div>

								{/* Button shine effect */}
								<div className='absolute -inset-full top-0 block w-1/2 h-full z-5 transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine'></div>

								{/* Text and icon with hover animation */}
								<span className='relative flex items-center'>
									<span>My Projects</span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-4 w-0 transition-all duration-300 group-hover:w-4 ml-0 group-hover:ml-2 opacity-0 group-hover:opacity-100'
										viewBox='0 0 20 20'
										fill='currentColor'>
										<path
											fillRule='evenodd'
											d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
											clipRule='evenodd'
										/>
									</svg>
								</span>
							</Link>

							{/* Secondary Button - Contact Me */}
							<Link
								href='/contact'
								className='group relative px-6 py-3 font-medium rounded-lg border border-transparent overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md'>
								{/* Subtle gradient border */}
								<span className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 group-hover:opacity-30 transition-opacity duration-300'></span>

								{/* White background that becomes slightly transparent on hover */}
								<span className='absolute inset-0.5 bg-white group-hover:bg-opacity-90 rounded-md transition-all duration-300'></span>

								{/* Text with gradient that intensifies on hover */}
								<span className='relative flex items-center'>
									<span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
										Contact Me
									</span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-4 w-0 transition-all duration-300 group-hover:w-4 ml-0 group-hover:ml-2 opacity-0 group-hover:opacity-100 text-blue-600'
										viewBox='0 0 20 20'
										fill='currentColor'>
										<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
										<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
									</svg>
								</span>
							</Link>
						</div>
					</div>
					<div className='md:w-1/2 relative group'>
						{/* Decorative background elements */}
						<div className='absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-500 animate-gradient'></div>

						{/* Image container with hover effects */}
						<div className='relative h-80 md:h-96 overflow-hidden rounded-lg shadow-xl bg-white'>
							{/* Animated corner accents */}
							<div className='absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 ease-out transform rotate-45 group-hover:scale-150'></div>
							<div className='absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 ease-out delay-100 transform -rotate-45 group-hover:scale-150'></div>

							{/* Image with hover animations */}
							<div className='w-full h-full transform transition-all duration-700 group-hover:scale-105 group-hover:brightness-105'>
								<Image
									src='/profile.JPG'
									alt='Rachmananta'
									fill
									className='object-cover transition-all duration-700 group-hover:saturate-[1.1]'
									priority
									placeholder='blur'
									blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
								/>
							</div>

							{/* Overlay gradient on hover */}
							<div className='absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-transparent to-purple-600/0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none'></div>
						</div>
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
			{/* Skills Section with Minimalist Design */}
			<ScrollReveal
				direction='up'
				delay={0.7}
				distance={50}
				duration={1}
				easing={[0.42, 0, 0.58, 1]}
				opacity={0.9}>
				<section className='relative py-16 -mx-4 px-4 rounded-xl group overflow-hidden'>
					{/* More subtle background gradient */}
					<div
						className='absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 transition-all duration-1000 
      group-hover:from-slate-50 group-hover:via-blue-100/50 group-hover:to-indigo-100/50 
      group-hover:scale-[1.01] transform-origin-center'></div>

					{/* Subtle border */}
					<div className='absolute inset-0 border border-slate-200/60 rounded-xl'></div>

					{/* Minimal corner decorations */}
					<div className='absolute -top-10 -right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-all duration-1000 ease-out'></div>

					<div className='container mx-auto relative'>
						{/* Minimalist title */}
						<div className='relative'>
							<h2 className='text-3xl font-bold mb-3 text-center text-slate-800'>Skills</h2>
							<div className='w-16 h-0.5 bg-slate-400 mx-auto mb-10 rounded-full transition-all duration-1000 group-hover:w-24 group-hover:bg-blue-400'></div>
						</div>

						{/* Grid of skills with minimalist design */}
						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center'>
							{[
								{
									name: 'React',
									icon: <FaReact className='text-blue-400 text-3xl' />,
									color: 'text-slate-700',
									hoverAccent: 'group-hover:border-blue-200',
									iconBg: 'bg-blue-50',
									iconRing: 'ring-blue-100',
								},
								{
									name: 'Next.js',
									icon: <SiNextdotjs className='text-slate-700 text-3xl' />,
									color: 'text-slate-700',
									hoverAccent: 'group-hover:border-slate-200',
									iconBg: 'bg-slate-50',
									iconRing: 'ring-slate-200',
								},
								{
									name: 'TypeScript',
									icon: <SiTypescript className='text-blue-500 text-3xl' />,
									color: 'text-slate-700',
									hoverAccent: 'group-hover:border-blue-200',
									iconBg: 'bg-blue-50',
									iconRing: 'ring-blue-100',
								},
								{
									name: 'Tailwind CSS',
									icon: <SiTailwindcss className='text-cyan-500 text-3xl' />,
									color: 'text-slate-700',
									hoverAccent: 'group-hover:border-cyan-200',
									iconBg: 'bg-cyan-50',
									iconRing: 'ring-cyan-100',
								},
								{
									name: 'Node.js',
									icon: <FaNodeJs className='text-green-600 text-3xl' />,
									color: 'text-slate-700',
									hoverAccent: 'group-hover:border-green-200',
									iconBg: 'bg-green-50',
									iconRing: 'ring-green-100',
								},
								{
									name: 'Kotlin',
									icon: <SiKotlin className='text-indigo-500 text-3xl' />,
									color: 'text-slate-700',
									hoverAccent: 'group-hover:border-indigo-200',
									iconBg: 'bg-indigo-50',
									iconRing: 'ring-indigo-100',
								},
								{
									name: 'UI/UX Design',
									icon: <MdDesignServices className='text-rose-500 text-3xl' />,
									color: 'text-slate-700',
									hoverAccent: 'group-hover:border-rose-200',
									iconBg: 'bg-rose-50',
									iconRing: 'ring-rose-100',
								},
								{
									name: 'Flutter',
									icon: <SiFlutter className='text-blue-500 text-3xl' />,
									color: 'text-slate-700',
									hoverAccent: 'group-hover:border-blue-200',
									iconBg: 'bg-blue-50',
									iconRing: 'ring-blue-100',
								},
							].map((skill) => (
								<div
									key={skill.name}
									className={`p-6 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 transform hover:-translate-y-1 hover:border-opacity-100 ${skill.hoverAccent} group overflow-hidden relative`}>
									{/* Clean, minimalist content layout */}
									<div className='relative flex flex-col items-center'>
										{/* Icon with subtle background */}
										<div
											className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${skill.iconBg} ring-1 ${skill.iconRing} shadow-sm group-hover:scale-105 transition-all duration-500 ease-out`}>
											{skill.icon}
										</div>

										<p className={`font-medium text-lg ${skill.color}`}>{skill.name}</p>

										{/* Minimal underline indicator */}
										<div className='h-0.5 w-0 bg-slate-200 mt-3 group-hover:w-12 transition-all duration-500 rounded-full'></div>
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
