'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#01';

interface TextScrambleProps {
	text: string;
	className?: string;
	speed?: number;
	delay?: number;
}

export default function TextScramble({ text, className = '', speed = 30, delay = 0 }: TextScrambleProps) {
	const [display, setDisplay] = useState(text);
	const frameRef = useRef(0);
	const queueRef = useRef<{ from: number; to: number; start: number; end: number }[]>([]);

	useEffect(() => {
		const start = setTimeout(() => {
			const queue: { from: number; to: number; start: number; end: number }[] = [];
			for (let i = 0; i < text.length; i++) {
				queue.push({
					from: 0,
					to: i,
					start: Math.floor(i * 2.5),
					end: Math.floor(i * 2.5) + Math.floor(Math.random() * 20 + 10),
				});
			}

			const animate = (): void => {
				let output = '';
				let complete = 0;
				for (let i = 0; i < queue.length; i++) {
					const { from, to, start, end } = queue[i];
					if (frameRef.current >= end) {
						complete++;
						output += text[to];
					} else if (frameRef.current >= start) {
						output += CHARS[Math.floor(Math.random() * CHARS.length)];
					} else {
						output += text[from];
					}
				}
				setDisplay(output);
				if (complete === text.length) return;
				frameRef.current++;
				setTimeout(animate, speed);
			};

			frameRef.current = 0;
			animate();
		}, delay);

		return () => {
			clearTimeout(start);
			frameRef.current = 0;
		};
	}, [text, speed, delay]);

	return <span className={className}>{display}</span>;
}
