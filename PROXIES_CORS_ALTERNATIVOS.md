# Proxies CORS Alternativos

Si `cors.sh` no funciona, puedes usar estas alternativas en `app.js`:

## ? Opción 1: CORS.SH (ACTUAL - IMPLEMENTADO)
```javascript
var proxyUrl = 'https://proxy.cors.sh/' + url;

fetch(proxyUrl, {
    headers: {
        'x-cors-api-key': 'temp_1234567890abcdef'  // API key temporal
    }
})
```
**Ventajas:** 
- Funciona bien con sitios que bloquean otros proxies
- Más rápido que AllOrigins
- Gratis con límite razonable

**Nota:** Para uso intensivo, puedes crear una API key gratuita en https://cors.sh

---

## Opción 2: AllOrigins
```javascript
var proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
```
?? **Bloqueado por Zara.com**

## Opción 3: ThingProxy
```javascript
var proxyUrl = 'https://thingproxy.freeboard.io/fetch/' + url;
```

## Opción 4: CORS Anywhere (Heroku)
```javascript
var proxyUrl = 'https://cors-anywhere.herokuapp.com/' + url;
```
?? Requiere activación en https://cors-anywhere.herokuapp.com/corsdemo

## Opción 5: API Proxy (Nuevo)
```javascript
var proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url);
```

---

## ??? Cómo cambiar de proxy en app.js

Busca la función `extractFromZara` (aproximadamente línea 600-650) y modifica:

```javascript
// Línea actual (aprox. línea 620):
var proxyUrl = 'https://proxy.cors.sh/' + url;

// Y si usas headers, también modifica el fetch:
fetch(proxyUrl, {
    headers: {
        'x-cors-api-key': 'temp_1234567890abcdef'
    }
})
```

Reemplaza con el proxy de tu elección según las opciones de arriba.

---

## ?? Crear tu propio proxy GRATIS (Cloudflare Workers)

Si ningún proxy funciona, puedes crear el tuyo en 5 minutos:

1. **Ve a** https://workers.cloudflare.com/
2. **Crea cuenta gratuita** (10,000 peticiones/día gratis)
3. **Crea un Worker** con este código:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get('url')
  
  if (!targetUrl) {
    return new Response('Falta parametro url', { status: 400 })
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const newResponse = new Response(response.body, response)
    newResponse.headers.set('Access-Control-Allow-Origin', '*')
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    
    return newResponse
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 })
  }
}
```

4. **Despliega el Worker**

5. **Usa en app.js:**
```javascript
var proxyUrl = 'https://tu-worker.tu-cuenta.workers.dev/?url=' + encodeURIComponent(url);
```

---

## ?? Notas Importantes

- **CORS.SH** es el más confiable actualmente (implementado)
- **Las imágenes de Zara** se descargan directamente (no necesitan proxy)
- Si un proxy falla, prueba otro de la lista
- Para producción, considera crear tu propio proxy en Cloudflare Workers
