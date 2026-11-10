
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

function formatearPrecio(precio) {
  return Number(precio).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

export default function GestionProductosPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null);

  const cargarProductos = useCallback(async () => {
    setCargando(true);
    setError("");

    try {
      let url = "/api/productos/?page_size=100";
      const todos = [];

      while (url) {
        const respuesta = await apiRequest(url);
        const lista = Array.isArray(respuesta)
          ? respuesta
          : respuesta.results || [];

        todos.push(...lista);

        if (Array.isArray(respuesta) || !respuesta.next) {
          break;
        }

        // La API devuelve una URL completa para la página siguiente.
        const siguiente = new URL(respuesta.next);
        url = siguiente.pathname + siguiente.search;
      }

      setProductos(todos);
    } catch {
      setError("No se pudieron cargar los productos de Django.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  async function eliminarProducto(producto) {
    const confirmar = window.confirm(
      `¿Seguro que querés eliminar "${producto.nombre}"?`
    );

    if (!confirmar) return;

    const token = sessionStorage.getItem("stars_token");

    if (!token) {
      setError("Tu sesión expiró. Volvé a iniciar sesión.");
      return;
    }

    setEliminandoId(producto.id);
    setError("");

    try {
      await apiRequest(`/api/productos/${producto.id}/`, {
        method: "DELETE",
        token,
      });

      setProductos((actuales) =>
        actuales.filter((item) => item.id !== producto.id)
      );
    } catch {
      setError(
        "No se pudo eliminar el producto. Verificá tu sesión y los permisos de administrador."
      );
    } finally {
      setEliminandoId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
          STARS / ADMINISTRACIÓN
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">
            Administrar productos
          </h1>

          <Link
            href="/gestion/productos/nuevo"
            className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
          >
            + Agregar producto
          </Link>
        </div>

        <p className="mt-3 text-sm text-zinc-600">
          Consultá, editá y eliminá los instrumentos de STARS.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {cargando ? (
          <p className="mt-10 text-zinc-600">
            Cargando productos...
          </p>
        ) : productos.length === 0 ? (
          <p className="mt-10 text-zinc-600">
            No hay productos para mostrar.
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-700">
                <tr>
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Producto</th>
                  <th className="px-5 py-4">Precio</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4">Estado</th>
                  <th className="px-5 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productos.map((producto) => (
                  <tr
                    key={producto.id}
                    className="border-t border-zinc-200"
                  >
                    <td className="px-5 py-4">{producto.id}</td>

                    <td className="px-5 py-4 font-medium">
                      {producto.nombre}
                    </td>

                    <td className="px-5 py-4">
                      {formatearPrecio(producto.precio)}
                    </td>

                    <td className="px-5 py-4">
                      {producto.stock}
                    </td>

                    <td className="px-5 py-4">
                      {producto.activo ? "Activo" : "Inactivo"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/gestion/productos/${producto.id}/editar`}
                          className="font-semibold text-[#99752f] hover:underline"
                        >
                          Editar
                        </Link>

                        <button
                          type="button"
                          disabled={eliminandoId !== null}
                          onClick={() => eliminarProducto(producto)}
                          className="font-semibold text-red-700 hover:underline disabled:opacity-50"
                        >
                          {eliminandoId === producto.id
                            ? "Eliminando..."
                            : "Eliminar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link
          href="/gestion"
          className="mt-8 inline-block text-sm font-semibold text-[#99752f] hover:underline"
        >
          ← Volver al panel
        </Link>
      </div>
    </main>
  );
}
