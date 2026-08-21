import type { Profile } from './types';

export const profile = {
	name: 'Rachmananta Ibnu Fajar',
	shortName: 'Rachmananta',
	role: 'Machine Learning & Software Engineer',
	eyebrow: 'Machine Learning · Computer Vision · Software Engineering',
	intro:
		'Final-year Informatics student focused on machine learning, computer vision, Android development, and full-stack software.',
	bio:
		'An Informatics undergraduate building evidence-led machine learning, computer vision, mobile, and software engineering work.',
	email: 'ibnurachmananta@gmail.com',
	location: 'Surabaya, Indonesia',
	portrait: {
		src: '/profile.JPG',
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
		// This is an existing external document, not a local downloadable PDF.
		resume: {
			label: 'View Resume',
			href: 'https://docs.google.com/document/d/1NUPJMhSuKkHa9q0KpZLsg4VuFLgTzP2V/edit?usp=sharing&ouid=107100240825558006264&rtpof=true&sd=true',
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
	period: 'August 2022 – Expected October 2026',
	gpa: '3.89 / 4.00',
	thesis:
		'Accuracy and Inference Time Optimization using Multi-Objective XGBoost on the NF-UNSW-NB15 Dataset',
} as const;
