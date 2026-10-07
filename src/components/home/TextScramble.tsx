'use client';

import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
	text: string;
	className?: string;
	speed?: number;
	delay?: number;
}

export default function TextScramble({ text, className = '', speed = 30, delay = 0 }: TextScrambleProps) {
	const [progress, setProgress] = useState(0);
	const frameRef = useRef(0);

	useEffect(() => {
		const start = setTimeout(() => {
			const totalFrames = text.length * 3;
			const animate = (): void => {
				frameRef.current++;
				setProgress(Math.min(frameRef.current / totalFrames, 1));
				if (frameRef.current < totalFrames) {
					setTimeout(animate, speed);
				}
			};
			frameRef.current = 0;
			animate();
		}, delay);

		return () => {
			clearTimeout(start);
			frameRef.current = 0;
		};
	}, [text, speed, delay]);

	const chars = text.split('');
	const revealed = Math.floor(progress * text.length);

	return (
		<span className={className}>
			{chars.map((char, i) => (
				<span
					key={i}
					style={{
						opacity: i < revealed ? 1 : 0,
						transform: i < revealed ? 'translateY(0)' : 'translateY(8px)',
						transition: 'opacity 0.15s ease, transform 0.15s ease',
					}}>
					{char}
				</span>
			))}
		</span>
	);
}
