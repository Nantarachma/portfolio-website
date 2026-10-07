import Image from 'next/image';
import type { PortfolioProject } from '@/lib/portfolio/schema';

type ProjectVisualData = NonNullable<PortfolioProject['visual']>;

export interface ProjectVisualProps {
	project: PortfolioProject;
	className?: string;
}

const defaultVisual: ProjectVisualData = {
	kind: 'pipeline',
	label: 'Technical project workflow',
	steps: ['Research', 'Design', 'Build'],
};

function Connector({ direction = 'horizontal' }: { direction?: 'horizontal' | 'vertical' }) {
	return (
		<span aria-hidden='true' className={`flex shrink-0 items-center justify-center text-flare ${direction === 'vertical' ? 'h-3' : 'w-4'}`}>
			<svg className={direction === 'vertical' ? 'size-3 rotate-90' : 'size-3'} fill='none' viewBox='0 0 16 16'>
				<path d='M2 8h10M8.5 4.5 12 8l-3.5 3.5' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' />
			</svg>
		</span>
	);
}

function FlowSteps({ steps }: { steps: readonly string[] }) {
	return (
		<ol className='project-flow-list flex items-stretch gap-1.5'>
			{steps.map((step, index) => (
				<li key={`${step}-${index}`} className='project-flow-step flex min-w-0 flex-1'>
					<div className='min-w-0 flex-1 border border-rule bg-void/90 px-1.5 py-1'>
						<p className='font-mono text-[10px] font-semibold text-flare'>{String(index + 1).padStart(2, '0')}</p>
						<p className='safe-wrap mt-0.5 text-xs font-medium leading-4 text-ink'>{step}</p>
					</div>
					{index < steps.length - 1 ? (
						<>
							<span className='project-flow-connector-vertical'><Connector direction='vertical' /></span>
							<span className='project-flow-connector-horizontal'><Connector /></span>
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
		<div className='grid gap-1.5 text-center text-xs font-medium text-ink'>
			<div className='mx-auto border border-rule bg-void/90 px-3 py-1.5'>
				<p className='font-mono text-[10px] text-flare'>INPUT</p>
				<p className='safe-wrap mt-1'>{input}</p>
			</div>
			<div className='flex justify-center'><Connector direction='vertical' /></div>
			<div className='grid grid-cols-2 gap-3'>
				<div className='border border-rule bg-void/90 px-2.5 py-1.5'>
					<p className='font-mono text-[10px] text-dim'>DEEP</p>
					<p className='safe-wrap mt-1'>{deepFeatures}</p>
				</div>
				<div className='border border-rule bg-void/90 px-2.5 py-1.5'>
					<p className='font-mono text-[10px] text-dim'>TEXTURE</p>
					<p className='safe-wrap mt-1'>{textureFeatures}</p>
				</div>
			</div>
			<div className='flex justify-center'><Connector direction='vertical' /></div>
			<div className='mx-auto border border-blueprint/50 bg-blueprint/10 px-3 py-1.5 text-ink'>
				<p className='font-mono text-[10px] text-flare'>FUSION</p>
				<p className='safe-wrap mt-1'>{fusion}</p>
			</div>
			<div className='flex justify-center'><Connector direction='vertical' /></div>
			<div className='mx-auto border border-rule bg-void/90 px-3 py-1.5'>
				<p className='font-mono text-[10px] text-dim'>OUTPUT</p>
				<p className='safe-wrap mt-1'>{output}</p>
			</div>
		</div>
	);
}

function MobileFlow({ steps }: { steps: readonly string[] }) {
	const [platform = 'Android', analysis = 'ML-assisted analysis', outcome = 'Recommendations'] = steps;

	return (
		<div className='grid grid-cols-[auto_1fr] border border-rule bg-void/90'>
			<div className='flex flex-col justify-between border-r border-rule px-3 py-3 font-mono text-[10px] font-semibold text-flare'>
				<span>01</span>
				<span>02</span>
				<span>03</span>
			</div>
			<div className='divide-y divide-slate-800'>
				<div className='px-3 py-2.5'>
					<p className='font-mono text-[10px] text-dim'>PLATFORM</p>
					<p className='safe-wrap mt-1 text-xs font-medium text-ink'>{platform}</p>
				</div>
				<div className='px-3 py-2.5'>
					<p className='font-mono text-[10px] text-dim'>PROCESS</p>
					<p className='safe-wrap mt-1 text-xs font-medium text-ink'>{analysis}</p>
				</div>
				<div className='px-3 py-2.5'>
					<p className='font-mono text-[10px] text-dim'>OUTCOME</p>
					<p className='safe-wrap mt-1 text-xs font-medium text-ink'>{outcome}</p>
				</div>
			</div>
		</div>
	);
}

function DocumentFlow({ label }: { label: string }) {
	return (
		<div className='grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-slate-200'>
			<div className='border border-rule bg-void/90 p-3'>
				<p className='font-mono text-[10px] text-dim'>SOURCE</p>
				<div className='mt-3 space-y-1.5' aria-hidden='true'>
					<div className='h-px w-2/3 bg-slate-500' />
					<div className='h-px w-full bg-slate-700' />
					<div className='h-px w-4/5 bg-slate-700' />
				</div>
			</div>
			<Connector />
			<div className='border border-blueprint/40 bg-blueprint/10 p-2.5 text-center text-ink'>
				<p className='font-mono text-[10px] text-flare'>OUTPUT</p>
				<p className='safe-wrap mt-1.5 font-medium'>{label}</p>
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
			<figure className={`relative min-h-40 overflow-hidden border border-rule bg-plate ${className}`}>
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
			className={`project-visual relative isolate overflow-hidden border border-rule bg-void p-3 ${className}`}
			aria-label={`Conceptual diagram: ${visual.label}`}>
			<div aria-hidden='true' className='pointer-events-none absolute inset-0 z-0 opacity-50 [background-image:linear-gradient(rgb(148_163_184_/_0.1)_1px,transparent_1px),linear-gradient(90deg,rgb(148_163_184_/_0.1)_1px,transparent_1px)] [background-size:22px_22px]' />
			<div aria-hidden='true' className='absolute left-0 top-0 h-1 w-16 bg-blueprint' />
			<div className='relative z-10'>
				<div className='mb-2 flex items-start justify-between gap-4'>
					<div>
						<p className='font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-flare'>
							Conceptual system map
						</p>
						<figcaption className='mt-1.5 text-sm font-medium leading-5 text-ink'>{visual.label}</figcaption>
					</div>
					<span aria-hidden='true' className='mt-1 grid size-3 grid-cols-2 gap-px border border-rule p-px'>
						<i className='bg-blueprint' />
						<i className='bg-slate-600' />
						<i className='bg-slate-600' />
						<i className='bg-blueprint' />
					</span>
				</div>
				<ConceptualDiagram visual={visual} />
			</div>
		</figure>
	);
}
