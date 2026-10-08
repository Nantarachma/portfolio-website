import type { PortfolioProfile } from '@/lib/portfolio/schema';
import HeroNetworkLazy from '@/components/three/HeroNetworkLazy';
import TextScramble from '@/components/home/TextScramble';

/**
 * Peak act (span 4): a pinned title page. The procedural 3D network lives
 * behind the copy inside the stage; the engine's cue windows choreograph the
 * arc from BRIEF.md: hold & greet (0) -> copy clears and the object explodes
 * in silence (~0.28-0.6) -> the network reassembles and the caption enters
 * (0.62) -> caption resolves by 0.97 so nothing lingers into the un-pin.
 */
export default function HeroBlock({ profile }: { profile: PortfolioProfile }) {
	return (
		<section
			id='top'
			data-sc-act='pin'
			data-sc-span='4'
			data-header-theme='dark'
			data-nav-section='home'
			className='page-block hero-act border-b-[3px] border-b-ink bg-[#120d24] text-ink'
			data-draw-b>
			<div className='hero-stage sc-stage' data-sc-stage>
				<div className='hero-bg-pattern' aria-hidden='true' />
				<div className='hero-network-slot' aria-hidden='true'>
					<HeroNetworkLazy />
				</div>
				<div className='site-container hero-section grid min-w-0 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-8'>
					<div className='min-w-0 lg:col-span-9' data-sc-cue='0 0.28 0 0.25'>
						<p className='eyebrow text-flare' data-sc-in>{profile.eyebrow}</p>
						<h1
							className='glitch-text display-title safe-wrap mt-7 max-w-3xl text-balance text-ink'
							data-text={profile.name}>
							<TextScramble text={profile.name} speed={25} delay={400} />
						</h1>
						<p className='caption-box subtitle-loop hero-role mt-6 max-w-2xl break-words leading-snug tracking-[-0.02em]'>
							<TextScramble text={profile.role} speed={20} delay={1200} interval={10000} />
						</p>
						<div className='hero-actions mt-8'>
							<a
								href='#work'
								data-magnetic
							className='group inline-flex items-center justify-center border-[3px] border-ink bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#14092e] shadow-[5px_5px_0_0_var(--color-blueprint)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-blueprint)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-blueprint)]'>
								View work{' '}
								<span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>
									&rarr;
								</span>
							</a>
							<a
								href='#contact'
								data-magnetic
							className='group inline-flex items-center justify-center border-[3px] border-ink px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink shadow-[5px_5px_0_0_var(--color-blueprint)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-flare hover:shadow-[7px_7px_0_0_var(--color-blueprint)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-blueprint)]'>
								Contact{' '}
								<span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1' aria-hidden='true'>
									&rarr;
								</span>
							</a>
						</div>
					</div>
				</div>
				{/* Onomatopoeia: THWIP! pop sesaat saat act masuk viewport */}
				<span className='action-word right-[4%] top-[14%] hidden lg:block' data-sc-in aria-hidden='true'>
					THWIP!
				</span>
				<div className='site-container hero-assembles-wrap'>
					{/* Wrapper cue so the ::before accent rule fades with the
					    copy — the kinetic element itself keeps opacity 1 and only
					    staggers its chars, which left the rule orphaned during
					    the burst phase. */}
					<div data-sc-cue='0.62 0.97'>
						<p className='hero-assembles' data-sc-cue='0.62 0.97' data-sc-kinetic='chars'>
						The network assembles.
					</p>
				</div>
			</div>
		</div>
		</section>
	);
}
