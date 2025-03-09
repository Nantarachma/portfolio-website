'use client';

import Link from 'next/link';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
			<div className='container mx-auto px-4 py-12 relative'>
				{/* Decorative element */}
				<div className='absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-5 blur-3xl'></div>

				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* About column */}
					<div className='md:col-span-2'>
						<div className='flex items-center space-x-3 mb-4'>
							{/* Optional: Add a small logo/avatar here */}
							<div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xl'>
								R
							</div>
							<h3 className='text-xl font-bold'>Rachmananta</h3>
						</div>
						<p className='text-gray-300 mb-4 max-w-md'>
							Passionate mobile and web developer specializing in Android, Flutter, and front-end
							development. Creating engaging and functional digital experiences with a focus on
							clean, efficient solutions.
						</p>
						<div className='mt-6'>
							<h4 className='text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3'>
								Get in touch
							</h4>
							<div className='flex items-center space-x-2 text-gray-300'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-blue-400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
									/>
								</svg>
								<a href='mailto:ibnurachmananta@gmail.com' className='hover:text-white transition'>
									ibnurachmananta@gmail.com
								</a>
							</div>
						</div>
					</div>

					{/* Quick Links column */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
						<ul className='space-y-2'>
							{[
								{ href: '/', label: 'Home' },
								{ href: '/about', label: 'About' },
								{ href: '/projects', label: 'Projects' },
								{ href: '/contact', label: 'Contact' },
							].map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-gray-300 hover:text-white transition-all duration-300 flex items-center group'>
										<span className='h-[2px] w-0 bg-blue-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300'></span>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Social Media column */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Follow Me</h3>
						<div className='flex flex-col space-y-3'>
							<a
								href='https://www.instagram.com/nantarach_/'
								className='flex items-center text-gray-300 hover:text-white transition-colors px-3 py-2 hover:bg-gray-800 rounded-md'
								target='_blank'
								rel='noreferrer noopener'>
								<svg className='h-5 w-5 mr-3' fill='currentColor' viewBox='0 0 24 24'>
									<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
								</svg>
								Instagram
							</a>
							<a
								href='https://www.linkedin.com/in/nantarachma/'
								className='flex items-center text-gray-300 hover:text-white transition-colors px-3 py-2 hover:bg-gray-800 rounded-md'
								target='_blank'
								rel='noreferrer noopener'>
								<svg className='h-5 w-5 mr-3' fill='currentColor' viewBox='0 0 24 24'>
									<path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
								</svg>
								LinkedIn
							</a>
							<a
								href='https://github.com/Nantarachma/'
								className='flex items-center text-gray-300 hover:text-white transition-colors px-3 py-2 hover:bg-gray-800 rounded-md'
								target='_blank'
								rel='noreferrer noopener'>
								<svg className='h-5 w-5 mr-3' fill='currentColor' viewBox='0 0 24 24'>
									<path
										fillRule='evenodd'
										d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
										clipRule='evenodd'
									/>
								</svg>
								GitHub
							</a>
						</div>
					</div>
				</div>

				{/* Copyright section with extra details */}
				<div className='border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
					<p className='text-gray-400 mb-4 md:mb-0'>
						© {currentYear} Rachmananta Ibnu Fajar. All Rights Reserved.
					</p>
					<div className='flex space-x-6'>
						<button
							onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
							className='text-gray-400 hover:text-white flex items-center group transition'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 mr-1 transform group-hover:-translate-y-1 transition-transform'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
									clipRule='evenodd'
								/>
							</svg>
							Back to top
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
