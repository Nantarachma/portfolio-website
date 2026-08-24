'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface MediaAsset {
	id: string;
	storage_path: string;
	public_url: string;
	alt_text: string;
	mime_type: string;
	size_bytes: number;
	created_at: string;
}

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

export default function MediaLibrary({ initialAssets }: { initialAssets: MediaAsset[] }) {
	const router = useRouter();
	const [message, setMessage] = useState('');
	const [pending, startTransition] = useTransition();
	const [replaceId, setReplaceId] = useState('');

	const upload = async (formData: FormData) => {
		const file = formData.get('file');
		const altText = String(formData.get('altText') ?? '').trim();
		if (!(file instanceof File) || !file.size) return setMessage('Pilih file gambar terlebih dahulu.');
		if (!altText) return setMessage('Alt text wajib diisi.');
		if (!allowedTypes.has(file.type)) return setMessage('Format harus JPG, PNG, atau WebP.');
		if (file.size > 5 * 1024 * 1024) return setMessage('Ukuran file melebihi 5 MB.');

		startTransition(async () => {
			const supabase = createClient();
			const { data: auth } = await supabase.auth.getUser();
			if (!auth.user) return setMessage('Session admin sudah berakhir. Silakan login ulang.');

			const replacing = initialAssets.find(({ id }) => id === replaceId);
			const extension = file.name.split('.').pop()?.toLowerCase() || 'webp';
			const storagePath = replacing?.storage_path ?? `${auth.user.id}/${crypto.randomUUID()}.${extension}`;
			const storage = supabase.storage.from('portfolio-media');
			const result = replacing
				? await storage.update(storagePath, file, { contentType: file.type, cacheControl: '3600' })
				: await storage.upload(storagePath, file, { contentType: file.type, cacheControl: '3600', upsert: false });

			if (result.error) return setMessage(`Upload gagal: ${result.error.message}`);
			const publicUrl = storage.getPublicUrl(storagePath).data.publicUrl;
			const metadata = {
				storage_path: storagePath,
				public_url: publicUrl,
				alt_text: altText,
				mime_type: file.type,
				size_bytes: file.size,
				created_by: auth.user.id,
			};
			const { error } = replacing
				? await supabase.from('media_assets').update(metadata).eq('id', replacing.id)
				: await supabase.from('media_assets').insert(metadata);
			if (error) return setMessage(`Metadata gagal disimpan: ${error.message}`);

			setMessage(replacing ? 'Media berhasil diganti.' : 'Media berhasil diunggah.');
			setReplaceId('');
			router.refresh();
		});
	};

	const remove = (asset: MediaAsset) => {
		if (!window.confirm(`Hapus ${asset.storage_path}? Penghapusan ditolak jika masih direferensikan.`)) return;
		startTransition(async () => {
			const supabase = createClient();
			const { error } = await supabase.rpc('delete_portfolio_media', { asset_id: asset.id });
			setMessage(error ? `Tidak dapat menghapus: ${error.message}` : 'Media berhasil dihapus.');
			if (!error) router.refresh();
		});
	};

	return (
		<div className='mt-8 space-y-6'>
			<form action={upload} className='admin-panel grid gap-4 md:grid-cols-2'>
				<label className='text-sm font-semibold'>File gambar<input name='file' type='file' required accept='image/jpeg,image/png,image/webp' className='admin-input mt-2 file:mr-3 file:border-0 file:bg-slate-200 file:px-3 file:py-1' /></label>
				<label className='text-sm font-semibold'>Alt text<input name='altText' required className='admin-input mt-2' /></label>
				<label className='text-sm font-semibold'>Mode<select value={replaceId} onChange={(event) => setReplaceId(event.target.value)} className='admin-input mt-2'><option value=''>Upload asset baru</option>{initialAssets.map((asset) => <option key={asset.id} value={asset.id}>Replace: {asset.storage_path}</option>)}</select></label>
				<div className='flex items-end'><button disabled={pending} className='admin-button admin-button-primary' type='submit'>{pending ? 'Memproses...' : replaceId ? 'Replace media' : 'Upload media'}</button></div>
				{message ? <p role='status' className='text-sm text-slate-700 md:col-span-2'>{message}</p> : null}
			</form>

			<div className='card-grid grid sm:grid-cols-2 lg:grid-cols-3'>
				{initialAssets.map((asset) => (
					<article key={asset.id} className='admin-panel overflow-hidden p-0'>
						<div className='relative aspect-video bg-slate-200'><Image src={asset.public_url} alt={asset.alt_text} fill sizes='(min-width:1024px) 33vw, 50vw' className='object-cover' /></div>
						<div className='p-4'><p className='font-semibold'>{asset.alt_text}</p><p className='safe-wrap mt-1 text-xs text-slate-500'>{asset.storage_path}</p><p className='mt-2 text-xs text-slate-500'>{(asset.size_bytes / 1024).toFixed(1)} KB · {asset.mime_type}</p><div className='mt-4 flex flex-wrap gap-2'><button type='button' className='admin-mini-button' onClick={() => navigator.clipboard.writeText(asset.public_url)}>Salin URL</button><button type='button' disabled={pending} className='admin-mini-button text-red-700' onClick={() => remove(asset)}>Hapus</button></div></div>
					</article>
				))}
			</div>
			{!initialAssets.length ? <p className='admin-panel text-sm text-slate-600'>Belum ada media.</p> : null}
		</div>
	);
}

