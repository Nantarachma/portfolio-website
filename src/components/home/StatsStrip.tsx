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
			className='page-block block-overlap border-b border-rule bg-void'
			aria-label='Profile in numbers'
			data-sc-act='flow'>
			<div className='site-container py-[var(--space-section-compact)]'>
				<div className='highlight-grid' data-sc-in data-sc-stagger='70'>
					{highlights.map((item) => (
						<div key={item.contentId} className='highlight-item'>
							<p className='font-mono text-xl font-bold tracking-[-0.03em] text-ink sm:text-2xl'>
								<StatValue value={item.value} />
							</p>
							<p className='mt-1 font-mono text-xs uppercase leading-4 tracking-[0.1em] text-dim'>{item.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
