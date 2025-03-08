import Image from 'next/image';

export default function About() {
	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-8'>Tentang Saya</h1>

			<div className='flex flex-col md:flex-row gap-12'>
				<div className='md:w-1/3'>
					<div className='relative h-80 w-full rounded-lg overflow-hidden shadow-lg'>
						<Image
							src='/about-placeholder.jpg'
							alt='Nantarachmasaya'
							fill
							className='object-cover'
						/>
					</div>
				</div>

				<div className='md:w-2/3 space-y-6'>
					<p className='text-xl'>
						Halo! Saya Rachmananta Ibnu Fajar, seorang web developer yang bersemangat dalam
						menciptakan solusi digital yang menarik dan berguna.
					</p>

					<div>
						<h2 className='text-2xl font-bold mb-3'>Pengalaman</h2>
						<div className='space-y-4'>
							<div className='border-l-4 border-blue-500 pl-4'>
								<h3 className='font-bold'>Frontend Developer di Perusahaan XYZ</h3>
								<p className='text-gray-600'>2023 - Sekarang</p>
								<p>
									Mengembangkan aplikasi web menggunakan React dan Next.js dengan fokus pada
									performa dan pengalaman pengguna.
								</p>
							</div>

							<div className='border-l-4 border-blue-500 pl-4'>
								<h3 className='font-bold'>Web Designer di Startup ABC</h3>
								<p className='text-gray-600'>2021 - 2023</p>
								<p>
									Merancang dan mengimplementasikan antarmuka pengguna yang responsif dan modern.
								</p>
							</div>
						</div>
					</div>

					<div>
						<h2 className='text-2xl font-bold mb-3'>Pendidikan</h2>
						<div className='border-l-4 border-blue-500 pl-4'>
							<h3 className='font-bold'>S1 Ilmu Komputer</h3>
							<p className='text-gray-600'>Universitas Indonesia, 2017-2021</p>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-16'>
				<h2 className='text-2xl font-bold mb-6'>Cerita Saya</h2>
				<div className='prose prose-lg max-w-none'>
					<p>
						Perjalanan saya di dunia pengembangan web dimulai sejak saya masih kuliah. Saya selalu
						tertarik dengan bagaimana teknologi dapat membantu orang lain dalam kehidupan
						sehari-hari.
					</p>
					<p>
						Setelah lulus, saya memulai karir sebagai web designer dan kemudian berkembang menjadi
						frontend developer. Saya selalu berusaha untuk terus belajar dan mengikuti perkembangan
						teknologi terbaru.
					</p>
					<p>
						Di luar dunia teknologi, saya menikmati fotografi, traveling, dan membaca buku.
						Aktivitas ini membantu saya untuk mendapatkan inspirasi baru dalam pekerjaan.
					</p>
				</div>
			</div>
		</div>
	);
}
