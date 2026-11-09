
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";

const imagenesProductos = {
  1: "/productos/guitarra-yamaha-f310.jpg",
  2: "/productos/guitarra-squier-stratocaster.jpeg",
  3: "/productos/bajo-squier-jazz-bass.jpg",
  4: "/productos/teclado-yamaha-psre383.jpeg",
  5: "/productos/teclado-casio-cts300.jpeg",
  6: "/productos/bateria-tama-imperialstar.jpeg",
  7: "/productos/cajon-meinl.png",
  8: "/productos/microfono-shure-sm58.jpeg",
  9: "/productos/amplificador-fender-frontman10g.webp",
  10: "/productos/afinador-boss-tu3.jpg",
};

function formatearPrecio(precio) {
  return Number(precio).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

export default function TarjetaProducto({ producto }) {
  const { productos, agregarProducto } = useCarrito();
  const [mensaje, setMensaje] = useState("");

  const imagen = imagenesProductos[producto.id];

  const tieneOferta =
    producto.precio_oferta !== null &&
    producto.precio_oferta !== undefined;

  const precioFinal = tieneOferta
    ? producto.precio_oferta
    : producto.precio;

  const enCarrito = productos.find(
    (item) => item.id === producto.id
  );

  const cantidadEnCarrito = enCarrito?.cantidad ?? 0;
  const stockDisponible = Number(producto.stock) > cantidadEnCarrito;

  function agregarAlCarrito() {
    if (!stockDisponible) return;

    agregarProducto(producto);
    setMensaje("¡Agregado al carrito!");
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-md">
      <div className="relative flex h-56 items-center justify-center border-b border-zinc-100 bg-white p-5">
        {imagen ? (
          <Link
            href={`/productos/${producto.id}`}
            aria-label={`Ver detalle de ${producto.nombre}`}
            className="flex h-full w-full items-center justify-center"
          >
            <Image
              src={imagen}
              alt={producto.nombre}
              width={350}
              height={350}
              className="h-full w-full object-contain"
            />
          </Link>
        ) : (
          <span className="text-sm text-zinc-400">
            Imagen no disponible
          </span>
        )}

        {tieneOferta && (
          <span className="absolute left-3 top-3 rounded bg-[#b68d3e] px-3 py-1 text-xs font-semibold text-white">
            OFERTA
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#99752f]">
          {producto.marca?.nombre}
        </p>

        <h3 className="mt-2 text-base font-semibold leading-6 text-zinc-900">
          <Link
            href={`/productos/${producto.id}`}
            className="hover:text-[#99752f] hover:underline"
          >
            {producto.nombre}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-5 text-zinc-500">
          {producto.descripcion}
        </p>

        <div className="mt-auto pt-5">
          {tieneOferta && (
            <p className="text-sm text-zinc-400 line-through">
              {formatearPrecio(producto.precio)}
            </p>
          )}

          <p className="mt-1 text-2xl font-bold text-zinc-900">
            {formatearPrecio(precioFinal)}
          </p>

          <p className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-600">
            {producto.stock > 0
              ? `Disponible · ${producto.stock} unidades`
              : "Sin stock"}
          </p>

          <button
            type="button"
            onClick={agregarAlCarrito}
            disabled={!stockDisponible}
            className="mt-4 w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {Number(producto.stock) <= 0
              ? "Sin stock"
              : !stockDisponible
                ? "Máximo disponible en carrito"
                : "Agregar al carrito"}
          </button>

          {mensaje && (
            <p
              role="status"
              className="mt-2 text-center text-xs font-medium text-green-700"
            >
              {mensaje}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
