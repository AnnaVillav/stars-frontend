
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

  const response = await fetch(`${API_URL}${endpoint}`, {
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
