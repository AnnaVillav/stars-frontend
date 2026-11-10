
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

describe("STARS - Pruebas de la API del frontend", () => {
  let apiRequest;
  let fetchSimulado;

  beforeEach(async () => {
    vi.resetModules();

    vi.stubEnv(
      "NEXT_PUBLIC_API_URL",
      "https://stars-backend-prueba.com"
    );

    fetchSimulado = vi.fn();
    vi.stubGlobal("fetch", fetchSimulado);

    const modulo = await import("../src/lib/api.js");
    apiRequest = modulo.apiRequest;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("1. Consulta productos mediante GET", async () => {
    fetchSimulado.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        results: [{ id: 1, nombre: "Guitarra STARS" }],
      }),
    });

    const resultado = await apiRequest("/api/productos/");

    expect(resultado.results).toHaveLength(1);
    expect(resultado.results[0].nombre).toBe("Guitarra STARS");
    expect(fetchSimulado).toHaveBeenCalledWith(
      "https://stars-backend-prueba.com/api/productos/",
      expect.objectContaining({
        method: "GET",
      })
    );
  });

  it("2. Envía productos mediante POST con token", async () => {
    fetchSimulado.mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({
        id: 11,
        nombre: "Guitarra de prueba EFI",
      }),
    });

    const producto = {
      nombre: "Guitarra de prueba EFI",
      precio: 150000,
    };

    const resultado = await apiRequest("/api/productos/", {
      method: "POST",
      token: "token-de-prueba",
      body: producto,
    });

    expect(resultado.id).toBe(11);

    expect(fetchSimulado).toHaveBeenCalledWith(
      "https://stars-backend-prueba.com/api/productos/",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Token token-de-prueba",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(producto),
      })
    );
  });

  it("3. Elimina un producto y maneja la respuesta 204", async () => {
    fetchSimulado.mockResolvedValue({
      ok: true,
      status: 204,
    });

    const resultado = await apiRequest("/api/productos/11/", {
      method: "DELETE",
      token: "token-de-prueba",
    });

    expect(resultado).toBeNull();

    expect(fetchSimulado).toHaveBeenCalledWith(
      "https://stars-backend-prueba.com/api/productos/11/",
      expect.objectContaining({
        method: "DELETE",
        headers: expect.objectContaining({
          Authorization: "Token token-de-prueba",
        }),
      })
    );
  });

  it("4. Detecta un error cuando la API rechaza la solicitud", async () => {
    fetchSimulado.mockResolvedValue({
      ok: false,
      status: 403,
    });

    await expect(
      apiRequest("/api/productos/", {
        method: "POST",
        token: "token-sin-permisos",
        body: { nombre: "Producto de prueba" },
      })
    ).rejects.toThrow("Error al consultar la API: 403");
  });
});
