import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:net';

const baseUrl = process.env.PORTFOLIO_SMOKE_URL ?? 'http://localhost:3000';
const browserCandidates = [
	process.env.CHROME_PATH,
	'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
	'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'/usr/bin/google-chrome',
	'/usr/bin/chromium',
].filter(Boolean);
const browserPath = browserCandidates.find((candidate) => existsSync(candidate));

if (!browserPath) throw new Error('Chrome/Chromium tidak ditemukan. Isi CHROME_PATH untuk menjalankan smoke test.');

const port = await new Promise((resolve, reject) => {
	const server = createServer();
	server.on('error', reject);
	server.listen(0, '127.0.0.1', () => {
		const address = server.address();
		if (!address || typeof address === 'string') return reject(new Error('Tidak dapat memilih port CDP.'));
		server.close(() => resolve(address.port));
	});
});

const profileDirectory = mkdtempSync(join(tmpdir(), 'portfolio-cdp-'));
const browser = spawn(
	browserPath,
	[
		'--headless=new',
		'--disable-gpu',
		'--hide-scrollbars',
		'--no-first-run',
		'--no-default-browser-check',
		`--remote-debugging-port=${port}`,
		`--user-data-dir=${profileDirectory}`,
		'about:blank',
	],
	{ stdio: 'ignore', windowsHide: true },
);

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function getTarget() {
	for (let attempt = 0; attempt < 30; attempt += 1) {
		try {
			const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
			const page = targets.find((target) => target.type === 'page' && target.url === 'about:blank')
				?? targets.find((target) => target.type === 'page' && !target.url.startsWith('chrome-extension://'));
			if (page?.webSocketDebuggerUrl) return page;
		} catch {
			// Chrome is still starting.
		}
		await delay(200);
	}
	throw new Error('Chrome DevTools Protocol tidak siap.');
}

try {
	const target = await getTarget();
	const socket = new WebSocket(target.webSocketDebuggerUrl);
	await new Promise((resolve, reject) => {
		socket.addEventListener('open', resolve, { once: true });
		socket.addEventListener('error', reject, { once: true });
	});

	let commandId = 0;
	const pending = new Map();
	socket.addEventListener('message', (event) => {
		const message = JSON.parse(event.data);
		if (!message.id || !pending.has(message.id)) return;
		const handlers = pending.get(message.id);
		pending.delete(message.id);
		if (message.error) handlers.reject(new Error(message.error.message));
		else handlers.resolve(message.result);
	});

	const command = (method, params = {}) => new Promise((resolve, reject) => {
		const id = ++commandId;
		pending.set(id, { resolve, reject });
		socket.send(JSON.stringify({ id, method, params }));
	});

	await command('Page.enable');
	await command('Emulation.setEmulatedMedia', {
		features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
	});

	const routes = ['/', '/projects', '/projects/shara', '/about', '/contact', '/research', '/admin/login'];
	const widths = [360, 768, 1024, 1440];
	const failures = [];

	for (const width of widths) {
		await command('Emulation.setDeviceMetricsOverride', {
			width,
			height: 900,
			deviceScaleFactor: 1,
			mobile: width < 768,
			screenWidth: width,
			screenHeight: 900,
		});

		for (const route of routes) {
			await command('Page.navigate', { url: `${baseUrl}${route}` });
			await delay(450);
			const evaluation = await command('Runtime.evaluate', {
				expression: `({
					path: location.pathname,
					innerWidth,
					documentWidth: document.documentElement.scrollWidth,
					bodyWidth: document.body.scrollWidth,
					reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
					heading: document.querySelector('h1')?.textContent?.trim() ?? '',
					focusables: document.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])').length
				})`,
				returnByValue: true,
			});
			const metrics = evaluation.result.value;
			const passed = metrics.innerWidth === width && metrics.documentWidth <= width && metrics.bodyWidth <= width && metrics.reducedMotion && metrics.heading && metrics.focusables > 0;
			console.log(`${passed ? 'PASS' : 'FAIL'} ${width}px ${route} viewport=${metrics.innerWidth} document=${metrics.documentWidth} body=${metrics.bodyWidth}`);
			if (!passed) failures.push({ width, route, metrics });
		}
	}

	await command('Emulation.setDeviceMetricsOverride', { width: 768, height: 900, deviceScaleFactor: 1, mobile: false });
	await command('Page.navigate', { url: `${baseUrl}/projects` });
	await delay(500);
	const focusSequence = [];
	for (let index = 0; index < 8; index += 1) {
		await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
		await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
		const focused = await command('Runtime.evaluate', {
			expression: `({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim().slice(0, 40), label: document.activeElement?.getAttribute('aria-label') })`,
			returnByValue: true,
		});
		focusSequence.push(focused.result.value);
	}
	console.log('Keyboard focus:', JSON.stringify(focusSequence));
	if (focusSequence.filter(({ tag }) => tag === 'A' || tag === 'BUTTON').length < 6) failures.push({ focusSequence });

	socket.close();
	if (failures.length) {
		console.error(JSON.stringify(failures, null, 2));
		process.exitCode = 1;
	}
} finally {
	browser.kill();
}
