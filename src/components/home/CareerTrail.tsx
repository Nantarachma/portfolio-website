import type { CSSProperties } from 'react';

export interface TrailMilestone {
	label: string;
	short: string;
	at: number;
}

/**
 * Signature move: a fixed rail in the margin that draws itself with page
 * scroll. Fill and node lighting are pure CSS scroll-driven animations keyed
 * to each milestone's --at fraction (no JavaScript in the loop).
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
						style={{ '--at': milestone.at } as CSSProperties}>
						<span className='trail__label'>{milestone.short}</span>
					</span>
				))}
			</div>
		</div>
	);
}
