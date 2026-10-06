import Image from 'next/image';
import type { PortfolioProfile } from '@/lib/portfolio/schema';

function Arrow() {
	return (
		<span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>
			&rarr;
		</span>
	);
}

/** Colophon plate: the closing chapter — masthead, contact, set-in note. */
export default function ContactBlock({ profile }: { profile: PortfolioProfile }) {
	const secondaryLinks = [profile.links.github, profile.links.resumeEnglish, profile.links.resumeIndonesian] as const;

	return (
		<section
			id='contact'
			data-nav-section='contact'
			data-header-theme='dark'
			data-sc-act='pin'
			data-sc-span='1.5'
			data-sc-spotlight
			className='page-block block-overlap contact-act spotlight-surface bg-[#14161a] text-ink'>
			<div className='contact-stage sc-stage' data-sc-stage>
				<div className='site-container page-section contact-stage__inner'>
				<div className='grid gap-10 lg:grid-cols-12'>
					<div className='min-w-0 lg:col-span-7' data-sc-cue='0.05 0.96 0.25 0.2'>
						<h2 className='section-title max-w-2xl text-balance font-bold text-ink'>
							Interested in working together?
						</h2>
						<p className='mt-4 max-w-xl leading-7 text-dim'>
							I&apos;m open to software engineering, machine learning, and mobile development opportunities.
						</p>
						<div className='mt-6 flex flex-wrap gap-3'>
							<a
								href={profile.links.email.href}
								data-sc-magnet='0.3'
								className='touch-target group inline-flex items-center bg-ink px-5 py-3 text-sm font-bold text-void transition-colors duration-150 hover:bg-signal'>
								Email me <Arrow />
							</a>
							<a
								href={profile.links.whatsapp.href}
								target='_blank'
								rel='noreferrer'
								className='touch-target group inline-flex items-center border border-rule-strong px-5 py-3 text-sm font-bold text-ink transition-colors duration-150 hover:border-signal hover:text-signal'>
								WhatsApp <Arrow />
							</a>
							<a
								href={profile.links.linkedin.href}
								target='_blank'
								rel='noreferrer'
								className='touch-target group inline-flex items-center border border-rule-strong px-5 py-3 text-sm font-bold text-ink transition-colors duration-150 hover:border-signal hover:text-signal'>
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
									className='border-b border-transparent pb-0.5 text-sm font-semibold text-dim transition-colors duration-200 hover:border-signal hover:text-signal'>
									{link.label}
								</a>
							))}
						</nav>
						<p className='mt-6 max-w-md font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-dim'>
							Set in Plus Jakarta Sans. Built with Next.js and scrollcraft. {profile.location}.
						</p>
					</div>

					<aside
						className='min-w-0 border-t border-rule pt-8 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0'
						aria-label='Contact details'>
						<figure className='max-w-[16rem]' data-sc-parallax='0.08'>
							<div className='relative aspect-[4/5] overflow-hidden border border-rule bg-plate p-3'>
								<div className='relative h-full overflow-hidden border border-rule bg-plate'>
									<Image
										src={profile.portrait.src}
										alt={profile.portrait.alt}
										fill
										sizes='(min-width: 1024px) 16rem, 70vw'
										className='object-cover object-center'
									/>
								</div>
								<figcaption className='absolute bottom-3 left-3 border border-white/25 bg-[#14161a]/90 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-dim'>
									Portrait
								</figcaption>
							</div>
						</figure>
						<p className='mt-6 text-[11px] font-semibold text-dim'>Based in</p>
						<p className='mt-2 font-semibold text-ink'>{profile.location}</p>
						<p className='mt-6 text-[11px] font-semibold text-dim'>Direct</p>
						<p className='mt-2 break-all text-sm text-dim'>{profile.email}</p>
						<p className='mt-6 leading-6 text-dim'>
							English and Indonesian resumes are available online; reach me by email, LinkedIn, or WhatsApp.
						</p>
					</aside>
					</div>
				</div>
			</div>
		</section>
	);
}
