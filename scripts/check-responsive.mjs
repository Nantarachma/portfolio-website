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

	const routes = [
		'/',
		'/projects',
		'/projects/shara',
		'/about',
		'/contact',
		'/research',
		'/does-not-exist',
		'/admin/login',
		'/admin',
		'/admin/content',
		'/admin/media',
		'/admin/history',
	];
	const widths = [320, 360, 390, 768, 1024, 1280, 1440];
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
				expression: `(() => {
					const isVisible = (element) => {
						const rect = element.getBoundingClientRect();
						return rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility !== 'hidden';
					};
					const clippedText = [...document.querySelectorAll('h1, h2, h3, p, dd')]
						.filter((element) => isVisible(element) && !element.closest('.project-filter-scroll') && element.scrollWidth > element.clientWidth + 1)
						.slice(0, 5)
						.map((element) => ({ tag: element.tagName, text: element.textContent?.trim().slice(0, 48), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth }));
					const undersizedTargets = [...document.querySelectorAll('.touch-target, .admin-button, .admin-mini-button, .site-menu-button, .site-mobile-link, .site-mobile-action, .site-header-action')]
						.filter((element) => isVisible(element) && element.getBoundingClientRect().height < 43.5)
						.slice(0, 5)
						.map((element) => ({ text: element.textContent?.trim().slice(0, 32), height: element.getBoundingClientRect().height }));
					const actions = document.querySelector('.hero-actions');
					const actionChildren = actions ? [...actions.children] : [];
					const actionWidth = actions?.getBoundingClientRect().width ?? 0;
					const heroActionsValid = !actions || innerWidth >= 640 || actionChildren.every((element, index) => {
						const childWidth = element.getBoundingClientRect().width;
						if (innerWidth < 360 || index === 0) return Math.abs(childWidth - actionWidth) < 2;
						return childWidth < actionWidth * 0.55;
					});

					return ({
					path: location.pathname,
					innerWidth,
					documentWidth: document.documentElement.scrollWidth,
					bodyWidth: document.body.scrollWidth,
					reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
					clippedText,
					undersizedTargets,
					heroActionsValid,
					heading: document.querySelector('h1')?.textContent?.trim() ?? '',
					focusables: document.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])').length
					});
				})()`,
				returnByValue: true,
			});
			const metrics = evaluation.result.value;
			const passed = metrics.innerWidth === width
				&& metrics.documentWidth <= width
				&& metrics.bodyWidth <= width
				&& metrics.reducedMotion
				&& metrics.clippedText.length === 0
				&& metrics.undersizedTargets.length === 0
				&& metrics.heroActionsValid
				&& metrics.heading
				&& metrics.focusables > 0;
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

	await command('Emulation.setDeviceMetricsOverride', { width: 360, height: 900, deviceScaleFactor: 1, mobile: true });
	await command('Page.navigate', { url: `${baseUrl}/` });
	await delay(450);
	const mobileMenuOpened = await command('Runtime.evaluate', {
		expression: `(() => {
			const trigger = document.querySelector('button[aria-label="Open navigation menu"]');
			trigger?.click();
			return Boolean(trigger);
		})()`,
		returnByValue: true,
	});
	await delay(100);
	const mobileMenuState = await command('Runtime.evaluate', {
		expression: `({
			visible: Boolean(document.querySelector('#mobile-navigation')?.getBoundingClientRect().height),
			links: document.querySelectorAll('#mobile-navigation a[href]').length,
			expanded: document.querySelector('button[aria-controls="mobile-navigation"]')?.getAttribute('aria-expanded')
		})`,
		returnByValue: true,
	});
	console.log('Mobile menu:', JSON.stringify(mobileMenuState.result.value));
	if (!mobileMenuOpened.result.value || !mobileMenuState.result.value.visible || mobileMenuState.result.value.links < 6 || mobileMenuState.result.value.expanded !== 'true') failures.push({ mobileMenu: mobileMenuState.result.value });

	await command('Emulation.setDeviceMetricsOverride', { width: 768, height: 900, deviceScaleFactor: 1, mobile: false });
	await command('Page.navigate', { url: `${baseUrl}/projects` });
	await delay(450);
	const filterActivated = await command('Runtime.evaluate', {
		expression: `(() => {
			const button = document.querySelectorAll('button[aria-controls="project-results"]')[1];
			button?.click();
			return Boolean(button);
		})()`,
		returnByValue: true,
	});
	await delay(200);
	const filterState = await command('Runtime.evaluate', {
		expression: `({
			selected: document.querySelectorAll('button[aria-controls="project-results"][aria-pressed="true"]').length,
			cards: document.querySelectorAll('#project-results article').length
		})`,
		returnByValue: true,
	});
	console.log('Project filter:', JSON.stringify(filterState.result.value));
	if (!filterActivated.result.value || filterState.result.value.selected !== 1 || filterState.result.value.cards <= 0 || filterState.result.value.cards >= 9) failures.push({ projectFilter: filterState.result.value });

	socket.close();
	if (failures.length) {
		console.error(JSON.stringify(failures, null, 2));
		process.exitCode = 1;
	}
} finally {
	browser.kill();
}
