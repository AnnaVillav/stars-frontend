
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function iniciarSesion(evento) {
    evento.preventDefault();
    setError("");
    setCargando(true);

    try {
      const respuesta = await apiRequest("/api/token/", {
        method: "POST",
        body: {
          username: usuario,
          password: contrasena,
        },
      });

      if (!respuesta.token) {
        throw new Error("No se recibió el token.");
      }

      sessionStorage.setItem("stars_token", respuesta.token);

      router.push("/gestion");
      router.refresh();
    } catch {
      setError(
        "No pudimos iniciar sesión. Verificá tu usuario y contraseña."
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-white px-6 py-16 text-zinc-900">
      <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#99752f]">
          STARS / MI CUENTA
        </p>

        <h1 className="text-3xl font-bold">
          Ingresar a STARS
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-600">
          Ingresá con tu usuario y contraseña para acceder al panel de
          administración.
        </p>

        <form onSubmit={iniciarSesion} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="usuario"
              className="mb-2 block text-sm font-semibold"
            >
              Usuario
            </label>

            <input
              id="usuario"
              type="text"
              autoComplete="username"
              required
              value={usuario}
              onChange={(evento) => setUsuario(evento.target.value)}
              placeholder="Ingresá tu usuario"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#b68d3e]"
            />
          </div>

          <div>
            <label
              htmlFor="contrasena"
              className="mb-2 block text-sm font-semibold"
            >
              Contraseña
            </label>

            <input
              id="contrasena"
              type="password"
              autoComplete="current-password"
              required
              value={contrasena}
              onChange={(evento) => setContrasena(evento.target.value)}
              placeholder="Ingresá tu contraseña"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#b68d3e]"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-8 border-t border-zinc-200 pt-6">
          <Link
            href="/productos"
            className="text-sm font-semibold text-[#99752f] hover:underline"
          >
            ← Volver a explorar productos
          </Link>
        </div>
      </section>
    </main>
  );
}
