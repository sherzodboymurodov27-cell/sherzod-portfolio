import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100svh] flex flex-col justify-center items-start px-5 md:px-10">
      <div className="max-w-grid mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-muted font-semibold mb-6">404</p>
        <h1 className="text-h1 font-extralight tracking-tight mb-8">Page not found.</h1>
        <Link href="/" className="inline-flex items-center gap-3 text-lg group">
          <span className="border-b border-accent pb-0.5 group-hover:opacity-70 transition-opacity duration-200">
            Back to home
          </span>
          <span aria-hidden="true" className="text-accent transition-transform duration-300 ease-editorial group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
