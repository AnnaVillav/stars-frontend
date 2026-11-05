
import { apiRequest } from "@/lib/api";

export default async function ProductosPage() {
  let productos = [];
  let error = null;

  try {
    const respuesta = await apiRequest("/api/productos/");
    productos = respuesta.results;
  } catch {
    error = "No pudimos cargar los productos. Intentá nuevamente.";
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <p className="mb-2 uppercase tracking-widest text-yellow-400">
        Catálogo STARS
      </p>

      <h1 className="mb-8 text-4xl font-bold">
        Nuestros instrumentos
      </h1>

      {error ? (
        <p className="rounded-lg border border-red-500 p-4 text-red-400">
          {error}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <article
              key={producto.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <p className="mb-2 text-sm text-yellow-400">
                {producto.categoria.nombre}
              </p>

              <h2 className="mb-3 text-xl font-bold">
                {producto.nombre}
              </h2>

              <p className="mb-4 text-sm text-zinc-400">
                {producto.descripcion}
              </p>

              <p className="text-2xl font-bold text-yellow-400">
                ${Number(producto.precio).toLocaleString("es-AR")}
              </p>

              <p className="mt-3 text-sm text-zinc-400">
                Stock disponible: {producto.stock}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
