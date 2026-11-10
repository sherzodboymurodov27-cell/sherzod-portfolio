import type Lenis from "lenis";

/** The page's one Lenis instance, so other components (the mobile menu) can stop and start scrolling. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;
