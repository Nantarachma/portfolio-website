import Image from 'next/image';
import {
	FaGraduationCap,
	FaBriefcase,
	FaUser,
	FaHandsHelping,
	FaCertificate,
} from 'react-icons/fa';
import { volunteeringData } from '@/data/volunteering';
import { certificationData } from '@/data/certification';

export default function About() {
	return (
		<div className='container mx-auto px-4 py-16 max-w-5xl'>
			{/* Hero Section */}
			<div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16 shadow-sm'>
				<div className='flex flex-col-reverse md:flex-row items-center gap-8'>
					<div className='md:w-2/3 space-y-4'>
						<h1 className='text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600'>
							About Me
						</h1>
						<p className='text-xl leading-relaxed'>
							Hello! I&apos;m Rachmananta Ibnu Fajar, a web developer passionate about creating
							engaging and useful digital solutions.
						</p>
					</div>
					<div className='md:w-1/3'>
						<div className='relative w-64 h-64 mx-auto'>
							{/* Background gradient effect */}
							<div
								className='absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20 
      group-hover:opacity-30 transition-opacity duration-300'></div>

							{/* Wrapper for image to ensure proper sizing and clipping */}
							<div className='absolute inset-0 p-2 rounded-full overflow-hidden'>
								<Image
									src='/profile2.JPG'
									alt='Rachmananta Ibnu Fajar - Portrait'
									fill
									sizes='256'
									priority
									className='object-cover transition-transform duration-300 group-hover:scale-105'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content with Modern Timeline */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-16'>
				{/* Left Column: Experience & Education */}
				<div className='lg:col-span-2 space-y-16'>
					{/* Experience Section */}
					<section>
						<div className='flex items-center gap-3 mb-8'>
							<div className='bg-blue-100 p-3 rounded-lg'>
								<FaBriefcase className='text-blue-600 text-xl' />
							</div>
							<h2 className='text-2xl font-bold'>Professional Experience</h2>
						</div>

						<div className='space-y-12'>
							{/* Timeline Items */}
							<div className='timeline-item'>
								<div className='flex'>
									<div className='timeline-marker'></div>
									<div className='ml-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
										<h3 className='font-bold text-xl'>Head Of Regeneration Department</h3>
										<p className='text-blue-600 font-medium'>
											BEM Fakultas Ilmu Komputer UPN &quot;Veteran&quot; Jawa Timur
										</p>
										<p className='text-gray-500 mb-4'>2024 - 2025</p>
										<ul className='space-y-2 text-gray-700'>
											<li className='flex items-start'>
												<span className='text-blue-500 mr-2'>•</span>
												<span>
													Created and implemented regeneration activities at the faculty level.
												</span>
											</li>
											<li className='flex items-start'>
												<span className='text-blue-500 mr-2'>•</span>
												<span>
													Devised strategic regeneration initiatives for students within the
													Faculty.
												</span>
											</li>
											<li className='flex items-start'>
												<span className='text-blue-500 mr-2'>•</span>
												<span>Conducted leadership capacity-building coaching sessions.</span>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className='timeline-item'>
								<div className='flex'>
									<div className='timeline-marker'></div>
									<div className='ml-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
										<h3 className='font-bold text-xl'>Mobile Developer Cohort</h3>
										<p className='text-blue-600 font-medium'>
											Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka
										</p>
										<p className='text-gray-500 mb-4'>2024 - 2025</p>
										<ul className='space-y-2 text-gray-700'>
											<li className='flex items-start'>
												<span className='text-blue-500 mr-2'>•</span>
												<span>
													Completed comprehensive online modules on Kotlin and Android development.
												</span>
											</li>
											<li className='flex items-start'>
												<span className='text-blue-500 mr-2'>•</span>
												<span>
													Participated in Instructor-Led Training sessions on technical and soft
													skills.
												</span>
											</li>
											<li className='flex items-start'>
												<span className='text-blue-500 mr-2'>•</span>
												<span>Developed SHARA, an Android application for skin type analysis.</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Education Section */}
					<section>
						<div className='flex items-center gap-3 mb-8'>
							<div className='bg-indigo-100 p-3 rounded-lg'>
								<FaGraduationCap className='text-indigo-600 text-xl' />
							</div>
							<h2 className='text-2xl font-bold'>Education</h2>
						</div>

						<div className='timeline-item'>
							<div className='flex'>
								<div className='timeline-marker'></div>
								<div className='ml-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
									<h3 className='font-bold text-xl'>Bachelor of Computer Science</h3>
									<p className='text-indigo-600 font-medium'>UPN &quot;Veteran&quot; Jawa Timur</p>
									<p className='text-gray-500 mb-4'>2022 - 2026</p>
									<div>
										<p className='font-medium mb-2'>Relevant Coursework:</p>
										<div className='flex flex-wrap gap-2'>
											{[
												'Computer Architecture',
												'Object-Oriented Programming',
												'Data Structures',
												'Web Programming',
												'AI',
												'Interface Design',
												'Software Engineering',
											].map((course) => (
												<span
													key={course}
													className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm'>
													{course}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Volunteering Section */}
					<section>
						<div className='flex items-center gap-3 mb-8'>
							<div className='bg-amber-100 p-3 rounded-lg'>
								<FaHandsHelping className='text-amber-600 text-xl' />
							</div>
							<h2 className='text-2xl font-bold'>Volunteering</h2>
						</div>

						<div className='space-y-12'>
							{/* Timeline Items */}
							{volunteeringData.map((item, index) => (
								<div className='timeline-item' key={index}>
									<div className='flex'>
										<div className='timeline-marker'></div>
										<div className='ml-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
											<h3 className='font-bold text-xl'>{item.title}</h3>
											<p className='text-amber-600 font-medium'>{item.organization}</p>
											<p className='text-gray-500 mb-4'>{item.period}</p>
											<ul className='space-y-2 text-gray-700'>
												{item.responsibilities.map((responsibility, idx) => (
													<li className='flex items-start' key={idx}>
														<span className='text-amber-500 mr-2'>•</span>
														<span>{responsibility}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Certification Section */}
					<section>
						<div className='flex items-center gap-3 mb-8'>
							<div className='bg-purple-100 p-3 rounded-lg'>
								<FaCertificate className='text-purple-600 text-xl' />
							</div>
							<h2 className='text-2xl font-bold'>Certifications</h2>
						</div>

						<div className='space-y-6'>
							{certificationData.map((cert, index) => (
								<div className='timeline-item' key={index}>
									<div className='flex'>
										<div className='timeline-marker'></div>
										<div className='ml-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
											<h3 className='font-bold text-xl'>{cert.title}</h3>
											<p className='text-purple-600 font-medium'>{cert.issuer}</p>
											<p className='text-gray-500 mb-2'>{cert.issueDate}</p>
											{cert.url && (
												<div className='flex items-center mt-2'>
													<a
														href={cert.url}
														className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1'
														target='_blank'
														rel='noopener noreferrer'>
														View Certificate
														<svg
															xmlns='http://www.w3.org/2000/svg'
															className='h-4 w-4'
															fill='none'
															viewBox='0 0 24 24'
															stroke='currentColor'>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth={2}
																d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
															/>
														</svg>
													</a>
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				</div>

				{/* Right Column: My Story */}
				<div className='lg:col-span-1'>
					<div className='sticky top-8'>
						<div className='flex items-center gap-3 mb-8'>
							<div className='bg-green-100 p-3 rounded-lg'>
								<FaUser className='text-green-600 text-xl' />
							</div>
							<h2 className='text-2xl font-bold'>My Story</h2>
						</div>

						<div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
							<div className='prose prose-lg'>
								<p>
									I&apos;m a sixth-semester Informatics student with a passion for mobile and web
									development.
								</p>
								<p>
									My journey was enriched by participating in Google-led Bangkit Academy, where I
									worked on the &quot;SHARA&quot; Android application.
								</p>
								<p>
									I&apos;ve earned certifications in Android Development, Multi-Platform App
									Development, and Backend technologies.
								</p>
								<p>
									Beyond tech, I lead the Regeneration Department at BEM Fakultas Ilmu Komputer,
									developing leadership skills while serving our university community.
								</p>
							</div>
						</div>

						{/* Skills Section */}
						<div className='mt-8'>
							<h3 className='text-xl font-bold mb-4'>Core Skills</h3>
							<div className='space-y-4'>
								{[
									{ name: 'Mobile Development', level: 90 },
									{ name: 'Web Development', level: 85 },
									{ name: 'UI/UX Design', level: 75 },
									{ name: 'Leadership', level: 80 },
								].map((skill) => (
									<div key={skill.name}>
										<div className='flex justify-between mb-1'>
											<span className='font-medium'>{skill.name}</span>
											<span className='text-gray-500'>{skill.level}%</span>
										</div>
										<div className='w-full bg-gray-200 rounded-full h-2'>
											<div
												className='skill-progress-bar'
												style={{ '--skill-level': `${skill.level}%` } as React.CSSProperties}></div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
