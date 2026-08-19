"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const MATCAP = "https://framerusercontent.com/images/Wkm2ineJ1Md7Xb1oyjF6dqbAw.png";
const AXES: Array<"x" | "y" | "z"> = ["y", "x", "z"];
const ORIENTATION: Record<"x" | "y" | "z", [number, number, number]> = {
  y: [0, 0, 0],
  x: [Math.PI / 2, 0, 0],
  z: [0, Math.PI / 2, 0],
};

export function GyroRings() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.style.touchAction = "none";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.z = 6.7;

    const root = new THREE.Group();
    root.rotation.x = 0.5;
    root.rotation.y = 0.4;
    scene.add(root);

    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(0.4, 0.7, 1);
    camera.add(key);
    scene.add(camera);

    const material = new THREE.MeshMatcapMaterial({ color: new THREE.Color("#d8ccff") });
    const fallback = new THREE.MeshLambertMaterial({ color: new THREE.Color("#a855f7") });
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      MATCAP,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        material.matcap = texture;
        material.needsUpdate = true;
      },
      undefined,
      () => {}
    );

    const rings: Array<{ pivot: THREE.Group; axis: "x" | "y" | "z"; rate: number; mesh: THREE.Mesh }> = [];
    const count = 5;
    const tube = 0.055;
    const inner = 0.88;
    let parent: THREE.Object3D = root;

    for (let i = 0; i < count; i++) {
      const radius = inner + (count - 1 - i) * 0.12;
      const axis = AXES[i % AXES.length];
      const geometry = new THREE.TorusGeometry(radius, tube, 16, 96);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(...ORIENTATION[axis]);
      const pivot = new THREE.Group();
      pivot.add(mesh);
      parent.add(pivot);
      parent = pivot;
      rings.push({ pivot, axis, rate: (i + 1) * (i % 2 ? -1 : 1), mesh });
    }

    const pointer = { x: 0, y: 0, targetX: 0.5, targetY: 0.4, dragging: false, lastX: 0, lastY: 0 };

    const down = (e: PointerEvent) => {
      pointer.dragging = true;
      pointer.lastX = e.clientX;
      pointer.lastY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
      renderer.domElement.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!pointer.dragging) return;
      const dx = e.clientX - pointer.lastX;
      const dy = e.clientY - pointer.lastY;
      pointer.lastX = e.clientX;
      pointer.lastY = e.clientY;
      pointer.targetY += dx * 0.006;
      pointer.targetX += dy * 0.006;
    };
    const up = () => {
      pointer.dragging = false;
      renderer.domElement.style.cursor = "grab";
    };

    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);
    renderer.domElement.addEventListener("pointercancel", up);
    renderer.domElement.addEventListener("pointerleave", up);

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const visibleHeight = width / height < 1 ? 3.9 / (width / height) : 3.9;
      camera.fov = 2 * Math.atan(visibleHeight / 2 / camera.position.z) * (180 / Math.PI);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let frame = 0;
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      root.rotation.x += (pointer.targetX - root.rotation.x) * 0.055;
      root.rotation.y += (pointer.targetY - root.rotation.y) * 0.055;

      for (const ring of rings) {
        ring.pivot.rotation[ring.axis] += 0.34 * ring.rate * dt;
      }

      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerup", up);
      renderer.domElement.removeEventListener("pointercancel", up);
      renderer.domElement.removeEventListener("pointerleave", up);
      rings.forEach(({ mesh }) => mesh.geometry.dispose());
      material.dispose();
      fallback.dispose();
      if (material.matcap) material.matcap.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="gyro-rings" aria-label="Interactive abstract animation" role="img" />;
}
