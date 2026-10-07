import type { ReactNode } from 'react';

type BadgeTone = 'accent' | 'neutral' | 'subtle';
type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
	children: ReactNode;
	tone?: BadgeTone;
	size?: BadgeSize;
	className?: string;
}

const toneClasses: Record<BadgeTone, string> = {
	accent: 'border-blueprint bg-blueprint/10 text-flare',
	neutral: 'border-rule bg-plate text-dim',
	subtle: 'border-rule bg-void text-dim',
};

const sizeClasses: Record<BadgeSize, string> = {
	sm: 'px-2.5 py-1 text-xs',
	md: 'px-3 py-1.5 text-sm',
};

export default function Badge({
	children,
	tone = 'subtle',
	size = 'sm',
	className = '',
}: BadgeProps) {
	return (
		<span
			className={`inline-flex items-center border font-medium leading-none ${toneClasses[tone]} ${sizeClasses[size]} ${className}`}>
			{children}
		</span>
	);
}
