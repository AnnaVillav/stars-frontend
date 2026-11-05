
export default function ProductosPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <div className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-widest text-yellow-400">
          Catálogo STARS
        </p>

        <h1 className="text-4xl font-bold text-white">
          Nuestros instrumentos
        </h1>

        <p className="mt-3 text-zinc-400">
          Explorá nuestra selección de instrumentos musicales y accesorios.
        </p>
      </div>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="text-zinc-300">
          Próximamente mostraremos aquí los productos de nuestra API Django.
        </p>
      </section>
    </main>
  );
}
