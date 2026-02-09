# 📦 Sistema de Inventario para Tienda

Aplicación web completa para gestionar el inventario de una tienda con funcionalidades de añadir, eliminar, modificar y exportar artículos.

## ✨ Características

- ✅ **Añadir artículos** con toda la información necesaria
- 📸 **Subir fotos** de los productos
- 💰 **Gestión de precios** (compra y venta)
- 🔄 **Marcar como vendido/disponible**
- 🗑️ **Eliminar artículos**
- 🔍 **Buscar y filtrar** por referencia, nombre o estado
- 📊 **Estadísticas en tiempo real**
- 💾 **Almacenamiento local** (los datos persisten al cerrar el navegador)
- 📥 **Exportar a Excel/CSV** para backup
- 📱 **Diseño responsive** (funciona en móviles y tablets)

## 🚀 Cómo usar

1. **Abrir la aplicación**: Simplemente abre el archivo `index.html` en tu navegador web favorito (Chrome, Firefox, Edge, etc.)

2. **Añadir un artículo**:
   - Rellena el formulario con los datos del producto
   - Sube una foto (opcional)
   - Haz clic en "Guardar Artículo"

3. **Gestionar artículos**:
   - **Marcar como vendido**: Haz clic en el botón "✅ Vendido"
   - **Eliminar**: Haz clic en el botón "🗑️ Eliminar"
   - **Ver foto ampliada**: Haz clic en la imagen del producto

4. **Buscar y filtrar**:
   - Usa la barra de búsqueda para encontrar productos por referencia o nombre
   - Usa el selector de estado para ver solo disponibles o vendidos

5. **Exportar datos**:
   - Haz clic en "📊 Exportar a Excel"
   - Se descargará un archivo CSV que puedes abrir con Excel o Google Sheets

## 💾 Almacenamiento de Datos

- **Local Storage**: Los datos se guardan automáticamente en el navegador
- **Backup en Excel**: Puedes exportar los datos regularmente como archivo CSV
- **Las fotos** se guardan en Base64 dentro del navegador

## ⚠️ Importante

- Los datos se guardan en tu navegador local
- Si borras los datos del navegador, perderás el inventario
- **Recomendación**: Exporta a Excel regularmente como backup
- Las fotos grandes pueden ocupar mucho espacio en el navegador

## 📋 Campos del Inventario

- **Número de Referencia**: Código único del producto
- **Nombre**: Nombre del artículo
- **Descripción**: Detalles adicionales del producto
- **Precio de Compra**: Lo que te costó al distribuidor
- **Precio de Venta**: Precio al que lo vendes en tienda
- **Foto**: Imagen del producto
- **Estado**: Vendido o Disponible

## 🎨 Personalización

Puedes personalizar los colores y estilos editando el archivo `styles.css`.

## 🌐 Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- No requiere conexión a internet
- No requiere instalación ni servidor

## 📱 Uso en Móvil

La aplicación es completamente responsive y funciona perfectamente en dispositivos móviles.

## 🔒 Privacidad

Todos tus datos se guardan localmente en tu dispositivo. No se envía información a ningún servidor externo.

---

**¡Listo para usar! Simplemente abre index.html y comienza a gestionar tu inventario.**