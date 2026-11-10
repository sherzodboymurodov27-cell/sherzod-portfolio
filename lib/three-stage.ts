import type * as THREE_NS from "three";

export type Three = typeof THREE_NS;

export type Stage = {
  THREE: Three;
  renderer: THREE_NS.WebGLRenderer;
  scene: THREE_NS.Scene;
  camera: THREE_NS.PerspectiveCamera;
  width: () => number;
  height: () => number;
  /** Starts the loop. `tick` runs each frame while on screen; return false to skip the default render (custom render in tick). */
  start: (tick: (t: number, dt: number) => void | false) => void;
  /** Called once after the first frame has been drawn. */
  onFirstFrame: (cb: () => void) => void;
  dispose: () => void;
};

/**
 * Resolves when `el` comes within `margin` of the viewport. `stop()` disconnects
 * the observer if the caller unmounts first (the promise then never resolves).
 */
export function whenNear(el: Element, margin = "400px") {
  let io: IntersectionObserver | null = null;
  const ready = new Promise<void>((resolve) => {
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io?.disconnect();
          resolve();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
  });
  return { ready, stop: () => io?.disconnect() };
}

/** True if this browser can create a WebGL context. The probe context is released immediately. */
export function hasWebGL(): boolean {
  try {
    const probe = document.createElement("canvas");
    const gl = (probe.getContext("webgl2") || probe.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * One transparent WebGL canvas inside `host`, lit by a soft studio environment
 * so metal and chrome have something to reflect. Renders only while on screen;
 * under reduced motion it renders still frames. Returns null when WebGL is
 * unavailable so callers can show their fallback.
 */
export async function createStage(host: HTMLElement, fov = 30): Promise<Stage | null> {
  // Check before downloading three.js, so devices without WebGL never fetch it.
  if (!hasWebGL()) return null;
  const THREE = await import("three");
  const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");

  let renderer: THREE_NS.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envTexture = pmrem.fromScene(room, 0.04).texture;
  room.dispose();
  scene.environment = envTexture;

  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);

  const size = { w: 1, h: 1 };
  const resize = () => {
    size.w = Math.max(1, host.clientWidth);
    size.h = Math.max(1, host.clientHeight);
    renderer.setSize(size.w, size.h, false);
    camera.aspect = size.w / size.h;
    camera.updateProjectionMatrix();
  };
  resize();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let visible = true;
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: "100px" });
  io.observe(host);

  let raf = 0;
  let last = performance.now();
  let elapsed = 0;
  let tickFn: (t: number, dt: number) => void | false = () => {};
  let firstFrameCb: (() => void) | null = null;
  let drawn = false;

  const draw = (t: number, dt: number) => {
    if (tickFn(t, dt) !== false) renderer.render(scene, camera);
    if (!drawn) {
      drawn = true;
      firstFrameCb?.();
    }
  };

  const ro = new ResizeObserver(() => {
    resize();
    if (reduced) draw(0, 0);
  });
  ro.observe(host);

  return {
    THREE,
    renderer,
    scene,
    camera,
    width: () => size.w,
    height: () => size.h,
    onFirstFrame(cb) {
      if (drawn) cb();
      else firstFrameCb = cb;
    },
    start(tick) {
      tickFn = tick;
      if (reduced) {
        draw(0, 0);
        return;
      }
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if ((!visible || document.hidden) && drawn) return;
        elapsed += dt;
        draw(elapsed, dt);
      };
      raf = requestAnimationFrame(loop);
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      scene.traverse((obj) => {
        const mesh = obj as THREE_NS.Mesh;
        mesh.geometry?.dispose?.();
        const mat = mesh.material as THREE_NS.Material | THREE_NS.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((m) => {
          Object.values(m).forEach((v) => (v as THREE_NS.Texture)?.isTexture && (v as THREE_NS.Texture).dispose());
          m.dispose();
        });
      });
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
