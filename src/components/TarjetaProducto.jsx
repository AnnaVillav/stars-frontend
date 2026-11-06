
import Image from "next/image";

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
  const imagen = imagenesProductos[producto.id];

  const tieneOferta =
    producto.precio_oferta !== null &&
    producto.precio_oferta !== undefined;

  const precioFinal = tieneOferta
    ? producto.precio_oferta
    : producto.precio;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-md">
      <div className="relative flex h-56 items-center justify-center border-b border-zinc-100 bg-white p-5">
        {imagen ? (
          <Image
            src={imagen}
            alt={producto.nombre}
            width={350}
            height={350}
            className="h-full w-full object-contain"
          />
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
          {producto.nombre}
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
        </div>
      </div>
    </article>
  );
}
