"use client";

import { useEffect, useRef } from "react";

type Vec3 = { x: number; y: number; z: number };
type Ring = { radius: number; axis: "x" | "y" | "z"; speed: number; phase: number };

const RINGS: Ring[] = [
  { radius: 0.82, axis: "y", speed: 0.55, phase: 0 },
  { radius: 0.94, axis: "x", speed: -0.72, phase: 0.8 },
  { radius: 1.06, axis: "z", speed: 0.86, phase: 1.4 },
  { radius: 1.18, axis: "y", speed: -0.48, phase: 2.1 },
  { radius: 1.30, axis: "x", speed: 0.62, phase: 2.8 },
  { radius: 1.42, axis: "z", speed: -0.38, phase: 3.5 },
];

function rotate(v: Vec3, axis: Ring["axis"], angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  if (axis === "x") return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c };
  if (axis === "y") return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c, z: v.z };
}

function project(v: Vec3, width: number, height: number, scale: number): { x: number; y: number; depth: number } {
  const perspective = 1 / (1 + v.z * 0.22);
  return {
    x: width / 2 + v.x * scale * perspective,
    y: height / 2 + v.y * scale * perspective,
    depth: perspective,
  };
}

export function GyroRings() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    let disposed = false;
    let frame = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let last = performance.now();
    let elapsed = 0;

    const view = { x: 0.5, y: 0.4, targetX: 0.5, targetY: 0.4 };
    const pointer = { down: false, x: 0, y: 0 };

    const resize = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const down = (event: PointerEvent) => {
      pointer.down = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture?.(event.pointerId);
    };

    const move = (event: PointerEvent) => {
      if (!pointer.down) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      view.targetY += dx * 0.004;
      view.targetX += dy * 0.004;
    };

    const up = () => {
      pointer.down = false;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("pointerleave", up);

    const drawRing = (ring: Ring, time: number, scale: number) => {
      const points: Array<{ x: number; y: number; depth: number }> = [];
      const rotation = time * ring.speed + ring.phase;
      const segments = 120;

      for (let i = 0; i <= segments; i++) {
        const t = (i / segments) * Math.PI * 2;
        let point: Vec3 = { x: Math.cos(t) * ring.radius, y: Math.sin(t) * ring.radius, z: 0 };
        point = rotate(point, ring.axis, rotation);
        point = rotate(point, "x", view.x);
        point = rotate(point, "y", view.y);
        points.push(project(point, width, height, scale));
      }

      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        const alpha = 0.34 + Math.max(0, Math.min(0.42, (a.depth + b.depth - 1.55) * 0.55));
        ctx.strokeStyle = `rgba(232, 232, 238, ${alpha})`;
        ctx.lineWidth = 1.7 + ((a.depth + b.depth) / 2) * 1.0;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    };

    const tick = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      elapsed += dt;

      view.x += (view.targetX - view.x) * 0.055;
      view.y += (view.targetY - view.y) * 0.055;

      ctx.clearRect(0, 0, width, height);

      for (const ring of RINGS) drawRing(ring, elapsed, Math.min(width, height) * 0.28);

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("pointerleave", up);
      canvas.remove();
    };
  }, []);

  return <div ref={ref} className="gyro-rings" aria-label="Interactive abstract animation" role="img" />;
}
