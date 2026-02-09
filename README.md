# 📦 Sistema de Inventario para Tienda

Aplicación web completa para gestionar el inventario de una tienda con funcionalidades de añadir, eliminar, modificar y exportar artículos.

## ✨ Características

- ✅ **Añadir artículos** con toda la información necesaria
- 📸 **Subir fotos** de los productos
- 💰 **Gestión de precios** (compra y venta)
- 🔄 **Marcar como vendido/disponible**
- 🗑️ **Eliminar artículos** y editar existentes
- 🔍 **Buscar y filtrar** por referencia, nombre o estado
- 📊 **Estadísticas en tiempo real**
- 💾 **Almacenamiento local** (los datos persisten al cerrar el navegador)
- 📥 **Exportar e Importar** Excel/CSV para backup
- 🏷️ **Extracción automática desde Zara.com** - pega una URL y extrae nombre, precio e imagen
- 📅 **Control de devoluciones** con alertas de vencimiento
- 📱 **Diseño responsive** (funciona en móviles y tablets)

## 🚀 Acceso Online

**Usa la aplicación directamente desde tu navegador:**
👉 https://javipuente.github.io/inventario/

## 🆕 Funcionalidad: Extracción de Datos de Zara

Puedes **pegar una URL de Zara.com** y la aplicación extraerá automáticamente:
- ✅ **Nombre del producto** (desde la URL)
- ✅ **Referencia/código** (desde la URL)
- ℹ️ **Precio e imagen**: Por limitaciones de CORS, debes copiarlos manualmente

**¿Cómo usarlo?**
1. Ve a www.zara.com y encuentra un producto
2. Copia la URL completa (ej: `https://www.zara.com/es/es/chaqueta-bomber-p04344655.html`)
3. Pégala en el campo "URL de Zara" en tu inventario
4. **El nombre y referencia se completarán automáticamente**
5. La aplicación te ofrecerá abrir la página de Zara para que copies el precio e imagen manualmente

**💡 Tip**: Es más rápido que escribir todo manualmente, especialmente las referencias largas de Zara.

⚠️ **Si encuentras problemas CORS**: Consulta [SOLUCION_CORS_ZARA.md](SOLUCION_CORS_ZARA.md) para soluciones

## 🗂️ Cómo usar

### Añadir un artículo
1. **Opción 1 - Desde Zara.com**:
   - Pega la URL de Zara en el campo correspondiente
   - Los datos se extraerán automáticamente
   - Completa el precio de venta y fecha de devolución

2. **Opción 2 - Manual**:
   - Rellena el formulario con los datos del producto
   - Sube una foto (opcional)
   - Haz clic en "Guardar Artículo"

### Gestionar artículos
- **Editar**: Haz clic en "Editar" en la tarjeta del producto
- **Marcar como vendido**: Haz clic en "Vendido"
- **Eliminar**: Haz clic en "Eliminar"

### Buscar y filtrar
- Usa la barra de búsqueda para encontrar productos por referencia, nombre o descripción
- Filtra por estado: Todos / Disponibles / Vendidos
- Ordena por: Más recientes / Más antiguos / Fecha de devolución

### Exportar/Importar datos
- **Exportar**: Haz clic en "📊 Exportar a Excel" para descargar un CSV con todos tus datos
- **Importar**: Haz clic en "📥 Importar Excel" para cargar un archivo CSV previamente exportado

## 💾 Almacenamiento de Datos

- **Local Storage**: Los datos se guardan automáticamente en el navegador
- **Backup en CSV**: Exporta regularmente como respaldo
- **Las fotos** se guardan en Base64 (comprimidas automáticamente)
- **Sincronización entre dispositivos**: Actualmente no disponible (solo local)

## ⚠️ Importante

- Los datos se guardan solo en tu navegador local
- Si borras los datos del navegador, perderás el inventario
- **Recomendación**: Exporta a Excel regularmente como backup
- Las imágenes se comprimen automáticamente para ahorrar espacio

## 📋 Campos del Inventario

- **URL de Zara** (opcional): Para autocompletar datos
- **Número de Referencia**: Código único del producto
- **Nombre**: Nombre del artículo
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
- Conexión a internet solo para extraer datos de Zara
- No requiere instalación ni servidor

## 📱 Uso en Móvil

La aplicación es completamente responsive y funciona perfectamente en dispositivos móviles.

## 🔒 Privacidad

Todos tus datos se guardan localmente en tu dispositivo. No se envía información a ningún servidor externo (excepto cuando usas la función de extracción de Zara, que usa proxies públicos).

## 📚 Documentación Adicional

- [Guía de Solución CORS con Zara](SOLUCION_CORS_ZARA.md) - Soluciones si la extracción de Zara no funciona
- [Proxies CORS Alternativos](PROXIES_CORS_ALTERNATIVOS.md) - Lista de proxies disponibles

## 🛠️ Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/javipuente/inventario.git

# Abrir index.html en tu navegador
# No se requiere servidor web
```

---

**¡Listo para usar! Accede a https://javipuente.github.io/inventario/ y comienza a gestionar tu inventario.**