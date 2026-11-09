
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCarrito } from "@/context/CarritoContext";

function formatearPrecio(precio) {
  return Number(precio).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

export default function CarritoPage() {
  const router = useRouter();

  const {
    productos,
    cambiarCantidad,
    quitarProducto,
    vaciarCarrito,
    cantidadTotal,
    totalCompra,
  } = useCarrito();

  function finalizarCompra() {
    const token = sessionStorage.getItem("stars_token");

    if (!token) {
      router.push("/login?next=/carrito");
      return;
    }

    alert(
      "Tu carrito está listo. Esta es una simulación de compra para STARS."
    );
  }

  return (
    <main className="min-h-[65vh] bg-[#f7f7f5] px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
          STARS / MI COMPRA
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Carrito de compras
        </h1>

        <p className="mt-3 text-sm text-zinc-600">
          Revisá los instrumentos que seleccionaste.
        </p>

        {productos.length === 0 ? (
          <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">
              Tu carrito está vacío
            </h2>

            <p className="mt-3 text-zinc-600">
              Explorá nuestro catálogo y agregá tus instrumentos favoritos.
            </p>

            <Link
              href="/productos"
              className="mt-6 inline-flex rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
            >
              Explorar productos
            </Link>
          </section>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <section className="space-y-4 lg:col-span-2">
              {productos.map((producto) => (
                <article
                  key={producto.id}
                  className="rounded-xl border border-zinc-200 bg-white p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/productos/${producto.id}`}
                        className="text-lg font-semibold hover:text-[#99752f]"
                      >
                        {producto.nombre}
                      </Link>

                      <p className="mt-2 text-sm text-zinc-600">
                        Precio unitario: {formatearPrecio(producto.precio)}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Stock disponible: {producto.stock}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => quitarProducto(producto.id)}
                      className="text-sm font-semibold text-red-700 hover:underline"
                    >
                      Quitar
                    </button>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-4">
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor={`cantidad-${producto.id}`}
                        className="text-sm font-medium"
                      >
                        Cantidad
                      </label>

                      <input
                        id={`cantidad-${producto.id}`}
                        type="number"
                        min="1"
                        max={producto.stock}
                        value={producto.cantidad}
                        onChange={(evento) =>
                          cambiarCantidad(
                            producto.id,
                            evento.target.value
                          )
                        }
                        className="w-20 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <p className="text-lg font-bold">
                      {formatearPrecio(
                        producto.precio * producto.cantidad
                      )}
                    </p>
                  </div>
                </article>
              ))}

              <button
                type="button"
                onClick={vaciarCarrito}
                className="text-sm font-semibold text-red-700 hover:underline"
              >
                Vaciar carrito
              </button>
            </section>

            <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-bold">
                Resumen de compra
              </h2>

              <div className="mt-6 flex justify-between text-sm">
                <span>Artículos</span>
                <span>{cantidadTotal}</span>
              </div>

              <div className="mt-5 flex justify-between border-t border-zinc-200 pt-5">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">
                  {formatearPrecio(totalCompra)}
                </span>
              </div>

              <button
                type="button"
                onClick={finalizarCompra}
                className="mt-6 w-full rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                Finalizar compra
              </button>

              <p className="mt-3 text-xs leading-5 text-zinc-500">
                Para continuar necesitás iniciar sesión.
                La compra es una simulación y no registra pedidos reales.
              </p>

              <Link
                href="/productos"
                className="mt-5 block text-center text-sm font-semibold text-[#99752f] hover:underline"
              >
                Seguir comprando
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
