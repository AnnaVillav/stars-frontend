
import { Suspense } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import EstadoVacio from "@/components/EstadoVacio";

async function obtenerCategorias() {
  const categorias = [];
  let pagina = 1;
  let hayMas = true;

  while (hayMas) {
    const respuesta = await apiRequest(
      `/api/categorias/?page=${pagina}`
    );

    categorias.push(...respuesta.results);
    hayMas = Boolean(respuesta.next);
    pagina++;
  }

  return categorias;
}

async function ListadoCategorias() {
  let categorias = [];
  let error = false;

  try {
    categorias = await obtenerCategorias();
  } catch {
    error = true;
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700"
      >
        No pudimos cargar las categorías. Intentá nuevamente.
      </div>
    );
  }

  if (categorias.length === 0) {
    return (
      <EstadoVacio
        titulo="Todavía no hay categorías disponibles"
        descripcion="Mientras tanto, podés explorar todos nuestros instrumentos musicales."
        enlace="/productos"
        textoEnlace="Ver todos los productos"
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categorias.map((categoria) => (
        <Link
          key={categoria.id}
          href={`/productos?categoria=${categoria.id}`}
          className="group flex min-h-48 flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-7 transition hover:border-[#d8b56a] hover:shadow-md"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#99752f]">
              Categoría STARS
            </p>

            <h2 className="text-2xl font-bold text-zinc-900">
              {categoria.nombre}
            </h2>

            {categoria.descripcion && (
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {categoria.descripcion}
              </p>
            )}
          </div>

          <span className="mt-7 text-sm font-semibold text-[#99752f] group-hover:underline">
            Explorar instrumentos →
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function CategoriasPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="mb-10 border-b border-zinc-200 pb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
            STARS / CATEGORÍAS
          </p>

          <EncabezadoSeccion
            titulo="Explorá nuestras categorías"
            descripcion="Encontrá guitarras, bajos, teclados, baterías y más. Elegí una categoría para descubrir los instrumentos disponibles en nuestra tienda."
          />
        </div>

        <Suspense
          fallback={
            <p role="status" className="py-12 text-center text-zinc-600">
              Cargando categorías de STARS...
            </p>
          }
        >
          <ListadoCategorias />
        </Suspense>
      </div>
    </main>
  );
}
