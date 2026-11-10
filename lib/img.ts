import sizes from "@/data/image-sizes.json";

const table = sizes as unknown as Record<string, [number, number]>;

/** width, height and a 640/full srcSet for an image under /public, from data/image-sizes.json. */
export function imgProps(src: string, sizesAttr = "100vw") {
  const dims = table[src];
  if (!dims) return { src };
  const [width, height] = dims;
  const props: { src: string; width: number; height: number; srcSet?: string; sizes?: string } = { src, width, height };
  if (width > 900) {
    props.srcSet = `${src.replace(/\.webp$/, "-640.webp")} 640w, ${src} ${width}w`;
    props.sizes = sizesAttr;
  }
  return props;
}
