import type { PortfolioProfile } from '@/lib/portfolio/schema';

/**
 * Chaptered-editorial title page: pure type above the fold, no media.
 * Entrance handled by the scrollcraft runtime (data-sc-in).
 */
export default function HeroBlock({ profile }: { profile: PortfolioProfile }) {
	return (
		<section
			id='top'
			data-sc-act='flow'
			data-header-theme='dark'
			data-nav-section='home'
			className='page-block bg-[#14161a] text-[#eef1f6]'>
			<div className='site-container hero-section grid min-w-0 items-end gap-y-10 lg:grid-cols-12 lg:gap-x-8'>
				<div className='min-w-0 lg:col-span-9' data-sc-in data-sc-stagger='90'>
					<p className='eyebrow text-blue-300'>{profile.eyebrow}</p>
					<h1 className='display-title safe-wrap mt-7 max-w-5xl text-balance font-bold text-white'>
						{profile.name}
					</h1>
					<p className='hero-role mt-6 max-w-2xl break-words font-bold leading-snug tracking-[-0.035em] text-blue-300'>
						{profile.role}
					</p>
					<div className='hero-actions mt-8'>
						<a
							href='#work'
							className='group inline-flex items-center justify-center bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-colors duration-200 hover:bg-blue-100'>
							View work{' '}
							<span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>
								&rarr;
							</span>
						</a>
						<a
							href='#contact'
							className='group inline-flex items-center justify-center border border-slate-500 px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:border-blue-300 hover:text-blue-200'>
							Contact{' '}
							<span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>
								&rarr;
							</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
