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
	/** Label topik yang melayang di samping kursor (posisi ditulis per frame). */
	const labelRef = useRef<HTMLDivElement>(null);
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
		world.scale.setScalar(0.8); // lega dari judul noir, clip tepi minim
		scene.add(world);

		// ---- geometri/material (disposal manual di cleanup) ----
		const gridGeo = new THREE.BufferGeometry();
		gridGeo.setAttribute('position', new THREE.BufferAttribute(gridPositions(), 3));
		const gridMat = new THREE.LineBasicMaterial({
			color: 0xf2efe8, // ink komik (noir: putih = tinta)
			transparent: true,
			opacity: 0.35,
		});
		const gridMesh = new THREE.LineSegments(gridGeo, gridMat);
		world.add(gridMesh);

		/* Chromatic ghost: dua salinan wireframe offset kiri/kanan dgn warna
		   plate CMYK — misregistration cetak ala Spider-Verse. */
		const ghostMatR = new THREE.LineBasicMaterial({ color: 0xe62429, transparent: true, opacity: 0.28 });
		const ghostMatC = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.28 });
		const ghostR = new THREE.LineSegments(gridGeo, ghostMatR);
		const ghostC = new THREE.LineSegments(gridGeo, ghostMatC);
		ghostR.position.x = 0.035;
		ghostC.position.x = -0.035;
		ghostR.scale.setScalar(1.004);
		ghostC.scale.setScalar(1.004);
		world.add(ghostR, ghostC);

		/* Halftone shading: sphere dgn texture titik Ben-Day (canvas prosedural)
		   — shading komik, bukan smooth gradient CG. */
		const dotCanvas = document.createElement('canvas');
		dotCanvas.width = 64;
		dotCanvas.height = 64;
		const dctx = dotCanvas.getContext('2d');
		if (dctx) {
			dctx.clearRect(0, 0, 64, 64);
			dctx.fillStyle = 'rgba(196, 182, 255, 0.95)'; // lavender terang — menonjol di ungu gelap
			dctx.beginPath();
			dctx.arc(32, 32, 5.5, 0, Math.PI * 2);
			dctx.fill();
			}
			const dotTex = new THREE.CanvasTexture(dotCanvas);
			dotTex.wrapS = THREE.RepeatWrapping;
			dotTex.wrapT = THREE.RepeatWrapping;
			dotTex.repeat.set(16, 11); // Ben-Day rapat ala cetak komik
		const haloMat = new THREE.MeshBasicMaterial({
			map: dotTex,
			transparent: true,
			opacity: 0.65,
			depthWrite: false,
		});
		const halo = new THREE.Mesh(new THREE.SphereGeometry(R * 0.99, 32, 24), haloMat);
		world.add(halo);

		// ---- node topik ----
		const nodeGeo = new THREE.SphereGeometry(0.03, 10, 8);
		const nodes: THREE.Mesh[] = [];
		const basePos: THREE.Vector3[] = [];
		const burstDir: THREE.Vector3[] = [];
		const nodeMats: THREE.MeshBasicMaterial[] = [];
		for (let i = 0; i < TOPICS.length; i++) {
			const mat = new THREE.MeshBasicMaterial({
				color: 0x00e5ff,
				transparent: true,
				opacity: 0.95,
			});
			const mesh = new THREE.Mesh(nodeGeo, mat);
			const base = nodeBase(i, TOPICS.length);
			mesh.position.copy(base);
			// Arah terurai = radial-out SEARAH posisi golden-angle (sudah
			// quasi-merata) + chaos ringan 0.45 → radius akhir ≈ 2.55,
			// isotropik menyebar rata ke segala arah & menjangkau tepi.
			// (JANGAN negate: menembus pusat justru menyempit ke 0.55.)
			const dir = base
				.clone()
				.add(
					new THREE.Vector3(
						Math.sin(i * 12.9898) * 0.45,
						Math.cos(i * 78.233) * 0.45,
						Math.sin(i * 39.425) * 0.45,
					),
				)
				.normalize();
			world.add(mesh);
			nodes.push(mesh);
			basePos.push(base);
			burstDir.push(dir);
			nodeMats.push(mat);
		}

		/* Netralkan momentum: kurangi centroid burstDir lalu renormalisasi
		   supaya penyebaran explode menyebar merata ke SEGALA arah —
		   sebelumnya random vector sederhana bias ke kanan (3:7). */
		const centroid = new THREE.Vector3();
		for (const d of burstDir) centroid.add(d);
		centroid.multiplyScalar(1 / burstDir.length);
		for (const d of burstDir) d.sub(centroid).normalize();

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
		// vertexColors: warna per-segmen → edge yang menyentuh node aktif bisa
		// menyala tanpa draw call tambahan (update hanya saat node aktif berubah).
		const linkCol = new Float32Array(pairs.length * 6);
		linkGeo.setAttribute('color', new THREE.BufferAttribute(linkCol, 3));
		const linkMat = new THREE.LineBasicMaterial({
			vertexColors: true,
			transparent: true,
			opacity: 0.08,
		});
		world.add(new THREE.LineSegments(linkGeo, linkMat));

		// ---- energy pulse: titik energi berjalan di tiap link (loop —
		// dispensasi globe idle, bukan animasi entrance). Vertices dibaca
		// dari linkArr tiap frame → pulse OTOMATIS ikut explode/reassemble.
		// Warna per-link cyan/merah (identity Miles) + additive glow.
		const pulseGeo = new THREE.BufferGeometry();
		const pulseArr = new Float32Array(pairs.length * 3);
		pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulseArr, 3));
		const pulseCol = new Float32Array(pairs.length * 3);
		for (let k = 0; k < pairs.length; k++) {
			const c = k % 2 === 0 ? [0.0, 0.9, 1.0] : [0.9, 0.14, 0.16];
			pulseCol[k * 3] = c[0];
			pulseCol[k * 3 + 1] = c[1];
			pulseCol[k * 3 + 2] = c[2];
		}
		pulseGeo.setAttribute('color', new THREE.BufferAttribute(pulseCol, 3));
		const pulseMat = new THREE.PointsMaterial({
			size: 7,
			sizeAttenuation: false,
			vertexColors: true,
			transparent: true,
			opacity: 0.6,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
		});
		world.add(new THREE.Points(pulseGeo, pulseMat));

		// ---- interaktif: hover raycast + click-lock + drag orbit ----
		const raycaster = new THREE.Raycaster();
		const ndc = new THREE.Vector2();
		const COL_BASE = new THREE.Color(0x4b3a8c);
		const COL_HOT = new THREE.Color(0x00e5ff);
		const NODE_BASE = new THREE.Color(0x00e5ff); // cyan Miles
		const NODE_HOT = new THREE.Color(0xffd400); // flare — node aktif menyala
		let hoverIdx = -1;
		let lockIdx = -1;
		let activeIdx = -1;
		let speedMul = 1; // 1 → orbit jalan, 0 → pause saat node aktif (lerp)
		let dragging = false;
		let dragMoved = 0;
		let prevX = 0;
		let prevY = 0;
		let dragYaw = 0;
		let dragPitch = 0;
		let velYaw = 0;
		let velPitch = 0;
		let lastX = -1;
		let lastY = -1;
		let pointerIn = false;

		const paintLinks = (active: number): void => {
			for (let k = 0; k < pairs.length; k++) {
				const hot = active >= 0 && (pairs[k][0] === active || pairs[k][1] === active);
				const c = hot ? COL_HOT : COL_BASE;
				for (let v = 0; v < 2; v++) {
					const o = k * 6 + v * 3;
					linkCol[o] = c.r;
					linkCol[o + 1] = c.g;
					linkCol[o + 2] = c.b;
				}
			}
			linkGeo.attributes.color.needsUpdate = true;
			for (let i = 0; i < nodeMats.length; i++) {
				nodeMats[i].color.copy(i === active ? NODE_HOT : NODE_BASE);
			}
		};

		const updateLabel = (): void => {
			const el = labelRef.current;
			if (!el) return;
			if (activeIdx >= 0) {
				el.textContent = TOPICS[activeIdx];
				el.style.opacity = '1';
			} else {
				el.style.opacity = '0';
			}
		};

		const hitAt = (x: number, y: number, w: number, h: number): number => {
			ndc.set((x / w) * 2 - 1, -(y / h) * 2 + 1);
			raycaster.setFromCamera(ndc, camera);
			const hit = raycaster.intersectObjects(nodes, false)[0];
			return hit ? nodes.indexOf(hit.object as THREE.Mesh) : -1;
		};

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
		let pulseT = 0; // akumulasi waktu utk energy pulse (pause ikut speedMul)
		let last = 0;
		let cw = 0;
		let ch = 0;
		// Offset globe ke kanan dlm satuan frustum (ikut aspect viewport):
		// 0.52 ndc → pusat di 76% layar (persis slot lama), 0 utk layar sempit.
		const FRAC = window.matchMedia('(min-width: 1024px)').matches ? 0.52 : 0;

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

			// orbit: lambat saat tenang & saat stabil, cepat saat terurai.
			// Hover/lock node → orbit pause (lerp ke 0, bukan hentian mendadak).
			const targetSpeed = activeIdx >= 0 ? 0 : 1;
			speedMul += (targetSpeed - speedMul) * Math.min(1, dt * 10);
			spin += dt * (0.06 + 0.1 * calm + 0.05 * reassemble + 0.5 * burst) * speedMul;

			// drag orbit: offset manual di atas spin otomatis + inersia setelah lepas.
			if (!dragging) {
				dragYaw += velYaw;
				dragPitch = Math.max(-0.5, Math.min(0.5, dragPitch + velPitch));
				velYaw *= 0.93;
				velPitch *= 0.93;
				if (Math.abs(velYaw) < 1e-5) velYaw = 0;
				if (Math.abs(velPitch) < 1e-5) velPitch = 0;
			}
			world.rotation.y = spin + dragYaw;
			world.rotation.x = Math.max(-0.6, Math.min(0.9, 0.32 + Math.sin(spin * 0.5) * 0.05 + dragPitch));
			camera.position.z = CAM_Z + 0.6 * burst; // dolly saat ledakan
			// posisi kanan via offset 3D — canvas full-bleed, node menyebar
			// bebas ke seluruh layar. Saat explode offset melebur ke tengah
			// (× 1-burst) supaya penyebaran menjangkau kiri layar juga,
			// bukan condong kanan.
			if (FRAC !== 0) {
				const halfW = Math.tan(((camera.fov * Math.PI) / 180) / 2) * camera.position.z * camera.aspect;
				world.position.x = FRAC * halfW * (1 - burst);
			}

			// raycast node: posisi berubah tiap frame → ray per frame saat pointer di dalam
			let hit = -1;
			if (pointerIn && !dragging && cw > 0 && ch > 0) {
				scene.updateMatrixWorld();
				hit = hitAt(lastX, lastY, cw, ch);
			}
			const nextActive = lockIdx >= 0 ? lockIdx : hit;
			hoverIdx = hit;
			if (nextActive !== activeIdx) {
				activeIdx = nextActive;
				paintLinks(activeIdx);
				updateLabel();
			}
			if (labelRef.current && activeIdx >= 0) {
				labelRef.current.style.transform = 'translate3d(' + (lastX + 18) + 'px,' + (lastY - 12) + 'px,0)';
			}

			// node: transform posisi + skala saja (geometry tidak pernah dibangun ulang)
			for (let i = 0; i < nodes.length; i++) {
				const m = nodes[i];
				m.position.copy(basePos[i]).addScaledVector(burstDir[i], burst * 1.55);
				const isActive = i === activeIdx;
				const dimmed = activeIdx >= 0 && !isActive;
				// node aktif: membesar + pulse halus; sisanya redup (bukan hilang)
				const s = (1 + 1.3 * burst) * (isActive ? 1.75 + 0.22 * Math.sin(t / 240) : 1);
				m.scale.setScalar(s);
				nodeMats[i].opacity = (0.95 - 0.35 * burst) * (dimmed ? 0.25 : 1);
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

			// energy pulse: lerp di sepanjang segmen dari linkArr (ikut
			// explode); offset tiap link beda → arus tak seragam. Pause
			// ikut speedMul (hover node / tab background = diam).
			pulseT += dt * speedMul;
			for (let k = 0; k < pairs.length; k++) {
				const o = k * 6;
				const frac = (pulseT * (0.14 + (k % 5) * 0.02) + k * 0.37) % 1;
				const q = k * 3;
				pulseArr[q] = linkArr[o] + (linkArr[o + 3] - linkArr[o]) * frac;
				pulseArr[q + 1] = linkArr[o + 1] + (linkArr[o + 4] - linkArr[o + 1]) * frac;
				pulseArr[q + 2] = linkArr[o + 2] + (linkArr[o + 5] - linkArr[o + 2]) * frac;
			}
			pulseGeo.attributes.position.needsUpdate = true;
			// tenang 0.55 · reassemble menyala 0.95 · explode redup 0
			pulseMat.opacity = (0.55 + 0.4 * reassemble) * (1 - burst);

			// debug probe (dihapus setelah QA): angka arc terbaca dari DOM
			if (hostRef.current) {
				hostRef.current.dataset.p = pS.toFixed(3);
				hostRef.current.dataset.burst = burst.toFixed(3);
				hostRef.current.dataset.reass = reassemble.toFixed(3);
				hostRef.current.dataset.active = String(activeIdx);
				hostRef.current.dataset.drag = dragging ? '1' : '0';
			}

			// globe LARUT saat terurai ("broke apart"): fade keras + kontraksi
			// siluet, lalu kembali menyusun bersama reassemble.
			gridMat.opacity = 0.35 * Math.pow(1 - burst, 3);
			gridMesh.scale.setScalar(1 - 0.3 * burst);
			// ghost CMYK & halftone halo ikut kontraksi/fade (misregistration ikut larut)
			const gs = (1 - 0.3 * burst) * 1.004;
			ghostR.scale.setScalar(gs);
			ghostC.scale.setScalar(gs);
			ghostMatR.opacity = 0.28 * Math.pow(1 - burst, 3);
			ghostMatC.opacity = 0.28 * Math.pow(1 - burst, 3);
			halo.scale.setScalar(1 - 0.3 * burst);
			haloMat.opacity = 0.65 * Math.pow(1 - burst, 3);

			renderer.render(scene, camera);
		};

		paintLinks(-1); // warna dasar sebelum render pertama

		// ---- pointer: hover raycast (per frame), drag orbit, click = kunci label ----
		const onMove = (e: PointerEvent): void => {
			const rect = host.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			if (dragging) {
				const dx = x - prevX;
				const dy = y - prevY;
				prevX = x;
				prevY = y;
				dragMoved += Math.abs(dx) + Math.abs(dy);
				dragYaw += dx * 0.005;
				dragPitch = Math.max(-0.5, Math.min(0.5, dragPitch + dy * 0.004));
				velYaw = dx * 0.005 * 8; // perkiraan vektor utk inersia
				velPitch = dy * 0.004 * 8;
				return;
			}
			lastX = x;
			lastY = y;
			pointerIn = true;
			canvas.style.cursor = hoverIdx >= 0 ? 'pointer' : 'grab';
		};
		const onDown = (e: PointerEvent): void => {
			if (e.button !== 0) return;
			dragging = true;
			dragMoved = 0;
			const rect = host.getBoundingClientRect();
			prevX = e.clientX - rect.left;
			prevY = e.clientY - rect.top;
			lastX = prevX;
			lastY = prevY;
			canvas.setPointerCapture(e.pointerId);
			canvas.style.cursor = 'grabbing';
		};
		const onUp = (e: PointerEvent): void => {
			if (!dragging) return;
			dragging = false;
			try {
				canvas.releasePointerCapture(e.pointerId);
			} catch {
				/* pointer sudah lepas */
			}
			canvas.style.cursor = hoverIdx >= 0 ? 'pointer' : 'grab';
			// klik (tanpa geser) = kunci label; klik kosong / klik node sama = lepas
			if (dragMoved < 5 && cw > 0 && ch > 0) {
				scene.updateMatrixWorld();
				const idx = hitAt(lastX, lastY, cw, ch);
				lockIdx = idx >= 0 && idx !== lockIdx ? idx : -1;
				if (lockIdx < 0 && idx < 0) lockIdx = -1;
			}
		};
		const onLeave = (): void => {
			pointerIn = false;
			lastX = -1;
			lastY = -1;
			lockIdx = -1; // meninggalkan globe melepas kunci
			hoverIdx = -1;
		};
		canvas.addEventListener('pointermove', onMove);
		canvas.addEventListener('pointerdown', onDown);
		canvas.addEventListener('pointerup', onUp);
		canvas.addEventListener('pointercancel', onUp);
		canvas.addEventListener('pointerleave', onLeave);
		canvas.style.touchAction = 'pan-y'; // vertikal = scroll halus Lenis, horizontal = drag globe
		canvas.style.cursor = 'grab';
		// slot induk memakai pointer-events:none agar teks tetap di atas;
		// anak canvas mengaktifkan kembali eventsnya sendiri.
		canvas.style.pointerEvents = 'auto';

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
			ghostMatR.dispose();
			ghostMatC.dispose();
			haloMat.dispose();
			halo.geometry.dispose();
			dotTex.dispose();
			nodeGeo.dispose();
			for (const m of nodeMats) m.dispose();
			linkGeo.dispose();
			pulseGeo.dispose();
			pulseMat.dispose();
			linkMat.dispose();
			renderer.dispose();
			canvas.removeEventListener('pointermove', onMove);
			canvas.removeEventListener('pointerdown', onDown);
			canvas.removeEventListener('pointerup', onUp);
			canvas.removeEventListener('pointercancel', onUp);
			canvas.removeEventListener('pointerleave', onLeave);
			if (canvas.parentNode === host) host.removeChild(canvas);
		};
	}, []);

	return (
		<div ref={hostRef} className={className} style={{ position: 'absolute', inset: 0 }}>
			<div
				ref={labelRef}
				className='pointer-events-none absolute left-0 top-0 z-10 border border-rule bg-void/95 px-2.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-signal opacity-0 transition-opacity duration-150'
				aria-hidden='true'
			/>
		</div>
	);
}
