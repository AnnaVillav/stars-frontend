
import Link from "next/link";
import { Suspense } from "react";
import BuscadorProductos from "@/components/BuscadorProductos";
import CuentaHeader from "@/components/CuentaHeader";
import CarritoHeader from "@/components/CarritoHeader";

export default function Header() {
  return (
    <header className="bg-white text-zinc-900">
      {/* Franja superior */}
      <div className="bg-[#171717] px-4 py-3 text-center">
        <p className="text-xs font-medium tracking-wide text-[#e3bd68]">
          STARS · INSTRUMENTOS MUSICALES Y ACCESORIOS
        </p>
      </div>

      {/* Logo, buscador y cuenta */}
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-5 md:px-8">
        <Link
          href="/"
          className="shrink-0 text-3xl font-bold tracking-tight text-zinc-900"
        >
          STARS
        </Link>

        <div className="min-w-0 flex-1">
          <Suspense
            fallback={
              <div className="h-11 w-full rounded-md border border-zinc-300 bg-white" />
            }
          >
            <BuscadorProductos />
          </Suspense>
        </div>

      {/* Carrito y cuenta del usuario */}
<CarritoHeader />
<CuentaHeader />
      </div>

      {/* Menú principal */}
      <nav
        aria-label="Navegación principal"
        className="border-t border-zinc-200"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-7 gap-y-2 px-5 py-4 text-sm md:px-8">
          <Link href="/" className="hover:text-[#a47d36]">
            Inicio
          </Link>

          <Link href="/productos" className="hover:text-[#a47d36]">
            Productos
          </Link>

          <Link href="/categorias" className="hover:text-[#a47d36]">
            Categorías
          </Link>

          <Link href="/ofertas" className="hover:text-[#a47d36]">
            Ofertas
          </Link>
        </div>
      </nav>
    </header>
  );
}
