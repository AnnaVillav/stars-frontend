
const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://stars-backend-5c8u.onrender.com";

export async function apiRequest(
  endpoint,
  { method = "GET", body, token } = {}
) {
  const headers = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const ruta = endpoint.replace(/^\/api\//, "/");

  // En el navegador usamos el proxy para evitar CORS.
  // En el servidor consultamos directamente a Django.
  const url =
    typeof window === "undefined"
      ? `${BACKEND_URL}${endpoint}`
      : `/api/proxy${ruta}`;

  const response = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Error al consultar la API: ${response.status}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
