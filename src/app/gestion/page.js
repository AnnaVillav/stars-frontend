
import Link from "next/link";

export default function GestionPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="mb-10 border-b border-zinc-200 pb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
            STARS / ADMINISTRACIÓN
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Gestión de productos
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
            Espacio de administración de instrumentos musicales
            y accesorios de STARS.
          </p>
        </div>

        <section aria-labelledby="gestion-productos">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-zinc-200 bg-white p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#99752f]">
                Catálogo
              </p>

              <h2
                id="gestion-productos"
                className="text-xl font-bold"
              >
                Consultar productos
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Accedé al listado de instrumentos, precios,
                categorías, marcas y disponibilidad.
              </p>

              <Link
                href="/productos"
                className="mt-7 inline-flex rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                Ver catálogo
              </Link>
            </article>

            <article className="rounded-2xl border border-zinc-200 bg-white p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#99752f]">
                Administración
              </p>

              <h2 className="text-xl font-bold">
                Administrar instrumentos
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-600">
                En esta sección incorporaremos las operaciones
                para crear, editar y eliminar productos.
              </p>

              <span className="mt-7 inline-flex rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-600">
                Funciones en desarrollo
              </span>
            </article>
          </div>
        </section>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm font-semibold text-[#99752f] hover:underline"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
