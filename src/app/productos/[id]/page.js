
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { apiRequest } from "@/lib/api";
import BotonAgregarCarrito from "@/components/BotonAgregarCarrito";

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

async function DetalleProducto({ params }) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let producto;

  try {
    producto = await apiRequest(`/api/productos/${id}/`);
  } catch (error) {
    if (error.message.includes("404")) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-white px-6 py-16">
        <div
          role="alert"
          className="mx-auto max-w-4xl rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700"
        >
          No pudimos cargar este instrumento. Intentá nuevamente.
        </div>
      </main>
    );
  }

  let categoria = null;
  let marca = null;

  try {
    [categoria, marca] = await Promise.all([
      apiRequest(`/api/categorias/${producto.categoria}/`),
      apiRequest(`/api/marcas/${producto.marca}/`),
    ]);
  } catch {
  }

  const imagen = imagenesProductos[producto.id];

  const tieneOferta =
    producto.precio_oferta !== null &&
    producto.precio_oferta !== undefined &&
    Number(producto.precio_oferta) < Number(producto.precio);

  const precioFinal = tieneOferta
    ? producto.precio_oferta
    : producto.precio;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <nav
          aria-label="Ruta de navegación"
          className="mb-9 text-sm"
        >
          <Link
            href="/"
            className="text-zinc-500 hover:underline"
          >
            Inicio
          </Link>

          <span className="mx-2 text-zinc-400">/</span>

          <Link
            href="/productos"
            className="text-zinc-500 hover:underline"
          >
            Productos
          </Link>

          <span className="mx-2 text-zinc-400">/</span>

          <span className="font-medium text-zinc-900">
            {producto.nombre}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Fotografía del instrumento */}
          <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 md:min-h-[480px]">
            {imagen ? (
              <Image
                src={imagen}
                alt={producto.nombre}
                width={600}
                height={600}
                className="max-h-[430px] w-full object-contain"
              />
            ) : (
              <p className="text-zinc-500">
                Imagen no disponible
              </p>
            )}
          </div>

          {/* Información del producto */}
          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
              {marca?.nombre || "Marca no disponible"}
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {producto.nombre}
            </h1>

            <p className="mt-4 text-sm text-zinc-600">
              Categoría: {categoria?.nombre || "No disponible"}
            </p>

            {/* Precio y oferta */}
            <div className="mt-8 border-y border-zinc-200 py-7">
              {tieneOferta && (
                <p className="mb-2 text-lg text-zinc-400 line-through">
                  {formatearPrecio(producto.precio)}
                </p>
              )}

              <p className="text-4xl font-bold text-zinc-900">
                {formatearPrecio(precioFinal)}
              </p>

              {tieneOferta && (
                <span className="mt-3 inline-block rounded-md bg-[#b68d3e] px-3 py-1 text-xs font-bold text-white">
                  OFERTA
                </span>
              )}
            </div>

            {/* Disponibilidad */}
            <p className="mt-6 text-sm font-medium text-zinc-700">
              {producto.stock > 0
                ? `Disponible · ${producto.stock} unidades`
                : "Sin stock"}
            </p>

            {/* Descripción */}
            <div className="mt-8">
              <h2 className="text-lg font-bold">
                Descripción del producto
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                {producto.descripcion ||
                  "Sin descripción disponible."}
              </p>
            </div>

            <BotonAgregarCarrito producto={producto} />
            
          </section>
        </div>
      </div>
    </main>
  );
}

export default function ProductoDetallePage({ params }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white px-6 py-16 text-center">
          <p role="status" className="text-zinc-600">
            Cargando detalle del instrumento...
          </p>
        </main>
      }
    >
      <DetalleProducto params={params} />
    </Suspense>
  );
}
