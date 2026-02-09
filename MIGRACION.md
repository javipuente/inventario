# ?? Guía de Migración - Actualización a Sistema de Cantidad

## ?? Cambios Importantes

La aplicación ha sido actualizada con los siguientes cambios:

### ? **Nuevas Funcionalidades**
- ? **Campo Cantidad**: Ahora puedes gestionar múltiples unidades del mismo artículo
- ?? Control de stock por nombre de producto

### ? **Funcionalidades Eliminadas**
- ?? Campo "URL de Zara" - removido por problemas de bloqueo CORS
- ?? Campo "Número de Referencia" - simplificado para facilitar el uso

---

## ?? Migración Automática

**La aplicación migrará tus datos automáticamente** cuando la abras por primera vez después de esta actualización:

1. Los artículos existentes se mantendrán intactos
2. Se añadirá automáticamente `cantidad: 1` a todos los artículos sin este campo
3. El campo "Referencia" será ignorado (pero no se borrará de tu localStorage)

### ?? Importante
- **No necesitas hacer nada** - la migración es automática
- Tus datos y fotos se conservarán
- Si exportaste un CSV antes de la actualización, podrás importarlo (se ignorará la columna de referencia)

---

## ?? ¿Qué Hacer Si Tienes Datos Exportados Antiguos?

Si tienes archivos CSV exportados con el formato antiguo (con "Referencia"):

### Opción 1: Importar Directamente
- La nueva versión **ignorará** la columna de referencia
- Importará: Nombre, Cantidad (si existe, sino 1), Descripción, Precios, etc.

### Opción 2: Actualizar Manualmente el CSV

Si quieres usar el nuevo formato:

**Formato Antiguo:**
```csv
Referencia,Nombre,Descripcion,Precio Compra,Precio Venta,...
1234/567/8,Chaqueta,Descripción,45.00,55.00,...
```

**Formato Nuevo:**
```csv
Nombre,Cantidad,Descripcion,Precio Compra,Precio Venta,...
Chaqueta,1,Descripción,45.00,55.00,...
```

**Pasos:**
1. Abre el CSV en Excel o Google Sheets
2. **Elimina** la columna "Referencia"
3. **Añade** una columna "Cantidad" después de "Nombre" con valor `1`
4. Guarda el archivo
5. Importa en la nueva versión

---

## ?? Cómo Usar el Nuevo Sistema de Cantidad

### Añadir Artículos con Cantidad

Cuando añades un artículo nuevo:
1. **Nombre**: "Camiseta Básica Blanca"
2. **Cantidad**: `5` (si tienes 5 unidades)
3. Completa el resto de campos normalmente

### Ventajas del Nuevo Sistema

? **Simplicidad**: Menos campos para rellenar  
? **Stock Real**: Sabes cuántas unidades tienes de cada artículo  
? **Búsqueda Fácil**: Busca solo por nombre o descripción  
? **Gestión Clara**: Agrupa productos iguales en una sola entrada  

---

## ?? Ejemplo Comparativo

### Antes (con Referencia):
| Referencia | Nombre | Precio |
|------------|--------|--------|
| 1234/567/8 | Camisa Azul | 35€ |
| 1234/567/9 | Camisa Azul | 35€ |
| 1234/567/0 | Camisa Azul | 35€ |

**Problema**: 3 entradas duplicadas

### Ahora (con Cantidad):
| Nombre | Cantidad | Precio |
|--------|----------|--------|
| Camisa Azul | 3 | 35€ |

**Solución**: 1 entrada clara con el stock real

---

## ??? Solución de Problemas

### "No veo mis artículos antiguos"
- Limpia el caché del navegador (`Ctrl + Shift + R`)
- Verifica que estés en https://javipuente.github.io/inventario/
- Abre la consola (`F12`) y busca errores

### "La importación de mi CSV antiguo falla"
- Verifica que el archivo esté en formato UTF-8
- Asegúrate de que no falten campos obligatorios (Nombre, Precio Compra, Precio Venta)
- Si el error persiste, contacta al soporte

### "Quiero recuperar mis referencias"
- Las referencias no se eliminan del localStorage
- Puedes exportar a CSV y verás que se exportan como parte de la descripción si estaban ahí
- Si necesitas las referencias, añádelas en el campo "Descripción"

---

## ?? Buenas Prácticas

### Organiza tu Inventario
1. Usa **nombres descriptivos** y consistentes
2. La **cantidad** debe reflejar el stock real
3. Actualiza la cantidad cuando vendas unidades
4. **Exporta regularmente** para tener backup

### Ejemplo de Nomenclatura:
? Mal: "Camisa", "Camiseta", "Camisa azul"  
? Bien: "Camisa Formal Azul Talla M"

---

## ?? Resumen

- ? Migración automática de datos
- ? Nuevo campo "Cantidad" para gestión de stock
- ? Eliminación de campos innecesarios (URL Zara, Referencia)
- ? Simplificación del proceso de añadir productos
- ? Compatibilidad con CSV antiguos (se ignorará "Referencia")

**¿Dudas?** Consulta el README.md o la documentación completa.

---

**¡Disfruta de la nueva versión simplificada! ??**
