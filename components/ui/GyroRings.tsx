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
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const reset = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        container.style.setProperty("--gyro-x", "0deg");
        container.style.setProperty("--gyro-y", "0deg");
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        reset();
        return;
      }

      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        container.style.setProperty("--gyro-x", `${y * 12}deg`);
        container.style.setProperty("--gyro-y", `${x * 16}deg`);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", reset);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", reset);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div ref={ref} className="gyro-rings" aria-label="Interactive abstract animation" role="img">
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
