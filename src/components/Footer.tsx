import Link from 'next/link';
import { profile } from '@/data/profile';

const profileLinks = [profile.links.github, profile.links.linkedin, profile.links.email] as const;

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='border-t border-slate-200 bg-white'>
			<div className='mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8'>
				<div className='flex flex-col justify-between gap-6 sm:flex-row sm:items-end'>
					<div>
						<Link
							href='/'
							className='rounded-sm text-base font-bold tracking-tight text-slate-950 outline-none transition-colors hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'>
							{profile.name}
						</Link>
						<p className='mt-2 text-sm text-slate-600'>{profile.role}</p>
					</div>

					<nav className='flex flex-wrap gap-x-5 gap-y-3' aria-label='Profile links'>
						{profileLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target={link.href.startsWith('mailto:') ? undefined : '_blank'}
								rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
								className='rounded-sm text-sm font-medium text-slate-600 outline-none transition-colors hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'>
								{link.label}
							</a>
						))}
					</nav>
				</div>

				<p className='border-t border-slate-200 pt-5 text-sm text-slate-500'>
					© {currentYear} {profile.name}
				</p>
			</div>
		</footer>
	);
}
