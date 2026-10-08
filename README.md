# El Amigo - eCommerce de Videojuegos y Accesorios

## Descripción del proyecto

**El Amigo** es un proyecto de comercio electrónico orientado a la venta y visualización de videojuegos y accesorios para distintas plataformas.

El proyecto forma parte de **Desarrollo Frontend I (PFY2201)** y corresponde a la evolución del eCommerce desarrollado durante las semanas anteriores. En esta Semana 9, correspondiente a la **Evaluación Final Transversal (EFT)**, se consolidó la integración de **React**, incorporando componentes funcionales, `useState`, `useEffect`, carga dinámica desde archivos JSON, renderizado condicional e interacción con el carrito.

---

## Objetivos de la Semana 9 — Evaluación Final Transversal

La implementación considera los principales requerimientos de la actividad de la **Evaluación Final Transversal de Desarrollo Frontend I**:

- Administrar mediante `useState` la información del catálogo.
- Administrar mediante `useState` los productos seleccionados en el carrito.
- Incorporar elementos interactivos controlados mediante estado.
- Utilizar `useEffect` para cargar dinámicamente productos desde archivos JSON.
- Utilizar `useEffect` para mantener el carrito en `localStorage`.
- Implementar renderizado condicional según el estado de la aplicación.
- Mostrar diferentes estados para productos agregados al carrito.
- Mostrar un estado específico cuando el carrito está vacío.
- Organizar el código mediante componentes React reutilizables.
- Evitar duplicación innecesaria de código.
- Mantener una estructura clara de carpetas.
- Mantener el proyecto publicado mediante GitHub y GitHub Pages.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- React
- Vite
- Bootstrap 5
- JSON
- Git
- GitHub
- GitHub Pages / `gh-pages`
- `localStorage`

---

# Funcionalidades principales

## Catálogo de productos

Los productos se cargan dinámicamente desde archivos JSON. Cada producto puede contener identificador, nombre, imagen, descripción, precio, precio anterior, precio de oferta, descuento, plataforma, categoría y stock.

Fuentes de datos:

```text
public/data/productos.json
public/data/juegos.json
public/data/accesorios.json
```

## Videojuegos

- Visualización de juegos.
- Búsqueda por nombre.
- Filtro por plataforma.
- Agregar productos al carrito.
- Identificación visual de productos ya agregados.

## Accesorios

El catálogo permite filtrar por:

- Mouse.
- Teclados.
- Audífonos.

Las categorías de la página principal generan enlaces como:

```text
accesorios.html?categoria=teclados
accesorios.html?categoria=audifonos
accesorios.html?categoria=mouse
```

La página de accesorios utiliza el parámetro recibido para inicializar el filtro correspondiente.

## Carrito

- Agregar productos.
- Eliminar productos.
- Limpiar carrito.
- Contador de productos.
- Cálculo automático del total.
- Minimizar y restaurar el carrito.
- Mostrar carrito vacío.
- Persistir productos mediante `localStorage`.

---

# Integración de React

En esta versión se amplió el uso de React. Además del catálogo y carrito, se incorporaron nuevas secciones como componentes funcionales:

- Barra de navegación.
- Categorías.
- Recomendaciones.
- Catálogo de productos.
- Filtros.
- Carrito.
- Productos individuales.
- Productos dentro del carrito.

Esto permite administrar diferentes partes del sitio mediante componentes reutilizables sin perder el diseño desarrollado anteriormente.

---

# Componentes React

```text
src/
├── components/
│   ├── Carrito.jsx
│   ├── Categorias.jsx
│   ├── Filtros.jsx
│   ├── ListaProductos.jsx
│   ├── Navbar.jsx
│   ├── Producto.jsx
│   ├── ProductoCarrito.jsx
│   └── Recomendaciones.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## `App.jsx`

Es el componente principal. Administra productos, carrito, búsqueda, plataforma y categoría. También contiene la carga de catálogos, filtrado, operaciones del carrito y limpieza de filtros.

## `Navbar.jsx`

La navegación principal fue convertida en un componente React. Mantiene los enlaces a Inicio, Accesorios, Games y Contacto, y detecta la página actual para aplicar el estado visual `active`.

## `Categorias.jsx`

Las categorías se administran mediante un arreglo de objetos y `.map()`, evitando repetir manualmente el HTML. También utiliza `useState` para identificar la categoría seleccionada.

## `Recomendaciones.jsx`

Incluye un botón interactivo que selecciona una recomendación desde un arreglo y actualiza el mensaje utilizando `useState`.

## `Filtros.jsx`

Administra los controles de búsqueda, plataforma y categoría, recibiendo estados y funciones mediante props.

## `ListaProductos.jsx`

Recorre los productos mediante `.map()` y genera un componente `Producto` por cada elemento.

## `Producto.jsx`

Muestra información del producto y utiliza renderizado condicional para cambiar el botón entre:

```text
Agregar al carrito
 En el carrito
```

Cuando el producto ya está en el carrito, el botón queda deshabilitado.

## `Carrito.jsx`

Administra el carrito, cálculo del total, eliminación, limpieza, minimización y estado de carrito vacío.

## `ProductoCarrito.jsx`

Representa individualmente los productos que están dentro del carrito y permite ejecutar su eliminación.

---

# Manejo de estados con `useState`

La aplicación utiliza `useState` para administrar diferentes estados relevantes.

### Catálogo

```jsx
const [productos, setProductos] = useState([])
```

Almacena los productos cargados desde JSON.

### Carrito

```jsx
const [carrito, setCarrito] = useState(...)
```

Contiene los productos seleccionados y permite agregarlos, eliminarlos, limpiarlos y calcular el total.

### Búsqueda

```jsx
const [busqueda, setBusqueda] = useState('')
```

Controla el texto utilizado para buscar videojuegos.

### Plataforma

```jsx
const [plataforma, setPlataforma] = useState('')
```

Controla el filtro de plataforma.

### Categoría

```jsx
const [categoria, setCategoria] = useState(...)
```

Controla el filtro de accesorios y puede inicializarse mediante el parámetro `categoria` de la URL.

### Recomendación

`Recomendaciones.jsx` utiliza estado para cambiar el texto mostrado después de presionar el botón.

### Carrito minimizado

`Carrito.jsx` utiliza estado para alternar entre la vista completa y minimizada.

---

# Manejo de efectos con `useEffect`

## Carga dinámica de productos

`App.jsx` utiliza `useEffect` para seleccionar y cargar mediante `fetch()` el archivo JSON correspondiente al catálogo:

```text
productos → productos.json
juegos → juegos.json
accesorios → accesorios.json
```

Los datos obtenidos actualizan el estado mediante `setProductos(datos)`.

## Persistencia del carrito

Otro `useEffect` guarda el carrito cada vez que cambia:

```jsx
localStorage.setItem(
    'elamigo-carrito',
    JSON.stringify(carrito)
)
```

Al iniciar la aplicación se recuperan los datos previamente almacenados, permitiendo conservar el carrito después de una recarga.

---

# Renderizado condicional

El proyecto utiliza renderizado condicional en diferentes situaciones.

## Producto agregado

El botón cambia de:

```text
 Agregar al carrito
```

a:

```text
 En el carrito
```

También se deshabilita cuando el producto ya fue agregado.

## Carrito vacío

Cuando no existen productos se muestra un estado específico con el mensaje:

```text
Tu carrito está vacío.
```

El usuario puede abrirlo y minimizarlo nuevamente.

## Sin resultados

Cuando los filtros no encuentran productos, se muestra un mensaje indicando que no existen coincidencias.

## Datos opcionales

El precio anterior y descuento solamente se renderizan cuando existen en el producto.

---

# Flujo de datos

```text
Archivo JSON
     │
     ▼
  useEffect
     │
     ▼
 setProductos()
     │
     ▼
   App.jsx
     │
     ├──────────────► Filtros
     │
     ▼
ListaProductos
     │
     ▼
  Producto
     │
     ▼
Agregar al carrito
     │
     ▼
 setCarrito()
     │
     ▼
  Carrito
     │
     ▼
 localStorage
```

Los estados principales se mantienen en `App.jsx` y se entregan a los componentes mediante props, evitando duplicar la lógica.

---

# Integración de páginas HTML con React

El proyecto conserva las páginas HTML existentes e incorpora puntos de montaje para React.

Ejemplos:

```html
<div id="navbar-root"></div>
<div id="categorias-root"></div>
<div id="recomendaciones-root"></div>
<div id="react-root"></div>
```

`src/main.jsx` identifica estos elementos y monta los componentes correspondientes.

El catálogo puede determinarse mediante un atributo HTML:

```html
<div id="react-root" data-catalogo="productos"></div>
```

Esto permite reutilizar `App` para diferentes catálogos.

---

# Estructura general

```text
ElAmigo/
│
├── public/
│   └── data/
│       ├── productos.json
│       ├── juegos.json
│       └── accesorios.json
│
├── src/
│   ├── components/
│   │   ├── Carrito.jsx
│   │   ├── Categorias.jsx
│   │   ├── Filtros.jsx
│   │   ├── ListaProductos.jsx
│   │   ├── Navbar.jsx
│   │   ├── Producto.jsx
│   │   ├── ProductoCarrito.jsx
│   │   └── Recomendaciones.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── css/
├── js/
├── assets/
├── index.html
├── games.html
├── accesorios.html
├── producto.html
├── contacto.html
├── package.json
├── vite.config.js
└── README.md
```

---

# Diseño e interfaz

Se conserva la identidad visual desarrollada durante las semanas anteriores:

- Tema oscuro.
- Estética gamer.
- Colores de acento neón.
- Bootstrap 5.
- Diseño adaptable.
- Tarjetas de productos.
- Carrito flotante.
- Navegación compartida.
- Elementos interactivos.

La incorporación de React mejora la funcionalidad sin reemplazar innecesariamente el diseño existente.

---

# Buenas prácticas

Se aplicaron las siguientes prácticas:

- Componentización de funcionalidades.
- Separación de responsabilidades.
- Uso de `.map()` para elementos repetitivos.
- Estados principales centralizados en `App.jsx`.
- Comunicación entre componentes mediante props.
- Funciones reutilizables para operaciones del carrito.
- Renderizado condicional según el estado.
- Manejo de errores al cargar JSON.
- Estructura clara de carpetas.
- Evitar duplicación de código.

---

# Instalación y ejecución

## Requisitos

- Node.js
- npm

## Instalar dependencias

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Vite mostrará en consola la dirección del servidor local.

## Generar producción

```bash
npm run build
```

El resultado se genera en `dist/`.

---

# GitHub y GitHub Pages

El proyecto final se encuentra versionado y publicado mediante GitHub.

### Repositorio

**GitHub:**  
https://github.com/Egor-ll/Exp3_S9_ETF_Frontend_I/

### Sitio publicado

**GitHub Pages:**  
https://egor-ll.github.io/Exp3_S9_ETF_Frontend_I/

### Configuración de Vite

La aplicación utiliza la siguiente ruta base para funcionar correctamente en GitHub Pages:

```text
/Exp3_S9_ETF_Frontend_I/
```

### Proceso de construcción y despliegue

El proyecto utiliza Vite para generar la versión de producción y `gh-pages` para publicarla.

```bash
npm run build
npm run deploy
```

El comando `build` genera la carpeta `dist/` y el comando `deploy` publica su contenido mediante la rama `gh-pages`.

La publicación final fue realizada correctamente y el sitio se encuentra disponible en GitHub Pages.

---

# Pruebas realizadas

## Catálogo

- [x] Productos cargados desde JSON.
- [x] Productos mostrados mediante React.
- [x] Datos actualizados después de la carga.

## Navegación

- [x] Navbar generado mediante React.
- [x] Enlaces principales disponibles.
- [x] Página actual identificada visualmente.

## Categorías

- [x] Categorías generadas mediante `.map()`.
- [x] Enlaces hacia accesorios.
- [x] Filtro inicializado mediante parámetro de URL.

## Recomendaciones

- [x] Botón interactivo.
- [x] Mensaje actualizado mediante `useState`.

## Filtros

- [x] Búsqueda de videojuegos por nombre.
- [x] Filtro de videojuegos por plataforma.
- [x] Filtro de accesorios por categoría.
- [x] Limpieza de filtros.

## Carrito

- [x] Agregar productos.
- [x] Eliminar productos.
- [x] Limpiar carrito.
- [x] Calcular total.
- [x] Minimizar y restaurar.
- [x] Mostrar estado vacío.
- [x] Persistir mediante `localStorage`.

## Formulario de contacto

- [x] Formulario estructurado con Bootstrap 5.
- [x] Validación de campos.
- [x] Mensajes de validación al usuario.

## Responsividad

- [x] Diseño adaptable a diferentes tamaños de pantalla.
- [x] Pruebas de visualización en escritorio y ventanas reducidas.
- [x] Uso combinado de CSS, Flexbox, Grid y Bootstrap 5.

## Publicación

- [x] Repositorio GitHub actualizado.
- [x] Build de producción generado correctamente.
- [x] Publicación mediante `gh-pages` realizada correctamente.
- [x] GitHub Pages operativo.

## Renderizado condicional

- [x] Cambio de botón “Agregar al carrito” / “En el carrito”.
- [x] Deshabilitación del botón cuando corresponde.
- [x] Mensaje de carrito vacío.
- [x] Mensaje cuando no existen resultados.
- [x] Renderizado de precios y descuentos opcionales.

---

# Evidencias y capturas de pantalla

Para la entrega se deben incluir capturas que demuestren los principales requerimientos de la actividad.

### 1. Datos cargados dinámicamente

Captura del catálogo mostrando productos obtenidos desde JSON mediante `useEffect`.

### 2. Carrito funcionando

Captura con productos agregados, cantidad y total. También puede incluirse una captura después de eliminar un producto.

### 3. Renderizado condicional

Captura mostrando el cambio de:

```text
 Agregar al carrito
```

a:

```text
 En el carrito
```

### 4. Carrito vacío

Captura mostrando el mensaje `Tu carrito está vacío.`.

### 5. Categorías React

Captura de la página principal mostrando las categorías generadas mediante `Categorias.jsx`.

### 6. Recomendaciones React

Captura mostrando el resultado de `MOSTRAR RECOMENDACIÓN`.

### 7. Filtros

Capturas de los filtros de videojuegos y accesorios funcionando.

### 8. Navegación React

Captura mostrando el Navbar y el enlace activo correspondiente.

---

# Relación con los requisitos de la actividad

| Requisito | Implementación |
|---|---|
| `useState` para catálogo | `productos` en `App.jsx` |
| `useState` para carrito | `carrito` en `App.jsx` |
| `useState` interactivo | Recomendaciones, filtros y minimización |
| `useEffect` | Carga de JSON y persistencia del carrito |
| Carga de datos externos | Archivos JSON mediante `fetch()` |
| Actualización de estado | `setProductos()` y `setCarrito()` |
| Carrito vacío | Renderizado condicional en `Carrito` |
| Botón dinámico | “Agregar al carrito” / “En el carrito” |
| Organización | Componentes separados en `src/components` |
| Evitar duplicación | `.map()` y componentes reutilizables |
| GitHub | Repositorio público |
| GitHub Pages | Proyecto construido y publicado mediante `gh-pages` |

---

# Arquitectura simplificada

```text
                    main.jsx
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       Navbar      Categorias   Recomendaciones
                                     │
                                     ▼
                                  useState

                       │
                       ▼
                    App.jsx
                       │
          ┌────────────┼─────────────┐
          │            │             │
          ▼            ▼             ▼
       Filtros    ListaProductos   Carrito
                       │             │
                       ▼             ▼
                    Producto   ProductoCarrito

                       │
                       ▼
                  useEffect
                  ┌────┴────┐
                  ▼         ▼
              JSON local  localStorage
```

---

# Resultado final

La versión actual de **El Amigo** mantiene la base del eCommerce desarrollado anteriormente y amplía significativamente la utilización de React.

La aplicación cuenta con:

- Catálogos cargados dinámicamente.
- Componentes React reutilizables.
- Estados administrados mediante `useState`.
- Efectos controlados mediante `useEffect`.
- Carrito interactivo.
- Persistencia mediante `localStorage`.
- Renderizado condicional.
- Filtros funcionales.
- Navegación administrada por React.
- Categorías administradas por React.
- Recomendaciones interactivas.
- Estructura organizada de componentes.
- Publicación funcional mediante GitHub Pages.

El objetivo de esta implementación es demostrar el uso práctico de React dentro de un proyecto eCommerce existente, incorporando estados, efectos, componentes reutilizables e interacción dinámica sin perder la estructura y diseño desarrollados en las etapas anteriores.

---

# Autor

**Egor Llancapichun**

**Asignatura:** Desarrollo Frontend I (PFY2201)  
**Actividad:** Semana 9 - Evaluación Final Transversal (EFT)  
**Proyecto:** El Amigo

---

## Estado del proyecto

**Versión:** Semana 9 - EFT  
**Framework principal:** React  
**Bundler:** Vite  
**Estado:** Proyecto funcional, con pruebas finales realizadas y publicado en GitHub Pages.
