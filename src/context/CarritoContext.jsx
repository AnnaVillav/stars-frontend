
"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [productos, setProductos] = useState([]);

  function agregarProducto(producto) {
    setProductos((anteriores) => {
      const existente = anteriores.find(
        (item) => item.id === producto.id
      );

      if (existente) {
        return anteriores.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...anteriores,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: Number(producto.precio_oferta ?? producto.precio),
          stock: producto.stock,
          cantidad: 1,
        },
      ];
    });
  }

  function cambiarCantidad(id, cantidad) {
    setProductos((anteriores) =>
      anteriores.map((item) => {
        if (item.id !== id) return item;

        const nuevaCantidad = Math.max(
          1,
          Math.min(Number(cantidad) || 1, item.stock)
        );

        return { ...item, cantidad: nuevaCantidad };
      })
    );
  }

  function quitarProducto(id) {
    setProductos((anteriores) =>
      anteriores.filter((item) => item.id !== id)
    );
  }

  function vaciarCarrito() {
    setProductos([]);
  }

  const cantidadTotal = productos.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const totalCompra = productos.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  const valor = useMemo(
    () => ({
      productos,
      agregarProducto,
      cambiarCantidad,
      quitarProducto,
      vaciarCarrito,
      cantidadTotal,
      totalCompra,
    }),
    [productos, cantidadTotal, totalCompra]
  );

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error(
      "useCarrito debe utilizarse dentro de CarritoProvider"
    );
  }

  return contexto;
}
