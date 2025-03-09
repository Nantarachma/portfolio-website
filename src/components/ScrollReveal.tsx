'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ReactNode } from 'react';

interface ScrollRevealProps {
	children: ReactNode;
	delay?: number;
	direction?: 'up' | 'down' | 'left' | 'right' | 'none';
	distance?: number;
	className?: string;
	duration?: number; // New prop for duration
	easing?: number[]; // New prop for easing
	opacity?: number; // New prop for opacity
}

export default function ScrollReveal({
	children,
	delay = 200,
	direction = 'up',
	distance = 40,
	className = '',
	duration = 0.7, // Default duration
	easing = [0.22, 1, 0.36, 1], // Default easing
	opacity = 1, // Default opacity
}: ScrollRevealProps) {
	const { ref, isInView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

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
		<div ref={ref} className={className}>
			<AnimatePresence>
				{isInView && (
					<motion.div
						key='reveal'
						initial={{
							opacity: 0,
							...getDirectionProps(),
						}}
						animate={{
							opacity: opacity,
							x: 0,
							y: 0,
						}}
						exit={{
							opacity: 0,
							...getDirectionProps(),
						}}
						transition={{
							duration: duration,
							delay: delay,
							ease: easing,
						}}>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
