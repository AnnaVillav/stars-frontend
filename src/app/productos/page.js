import { Suspense } from "react";
import { apiRequest } from "@/lib/api";
import FiltrosProductos from "@/components/FiltrosProductos";
import TarjetaProducto from "@/components/TarjetaProducto";

async function obtenerTodos(endpoint) {
  const registros = [];
  let pagina = 1;
  let hayMas = true;

  while (hayMas) {
    const respuesta = await apiRequest(
      `${endpoint}?page=${pagina}`
    );

    registros.push(...respuesta.results);
    hayMas = Boolean(respuesta.next);
    pagina++;
  }

  return registros;
}

async function ContenidoProductos({ searchParams }) {
  const parametros = await searchParams;

  const busqueda =
    typeof parametros?.search === "string"
      ? parametros.search.trim()
      : "";

  const categoriaSeleccionada =
    typeof parametros?.categoria === "string"
      ? parametros.categoria
      : "";

  const marcaSeleccionada =
    typeof parametros?.marca === "string"
      ? parametros.marca
      : "";

  let productos = [];
  let categorias = [];
  let marcas = [];
  let error = null;

  try {
    let pagina = 1;
    let hayMas = true;

    while (hayMas) {
      const consulta = new URLSearchParams({
        page: String(pagina),
      });

      if (busqueda) {
        consulta.set("search", busqueda);
      }

      const respuesta = await apiRequest(
        `/api/productos/?${consulta.toString()}`
      );

      productos = [...productos, ...respuesta.results];
      hayMas = Boolean(respuesta.next);
      pagina++;
    }

    [categorias, marcas] = await Promise.all([
      obtenerTodos("/api/categorias/"),
      obtenerTodos("/api/marcas/"),
    ]);

    if (busqueda) {
      const texto = busqueda.toLocaleLowerCase("es");

      productos = productos.filter((producto) => {
        const nombre =
          producto.nombre?.toLocaleLowerCase("es") || "";

        const categoria =
          producto.categoria?.nombre?.toLocaleLowerCase("es") || "";

        const marca =
          producto.marca?.nombre?.toLocaleLowerCase("es") || "";

        return (
          nombre.includes(texto) ||
          categoria.includes(texto) ||
          marca.includes(texto)
        );
      });
    }

    productos = productos.filter((producto) => {
      const coincideCategoria =
        !categoriaSeleccionada ||
        String(producto.categoria?.id) === categoriaSeleccionada;

      const coincideMarca =
        !marcaSeleccionada ||
        String(producto.marca?.id) === marcaSeleccionada;

      return coincideCategoria && coincideMarca;
    });
  } catch {
    error = "No pudimos cargar el catálogo. Intentá nuevamente.";
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">

        {/* Encabezado del catálogo */}
        <div className="mb-8 border-b border-zinc-200 pb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#99752f]">
            STARS / TIENDA ONLINE
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Instrumentos musicales
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            Encontrá instrumentos, equipos y accesorios para
            acompañar tu música.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">
              {busqueda
                ? `Resultados para "${busqueda}"`
                : "Todos los productos"}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {error
                ? "Catálogo no disponible"
                : `${productos.length} productos encontrados`}
            </p>
          </div>

          
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700"
          >
            {error}
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">

            <FiltrosProductos
              categorias={categorias}
              marcas={marcas}
              categoriaSeleccionada={categoriaSeleccionada}
              marcaSeleccionada={marcaSeleccionada}
              busqueda={busqueda}
            />

            {/* Listado de productos */}
            <section aria-label="Listado de productos">
              {productos.length === 0 ? (
                <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center">
                  <h3 className="text-xl font-semibold">
                    No encontramos productos
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    Probá con otra categoría, marca o búsqueda.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {productos.map((producto) => (
                    <TarjetaProducto
                      key={producto.id}
                      producto={producto}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ProductosPage({ searchParams }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f7f7f5] px-6 py-16 text-center text-zinc-700">
          <p role="status" className="text-lg font-medium">
            Cargando instrumentos de STARS...
          </p>
        </main>
      }
    >
      <ContenidoProductos searchParams={searchParams} />
    </Suspense>
  );
}
