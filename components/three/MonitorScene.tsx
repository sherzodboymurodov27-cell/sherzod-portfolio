"use client";

import { useEffect, useRef } from "react";
import { createStage } from "@/lib/three-stage";

type Props = {
  posts: string[];
  /** 0 → 1 scroll progress through the pinned hero, written by the hero's ScrollTrigger. */
  progress: { current: number };
};

/**
 * A desktop monitor built from primitives. Its screen is a canvas texture that
 * plays a feed of the posts; scrolling pulls the camera in until the screen
 * fills the view. The canvas is transparent, so the monitor sits directly on
 * the hero gradient.
 */
export function MonitorScene({ posts, progress }: Props) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;

    (async () => {
      const el = host.current;
      if (!el) return;
      const stage = await createStage(el, 28);
      if (!stage || cancelled) return stage?.dispose();
      const { THREE, scene, camera } = stage;
      const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");

      const shell = new THREE.MeshStandardMaterial({ color: 0x1b1b1e, metalness: 0.85, roughness: 0.32 });
      const edge = new THREE.MeshStandardMaterial({ color: 0x2c2c30, metalness: 0.9, roughness: 0.22 });

      const monitor = new THREE.Group();
      scene.add(monitor);

      const W = 3.4;
      const H = 2.1;
      const body = new THREE.Mesh(new RoundedBoxGeometry(W, H, 0.12, 6, 0.06), shell);
      monitor.add(body);

      // Screen: a canvas we redraw whenever the feed advances.
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = Math.round(1600 * ((H - 0.12) / (W - 0.12)));
      const ctx = canvas.getContext("2d")!;
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(W - 0.12, H - 0.12),
        new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),
      );
      screen.position.z = 0.061;
      monitor.add(screen);

      // Faint glass reflection over the screen.
      const glass = new THREE.Mesh(
        new THREE.PlaneGeometry(W - 0.12, H - 0.12),
        new THREE.MeshPhysicalMaterial({ transparent: true, opacity: 0.08, roughness: 0.05, metalness: 0, clearcoat: 1 }),
      );
      glass.position.z = 0.063;
      monitor.add(glass);

      const neck = new THREE.Mesh(new RoundedBoxGeometry(0.42, 1.0, 0.1, 4, 0.04), edge);
      neck.position.set(0, -H / 2 - 0.42, -0.12);
      neck.rotation.x = -0.12;
      monitor.add(neck);

      const base = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.06, 0.9, 4, 0.03), edge);
      base.position.set(0, -H / 2 - 0.95, 0.05);
      monitor.add(base);

      // Soft contact shadow under the base.
      const shadowCanvas = document.createElement("canvas");
      shadowCanvas.width = shadowCanvas.height = 128;
      const sctx = shadowCanvas.getContext("2d")!;
      const grad = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(0,0,0,0.55)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 128, 128);
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(3.4, 1.4),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }),
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.set(0, -H / 2 - 0.985, 0.05);
      monitor.add(shadow);

      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(-3, 4, 5);
      scene.add(key, new THREE.AmbientLight(0xffffff, 0.25));

      // Feed content.
      const images = await Promise.all(
        posts.map(
          (src) =>
            new Promise<HTMLImageElement | null>((resolve) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = () => resolve(null);
              img.src = src;
            }),
        ),
      );
      const feed = images.filter(Boolean) as HTMLImageElement[];
      let offset = 0;
      let slide = 1; // 0 → 1 transition between offsets

      const drawScreen = () => {
        const cw = canvas.width;
        const ch = canvas.height;
        ctx.fillStyle = "#0E0E10";
        ctx.fillRect(0, 0, cw, ch);
        // Window bar.
        ctx.fillStyle = "#17171A";
        ctx.fillRect(0, 0, cw, 70);
        ["#FF5F57", "#FEBC2E", "#28C840"].forEach((c, i) => {
          ctx.fillStyle = c;
          ctx.beginPath();
          ctx.arc(40 + i * 30, 35, 9, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.fillStyle = "rgba(241,241,240,0.55)";
        ctx.font = `500 26px ${getComputedStyle(document.documentElement).getPropertyValue("--font-manrope").trim() || "sans-serif"}`;
        ctx.fillText("Sherzod Boymurodov — selected posts", 160, 44);

        if (!feed.length) return;
        const cols = 3;
        const gap = 36;
        const tileW = (cw - gap * (cols + 1)) / cols;
        const tileH = tileW * 1.25;
        const top = 70 + (ch - 70 - tileH) / 2;
        const ease = 1 - Math.pow(1 - slide, 3);
        for (let i = -1; i <= cols; i++) {
          const img = feed[(((offset + i) % feed.length) + feed.length) % feed.length];
          const x = gap + (i + 1 - ease) * (tileW + gap) - (tileW + gap);
          if (x > cw || x + tileW < 0) continue;
          ctx.drawImage(img, x, top, tileW, tileH);
        }
        texture.needsUpdate = true;
      };
      drawScreen();

      const pointer = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let nextAt = 2.6;
      const isNarrow = () => stage.width() < 700;

      stage.start((t, dt) => {
        if (t > nextAt) {
          offset = (offset + 1) % Math.max(1, feed.length);
          slide = 0;
          nextAt = t + 2.6;
        }
        if (slide < 1) {
          slide = Math.min(1, slide + dt * 1.6);
          drawScreen();
        }

        const p = progress.current;
        const narrow = isNarrow();
        const startZ = narrow ? 9.6 : 8.6;
        const endZ = narrow ? 4.2 : 3.3;
        camera.position.set(0, 0.25 - p * 0.2, startZ + (endZ - startZ) * p);
        camera.lookAt(0, 0.05 - p * 0.05, 0);

        const idle = Math.sin(t * 0.6) * 0.02;
        monitor.rotation.y += ((-0.32 + pointer.x * 0.12) * (1 - p) - monitor.rotation.y) * 0.06;
        monitor.rotation.x += ((0.1 + pointer.y * 0.05) * (1 - p) + idle - monitor.rotation.x) * 0.06;
        monitor.position.y = -0.35 * (1 - p);
      });

      dispose = () => {
        window.removeEventListener("pointermove", onMove);
        stage.dispose();
      };
    })();

    return () => {
      cancelled = true;
      dispose();
    };
  }, [posts, progress]);

  return <div ref={host} className="monitor-scene" role="img" aria-label="Desktop monitor showing a feed of social media posts" />;
}
