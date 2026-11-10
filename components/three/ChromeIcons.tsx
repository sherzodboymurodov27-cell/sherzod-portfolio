"use client";

import { useEffect, useRef } from "react";
import type * as T from "three";
import { createStage, whenNear, type Three } from "@/lib/three-stage";

export type ChromeShape = "heart" | "nib" | "registration";

/**
 * All service icons share one WebGL canvas laid over the cards; each icon is
 * drawn into its card's media box with a scissored viewport. The canvas is
 * created only when the section comes near the viewport. Until then (and
 * without WebGL) each card shows a flat SVG of the same object.
 */
export function ChromeIcons({ shapes }: { shapes: ChromeShape[] }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;

    (async () => {
      const el = host.current;
      const list = el?.parentElement;
      if (!el || !list) return;
      await whenNear(list);
      if (cancelled) return;
      const stage = await createStage(el, 26);
      if (!stage) return;
      if (cancelled) return stage.dispose();
      dispose = () => stage.dispose();

      const { THREE, renderer, scene: baseScene } = stage;
      const medias = Array.from(list.querySelectorAll<HTMLElement>(".service-media"));
      const chrome = new THREE.MeshStandardMaterial({ color: 0xd9d9de, metalness: 1, roughness: 0.12, envMapIntensity: 1.4 });

      const items = medias.map((media, i) => {
        const scene = new THREE.Scene();
        scene.environment = baseScene.environment;
        scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
        const object = build(THREE, shapes[i % shapes.length], chrome);
        scene.add(object);
        const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
        camera.position.set(0, 0, 6);
        const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
        const card = media.closest<HTMLElement>(".service-card") ?? media;
        const move = (e: PointerEvent) => {
          const r = media.getBoundingClientRect();
          tilt.tx = ((e.clientY - r.top) / r.height - 0.5) * 0.8;
          tilt.ty = ((e.clientX - r.left) / r.width - 0.5) * 1.2;
        };
        const leave = () => ((tilt.tx = 0), (tilt.ty = 0));
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        return { media, scene, object, camera, tilt, card, move, leave, phase: i * 2.1 };
      });

      dispose = () => {
        items.forEach((it) => {
          it.card.removeEventListener("pointermove", it.move);
          it.card.removeEventListener("pointerleave", it.leave);
          it.scene.traverse((o) => (o as T.Mesh).geometry?.dispose?.());
        });
        chrome.dispose();
        stage.dispose();
      };

      stage.onFirstFrame(() => !cancelled && list.classList.add("is-3d"));
      renderer.setScissorTest(true);
      stage.start((t) => {
        const box = el.getBoundingClientRect();
        renderer.setScissor(0, 0, box.width, box.height);
        renderer.clear();
        for (const it of items) {
          const r = it.media.getBoundingClientRect();
          const x = r.left - box.left;
          const y = box.bottom - r.bottom;
          renderer.setViewport(x, y, r.width, r.height);
          renderer.setScissor(x, y, r.width, r.height);
          it.camera.aspect = r.width / r.height;
          it.camera.updateProjectionMatrix();
          it.tilt.x += (it.tilt.tx - it.tilt.x) * 0.08;
          it.tilt.y += (it.tilt.ty - it.tilt.y) * 0.08;
          it.object.rotation.set(0.25 + it.tilt.x + Math.sin(t * 0.5 + it.phase) * 0.12, t * 0.45 + it.phase + it.tilt.y, Math.sin(t * 0.3 + it.phase) * 0.08);
          it.object.position.y = Math.sin(t * 1.1 + it.phase) * 0.12;
          renderer.render(it.scene, it.camera);
        }
        return false;
      });
    })();

    return () => {
      cancelled = true;
      dispose();
    };
  }, [shapes]);

  return <div ref={host} className="chrome-canvas" aria-hidden="true" />;
}

/** Flat stand-ins shown before the 3D is ready or when WebGL is unavailable. */
export function ChromeFallback({ shape }: { shape: ChromeShape }) {
  return (
    <svg className="chrome-fallback" viewBox="-1.6 -1.6 3.2 3.2" aria-hidden="true">
      <defs>
        <linearGradient id={`metal-${shape}`} x1="0" y1="-1.4" x2="0" y2="1.4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F4F4F6" />
          <stop offset="0.5" stopColor="#9C9CA2" />
          <stop offset="1" stopColor="#E3E3E6" />
        </linearGradient>
      </defs>
      {shape === "heart" && (
        <path
          fill={`url(#metal-${shape})`}
          transform="scale(1,-1)"
          d="M0 -1.05C-.35 -.75 -1.15 -.2 -1.15 .38C-1.15 .85 -.78 1.12 -.42 1.12C-.18 1.12 -.04 .98 0 .82C.04 .98 .18 1.12 .42 1.12C.78 1.12 1.15 .85 1.15 .38C1.15 -.2 .35 -.75 0 -1.05Z"
        />
      )}
      {shape === "nib" && (
        <g fill={`url(#metal-${shape})`}>
          <path fillRule="evenodd" d={`${NIB_PATH} M0.16 0.02A0.16 0.16 0 1 0 -0.16 0.02A0.16 0.16 0 1 0 0.16 0.02Z`} transform="scale(0.92,-0.92)" />
        </g>
      )}
      {shape === "registration" && (
        <g fill="none" stroke={`url(#metal-${shape})`} strokeWidth="0.16">
          <circle r="0.78" />
          <circle r="0.36" />
          <path d="M0 -1.25V1.25M-1.25 0H1.25" strokeWidth="0.12" />
        </g>
      )}
    </svg>
  );
}

// Pen-tool nib: pointed tip up, slit to the breather hole, flat collar.
const NIB_PATH = "M0 1.35L0.7 0.15Q0.62 -0.5 0.46 -0.9L0.5 -1.25L-0.5 -1.25L-0.46 -0.9Q-0.62 -0.5 -0.7 0.15Z";

function build(THREE: Three, shape: ChromeShape, material: T.Material): T.Object3D {
  const extrude = (s: T.Shape, depth = 0.35) => {
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 8, curveSegments: 48 });
    g.center();
    return new THREE.Mesh(g, material);
  };

  if (shape === "heart") {
    const s = new THREE.Shape();
    s.moveTo(0, -1.05);
    s.bezierCurveTo(-0.35, -0.75, -1.15, -0.2, -1.15, 0.38);
    s.bezierCurveTo(-1.15, 0.85, -0.78, 1.12, -0.42, 1.12);
    s.bezierCurveTo(-0.18, 1.12, -0.04, 0.98, 0, 0.82);
    s.bezierCurveTo(0.04, 0.98, 0.18, 1.12, 0.42, 1.12);
    s.bezierCurveTo(0.78, 1.12, 1.15, 0.85, 1.15, 0.38);
    s.bezierCurveTo(1.15, -0.2, 0.35, -0.75, 0, -1.05);
    const m = extrude(s);
    m.scale.setScalar(0.95);
    return m;
  }

  if (shape === "nib") {
    const s = new THREE.Shape();
    s.moveTo(0, 1.35);
    s.lineTo(0.7, 0.15);
    s.quadraticCurveTo(0.62, -0.5, 0.46, -0.9);
    s.lineTo(0.5, -1.25);
    s.lineTo(-0.5, -1.25);
    s.lineTo(-0.46, -0.9);
    s.quadraticCurveTo(-0.62, -0.5, -0.7, 0.15);
    s.lineTo(0, 1.35);
    const hole = new THREE.Path();
    hole.absarc(0, 0.02, 0.16, 0, Math.PI * 2, true);
    s.holes.push(hole);
    const nib = extrude(s, 0.22);
    // The slit from the tip to the breather hole, the detail that makes it read as a nib.
    const slit = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1.1, 0.5), new THREE.MeshStandardMaterial({ color: 0x1a1a1c, metalness: 0.6, roughness: 0.4 }));
    slit.position.y = 0.72;
    const group = new THREE.Group();
    group.add(nib, slit);
    group.scale.setScalar(0.92);
    return group;
  }

  const group = new THREE.Group();
  group.add(new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.09, 32, 96), material));
  group.add(new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.08, 32, 72), material));
  const barGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.5, 24);
  const v = new THREE.Mesh(barGeo, material);
  const h = new THREE.Mesh(barGeo, material);
  h.rotation.z = Math.PI / 2;
  group.add(v, h);
  return group;
}
