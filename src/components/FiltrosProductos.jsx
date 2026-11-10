
import Link from "next/link";

export default function FiltrosProductos({
  categorias,
  marcas,
  categoriaSeleccionada = "",
  marcaSeleccionada = "",
  busqueda = "",
}) {
  return (
    <aside className="rounded-lg border border-zinc-200 bg-white p-5">
      <h2 className="text-lg font-bold text-zinc-900">
        Filtrar productos
      </h2>

      <form action="/productos" method="get">
        {busqueda && (
          <input type="hidden" name="search" value={busqueda} />
        )}

        <div className="mt-6">
          <label
            htmlFor="categoria"
            className="mb-2 block text-sm font-semibold text-zinc-800"
          >
            Categoría
          </label>

          <select
            id="categoria"
            name="categoria"
            defaultValue={categoriaSeleccionada}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-3 text-sm text-zinc-900"
          >
            <option value="">Todas las categorías</option>

            {categorias
              .filter((categoria) => categoria.activa)
              .map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-6">
          <label
            htmlFor="marca"
            className="mb-2 block text-sm font-semibold text-zinc-800"
          >
            Marca
          </label>

          <select
            id="marca"
            name="marca"
            defaultValue={marcaSeleccionada}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-3 text-sm text-zinc-900"
          >
            <option value="">Todas las marcas</option>

            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-7 w-full rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-[#99752f]"
        >
          Aplicar filtros
        </button>

        <Link
          href="/productos"
          className="mt-4 block text-center text-sm text-zinc-600 underline hover:text-zinc-900"
        >
          Limpiar filtros
        </Link>
      </form>
    </aside>
  );
}
