import { certifications } from '@/data/certifications';
import {
	additionalOrganizationalExperience,
	experienceData,
	leadershipData,
	techGroups,
} from '@/data/experience';
import { credibilityHighlights, education, profile } from '@/data/profile';
import {
	projectCategoryLabels,
	projectFilterCategories,
	projects,
} from '@/data/projects';
import { parsePortfolioContent, type PortfolioContent } from './schema';

const groupCodes = {
	highlight: 1,
	category: 2,
	project: 3,
	evidence: 4,
	experience: 5,
	leadership: 6,
	organization: 7,
	skill: 8,
	certification: 9,
	redirect: 10,
} as const;

export function stableContentId(group: keyof typeof groupCodes, index: number): string {
	const suffix = `${groupCodes[group]}`.padStart(2, '0') + `${index + 1}`.padStart(10, '0');
	return `10000000-0000-4000-8000-${suffix}`;
}

const mutableStrings = (items?: readonly string[]) => (items ? [...items] : undefined);

export function createSeedPortfolio(): PortfolioContent {
	let evidenceIndex = 0;
	const content = {
		schemaVersion: 1 as const,
		profile: {
			...profile,
			portrait: { ...profile.portrait },
			links: {
				github: { ...profile.links.github },
				linkedin: { ...profile.links.linkedin },
				email: { ...profile.links.email },
				whatsapp: { ...profile.links.whatsapp },
				resumeEnglish: { ...profile.links.resumeEnglish },
				resumeIndonesian: { ...profile.links.resumeIndonesian },
			},
		},
		education: { ...education },
		credibilityHighlights: credibilityHighlights.map((highlight, index) => ({
			contentId: stableContentId('highlight', index),
			...highlight,
		})),
		projectCategories: Object.entries(projectCategoryLabels).map(([key, label], index) => ({
			contentId: stableContentId('category', index),
			key,
			label,
			filterVisible: projectFilterCategories.includes(key as (typeof projectFilterCategories)[number]),
		})),
		projects: projects.map((project, index) => ({
			...project,
			contentId: stableContentId('project', index),
			categories: [...project.categories],
			tech: [...project.tech],
			caseStudy: project.caseStudy
				? {
					...project.caseStudy,
					contribution: mutableStrings(project.caseStudy.contribution),
					methodology: mutableStrings(project.caseStudy.methodology),
					workflow: mutableStrings(project.caseStudy.workflow),
					evidence: project.caseStudy.evidence?.map((evidence) => ({
						...evidence,
						contentId: stableContentId('evidence', evidenceIndex++),
					})),
				}
				: undefined,
			visual: project.visual
				? { ...project.visual, steps: mutableStrings(project.visual.steps) }
				: undefined,
		})),
		experience: experienceData.map((item, index) => ({
			...item,
			contentId: stableContentId('experience', index),
			contributions: [...item.contributions],
		})),
		leadership: leadershipData.map((item, index) => ({
			...item,
			contentId: stableContentId('leadership', index),
			focus: [...item.focus],
		})),
		additionalOrganizationalExperience: additionalOrganizationalExperience.map((item, index) => ({
			...item,
			contentId: stableContentId('organization', index),
			responsibilities: [...item.responsibilities],
		})),
		techGroups: techGroups.map((group, index) => ({
			...group,
			contentId: stableContentId('skill', index),
			items: [...group.items],
		})),
		certifications: certifications.map((certification, index) => ({
			...certification,
			contentId: stableContentId('certification', index),
		})),
		projectRedirects: [],
	};

	return parsePortfolioContent(content);
}

export const seedPortfolio = createSeedPortfolio();

