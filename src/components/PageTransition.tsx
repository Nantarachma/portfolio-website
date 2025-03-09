'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useState, useRef } from 'react';

export default function PageTransition({ children }: PropsWithChildren) {
	const pathname = usePathname();
	const [isLoading, setIsLoading] = useState(false);
	const [isHydrated, setIsHydrated] = useState(false);
	const prevPathnameRef = useRef(pathname);

	// Track route changes using pathname
	useEffect(() => {
		// If pathname changes, trigger loading state
		if (prevPathnameRef.current !== pathname && prevPathnameRef.current !== null) {
			setIsLoading(true);

			// Small delay to ensure everything is ready
			setTimeout(() => {
				setIsLoading(false);
			}, 700);
		}

		prevPathnameRef.current = pathname;
	}, [pathname]);

	// Handle page unload
	useEffect(() => {
		const handleBeforeUnload = () => {
			setIsLoading(true);
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	// Initial hydration
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsHydrated(true);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	// Initial loading screen
	if (!isHydrated) {
		return <LoadingAnimation />;
	}

	return (
		<>
			{/* Loading overlay */}
			<AnimatePresence>
				{isLoading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center'>
						<LoadingAnimation />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Page content */}
			<div className='overflow-hidden relative'>{children}</div>
		</>
	);
}

// A more sophisticated loading animation component
function LoadingAnimation() {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<motion.div
				className='flex space-x-2'
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				{[0, 1, 2, 3, 4].map((index) => (
					<motion.div
						key={index}
						className='w-3 h-3 rounded-full bg-blue-500'
						animate={{
							y: [0, -12, 0],
							backgroundColor: ['#3b82f6', '#6366f1', '#3b82f6'],
						}}
						transition={{
							duration: 1,
							repeat: Infinity,
							delay: index * 0.1,
							ease: 'easeInOut',
						}}
					/>
				))}
			</motion.div>

			<motion.p
				className='mt-6 text-gray-600 dark:text-gray-300 text-sm font-medium'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.5 }}>
				Loading...
			</motion.p>
		</div>
	);
}
