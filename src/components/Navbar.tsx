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
		<header className='site-header'>
			<div className='site-container site-header__inner'>
				<Link href='/' className='site-brand' aria-label={`${profile.name} home`}>
					<span className='sm:hidden'>{profile.shortName}</span>
					<span className='hidden sm:inline'>{profile.name}</span>
				</Link>

				<nav className='site-nav hidden md:flex' aria-label='Primary navigation'>
					{navigation.map((item) => {
						const isActive = isCurrentPath(pathname, item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={isActive ? 'page' : undefined}
								className='site-nav-link'>
								{item.name}
							</Link>
						);
					})}
					<a
						href={profile.links.resume.href}
						target='_blank'
						rel='noreferrer'
						className='site-resume-link'
						aria-label='View resume in a new tab'>
						View Resume
					</a>
				</nav>

				<button
					type='button'
					className='site-menu-button md:hidden'
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

			<div id='mobile-navigation' className={`${mobileMenuOpen ? 'block' : 'hidden'} site-mobile-panel md:hidden`}>
				<nav className='site-container site-mobile-nav' aria-label='Mobile navigation'>
					{navigation.map((item) => {
						const isActive = isCurrentPath(pathname, item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={isActive ? 'page' : undefined}
								onClick={() => setMobileMenuOpen(false)}
								className='site-mobile-link'>
								{item.name}
							</Link>
						);
					})}
					<a
						href={profile.links.resume.href}
						target='_blank'
						rel='noreferrer'
						className='site-mobile-resume'
						aria-label='View resume in a new tab'>
						View Resume
					</a>
				</nav>
			</div>
		</header>
	);
}
