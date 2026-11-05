
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-yellow-500/30 px-6 py-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold tracking-widest text-yellow-400"
        >
          STARS
        </Link>

        <nav className="flex gap-6 text-sm">
          <Link href="/">Inicio</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/login">Ingresar</Link>
        </nav>
      </div>
    </header>
  );
}
