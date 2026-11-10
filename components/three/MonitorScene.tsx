"use client";

import { useEffect, useRef, useState } from "react";
import { createStage } from "@/lib/three-stage";

type Props = {
  posts: string[];
  /** 0 → 1 scroll progress through the hero, written by the hero's ScrollTrigger. */
  progress: { current: number };
};

const W = 3.4; // monitor width in scene units
const H = 2.1; // monitor height
const FOV = 28;

/**
 * A desktop monitor built from primitives. Its screen is a canvas texture that
 * plays a feed of the posts; scrolling moves the camera in until the whole
 * screen fills the view. Until the 3D is ready, or when WebGL is unavailable,
 * a flat HTML screen with the same posts stands in its place.
 */
export function MonitorScene({ posts, progress }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;

    (async () => {
      const el = host.current;
      if (!el) return;
      const stage = await createStage(el, FOV);
      if (!stage) return;
      if (cancelled) return stage.dispose();
      dispose = () => stage.dispose();

      const { THREE, scene, camera } = stage;
      const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");
      const bodyFont = getComputedStyle(document.documentElement).getPropertyValue("--font-manrope").trim() || "sans-serif";
      await document.fonts.load(`500 26px ${bodyFont}`).catch(() => undefined);
      const images = await Promise.all(posts.map(loadImage));
      if (cancelled) return;

      const shell = new THREE.MeshStandardMaterial({ color: 0x1b1b1e, metalness: 0.85, roughness: 0.32 });
      const edge = new THREE.MeshStandardMaterial({ color: 0x2c2c30, metalness: 0.9, roughness: 0.22 });

      const monitor = new THREE.Group();
      scene.add(monitor);
      monitor.add(new THREE.Mesh(new RoundedBoxGeometry(W, H, 0.12, 6, 0.06), shell));

      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = Math.round(1600 * ((H - 0.12) / (W - 0.12)));
      const ctx = canvas.getContext("2d")!;
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.12, H - 0.12), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }));
      screen.position.z = 0.061;
      monitor.add(screen);

      const glass = new THREE.Mesh(
        new THREE.PlaneGeometry(W - 0.12, H - 0.12),
        new THREE.MeshPhysicalMaterial({ transparent: true, opacity: 0.08, roughness: 0.05, clearcoat: 1 }),
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

      const feed = images.filter(Boolean) as HTMLImageElement[];
      let offset = 0;
      let slide = 1;

      const drawScreen = () => {
        const cw = canvas.width;
        const ch = canvas.height;
        ctx.fillStyle = "#0E0E10";
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = "#17171A";
        ctx.fillRect(0, 0, cw, 70);
        ["#FF5F57", "#FEBC2E", "#28C840"].forEach((c, i) => {
          ctx.fillStyle = c;
          ctx.beginPath();
          ctx.arc(40 + i * 30, 35, 9, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.fillStyle = "rgba(241,241,240,0.55)";
        ctx.font = `500 26px ${bodyFont}`;
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
      dispose = () => {
        window.removeEventListener("pointermove", onMove);
        stage.dispose();
      };

      // Camera distances from the view's aspect: at the end the whole screen fits.
      const tanHalf = Math.tan(((FOV / 2) * Math.PI) / 180);
      const distances = () => {
        const aspect = stage.width() / stage.height();
        const fitH = ((H / 2) * 1.06) / tanHalf;
        const fitW = ((W / 2) * 1.06) / (tanHalf * aspect);
        const end = Math.max(fitH, fitW);
        return { start: end * (aspect < 1 ? 1.5 : 1.95), end };
      };

      let nextAt = 2.6;
      stage.onFirstFrame(() => !cancelled && setReady(true));
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
        const { start, end } = distances();
        camera.position.set(0, 0.25 - p * 0.25, start + (end - start) * p);
        camera.lookAt(0, 0.05 - p * 0.05, 0);
        const idle = Math.sin(t * 0.6) * 0.02;
        monitor.rotation.y += ((-0.32 + pointer.x * 0.12) * (1 - p) - monitor.rotation.y) * 0.06;
        monitor.rotation.x += ((0.1 + pointer.y * 0.05) * (1 - p) + idle - monitor.rotation.x) * 0.06;
        monitor.position.y = -0.35 * (1 - p);
      });
    })();

    return () => {
      cancelled = true;
      dispose();
    };
  }, [posts, progress]);

  return (
    <div className={`monitor-scene ${ready ? "is-ready" : ""}`}>
      <div className="monitor-fallback" aria-hidden="true">
        <div className="monitor-fallback-screen">
          {posts.slice(0, 3).map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" width={640} height={800} />
          ))}
        </div>
      </div>
      <div ref={host} className="monitor-canvas" role="img" aria-label="Desktop monitor showing a feed of social media posts" />
    </div>
  );
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}
