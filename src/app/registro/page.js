
"use client";

import { useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export default function RegistroPage() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);

  async function registrarUsuario(evento) {
    evento.preventDefault();
    setError("");
    setExito("");

    if (contrasena !== confirmacion) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    try {
      await apiRequest("/api/registro/", {
        method: "POST",
        body: {
          username: usuario.trim(),
          email: email.trim(),
          password: contrasena,
        },
      });

      setExito("¡Cuenta creada correctamente! Ya podés iniciar sesión.");
      setUsuario("");
      setEmail("");
      setContrasena("");
      setConfirmacion("");
    } catch (error) {
      setError(
        error.message || "No pudimos crear la cuenta. Intentá nuevamente."
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

        <h1 className="text-3xl font-bold">Crear cuenta</h1>

        <p className="mt-4 text-sm leading-7 text-zinc-600">
          Registrate para tener tu cuenta de cliente en STARS.
        </p>

        <form onSubmit={registrarUsuario} className="mt-8 space-y-5">
          <div>
            <label htmlFor="usuario" className="mb-2 block text-sm font-semibold">
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              autoComplete="username"
              required
              value={usuario}
              onChange={(evento) => setUsuario(evento.target.value)}
              placeholder="Elegí un nombre de usuario"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#b68d3e]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              placeholder="tuemail@ejemplo.com"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#b68d3e]"
            />
          </div>

          <div>
            <label htmlFor="contrasena" className="mb-2 block text-sm font-semibold">
              Contraseña
            </label>
            <input
              id="contrasena"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={contrasena}
              onChange={(evento) => setContrasena(evento.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#b68d3e]"
            />
          </div>

          <div>
            <label htmlFor="confirmacion" className="mb-2 block text-sm font-semibold">
              Confirmar contraseña
            </label>
            <input
              id="confirmacion"
              type="password"
              autoComplete="new-password"
              required
              value={confirmacion}
              onChange={(evento) => setConfirmacion(evento.target.value)}
              placeholder="Repetí tu contraseña"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-[#b68d3e]"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {exito && (
            <div role="status" className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              <p>{exito}</p>
              <Link href="/login" className="mt-3 inline-block font-bold underline">
                Ir a iniciar sesión
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <div className="mt-8 border-t border-zinc-200 pt-6">
          <p className="text-sm text-zinc-600">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="font-semibold text-[#99752f] hover:underline">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
