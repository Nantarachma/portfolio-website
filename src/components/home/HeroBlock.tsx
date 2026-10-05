import Image from 'next/image';
import type { PortfolioProfile } from '@/lib/portfolio/schema';

export default function HeroBlock({ profile }: { profile: PortfolioProfile }) {
	return (
		<section
			id='top'
			data-header-theme='dark'
			data-nav-section='home'
			className='hero-block bg-[#14161a] text-[#eef1f6]'>
			<div className='site-container hero-section grid min-w-0 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-8'>
				<div className='min-w-0 lg:col-span-7'>
					<p className='eyebrow text-blue-300'>{profile.eyebrow}</p>
					<h1 className='display-title safe-wrap mt-7 max-w-4xl text-balance font-bold text-white' data-reveal>
						{profile.name}
					</h1>
					<p
						className='hero-role mt-6 max-w-2xl break-words font-bold leading-snug tracking-[-0.035em] text-blue-300 [--reveal-delay:80ms]'
						data-reveal>
						{profile.role}
					</p>
					<p className='lead-text mt-5 break-words text-slate-300 [--reveal-delay:140ms]' data-reveal>
						{profile.intro}
					</p>
					<div className='hero-actions mt-8 [--reveal-delay:200ms]' data-reveal>
						<a
							href='#work'
							className='group inline-flex items-center justify-center bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-colors duration-200 hover:bg-blue-100'>
							Explore work <span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>&rarr;</span>
						</a>
						<a
							href='#contact'
							className='group inline-flex items-center justify-center border border-slate-500 px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:border-blue-300 hover:text-blue-200'>
							Contact <span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>&rarr;</span>
						</a>
					</div>
					<div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold'>
						<a
							href={profile.links.github.href}
							target='_blank'
							rel='noreferrer'
							className='border-b border-transparent pb-0.5 text-slate-300 transition-colors duration-200 hover:border-blue-300 hover:text-blue-200'>
							GitHub
						</a>
						<a
							href={profile.links.linkedin.href}
							target='_blank'
							rel='noreferrer'
							className='border-b border-transparent pb-0.5 text-slate-300 transition-colors duration-200 hover:border-blue-300 hover:text-blue-200'>
							LinkedIn
						</a>
						<a
							href={profile.links.whatsapp.href}
							target='_blank'
							rel='noreferrer'
							className='border-b border-transparent pb-0.5 text-slate-300 transition-colors duration-200 hover:border-blue-300 hover:text-blue-200'>
							WhatsApp
						</a>
					</div>
				</div>

				<figure className='hero-portrait relative hidden min-w-0 lg:col-span-4 lg:col-start-9 lg:block'>
					<div
						aria-hidden='true'
						className='absolute -right-5 -top-5 size-28 border-r border-t border-blue-400/70'
					/>
					<div className='relative aspect-[4/5] overflow-hidden border border-white/15 bg-white/5 p-4 shadow-[10px_10px_0_0_rgba(37,99,235,0.35)]'>
						<div className='relative h-full overflow-hidden border border-white/10 bg-slate-800'>
							<Image
								src={profile.portrait.src}
								alt={profile.portrait.alt}
								fill
								priority
								sizes='28vw'
								className='object-cover object-center'
							/>
						</div>
						<figcaption className='absolute bottom-4 left-4 border border-white/25 bg-[#14161a]/90 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300'>
							Portrait / 01
						</figcaption>
					</div>
					<p className='mt-4 max-w-xs font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>
						Building evidence-led systems across research and product work.
					</p>
				</figure>
			</div>
		</section>
	);
}
