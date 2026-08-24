import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/admin';
import { logoutAction } from '../actions';

const links = [
	{ href: '/admin', label: 'Dashboard' },
	{ href: '/admin/content', label: 'Konten' },
	{ href: '/admin/media', label: 'Media' },
	{ href: '/admin/history', label: 'Riwayat' },
] as const;

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
	const user = await requireAdmin();

	return (
		<div className='min-h-[70vh]'>
			<header className='border-b border-slate-300 bg-slate-950 text-white'>
				<div className='site-container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between'>
					<div>
						<p className='font-mono text-[10px] font-bold uppercase tracking-widest text-blue-300'>Portfolio CMS</p>
						<p className='mt-1 text-sm text-slate-300'>{user.email}</p>
					</div>
					<nav className='flex flex-wrap items-center gap-2' aria-label='Navigasi admin'>
						{links.map((link) => (
							<Link key={link.href} href={link.href} className='rounded px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white'>
								{link.label}
							</Link>
						))}
						<form action={logoutAction}>
							<button type='submit' className='rounded border border-slate-600 px-3 py-2 text-sm font-semibold hover:border-white'>Keluar</button>
						</form>
					</nav>
				</div>
			</header>
			{children}
		</div>
	);
}

