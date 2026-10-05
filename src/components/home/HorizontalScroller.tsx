'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';

interface HorizontalScrollerProps {
	children: ReactNode;
	label: string;
}

/**
 * Native horizontal scroll (touch/trackpad/keyboard) plus pointer drag for
 * mouse users, mirroring the reference site's case-study slider.
 */
export default function HorizontalScroller({ children, label }: HorizontalScrollerProps) {
	const railRef = useRef<HTMLDivElement>(null);
	const drag = useRef({ startX: 0, startScroll: 0, moved: false });

	const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (event.pointerType !== 'mouse' || event.button !== 0) return;
		const rail = railRef.current;
		if (!rail) return;
		drag.current = { startX: event.clientX, startScroll: rail.scrollLeft, moved: false };
		rail.setPointerCapture(event.pointerId);
	};

	const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
		const rail = railRef.current;
		if (!rail || event.pointerType !== 'mouse' || !rail.hasPointerCapture(event.pointerId)) return;
		const delta = event.clientX - drag.current.startX;
		if (!drag.current.moved && Math.abs(delta) < 5) return;
		drag.current.moved = true;
		rail.dataset.dragging = '';
		rail.scrollLeft = drag.current.startScroll - delta;
	};

	const release = (event: PointerEvent<HTMLDivElement>) => {
		const rail = railRef.current;
		if (!rail || !rail.hasPointerCapture(event.pointerId)) return;
		rail.releasePointerCapture(event.pointerId);
		if (drag.current.moved) {
			// Swallow the click that ends a drag so links do not fire.
			const suppress = (click: Event) => {
				click.preventDefault();
				click.stopPropagation();
			};
			rail.addEventListener('click', suppress, { capture: true, once: true });
			window.setTimeout(() => rail.removeEventListener('click', suppress, { capture: true }), 0);
			rail.removeAttribute('data-dragging');
		}
		drag.current.moved = false;
	};

	return (
		<div
			ref={railRef}
			role='region'
			aria-label={label}
			className='case-rail'
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={release}
			onPointerCancel={release}>
			{children}
		</div>
	);
}
