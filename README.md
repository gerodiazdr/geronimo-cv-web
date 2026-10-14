# geronimo-cv-web

Sitio CV de Gerónimo Díaz De Rosa, en inglés y español. Está hecho con Next.js (App Router) + TypeScript, sin librerías de UI ni de animación: todo el movimiento es CSS + `requestAnimationFrame`.

**Recorrido:**
1. Hero blanco con un portal de gradiente.
2. Al scrollear, el portal se abre y te sumerge en el color ("From brand to growth. One system.").
3. Card de posicionamiento.
4. Sistema Position / Create / Grow / Build / Automate, fijado al scroll.
5. Hitos.
6. Experiencia en cartas apiladas.
7. Contacto.
8. Footer con el círculo de gradiente animado y las formas orbitando.

## Idiomas

| Ruta | Contenido |
|------|-----------|
| `/en` | Inglés |
| `/es` | Español |
| `/`   | Redirige según el idioma del navegador: español → `/es`, el resto → `/en` (`middleware.ts`) |

El selector EN / ES está en el header y en el footer. Cada idioma tiene su propia URL, así que se puede compartir directo y Google indexa las dos versiones (`hreflang` incluido).

## Correr en local

```bash
npm install
npm run dev          # http://localhost:3000 → redirige a /en o /es
npm run typecheck    # chequeo de tipos
npm run check:cv     # verifica que estén los PDFs del CV
npm run build        # build de producción
```

Requiere Node 20 o superior.

## Estructura

```
app/
  [lang]/layout.tsx  Layout raíz por idioma: <html lang>, fuentes (Bricolage para titulares, Geist para texto, DM Mono para etiquetas), metadata SEO y hreflang
  [lang]/page.tsx    Orden de las secciones
  globals.css        Tokens, vidrio, hero, secciones, footer, responsive y reduced-motion
  icon.svg           Favicon
middleware.ts        Redirección de "/" según el idioma del navegador
components/
  Background.tsx     Ambiente fijo con orbes de color (parallax)
  Nav.tsx            Navegación flotante de vidrio + selector de idioma
  LangSwitch.tsx     Selector EN / ES
  Hero.tsx           Portal de gradiente que se abre con el scroll
  Statement.tsx      Card de posicionamiento: marco de gradiente, vidrio transparente, texto que se enciende y mini sistema
  SystemStory.tsx    Sección fijada: las 5 etapas cambian con el scroll
  Milestones.tsx     Hitos con conteo al entrar en pantalla
  Experience.tsx     Cartas apiladas (sticky) + roles anteriores
  Contact.tsx        mailto, copiar email, descargas del CV
  Footer.tsx         Círculo de gradiente animado, formas en órbita y links
  Shape.tsx          Formas de cada etapa (rombo, cuarto de círculo, triángulo, cuadrado, círculo)
lib/
  content.ts         ← TODO el contenido, en EN y ES
  motion.ts          Helpers de scroll y movimiento reducido
public/cv/           PDFs descargables del CV (EN y ES)
scripts/check-cv.mjs
```

## Editar contenido

Todo está en `lib/content.ts`, separado por idioma (`en` / `es`): textos de la interfaz, etapas, roles y bullets, hitos y la frase principal. Si cambiás un texto en un idioma, actualizá también el otro.

## CV descargable

- `public/cv/Geronimo-Diaz-De-Rosa-CV-EN.pdf`
- `public/cv/Geronimo-Diaz-De-Rosa-CV-ES.pdf`

En `/en`, "Download CV" baja el PDF en inglés; en `/es`, "Descargar CV" baja el PDF en español. El footer tiene los dos. Usá **esos nombres exactos**, porque Vercel distingue mayúsculas y minúsculas. Para chequearlo, corré `npm run check:cv`.

## Deploy en Vercel

1. En Vercel, entrá a **Add New → Project** e importá este repo de GitHub.
2. Next.js se detecta solo; no hace falta configurar nada.
3. Opcional: cuando tengas dominio propio, agregá la variable de entorno `NEXT_PUBLIC_SITE_URL=https://tudominio.com` para que los links de SEO usen ese dominio. Si no la definís, se usa la URL de producción de Vercel.

## Notas

- **Movimiento reducido:** con "reducir movimiento" activado no hay zoom, órbitas ni manchas animadas; solo fundidos.
- **Transparencia reducida:** con "reducir transparencia" activado, el vidrio pasa a fondo sólido.
- **Celular:** el gradiente cubre todo el hero, el sistema se muestra como tarjetas apiladas y el footer se reacomoda en una columna.
