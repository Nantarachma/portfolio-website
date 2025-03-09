export interface Project {
	id: number;
	title: string;
	description: string;
	icon: string; // Changed from image to icon
	tags: string[];
	link: string;
}

export const projects = [
	{
		id: 1,
		title: 'SHARA (Skin Health And Recommendation App)',
		description: 'A mobile app to scan your face and give you advice about skincare.',
		icon: 'mobile', // Icon type instead of image path
		tags: ['Kotlin', 'Cloud Computing', 'Machine Learning', 'Healthcare', 'Mobile App'],
		link: 'https://github.com/WinasPutra/SHARA-C242-PS321',
	},
	{
		id: 2,
		title: 'Asclepius (Medical App)',
		description: 'A mobile app to detect cancer disease in skin with tensorflow lite model.',
		icon: 'medical', // Icon type
		tags: ['Kotlin', 'TensorFlow Lite', 'Healthcare', 'AI'],
		link: 'https://github.com/Nantarachma/Asclepius-Submission-Dicoding',
	},
	{
		id: 3,
		title: 'Resep Makanan Antarkita',
		description:
			"A design for a mobile app that's about cooking with an ai powered feature for personal recipes.",
		icon: 'food', // Icon type
		tags: ['UI/UX', 'Mobile Design', 'AI', 'Food'],
		link: 'https://docs.google.com/document/d/1B8l3calG9jy7FHUavRZc3MO2McZ_cxsg/edit',
	},
	{
		id: 4,
		title: 'UML Modelling for PKL Information System',
		description:
			'A design of an online information system using UML to facilitate internship registration and management for Informatics students.',
		icon: 'diagram', // Icon type
		tags: ['UML', 'System Design', 'Education'],
		link: 'https://docs.google.com/document/d/1d_hoiTGPloVMNfHRQb7XDq1cbHwXn9kq/edit',
	},
	{
		id: 5,
		title: 'Publish Journal for Indonesian Course Relation to Chat GPT',
		description:
			'This journal examines the use of Chat GPT technology in Indonesian language learning, student responses, and the impact on learning outcomes.',
		icon: 'document', // Icon type
		tags: ['Research', 'Education', 'AI', 'Journal', 'Indonesian'],
		link: 'https://jtuah.ejournal.unri.ac.id/index.php/JTUAH/article/view/8032',
	},
];
