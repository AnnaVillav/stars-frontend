
"use client";

import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";

export default function CarritoHeader() {
  const { cantidadTotal } = useCarrito();

  return (
    <Link
      href="/carrito"
      aria-label={`Ver carrito de compras, ${cantidadTotal} artículos`}
      className="relative inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
      </svg>

      <span>Carrito</span>

      <span className="flex min-w-6 items-center justify-center rounded-full bg-[#b68d3e] px-1.5 py-0.5 text-xs font-bold text-white">
        {cantidadTotal}
      </span>
    </Link>
  );
}

