interface Stat {
	contentId: string;
	value: string;
	label: string;
}

const NUMERIC = /^[\d.,]+$/;

/**
 * In-numbers plate. The GPA figure blooms through the engine's count device
 * (a real number, written exactly as it renders); the rows enter together.
 */
function StatValue({ value }: { value: string }) {
	const [head = '', ...rest] = value.split('/');
	const countTarget = head.trim();

	if (NUMERIC.test(countTarget)) {
		return (
			<>
				<span data-sc-count={`0 ${countTarget}`}>{countTarget}</span>
				{rest.length > 0 ? ` / ${rest.join('/').trim()}` : null}
			</>
		);
	}
	return <>{value}</>;
}
export default function StatsStrip({ highlights }: { highlights: readonly Stat[] }) {
	return (
		<section
			className='page-block block-overlap border-b-[3px] border-b-ink bg-void'
			data-draw-b
			aria-label='Profile in numbers'
			data-sc-act='flow'>
			{/* Bar atas lega (pt-24 md:pt-28) → BAM! duduk di sudut kiri-atas
			    DI LUAR box grid (tinggi bar > tinggi span) — dulu right-0
			    menempel kartu kanan & ketutup (hit-test: highlight-item). */}
			<div className='site-container relative pb-[var(--space-section-compact)] pt-24 md:pt-28'>
				<span className='action-word left-0 top-0 z-10 hidden md:block' data-sc-in aria-hidden='true'>
					BAM!
				</span>
				<div className='highlight-grid' data-sc-in data-sc-stagger='70'>
					{highlights.map((item, i) => (
						<div
							key={item.contentId}
							className='highlight-item comic-panel'
							style={{ boxShadow: `5px 5px 0 0 var(--shadow-plate-${i % 3})` }}>
							<p className='text-xl font-bold tracking-[-0.03em] text-flare sm:text-2xl'>
								<StatValue value={item.value} />
							</p>
							<p className='mt-1 text-xs uppercase leading-4 tracking-[0.1em] text-dim'>{item.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
