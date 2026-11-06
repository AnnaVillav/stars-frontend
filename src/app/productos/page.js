import { apiRequest } from "@/lib/api";
import FiltrosProductos from "@/components/FiltrosProductos";

// Formatear los precios en pesos argentinos.
function formatearPrecio(precio) {
  return Number(precio).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

// Obtener todos los registros de una API paginada.
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

export default async function ProductosPage({ searchParams }) {
  const parametros = await searchParams;

  // Búsqueda recibida desde el buscador del Header.
  const busqueda =
    typeof parametros?.search === "string"
      ? parametros.search.trim()
      : "";

  // Filtros seleccionados mediante la URL.
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

    // Consultar todas las páginas de productos en Django.
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

    // Obtener las categorías y marcas reales de Django.
    [categorias, marcas] = await Promise.all([
      obtenerTodos("/api/categorias/"),
      obtenerTodos("/api/marcas/"),
    ]);

    // Buscar por nombre, categoría o marca.
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

    // Aplicar los filtros por categoría y marca.
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

        {/* Cantidad de productos encontrados */}
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

          <span className="rounded-full border border-[#dec99c] bg-[#faf5e9] px-4 py-2 text-xs font-semibold text-[#83601d]">
            Catálogo STARS
          </span>
        </div>

        {/* Mensaje de error al consultar la API */}
        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700"
          >
            {error}
          </div>
        ) : (
          /* Distribución: filtros a la izquierda y productos a la derecha */
          <div className="grid items-start gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">

            {/* Componente reutilizable de filtros */}
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

                  {productos.map((producto) => {
                    const tieneOferta =
                      producto.precio_oferta !== null &&
                      producto.precio_oferta !== undefined;

                    return (
                      <article
                        key={producto.id}
                        className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                      >

                        {/* Espacio reservado para la fotografía */}
                        <div className="relative flex h-48 items-center justify-center border-b border-zinc-100 bg-[#f3f3f1] px-5">

                          {tieneOferta && (
                            <span className="absolute left-3 top-3 rounded bg-[#b68d3e] px-3 py-1 text-xs font-bold text-white">
                              OFERTA
                            </span>
                          )}

                          <span className="text-center text-sm font-medium text-zinc-400">
                            {producto.categoria?.nombre}
                          </span>
                        </div>

                        {/* Información del producto */}
                        <div className="flex flex-1 flex-col p-5">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#a07b35]">
                            {producto.marca?.nombre}
                          </p>

                          <h3 className="min-h-12 text-base font-bold leading-6">
                            {producto.nombre}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-5 text-zinc-500">
                            {producto.descripcion}
                          </p>

                          {/* Precio y oferta */}
                          <div className="mt-auto pt-5">
                            {tieneOferta ? (
                              <>
                                <p className="text-sm text-zinc-400 line-through">
                                  {formatearPrecio(producto.precio)}
                                </p>

                                <p className="mt-1 text-2xl font-bold text-zinc-900">
                                  {formatearPrecio(producto.precio_oferta)}
                                </p>
                              </>
                            ) : (
                              <p className="text-2xl font-bold text-zinc-900">
                                {formatearPrecio(producto.precio)}
                              </p>
                            )}

                            {/* Stock disponible */}
                            <div className="mt-4 border-t border-zinc-100 pt-3">
                              <p className="text-xs text-zinc-600">
                                {producto.stock > 0
                                  ? `Disponible · ${producto.stock} unidades`
                                  : "Sin stock"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
