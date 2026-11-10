import { useEffect, useLayoutEffect } from "react";

/**
 * GSAP contexts must be reverted before React removes their DOM (pinning wraps
 * nodes in a pin-spacer), so animation setup runs in a layout effect.
 */
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
