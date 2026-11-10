
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/api";

const esquemaProducto = z
  .object({
    nombre: z.string().trim().min(3, "Ingresá al menos 3 caracteres."),
    descripcion: z.string().trim().min(5, "Ingresá una descripción."),
    precio: z.coerce.number().positive("El precio debe ser mayor que cero."),
    precio_oferta: z.preprocess(
      (valor) => valor === "" ? null : valor,
      z.coerce.number().positive("El precio de oferta debe ser positivo.").nullable()
    ),
    stock: z.coerce.number().int("El stock debe ser entero.").min(0, "El stock no puede ser negativo."),
    categoria: z.coerce.number().int().positive("Seleccioná una categoría."),
    marca: z.coerce.number().int().positive("Seleccioná una marca."),
    proveedor: z.coerce.number().int().positive("Seleccioná un proveedor."),
    activo: z.boolean(),
  })
  .refine(
    (datos) =>
      datos.precio_oferta === null ||
      datos.precio_oferta < datos.precio,
    {
      message: "El precio de oferta debe ser menor que el precio normal.",
      path: ["precio_oferta"],
    }
  );

async function obtenerTodos(endpoint, token) {
  const elementos = [];
  let url = endpoint;

  while (url) {
    const respuesta = await apiRequest(url, { token });
    if (Array.isArray(respuesta)) {
      elementos.push(...respuesta);
      break;
    }

    elementos.push(...(respuesta.results || []));

    if (!respuesta.next) break;

    const siguiente = new URL(respuesta.next);
    url = siguiente.pathname + siguiente.search;
  }

  return elementos;
}

export default function NuevoProductoPage() {
  const router = useRouter();

  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [cargandoOpciones, setCargandoOpciones] = useState(true);
  const [errorApi, setErrorApi] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaProducto),
    defaultValues: {
      nombre: "",
      descripcion: "",
      precio: "",
      precio_oferta: "",
      stock: 0,
      categoria: "",
      marca: "",
      proveedor: "",
      activo: true,
    },
  });

  useEffect(() => {
    async function cargarOpciones() {
      try {
        const [datosCategorias, datosMarcas, datosProveedores] =
          await Promise.all([
            obtenerTodos("/api/categorias/"),
            obtenerTodos("/api/marcas/"),
            obtenerTodos("/api/proveedores/", sessionStorage.getItem("stars_token")),
          ]);

        setCategorias(datosCategorias);
        setMarcas(datosMarcas);
        setProveedores(datosProveedores);
      } catch {
        setErrorApi(
          "No se pudieron cargar las categorías, marcas o proveedores."
        );
      } finally {
        setCargandoOpciones(false);
      }
    }

    cargarOpciones();
  }, []);

  async function guardarProducto(datos) {
    setErrorApi("");

    const token = sessionStorage.getItem("stars_token");

    if (!token) {
      setErrorApi("Tu sesión expiró. Volvé a iniciar sesión.");
      return;
    }

    try {
      await apiRequest("/api/productos/", {
        method: "POST",
        token,
        body: datos,
      });

      router.push("/gestion/productos");
      router.refresh();
    } catch {
      setErrorApi(
        "No se pudo guardar el producto. Verificá los datos y los permisos de administrador."
      );
    }
  }

  const campo =
    "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#99752f] focus:ring-2 focus:ring-[#dec99c]";

  const mensajeError = "mt-1 text-xs text-red-700";

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
          STARS / ADMINISTRACIÓN
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Agregar producto
        </h1>

        <p className="mt-3 text-sm text-zinc-600">
          Completá los datos del instrumento para incorporarlo al catálogo.
        </p>

        <form
          onSubmit={handleSubmit(guardarProducto)}
          noValidate
          className="mt-8 space-y-6 rounded-xl border border-zinc-200 bg-white p-6 md:p-8"
        >
          {errorApi && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {errorApi}
            </div>
          )}

          <div>
            <label htmlFor="nombre" className="text-sm font-semibold">
              Nombre del producto
            </label>
            <input
              id="nombre"
              {...register("nombre")}
              placeholder="Ej: Guitarra eléctrica de prueba"
              className={campo}
            />
            {errors.nombre && (
              <p className={mensajeError}>{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="descripcion" className="text-sm font-semibold">
              Descripción
            </label>
            <textarea
              id="descripcion"
              {...register("descripcion")}
              rows={4}
              placeholder="Describí el instrumento..."
              className={campo}
            />
            {errors.descripcion && (
              <p className={mensajeError}>{errors.descripcion.message}</p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="precio" className="text-sm font-semibold">
                Precio
              </label>
              <input
                id="precio"
                type="number"
                min="0"
                step="0.01"
                {...register("precio")}
                className={campo}
              />
              {errors.precio && (
                <p className={mensajeError}>{errors.precio.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="precio_oferta"
                className="text-sm font-semibold"
              >
                Precio de oferta (opcional)
              </label>
              <input
                id="precio_oferta"
                type="number"
                min="0"
                step="0.01"
                {...register("precio_oferta")}
                className={campo}
              />
              {errors.precio_oferta && (
                <p className={mensajeError}>
                  {errors.precio_oferta.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="stock" className="text-sm font-semibold">
              Stock disponible
            </label>
            <input
              id="stock"
              type="number"
              min="0"
              step="1"
              {...register("stock")}
              className={campo}
            />
            {errors.stock && (
              <p className={mensajeError}>{errors.stock.message}</p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="categoria" className="text-sm font-semibold">
                Categoría
              </label>
              <select
                id="categoria"
                {...register("categoria")}
                disabled={cargandoOpciones}
                className={campo}
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              {errors.categoria && (
                <p className={mensajeError}>{errors.categoria.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="marca" className="text-sm font-semibold">
                Marca
              </label>
              <select
                id="marca"
                {...register("marca")}
                disabled={cargandoOpciones}
                className={campo}
              >
                <option value="">Seleccionar marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
              {errors.marca && (
                <p className={mensajeError}>{errors.marca.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="proveedor" className="text-sm font-semibold">
              Proveedor
            </label>
            <select
              id="proveedor"
              {...register("proveedor")}
              disabled={cargandoOpciones}
              className={campo}
            >
              <option value="">Seleccionar proveedor</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
            {errors.proveedor && (
              <p className={mensajeError}>{errors.proveedor.message}</p>
            )}
          </div>

          <label className="flex items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              {...register("activo")}
              className="h-4 w-4 accent-[#99752f]"
            />
            Producto activo
          </label>

          <div className="flex flex-wrap gap-4 border-t border-zinc-200 pt-6">
            <button
              type="submit"
              disabled={isSubmitting || cargandoOpciones || Boolean(errorApi && !categorias.length)}
              className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar producto"}
            </button>

            <Link
              href="/gestion/productos"
              className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-semibold hover:bg-zinc-50"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
