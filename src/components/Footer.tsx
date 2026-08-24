'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PortfolioProfile } from '@/lib/portfolio/schema';

export default function Footer({ profile }: { profile: PortfolioProfile }) {
	const pathname = usePathname();
	const currentYear = new Date().getFullYear();
	const profileLinks = [profile.links.github, profile.links.linkedin, profile.links.email] as const;
	const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/auth');

	if (isAdminRoute) return null;

	return (
		<footer className='site-footer'>
			<div className='site-container site-footer__inner'>
				<div className='site-footer__primary'>
					<div>
						<Link href='/' className='site-footer__brand'>
							{profile.name}
						</Link>
						<p className='site-footer__role'>{profile.role}</p>
					</div>

					<nav className='site-footer__links' aria-label='Profile links'>
						{profileLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target={link.href.startsWith('mailto:') ? undefined : '_blank'}
								rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
								className='site-footer__link'>
								{link.label}
							</a>
						))}
					</nav>
				</div>

				<p className='site-footer__copyright'>
					&copy; {currentYear} {profile.name}
				</p>
			</div>
		</footer>
	);
}
