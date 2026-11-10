
import { NextResponse } from "next/server";

const BACKEND_URL = "https://stars-backend-5c8u.onrender.com";

async function reenviarSolicitud(request, context) {
  try {
    const { ruta } = await context.params;

    const urlOriginal = new URL(request.url);
    const rutaApi = ruta.map(encodeURIComponent).join("/");

    const destino = new URL(
      `/api/${rutaApi}/`,
      BACKEND_URL
    );

    destino.search = urlOriginal.search;

    const headers = {
      Accept: "application/json",
    };

    const token = request.headers.get("authorization");

    if (token) {
      headers.Authorization = token;
    }

    let body;

    if (request.method !== "GET" && request.method !== "HEAD") {
      const contenido = await request.text();

      if (contenido) {
        body = contenido;
        headers["Content-Type"] =
          request.headers.get("content-type") || "application/json";
      }
    }

    const respuesta = await fetch(destino, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
    });

    const contenido = await respuesta.text();

    return new NextResponse(
      respuesta.status === 204 ? null : contenido,
      {
        status: respuesta.status,
        headers: {
          "Content-Type":
            respuesta.headers.get("content-type") ||
            "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error al consultar Django:", error);

    return NextResponse.json(
      { detail: "No se pudo conectar con el servidor de STARS." },
      { status: 502 }
    );
  }
}

export async function GET(request, context) {
  return reenviarSolicitud(request, context);
}

export async function POST(request, context) {
  return reenviarSolicitud(request, context);
}

export async function PUT(request, context) {
  return reenviarSolicitud(request, context);
}

export async function PATCH(request, context) {
  return reenviarSolicitud(request, context);
}

export async function DELETE(request, context) {
  return reenviarSolicitud(request, context);
}
