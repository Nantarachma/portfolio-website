import { createClient } from '@/lib/supabase/server';
import HistoryList from './HistoryList';

export default async function HistoryPage() {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('portfolio_revisions')
		.select('id, version, created_at')
		.order('version', { ascending: false })
		.limit(10);

	if (error) throw new Error(`Gagal memuat riwayat: ${error.message}`);

	return (
		<main className='site-container py-10 sm:py-14'>
			<p className='font-mono text-xs font-bold uppercase tracking-widest text-blue-700'>Revision history</p>
			<h1 className='mt-3 text-4xl font-bold tracking-tight'>Riwayat publikasi</h1>
			<p className='mt-3 max-w-2xl leading-7 text-slate-600'>Maksimal 10 versi sebelumnya disimpan. Restore hanya menyalin versi ke draft; preview dan publish tetap diperlukan.</p>
			<HistoryList revisions={data ?? []} />
		</main>
	);
}

