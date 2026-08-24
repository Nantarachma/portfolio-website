import 'server-only';

import { unstable_cache, unstable_noStore } from 'next/cache';
import { draftMode } from 'next/headers';
import { getAdmin, requireAdmin } from '@/lib/auth/admin';
import { hasSupabaseEnvironment } from '@/lib/supabase/env';
import { createPublicClient } from '@/lib/supabase/public';
import { createClient } from '@/lib/supabase/server';
import { parsePortfolioContent, type PortfolioContent } from './schema';
import { seedPortfolio } from './seed';

export interface PublicationStatus {
	version: number;
	publishedAt: string | null;
	draftUpdatedAt: string | null;
	isConfigured: boolean;
}

const fetchPublishedFromSupabase = unstable_cache(
	async () => {
		const supabase = createPublicClient();
		const { data, error } = await supabase
			.from('portfolio_publication')
			.select('content')
			.eq('id', 'main')
			.single();

		if (error) throw new Error(`Gagal memuat portfolio published: ${error.message}`);
		return parsePortfolioContent(data.content);
	},
	['portfolio-publication'],
	{ tags: ['portfolio-content'] },
);

export async function getPublishedPortfolio(): Promise<PortfolioContent> {
	if (!hasSupabaseEnvironment()) return seedPortfolio;
	return fetchPublishedFromSupabase();
}

export async function getDraftPortfolio(): Promise<PortfolioContent> {
	unstable_noStore();
	await requireAdmin();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('portfolio_draft')
		.select('content')
		.eq('id', 'main')
		.single();

	if (error) throw new Error(`Gagal memuat draft: ${error.message}`);
	return parsePortfolioContent(data.content);
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
	const preview = await draftMode();
	if (preview.isEnabled && (await getAdmin())) return getDraftPortfolio();
	return getPublishedPortfolio();
}

export async function getPublicationStatus(): Promise<PublicationStatus> {
	unstable_noStore();
	await requireAdmin();
	const supabase = await createClient();
	const [{ data: publication, error: publicationError }, { data: draft, error: draftError }] =
		await Promise.all([
			supabase
				.from('portfolio_publication')
				.select('version, published_at')
				.eq('id', 'main')
				.single(),
			supabase.from('portfolio_draft').select('updated_at').eq('id', 'main').single(),
		]);

	if (publicationError) throw new Error(publicationError.message);
	if (draftError) throw new Error(draftError.message);

	return {
		version: publication.version,
		publishedAt: publication.published_at,
		draftUpdatedAt: draft.updated_at,
		isConfigured: true,
	};
}
