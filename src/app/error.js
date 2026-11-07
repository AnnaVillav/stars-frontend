
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error en STARS:", error);
  }, [error]);

  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-white px-6 py-16">
      <div className="max-w-lg text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#99752f]">
          STARS · Error
        </p>

        <h1 className="mt-5 text-4xl font-bold text-zinc-900">
          Algo salió mal
        </h1>

        <p className="mt-6 leading-7 text-zinc-600">
          Ocurrió un problema al cargar esta sección.
          Podés intentar nuevamente o volver al inicio.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Intentar nuevamente
          </button>

          <Link
            href="/"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
