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
	accent: 'border-blue-200 bg-blue-50 text-blue-800',
	neutral: 'border-slate-200 bg-white text-slate-700',
	subtle: 'border-slate-200 bg-slate-50 text-slate-600',
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
			className={`inline-flex items-center rounded-full border font-medium leading-none ${toneClasses[tone]} ${sizeClasses[size]} ${className}`}>
			{children}
		</span>
	);
}
