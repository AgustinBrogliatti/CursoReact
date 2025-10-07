# App Catalogo de Libros en React - Agustin Brogliatti

La idea de esta app web en react es visualizar libros consumidos en una api externa, ademas se pueden crear revies de forma local, esto se hizo con la finalidad de simular un post a la api y mostrar como se puede crear un nuevo componente de forma dinamica en react. Tambien se aprovecho el uso de el state, props y comunicacion entre componentes. Se hicieron busquedas por query params :id, rutas variables y un search como bonus.

## 📝 Breve descripción del proyecto

- **Libros (Productos)**
  - Grilla de libros.
  - **Detalle dinámico**: `/libros/:workId`.
  - **Reseñas en vista separada (ruta hija)**: `/libros/:workId/resenas`.
  - Las reseñas se **guardan en `localStorage`** (simulan un POST a la api).

- **Autores**
  - Listado con **barra de búsqueda**.
  - El componente `SearchBar` (hijo) envía el término al padre con `onSearch`, y el padre realiza el **fetch** (comunicación hijo → padre).

**APIs usadas (solo GET, Open Library):**
- `https://openlibrary.org/search.json?q=<query>&page=1`
- `https://openlibrary.org/works/{workId}.json`
- Portadas: `https://covers.openlibrary.org/b/id/{coverId}-M.jpg`
- `https://openlibrary.org/search/authors.json?q=<query>&page=1`

---

## ▶️ Instrucciones para correrlo localmente

**Requisitos:** Node.js 18+ y npm.

```bash
# 1) Instalar dependencias
npm install

# 2) Ejecutar en modo desarrollo
npm run dev

## Listado de funcionalidades implementadas

### Routing
- `/` (Home)
- `/libros` (listado de libros)
- `/libros/:workId` (ruta dinámica de detalle)
- `/libros/:workId/resenas` (ruta hija para reseñas)
- `/autores` (listado con búsqueda)

### Libros
- Cards con portada, título, autores y año.
- “Ver detalles” navega al detalle por `workId`.

### Reseñas (crear/gestionar localmente)
- Formulario (nombre + comentario).
- Agregar reseña (crea un ítem con id y fecha).
- Eliminar reseña.
- Persistencia en `localStorage` por libro (`reviews:<workId>`).

### Autores
- Barra de búsqueda (dispara el fetch al presionar “Buscar”).
- Comunicación hijo → padre: `SearchBar` → `onSearch(term)` → el padre ejecuta el GET.

### Estados de red
- `loading`, `error` y “sin resultados” en vistas con fetch.

### Estilos
- Se utilizo CSS y Css flexbox sin frameworks adicionales por su simplicidad.

### Bonus
- Ruta hija dedicada para reseñas (`/libros/:workId/resenas`)
- Simulación de POST con estado + `localStorage`.
- Componente `SearchBar` con comunicación hijo → padre.
- Código organizado en `components/`, `pages/`, `services/` y `styles/`.
