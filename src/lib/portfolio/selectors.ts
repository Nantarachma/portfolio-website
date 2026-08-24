import type { PortfolioContent, PortfolioProject, PortfolioProjectCategory } from './schema';

export const getProfile = (content: PortfolioContent) => content.profile;
export const getExperience = (content: PortfolioContent) => content.experience;
export const getLeadership = (content: PortfolioContent) => content.leadership;
export const getCertifications = (content: PortfolioContent) => content.certifications;

export function getCategoryLabels(content: PortfolioContent): Record<PortfolioProjectCategory, string> {
	return Object.fromEntries(content.projectCategories.map(({ key, label }) => [key, label])) as Record<
		PortfolioProjectCategory,
		string
	>;
}

export function getFilterCategories(content: PortfolioContent): PortfolioProjectCategory[] {
	return content.projectCategories.filter(({ filterVisible }) => filterVisible).map(({ key }) => key);
}

export function getFeaturedProjects(content: PortfolioContent): PortfolioProject[] {
	return content.projects.filter(({ featured }) => featured);
}

export function getResearchProjects(content: PortfolioContent): PortfolioProject[] {
	return content.projects.filter(({ slug }) =>
		['nids-optimization', 'corn-leaf-disease-classification', 'bone-fracture-detection'].includes(slug),
	);
}

export function getOtherResearchProjects(content: PortfolioContent): PortfolioProject[] {
	const primaryIds = new Set(getResearchProjects(content).map(({ contentId }) => contentId));
	return content.projects.filter(
		(project) => project.categories.includes('research') && !primaryIds.has(project.contentId),
	);
}

export function getProjectBySlug(content: PortfolioContent, slug: string): PortfolioProject | undefined {
	return content.projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(
	content: PortfolioContent,
	slug: string,
	limit = 3,
): PortfolioProject[] {
	const currentProject = getProjectBySlug(content, slug);
	if (!currentProject) return [];

	return content.projects
		.filter(
		(project) =>
			project.slug !== currentProject.slug &&
			project.categories.some((category) => currentProject.categories.includes(category)),
		)
		.slice(0, limit);
}

export function getFeaturedCertifications(content: PortfolioContent) {
	return content.certifications.filter(({ featured }) => featured);
}
