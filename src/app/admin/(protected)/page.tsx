import Link from 'next/link';
import { getDraftPortfolio, getPublicationStatus } from '@/lib/portfolio/repository';
import { publishPortfolioAction } from '../actions';
import AdminActionButton from './AdminActionButton';

export default async function AdminDashboardPage() {
	const [content, status] = await Promise.all([getDraftPortfolio(), getPublicationStatus()]);
	const counts = [
		['Projects', content.projects.length],
		['Experiences', content.experience.length + content.leadership.length + content.additionalOrganizationalExperience.length],
		['Skill groups', content.techGroups.length],
		['Certifications', content.certifications.length],
	] as const;

	return (
		<main className='site-container admin-page'>
			<div className='flex flex-col gap-6 border-b border-slate-300 pb-8 md:flex-row md:items-end md:justify-between'>
				<div>
					<p className='font-mono text-xs font-bold uppercase tracking-widest text-blue-700'>Dashboard</p>
					<h1 className='mt-3 text-4xl font-bold tracking-tight text-slate-950'>Kelola portfolio</h1>
					<p className='mt-3 text-slate-600'>Simpan perubahan sebagai draft, preview seluruh situs, lalu publish secara atomik.</p>
				</div>
				<div className='flex flex-wrap gap-3'>
					<Link href='/admin/preview/enable' className='admin-button admin-button-secondary'>Preview situs</Link>
					<AdminActionButton action={publishPortfolioAction} confirmMessage='Publikasikan draft ini ke website?'>Publish</AdminActionButton>
				</div>
			</div>

			<section className='card-grid mt-8 grid md:grid-cols-3'>
				<div className='admin-panel md:col-span-2'>
					<h2 className='text-lg font-bold text-slate-950'>Status publikasi</h2>
					<dl className='mt-5 grid gap-5 sm:grid-cols-3'>
						<div><dt className='admin-label'>Versi aktif</dt><dd className='mt-1 text-2xl font-bold'>{status.version}</dd></div>
						<div><dt className='admin-label'>Terakhir publish</dt><dd className='mt-1 text-sm font-semibold'>{status.publishedAt ? new Date(status.publishedAt).toLocaleString('id-ID') : 'Belum pernah'}</dd></div>
						<div><dt className='admin-label'>Draft diperbarui</dt><dd className='mt-1 text-sm font-semibold'>{status.draftUpdatedAt ? new Date(status.draftUpdatedAt).toLocaleString('id-ID') : '-'}</dd></div>
					</dl>
				</div>
				<div className='admin-panel flex flex-col justify-between'>
					<div><h2 className='text-lg font-bold'>Edit konten</h2><p className='mt-2 text-sm leading-6 text-slate-600'>Semua data publik dikelola dalam editor terstruktur.</p></div>
					<Link href='/admin/content' className='admin-button admin-button-primary mt-5 text-center'>Buka editor</Link>
				</div>
			</section>

			<section className='card-grid mt-6 grid sm:grid-cols-2 lg:grid-cols-4' aria-label='Jumlah konten'>
				{counts.map(([label, count]) => (
					<div key={label} className='admin-panel'><p className='admin-label'>{label}</p><p className='mt-2 text-3xl font-bold'>{count}</p></div>
				))}
			</section>
		</main>
	);
}

