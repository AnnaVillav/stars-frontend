
import { apiRequest } from "@/lib/api";

export default async function ProductosPage() {
  let productos = [];
  let error = null;

  try {
    let pagina = 1;
    let hayMas = true;

    while (hayMas) {
      const respuesta = await apiRequest(
        `/api/productos/?page=${pagina}`
      );

      productos = [...productos, ...respuesta.results];

      hayMas = Boolean(respuesta.next);
      pagina++;
    }
  } catch {
    error = "No pudimos cargar los productos. Intentá nuevamente.";
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <p className="mb-2 uppercase tracking-widest text-yellow-400">
        Catálogo STARS
      </p>

      <h1 className="mb-3 text-4xl font-bold">
        Nuestros instrumentos
      </h1>

      <p className="mb-8 text-zinc-400">
        {error
          ? "Catálogo no disponible"
          : `${productos.length} productos disponibles`}
      </p>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500 p-4 text-red-400"
        >
          {error}
        </p>
      ) : productos.length === 0 ? (
        <p className="text-zinc-400">
          Todavía no hay productos disponibles.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <article
              key={producto.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <p className="mb-2 text-sm text-yellow-400">
                {producto.categoria?.nombre}
              </p>

              <h2 className="mb-3 text-xl font-bold">
                {producto.nombre}
              </h2>

              <p className="mb-4 text-sm text-zinc-400">
                {producto.descripcion}
              </p>

              {producto.precio_oferta ? (
                <div>
                  <p className="text-sm text-zinc-500 line-through">
                    ${Number(producto.precio).toLocaleString("es-AR")}
                  </p>

                  <p className="text-2xl font-bold text-yellow-400">
                    ${Number(producto.precio_oferta).toLocaleString("es-AR")}
                  </p>

                  <span className="mt-2 inline-block rounded bg-yellow-400 px-2 py-1 text-xs font-bold text-black">
                    OFERTA
                  </span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-yellow-400">
                  ${Number(producto.precio).toLocaleString("es-AR")}
                </p>
              )}

              <p className="mt-4 text-sm text-zinc-400">
                Marca: {producto.marca?.nombre}
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Stock disponible: {producto.stock}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
