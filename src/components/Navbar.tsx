'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Research', href: '/research' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' },
] as const;

function isCurrentPath(pathname: string, href: string) {
	return href === '/' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);

	return (
		<header className='sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8'>
				<Link
					href='/'
					className='rounded-sm text-sm font-bold tracking-tight text-slate-950 outline-none transition-colors hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:text-base'
					aria-label={`${profile.name} home`}>
					<span className='sm:hidden'>{profile.shortName}</span>
					<span className='hidden sm:inline'>{profile.name}</span>
				</Link>

				<nav className='hidden items-center gap-1 md:flex' aria-label='Primary navigation'>
					{navigation.map((item) => {
						const isActive = isCurrentPath(pathname, item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={isActive ? 'page' : undefined}
								className={`rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
									isActive
										? 'bg-slate-100 text-slate-950'
										: 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
								}`}>
								{item.name}
							</Link>
						);
					})}
					<a
						href={profile.links.resume.href}
						target='_blank'
						rel='noreferrer'
						className='ml-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
						aria-label='View resume in a new tab'>
						View Resume
					</a>
				</nav>

				<button
					type='button'
					className='inline-flex size-10 items-center justify-center rounded-md text-slate-700 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:hidden'
					onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
					aria-expanded={mobileMenuOpen}
					aria-controls='mobile-navigation'
					aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
					<svg aria-hidden='true' className='size-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						{mobileMenuOpen ? (
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 6 12 12M6 18 18 6' />
						) : (
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
						)}
					</svg>
				</button>
			</div>

			<div
				id='mobile-navigation'
				className={`${mobileMenuOpen ? 'block' : 'hidden'} border-t border-slate-200 bg-white md:hidden`}>
				<nav className='mx-auto max-w-6xl space-y-1 px-4 py-3 sm:px-6' aria-label='Mobile navigation'>
					{navigation.map((item) => {
						const isActive = isCurrentPath(pathname, item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={isActive ? 'page' : undefined}
								onClick={() => setMobileMenuOpen(false)}
								className={`block rounded-md px-3 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
									isActive
										? 'bg-slate-100 text-slate-950'
										: 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
								}`}>
								{item.name}
							</Link>
						);
					})}
					<a
						href={profile.links.resume.href}
						target='_blank'
						rel='noreferrer'
						className='mt-2 block rounded-md border border-slate-300 px-3 py-2.5 text-center text-sm font-semibold text-slate-800 outline-none transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
						aria-label='View resume in a new tab'>
						View Resume
					</a>
				</nav>
			</div>
		</header>
	);
}
