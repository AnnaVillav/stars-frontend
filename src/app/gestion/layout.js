
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GestionLayout({ children }) {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("stars_token");

    if (!token) {
      router.replace("/login");
    } else {
      setAutorizado(true);
    }
  }, [router]);

  function cerrarSesion() {
    sessionStorage.removeItem("stars_token");
    setAutorizado(false);
    router.replace("/login");
    router.refresh();
  }

  if (!autorizado) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-white px-6">
        <p role="status" className="text-sm text-zinc-600">
          Verificando acceso al panel de gestión...
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 pt-8 md:px-8">
        <nav
          aria-label="Navegación de administración"
          className="flex flex-wrap items-center gap-4 border-b border-zinc-200 pb-5 text-sm"
        >
          <Link
            href="/gestion"
            className="font-semibold text-zinc-900 hover:text-[#99752f]"
          >
            Panel de gestión
          </Link>

          <Link
            href="/productos"
            className="text-zinc-600 hover:text-[#99752f]"
          >
            Ver catálogo
          </Link>

          <button
            type="button"
            onClick={cerrarSesion}
            className="ml-auto rounded-lg border border-zinc-300 bg-white px-4 py-2 font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>

      {children}
    </div>
  );
}
