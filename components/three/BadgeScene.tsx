"use client";

import { useEffect, useRef, useState } from "react";
import { createStage, whenNear } from "@/lib/three-stage";

/**
 * A printed ID card on a lanyard that hangs in the footer. It swings as a
 * damped pendulum; drag it and let go to swing it.
 */
export function BadgeScene({ name, role, place }: { name: string; role: string; place: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let dispose = () => {};
    let stopNear = () => {};
    let cancelled = false;

    (async () => {
      const el = host.current;
      if (!el) return;
      const near = whenNear(el);
      stopNear = near.stop;
      await near.ready;
      if (cancelled) return;
      const stage = await createStage(el, 30);
      if (!stage) return setFailed(true);
      if (cancelled) return stage.dispose();
      dispose = () => stage.dispose();
      const { THREE, scene, camera } = stage;
      const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");
      if (cancelled) return;

      camera.position.set(0, 0, 9);
      scene.add(new THREE.DirectionalLight(0xffffff, 1.2), new THREE.AmbientLight(0xffffff, 0.35));

      const ANCHOR = new THREE.Vector3(0, 3.6, 0);
      const MAX_SWING = 0.55;
      const LENGTH = 3.2;

      // Card face, drawn like a print proof, in the site's own fonts.
      const css = getComputedStyle(document.documentElement);
      const fam = (v: string, fallback: string) => `${css.getPropertyValue(v).trim() || fallback}`;
      const display = fam("--font-archivo", "sans-serif");
      const script = fam("--font-script", "cursive");
      const body = fam("--font-manrope", "sans-serif");
      await Promise.all([
        document.fonts.load(`800 100px ${display}`),
        document.fonts.load(`400 100px ${script}`),
        document.fonts.load(`600 30px ${body}`),
      ]).catch(() => undefined);
      if (cancelled) return;
      const face = document.createElement("canvas");
      face.width = 640;
      face.height = 900;
      const c = face.getContext("2d")!;
      c.fillStyle = "#F1F1F0";
      c.fillRect(0, 0, 640, 900);
      c.strokeStyle = "#0C0C0D";
      c.lineWidth = 2;
      [
        [40, 40, 1, 1],
        [600, 40, -1, 1],
        [40, 860, 1, -1],
        [600, 860, -1, -1],
      ].forEach(([x, y, sx, sy]) => {
        c.beginPath();
        c.moveTo(x, y + 30 * sy);
        c.lineTo(x, y);
        c.lineTo(x + 30 * sx, y);
        c.stroke();
      });
      c.fillStyle = "#0C0C0D";
      c.font = `800 210px ${display}`;
      c.fillText("SB", 66, 330);
      c.font = `400 96px ${script}`;
      c.fillText(role, 70, 470);
      c.font = `600 34px ${body}`;
      c.fillText(name.toUpperCase(), 70, 700);
      c.font = `400 26px ${body}`;
      c.fillStyle = "#55555A";
      c.fillText(place, 70, 745);
      ["#00A0E3", "#E5007D", "#FFED00", "#0C0C0D"].forEach((col, i) => {
        c.fillStyle = col;
        c.fillRect(70 + i * 34, 790, 26, 26);
      });
      c.fillStyle = "#0C0C0D";
      c.beginPath();
      c.arc(320, 70, 14, 0, Math.PI * 2);
      c.fill();
      const faceTex = new THREE.CanvasTexture(face);
      faceTex.colorSpace = THREE.SRGBColorSpace;
      faceTex.anisotropy = 8;

      const card = new THREE.Group();
      const cardBody = new THREE.Mesh(
        new RoundedBoxGeometry(1.6, 2.25, 0.04, 4, 0.08),
        new THREE.MeshPhysicalMaterial({ color: 0xf4f4f4, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.15 }),
      );
      const front = new THREE.Mesh(
        new THREE.PlaneGeometry(1.52, 2.17),
        new THREE.MeshBasicMaterial({ map: faceTex, toneMapped: false }),
      );
      front.position.z = 0.021;
      const clip = new THREE.Mesh(
        new RoundedBoxGeometry(0.42, 0.3, 0.09, 3, 0.03),
        new THREE.MeshStandardMaterial({ color: 0xc8c8cc, metalness: 1, roughness: 0.2 }),
      );
      clip.position.y = 0.1; // sits on the card's top edge, where the strap ends
      cardBody.position.y = -1.125 + 0.05;
      front.position.y = cardBody.position.y;
      card.add(cardBody, front, clip);
      scene.add(card);

      const strap = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 1, 0.012),
        new THREE.MeshBasicMaterial({ color: 0xff5a1f, toneMapped: false }),
      );
      scene.add(strap);

      const pivot = new THREE.Vector3();
      const top = ANCHOR.clone().add(new THREE.Vector3(0, 2, 0));

      // Pendulum state.
      const s = { angle: 0.3, velocity: 0, twist: 0, twistVelocity: 0, dragging: false, target: 0 };
      const ndc = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const hit = new THREE.Vector3();

      const toWorld = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        raycaster.ray.intersectPlane(plane, hit);
        return hit;
      };
      const onDown = (e: PointerEvent) => {
        // On touch screens the badge only swings by itself, so swipes keep scrolling the page.
        if (e.pointerType === "touch") return;
        const r = el.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        if (raycaster.intersectObject(card, true).length) {
          s.dragging = true;
          el.setPointerCapture(e.pointerId);
          el.style.cursor = "grabbing";
        }
      };
      const onMove = (e: PointerEvent) => {
        if (!s.dragging) {
          const r = el.getBoundingClientRect();
          ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
          raycaster.setFromCamera(ndc, camera);
          el.style.cursor = raycaster.intersectObject(card, true).length ? "grab" : "";
          return;
        }
        const p = toWorld(e);
        s.target = Math.max(-MAX_SWING, Math.min(MAX_SWING, Math.atan2(p.x - ANCHOR.x, ANCHOR.y - p.y)));
      };
      const onUp = () => {
        if (!s.dragging) return;
        s.dragging = false;
        el.style.cursor = "";
        s.twistVelocity += s.velocity * 1.5;
      };
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);

      stage.start((t, dt) => {
        const step = Math.min(dt, 1 / 30) || 1 / 60;
        if (s.dragging) {
          const prev = s.angle;
          s.angle += (s.target - s.angle) * 0.25;
          s.velocity = (s.angle - prev) / step;
        } else {
          s.velocity += (-9.0 * Math.sin(s.angle) - 0.9 * s.velocity) * step;
          s.angle += s.velocity * step;
          // Keep the card inside the canvas: bounce softly off the swing limit.
          if (Math.abs(s.angle) > MAX_SWING) {
            s.angle = Math.sign(s.angle) * MAX_SWING;
            s.velocity *= -0.4;
          }
        }
        s.twistVelocity += (-6 * s.twist - 1.2 * s.twistVelocity) * step;
        s.twist += s.twistVelocity * step;

        pivot.set(ANCHOR.x + Math.sin(s.angle) * LENGTH, ANCHOR.y - Math.cos(s.angle) * LENGTH, 0);
        card.position.copy(pivot);
        card.rotation.set(0, s.twist + Math.sin(t * 0.7) * 0.05, s.angle);

        strap.position.copy(top).lerp(pivot, 0.5);
        strap.scale.y = top.distanceTo(pivot);
        strap.rotation.z = Math.atan2(pivot.x - top.x, top.y - pivot.y);
      });

      dispose = () => {
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
        stage.dispose();
      };
    })();

    return () => {
      cancelled = true;
      stopNear();
      dispose();
    };
  }, [name, role, place]);

  if (failed) return null;
  return <div ref={host} className="badge-scene" aria-hidden="true" />;
}
