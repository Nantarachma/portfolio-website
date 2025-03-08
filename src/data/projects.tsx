export interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	tags: string[];
	link: string;
}

export const projects = [
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
];
