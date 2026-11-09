
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function CuentaHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const [usuario, setUsuario] = useState(null);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    let activo = true;

    async function cargarUsuario() {
      setVerificando(true);

      const token = sessionStorage.getItem("stars_token");

      if (!token) {
        if (activo) {
          setUsuario(null);
          setVerificando(false);
        }
        return;
      }

      try {
        const datos = await apiRequest("/api/me/", { token });

        if (activo) {
          setUsuario(datos);
        }
      } catch {
        if (activo) {
          sessionStorage.removeItem("stars_token");
          setUsuario(null);
        }
      } finally {
        if (activo) {
          setVerificando(false);
        }
      }
    }

    cargarUsuario();

    return () => {
      activo = false;
    };
  }, [pathname]);

  function cerrarSesion() {
    sessionStorage.removeItem("stars_token");
    setUsuario(null);
    setVerificando(false);
    router.replace("/");
    router.refresh();
  }

  if (verificando) {
    return (
      <span className="text-sm text-zinc-500">
        Verificando cuenta...
      </span>
    );
  }

  if (!usuario) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <Link href="/login" className="hover:text-[#99752f]">
          Ingresar
        </Link>

        <Link
          href="/registro"
          className="font-semibold text-[#99752f] hover:underline"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <span className="font-semibold text-zinc-900">
        Hola, {usuario.username}
      </span>

      {usuario.is_staff ? (
        <Link
          href="/gestion"
          className="font-semibold text-[#99752f] hover:underline"
        >
          Panel de gestión
        </Link>
      ) : (
        <Link
          href="/productos"
          className="font-semibold text-[#99752f] hover:underline"
        >
          Mi cuenta
        </Link>
      )}

      <button
        type="button"
        onClick={cerrarSesion}
        className="font-semibold text-red-700 hover:underline"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
