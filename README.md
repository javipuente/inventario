# 📦 Sistema de Inventario para Tienda

Aplicación web completa para gestionar el inventario de una tienda con funcionalidades de añadir, eliminar, modificar y exportar artículos.

## ✨ Características

- ✅ **Añadir artículos** con toda la información necesaria
- 📊 **Control de cantidad** - gestiona múltiples unidades del mismo artículo
- 📏 **Gestión de tallas** - XS, S, M, L, XL
- 📸 **Subir fotos** de los productos
- 💰 **Gestión de precios** (compra y venta)
- 🔄 **Marcar como vendido/disponible**
- ✏️ **Editar artículos** existentes
- 🗑️ **Eliminar artículos**
- 🔍 **Buscar y filtrar** por nombre o descripción
- 📊 **Estadísticas en tiempo real**
- 💾 **Almacenamiento local** (los datos persisten al cerrar el navegador)
- ☁️ **Sincronización multi-dispositivo** - Usa GitHub como base de datos (GRATIS)
- 📥 **Exportar e Importar** Excel/CSV para backup
- 📅 **Control de devoluciones** con alertas de vencimiento
- 📱 **Diseño responsive** (funciona en móviles y tablets)

## 🚀 Acceso Online

**Usa la aplicación directamente desde tu navegador:**
👉 https://javipuente.github.io/inventario/

## 🔄 Sincronización Multi-Dispositivo (GRATIS)

¡Ahora puedes usar tu inventario en **múltiples dispositivos**!

**Cómo funciona:**
1. Haz clic en **☁️ Subir** para guardar tus datos en GitHub
2. En otro dispositivo, haz clic en **☁️ Descargar** para traer los datos
3. ¡Listo! Tus datos están sincronizados

**100% Gratis** - Usa tu repositorio de GitHub como base de datos.

📖 **Guía completa**: [GUIA_SINCRONIZACION.md](GUIA_SINCRONIZACION.md)

## 🗂️ Cómo usar

### Añadir un artículo
1. Rellena el formulario con los datos del producto
2. **Nombre**: Identifica el tipo de producto
3. **Cantidad**: Número de unidades que tienes en stock
4. **Precios**: Compra y venta
5. **Fecha de devolución** (opcional): Para productos con plazo límite
6. **Foto** (opcional): Imagen del producto
7. Haz clic en "Guardar Artículo"

### Gestionar artículos
- **Editar**: Haz clic en "Editar" en la tarjeta del producto (puedes actualizar la cantidad)
- **Marcar como vendido**: Haz clic en "Vendido"
- **Eliminar**: Haz clic en "Eliminar"

### Buscar y filtrar
- Usa la barra de búsqueda para encontrar productos por nombre o descripción
- Filtra por estado: Todos / Disponibles / Vendidos
- Ordena por: Más recientes / Más antiguos / Fecha de devolución

### Exportar/Importar datos
- **Exportar**: Haz clic en "📊 Exportar a Excel" para descargar un CSV con todos tus datos
- **Importar**: Haz clic en "📥 Importar Excel" para cargar un archivo CSV previamente exportado

## 💾 Almacenamiento de Datos

- **Local Storage**: Los datos se guardan automáticamente en el navegador
- **GitHub Sync**: Sincroniza entre dispositivos usando tu repositorio (gratis)
- **Backup en CSV**: Exporta regularmente como respaldo
- **Las fotos** se guardan en Base64 (comprimidas automáticamente)

## ⚠️ Importante

- Los datos se guardan solo en tu navegador local
- Si borras los datos del navegador, perderás el inventario
- **Recomendación**: Exporta a Excel regularmente como backup
- Las imágenes se comprimen automáticamente para ahorrar espacio

## 📋 Campos del Inventario

- **Nombre**: Identifica el tipo de artículo
- **Talla**: Talla del producto (XS, S, M, L, XL)
- **Cantidad**: Número de unidades en stock
- **Descripción**: Detalles adicionales
- **Precio de Compra**: Coste del producto
- **Precio de Venta**: Precio final de venta
- **Fecha de Devolución**: Límite para devolver el producto
- **Foto**: Imagen del producto (comprimida automáticamente)
- **Estado**: Vendido o Disponible

## 🎨 Personalización

Puedes personalizar los colores y estilos editando el archivo `styles.css`.

## 🌐 Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- No requiere instalación ni servidor
- Funciona sin conexión a internet

## 📱 Uso en Móvil

La aplicación es completamente responsive y funciona perfectamente en dispositivos móviles.

## 🔒 Privacidad

Todos tus datos se guardan localmente en tu dispositivo. No se envía información a ningún servidor externo.

## 🛠️ Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/javipuente/inventario.git

# Abrir index.html en tu navegador
# No se requiere servidor web
```

---

**¡Listo para usar! Accede a https://javipuente.github.io/inventario/ y comienza a gestionar tu inventario.**