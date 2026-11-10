"use client";

import { useEffect, useRef } from "react";
import { createStage, type Three } from "@/lib/three-stage";
import type * as T from "three";

export type ChromeShape = "heart" | "nib" | "registration";

/** A chrome object floating in its card: slow spin, a gentle bob and a tilt toward the cursor. */
export function ChromeIcon({ shape }: { shape: ChromeShape }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;

    (async () => {
      const el = host.current;
      if (!el) return;
      const stage = await createStage(el, 26);
      if (!stage || cancelled) return stage?.dispose();
      const { THREE, scene, camera } = stage;

      const chrome = new THREE.MeshStandardMaterial({ color: 0xd9d9de, metalness: 1, roughness: 0.12, envMapIntensity: 1.4 });
      const object = build(THREE, shape, chrome);
      scene.add(object);
      camera.position.set(0, 0, 6);
      scene.add(new THREE.DirectionalLight(0xffffff, 0.8));

      const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        tilt.tx = ((e.clientY - r.top) / r.height - 0.5) * 0.8;
        tilt.ty = ((e.clientX - r.left) / r.width - 0.5) * 1.2;
      };
      const onLeave = () => ((tilt.tx = 0), (tilt.ty = 0));
      const card = el.closest(".service-card") ?? el;
      card.addEventListener("pointermove", onMove as EventListener);
      card.addEventListener("pointerleave", onLeave);

      const phase = { heart: 0, nib: 2.1, registration: 4.2 }[shape];
      stage.start((t) => {
        tilt.x += (tilt.tx - tilt.x) * 0.08;
        tilt.y += (tilt.ty - tilt.y) * 0.08;
        object.rotation.set(0.25 + tilt.x + Math.sin(t * 0.5 + phase) * 0.12, t * 0.45 + phase + tilt.y, Math.sin(t * 0.3 + phase) * 0.08);
        object.position.y = Math.sin(t * 1.1 + phase) * 0.12;
      });

      dispose = () => {
        card.removeEventListener("pointermove", onMove as EventListener);
        card.removeEventListener("pointerleave", onLeave);
        stage.dispose();
      };
    })();

    return () => {
      cancelled = true;
      dispose();
    };
  }, [shape]);

  return <div ref={host} className="chrome-icon" aria-hidden="true" />;
}

function build(THREE: Three, shape: ChromeShape, material: T.Material): T.Object3D {
  const extrude = (s: T.Shape, depth = 0.35) => {
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.07, bevelSegments: 8, curveSegments: 48 });
    g.center();
    return new THREE.Mesh(g, material);
  };

  if (shape === "heart") {
    // Social media: a like.
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
    // Brand identity: the pen tool's nib.
    const s = new THREE.Shape();
    s.moveTo(0, 1.3);
    s.lineTo(0.82, 0.05);
    s.quadraticCurveTo(0.6, -0.55, 0.42, -0.95);
    s.lineTo(-0.42, -0.95);
    s.quadraticCurveTo(-0.6, -0.55, -0.82, 0.05);
    s.lineTo(0, 1.3);
    const hole = new THREE.Path();
    hole.absarc(0, 0.12, 0.17, 0, Math.PI * 2, true);
    s.holes.push(hole);
    const nib = extrude(s, 0.28);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.32, 0.42), material);
    cap.position.y = -1.18;
    const group = new THREE.Group();
    group.add(nib, cap);
    group.position.y = 0.08;
    return group;
  }

  // Print: a registration mark.
  const group = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.09, 32, 96), material);
  const inner = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.08, 32, 72), material);
  const barGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.5, 24);
  const v = new THREE.Mesh(barGeo, material);
  const h = new THREE.Mesh(barGeo, material);
  h.rotation.z = Math.PI / 2;
  group.add(ring, inner, v, h);
  return group;
}
