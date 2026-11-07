
import { Suspense } from "react";
import { apiRequest } from "@/lib/api";
import TarjetaProducto from "@/components/TarjetaProducto";
import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import EstadoVacio from "@/components/EstadoVacio";

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

          <EncabezadoSeccion
            titulo="Ofertas imperdibles"
            descripcion="Descubrí los instrumentos y accesorios que tienen precios promocionales en nuestra tienda."
          />
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700"
          >
            No pudimos cargar las ofertas. Intentá nuevamente.
          </div>
        ) : productosEnOferta.length === 0 ? (
          <EstadoVacio
            titulo="No hay ofertas disponibles por el momento"
            descripcion="Mientras tanto, podés explorar todos nuestros instrumentos musicales."
            enlace="/productos"
            textoEnlace="Ver todos los productos"
          />
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
