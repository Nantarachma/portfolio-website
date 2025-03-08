'use client';

import { useState, useEffect, useRef } from 'react';

interface UseInViewOptions {
	threshold?: number;
	rootMargin?: string;
	triggerOnce?: boolean;
}

export function useInView({
	threshold = 0.1,
	rootMargin = '0px',
	triggerOnce = false,
}: UseInViewOptions = {}) {
	const [isInView, setIsInView] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const enteredView = useRef(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				const inView = entry.isIntersecting;

				// If we only want to trigger once and already triggered, do nothing
				if (triggerOnce && enteredView.current) return;

				if (inView) enteredView.current = true;
				setIsInView(inView);
			},
			{ threshold, rootMargin },
		);

		const currentElement = ref.current;
		if (currentElement) {
			observer.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				observer.unobserve(currentElement);
			}
		};
	}, [threshold, rootMargin, triggerOnce]);

	return { ref, isInView };
}
