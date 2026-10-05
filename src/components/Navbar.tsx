'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { SECTION_EVENT } from '@/components/effects/ScrollEffects';
import type { PortfolioProfile } from '@/lib/portfolio/schema';

const navigation = [
	{ name: 'Home', href: '/', key: 'home' },
	{ name: 'Work', href: '/#work', key: 'work' },
	{ name: 'Research', href: '/#research', key: 'research' },
	{ name: 'About', href: '/#about', key: 'about' },
	{ name: 'Contact', href: '/#contact', key: 'contact' },
] as const;

/** Section in view on the home page, kept in sync by ScrollEffects. */
function isCurrentPath(pathname: string, key: (typeof navigation)[number]['key'], activeSection: string) {
	// The projects index is the full "Work" listing.
	if (pathname.startsWith('/projects')) return key === 'work';
	if (pathname !== '/') return false;
	if (key === 'home') return activeSection === 'home';
	return activeSection === key;
}

export default function Navbar({ profile }: { profile: PortfolioProfile }) {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('');
	const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/auth');

	useEffect(() => {
		const onSectionChange = (event: Event) => setActiveSection((event as CustomEvent<string>).detail);
		window.addEventListener(SECTION_EVENT, onSectionChange);
		return () => window.removeEventListener(SECTION_EVENT, onSectionChange);
	}, []);

	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);

	if (isAdminRoute) return null;

	return (
		<header className='site-header'>
			<div className='site-container site-header__inner'>
				<Link href='/' className='site-brand' aria-label={`${profile.name} home`}>
					<span className='sm:hidden'>{profile.shortName}</span>
					<span className='hidden sm:inline'>{profile.name}</span>
				</Link>

				<nav className='site-nav hidden lg:flex' aria-label='Primary navigation'>
					{navigation.map((item) => {
						const isActive = isCurrentPath(pathname, item.key, activeSection);

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
				</nav>

				<a
					href={profile.links.whatsapp.href}
					target='_blank'
					rel='noreferrer'
					className='site-header-action hidden lg:inline-flex'
					aria-label='Open WhatsApp chat in a new tab'>
					<FaWhatsapp className='site-whatsapp-icon' aria-hidden='true' />
					<span>WhatsApp</span>
				</a>

				<button
					type='button'
					className='site-menu-button lg:hidden'
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

			<div id='mobile-navigation' className={`${mobileMenuOpen ? 'block' : 'hidden'} site-mobile-panel lg:hidden`}>
				<nav className='site-container site-mobile-nav' aria-label='Mobile navigation'>
					{navigation.map((item) => {
						const isActive = isCurrentPath(pathname, item.key, activeSection);

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
						href={profile.links.whatsapp.href}
						target='_blank'
						rel='noreferrer'
						className='site-mobile-action'
						aria-label='Open WhatsApp chat in a new tab'>
						<FaWhatsapp className='site-whatsapp-icon' aria-hidden='true' />
						<span>WhatsApp</span>
					</a>
				</nav>
			</div>
		</header>
	);
}
