"use client";

import { useEffect, useRef, useState } from "react";
import { createStage, whenNear } from "@/lib/three-stage";

const PX_PER_UNIT = 130; // card is 2.25 units tall → about 290px on desktop

/**
 * A printed ID card in a clear sleeve, hanging from an orange lanyard over the
 * footer. It swings as a damped pendulum; with a mouse it can be grabbed and
 * thrown. The canvas covers the whole footer but ignores the pointer, so the
 * footer's links stay clickable; grabbing is hit-tested on the card itself.
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
      const footer = el?.closest("footer") ?? el;
      if (!el || !footer) return;
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

      const css = getComputedStyle(document.documentElement);
      const display = css.getPropertyValue("--font-archivo").trim() || "sans-serif";
      await Promise.all([
        document.fonts.load(`800 100px ${display}`),
        document.fonts.load(`italic 800 100px ${display}`),
        document.fonts.load(`500 30px ${display}`),
      ]).catch(() => undefined);
      if (cancelled) return;

      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(-3, 4, 6);
      const rim = new THREE.DirectionalLight(0xffffff, 1.2);
      rim.position.set(3, 1, -4);
      scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.25));

      // ── Card face, drawn like a print proof ──
      const face = document.createElement("canvas");
      face.width = 640;
      face.height = 900;
      const c = face.getContext("2d")!;
      c.fillStyle = "#F1F1F0";
      c.fillRect(0, 0, 640, 900);
      c.strokeStyle = "#0C0C0D";
      c.lineWidth = 2;
      for (const [x, y, sx, sy] of [
        [40, 40, 1, 1],
        [600, 40, -1, 1],
        [40, 860, 1, -1],
        [600, 860, -1, -1],
      ]) {
        c.beginPath();
        c.moveTo(x, y + 30 * sy);
        c.lineTo(x, y);
        c.lineTo(x + 30 * sx, y);
        c.stroke();
      }
      c.fillStyle = "#0C0C0D";
      c.font = `800 210px ${display}`;
      c.fillText("SB", 66, 330);
      c.font = `italic 800 92px ${display}`;
      c.fillText(role.toUpperCase(), 70, 450);
      c.font = `700 34px ${display}`;
      c.fillText(name.toUpperCase(), 70, 700);
      c.font = `500 26px ${display}`;
      c.fillStyle = "#55555A";
      c.fillText(place, 70, 745);
      ["#00A0E3", "#E5007D", "#FFED00", "#0C0C0D"].forEach((col, i) => {
        c.fillStyle = col;
        c.fillRect(70 + i * 34, 790, 26, 26);
      });
      c.fillStyle = "#0C0C0D";
      c.beginPath();
      c.roundRect(270, 60, 100, 22, 11);
      c.fill();
      const faceTex = new THREE.CanvasTexture(face);
      faceTex.colorSpace = THREE.SRGBColorSpace;
      faceTex.anisotropy = 8;

      const chrome = new THREE.MeshStandardMaterial({ color: 0xc4c8ce, metalness: 1, roughness: 0.14, envMapIntensity: 1.4 });

      const card = new THREE.Group();
      const paper = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 2.12),
        new THREE.MeshStandardMaterial({ map: faceTex, roughness: 0.6, metalness: 0 }),
      );
      paper.position.set(0, -1.12, 0);
      // Clear sleeve with a polished edge: reflections sit on top of the printed card.
      const sleeve = new THREE.Mesh(
        new RoundedBoxGeometry(1.64, 2.3, 0.05, 4, 0.06),
        new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.05, transmission: 0, transparent: true, opacity: 0.16, clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 1.6 }),
      );
      sleeve.position.set(0, -1.12, 0.012);
      const edge = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.025, 12, 32), chrome);
      edge.position.set(0, 0.02, 0);
      const clip = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.2, 0.08, 3, 0.03), chrome);
      clip.position.set(0, 0.16, 0);
      card.add(paper, sleeve, edge, clip);
      scene.add(card);

      // ── Lanyard: a printed ribbon ──
      const ribbon = document.createElement("canvas");
      ribbon.width = 64;
      ribbon.height = 1024;
      const r = ribbon.getContext("2d")!;
      r.fillStyle = "#FF5A1F";
      r.fillRect(0, 0, 64, 1024);
      r.fillStyle = "rgba(12,12,13,0.85)";
      r.font = `800 30px ${display}`;
      r.save();
      r.translate(44, 0);
      r.rotate(Math.PI / 2);
      for (let y = 20; y < 1024; y += 200) r.fillText("SHERZOD", y, 0);
      r.restore();
      const ribbonTex = new THREE.CanvasTexture(ribbon);
      ribbonTex.colorSpace = THREE.SRGBColorSpace;
      ribbonTex.wrapT = THREE.RepeatWrapping;
      const strapMat = new THREE.MeshStandardMaterial({ map: ribbonTex, roughness: 0.75, metalness: 0 });
      const strap = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 1), strapMat);
      scene.add(strap);

      // ── Layout: the card hangs on the right on wide screens, centred on narrow ones ──
      const anchor = new THREE.Vector3();
      let length = 1.6;
      const layout = () => {
        const hpx = stage.height();
        const wpx = stage.width();
        const ppu = Math.min(PX_PER_UNIT, hpx / 4.4);
        const visH = hpx / ppu;
        const visW = wpx / ppu;
        camera.position.set(0, 0, visH / 2 / Math.tan((15 * Math.PI) / 180));
        camera.lookAt(0, 0, 0);
        const wide = wpx >= 1024;
        anchor.set(wide ? visW / 2 - visW * 0.2 : 0, visH / 2 + 0.05, 0);
        length = wide ? 1.7 : Math.max(0.6, visH - 2.6);
        ribbonTex.repeat.set(1, 1);
      };
      layout();

      // ── Pendulum ──
      const MAX_SWING = 0.55;
      const s = { angle: 0.28, velocity: 0, twist: 0, twistVelocity: 0, dragging: false, target: 0 };
      const ndc = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const hit = new THREE.Vector3();
      const pivot = new THREE.Vector3();
      const strapTop = new THREE.Vector3();

      const pointAt = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
      };
      const onCard = (e: PointerEvent) => {
        pointAt(e);
        return raycaster.intersectObject(card, true).length > 0;
      };
      const onDown = (e: PointerEvent) => {
        if (e.pointerType === "touch" || !onCard(e)) return;
        e.preventDefault();
        s.dragging = true;
        footer.setPointerCapture(e.pointerId);
        footer.style.cursor = "grabbing";
      };
      const onMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        if (!s.dragging) {
          footer.style.cursor = onCard(e) ? "grab" : "";
          return;
        }
        pointAt(e);
        raycaster.ray.intersectPlane(plane, hit);
        s.target = Math.max(-MAX_SWING, Math.min(MAX_SWING, Math.atan2(hit.x - anchor.x, anchor.y - hit.y)));
      };
      const onUp = () => {
        if (!s.dragging) return;
        s.dragging = false;
        footer.style.cursor = "";
        s.twistVelocity += s.velocity * 1.5;
      };
      footer.addEventListener("pointerdown", onDown);
      footer.addEventListener("pointermove", onMove);
      footer.addEventListener("pointerup", onUp);
      footer.addEventListener("pointercancel", onUp);
      const ro = new ResizeObserver(layout);
      ro.observe(el);

      stage.start((t, dt) => {
        const step = Math.min(dt, 1 / 30) || 1 / 60;
        if (s.dragging) {
          const prev = s.angle;
          s.angle += (s.target - s.angle) * 0.25;
          s.velocity = (s.angle - prev) / step;
        } else {
          s.velocity += (-9.0 * Math.sin(s.angle) - 0.9 * s.velocity) * step;
          s.angle += s.velocity * step;
          if (Math.abs(s.angle) > MAX_SWING) {
            s.angle = Math.sign(s.angle) * MAX_SWING;
            s.velocity *= -0.4;
          }
        }
        s.twistVelocity += (-6 * s.twist - 1.2 * s.twistVelocity) * step;
        s.twist += s.twistVelocity * step;

        pivot.set(anchor.x + Math.sin(s.angle) * length, anchor.y - Math.cos(s.angle) * length, 0);
        card.position.copy(pivot);
        card.rotation.set(0, s.twist + Math.sin(t * 0.7) * 0.06, s.angle);

        strapTop.copy(anchor);
        strap.position.copy(strapTop).lerp(pivot, 0.5);
        const len = strapTop.distanceTo(pivot) + 0.1;
        strap.scale.y = len;
        ribbonTex.repeat.set(1, len / 3);
        strap.rotation.z = Math.atan2(pivot.x - strapTop.x, strapTop.y - pivot.y);
      });

      dispose = () => {
        footer.removeEventListener("pointerdown", onDown);
        footer.removeEventListener("pointermove", onMove);
        footer.removeEventListener("pointerup", onUp);
        footer.removeEventListener("pointercancel", onUp);
        footer.style.cursor = "";
        ro.disconnect();
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
