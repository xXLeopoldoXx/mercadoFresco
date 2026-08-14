# 🌿 Mercado Fresco - Plataforma Web Interactiva

Una aplicación web moderna, interactiva y estéticamente atractiva diseñada para un mercado local de productos orgánicos y frescos. Desarrollada con estándares limpios de **HTML5, CSS3 puro y JavaScript vanila (ES6+)**.

---

## 🚀 Características Principales

- **Diseño Estético & Minimalista:** Paleta de colores cálidos y naturales inspirados en la tierra y productos orgánicos.
- **Buscador en Tiempo Real:** Filtrado instantáneo de productos según el texto ingresado.
- **Filtros por Categórica:** Clasificación rápida por frutas, verduras, panadería, lácteos y despensa.
- **Carrito de Compras Interactivo:** 
  - Panel lateral deslizable (*Drawer*).
  - Control dinámico de cantidades (aumentar/disminuir/eliminar).
  - Cálculo automático de subtotal y total.
  - Notificaciones flotantes (*Toast Notifications*) al agregar productos.
- **Totalmente Responsivo:** Adaptado para dispositivos móviles, tablets y monitores de escritorio.

---

## 📁 Estructura del Proyecto

```text
mercado_fresco/
│
├── index.html       # Estructura semántica de la página web
├── styles.css       # Estilos, variables CSS, colores y responsive design
├── script.js        # Lógica del catálogo, filtros y carrito de compras
└── README.md        # Documentación del proyecto
```

---

## 🛠️ Instalación y Uso

1. **Clonar o descargar el repositorio:**
   Descarga esta carpeta o los archivos individuales en un mismo directorio.

2. **Ejecución:**
   No se requiere de servidores ni entornos complejos de Node.js. Simplemente haz doble clic en el archivo `index.html` o ábrelo con cualquier navegador web moderno (Chrome, Firefox, Edge, Safari).

3. **Desarrollo local con Live Server (Opcional):**
   Si utilizas Visual Studio Code, puedes hacer clic derecho sobre `index.html` y seleccionar **Open with Live Server** para ver los cambios en tiempo real.

---

## 🎨 Paleta de Colores Utilizada

| Elemento | Color Hex | Descripción |
| :--- | :--- | :--- |
| **Principal** | `#2D6A4F` | Verde bosque fresco para marcas y encabezados |
| **Secundario** | `#D8F3DC` | Menta suave para botones e indicadores |
| **Fondo** | `#FAFAFA` | Gris ultra claro para mantener contraste límpido |
| **Texto** | `#1F2937` | Antracita oscuro para legibilidad óptima |
| **Acento** | `#E9C46A` | Dorado suave para detalles destacados |

---

## ⚙️ Personalización

- **Agregar más productos:** Abre `script.js` y edita la constante `PRODUCTS` agregando nuevos objetos con sus respectivos ID, nombre, categoría, precio, unidad e ícono emoji.
