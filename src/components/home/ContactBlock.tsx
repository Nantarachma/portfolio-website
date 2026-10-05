import type { PortfolioProfile } from '@/lib/portfolio/schema';

function Arrow() {
	return (
		<span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>
			&rarr;
		</span>
	);
}

export default function ContactBlock({ profile }: { profile: PortfolioProfile }) {
	const secondaryLinks = [
		profile.links.github,
		profile.links.resumeEnglish,
		profile.links.resumeIndonesian,
	] as const;

	return (
		<section
			id='contact'
			data-nav-section='contact'
			data-header-theme='dark'
			className='page-block block-overlap bg-[#14161a] text-[#eef1f6]'>
			<div className='site-container page-section'>
				<div className='grid gap-10 lg:grid-cols-12'>
					<div className='min-w-0 lg:col-span-7'>
						<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300'>
							Start a conversation
						</p>
						<h2 className='section-title mt-4 max-w-2xl text-balance font-bold text-white' data-reveal>
							Interested in working together?
						</h2>
						<p className='mt-4 max-w-xl leading-7 text-slate-300' data-reveal>
							I&apos;m open to software engineering, machine learning, and mobile development opportunities.
						</p>
						<div className='mt-7 flex flex-wrap gap-3' data-reveal>
							<a
								href={profile.links.email.href}
								className='touch-target group inline-flex items-center bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-colors duration-150 hover:bg-blue-100'>
								Email me <Arrow />
							</a>
							<a
								href={profile.links.whatsapp.href}
								target='_blank'
								rel='noreferrer'
								className='touch-target group inline-flex items-center border border-slate-500 px-5 py-3 text-sm font-bold text-white transition-colors duration-150 hover:border-blue-300 hover:text-blue-200'>
								WhatsApp <Arrow />
							</a>
							<a
								href={profile.links.linkedin.href}
								target='_blank'
								rel='noreferrer'
								className='touch-target group inline-flex items-center border border-slate-500 px-5 py-3 text-sm font-bold text-white transition-colors duration-150 hover:border-blue-300 hover:text-blue-200'>
								LinkedIn <Arrow />
							</a>
						</div>
						<nav className='mt-6 flex flex-wrap gap-x-6 gap-y-2' aria-label='Profile links'>
							{secondaryLinks.map((link) => (
								<a
									key={link.label}
									href={link.href}
									target={link.href.startsWith('mailto:') ? undefined : '_blank'}
									rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
									className='border-b border-transparent pb-0.5 text-sm font-semibold text-slate-400 transition-colors duration-200 hover:border-blue-300 hover:text-blue-200'>
									{link.label}
								</a>
							))}
						</nav>
					</div>

					<aside className='min-w-0 border-t border-white/15 pt-8 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0' aria-label='Contact details'>
						<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500'>
							Based in
						</p>
						<p className='mt-2 font-semibold text-white'>{profile.location}</p>
						<p className='mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500'>
							Direct
						</p>
						<p className='mt-2 break-all text-sm text-slate-300'>{profile.email}</p>
						<p className='mt-6 leading-6 text-slate-400'>
							English and Indonesian resumes are available online; reach me by email, LinkedIn, or WhatsApp.
						</p>
					</aside>
				</div>
			</div>
		</section>
	);
}
