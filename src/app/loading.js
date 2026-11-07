
export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-white px-6 py-16">
      <div role="status" className="text-center">
        <div
          aria-hidden="true"
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-[#b68d3e]"
        />

        <h1 className="mt-6 text-xl font-bold text-zinc-900">
          Cargando STARS...
        </h1>

        <p className="mt-2 text-sm text-zinc-600">
          Estamos preparando los instrumentos para vos.
        </p>
      </div>
    </main>
  );
}

