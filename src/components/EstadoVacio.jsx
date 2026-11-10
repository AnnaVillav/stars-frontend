
import Link from "next/link";

export default function EstadoVacio({
  titulo = "No encontramos resultados",
  descripcion = "Probá con otra búsqueda o revisá los filtros.",
  enlace = "/productos",
  textoEnlace = "Ver todos los productos",
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-14 text-center">
      <h2 className="text-xl font-bold text-zinc-900">
        {titulo}
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-600">
        {descripcion}
      </p>

      {enlace && (
        <Link
          href={enlace}
          className="mt-6 inline-flex rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          {textoEnlace}
        </Link>
      )}
    </div>
  );
}
