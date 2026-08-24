import type { Profile } from './types';

export const profile = {
	name: 'Rachmananta Ibnu Fajar',
	shortName: 'Rachmananta',
	role: 'Software Engineer & Machine Learning Practitioner',
	eyebrow: 'Machine Learning · Computer Vision · Mobile · Full-stack',
	intro:
		'Informatics graduate building machine learning, computer vision, mobile, and full-stack web products.',
	bio:
		'An Informatics graduate from UPN "Veteran" Jawa Timur with experience across machine learning research, native Android development, and full-stack web engineering.',
	email: 'ibnurachmananta@gmail.com',
	phone: '+62 895-4015-96986',
	location: 'Surabaya, Indonesia',
	portrait: {
		src: '/profile.jpeg',
		alt: 'Rachmananta Ibnu Fajar',
	},
	links: {
		github: {
			label: 'GitHub',
			href: 'https://github.com/NantaRachma',
			external: true,
		},
		linkedin: {
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/nantarachma/',
			external: true,
		},
		email: {
			label: 'Email',
			href: 'mailto:ibnurachmananta@gmail.com',
		},
		whatsapp: {
			label: 'WhatsApp',
			href: 'https://wa.me/62895401596986',
			external: true,
		},
		resumeEnglish: {
			label: 'English Resume',
			href: 'https://docs.google.com/document/d/1QKVr8r7UyLRJfRBViIDWcn2ZU-VadEzh/edit',
			external: true,
		},
		resumeIndonesian: {
			label: 'Indonesian Resume',
			href: 'https://docs.google.com/document/d/1eE22zp6suBwlodPSVpbavcn0KXzlYcrH/edit',
			external: true,
		},
	},
} satisfies Profile;

export const credibilityHighlights = [
	{ value: '3.89 / 4.00', label: 'GPA' },
	{ value: 'Bangkit Academy', label: 'Mobile Development 2024' },
	{ value: 'SANTIKA 2026', label: 'Research Presenter' },
	{ value: 'PT IGS', label: 'Full-stack Internship' },
] as const;

export const education = {
	institution: 'UPN "Veteran" Jawa Timur',
	degree: 'Bachelor of Computer Science in Informatics',
	period: 'August 2022 – October 2026',
	gpa: '3.89 / 4.00',
	thesis:
		'Accuracy and Inference Time Optimization using Multi-Objective XGBoost on the NF-UNSW-NB15 Dataset',
} as const;
