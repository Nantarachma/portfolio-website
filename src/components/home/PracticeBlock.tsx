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
	dark: 'bg-[#14161a] text-[#eef1f6]',
	tint: 'bg-[#f2f5fa]',
	cream: 'bg-[#fbfbf7]',
} as const;

const bodyTone = {
	dark: 'text-slate-300',
	tint: 'text-slate-600',
	cream: 'text-slate-600',
} as const;

/** Three practice areas as an asymmetric trio: dark, tinted, and cream cells. */
export default function PracticeBlock() {
	return (
		<section className='page-block border-b border-slate-200 bg-white' aria-labelledby='practice-heading'>
			<div className='site-container page-section'>
				<div className='max-w-3xl' data-sc-in>
					<h2 id='practice-heading' className='section-title font-bold text-slate-950'>
						What I build.
					</h2>
					<p className='mt-4 max-w-[65ch] leading-7 text-slate-600'>
						Three practice areas, backed by shipped projects and published research from this portfolio.
					</p>
				</div>
				<div className='mt-9 grid gap-5 lg:grid-cols-5' data-sc-in data-sc-stagger='70'>
					{practiceAreas.map((area) => (
						<article
							key={area.title}
							className={`card-pad flex flex-col justify-between gap-4 border border-slate-200 ${area.tone === 'cream' ? '' : 'min-h-56'} ${toneClasses[area.tone]} ${area.className}`}>
							<div>
								<h3 className='text-xl font-bold tracking-[-0.035em] sm:text-2xl'>{area.title}</h3>
								<p className={`mt-3 max-w-2xl leading-7 ${bodyTone[area.tone]}`}>{area.description}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
