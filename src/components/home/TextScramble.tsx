'use client';

import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
	text: string;
	className?: string;
	speed?: number;
	delay?: number;
	/** Jika diisi (ms) — animasi diulang tiap periode ini (sinkron dgn loop CSS). */
	interval?: number;
}

export default function TextScramble({ text, className = '', speed = 30, delay = 0, interval }: TextScrambleProps) {
	// Mode interval: tampil utuh saat load (tanpa "terpotong"), menulis
	// ulang mulai siklus ke-2 yang sinkron dgn loop CSS fade 10s.
	const [progress, setProgress] = useState(interval ? 1 : 0);
	const frameRef = useRef(0);

	useEffect(() => {
		const timers: number[] = [];
		const totalFrames = text.length * 3;

		const tick = (): void => {
			frameRef.current++;
			setProgress(Math.min(frameRef.current / totalFrames, 1));
			if (frameRef.current < totalFrames) {
				timers.push(window.setTimeout(tick, speed));
			}
		};

		const startCycle = (): void => {
			frameRef.current = 0;
			setProgress(0);
			timers.push(window.setTimeout(tick, speed));
		};

		if (interval) {
			// Load: teks utuh. Menulis mulai t = interval, lalu tiap interval.
			const firstWrite = window.setTimeout(() => {
				startCycle();
				let cycleStart = Date.now();
				const schedule = (): void => {
					const wait = Math.max(interval - (Date.now() - cycleStart), 50);
					timers.push(window.setTimeout(() => {
						cycleStart = Date.now();
						startCycle();
						schedule();
					}, wait));
				};
				schedule();
			}, interval);
			timers.push(firstWrite);
		} else {
			// One-shot: tulis sekali setelah delay.
			timers.push(window.setTimeout(startCycle, delay));
		}

		return () => {
			timers.forEach((t) => window.clearTimeout(t));
			frameRef.current = 0;
		};
	}, [text, speed, delay, interval]);

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
