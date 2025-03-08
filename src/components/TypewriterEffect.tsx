'use client';

import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
	texts: string[];
	typingSpeed?: number;
	erasingSpeed?: number;
	delayAfterType?: number;
	delayAfterErase?: number;
	className?: string;
}

export default function TypewriterEffect({
	texts,
	typingSpeed = 120,
	erasingSpeed = 60,
	delayAfterType = 1500,
	delayAfterErase = 500,
	className = '',
}: TypewriterEffectProps) {
	const [displayText, setDisplayText] = useState('');
	const [textIndex, setTextIndex] = useState(0);
	const [isTyping, setIsTyping] = useState(true);
	const [cursorVisible, setCursorVisible] = useState(true);

	// Current text to work with
	const currentText = texts[textIndex];

	// Handle typing/erasing animation
	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (isTyping) {
			if (displayText.length < currentText.length) {
				// Still typing...
				timeout = setTimeout(() => {
					setDisplayText(currentText.slice(0, displayText.length + 1));
				}, typingSpeed);
			} else {
				// Done typing, pause before erasing
				timeout = setTimeout(() => {
					setIsTyping(false);
				}, delayAfterType);
			}
		} else {
			if (displayText.length > 0) {
				// Still erasing...
				timeout = setTimeout(() => {
					setDisplayText(displayText.slice(0, displayText.length - 1));
				}, erasingSpeed);
			} else {
				// Done erasing, move to next text and start typing again
				setTextIndex((current) => (current + 1) % texts.length);
				timeout = setTimeout(() => {
					setIsTyping(true);
				}, delayAfterErase);
			}
		}

		return () => clearTimeout(timeout);
	}, [
		displayText,
		isTyping,
		currentText,
		textIndex,
		typingSpeed,
		erasingSpeed,
		delayAfterType,
		delayAfterErase,
		texts,
	]);

	// Blinking cursor effect
	useEffect(() => {
		const interval = setInterval(() => {
			setCursorVisible((prev) => !prev);
		}, 530);

		return () => clearInterval(interval);
	}, []);

	return (
		<span className={className}>
			{displayText}
			<span
				className={`inline-block w-[2px] h-[1em] ml-1 bg-current ${
					cursorVisible ? 'opacity-100' : 'opacity-0'
				}`}
				style={{ verticalAlign: 'middle', transition: 'opacity 0.2s' }}></span>
		</span>
	);
}
