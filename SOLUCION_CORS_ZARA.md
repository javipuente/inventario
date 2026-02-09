# ?? Solución al Problema CORS con Zara.com

## ? Implementado: Sistema de Fallback Automático

He implementado un sistema que **intenta automáticamente con 4 proxies diferentes** hasta encontrar uno que funcione:

### Proxies que se intentan en orden:

1. **CORS.SH** - Proxy premium con API key
2. **AllOrigins** - Proxy popular y gratuito
3. **ThingProxy** - Alternativa ligera
4. **CodeTabs** - Proxy de respaldo

Si un proxy falla, **automáticamente pasa al siguiente** sin que tengas que hacer nada.

---

## ?? Cómo Usar la Extracción de Datos de Zara

### Paso 1: Encuentra un producto en Zara
Ve a https://www.zara.com/es/ y busca un producto

### Paso 2: Copia la URL completa
Ejemplo:
```
https://www.zara.com/es/es/chaqueta-bomber-efecto-ante-p04344655.html?v1=505335539
```

### Paso 3: Pégala en tu inventario
1. Abre tu inventario en https://javipuente.github.io/inventario/
2. En el formulario "Añadir Nuevo Artículo"
3. Pega la URL en el campo **"URL de Zara"**

### Paso 4: Espera la extracción automática
El sistema extraerá automáticamente:
- ? **Nombre** del producto
- ? **Referencia** (código del producto)
- ? **Precio** (si está disponible)
- ? **Imagen** del producto

---

## ?? Si Sigue Sin Funcionar

### Opción 1: Usar navegador sin extensiones
Las extensiones de bloqueo de anuncios pueden interferir. Prueba en:
- **Modo incógnito/privado**
- **Otro navegador** (Chrome, Firefox, Edge)

### Opción 2: Esperar unos minutos
Los proxies gratuitos a veces tienen límites de tasa. Espera 5-10 minutos e inténtalo de nuevo.

### Opción 3: Completar manualmente
Si ningún proxy funciona, los campos **Nombre** y **Referencia** se completarán automáticamente. Solo tendrás que:
1. Buscar el precio en la página de Zara
2. Copiarlo manualmente al campo "Precio de Compra"
3. Descargar la imagen del producto y subirla con el botón "Foto del Artículo"

---

## ??? Solución Permanente: Crea tu Propio Proxy (5 minutos)

Si los proxies públicos no funcionan de forma consistente, puedes crear tu propio proxy **GRATIS** en Cloudflare Workers:

### Pasos:

1. **Regístrate en Cloudflare Workers**
   - Ve a https://workers.cloudflare.com/
   - Crea una cuenta gratuita (10,000 peticiones/día)

2. **Crea un nuevo Worker**
   - Haz clic en "Create a Service"
   - Dale un nombre (ej: `zara-proxy`)

3. **Pega este código:**

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get('url')
  
  if (!targetUrl) {
    return new Response('Falta parámetro url', { status: 400 })
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
      }
    })
    
    const newResponse = new Response(response.body, response)
    
    newResponse.headers.set('Access-Control-Allow-Origin', '*')
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    newResponse.headers.set('Access-Control-Allow-Headers', '*')
    
    return newResponse
  } catch (error) {
    return new Response('Error: ' + error.message, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}
```

4. **Despliega el Worker**
   - Haz clic en "Save and Deploy"
   - Copia tu URL (algo como `https://zara-proxy.tu-usuario.workers.dev`)

5. **Úsalo en tu inventario**
   - Abre `app.js` en tu repositorio
   - Busca la función `extractFromZara`
   - Añade tu worker como primer proxy en el array:

```javascript
var proxies = [
    { name: 'Mi Proxy', url: 'https://zara-proxy.tu-usuario.workers.dev/?url=' + encodeURIComponent(url), headers: {} },
    { name: 'CORS.SH', url: 'https://proxy.cors.sh/' + url, headers: { 'x-cors-api-key': 'temp_1234567890abcdef' } },
    // ...resto de proxies
];
```

---

## ?? Monitoreo de Proxies

Puedes ver en la **consola del navegador** (F12) qué proxy está funcionando:

```
Intentando con proxy: CORS.SH
Proxy CORS.SH falló: [error]
Intentando con proxy: AllOrigins
? Proxy AllOrigins funcionó
```

---

## ?? Consejos

- **Los nombres y referencias** siempre se extraen de la URL (no necesitan proxy)
- **El precio y la imagen** requieren proxy
- Si ves "? Extrayendo datos..." pero tarda mucho, el proxy podría estar lento
- La notificación te dirá qué proxy funcionó (ej: "? Datos extraidos vía AllOrigins")

---

## ?? Reporte de Problemas

Si ninguna de estas soluciones funciona, abre un issue en GitHub con:
- La URL de Zara que estás intentando usar
- El navegador que usas
- El mensaje de error en la consola (F12)
