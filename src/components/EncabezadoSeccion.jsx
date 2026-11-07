
export default function EncabezadoSeccion({
  titulo,
  descripcion,
}) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
        {titulo}
      </h1>

      {descripcion && (
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {descripcion}
        </p>
      )}
    </div>
  );
}
