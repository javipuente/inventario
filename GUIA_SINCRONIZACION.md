# ?? Guía de Sincronización Multi-Dispositivo (GRATIS)

## ?? **Solución Implementada**

Tu inventario ahora puede sincronizarse entre **múltiples dispositivos** usando **GitHub como base de datos**. 

### ? **Ventajas:**
- ?? **100% Gratis** - Usa tu repositorio actual
- ?? **Seguro** - Datos en tu cuenta de GitHub
- ?? **En la nube** - Accesible desde cualquier dispositivo
- ?? **Multi-dispositivo** - PC, tablet, móvil
- ?? **Sincronización manual** - Tú controlas cuándo subir/descargar

---

## ?? **Cómo Funciona**

### **Concepto:**
1. Tus datos se guardan en `inventario-data.json` en GitHub
2. Usas el botón **?? Descargar** para traer datos de GitHub
3. Usas el botón **?? Subir** para enviar datos a GitHub
4. Repites en cualquier dispositivo

---

## ?? **Guía de Uso Paso a Paso**

### **?? Primera Configuración (Solo Una Vez)**

#### **En tu Computadora Principal:**

1. **Abre el inventario:**
   ```
   https://javipuente.github.io/inventario/
   ```

2. **Añade tus artículos** como siempre

3. **Haz clic en "?? Subir"** (arriba a la derecha)

4. **Sigue las instrucciones:**
   - Se descargará `inventario-data.json`
   - Te preguntará si quieres abrir GitHub
   - Haz clic en "Aceptar"

5. **En GitHub:**
   - Haz clic en el icono de lápiz (?? Edit)
   - Borra todo el contenido actual
   - Abre el archivo `inventario-data.json` descargado
   - Copia TODO el contenido
   - Pégalo en GitHub
   - Scroll hasta abajo ? "Commit changes"

? **¡Listo!** Tus datos están en la nube.

---

### **?? En Otro Dispositivo (PC, Tablet, Móvil)**

1. **Abre el inventario:**
   ```
   https://javipuente.github.io/inventario/
   ```

2. **Haz clic en "?? Descargar"**

3. **Confirma** cuando te pregunte

? **¡Listo!** Tienes los mismos datos que en tu PC principal.

---

## ?? **Flujo de Trabajo Diario**

### **Escenario 1: Trabajas en un solo dispositivo**

```
1. Abres el inventario
2. Añades/editas artículos
3. Al terminar: ?? Subir
```

### **Escenario 2: Cambias de dispositivo**

**En el Dispositivo 1:**
```
1. Trabajas normalmente
2. Al terminar: ?? Subir
```

**En el Dispositivo 2:**
```
1. Antes de empezar: ?? Descargar
2. Trabajas normalmente
3. Al terminar: ?? Subir
```

---

## ?? **Importante - Evitar Conflictos**

### **Regla de Oro:**
> **SIEMPRE descarga antes de trabajar, SIEMPRE sube al terminar**

### **? Problema Común:**
```
PC 1: Añade 5 artículos ? No sube
PC 2: Añade 3 artículos ? Sube
PC 1: Sube (sobrescribe los 3 de PC2) ? CONFLICTO
```

### **? Solución:**
```
PC 1: ?? Descargar ? Añade 5 artículos ? ?? Subir
PC 2: ?? Descargar ? Añade 3 artículos ? ?? Subir
```

---

## ?? **Verificar Última Sincronización**

La app te avisará si hace más de **24 horas** que no sincronizas:

```
?? Hace más de 24h que no sincronizas. 
   Considera descargar los datos más recientes.
```

---

## ?? **Consejos Pro**

### **1. Sincroniza Frecuentemente**
- Al empezar el día: **?? Descargar**
- Al terminar el día: **?? Subir**
- Cada vez que cambias de dispositivo

### **2. Usa Export como Backup**
Además de sincronizar, exporta a Excel semanalmente:
```
?? Exportar a Excel
```

### **3. Verifica en GitHub**
Puedes ver tu archivo en:
```
https://github.com/javipuente/inventario/blob/main/inventario-data.json
```

---

## ??? **Solución de Problemas**

### **"No se pudo descargar los datos"**

**Causas:**
- No hay conexión a internet
- GitHub está temporalmente no disponible
- El archivo aún no existe (primera vez)

**Solución:**
1. Verifica tu conexión
2. Intenta de nuevo en 1 minuto
3. Si es la primera vez, primero **Sube** datos

---

### **"Formato de datos inválido"**

**Causa:**
El archivo `inventario-data.json` está corrupto

**Solución:**
1. Ve a: https://github.com/javipuente/inventario/commits/main/inventario-data.json
2. Encuentra una versión anterior que funcionaba
3. Haz clic en "View file"
4. Copia el contenido
5. Edita el archivo actual y pégalo

---

### **"Tengo datos diferentes en dos dispositivos"**

**Solución:**

1. **Decide qué datos conservar**
   - ¿Los de PC1 o los de PC2?

2. **En el dispositivo que quieres conservar:**
   ```
   ?? Subir ? Confirmar sobrescritura
   ```

3. **En el otro dispositivo:**
   ```
   ?? Descargar ? Aceptar sobrescritura
   ```

---

## ?? **Comparación con Otras Soluciones**

| Solución | Costo | Límite | Complejidad |
|----------|-------|--------|-------------|
| **GitHub (Actual)** | **Gratis** | **Sin límite** | **Baja** ? |
| Firebase | Gratis | 1GB/día | Media |
| Google Drive API | Gratis | 15GB | Alta |
| Supabase | Gratis | 500MB | Media |
| MongoDB Atlas | Gratis | 512MB | Alta |

---

## ?? **Ejemplo Completo**

### **Lunes - En la Oficina (PC)**
```
1. Abrir: https://javipuente.github.io/inventario/
2. ?? Descargar (traer datos del fin de semana)
3. Añadir 10 artículos nuevos
4. ?? Subir (guardar en la nube)
5. Cerrar
```

### **Martes - En Casa (Tablet)**
```
1. Abrir: https://javipuente.github.io/inventario/
2. ?? Descargar (traer los 10 artículos del lunes)
3. Marcar 3 como vendidos
4. ?? Subir (guardar cambios)
5. Cerrar
```

### **Miércoles - En la Tienda (Móvil)**
```
1. Abrir: https://javipuente.github.io/inventario/
2. ?? Descargar (traer todo actualizado)
3. Ver inventario actualizado
4. Añadir 2 artículos más
5. ?? Subir
```

---

## ?? **Privacidad y Seguridad**

- ? Tus datos están en **TU** cuenta de GitHub
- ? Solo **TÚ** tienes acceso (es un repo privado si quieres)
- ? GitHub tiene respaldo y versionado
- ? Puedes ver el historial de cambios
- ? Puedes restaurar versiones anteriores

---

## ?? **Resumen**

```
?? Descargar = Traer datos de GitHub
?? Subir     = Enviar datos a GitHub

Regla: DESCARGAR ? TRABAJAR ? SUBIR
```

**¡Ahora puedes gestionar tu inventario desde cualquier dispositivo! ??**
