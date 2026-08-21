import type {
	AdditionalExperienceItem,
	ExperienceItem,
	LeadershipItem,
	TechGroup,
} from './types';

/** Technical experience is intentionally separate from leadership work. */
export const experienceData: readonly ExperienceItem[] = [
	{
		organization: 'PT. IGS Indonesia Groups',
		role: 'Full-stack Developer Intern',
		location: 'Surabaya',
		period: 'Sep 2024 – Jan 2025',
		context: 'JustiBot · AI-driven legal consultation and document automation platform',
		contributions: [
			'Contributed to software requirement specifications.',
			'Supported budget and project planning.',
			'Created UI/UX wireframes in Figma.',
			'Helped initialize the backend server environment.',
		],
	},
	{
		organization: 'Bangkit Academy 2024',
		role: 'Mobile Developer Cohort',
		period: 'Sep 2024 – Jan 2025',
		context: 'Mobile Development Cohort',
		contributions: [
			'Focused on native Android development with Kotlin.',
			'Worked on SHARA, an ML-integrated Android capstone project.',
		],
	},
];

export const leadershipData: readonly LeadershipItem[] = [
	{
		organization: 'BEM Fakultas Ilmu Komputer UPN "Veteran" Jawa Timur',
		role: 'Head of Multimedia Department',
		period: 'Mar 2025 – Jan 2026',
		focus: [
			'Media strategy',
			'Brand identity',
			'Figma and Canva',
			'Executive portrait photography',
			'Event documentation',
			'Visual communication',
		],
	},
	{
		organization: 'BEM Fakultas Ilmu Komputer UPN "Veteran" Jawa Timur',
		role: 'Head of Regeneration Department',
		period: 'Mar 2024 – Jan 2025',
		focus: [
			'Leadership development',
			'Student engagement',
			'Coaching',
			'Succession planning',
			'Organizational development',
		],
	},
];

/** Retained for a collapsed "Additional Organizational Experience" section. */
export const additionalOrganizationalExperience: readonly AdditionalExperienceItem[] = [
	{
		title: 'Member of Security and Licensing Division – Connection Day 2022',
		organization: 'BEM Fakultas Ilmu Komputer UPN Veteran Jawa Timur',
		period: 'Nov 2022 – Feb 2023',
		responsibilities: [
			'Planned and executed the annual Connection Day event for new computer science students.',
			'Managed security and licensing requirements for the event.',
			'Helped create rules during the event.',
			'Addressed security issues during the event.',
		],
	},
	{
		title: 'Member of Security and First Aid Division – Dies Natalis Fasilkom 2023',
		organization: 'BEM Fakultas Ilmu Komputer UPN Veteran Jawa Timur',
		period: 'Jun 2023 – Aug 2023',
		responsibilities: [
			'Organized the annual Dies Natalis event for the computer science faculty.',
			'Managed security and first aid requirements for the event.',
			'Created rules for the event.',
			'Stood guard at the health post.',
			'Compiled a list of necessary medicines.',
		],
	},
	{
		title: 'Senior Leader for New Students – MOSAIK 2023',
		organization: 'BEM Fakultas Ilmu Komputer UPN Veteran Jawa Timur',
		period: 'Jun 2023 – Sep 2023',
		responsibilities: [
			'Led the MOSAIK event for new students.',
			'Built rapport with new students.',
			'Introduced the campus environment and shared experiences with new students.',
			'Maintained order for new students during the event.',
		],
	},
	{
		title: 'Head of Security Division – Building Character Day 2023',
		organization: 'Himpunan Mahasiswa Informatika UPN Veteran Jawa Timur',
		period: 'May 2023 – Oct 2023',
		responsibilities: [
			'Organized the annual Building Character Day event for Informatics students.',
			'Led and organized the security division members.',
			'Established security protocols for the event.',
			'Created rules for participants during the event.',
		],
	},
	{
		title: 'Head of Security and Licensing Division – Pelatihan KTI 2023',
		organization: 'Himpunan Mahasiswa Informatika UPN Veteran Jawa Timur',
		period: 'Jul 2023 – Oct 2023',
		responsibilities: [
			'Organized the Pelatihan KTI event for new Informatics students.',
			'Led the security and licensing division team.',
			'Established rules and security protocols for the event.',
			'Managed all security-related issues during the event.',
		],
	},
	{
		title: 'Coordinator of Competition – Fasilkom Fest 2023',
		organization: 'BEM Fakultas Ilmu Komputer UPN Veteran Jawa Timur',
		period: 'Oct 2023 – Dec 2023',
		responsibilities: [
			'Organized the annual Fasilkom Fest event.',
			'Determined the concept and plan for competition activities.',
			'Created implementation instructions for competitions.',
			'Developed technical rundowns for all competition events.',
		],
	},
	{
		title: 'Head of Election Commission – Pemira Fasilkom 2024',
		organization: 'BEM Fakultas Ilmu Komputer UPN Veteran Jawa Timur',
		period: 'Oct 2023 – Dec 2023',
		responsibilities: [
			'Led the election commission for computer science faculty.',
			'Coordinated all KPUM FASILKOM activities.',
			'Provided information regarding policies and activities.',
			'Signed regulations and decisions of KPUM FASILKOM.',
			'Coordinated, organized, and controlled all election stages.',
		],
	},
];

export const techGroups: readonly TechGroup[] = [
	{
		name: 'Machine Learning & AI',
		items: ['Python', 'PyTorch', 'XGBoost', 'Optuna', 'SHAP', 'Scikit-Learn'],
	},
	{
		name: 'Computer Vision',
		items: ['OpenCV', 'MobileNetV2', 'CNN'],
	},
	{
		name: 'Mobile Development',
		items: ['Kotlin', 'Android SDK', 'Flutter'],
	},
	{
		name: 'Web & Backend',
		items: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Laravel', 'PHP'],
	},
	{
		name: 'Database & Engineering',
		items: ['PostgreSQL', 'MySQL', 'SQL', 'Git', 'GitHub', 'Postman'],
	},
	{
		name: 'Design',
		items: ['Figma', 'UI/UX'],
	},
];

// Aliases make the intent clear at route call sites while retaining one source of truth.
export const technicalExperience = experienceData;
export const leadershipExperience = leadershipData;

export type {
	AdditionalExperienceItem,
	ExperienceItem,
	LeadershipItem,
	TechGroup,
} from './types';
