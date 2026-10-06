'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroNetwork — globe wireframe + node topik + garis koneksi.
 * Arca dikendalikan progress scroll act (scrollcraft engine):
 * engine menulis `--sc-p` (0..1) sebagai INLINE STYLE di elemen act
 * (scrollcraft.js:886 `a.el.style.setProperty('--sc-p', ...)`),
 * jadi dibaca per frame via el.style.getPropertyValue('--sc-p').
 * Tidak ada window scroll listener.
 *
 * Fase: p<0.15 tenang/orbit lambat · 0.22-0.55 EXPLODE (node + garis terurai)
 *       0.55-0.85 reassemble + koneksi menyala · >0.85 stabil orbit pelan.
 */
type Props = { className?: string };

/** Label topik: hanya data tekstual, TIDAK dirender sebagai teks di canvas. */
const TOPICS = [
	'ML',
	'CV',
	'NLP',
	'Mobile',
	'Web',
	'Data',
	'Cloud',
	'Sec',
	'DevOps',
	'RL',
	'Graph',
	'Audio',
	'IoT',
	'Edge',
] as const;

const R = 1; // radius globe
const CAM_Z = 3.4;
const MERIDIANS = 16; // garis bujur
const PARALLELS = 9; // garis lintang
const SEGS = 24; // segmen per garis (<= ~1500 segmen total)

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (a: number, b: number, x: number): number => {
	const t = clamp01((x - a) / (b - a));
	return t * t * (3 - 2 * t);
};

/** Grid lat/long murni (bukan triangulasi sphere) sebagai LineSegments. */
function gridPositions(): Float32Array {
	const out: number[] = [];
	const a = new THREE.Vector3();
	const b = new THREE.Vector3();
	const seg = (p0: THREE.Vector3, p1: THREE.Vector3): void => {
		out.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
	};
	// bujur: busur kutub-ke-kutub
	for (let m = 0; m < MERIDIANS; m++) {
		const az = (m / MERIDIANS) * Math.PI * 2;
		for (let s = 0; s < SEGS; s++) {
			a.setFromSphericalCoords(R, (s / SEGS) * Math.PI, az);
			b.setFromSphericalCoords(R, ((s + 1) / SEGS) * Math.PI, az);
			seg(a, b);
		}
	}
	// lintang: lingkaran paralel (lewati kutub)
	for (let p = 1; p < PARALLELS; p++) {
		const polar = (p / PARALLELS) * Math.PI;
		for (let s = 0; s < SEGS; s++) {
			a.setFromSphericalCoords(R, polar, (s / SEGS) * Math.PI * 2);
			b.setFromSphericalCoords(R, polar, ((s + 1) / SEGS) * Math.PI * 2);
			seg(a, b);
		}
	}
	return new Float32Array(out);
}

/** Sebar node rata di sphere via golden-angle spiral. */
function nodeBase(i: number, n: number): THREE.Vector3 {
	const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
	const r = Math.sqrt(Math.max(0, 1 - y * y));
	const az = i * 2.399963229728653; // golden angle
	return new THREE.Vector3(r * Math.cos(az), y, r * Math.sin(az));
}

export default function HeroNetwork({ className }: Props) {
	const hostRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const host = hostRef.current;
		if (!host) return;

		// ---- progress source: act terdekat, inline --sc-p (fallback computed) ----
		const act = host.closest<HTMLElement>('[data-sc-act]');
		const readP = (): number => {
			if (!act) return 0;
			const inline = act.style.getPropertyValue('--sc-p');
			const raw = inline !== '' ? inline : getComputedStyle(act).getPropertyValue('--sc-p');
			const v = parseFloat(raw);
			return Number.isFinite(v) ? clamp01(v) : 0;
		};

		let disposed = false;
		let renderer: THREE.WebGLRenderer;
		try {
			renderer = new THREE.WebGLRenderer({
				alpha: true,
				antialias: true,
				powerPreference: 'high-performance',
			});
		} catch {
			return; // tanpa WebGL: hero tetap jalan tanpa kanvas
		}
		if (disposed) {
			renderer.dispose();
			return;
		}

		// perf: DPR dibatasi 2, bg transparan
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		renderer.setClearColor(0x000000, 0);
		const canvas = renderer.domElement;
		canvas.style.display = 'block';
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		host.appendChild(canvas);

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
		camera.position.set(0, 0, CAM_Z);

		// grup globe: semua node & garis anak grup ini → rotasi tunggal
		const world = new THREE.Group();
		world.rotation.x = 0.32;
		scene.add(world);

		// ---- geometri/material (disposal manual di cleanup) ----
		const gridGeo = new THREE.BufferGeometry();
		gridGeo.setAttribute('position', new THREE.BufferAttribute(gridPositions(), 3));
		const gridMat = new THREE.LineBasicMaterial({
			color: 0xeef1f6,
			transparent: true,
			opacity: 0.3,
		});
		const gridMesh = new THREE.LineSegments(gridGeo, gridMat);
		world.add(gridMesh);

		// ---- node topik ----
		const nodeGeo = new THREE.SphereGeometry(0.03, 10, 8);
		const nodes: THREE.Mesh[] = [];
		const basePos: THREE.Vector3[] = [];
		const burstDir: THREE.Vector3[] = [];
		const nodeMats: THREE.MeshBasicMaterial[] = [];
		for (let i = 0; i < TOPICS.length; i++) {
			const mat = new THREE.MeshBasicMaterial({
				color: 0x60a5fa,
				transparent: true,
				opacity: 0.95,
			});
			const mesh = new THREE.Mesh(nodeGeo, mat);
			const base = nodeBase(i, TOPICS.length);
			mesh.position.copy(base);
			// arah terurai: sedikit acak, tetap menyimpang dari permukaan
			const dir = base
				.clone()
				.add(new THREE.Vector3(Math.sin(i * 12.9898) * 0.55, Math.cos(i * 78.233) * 0.55, Math.sin(i * 39.425) * 0.55))
				.normalize();
			world.add(mesh);
			nodes.push(mesh);
			basePos.push(base);
			burstDir.push(dir);
			nodeMats.push(mat);
		}

		// ---- koneksi: satu LineSegments (1 draw call) ----
		const pairs: [number, number][] = [];
		const n = nodes.length;
		for (let i = 0; i < n; i++) {
			pairs.push([i, (i + 1) % n]); // cincin terdekat
			if (i % 2 === 0) pairs.push([i, (i + 4) % n]); // silang longgar
		}
		const linkGeo = new THREE.BufferGeometry();
		const linkArr = new Float32Array(pairs.length * 6);
		linkGeo.setAttribute('position', new THREE.BufferAttribute(linkArr, 3));
		const linkMat = new THREE.LineBasicMaterial({
			color: 0x93c5fd,
			transparent: true,
			opacity: 0.08,
		});
		world.add(new THREE.LineSegments(linkGeo, linkMat));

		// ---- visibilitas: pause saat tak terlihat / tab sembunyi ----
		let inView = true;
		let pageVisible = !document.hidden;
		const io =
			'IntersectionObserver' in window
				? new IntersectionObserver(
						(entries) => {
							inView = entries.some((e) => e.isIntersecting);
							if (inView && pageVisible) kick();
						},
						{ rootMargin: '80px' },
					)
				: null;
		io?.observe(host);
		const onVis = (): void => {
			pageVisible = !document.hidden;
			if (pageVisible && inView) kick();
		};
		document.addEventListener('visibilitychange', onVis);

		// ---- loop render sendiri (rAF) ----
		let raf = 0;
		let pS = readP(); // progress tersaring (lerp per frame → halus)
		let spin = 0;
		let last = 0;
		let cw = 0;
		let ch = 0;

		const frame = (t: number): void => {
			raf = 0;
			if (disposed) return;
			if (!inView || !pageVisible) return; // pause: rAF berhenti, kick() nyalakan lagi
			raf = requestAnimationFrame(frame);

			const dt = last ? Math.min((t - last) / 1000, 0.05) : 0.016;
			last = t;

			// ukuran kanvas mengikuti host
			const w = host.clientWidth;
			const h = host.clientHeight;
			if (w > 0 && h > 0 && (w !== cw || h !== ch)) {
				cw = w;
				ch = h;
				renderer.setSize(w, h, false);
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
			}

			// baca progress act tiap frame (inline style, murah), lalu haluskan
			const pT = readP();
			pS += (pT - pS) * Math.min(1, dt * 6);

			// arca: 0=terpasang tenang · 0.22-0.55 meledak · 0.55-0.85 tersusun · >0.85 stabil
			const burst = Math.max(0, smoothstep(0.22, 0.5, pS) - smoothstep(0.55, 0.85, pS));
			const reassemble = smoothstep(0.55, 0.85, pS);
			const calm = smoothstep(0.0, 0.15, pS); // 0 di momen sunyi → orbit paling lambat

			// orbit: lambat saat tenang & saat stabil, cepat saat terurai
			spin += dt * (0.06 + 0.1 * calm + 0.05 * reassemble + 0.5 * burst);
			world.rotation.y = spin;
			world.rotation.x = 0.32 + Math.sin(spin * 0.5) * 0.05;
			camera.position.z = CAM_Z + 0.6 * burst; // dolly saat ledakan

			// node: transform posisi + skala saja (geometry tidak pernah dibangun ulang)
			for (let i = 0; i < nodes.length; i++) {
				const m = nodes[i];
				m.position.copy(basePos[i]).addScaledVector(burstDir[i], burst * 1.55);
				const s = 1 + 1.3 * burst;
				m.scale.setScalar(s);
				nodeMats[i].opacity = 0.95 - 0.35 * burst;
			}

			// koneksi: ikuti posisi node (2 titik per segmen), menyala di akhir act
			for (let k = 0; k < pairs.length; k++) {
				const [ai, bi] = pairs[k];
				const pa = nodes[ai].position;
				const pb = nodes[bi].position;
				const o = k * 6;
				linkArr[o] = pa.x;
				linkArr[o + 1] = pa.y;
				linkArr[o + 2] = pa.z;
				linkArr[o + 3] = pb.x;
				linkArr[o + 4] = pb.y;
				linkArr[o + 5] = pb.z;
			}
			linkGeo.attributes.position.needsUpdate = true;
			linkMat.opacity = (0.08 + 0.8 * reassemble) * (1 - 0.9 * burst);

			// debug probe (dihapus setelah QA): angka arc terbaca dari DOM
			if (hostRef.current) {
				hostRef.current.dataset.p = pS.toFixed(3);
				hostRef.current.dataset.burst = burst.toFixed(3);
				hostRef.current.dataset.reass = reassemble.toFixed(3);
			}

			// globe LARUT saat terurai ("broke apart"): fade keras + kontraksi
			// siluet, lalu kembali menyusun bersama reassemble.
			gridMat.opacity = 0.3 * Math.pow(1 - burst, 3);
			gridMesh.scale.setScalar(1 - 0.3 * burst);

			renderer.render(scene, camera);
		};

		function kick(): void {
			if (!raf && !disposed && inView && pageVisible) {
				last = 0;
				raf = requestAnimationFrame(frame);
			}
		}
		kick();

		// ---- strict-mode safe cleanup ----
		return () => {
			disposed = true;
			if (raf) cancelAnimationFrame(raf);
			raf = 0;
			io?.disconnect();
			document.removeEventListener('visibilitychange', onVis);
			gridGeo.dispose();
			gridMat.dispose();
			nodeGeo.dispose();
			for (const m of nodeMats) m.dispose();
			linkGeo.dispose();
			linkMat.dispose();
			renderer.dispose();
			if (canvas.parentNode === host) host.removeChild(canvas);
		};
	}, []);

	return <div ref={hostRef} className={className} style={{ position: 'absolute', inset: 0 }} />;
}
