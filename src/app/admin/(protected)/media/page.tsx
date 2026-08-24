import { createClient } from '@/lib/supabase/server';
import MediaLibrary, { type MediaAsset } from './MediaLibrary';

export default async function MediaPage() {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('media_assets')
		.select('id, storage_path, public_url, alt_text, mime_type, size_bytes, created_at')
		.order('created_at', { ascending: false });

	if (error) throw new Error(`Gagal memuat media: ${error.message}`);

	return (
		<main className='site-container py-10 sm:py-14'>
			<p className='font-mono text-xs font-bold uppercase tracking-widest text-blue-700'>Supabase Storage</p>
			<h1 className='mt-3 text-4xl font-bold tracking-tight'>Media library</h1>
			<p className='mt-3 max-w-2xl leading-7 text-slate-600'>JPG, PNG, atau WebP maksimal 5 MB. Alt text wajib. Salin URL media ke field image atau portrait pada editor konten.</p>
			<MediaLibrary initialAssets={(data ?? []) as MediaAsset[]} />
		</main>
	);
}

