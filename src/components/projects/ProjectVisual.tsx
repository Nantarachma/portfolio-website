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

function Connector({ direction = 'horizontal' }: { direction?: 'horizontal' | 'vertical' }) {
	return (
		<span aria-hidden='true' className={`flex shrink-0 items-center justify-center text-blue-300 ${direction === 'vertical' ? 'h-4' : 'w-4'}`}>
			<svg className={direction === 'vertical' ? 'size-3 rotate-90' : 'size-3'} fill='none' viewBox='0 0 16 16'>
				<path d='M2 8h10M8.5 4.5 12 8l-3.5 3.5' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' />
			</svg>
		</span>
	);
}

function FlowSteps({ steps }: { steps: readonly string[] }) {
	return (
		<ol className='flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-stretch'>
			{steps.map((step, index) => (
				<li key={`${step}-${index}`} className='flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center'>
					<div className='min-w-0 flex-1 border border-slate-700 bg-slate-950/85 px-2.5 py-2.5'>
						<p className='font-mono text-[10px] font-semibold text-blue-300'>{String(index + 1).padStart(2, '0')}</p>
						<p className='mt-1 text-xs font-medium leading-4 text-slate-100'>{step}</p>
					</div>
					{index < steps.length - 1 ? (
						<>
							<span className='sm:hidden'><Connector direction='vertical' /></span>
							<span className='hidden sm:inline-flex'><Connector /></span>
						</>
					) : null}
				</li>
			))}
		</ol>
	);
}

function FeatureFusion({ steps }: { steps: readonly string[] }) {
	const [input = 'Image', deepFeatures = 'MobileNetV2', textureFeatures = 'LBP', fusion = 'Feature fusion', output = 'Classification'] = steps;

	return (
		<div className='grid gap-2.5 text-center text-xs font-medium text-slate-100'>
			<div className='mx-auto border border-slate-700 bg-slate-950/85 px-4 py-2.5'>
				<p className='font-mono text-[10px] text-blue-300'>INPUT</p>
				<p className='mt-1'>{input}</p>
			</div>
			<div className='flex justify-center'><Connector direction='vertical' /></div>
			<div className='grid grid-cols-2 gap-3'>
				<div className='border border-slate-700 bg-slate-950/85 px-3 py-2.5'>
					<p className='font-mono text-[10px] text-slate-400'>DEEP</p>
					<p className='mt-1'>{deepFeatures}</p>
				</div>
				<div className='border border-slate-700 bg-slate-950/85 px-3 py-2.5'>
					<p className='font-mono text-[10px] text-slate-400'>TEXTURE</p>
					<p className='mt-1'>{textureFeatures}</p>
				</div>
			</div>
			<div className='flex justify-center'><Connector direction='vertical' /></div>
			<div className='mx-auto border border-blue-400/50 bg-blue-500/15 px-4 py-2.5 text-blue-100'>
				<p className='font-mono text-[10px] text-blue-300'>FUSION</p>
				<p className='mt-1'>{fusion}</p>
			</div>
			<div className='flex justify-center'><Connector direction='vertical' /></div>
			<div className='mx-auto border border-slate-700 bg-slate-950/85 px-4 py-2.5'>
				<p className='font-mono text-[10px] text-slate-400'>OUTPUT</p>
				<p className='mt-1'>{output}</p>
			</div>
		</div>
	);
}

function MobileFlow({ steps }: { steps: readonly string[] }) {
	const [platform = 'Android', analysis = 'ML-assisted analysis', outcome = 'Recommendations'] = steps;

	return (
		<div className='grid grid-cols-[auto_1fr] border border-slate-700 bg-slate-950/85'>
			<div className='flex flex-col justify-between border-r border-slate-700 px-3 py-3 font-mono text-[10px] font-semibold text-blue-300'>
				<span>01</span>
				<span>02</span>
				<span>03</span>
			</div>
			<div className='divide-y divide-slate-800'>
				<div className='px-3 py-2.5'>
					<p className='font-mono text-[10px] text-slate-400'>PLATFORM</p>
					<p className='mt-1 text-xs font-medium text-slate-100'>{platform}</p>
				</div>
				<div className='px-3 py-2.5'>
					<p className='font-mono text-[10px] text-slate-400'>PROCESS</p>
					<p className='mt-1 text-xs font-medium text-blue-100'>{analysis}</p>
				</div>
				<div className='px-3 py-2.5'>
					<p className='font-mono text-[10px] text-slate-400'>OUTCOME</p>
					<p className='mt-1 text-xs font-medium text-slate-100'>{outcome}</p>
				</div>
			</div>
		</div>
	);
}

function DocumentFlow({ label }: { label: string }) {
	return (
		<div className='grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-slate-200'>
			<div className='border border-slate-700 bg-slate-950/85 p-3'>
				<p className='font-mono text-[10px] text-slate-400'>SOURCE</p>
				<div className='mt-3 space-y-1.5' aria-hidden='true'>
					<div className='h-px w-2/3 bg-slate-500' />
					<div className='h-px w-full bg-slate-700' />
					<div className='h-px w-4/5 bg-slate-700' />
				</div>
			</div>
			<Connector />
			<div className='border border-blue-400/40 bg-blue-500/10 p-3 text-center text-blue-100'>
				<p className='font-mono text-[10px] text-blue-300'>OUTPUT</p>
				<p className='mt-1.5 font-medium'>{label}</p>
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
			className={`relative isolate overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-sm ${className}`}
			aria-label={`Conceptual diagram: ${visual.label}`}>
			<div aria-hidden='true' className='pointer-events-none absolute inset-0 z-0 opacity-50 [background-image:linear-gradient(rgb(148_163_184_/_0.1)_1px,transparent_1px),linear-gradient(90deg,rgb(148_163_184_/_0.1)_1px,transparent_1px)] [background-size:22px_22px]' />
			<div aria-hidden='true' className='absolute left-0 top-0 h-1 w-16 bg-blue-500' />
			<div className='relative z-10'>
				<div className='mb-6 flex items-start justify-between gap-4'>
					<div>
						<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300'>
							Conceptual system map
						</p>
						<figcaption className='mt-1.5 text-sm font-medium leading-5 text-slate-100'>{visual.label}</figcaption>
					</div>
					<span aria-hidden='true' className='mt-1 grid size-3 grid-cols-2 gap-px border border-slate-700 p-px'>
						<i className='bg-blue-400' />
						<i className='bg-slate-600' />
						<i className='bg-slate-600' />
						<i className='bg-blue-400' />
					</span>
				</div>
				<ConceptualDiagram visual={visual} />
			</div>
		</figure>
	);
}
