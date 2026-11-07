
import Link from "next/link";

export default function LoginPage() {
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
          Próximamente podrás iniciar sesión para acceder
          a las funciones de tu cuenta.
        </p>

        <div className="mt-8 border-t border-zinc-200 pt-6">
          <Link
            href="/productos"
            className="inline-flex rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Explorar productos
          </Link>
        </div>
      </section>
    </main>
  );
}
