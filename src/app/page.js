
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24 text-center">
      <p className="mb-4 uppercase tracking-[0.3em] text-yellow-400">
        Tienda de instrumentos musicales
      </p>

      <h1 className="mb-6 text-5xl font-bold">
        Encontrá tu próximo sonido
      </h1>

      <p className="mx-auto mb-10 max-w-xl text-zinc-400">
        Descubrí instrumentos y accesorios para acompañarte
        en cada etapa de tu música.
      </p>

      <Link
        href="/productos"
        className="rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-black hover:bg-yellow-300"
      >
        Explorar instrumentos
      </Link>
    </main>
  );
}
