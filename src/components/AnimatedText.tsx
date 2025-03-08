'use client';

import { useState, useEffect } from 'react';

interface AnimatedTextProps {
	words: string[];
	delay?: number;
}

const AnimatedText = ({ words = [], delay = 2000 }: AnimatedTextProps) => {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			// Fade out
			setIsVisible(false);

			setTimeout(() => {
				// Change word and fade in
				setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
				setIsVisible(true);
			}, 500); // Half a second for fade out
		}, delay);

		return () => clearInterval(interval);
	}, [words, delay]);

	return (
		<span
			className={`inline-block transition-opacity duration-500 ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}>
			{words[currentWordIndex]}
		</span>
	);
};

export default AnimatedText;
