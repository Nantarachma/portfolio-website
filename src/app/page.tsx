import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='container mx-auto px-4 py-12'>
			{/* Hero Section */}
			<section className='flex flex-col md:flex-row items-center justify-between gap-8 py-16'>
				<div className='md:w-1/2 space-y-6'>
					<h1 className='text-5xl font-bold tracking-tight'>Halo, Saya Nantarachmasaya</h1>
					<p className='text-xl text-gray-600'>
						Web Developer & Designer yang berfokus pada pembuatan pengalaman digital yang menarik
						dan fungsional.
					</p>
					<div className='flex gap-4'>
						<Link
							href='/projects'
							className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition'>
							Lihat Karya Saya
						</Link>
						<Link
							href='/contact'
							className='px-6 py-3 border border-gray-300 rounded-md hover:border-gray-400 transition'>
							Hubungi Saya
						</Link>
					</div>
				</div>
				<div className='md:w-1/2 relative h-80 md:h-96 overflow-hidden rounded-lg shadow-xl'>
					<Image
						src='/profile-placeholder.jpg'
						alt='Nantarachmasaya'
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
				<h2 className='text-3xl font-bold mb-10 text-center'>Proyek Unggulan</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className='border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition'>
							<div className='h-48 bg-gray-100 relative'>
								<Image
									src={`https://picsum.photos/seed/${i}/500/300`}
									alt={`Project ${i}`}
									fill
									className='object-cover'
								/>
							</div>
							<div className='p-6'>
								<h3 className='text-xl font-semibold mb-2'>Proyek {i}</h3>
								<p className='text-gray-600 mb-4'>
									Deskripsi singkat mengenai proyek dan teknologi yang digunakan.
								</p>
								<Link href={`/projects/${i}`} className='text-blue-600 font-medium hover:underline'>
									Lihat Selengkapnya →
								</Link>
							</div>
						</div>
					))}
				</div>
				<div className='text-center mt-12'>
					<Link
						href='/projects'
						className='px-6 py-3 border border-gray-300 rounded-md hover:border-gray-400 transition'>
						Lihat Semua Proyek
					</Link>
				</div>
			</section>

			{/* Skills Section */}
			<section className='py-16 bg-gray-50 -mx-4 px-4'>
				<div className='container mx-auto'>
					<h2 className='text-3xl font-bold mb-10 text-center'>Keahlian</h2>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center'>
						{[
							'React',
							'Next.js',
							'TypeScript',
							'Tailwind CSS',
							'Node.js',
							'MongoDB',
							'UI/UX Design',
							'Responsive Design',
						].map((skill) => (
							<div
								key={skill}
								className='p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition'>
								<p className='font-medium'>{skill}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
