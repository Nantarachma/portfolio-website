import { describe, expect, it } from 'vitest';
import { certifications } from '@/data/certifications';
import { projects } from '@/data/projects';
import { portfolioContentSchema } from './schema';
import { seedPortfolio, stableContentId } from './seed';
import {
	getCategoryLabels,
	getFeaturedProjects,
	getProfile,
	getProjectBySlug,
	getRelatedProjects,
} from './selectors';

describe('portfolio content schema and seed', () => {
	it('validates the deterministic seed', () => {
		expect(portfolioContentSchema.safeParse(seedPortfolio).success).toBe(true);
	});

	it('preserves static data parity', () => {
		expect(seedPortfolio.projects).toHaveLength(9);
		expect(seedPortfolio.certifications).toHaveLength(23);
		expect(seedPortfolio.projects.map(({ slug }) => slug)).toEqual(projects.map(({ slug }) => slug));
		expect(seedPortfolio.certifications.map(({ title }) => title)).toEqual(certifications.map(({ title }) => title));
	});

	it('creates stable unique UUIDs and order', () => {
		expect(stableContentId('project', 0)).toBe(stableContentId('project', 0));
		const ids = [
			...seedPortfolio.projects.map(({ contentId }) => contentId),
			...seedPortfolio.certifications.map(({ contentId }) => contentId),
		];
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('rejects duplicate slugs and invalid slugs', () => {
		const duplicate = structuredClone(seedPortfolio);
		duplicate.projects[1].slug = duplicate.projects[0].slug;
		expect(portfolioContentSchema.safeParse(duplicate).success).toBe(false);

		const invalid = structuredClone(seedPortfolio);
		invalid.projects[0].slug = 'Invalid Slug';
		expect(portfolioContentSchema.safeParse(invalid).success).toBe(false);
	});

	it('rejects duplicate UUIDs and keeps array ordering authoritative', () => {
		const duplicateId = structuredClone(seedPortfolio);
		duplicateId.certifications[1].contentId = duplicateId.certifications[0].contentId;
		expect(portfolioContentSchema.safeParse(duplicateId).success).toBe(false);
		expect(seedPortfolio.projects.map(({ id }) => id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	});
});

describe('portfolio selectors', () => {
	it('selects projects, labels, and related records from one document', () => {
		expect(getFeaturedProjects(seedPortfolio)).toHaveLength(3);
		expect(getProjectBySlug(seedPortfolio, 'shara')?.title).toBe('SHARA');
		expect(getCategoryLabels(seedPortfolio).mobile).toBe('Mobile');
		expect(getRelatedProjects(seedPortfolio, 'shara', 2)).toHaveLength(2);
		expect(getProfile(seedPortfolio).email).toBe('ibnurachmananta@gmail.com');
	});

	it('validates URLs and optional certification dates', () => {
		const invalidUrl = structuredClone(seedPortfolio);
		invalidUrl.projects[0].githubUrl = 'javascript:alert(1)';
		expect(portfolioContentSchema.safeParse(invalidUrl).success).toBe(false);
		expect(seedPortfolio.certifications.some(({ issueDate }) => !issueDate)).toBe(true);
	});
});
