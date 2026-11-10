
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import TarjetaProducto from "@/components/TarjetaProducto";
import CarruselHorizontal from "@/components/CarruselHorizontal";

const logosMarcas = {
  Yamaha: "/marcas/yamaha.jpeg",
  Squier: "/marcas/squier.jpg",
  Casio: "/marcas/casio.jpeg",
  Tama: "/marcas/tama.jpg",
  Meinl: "/marcas/meinl.png",
  Shure: "/marcas/shure.svg",
  Boss: "/marcas/boss.jpeg",
  Fender: "/marcas/fender.jpeg",
};

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

// Conexion a la API de Django.
async function SeccionesInicio() {
  let productos = [];
  let marcas = [];
  let error = false;

  try {
    [productos, marcas] = await Promise.all([
      obtenerTodos("/api/productos/"),
      obtenerTodos("/api/marcas/"),
    ]);
  } catch {
    error = true;
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-white p-8 text-center text-zinc-700"
        >
          No pudimos cargar los productos en este momento.
          Intentá actualizar la página.
        </div>
      </section>
    );
  }

  const ofertas = productos.slice(0, 5);
  const novedades = productos.slice(-4).reverse();

  return (
    <>
      <section className="bg-[#f7f7f5] py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
                Selección STARS
              </p>

              <h2 className="text-3xl font-bold text-zinc-900">
                Ofertas imperdibles
              </h2>

              <p className="mt-2 text-sm text-zinc-600">
                Descubrí instrumentos y accesorios de nuestra tienda.
              </p>
            </div>

            <Link
              href="/productos"
              className="text-sm font-semibold text-[#99752f] hover:underline"
            >
              Ver todos los productos →
            </Link>
          </div>

          {ofertas.length === 0 ? (
            <p className="text-zinc-600">
              Todavía no hay productos disponibles.
            </p>
          ) : (
            <CarruselHorizontal>
              {ofertas.map((producto) => (
                <div
                  key={producto.id}
                  className="w-[245px] shrink-0 snap-start sm:w-[260px]"
                >
                  <TarjetaProducto producto={producto} />
                </div>
              ))}
            </CarruselHorizontal>
          )}
        </div>
      </section>

<section
  id="marcas"
  className="scroll-mt-24 border-y border-zinc-200 bg-white py-12"
>        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
                Conocé nuestras marcas
              </p>

              <h2 className="text-2xl font-bold text-zinc-900">
                Nuestras marcas
              </h2>
            </div>
          </div>

          <CarruselHorizontal>
            {marcas.map((marca) => (
              <Link
                key={marca.id}
                href={`/productos?marca=${marca.id}`}
                className="group flex w-[140px] shrink-0 snap-start flex-col items-center gap-3"
              >
                <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white p-4 shadow-sm transition group-hover:border-[#d8b56a] group-hover:shadow-md">
                  {logosMarcas[marca.nombre] ? (
                    <Image
                      src={logosMarcas[marca.nombre]}
                      alt={`Logo de ${marca.nombre}`}
                      fill
                      sizes="112px"
                      className="object-contain p-4"
                    />
                  ) : (
                    <span className="text-center text-sm font-bold text-zinc-900">
                      {marca.nombre}
                    </span>
                  )}
                </div>

                <span className="text-center text-sm text-zinc-600">
                  Ver productos
                </span>
              </Link>
            ))}
          </CarruselHorizontal>
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
                Descubrí más instrumentos
              </p>

              <h2 className="text-3xl font-bold text-zinc-900">
                Novedades
              </h2>

              <p className="mt-2 text-sm text-zinc-600">
                Más opciones para encontrar tu próximo sonido.
              </p>
            </div>

            <Link
              href="/productos"
              className="text-sm font-semibold text-[#99752f] hover:underline"
            >
              Ver más →
            </Link>
          </div>

          {novedades.length === 0 ? (
            <p className="text-zinc-600">
              Todavía no hay productos disponibles.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {novedades.map((producto) => (
                <TarjetaProducto
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#d8b56a]">
              STARS · Tienda de instrumentos musicales
            </p>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Encontrá tu próximo sonido.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-zinc-300">
              Guitarras, teclados, baterías, bajos y accesorios
              para acompañarte en cada etapa de tu música.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/productos"
                className="rounded-lg bg-[#d8b56a] px-7 py-3 font-semibold text-zinc-950 transition hover:bg-[#e9ca85]"
              >
                Explorar instrumentos
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-900">
            <Image
              src="/home/banner-guitarras-nuevo.png"
              alt="Local de guitarras de STARS"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <section className="mx-auto max-w-7xl px-6 py-16">
            <p role="status" className="text-zinc-600">
              Cargando productos y marcas de STARS...
            </p>
          </section>
        }
      >
        <SeccionesInicio />
      </Suspense>
    </main>
  );
}
