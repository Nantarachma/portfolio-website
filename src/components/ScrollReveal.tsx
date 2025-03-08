'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ReactNode } from 'react';

interface ScrollRevealProps {
	children: ReactNode;
	delay?: number;
	direction?: 'up' | 'down' | 'left' | 'right' | 'none';
	distance?: number;
	className?: string;
}

export default function ScrollReveal({
	children,
	delay = 500,
	direction = 'up',
	distance = 40,
	className = '',
}: ScrollRevealProps) {
	const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

	// Set initial and animate states based on direction
	const getDirectionProps = () => {
		switch (direction) {
			case 'up':
				return { y: distance };
			case 'down':
				return { y: -distance };
			case 'left':
				return { x: distance };
			case 'right':
				return { x: -distance };
			case 'none':
				return {};
		}
	};

	return (
		<div ref={ref} className={`overflow-hidden ${className}`}>
			<motion.div
				initial={{
					opacity: 0,
					...getDirectionProps(),
				}}
				animate={{
					opacity: isInView ? 1 : 0,
					x: isInView ? 0 : getDirectionProps().x,
					y: isInView ? 0 : getDirectionProps().y,
				}}
				transition={{
					duration: 0.7,
					delay: delay,
					ease: [0.22, 1, 0.36, 1],
				}}>
				{children}
			</motion.div>
		</div>
	);
}
