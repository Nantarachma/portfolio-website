import type { CSSProperties } from 'react';

const practiceAreas = [
	{
		title: 'Machine learning & computer vision',
		description:
			'Training, optimization, and explainability pipelines: XGBoost tuned with Optuna, SHAP for feature analysis, and CNN image classification research on X-ray and leaf imagery.',
		className: 'lg:col-span-3',
	},
	{
		title: 'Mobile development',
		description:
			'Native Android with Kotlin and TensorFlow Lite, plus Flutter. Built through the Bangkit Academy cohort and the SHARA capstone.',
		className: 'lg:col-span-2',
	},
	{
		title: 'Web & full-stack',
		description:
			'Next.js, TypeScript, Node.js, and Laravel builds, from the JustiBot legal-consultation platform internship to this single-page portfolio.',
		className: 'lg:col-span-5',
	},
] as const;

export default function PracticeBlock() {
	return (
		<section className='page-block border-b border-slate-200 bg-white' aria-labelledby='practice-heading'>
			<div className='site-container page-section'>
				<div className='max-w-3xl'>
					<h2 id='practice-heading' className='section-title font-bold text-slate-950'>
						What I build.
					</h2>
					<p className='mt-4 max-w-xl leading-7 text-slate-600'>
						Three practice areas, backed by shipped projects and published research from this portfolio.
					</p>
				</div>
				<div className='mt-9 grid gap-5 lg:grid-cols-5'>
					{practiceAreas.map((area, index) => (
						<article
							key={area.title}
							className={`surface card-pad flex flex-col justify-between gap-6 rounded-xl ${area.className}`}
							data-reveal
							style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}>
							<div>
								<h3 className='text-xl font-bold tracking-[-0.035em] text-slate-950 sm:text-2xl'>{area.title}</h3>
								<p className='mt-3 max-w-2xl leading-7 text-slate-600'>{area.description}</p>
							</div>
							<a
								href='#work'
								className='group inline-flex items-center self-start text-sm font-bold text-slate-950 transition-colors duration-200 hover:text-blue-700'>
								Related work
								<span
									className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1'
									aria-hidden='true'>
									&rarr;
								</span>
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
