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
			<div className='site-container relative py-[var(--space-section-compact)]'>
				{/* Onomatopoeia pop saat strip masuk */}
				<span className='action-word right-0 -top-2 hidden md:block' data-sc-in aria-hidden='true'>
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
