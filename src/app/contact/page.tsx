import type { Metadata } from 'next';
import Link from 'next/link';
import { getPortfolioContent } from '@/lib/portfolio/repository';

export const metadata: Metadata = {
	title: 'Contact',
	description: 'Contact Rachmananta Ibnu Fajar about machine learning, software engineering, and mobile development opportunities.',
};

export default async function ContactPage() {
	const { profile } = await getPortfolioContent();
	const contactOptions = [
		{ label: 'Email', value: profile.email, href: profile.links.email.href, description: 'For opportunities, collaborations, and project conversations.' },
		{ label: 'LinkedIn', value: 'linkedin.com/in/nantarachma', href: profile.links.linkedin.href, description: 'Connect professionally and view the latest profile updates.' },
		{ label: 'GitHub', value: 'github.com/NantaRachma', href: profile.links.github.href, description: 'Explore available source code and development work.' },
		{ label: 'WhatsApp', value: profile.phone, href: profile.links.whatsapp.href, description: 'Start a direct conversation about opportunities or collaboration.' },
	] as const;
	return (
		<div className='site-container page-section'>
			<section className='content-split grid lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.75fr)] lg:items-start'>
				<div>
					<p className='eyebrow'>Contact</p>
					<h1 className='page-title safe-wrap mt-4 max-w-2xl text-balance font-bold text-slate-950'>
						Let&apos;s work together.
					</h1>
					<p className='lead-text mt-6 text-slate-600'>
						I&apos;m open to software engineering, machine learning, mobile development, and collaborative project opportunities.
					</p>
					<div className='hero-actions mt-8'>
						<a
							href={profile.links.email.href}
							className='inline-flex items-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800'>
							Email Rachmananta
						</a>
						<a
							href={profile.links.resumeEnglish.href}
							target='_blank'
							rel='noreferrer'
							className='inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50'>
							English Resume
						</a>
						<a
							href={profile.links.resumeIndonesian.href}
							target='_blank'
							rel='noreferrer'
							className='inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50'>
							Indonesian Resume
						</a>
					</div>
				</div>

				<aside className='surface card-pad rounded-2xl' aria-label='Contact details'>
					<p className='text-sm font-semibold text-slate-950'>Based in</p>
					<p className='mt-1 text-slate-600'>{profile.location}</p>
					<p className='mt-7 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-600'>
						Reach me by email, LinkedIn, or WhatsApp. Both English and Indonesian resumes are available online.
					</p>
				</aside>
			</section>

			<section className='mt-[var(--space-section-compact)]' aria-labelledby='contact-methods-heading'>
				<h2 id='contact-methods-heading' className='section-title font-bold text-slate-950'>
					Contact details
				</h2>
				<div className='card-grid mt-6 grid md:grid-cols-2 xl:grid-cols-4'>
					{contactOptions.map((option) => (
						<a
							key={option.label}
							href={option.href}
							target={option.href.startsWith('mailto:') ? undefined : '_blank'}
							rel={option.href.startsWith('mailto:') ? undefined : 'noreferrer'}
							className='surface card-pad group min-w-0 rounded-xl transition-[border-color,box-shadow] duration-200 hover:border-blue-300 hover:shadow-sm'>
							<p className='text-sm font-semibold text-slate-950'>{option.label}</p>
							<p className='safe-wrap mt-3 text-sm font-medium text-blue-700 group-hover:text-blue-800'>
								{option.value}
							</p>
							<p className='mt-3 text-sm leading-6 text-slate-600'>{option.description}</p>
						</a>
					))}
				</div>
			</section>

			<div className='mt-[var(--space-section-compact)] border-t border-slate-200 pt-8 text-sm text-slate-600'>
				<Link href='/projects' className='font-semibold text-blue-700 hover:text-blue-800'>
					View selected work
				</Link>
				<span aria-hidden='true'> before getting in touch.</span>
			</div>
		</div>
	);
}
