# STARS — Tienda de Instrumentos Musicales 

## Evaluación Final Integradora 2026 — Programación III

STARS es una aplicación web de una tienda de instrumentos musicales, desarrollada con Next.js y conectada a una API REST creada con Django REST Framework.

El proyecto permite consultar instrumentos, explorar categorías y ofertas, utilizar un carrito de compras y administrar productos mediante un CRUD protegido para administradores.

## Enlaces del proyecto

- **Frontend publicado:** https://stars-frontend-navy.vercel.app
- **Backend publicado:** https://stars-backend-5c8u.onrender.com
- **API de productos:** https://stars-backend-5c8u.onrender.com/api/productos/
- **Repositorio del frontend:** https://github.com/AnnaVillav/stars-frontend
- **Tablero de Trello:** https://trello.com/b/nD8LtYHv/stars-frontend

## Tecnologías utilizadas

- Next.js 16 (App Router)
- React 19
- JavaScript
- Tailwind CSS 4
- React Hook Form
- Zod
- Context API
- Vitest
- Git y GitHub
- Vercel

El frontend consume una API REST desarrollada con Django REST Framework y publicada en Render.

## Funcionalidades

### Catálogo de productos

- Consulta de instrumentos musicales desde Django.
- Visualización de nombre, precio, descripción y disponibilidad.
- Búsqueda y filtros de productos.
- Consulta de categorías.
- Visualización de productos en oferta.
- Página individual de cada producto.

### Autenticación y usuarios

- Inicio de sesión mediante token.
- Registro de nuevos clientes.
- Cierre de sesión.
- Identificación del usuario autenticado.
- Acceso restringido a las páginas administrativas.
- Diferenciación entre clientes y administradores.

### Carrito de compras

- Agregar productos desde el catálogo.
- Agregar productos desde el detalle de un instrumento.
- Modificar cantidades.
- Quitar productos.
- Vaciar el carrito.
- Calcular el total de la compra.
- Mostrar la cantidad de artículos en el encabezado.

El carrito utiliza Context API para compartir su estado entre componentes.

**Aclaración:** el carrito funciona como demostración. No procesa pagos ni registra pedidos reales. Su contenido no se conserva al recargar completamente la página.

### Administración de productos

Se implementó un CRUD completo conectado a Django REST Framework:

| Operación | Método HTTP | Funcionalidad |
|---|---|---|
| CREATE | POST | Crear un producto |
| READ | GET | Consultar productos |
| UPDATE | PUT | Modificar un producto |
| DELETE | DELETE | Eliminar un producto |

Las operaciones administrativas requieren autenticación y permisos de administrador.

Los formularios de creación y edición utilizan React Hook Form y Zod para validar los datos antes de enviarlos a la API.

## Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio |
| `/productos` | Catálogo de productos |
| `/productos/[id]` | Detalle de un producto |
| `/categorias` | Listado de categorías |
| `/categorias/[id]` | Productos de una categoría |
| `/ofertas` | Productos en oferta |
| `/carrito` | Carrito de compras |
| `/login` | Inicio de sesión |
| `/registro` | Registro de clientes |
| `/gestion` | Panel administrativo |
| `/gestion/productos` | Administración de productos |
| `/gestion/productos/nuevo` | Crear producto |
| `/gestion/productos/[id]/editar` | Editar producto |

La aplicación utiliza App Router de Next.js, rutas dinámicas, layouts, Server Components y Client Components.

También se implementaron estados de carga, manejo de errores y página para rutas inexistentes.

## Conexión con Django

El frontend y el backend son proyectos independientes que se comunican mediante una API REST.

El backend está publicado en Render y el frontend en Vercel.

La función `apiRequest`, ubicada en `src/lib/api.js`, centraliza las solicitudes HTTP.

Para evitar problemas de CORS en producción, se implementó una ruta proxy:

`src/app/api/proxy/[...ruta]/route.js`

Las solicitudes ejecutadas desde el navegador pueden pasar por el proxy de Next.js, que las reenvía a Django.

Las solicitudes ejecutadas desde el servidor de Next.js se comunican directamente con el backend.

La autenticación utiliza tokens proporcionados por Django REST Framework.

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/AnnaVillav/stars-frontend.git
cd stars-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=https://stars-backend-5c8u.onrender.com
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abrir en el navegador:

http://localhost:3000

## Comandos disponibles

| Comando | Función |
|---|---|
| `npm run dev` | Ejecutar el proyecto en desarrollo |
| `npm run build` | Generar la versión de producción |
| `npm run start` | Ejecutar la versión de producción |
| `npm run lint` | Ejecutar ESLint |
| `npx vitest run` | Ejecutar las pruebas automatizadas |

## Testing con Vitest

Se implementaron cuatro pruebas automatizadas sobre la función de comunicación con la API.

Las pruebas utilizan respuestas simuladas y no modifican la base de datos real.

Pruebas realizadas:

1. Consulta de productos mediante GET.
2. Envío de productos mediante POST con token.
3. Procesamiento de una eliminación DELETE exitosa.
4. Manejo de errores HTTP 403.

Ejecutar:

```bash
npx vitest run
```

**Resultado verificado:** 4 tests aprobados.

## Despliegue

El frontend está desplegado en Vercel:

https://stars-frontend-navy.vercel.app

El backend se encuentra publicado en Render:

https://stars-backend-5c8u.onrender.com

En Vercel se configuró la variable de entorno:

`NEXT_PUBLIC_API_URL`

La versión de producción se obtiene desde la rama `main` del repositorio.

## Organización con GitFlow

El desarrollo se organizó utilizando:

- `main`: versión principal del proyecto.
- `develop`: integración de funcionalidades.
- `feature/*`: desarrollo de nuevas características y correcciones.

Se utilizaron commits descriptivos y Pull Requests para integrar los cambios.

Entre las funcionalidades desarrolladas mediante ramas se encuentran el carrito de compras, el CRUD administrativo, las pruebas con Vitest, el despliegue y la corrección de CORS.


## Consideraciones

El proyecto fue desarrollado con fines académicos para la Evaluación Final Integradora de Programación III.

Las operaciones administrativas se conectan con el backend y requieren credenciales con permisos apropiados.

No se incluyen contraseñas ni tokens privados en este repositorio.
