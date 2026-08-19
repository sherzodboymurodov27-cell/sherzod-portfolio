"use client";

import { useEffect, useRef } from "react";

const RINGS = [
  { size: 420, axis: "x", speed: 18, direction: 1 },
  { size: 370, axis: "y", speed: 22, direction: -1 },
  { size: 320, axis: "z", speed: 26, direction: 1 },
  { size: 270, axis: "x", speed: 20, direction: -1 },
  { size: 220, axis: "y", speed: 24, direction: 1 },
] as const;

export function GyroRings() {
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const rotationX = useRef(0);
  const rotationY = useRef(0);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const applyRotation = () => {
      container.style.setProperty("--gyro-x", `${rotationX.current}deg`);
      container.style.setProperty("--gyro-y", `${rotationY.current}deg`);
    };

    const onPointerDown = (event: PointerEvent) => {
      // Only the primary (left) mouse button starts the drag.
      if (event.pointerType === "mouse" && event.button !== 0) return;

      dragging.current = true;
      lastX.current = event.clientX;
      lastY.current = event.clientY;
      container.setPointerCapture?.(event.pointerId);
      container.style.cursor = "grabbing";
      event.preventDefault();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging.current) return;

      const dx = event.clientX - lastX.current;
      const dy = event.clientY - lastY.current;
      lastX.current = event.clientX;
      lastY.current = event.clientY;

      // Horizontal drag rotates around Y; vertical drag rotates around X.
      rotationY.current += dx * 0.45;
      rotationX.current -= dy * 0.45;
      applyRotation();
    };

    const stopDragging = (event?: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      if (event) container.releasePointerCapture?.(event.pointerId);
      container.style.cursor = "grab";
    };

    container.style.cursor = "grab";
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", stopDragging);
    container.addEventListener("pointercancel", stopDragging);
    container.addEventListener("lostpointercapture", () => stopDragging());

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", stopDragging);
      container.removeEventListener("pointercancel", stopDragging);
      container.style.cursor = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className="gyro-rings"
      aria-label="Interactive abstract animation"
      role="img"
      style={{ touchAction: "none" }}
    >
      <div className="gyro-rings-core" aria-hidden="true" />
      {RINGS.map((ring, index) => (
        <span
          key={index}
          className={`gyro-ring gyro-ring-${ring.axis}`}
          style={
            {
              width: ring.size,
              height: ring.size,
              animationDuration: `${ring.speed}s`,
              animationDirection: ring.direction === -1 ? "reverse" : "normal",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
