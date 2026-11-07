
import Link from "next/link";

export default function GestionLayout({ children }) {
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
        </nav>
      </div>

      {children}
    </div>
  );
}
