'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Contact() {
	const [activeSection, setActiveSection] = useState<string | null>(null);

	const toggleSection = (section: string) => {
		setActiveSection(activeSection === section ? null : section);
	};

	return (
		<div className='container mx-auto px-4 py-16 max-w-5xl relative'>
			{/* Decorative background elements */}
			<div className='absolute top-20 right-0 -z-10 w-72 h-72 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-full blur-3xl opacity-20'></div>
			<div className='absolute bottom-40 left-10 -z-10 w-80 h-80 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full blur-3xl opacity-20'></div>
			<div className='absolute top-96 left-1/2 -z-10 w-64 h-64 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-full blur-3xl opacity-20'></div>

			<div className='mb-12 relative'>
				<h1 className='text-4xl font-bold mb-3 text-gray-800'>Contact Me</h1>
				<div className='w-20 h-1.5 bg-blue-600 mb-6 rounded-full'></div>
				<p className='text-xl text-gray-600 max-w-2xl leading-relaxed'>
					Interested in working together? Feel free to reach out through any of these channels.
				</p>
			</div>

			{/* Professional Summary Section */}
			<div className='bg-gradient-to-br from-white to-blue-200 p-8 rounded-xl shadow-sm mb-10 border border-gray-100 hover:shadow-md transition-all duration-300'>
				<div className='flex flex-col md:flex-row items-center gap-8'>
					<div className='w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg relative'>
						<Image
							src='/profile3.JPG'
							alt='Rachmananta'
							className='object-cover'
							fill
							sizes='128'
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src = 'https://via.placeholder.com/128?text=IR';
							}}
						/>
					</div>
					<div>
						<h2 className='text-2xl font-bold mb-3 text-gray-800'>Professional Overview</h2>
						<p className='text-gray-700 leading-relaxed mb-4'>
							I&apos;m a web developer specializing in React, Next.js, and TypeScript. With a
							passion for creating clean, efficient, and user-friendly interfaces, I&apos;m
							currently available for freelance projects and collaborations. Let&apos;s build
							something amazing together!
						</p>
						<div className='mt-4'>
							<a
								href='https://docs.google.com/document/d/1NUPJMhSuKkHa9q0KpZLsg4VuFLgTzP2V/edit?usp=sharing&ouid=107100240825558006264&rtpof=true&sd=true'
								target='_blank'
								rel='noreferrer noopener'
								className='inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg mr-3 transition-colors duration-300 font-medium'>
								<span>Download CV</span>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 ml-2'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
									/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Contact Info */}
			<div className='mb-10'>
				<div className='bg-gradient-to-br from-blue-200 to-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300'>
					<h2 className='text-2xl font-bold mb-6 text-gray-800'>Contact Information</h2>

					<div className='grid md:grid-cols-2 gap-8'>
						<div className='space-y-6'>
							<div className='flex items-start'>
								<div className='mr-4 text-blue-600 bg-blue-50 p-3 rounded-lg'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
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
								</div>
								<div>
									<h3 className='font-semibold text-gray-800 mb-1'>Email</h3>
									<a
										href='mailto:ibnurachmananta@gmail.com'
										className='text-blue-600 hover:underline transition-colors duration-300'>
										ibnurachmananta@gmail.com
									</a>
								</div>
							</div>

							<div className='flex items-start'>
								<div className='mr-4 text-blue-600 bg-blue-50 p-3 rounded-lg'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<div>
									<h3 className='font-semibold text-gray-800 mb-1'>Phone</h3>
									<a
										href='https://wa.me/6289540159698'
										className='text-blue-600 hover:underline transition-colors duration-300'
										target='_blank'
										rel='noopener noreferrer'>
										+62 895 4015 9698
									</a>
								</div>
							</div>
						</div>

						<div className='space-y-6'>
							<div className='flex items-start'>
								<div className='mr-4 text-blue-600 bg-blue-50 p-3 rounded-lg'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
										/>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									</svg>
								</div>
								<div>
									<h3 className='font-semibold text-gray-800 mb-1'>Location</h3>
									<p className='text-gray-700'>Surabaya, Indonesia</p>
								</div>
							</div>

							<div>
								<h3 className='font-semibold text-gray-800 mb-3'>Social Media</h3>
								<div className='flex space-x-4'>
									<a
										href='https://www.instagram.com/nantarach_/'
										className='text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300'
										target='_blank'
										rel='noreferrer noopener'>
										<span className='sr-only'>Instagram</span>
										<svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
											<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
										</svg>
									</a>
									<a
										href='https://www.linkedin.com/in/nantarachma/'
										className='text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300'
										target='_blank'
										rel='noreferrer noopener'>
										<span className='sr-only'>LinkedIn</span>
										<svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
											<path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
										</svg>
									</a>
									<a
										href='https://github.com/Nantarachma/'
										className='text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300'
										target='_blank'
										rel='noreferrer noopener'>
										<span className='sr-only'>GitHub</span>
										<svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
											<path
												fillRule='evenodd'
												d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
												clipRule='evenodd'
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* FAQ Section */}
			<div className='mt-16'>
				<h2 className='text-3xl font-bold mb-8 text-center text-gray-800'>
					Frequently Asked Questions
				</h2>
				<div className='grid md:grid-cols-1 gap-6'>
					{[
						{
							question: 'What services do you offer?',
							answer:
								'I specialize in mobile app development with Android/Kotlin and Flutter, web development with HTML/CSS/JavaScript, and UI/UX design. My services include full-stack mobile application development, responsive web design, UI/UX prototyping, and machine learning integration for mobile apps.',
						},
						{
							question: 'What is your educational background?',
							answer:
								'I\'m currently an Informatics student at UPN "Veteran" Jawa Timur Surabaya with a 3.89/4.00 GPA. My coursework includes Computer Architecture, Object-Oriented Programming, Web Programming, Data Structures and Algorithms, Artificial Intelligence, Interface Design, and Software Engineering.',
						},
						{
							question: 'What notable projects have you worked on?',
							answer:
								'Some of my key projects include SHARA (Skin Health And Recommendation App) developed during Google\'s Bangkit Academy, Asclepius (a skin cancer detection app using TensorFlow Lite), a Flutter-based portfolio website, and "Antarkita" (a recipe app with AI-powered features). I have experience in both individual and team-based projects spanning mobile, web, and UX design domains.',
						},
						{
							question: 'What technologies do you work with?',
							answer:
								"I work with a variety of technologies including Kotlin for Android development, Flutter for cross-platform applications, JavaScript/Node.js for web and backend development, HTML/CSS for frontend, and Python for machine learning integration. I'm proficient with tools such as Android Studio, Visual Studio Code, Figma, Framer, GitHub, and Postman.",
						},
						{
							question: 'Do you have any certifications?',
							answer:
								"Yes, I hold multiple certifications from Dicoding in Android Development, Flutter Development, Back-End Development with JavaScript, Cloud Computing (AWS), and Machine Learning fundamentals. I've also completed the Bangkit Academy program led by Google, Tokopedia, Gojek, and Traveloka, specializing in Mobile Development.",
						},
						{
							question: 'Can you help with existing projects?',
							answer:
								'Absolutely! I have experience collaborating on team projects at Bangkit Academy and university. I can help optimize, debug, or add features to your existing Android, Flutter, or web applications. My experience across multiple platforms allows me to quickly adapt to different codebases and development environments.',
						},
					].map((faq, index) => (
						<div
							key={index}
							className='bg-white p-7 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 cursor-pointer'
							onClick={() => toggleSection(`faq-${index}`)}>
							<h3 className='font-semibold text-lg text-gray-800 mb-2 flex justify-between items-center'>
								{faq.question}
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className={`h-5 w-5 text-blue-500 transform transition-transform duration-300 ${
										activeSection === `faq-${index}` ? 'rotate-180' : ''
									}`}
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</h3>
							<p
								className={`text-gray-600 leading-relaxed transition-all duration-300 ${
									activeSection === `faq-${index}`
										? 'max-h-96 opacity-100'
										: 'max-h-0 overflow-hidden opacity-0'
								} mt-2`}>
								{faq.answer}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
