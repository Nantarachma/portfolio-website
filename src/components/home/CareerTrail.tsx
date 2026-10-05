export interface TrailMilestone {
	label: string;
	short: string;
	at: number;
}

/**
 * Signature move: a fixed rail in the page margin that draws itself with page
 * progress (--sc-trail-p, written by ScrollEffects). Each node is a real
 * career milestone; its label lights once the line passes.
 */
export default function CareerTrail({ milestones }: { milestones: readonly TrailMilestone[] }) {
	return (
		<div className='trail' data-sc-trail aria-hidden='true'>
			<div className='trail__line'>
				<span className='trail__fill' />
				{milestones.map((milestone) => (
					<span
						key={milestone.label}
						className='trail__node'
						data-at={milestone.at}
						style={{ top: `${milestone.at * 100}%` }}>
						<span className='trail__label'>{milestone.short}</span>
					</span>
				))}
			</div>
		</div>
	);
}
