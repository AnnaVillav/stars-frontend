
import { Suspense } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import TarjetaProducto from "@/components/TarjetaProducto";

// Obtiene todos los productos, incluyendo las páginas
// adicionales que devuelve Django REST Framework.
async function obtenerProductos() {
  const productos = [];
  let pagina = 1;
  let hayMas = true;

  while (hayMas) {
    const respuesta = await apiRequest(
      `/api/productos/?page=${pagina}`
    );

    productos.push(...respuesta.results);
    hayMas = Boolean(respuesta.next);
    pagina++;
  }

  return productos;
}

async function ContenidoOfertas() {
  let productosEnOferta = [];
  let error = false;

  try {
    const productos = await obtenerProductos();

    // Solo mostramos ofertas reales registradas en Django.
    productosEnOferta = productos.filter(
      (producto) =>
        producto.precio_oferta !== null &&
        producto.precio_oferta !== undefined &&
        Number(producto.precio_oferta) < Number(producto.precio)
    );
  } catch {
    error = true;
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="mb-10 border-b border-zinc-200 pb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
            STARS / PROMOCIONES
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ofertas imperdibles
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
            Descubrí los instrumentos y accesorios que tienen
            precios promocionales en nuestra tienda.
          </p>
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700"
          >
            No pudimos cargar las ofertas. Intentá nuevamente.
          </div>
        ) : productosEnOferta.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">
              No hay ofertas disponibles por el momento
            </h2>

            <p className="mt-3 text-sm text-zinc-600">
              Mientras tanto, podés explorar todos nuestros
              instrumentos musicales.
            </p>

            <Link
              href="/productos"
              className="mt-7 inline-block rounded-lg bg-zinc-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-zinc-600">
              {productosEnOferta.length} productos en oferta
            </p>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productosEnOferta.map((producto) => (
                <TarjetaProducto
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function OfertasPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white px-6 py-16 text-center">
          <p role="status" className="text-zinc-600">
            Cargando ofertas de STARS...
          </p>
        </main>
      }
    >
      <ContenidoOfertas />
    </Suspense>
  );
}
