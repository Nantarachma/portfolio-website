import LineReveal from '@/components/effects/LineReveal';
import GlitchChars from '@/components/effects/GlitchChars';
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
			className='page-block block-overlap contact-act spotlight-surface border-t-[3px] border-t-ink bg-[#120d24] text-ink'
			data-draw-t>
			<div className='contact-stage sc-stage' data-sc-stage>
				<div className='site-container page-section contact-stage__inner'>
				<div className='grid gap-10 lg:grid-cols-12'>
					{/* No cue here: the closing scene must stay solid to the very
					    bottom of the page (an act out of range force-zeroes its
					    cues, which blanked this column at end-of-scroll). The
					    stage's header-height clearance already keeps the bar from
					    ever covering it. */}
					<div className='min-w-0 lg:col-span-7'>
						<h2
							className='section-title max-w-2xl text-balance font-bold text-ink'
							data-sc-in
							aria-label='Interested in working together?'>
							<GlitchChars text='Interested in working together?' />
						</h2>
						<p className='mt-4 max-w-xl leading-7 text-dim' data-sc-in>
							<LineReveal text="I'm open to software engineering, machine learning, and mobile development opportunities." />
						</p>
						<div className='mt-6 flex flex-wrap gap-3'>
							<a
								href={profile.links.email.href}
								data-magnetic
								className='touch-target group inline-flex items-center border-[3px] border-ink bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#14092e] shadow-[5px_5px_0_0_var(--color-blueprint)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_5px_0_0_var(--color-blueprint)]'>
								Email me <Arrow />
							</a>
							<a
								href={profile.links.whatsapp.href}
								target='_blank'
								rel='noreferrer'
								data-magnetic
								className='touch-target group inline-flex items-center border-[3px] border-ink px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink shadow-[5px_5px_0_0_var(--color-blueprint)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-flare hover:shadow-[7px_7px_0_0_var(--color-blueprint)]'>
								WhatsApp <Arrow />
							</a>
							<a
								href={profile.links.linkedin.href}
								target='_blank'
								rel='noreferrer'
								data-magnetic
								className='touch-target group inline-flex items-center border-[3px] border-ink px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink shadow-[5px_5px_0_0_var(--shadow-plate-1)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-flare hover:shadow-[7px_7px_0_0_var(--shadow-plate-1)]'>
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
									className='border-b border-transparent pb-0.5 text-sm font-semibold text-dim transition-colors duration-200 hover:border-flare hover:text-flare'>
									{link.label}
								</a>
							))}
						</nav>
						<p className='mt-6 max-w-md text-[10px] uppercase leading-5 tracking-[0.14em] text-ink'>
							Set in Plus Jakarta Sans. Built with Next.js and scrollcraft. {profile.location}.
						</p>
					</div>

					<aside
						className='min-w-0 border-t border-rule pt-8 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0'
						aria-label='Contact details'>
						{/* No parallax here (user call): the portrait just sits in
						    the pinned scene — the drift was more distracting than
						    alive at 0.08. */}
						<figure className='max-w-[16rem]'>
							<div className='relative aspect-[4/5] overflow-hidden border-[3px] border-ink bg-plate p-3 shadow-[6px_6px_0_0_var(--color-blueprint)]'>
								<div className='relative h-full overflow-hidden border border-rule bg-plate'>
									<Image
										src={profile.portrait.src}
										alt={profile.portrait.alt}
										fill
										sizes='(min-width: 1024px) 16rem, 70vw'
										className='object-cover object-center'
									/>
								</div>
								<figcaption className='absolute bottom-3 left-3 border border-ink bg-void/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-flare'>
									Portrait
								</figcaption>
							</div>
						</figure>
						<p className='mt-6 text-[11px] font-semibold text-dim'>Based in</p>
						<p className='mt-2 font-semibold text-ink'>{profile.location}</p>
						<p className='mt-6 text-[11px] font-semibold text-dim'>Direct</p>
						<p className='mt-2 break-all text-sm text-dim'>{profile.email}</p>
					</aside>
					</div>
				</div>
			</div>
		</section>
	);
}
