"use client";

import { useRef } from "react";

export default function CarruselHorizontal({ children }) {
  const carruselRef = useRef(null);

  function desplazar(direccion) {
    if (!carruselRef.current) return;

    const distancia = carruselRef.current.clientWidth * 0.75;

    carruselRef.current.scrollBy({
      left: direccion * distancia,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => desplazar(-1)}
        aria-label="Desplazar hacia la izquierda"
        className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-2xl shadow-md transition hover:bg-zinc-100"
      >
        ‹
      </button>

      <div
        ref={carruselRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => desplazar(1)}
        aria-label="Desplazar hacia la derecha"
        className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-2xl shadow-md transition hover:bg-zinc-100"
      >
        ›
      </button>
    </div>
  );
}
