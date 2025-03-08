import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
	// Data proyek (dalam aplikasi nyata, ini bisa berasal dari CMS atau API)
	const projects = [
		{
			id: 1,
			title: 'E-Commerce Dashboard',
			description:
				'Dashboard admin untuk platform e-commerce dengan analitik penjualan dan manajemen produk.',
			image: 'https://picsum.photos/seed/project1/800/600',
			tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
			link: '/projects/1',
		},
		{
			id: 2,
			title: 'Aplikasi Manajemen Tugas',
			description: 'Aplikasi web untuk mengelola tugas dan proyek dengan fitur kolaborasi tim.',
			image: 'https://picsum.photos/seed/project2/800/600',
			tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
			link: '/projects/2',
		},
		{
			id: 3,
			title: 'Portfolio Fotografer',
			description: 'Website portfolio untuk fotografer profesional dengan galeri yang responsif.',
			image: 'https://picsum.photos/seed/project3/800/600',
			tags: ['Next.js', 'CSS Grid', 'Animation', 'Cloudinary'],
			link: '/projects/3',
		},
		{
			id: 4,
			title: 'Aplikasi Reservasi Restoran',
			description: 'Platform untuk pemesanan meja di restoran dengan integrasi pembayaran.',
			image: 'https://picsum.photos/seed/project4/800/600',
			tags: ['Vue.js', 'Firebase', 'Stripe', 'PWA'],
			link: '/projects/4',
		},
		{
			id: 5,
			title: 'Website Berita Lokal',
			description: 'Portal berita dengan kategori artikel dan sistem komentar.',
			image: 'https://picsum.photos/seed/project5/800/600',
			tags: ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
			link: '/projects/5',
		},
		{
			id: 6,
			title: 'Aplikasi Cuaca',
			description: 'Aplikasi cuaca real-time dengan visualisasi data yang menarik.',
			image: 'https://picsum.photos/seed/project6/800/600',
			tags: ['React Native', 'API Integration', 'D3.js'],
			link: '/projects/6',
		},
	];

	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-2'>Proyek Saya</h1>
			<p className='text-xl text-gray-600 mb-10'>
				Kumpulan karya dan proyek yang telah saya kerjakan.
			</p>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</div>
	);
}
