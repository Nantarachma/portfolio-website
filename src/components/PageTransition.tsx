'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

const variants = {
	hidden: {
		opacity: 0,
		y: 10,
	},
	enter: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.33, 1, 0.68, 1], // cubic-bezier curve for smoother deceleration
			when: 'beforeChildren',
			staggerChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 0.3,
			ease: [0.33, 1, 0.68, 1],
		},
	},
};

export default function PageTransition({ children }: PropsWithChildren) {
	const pathname = usePathname();

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				key={pathname}
				initial='hidden'
				animate='enter'
				exit='exit'
				variants={variants}
				className='min-h-screen'>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
