
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";

export default function BotonAgregarCarrito({ producto }) {
  const { productos, agregarProducto } = useCarrito();
  const [mensaje, setMensaje] = useState("");

  const cantidadEnCarrito =
    productos.find((item) => item.id === producto.id)?.cantidad ?? 0;

  const sinStock = Number(producto.stock) <= 0;
  const alcanzoLimite =
    cantidadEnCarrito >= Number(producto.stock);

  function agregar() {
    if (sinStock || alcanzoLimite) return;

    agregarProducto(producto);
    setMensaje("¡Producto agregado al carrito!");
  }

  return (
    <div className="mt-8 space-y-3">
      <button
        type="button"
        onClick={agregar}
        disabled={sinStock || alcanzoLimite}
        className="w-full rounded-lg bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:w-auto"
      >
        {sinStock
          ? "Sin stock"
          : alcanzoLimite
            ? "Máximo disponible en carrito"
            : "Agregar al carrito"}
      </button>

      {mensaje && (
        <p role="status" className="text-sm font-medium text-green-700">
          {mensaje}
        </p>
      )}

      <div>
        <Link
          href="/productos"
          className="text-sm font-semibold text-[#99752f] hover:underline"
        >
          ← Seguir explorando productos
        </Link>
      </div>
    </div>
  );
}
