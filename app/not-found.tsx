import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="eyebrow">Not Found</div>
      <h1 className="heading-lg">That route does not exist.</h1>
      <p className="subtle-text mt-4 max-w-xl">Try opening SmartStop AI or RickshawFlow AI from the main platform navigation.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-cyan">
        Go back home
      </Link>
    </div>
  );
}
