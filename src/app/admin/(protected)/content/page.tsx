import { getDraftPortfolio, getPublishedPortfolio } from '@/lib/portfolio/repository';
import ContentEditor from './ContentEditor';

export default async function ContentPage() {
	const [draft, published] = await Promise.all([getDraftPortfolio(), getPublishedPortfolio()]);
	const publishedSlugs = Object.fromEntries(
		published.projects.map(({ contentId, slug }) => [contentId, slug]),
	);

	return (
		<main className='site-container py-10 sm:py-14'>
			<div className='max-w-3xl'>
				<p className='font-mono text-xs font-bold uppercase tracking-widest text-blue-700'>Editor draft</p>
				<h1 className='mt-3 text-4xl font-bold tracking-tight text-slate-950'>Konten portfolio</h1>
				<p className='mt-3 leading-7 text-slate-600'>Perubahan hanya tersimpan di draft. Gunakan preview sebelum mempublikasikannya.</p>
			</div>
			<ContentEditor initialContent={draft} publishedSlugs={publishedSlugs} />
		</main>
	);
}

