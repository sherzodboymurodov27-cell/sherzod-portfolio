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

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      container.style.setProperty("--gyro-x", `${y * 12}deg`);
      container.style.setProperty("--gyro-y", `${x * 16}deg`);
    };

    const reset = () => {
      container.style.setProperty("--gyro-x", "0deg");
      container.style.setProperty("--gyro-y", "0deg");
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", reset);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", reset);
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
