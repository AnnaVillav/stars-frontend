
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-white px-6 py-16">
      <div className="max-w-lg text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#99752f]">
          STARS · Error 404
        </p>

        <h1 className="mt-5 text-4xl font-bold text-zinc-900 md:text-5xl">
          Página no encontrada
        </h1>

        <p className="mt-6 leading-7 text-zinc-600">
          La página que estás buscando no existe o cambió de dirección.
          Podés volver al inicio o seguir explorando nuestros instrumentos.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Volver al inicio
          </Link>

          <Link
            href="/productos"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Ver instrumentos
          </Link>
        </div>
      </div>
    </main>
  );
}
