# Proxies CORS Alternativos

Si `allorigins.win` no funciona, puedes usar estas alternativas en `app.js`:

## Opción 1: AllOrigins (actual - implementado)
```javascript
var proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
```

## Opción 2: CORS Anywhere (Heroku)
```javascript
var proxyUrl = 'https://cors-anywhere.herokuapp.com/' + url;
```
?? Nota: Requiere activación temporal en https://cors-anywhere.herokuapp.com/corsdemo

## Opción 3: ThingProxy
```javascript
var proxyUrl = 'https://thingproxy.freeboard.io/fetch/' + url;
```

## Opción 4: CORS.SH (requiere API key gratuita)
```javascript
var proxyUrl = 'https://proxy.cors.sh/' + url;
```

## Opción 5: Tu propio proxy (Cloudflare Workers)
Puedes crear tu propio proxy gratuito en Cloudflare Workers:

1. Ve a https://workers.cloudflare.com/
2. Crea una cuenta gratuita
3. Crea un worker con este código:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get('url')
  
  if (!targetUrl) {
    return new Response('Missing url parameter', { status: 400 })
  }

  const response = await fetch(targetUrl)
  const newResponse = new Response(response.body, response)
  
  newResponse.headers.set('Access-Control-Allow-Origin', '*')
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
  return newResponse
}
```

4. Usa tu worker en app.js:
```javascript
var proxyUrl = 'https://tu-worker.tu-cuenta.workers.dev/?url=' + encodeURIComponent(url);
```

---

## Cómo cambiar de proxy en app.js

Busca esta línea (aproximadamente línea 620):
```javascript
var proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
```

Y también esta línea (aproximadamente línea 646):
```javascript
var imgProxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(imgUrl);
```

Reemplázalas con el proxy de tu elección.
