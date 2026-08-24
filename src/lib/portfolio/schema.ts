import { z } from 'zod';

export const projectCategoryKeys = [
	'machine-learning',
	'computer-vision',
	'mobile',
	'web',
	'research',
	'ui-ux',
	'cybersecurity',
] as const;

export const projectVisualKinds = [
	'pipeline',
	'feature-fusion',
	'mobile-flow',
	'delivery-flow',
	'classification-flow',
	'document-flow',
] as const;

const contentIdSchema = z.string().uuid('ID konten harus berupa UUID.');
const optionalText = z.string().trim().optional();
const optionalUrl = z
	.string()
	.trim()
	.optional()
	.refine(
		(value) => !value || value.startsWith('/') || value.startsWith('mailto:') || value.startsWith('https://'),
		'Gunakan URL HTTPS, mailto, atau path yang diawali /.',
	);

const profileLinkSchema = z.object({
	label: z.string().trim().min(1),
	href: z.string().trim().min(1),
	external: z.boolean().optional(),
});

export const profileSchema = z.object({
	name: z.string().trim().min(1),
	shortName: z.string().trim().min(1),
	role: z.string().trim().min(1),
	eyebrow: z.string().trim().min(1),
	intro: z.string().trim().min(1),
	bio: z.string().trim().min(1),
	email: z.string().trim().email(),
	phone: z.string().trim().min(1),
	location: z.string().trim().min(1),
	portrait: z.object({
		src: z.string().trim().min(1),
		alt: z.string().trim().min(1),
	}),
	links: z.object({
		github: profileLinkSchema,
		linkedin: profileLinkSchema,
		email: profileLinkSchema,
		whatsapp: profileLinkSchema,
		resumeEnglish: profileLinkSchema,
		resumeIndonesian: profileLinkSchema,
	}),
});

const projectEvidenceSchema = z.object({
	contentId: contentIdSchema,
	label: z.string().trim().min(1),
	href: optionalUrl,
	kind: z.enum(['repository', 'publication', 'presentation', 'external']).optional(),
});

const projectSchema = z.object({
	contentId: contentIdSchema,
	id: z.number().int().positive(),
	slug: z
		.string()
		.trim()
		.min(1)
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.'),
	title: z.string().trim().min(1),
	shortTitle: optionalText,
	subtitle: optionalText,
	summary: z.string().trim().min(1),
	categories: z.array(z.enum(projectCategoryKeys)).min(1),
	role: optionalText,
	period: optionalText,
	context: optionalText,
	tech: z.array(z.string().trim().min(1)),
	featured: z.boolean().optional(),
	image: optionalUrl,
	githubUrl: optionalUrl,
	demoUrl: optionalUrl,
	externalUrl: optionalUrl,
	caseStudy: z
		.object({
			overview: optionalText,
			objective: optionalText,
			contribution: z.array(z.string().trim().min(1)).optional(),
			methodology: z.array(z.string().trim().min(1)).optional(),
			workflow: z.array(z.string().trim().min(1)).optional(),
			evidence: z.array(projectEvidenceSchema).optional(),
		})
		.optional(),
	visual: z
		.object({
			kind: z.enum(projectVisualKinds),
			label: z.string().trim().min(1),
			steps: z.array(z.string().trim().min(1)).optional(),
		})
		.optional(),
});

const experienceSchema = z.object({
	contentId: contentIdSchema,
	organization: z.string().trim().min(1),
	role: z.string().trim().min(1),
	period: z.string().trim().min(1),
	location: optionalText,
	context: optionalText,
	contributions: z.array(z.string().trim().min(1)),
});

const leadershipSchema = z.object({
	contentId: contentIdSchema,
	organization: z.string().trim().min(1),
	role: z.string().trim().min(1),
	period: z.string().trim().min(1),
	focus: z.array(z.string().trim().min(1)),
});

const organizationalExperienceSchema = z.object({
	contentId: contentIdSchema,
	title: z.string().trim().min(1),
	organization: z.string().trim().min(1),
	period: z.string().trim().min(1),
	responsibilities: z.array(z.string().trim().min(1)),
});

const certificationSchema = z.object({
	contentId: contentIdSchema,
	title: z.string().trim().min(1),
	issuer: z.string().trim().min(1),
	issueDate: optionalText,
	url: optionalUrl,
	featured: z.boolean().optional(),
});

const uniqueContentIds = (
	items: readonly { contentId: string }[],
	ctx: z.RefinementCtx,
	path: (string | number)[],
) => {
	const seen = new Set<string>();
	items.forEach((item, index) => {
		if (seen.has(item.contentId)) {
			ctx.addIssue({ code: 'custom', message: 'UUID konten harus unik.', path: [...path, index, 'contentId'] });
		}
		seen.add(item.contentId);
	});
};

export const portfolioContentSchema = z
	.object({
		schemaVersion: z.literal(1),
		profile: profileSchema,
		education: z.object({
			institution: z.string().trim().min(1),
			degree: z.string().trim().min(1),
			period: z.string().trim().min(1),
			gpa: z.string().trim().min(1),
			thesis: z.string().trim().min(1),
		}),
		credibilityHighlights: z.array(
			z.object({
				contentId: contentIdSchema,
				value: z.string().trim().min(1),
				label: z.string().trim().min(1),
			}),
		),
		projectCategories: z.array(
			z.object({
				contentId: contentIdSchema,
				key: z.enum(projectCategoryKeys),
				label: z.string().trim().min(1),
				filterVisible: z.boolean(),
			}),
		),
		projects: z.array(projectSchema),
		experience: z.array(experienceSchema),
		leadership: z.array(leadershipSchema),
		additionalOrganizationalExperience: z.array(organizationalExperienceSchema),
		techGroups: z.array(
			z.object({
				contentId: contentIdSchema,
				name: z.string().trim().min(1),
				items: z.array(z.string().trim().min(1)),
			}),
		),
		certifications: z.array(certificationSchema),
		projectRedirects: z.array(
			z.object({
				contentId: contentIdSchema,
				from: z.string().trim().min(1),
				to: z.string().trim().min(1),
			}),
		),
	})
	.superRefine((content, ctx) => {
		const allItems: { contentId: string }[] = [
			...content.credibilityHighlights,
			...content.projectCategories,
			...content.projects,
			...content.projects.flatMap((project) => project.caseStudy?.evidence ?? []),
			...content.experience,
			...content.leadership,
			...content.additionalOrganizationalExperience,
			...content.techGroups,
			...content.certifications,
			...content.projectRedirects,
		];
		uniqueContentIds(allItems, ctx, []);

		const slugs = new Set<string>();
		const legacyIds = new Set<number>();
		content.projects.forEach((project, index) => {
			if (slugs.has(project.slug)) {
				ctx.addIssue({ code: 'custom', message: 'Slug project harus unik.', path: ['projects', index, 'slug'] });
			}
			slugs.add(project.slug);
			if (legacyIds.has(project.id)) {
				ctx.addIssue({ code: 'custom', message: 'Nomor project harus unik.', path: ['projects', index, 'id'] });
			}
			legacyIds.add(project.id);
		});

		const categoryKeys = new Set<string>();
		content.projectCategories.forEach((category, index) => {
			if (categoryKeys.has(category.key)) {
				ctx.addIssue({ code: 'custom', message: 'Key kategori harus unik.', path: ['projectCategories', index, 'key'] });
			}
			categoryKeys.add(category.key);
		});
		content.projects.forEach((project, projectIndex) => {
			project.categories.forEach((category, categoryIndex) => {
				if (!categoryKeys.has(category)) {
					ctx.addIssue({
						code: 'custom',
						message: 'Kategori project belum terdaftar.',
						path: ['projects', projectIndex, 'categories', categoryIndex],
					});
				}
			});
		});

		const redirectSources = new Set<string>();
		content.projectRedirects.forEach((redirect, index) => {
			if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(redirect.from) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(redirect.to)) {
				ctx.addIssue({ code: 'custom', message: 'Slug redirect tidak valid.', path: ['projectRedirects', index] });
			}
			if (redirectSources.has(redirect.from)) {
				ctx.addIssue({ code: 'custom', message: 'Sumber redirect harus unik.', path: ['projectRedirects', index, 'from'] });
			}
			if (!slugs.has(redirect.to)) {
				ctx.addIssue({ code: 'custom', message: 'Tujuan redirect harus merujuk ke project aktif.', path: ['projectRedirects', index, 'to'] });
			}
			redirectSources.add(redirect.from);
		});
	});

export type PortfolioContent = z.infer<typeof portfolioContentSchema>;
export type PortfolioProject = PortfolioContent['projects'][number];
export type PortfolioProjectCategory = PortfolioProject['categories'][number];
export type PortfolioProfile = PortfolioContent['profile'];

export function parsePortfolioContent(input: unknown): PortfolioContent {
	return portfolioContentSchema.parse(input);
}
