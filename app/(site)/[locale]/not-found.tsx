import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fade-up flex flex-col items-center gap-5 py-20 text-center">
      <p className="font-mono text-sm text-faint">404</p>
      <p className="text-lg font-medium tracking-tight">
        This page doesn&apos;t exist. / Deze pagina bestaat niet.
      </p>
      <Link
        href="/"
        className="text-sm text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
      >
        roanmerens.dev
      </Link>
    </div>
  );
}
