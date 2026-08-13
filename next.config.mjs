/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // Static export has no Node server to run Next's image optimizer at
    // request time, so images are served as-is. They're already pre-sized
    // and served as .webp from /public, so this has no visual cost here.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
