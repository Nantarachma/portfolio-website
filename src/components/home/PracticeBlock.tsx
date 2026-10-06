const practiceAreas = [
	{
		title: 'Machine learning & computer vision',
		description:
			'Training, optimization, and explainability pipelines: XGBoost tuned with Optuna, SHAP for feature analysis, and CNN image classification research on X-ray and leaf imagery.',
		className: 'lg:col-span-3',
		tone: 'dark',
	},
	{
		title: 'Mobile development',
		description:
			'Native Android with Kotlin and TensorFlow Lite, plus Flutter. Built through the Bangkit Academy cohort and the SHARA capstone.',
		className: 'lg:col-span-2',
		tone: 'tint',
	},
	{
		title: 'Web & full-stack',
		description:
			'Next.js, TypeScript, Node.js, and Laravel builds, from the JustiBot legal-consultation platform internship to this single-page portfolio.',
		className: 'lg:col-span-5',
		tone: 'cream',
	},
] as const;

const toneClasses = {
	dark: 'bg-[#0d0f13] text-ink',
	tint: 'bg-[#171c26] text-ink',
	cream: 'bg-blueprint text-white',
} as const;

const bodyTone = {
	dark: 'text-dim',
	tint: 'text-dim',
	cream: 'text-blue-100',
} as const;

/** Three practice areas as an asymmetric trio: dark, tinted, and cream cells. */
export default function PracticeBlock() {
	return (
		<section data-sc-act='flow' className='page-block border-b border-rule bg-plate' aria-labelledby='practice-heading'>
			<div className='site-container page-section'>
				<div className='max-w-3xl' data-sc-cue='0.05 0.68 0.25 0.18'>
					<h2 id='practice-heading' className='section-title text-ink'>
						What I build.
					</h2>
					<p className='mt-2.5 max-w-[65ch] text-sm leading-6 text-dim'>
						Three practice areas, backed by shipped projects and published research from this portfolio.
					</p>
				</div>
				<div className='mt-3 grid gap-2 lg:grid-cols-5' data-sc-in data-sc-stagger='70' data-sc-reveal='up' data-sc-reveal-at='0.15 0.6'>
					{practiceAreas.map((area) => (
						<article
							key={area.title}
							className={`card-pad flex flex-col justify-between gap-4 border border-rule ${area.tone === 'cream' ? '' : 'min-h-36'} ${toneClasses[area.tone]} ${area.className}`}>
							<div>
								<h3 className='text-lg font-bold tracking-[-0.03em] sm:text-xl'>{area.title}</h3>
								<p className={`mt-2.5 max-w-2xl text-sm leading-6 ${bodyTone[area.tone]}`}>{area.description}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
