'use client';

import Link from 'next/link';

import type { PortfolioProfile } from '@/lib/portfolio/schema';

export default function Footer({ profile }: { profile: PortfolioProfile }) {

	const currentYear = new Date().getFullYear();



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

					<nav className='site-footer__links' aria-label='Footer'>
						<a href='#top' className='site-footer__link'>
							Back to top
						</a>
					</nav>
				</div>

				<p className='site-footer__copyright'>
					&copy; {currentYear} {profile.name}
				</p>
			</div>
		</footer>
	);
}
