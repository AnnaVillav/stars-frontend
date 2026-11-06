
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BuscadorProductos() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const busquedaActual = searchParams.get("search") || "";

  const [texto, setTexto] = useState(busquedaActual);
  const [textoAnterior, setTextoAnterior] = useState(busquedaActual);

  if (busquedaActual !== textoAnterior) {
    setTextoAnterior(busquedaActual);
    setTexto(busquedaActual);
  }

  function buscar(evento) {
    evento.preventDefault();

    const busqueda = texto.trim();

    if (busqueda) {
      router.push(`/productos?search=${encodeURIComponent(busqueda)}`);
    } else {
      router.push("/productos");
    }
  }

  return (
    <form
      onSubmit={buscar}
      role="search"
      className="flex w-full items-center overflow-hidden rounded-md border border-zinc-300 bg-white focus-within:border-zinc-500"
    >
      <input
        type="search"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        placeholder="¿Qué estás buscando?"
        aria-label="Buscar productos"
        className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
      />

      <button
        type="submit"
        aria-label="Buscar"
        className="flex h-11 w-12 shrink-0 items-center justify-center text-zinc-800 hover:bg-zinc-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </button>
    </form>
  );
}
