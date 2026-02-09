# ?? Guía de Sincronización Multi-Dispositivo (SÚPER FÁCIL)

## ?? **Solución Simple con Archivos**

Tu inventario ahora se sincroniza entre dispositivos usando **archivos JSON**. ¡La forma más simple y confiable!

### ? **Ventajas:**
- ?? **100% Gratis** - No depende de ningún servicio externo
- ?? **1 Solo Clic** - Exportar e importar archivos
- ?? **100% Seguro** - Tú controlas dónde guardas tus datos
- ?? **Multi-dispositivo** - PC, tablet, móvil
- ?? **Sin límites** - Guarda tantos backups como quieras
- ? **Funciona siempre** - No hay APIs que puedan fallar
- ?? **Flexible** - Guarda en USB, email, Google Drive, Dropbox, etc.

---

## ?? **Cómo Usar**

### **?? Primera Vez - PC Principal:**

1. **Abre el inventario:**
   ```
   https://javipuente.github.io/inventario/
   ```

2. **Añade tus artículos** como siempre

3. **Haz clic en "?? Exportar"** (arriba a la derecha)

4. **Se descargará un archivo:**
   ```
   inventario_20240115_1430.json
   ```

5. **Guarda el archivo en un lugar seguro:**
   - USB
   - Email a ti mismo
   - Google Drive / Dropbox
   - OneDrive
   - Carpeta sincronizada

? **¡Listo!** Tienes un backup de tus datos.

---

### **?? En Otro Dispositivo:**

1. **Copia el archivo JSON** a tu nuevo dispositivo (email, USB, nube, etc.)

2. **Abre el inventario:**
   ```
   https://javipuente.github.io/inventario/
   ```

3. **Haz clic en "?? Importar"**

4. **Selecciona el archivo** `inventario_20240115_1430.json`

5. **Confirma** cuando te pregunte

? **¡Listo!** Tienes los mismos datos que en tu PC principal.

---

## ?? **Flujo de Trabajo Diario**

### **Escenario 1: Trabajas en un solo dispositivo**

```
1. Abres el inventario
2. Añades/editas artículos
3. Al terminar: ?? Exportar
4. Guardas el archivo en tu lugar favorito
```

### **Escenario 2: Cambias de dispositivo**

**En el Dispositivo 1:**
```
1. Trabajas normalmente
2. Al terminar: ?? Exportar
3. Envías el archivo por email/WhatsApp/Drive
```

**En el Dispositivo 2:**
```
1. Descargas el archivo
2. ?? Importar
3. Seleccionas el archivo
4. Trabajas normalmente
5. Al terminar: ?? Exportar y envías de vuelta
```

---

## ?? **Métodos de Transferencia**

### **1. Email (Más Fácil)**

```
1. ?? Exportar
2. Adjuntar archivo al email
3. Enviar a ti mismo
4. Abrir email en otro dispositivo
5. Descargar archivo
6. ?? Importar
```

### **2. Google Drive / Dropbox**

```
1. ?? Exportar
2. Subir a Google Drive
3. En otro dispositivo, descargar de Drive
4. ?? Importar
```

### **3. WhatsApp (Muy Rápido)**

```
1. ?? Exportar
2. Enviar archivo a un chat contigo mismo
3. Abrir WhatsApp en otro dispositivo
4. Descargar archivo
5. ?? Importar
```

### **4. USB**

```
1. ?? Exportar
2. Copiar a USB
3. Conectar USB en otro PC
4. Copiar archivo
5. ?? Importar
```

---

## ?? **Formato del Archivo**

El archivo exportado se llama:
```
inventario_AAAAMMDD_HHMM.json
```

**Ejemplo:**
```
inventario_20240115_1430.json
```

Significa: Exportado el 15 de enero de 2024 a las 14:30

**Contenido:**
```json
{
  "items": [
    {
      "id": 1234567890,
      "nombre": "Camiseta Básica",
      "talla": "M",
      "cantidad": 5,
      "precioCompra": 10,
      "precioVenta": 15,
      "foto": "data:image/jpeg;base64,...",
      "vendido": false
    }
  ],
  "lastSync": "2024-01-15T14:30:00.000Z",
  "version": "1.0"
}
```

---

## ?? **Ejemplo Completo**

### **Lunes - En la Oficina (PC)**

```
1. Abrir inventario
2. Añadir 10 artículos
3. ?? Exportar ? inventario_20240115_1000.json
4. Enviar por email a mí mismo
```

### **Martes - En Casa (Tablet)**

```
1. Abrir email en tablet
2. Descargar inventario_20240115_1000.json
3. Abrir inventario
4. ?? Importar ? seleccionar archivo
5. Ver los 10 artículos
6. Marcar 3 como vendidos
7. ?? Exportar ? inventario_20240116_1900.json
8. Enviar por email
```

### **Miércoles - En la Tienda (Móvil)**

```
1. Descargar inventario_20240116_1900.json del email
2. ?? Importar
3. Ver inventario actualizado
4. Añadir 2 artículos
5. ?? Exportar
```

---

## ?? **Importante - Evitar Conflictos**

### **Regla de Oro:**
> **SIEMPRE importa el archivo más reciente antes de trabajar**

### **? Problema Común:**
```
PC 1: Añade 5 artículos (lunes) ? No exporta
PC 2: Importa archivo del domingo ? Añade 3 artículos ? Exporta
PC 1: Importa archivo de PC2 (pierde los 5 artículos del lunes) ?
```

### **? Solución:**
```
PC 1: Añade 5 artículos ? ?? Exportar ? Enviar
PC 2: ?? Importar archivo más reciente ? Añadir 3 ? ?? Exportar
```

---

## ?? **Sistema de Backups Recomendado**

### **Opción 1: Email Diario**

```
- Cada día al terminar: ?? Exportar
- Enviar email a ti mismo
- Gmail/Outlook guardan el archivo
- Historial completo en email
```

### **Opción 2: Carpeta Google Drive**

```
- Crear carpeta "Inventario Backups"
- Cada día: ?? Exportar
- Subir a Google Drive
- Drive guarda versiones antiguas
```

### **Opción 3: USB Semanal**

```
- Una vez por semana: ?? Exportar
- Copiar a USB
- Guardar USB en lugar seguro
```

---

## ??? **Solución de Problemas**

### **"No encuentro mi archivo"**

**Solución:**
1. Los archivos se descargan a la carpeta "Descargas"
2. Busca archivos que empiecen con `inventario_`
3. Ordena por fecha para encontrar el más reciente

---

### **"Error: Archivo inválido"**

**Causas:**
- Archivo corrupto
- No es un JSON válido
- Archivo editado manualmente

**Solución:**
1. Usa un archivo exportado directamente (sin editar)
2. Si es muy antiguo, puede tener formato diferente
3. Exporta uno nuevo del dispositivo que funciona

---

### **"Tengo datos diferentes en dos dispositivos"**

**Solución:**

1. **Decide qué datos conservar**

2. **En el dispositivo a conservar:**
   ```
   ?? Exportar ? Guardar archivo
   ```

3. **En el otro dispositivo:**
   ```
   ?? Importar ? Seleccionar archivo guardado
   ```

---

## ?? **Comparación de Métodos de Sincronización**

| Método | Ventajas | Desventajas |
|--------|----------|-------------|
| **Archivos JSON (Actual)** | ? Simple<br>? 100% confiable<br>? Tú controlas todo<br>? Sin límites | Manual (2 clics) |
| APIs externas | Automático | ? Pueden fallar<br>? CORS issues<br>? Depende de terceros |
| Firebase/Backend | Sincronización real-time | ? Requiere configuración<br>? Complejidad |

---

## ?? **Privacidad y Seguridad**

- ? Tus datos están en **TU** dispositivo
- ? **TÚ** decides dónde guardar los backups
- ? Sin servicios externos que puedan acceder a tus datos
- ? Sin APIs que puedan filtrar información
- ? Control total sobre tus archivos

---

## ?? **Resumen Ultra Simple**

```
EXPORTAR:
?? Exportar ? Guardar archivo ? Enviar/Subir a donde quieras

IMPORTAR:
?? Importar ? Seleccionar archivo ? Listo

BACKUP:
?? Exportar ? Email a ti mismo (una vez al día)
```

---

## ? **Preguntas Frecuentes**

### **¿Cuántos archivos puedo tener?**
Todos los que quieras. Cada exportación crea un nuevo archivo.

### **¿Los archivos ocupan mucho espacio?**
No. Un inventario con 100 artículos + fotos ? 2-5 MB

### **¿Funciona sin internet?**
La app sí. Pero necesitas internet para enviar archivos por email/WhatsApp.

### **¿Puedo editar el archivo JSON?**
Técnicamente sí, pero NO recomendado. Mejor usa la app.

### **¿Qué pasa si pierdo todos los archivos?**
Si tienes backups en email/Drive, puedes recuperarlos. Por eso es importante hacer backups regulares.

---

**¡Ahora sincronizar es TAN SIMPLE como enviar un archivo! ????**
