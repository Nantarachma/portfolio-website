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

/* Noir linear: semua kartu gelap, merah hanya utk shadow */
const toneClasses = {
	dark: 'bg-void text-ink',
	tint: 'bg-raised text-ink',
	cream: 'bg-raised text-ink',
} as const;

const bodyTone = {
	dark: 'text-dim',
	tint: 'text-dim',
	cream: 'text-dim',
} as const;

/** Three practice areas as an asymmetric trio: dark, tinted, and cream cells. */
export default function PracticeBlock() {
	return (
		<section
			data-sc-act='flow'
			className='page-block border-b-[3px] border-b-ink bg-plate'
			aria-labelledby='practice-heading'>
			<div className='site-container relative page-section'>
				{/* Onomatopoeia pop saat section masuk */}
				<span className='action-word right-0 top-0 hidden md:block' data-sc-in aria-hidden='true'>
					THWIP!
				</span>
				<div className='max-w-3xl' data-sc-cue='0.05 0.68 0.25 0.18'>
					<h2 id='practice-heading' className='section-title text-ink' data-sc-in>
						What I build.
					</h2>
					<p className='caption-box mt-2.5 max-w-[65ch] text-sm leading-6' data-sc-in>
						Three practice areas, backed by shipped projects and published research from this portfolio.
					</p>
				</div>
				<div className='mt-4 grid gap-3 lg:grid-cols-5'>
					{practiceAreas.map((area, i) => (
						<article
							key={area.title}
							data-sc-in
							data-sc-stagger={String(120 + i * 80)}
							className={`card-pad flex flex-col justify-between gap-4 border-[3px] border-ink ${area.tone === 'cream' ? '' : 'min-h-36'} ${toneClasses[area.tone]} ${area.className}`}
							style={{ boxShadow: `5px 5px 0 0 var(--shadow-plate-${i % 3})` }}>
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
