import { createClient } from '@supabase/supabase-js';
import { loadEnvConfig } from '@next/env';
import { seedPortfolio } from '../src/lib/portfolio/seed';

loadEnvConfig(process.cwd());

async function main() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const secretKey = process.env.SUPABASE_SECRET_KEY;

	if (!url || !secretKey) {
		throw new Error('NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SECRET_KEY wajib diisi untuk seed.');
	}

	const supabase = createClient(url, secretKey, {
		auth: { persistSession: false, autoRefreshToken: false },
	});

	const now = new Date().toISOString();
	const { data: currentDraft, error: draftReadError } = await supabase
		.from('portfolio_draft')
		.select('id')
		.eq('id', 'main')
		.maybeSingle();
	if (draftReadError) throw draftReadError;

	if (!currentDraft) {
		const { error } = await supabase.from('portfolio_draft').insert({
			id: 'main',
			content: seedPortfolio,
			updated_at: now,
			updated_by: null,
		});
		if (error) throw error;
	}

	const { data: currentPublication, error: publicationReadError } = await supabase
		.from('portfolio_publication')
		.select('id')
		.eq('id', 'main')
		.maybeSingle();
	if (publicationReadError) throw publicationReadError;

	if (!currentPublication) {
		const { error } = await supabase.from('portfolio_publication').insert({
			id: 'main',
			content: seedPortfolio,
			version: 1,
			published_at: now,
			published_by: null,
		});
		if (error) throw error;
	}

	console.log(`Seed selesai. Draft: ${currentDraft ? 'sudah ada' : 'dibuat'}; publication: ${currentPublication ? 'sudah ada' : 'dibuat'}.`);
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
