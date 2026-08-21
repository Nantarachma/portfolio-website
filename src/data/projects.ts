import type { Project, ProjectCategory } from './types';

export const projectCategoryLabels: Record<ProjectCategory, string> = {
	'machine-learning': 'Machine Learning',
	'computer-vision': 'Computer Vision',
	mobile: 'Mobile',
	web: 'Web',
	research: 'Research',
	'ui-ux': 'UI/UX',
	cybersecurity: 'Cybersecurity',
};

/** Categories surfaced as filters on the projects page. */
export const projectFilterCategories = [
	'machine-learning',
	'computer-vision',
	'mobile',
	'web',
	'research',
	'ui-ux',
] as const satisfies readonly ProjectCategory[];

export const projects: readonly Project[] = [
	{
		id: 1,
		slug: 'nids-optimization',
		title: 'Network Intrusion Detection System (NIDS) Optimization Using Optuna & SHAP',
		shortTitle: 'NIDS Optimization',
		summary:
			'Built a Network Intrusion Detection System pipeline using the NF-UNSW-NB15 dataset and optimized classification accuracy and inference latency through hyperparameter optimization with Optuna. SHAP was used for model explainability and feature analysis.',
		categories: ['machine-learning', 'cybersecurity', 'research'],
		role: 'Lead Machine Learning Researcher',
		context: 'Undergraduate thesis · Presented at SANTIKA 2026',
		tech: ['Python', 'XGBoost', 'Optuna', 'SHAP', 'Scikit-Learn', 'NF-UNSW-NB15'],
		featured: true,
		caseStudy: {
			overview:
				'A research pipeline for network intrusion detection using the NF-UNSW-NB15 dataset, with explainability included alongside model optimization.',
			objective:
				'Investigate a multi-objective approach to classification accuracy and inference time optimization for network intrusion detection.',
			contribution: [
				'Built the NIDS classification pipeline around the NF-UNSW-NB15 dataset.',
				'Applied Optuna for hyperparameter optimization across the stated objectives.',
				'Used SHAP for model explainability and feature analysis.',
			],
			methodology: [
				'Prepare the NF-UNSW-NB15 dataset for model training and evaluation.',
				'Train an XGBoost-based classifier and explore hyperparameters with Optuna.',
				'Use SHAP to examine feature contributions and model behavior.',
			],
			workflow: [
				'NF-UNSW-NB15 dataset',
				'Preprocessing',
				'XGBoost',
				'Optuna optimization',
				'SHAP explainability',
			],
			evidence: [{ label: 'Presented at SANTIKA 2026', kind: 'presentation' }],
		},
		visual: {
			kind: 'pipeline',
			label: 'NIDS research workflow',
			steps: ['NF-UNSW-NB15', 'Preprocessing', 'XGBoost', 'Optuna', 'SHAP'],
		},
		// TODO: add /public/projects/nids-cover.webp when a verified visual is available.
	},
	{
		id: 2,
		slug: 'justibot',
		title: 'JustiBot',
		subtitle: 'AI-Driven Legal Consultation & Document Automation',
		summary:
			'Contributed to software requirements and budget planning, co-designed UI/UX wireframes in Figma, and helped initialize the backend server environment for an AI-powered legal consultation platform.',
		categories: ['web', 'ui-ux'],
		role: 'Full-Stack Developer Intern',
		period: 'Sep 2024 – Jan 2025',
		context: 'PT. IGS Indonesia Groups · Internship Project',
		tech: ['React.js', 'Express.js', 'Node.js', 'PostgreSQL', 'REST API', 'Figma'],
		featured: true,
		caseStudy: {
			overview:
				'An AI-driven legal consultation and document automation platform developed during a full-stack internship.',
			contribution: [
				'Contributed to software requirement specifications.',
				'Supported budget and project planning.',
				'Created UI/UX wireframes in Figma.',
				'Helped initialize the backend server environment.',
			],
			workflow: [
				'Requirements',
				'Planning',
				'UI/UX wireframes',
				'Backend environment',
			],
		},
		visual: {
			kind: 'delivery-flow',
			label: 'JustiBot contribution workflow',
			steps: ['Requirements', 'Planning', 'Wireframes', 'Backend setup'],
		},
		// TODO: add /public/projects/justibot-cover.webp if company policy permits.
	},
	{
		id: 3,
		slug: 'shara',
		title: 'SHARA',
		subtitle: 'Skin Health and Recommendation App',
		summary:
			'Co-developed a native Android application that uses machine learning for skin condition analysis and personalized skincare recommendations within an MVVM clean architecture.',
		categories: ['mobile', 'machine-learning'],
		role: 'Mobile Developer',
		period: 'Sep 2024 – Jan 2025',
		context: 'Bangkit Academy 2024 Capstone Project',
		tech: ['Kotlin', 'Android', 'Android Studio', 'TensorFlow Lite', 'REST API', 'MVVM', 'Clean Architecture'],
		featured: true,
		githubUrl: 'https://github.com/WinasPutra/SHARA-C242-PS321',
		caseStudy: {
			overview:
				'A Bangkit Academy capstone project: a native Android application that integrates machine learning into a skin-health recommendation workflow.',
			contribution: [
				'Worked as the Mobile Developer for the capstone project.',
				'Contributed to a native Android implementation using Kotlin.',
				'Integrated the application architecture with ML-assisted functionality and REST APIs.',
			],
			methodology: [
				'Build the mobile experience with Kotlin and Android Studio.',
				'Use MVVM and Clean Architecture patterns for the Android application.',
				'Connect TensorFlow Lite and REST API capabilities within the app workflow.',
			],
			evidence: [
				{
					label: 'View repository',
					href: 'https://github.com/WinasPutra/SHARA-C242-PS321',
					kind: 'repository',
				},
			],
		},
		visual: {
			kind: 'mobile-flow',
			label: 'SHARA mobile workflow',
			steps: ['Android', 'ML-assisted analysis', 'Recommendations'],
		},
		// TODO: add /public/projects/shara-cover.webp when a verified project visual is available.
	},
	{
		id: 4,
		slug: 'corn-leaf-disease-classification',
		title: 'Corn Leaf Disease Classification via MobileNetV2 & LBP Feature Fusion',
		shortTitle: 'Corn Leaf Disease Classification',
		summary:
			'Engineered a hybrid computer vision model combining MobileNetV2 deep representations with Local Binary Pattern texture features for corn leaf disease classification.',
		categories: ['computer-vision', 'machine-learning', 'research'],
		role: 'Computer Vision Researcher',
		tech: ['Python', 'PyTorch', 'MobileNetV2', 'Local Binary Pattern', 'OpenCV'],
		caseStudy: {
			overview:
				'A computer vision research project exploring the combination of deep image representations and handcrafted texture features.',
			contribution: [
				'Engineered a hybrid feature pipeline for corn leaf disease classification.',
				'Combined MobileNetV2 representations with Local Binary Pattern texture features.',
			],
			workflow: [
				'Image input',
				'MobileNetV2 features',
				'LBP texture features',
				'Feature fusion',
				'Classification',
			],
		},
		visual: {
			kind: 'feature-fusion',
			label: 'Corn leaf classification feature-fusion workflow',
			steps: ['Image', 'MobileNetV2', 'LBP', 'Feature fusion', 'Classification'],
		},
		// TODO: add /public/projects/corn-leaf-cover.webp when a verified visual is available.
	},
	{
		id: 5,
		slug: 'bone-fracture-detection',
		title: 'Bone Fracture Detection Using Deep Learning',
		shortTitle: 'Bone Fracture Detection',
		summary:
			'Developed an image classification pipeline for bone fracture detection from X-ray imagery, including targeted image preprocessing.',
		categories: ['computer-vision', 'machine-learning', 'research'],
		role: 'Computer Vision & Deep Learning Engineer',
		tech: ['Python', 'PyTorch', 'CNN', 'OpenCV'],
		caseStudy: {
			overview:
				'A computer vision research project for image classification from X-ray imagery. It is presented as a research project, not a clinical diagnostic tool.',
			contribution: [
				'Developed an image classification pipeline for bone fracture detection from X-ray imagery.',
				'Included targeted image preprocessing in the workflow.',
			],
			workflow: ['X-ray imagery', 'Image preprocessing', 'CNN', 'Classification'],
		},
		visual: {
			kind: 'classification-flow',
			label: 'Bone fracture classification workflow',
			steps: ['X-ray image', 'Preprocessing', 'CNN', 'Classification'],
		},
		// TODO: add /public/projects/bone-fracture-cover.webp when a verified visual is available.
	},
	{
		id: 6,
		slug: 'asclepius',
		title: 'Asclepius',
		subtitle: 'Android Image Classification Project',
		summary:
			'An Android learning project using a TensorFlow Lite image-classification workflow for skin imagery.',
		categories: ['mobile', 'machine-learning'],
		tech: ['Kotlin', 'TensorFlow Lite', 'Android'],
		githubUrl: 'https://github.com/Nantarachma/Asclepius-Submission-Dicoding',
		caseStudy: {
			overview:
				'An Android and TensorFlow Lite learning project. This project is described as image classification and is not presented as a clinical diagnostic product.',
			evidence: [
				{
					label: 'View repository',
					href: 'https://github.com/Nantarachma/Asclepius-Submission-Dicoding',
					kind: 'repository',
				},
			],
		},
		visual: {
			kind: 'mobile-flow',
			label: 'Android image-classification workflow',
			steps: ['Android', 'TensorFlow Lite', 'Image classification'],
		},
	},
	{
		id: 7,
		slug: 'resep-makanan-antarkita',
		title: 'Resep Makanan Antarkita',
		summary:
			'A UI/UX concept for a recipe application with an AI-powered feature for personal recipes.',
		categories: ['ui-ux', 'mobile'],
		tech: ['UI/UX', 'Mobile Design', 'AI'],
		externalUrl: 'https://docs.google.com/document/d/1B8l3calG9jy7FHUavRZc3MO2McZ_cxsg/edit',
		caseStudy: {
			overview:
				'A mobile recipe application concept documented through the existing project document.',
			evidence: [
				{
					label: 'View project document',
					href: 'https://docs.google.com/document/d/1B8l3calG9jy7FHUavRZc3MO2McZ_cxsg/edit',
					kind: 'external',
				},
			],
		},
		visual: { kind: 'document-flow', label: 'Product design concept' },
	},
	{
		id: 8,
		slug: 'uml-modelling-pkl-information-system',
		title: 'UML Modelling for PKL Information System',
		summary:
			'A UML design for an online information system to support internship registration and management for Informatics students.',
		categories: ['web', 'ui-ux'],
		tech: ['UML', 'System Design', 'Education'],
		externalUrl: 'https://docs.google.com/document/d/1d_hoiTGPloVMNfHRQb7XDq1cbHwXn9kq/edit',
		caseStudy: {
			overview:
				'A systems-design project documented through the existing UML modelling document.',
			evidence: [
				{
					label: 'View project document',
					href: 'https://docs.google.com/document/d/1d_hoiTGPloVMNfHRQb7XDq1cbHwXn9kq/edit',
					kind: 'external',
				},
			],
		},
		visual: { kind: 'document-flow', label: 'UML systems-design workflow' },
	},
	{
		id: 9,
		slug: 'chatgpt-indonesian-language-education',
		title: 'ChatGPT in Indonesian Language Education',
		summary:
			'A journal article examining the use of ChatGPT in Indonesian language learning, student responses, and its relationship to learning outcomes.',
		categories: ['research'],
		tech: ['Research', 'AI', 'Indonesian Language Education'],
		externalUrl: 'https://jtuah.ejournal.unri.ac.id/index.php/JTUAH/article/view/8032',
		caseStudy: {
			overview:
				'A research publication retained from the existing portfolio data.',
			evidence: [
				{
					label: 'Read article',
					href: 'https://jtuah.ejournal.unri.ac.id/index.php/JTUAH/article/view/8032',
					kind: 'publication',
				},
			],
		},
		visual: { kind: 'document-flow', label: 'Research publication' },
	},
] ;

export const featuredProjects = projects.filter((project) => project.featured);

export const researchProjects = projects.filter((project) =>
	['nids-optimization', 'corn-leaf-disease-classification', 'bone-fracture-detection'].includes(
		project.slug,
	),
);

export const otherResearchProjects = projects.filter(
	(project) => project.categories.includes('research') && !researchProjects.includes(project),
);

export const getProjectBySlug = (slug: string) =>
	projects.find((project) => project.slug === slug);

export const getRelatedProjects = (slug: string, limit = 3) => {
	const currentProject = getProjectBySlug(slug);

	if (!currentProject) {
		return [];
	}

	return projects
		.filter(
			(project) =>
				project.slug !== currentProject.slug &&
				project.categories.some((category) => currentProject.categories.includes(category)),
		)
		.slice(0, limit);
};

/** Useful for static params in /projects/[slug]. */
export const projectSlugs = projects.map(({ slug }) => ({ slug }));

export const projectAssetTodos = [
	'/public/projects/nids-cover.webp',
	'/public/projects/justibot-cover.webp',
	'/public/projects/shara-cover.webp',
	'/public/projects/corn-leaf-cover.webp',
	'/public/projects/bone-fracture-cover.webp',
] as const;

export type { Project, ProjectCategory, ProjectCaseStudy, ProjectVisual } from './types';
