
import Link from "next/link";

const categorias = [
  { nombre: "Guitarras", busqueda: "guitarra" },
  { nombre: "Bajos", busqueda: "bajo" },
  { nombre: "Teclados", busqueda: "teclado" },
  { nombre: "Baterías", busqueda: "batería" },
  { nombre: "Amplificadores", busqueda: "amplificador" },
  { nombre: "Micrófonos", busqueda: "micrófono" },
  { nombre: "Accesorios", busqueda: "accesorio" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-700 bg-[#303030] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-3 md:px-8">
        {/* CATEGORÍAS */}
        <div>
          <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-[#d8b56a]">
            Categorías
          </h2>

          <nav
            aria-label="Categorías del pie de página"
            className="flex flex-col gap-4"
          >
            {categorias.map((categoria) => (
              <Link
                key={categoria.nombre}
                href={`/productos?search=${encodeURIComponent(categoria.busqueda)}`}
                className="w-fit text-sm text-zinc-300 transition hover:text-[#d8b56a]"
              >
                {categoria.nombre}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-[#d8b56a]">
            STARS
          </h2>

          <nav
            aria-label="Enlaces de la tienda"
            className="flex flex-col gap-4"
          >
            <Link
              href="/"
              className="w-fit text-sm text-zinc-300 transition hover:text-[#d8b56a]"
            >
              Inicio
            </Link>

            <Link
              href="/productos"
              className="w-fit text-sm text-zinc-300 transition hover:text-[#d8b56a]"
            >
              Todos los productos
            </Link>

            <Link
              href="/#ofertas"
              className="w-fit text-sm text-zinc-300 transition hover:text-[#d8b56a]"
            >
              Ofertas imperdibles
            </Link>

        
          </nav>
        </div>

        <div>
          <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-[#d8b56a]">
            Contacto
          </h2>

          <p className="text-lg font-bold tracking-tight">
            STARS
          </p>

          <p className="mt-3 max-w-xs text-sm leading-7 text-zinc-300">
            Tienda online de instrumentos musicales y accesorios.
            Encontrá guitarras, bajos, teclados, baterías
            y equipos para disfrutar de la música.
          </p>

          <div className="mt-7 border-t border-zinc-600 pt-5">
            <p className="text-sm font-semibold text-white">
              Tu música empieza acá.
            </p>
            <p className="mt-2 text-xs text-zinc-400">
              Explorá nuestro catálogo y descubrí tu próximo instrumento.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-600 bg-[#252525]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-xs text-zinc-400 md:flex-row md:px-8">
          <p>© 2026 STARS. Todos los derechos reservados.</p>

          <p>Tienda de instrumentos musicales y accesorios.</p>
        </div>
      </div>
    </footer>
  );
}
