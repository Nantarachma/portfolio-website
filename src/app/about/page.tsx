import Image from 'next/image';

export default function About() {
	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-8'>About Me</h1>

			<div className='flex flex-col md:flex-row gap-12'>
				<div className='md:w-1/3'>
					<div className='relative h-80 w-full rounded-lg overflow-hidden shadow-lg'>
						<Image src='/profile2.JPG' alt='Rachmananta' fill className='object-cover' />
					</div>
				</div>

				<div className='md:w-2/3 space-y-6'>
					<p className='text-xl'>
						Hello! I&apos;m Rachmananta Ibnu Fajar, a web developer passionate about creating
						engaging and useful digital solutions.
					</p>

					<div>
						<h2 className='text-2xl font-bold mb-3'>Experience</h2>
						<div className='space-y-4'>
							<div className='border-l-4 border-blue-500 pl-4'>
								<h3 className='font-bold'>Head Of Regeneration Department</h3>
								<p className='text-gray-600'>
									BEM Fakultas Ilmu Komputer UPN &quot;Veteran&quot; Jawa Timur
								</p>
								<p className='text-gray-600'>2024 - 2025</p>
								<div className='space-y-2'>
									<p>
										- Created and implemented regeneration activities at the faculty level, aligning
										with designated stages to foster leadership development and succession planning
										within BEM FAKULTAS ILMU KOMPUTER UPN &quot;VETERAN&quot; JAWA TIMUR.
									</p>

									<p>
										- Devised strategic regeneration initiatives tailored for the families of
										students within the Faculty of Computer Science, aimed at engaging and involving
										them in the academic community.
									</p>

									<p>
										- Conducted leadership capacity-building coaching sessions for prospective board
										candidates, empowering them with the necessary skills and knowledge to take on
										leadership roles within the organization.
									</p>
								</div>
							</div>

							<div className='border-l-4 border-blue-500 pl-4'>
								<h3 className='font-bold'>Mobile Developer Cohort</h3>
								<p className='text-gray-600'>
									Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka
								</p>
								<p className='text-gray-600'>2021 - 2023</p>
								<div className='space-y-2'>
									<p>
										- Completed comprehensive online modules on Kotlin programming, Android
										development, UI/UX design, and Machine Learning fundamentals through the
										Dicoding platform.
									</p>

									<p>
										- Actively participated in Instructor-Led Training (ILT) sessions covering
										technical skills (Kotlin, Android, Machine Learning), soft skills (Growth
										Mindset, Time Management, Problem Solving, etc.), and English for professionals.
									</p>

									<p>
										- Engaged in collaborative learning through study groups and regular
										consultations with mentors.
									</p>

									<p>
										- Successfully developed SHARA, an Android application for skin type analysis
										and personalized skincare recommendations, as part of the Capstone Project.
									</p>

									<p>
										- Applied technical skills including Kotlin programming, Android Studio, UI/UX
										design principles.
									</p>

									<p>
										- Demonstrated teamwork and project management skills by collaborating
										effectively within a diverse team.
									</p>

									<p>- Presented project outcomes in peer review sessions.</p>

									<p>
										- Fulfilled all program requirements, including attendance, quizzes,
										assignments, and final project submission.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div>
						<h2 className='text-2xl font-bold mb-3'>Education</h2>
						<div className='border-l-4 border-blue-500 pl-4'>
							<h3 className='font-bold'>Bachelor of Computer Science</h3>
							<p className='text-gray-600'>UPN “Veteran” Jawa Timur</p>
							<p className='text-gray-600'>2022 - 2026</p>
							<div className='mt-2'>
								<p className='font-medium mb-1'>Relevant Coursework:</p>
								<p className='text-gray-700'>
									Computer Architecture, English, Computational Mathematics, Object-Oriented
									Programming, Information Systems & Technology, Computer Networks, Web Programming,
									Data Structures and Algorithms, Artificial Intelligence, Interface Design,
									Software Engineering
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-16'>
				<h2 className='text-2xl font-bold mb-6'>My Story</h2>
				<div className='prose prose-lg max-w-none'>
					<p>
						I&apos;m currently a sixth-semester Informatics student at UPN &quot;Veteran&quot; Jawa
						Timur in Surabaya, where I&apos;ve developed a strong passion for mobile development and
						web technologies throughout my academic journey.
					</p>
					<p>
						My technical foundation was significantly strengthened during my participation in the
						Google-led Bangkit Academy, where I worked on the &quot;SHARA&quot; Android application
						project. This experience deepened my skills in Kotlin development and UI/UX design
						practices for mobile platforms.
					</p>
					<p>
						I&apos;ve further enhanced my expertise through professional certifications in Android
						Development, Multi-Platform App Development, and Backend technologies from Dicoding.
						These structured learning paths have equipped me with both theoretical knowledge and
						practical implementation skills.
					</p>
					<p>
						Beyond technical pursuits, I serve as the Head of Regeneration Department at BEM
						Fakultas Ilmu Komputer, where I&apos;ve developed strong leadership and organizational
						abilities while contributing to our university community.
					</p>
					<p>
						I&apos;m proficient in various development tools including Android Studio, Postman, and
						Figma, and I&apos;m constantly expanding my skillset to stay current with industry
						trends. My goal is to leverage these technical and soft skills to create innovative
						solutions that make a meaningful impact.
					</p>
				</div>
			</div>
		</div>
	);
}
