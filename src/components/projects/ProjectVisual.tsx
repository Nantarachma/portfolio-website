import Image from 'next/image';
import type { Project, ProjectVisual as ProjectVisualData } from '@/data/projects';

export interface ProjectVisualProps {
	project: Project;
	className?: string;
}

const defaultVisual: ProjectVisualData = {
	kind: 'pipeline',
	label: 'Technical project workflow',
	steps: ['Research', 'Design', 'Build'],
};

function FlowSteps({ steps }: { steps: readonly string[] }) {
	return (
		<div className='flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-1.5'>
			{steps.map((step, index) => (
				<div key={`${step}-${index}`} className='contents'>
					<div className='min-w-0 flex-1 rounded-md border border-slate-700 bg-slate-900/90 px-2.5 py-2 text-center text-xs font-medium text-slate-100'>
						<span className='mr-1.5 font-mono text-blue-300'>0{index + 1}</span>
						{step}
					</div>
					{index < steps.length - 1 ? (
						<span aria-hidden='true' className='hidden text-center text-sm text-blue-300 sm:inline'>
							→
						</span>
					) : null}
				</div>
			))}
		</div>
	);
}

function FeatureFusion({ steps }: { steps: readonly string[] }) {
	const [input = 'Image', deepFeatures = 'MobileNetV2', textureFeatures = 'LBP', fusion = 'Feature fusion', output = 'Classification'] = steps;

	return (
		<div className='grid gap-3 text-center text-xs font-medium text-slate-100'>
			<div className='mx-auto rounded-md border border-slate-700 bg-slate-900 px-4 py-2'>
				{input}
			</div>
			<div aria-hidden='true' className='text-blue-300'>
				↓
			</div>
			<div className='grid grid-cols-2 gap-3'>
				<div className='rounded-md border border-slate-700 bg-slate-900 px-3 py-2'>{deepFeatures}</div>
				<div className='rounded-md border border-slate-700 bg-slate-900 px-3 py-2'>{textureFeatures}</div>
			</div>
			<div aria-hidden='true' className='text-blue-300'>
				↘ &nbsp;&nbsp; ↙
			</div>
			<div className='mx-auto rounded-md border border-blue-400/50 bg-blue-500/15 px-4 py-2 text-blue-100'>
				{fusion}
			</div>
			<div aria-hidden='true' className='text-blue-300'>
				↓
			</div>
			<div className='mx-auto rounded-md border border-slate-700 bg-slate-900 px-4 py-2'>{output}</div>
		</div>
	);
}

function MobileFlow({ steps }: { steps: readonly string[] }) {
	const [platform = 'Android', analysis = 'ML-assisted analysis', outcome = 'Recommendations'] = steps;

	return (
		<div className='mx-auto w-full max-w-xs rounded-[1.75rem] border border-slate-600 bg-slate-900 p-3 shadow-inner'>
			<div className='mx-auto mb-3 h-1.5 w-14 rounded-full bg-slate-700' />
			<div className='space-y-2 rounded-[1.1rem] border border-slate-700 bg-slate-950 p-3'>
				<p className='font-mono text-[10px] uppercase tracking-[0.18em] text-blue-300'>{platform}</p>
				<div className='h-9 rounded-md border border-slate-800 bg-slate-900' />
				<div className='grid grid-cols-2 gap-2'>
					<div className='h-7 rounded-md border border-slate-800 bg-slate-900' />
					<div className='h-7 rounded-md border border-slate-800 bg-slate-900' />
				</div>
				<div className='rounded-md border border-blue-400/40 bg-blue-500/10 px-2 py-1.5 text-center text-[11px] text-blue-100'>
					{analysis}
				</div>
				<div className='text-center text-[11px] text-slate-300'>{outcome}</div>
			</div>
		</div>
	);
}

function DocumentFlow({ label }: { label: string }) {
	return (
		<div className='grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-slate-200'>
			<div className='rounded-md border border-slate-700 bg-slate-900 p-3'>
				<div className='mb-2 h-1.5 w-2/3 rounded bg-slate-600' />
				<div className='mb-1 h-1 w-full rounded bg-slate-800' />
				<div className='h-1 w-4/5 rounded bg-slate-800' />
			</div>
			<span aria-hidden='true' className='text-blue-300'>
				→
			</span>
			<div className='rounded-md border border-blue-400/40 bg-blue-500/10 p-3 text-center text-blue-100'>
				{label}
			</div>
		</div>
	);
}

function ConceptualDiagram({ visual }: { visual: ProjectVisualData }) {
	const steps = visual.steps ?? defaultVisual.steps ?? [];

	switch (visual.kind) {
		case 'feature-fusion':
			return <FeatureFusion steps={steps} />;
		case 'mobile-flow':
			return <MobileFlow steps={steps} />;
		case 'document-flow':
			return <DocumentFlow label={visual.label} />;
		case 'delivery-flow':
		case 'classification-flow':
		case 'pipeline':
			return <FlowSteps steps={steps} />;
	}
}

/**
 * Renders a verified cover image when one is supplied, otherwise a labelled
 * conceptual diagram. The fallback never pretends to be a product screenshot.
 */
export default function ProjectVisual({ project, className = '' }: ProjectVisualProps) {
	if (project.image) {
		return (
			<figure className={`relative min-h-56 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${className}`}>
				<Image
					src={project.image}
					alt={`${project.title} project visual`}
					fill
					sizes='(min-width: 1024px) 50vw, 100vw'
					className='object-cover'
				/>
			</figure>
		);
	}

	const visual = project.visual ?? defaultVisual;

	return (
		<figure
			className={`overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-sm ${className}`}
			aria-label={`Conceptual diagram: ${visual.label}`}>
			<div className='mb-5 flex items-start justify-between gap-4'>
				<div>
					<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300'>
						Conceptual project visual
					</p>
					<figcaption className='mt-1 text-sm font-medium text-slate-100'>{visual.label}</figcaption>
				</div>
				<span aria-hidden='true' className='mt-1 grid size-2 grid-cols-2 gap-px'>
					<i className='bg-blue-400' />
					<i className='bg-slate-600' />
					<i className='bg-slate-600' />
					<i className='bg-blue-400' />
				</span>
			</div>
			<ConceptualDiagram visual={visual} />
		</figure>
	);
}
