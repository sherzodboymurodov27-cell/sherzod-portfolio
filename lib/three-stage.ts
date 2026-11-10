import type * as THREE_NS from "three";

export type Three = typeof THREE_NS;

export type Stage = {
  THREE: Three;
  renderer: THREE_NS.WebGLRenderer;
  scene: THREE_NS.Scene;
  camera: THREE_NS.PerspectiveCamera;
  width: () => number;
  height: () => number;
  /** Starts the loop; `tick` runs each frame while the canvas is on screen. */
  start: (tick: (t: number, dt: number) => void) => void;
  dispose: () => void;
};

/**
 * One transparent WebGL canvas inside `host`, lit by a soft studio environment
 * so metal and chrome materials have something to reflect. Renders only while
 * visible on screen; under reduced motion it renders a single still frame.
 */
export async function createStage(host: HTMLElement, fov = 30): Promise<Stage | null> {
  const THREE = await import("three");
  const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");

  let renderer: THREE_NS.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
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
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let visible = true;
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: "100px" });
  io.observe(host);

  let raf = 0;
  let last = performance.now();
  let elapsed = 0;

  return {
    THREE,
    renderer,
    scene,
    camera,
    width: () => size.w,
    height: () => size.h,
    start(tick) {
      if (reduced) {
        tick(0, 0);
        renderer.render(scene, camera);
        // Re-render a still frame when the layout changes size.
        ro.disconnect();
        new ResizeObserver(() => {
          resize();
          tick(0, 0);
          renderer.render(scene, camera);
        }).observe(host);
        return;
      }
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (!visible || document.hidden) return;
        elapsed += dt;
        tick(elapsed, dt);
        renderer.render(scene, camera);
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
      renderer.domElement.remove();
    },
  };
}
