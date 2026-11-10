
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { apiRequest } from "@/lib/api";

async function ContenidoCategoria({ params }) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let categoria;

  try {
    categoria = await apiRequest(`/api/categorias/${id}/`);
  } catch (error) {
    if (error.message.includes("404")) {
      notFound();
    }

    throw error;
  }

  redirect(`/productos?categoria=${categoria.id}`);
}

export default function CategoriaDetallePage({ params }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white px-6 py-16 text-center">
          <p role="status" className="text-zinc-600">
            Cargando productos de la categoría...
          </p>
        </main>
      }
    >
      <ContenidoCategoria params={params} />
    </Suspense>
  );
}
