/**
 * Shared content contracts for the portfolio. Keep facts here qualitative unless
 * a source can be linked and verified; project metrics intentionally have no
 * field in this model.
 */

export const projectCategories = [
	'machine-learning',
	'computer-vision',
	'mobile',
	'web',
	'research',
	'ui-ux',
	'cybersecurity',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectVisualKind =
	| 'pipeline'
	| 'feature-fusion'
	| 'mobile-flow'
	| 'delivery-flow'
	| 'classification-flow'
	| 'document-flow';

export interface ProjectEvidence {
	label: string;
	href?: string;
	kind?: 'repository' | 'publication' | 'presentation' | 'external';
}

export interface ProjectCaseStudy {
	overview?: string;
	objective?: string;
	contribution?: readonly string[];
	methodology?: readonly string[];
	workflow?: readonly string[];
	evidence?: readonly ProjectEvidence[];
}

export interface ProjectVisual {
	/** A conceptual, non-product-screenshot visual to use when image is absent. */
	kind: ProjectVisualKind;
	label: string;
	steps?: readonly string[];
}

export interface Project {
	/** Preserved while legacy route code is migrated; use slug for new code. */
	id: number;
	slug: string;
	title: string;
	shortTitle?: string;
	subtitle?: string;
	summary: string;
	categories: readonly ProjectCategory[];
	role?: string;
	period?: string;
	context?: string;
	tech: readonly string[];
	featured?: boolean;
	/** Optional verified asset under /public. Leave absent to use ProjectVisual. */
	image?: string;
	githubUrl?: string;
	demoUrl?: string;
	externalUrl?: string;
	caseStudy?: ProjectCaseStudy;
	visual?: ProjectVisual;
}

export interface ProfileLink {
	label: string;
	href: string;
	external?: boolean;
}

export interface Profile {
	name: string;
	shortName: string;
	role: string;
	eyebrow: string;
	intro: string;
	bio: string;
	email: string;
	phone: string;
	location: string;
	portrait: {
		src: string;
		alt: string;
	};
	links: {
		github: ProfileLink;
		linkedin: ProfileLink;
		email: ProfileLink;
		whatsapp: ProfileLink;
		resumeEnglish: ProfileLink;
		resumeIndonesian: ProfileLink;
	};
}

export interface ExperienceItem {
	organization: string;
	role: string;
	period: string;
	location?: string;
	context?: string;
	contributions: readonly string[];
}

export interface LeadershipItem {
	organization: string;
	role: string;
	period: string;
	focus: readonly string[];
}

export interface AdditionalExperienceItem {
	title: string;
	organization: string;
	period: string;
	responsibilities: readonly string[];
}

export interface TechGroup {
	name: string;
	items: readonly string[];
}

export interface Certification {
	title: string;
	issuer: string;
	issueDate?: string;
	url?: string;
	featured?: boolean;
}
