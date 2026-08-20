# Dóblate

Juego educativo en español que enseña el **crecimiento exponencial**. Empiezas en `1` y cada nivel duplica el número: `1 → 2 → 4 → 8 → …` hasta `2³⁰ = 1 073 741 824`.

## Una página por número

Cada potencia de dos tiene su propia URL indexable con sus 10 datos, su intro y sus preguntas frecuentes dentro del HTML:

| Ruta | Contenido |
| --- | --- |
| `/` | Portada, con enlaces a los primeros niveles y a los más buscados |
| `/2-elevado-a-{n}/` | Un nivel (`n` de 0 a 30): valor exacto, 10 datos, FAQ y enlaces al anterior y siguiente |
| `/potencias-de-dos/` | Tabla completa de las 31 potencias |
| `/progreso/` | Progreso local del jugador (`noindex`) |

El rango de niveles sale de `MAX_EXPONENT` en `src/types/game.ts`; las rutas y la lista de URLs indexables viven en `src/routes.ts`, y los títulos, descripciones y datos estructurados en `src/seo.ts`.

## Desarrollo

```bash
npm install
npm run dev
```

En desarrollo el sitio funciona como SPA: Vite sirve el shell y React pinta la ruta.

## Pruebas

```bash
npm test
```

Cubren rutas, metadatos, motor de datos, almacenamiento y el renderizado de las páginas de nivel, incluida la hidratación sobre el HTML prerenderizado.

## Producción

```bash
npm run build
npm run preview
```

`build` hace tres cosas: comprueba tipos, empaqueta el cliente y ejecuta `scripts/prerender.mjs`, que escribe un `index.html` por ruta, un `404.html` y el `sitemap.xml`. El resultado en `dist/` es HTML estático que luego se hidrata con el mismo bundle.

Para desplegar basta con servir `dist/` en cualquier hosting estático. Si cambias el dominio, actualiza `SITE_URL` en `src/routes.ts` y la línea `Sitemap:` de `public/robots.txt`.

## Stack

- React + TypeScript + Vite, sin dependencias de routing (router propio sobre la History API)
- Prerenderizado estático con `react-dom/server` y `vite.ssrLoadModule`
- Progreso del jugador en `localStorage` versionado
- `BigInt` para potencias de dos exactas
