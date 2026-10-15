# Gerónimo Díaz De Rosa — sitio CV (v5)

Sitio personal bilingüe (`/en` y `/es`) hecho con Next.js. Es estático: no tiene base de datos ni servidor propio.

## Estructura

```
app/[lang]/layout.tsx   — fuentes, SEO, hreflang e imágenes para compartir por idioma
app/[lang]/page.tsx     — orden de las secciones
app/globals.css         — todo el diseño: paleta, vidrio, secciones y layouts de celular
middleware.ts           — "/" redirige a /es o /en según el idioma del navegador
lib/content.ts          — TODO el texto y los datos, en inglés y español
lib/engine.js           — motor de animación (JS puro, sin librerías)
components/             — una pieza por sección (Hero, SystemStory, Results, Work, AiFlow, Experience, Exit…)
public/cv/              — los dos PDFs del CV
public/og/              — imágenes para compartir (og-en.png, og-es.png)
```

## Editar contenido

Todo el texto está en `lib/content.ts`, con un bloque `en` y otro `es` para cada parte:
- `METRICS`: los números del funnel.
- `CASES`: los dos casos.
- `AI`: la demo del workflow.
- `ROLES`: la experiencia.

En español, "brand" y "growth" quedan en inglés a propósito: no uses "marca", "crecimiento" ni "crecer".

**Métricas:** cada número tiene que poder explicarse en una entrevista (de dónde sale, período y cómo se mide). "Pipeline" es el valor de oportunidades calificadas, no ingresos cerrados.

## Recorrido del sitio

1. **Hero:** el portal se abre al scrollear y te mete en el color. Las cinco formas de las etapas se alinean dentro del color, el portal se cierra en un punto, y el punto y las formas viajan hasta la sección del sistema. Ahí el punto pasa a ser el indicador de progreso y cada forma el ícono de su etapa.
2. **Qué hago:** frase que se ilumina palabra por palabra, más datos prácticos (base y zona horaria, idiomas, qué roles busco).
3. **Sistema (fijado):** las 5 etapas avanzan con el scroll. En celular son tarjetas que se apilan; la de abajo se achica y se desvanece.
4. **Resultados:** funnel de Brand → Revenue con formas que caen y métricas que cuentan hacia arriba.
5. **Casos:** tarjetas con ilustraciones propias (timeline de producto y dos plataformas web) que se abren a pantalla completa.
6. **Demo de IA:** nodos que se encienden en secuencia, un pulso que viaja entre ellos y un registro de ejemplo.
7. **Experiencia:** timeline que se dibuja con el scroll. Ingenii (productos) y Tekne (servicios), del mismo grupo, van en carriles paralelos.
8. **Salida por el portal:** el círculo vuelve a crecer y el contacto queda adentro.

**Extras:**
- Scroll suave con inercia (escritorio, rueda del mouse).
- Las formas del hero se apartan del cursor y, en celular, se mueven al inclinar el teléfono (iPhone pide permiso al primer toque).
- Las formas se estiran levemente según la velocidad del scroll.
- Las órbitas se pausan fuera de pantalla.

**Accesibilidad:**
- Con "reducir movimiento" no hay animaciones, scroll suave ni apilado, y todo se muestra estático.
- Con "reducir transparencia", el vidrio se vuelve sólido.

## Ajustes rápidos del motor (`lib/engine.js`)

- **Suavidad del scroll:** `current = lerp(current, target, 0.11)`. Más alto es más directo. Si con trackpad se siente lento, probá `0.2`.
- **Desactivar el scroll suave:** cambiá `const useSmooth = fine && !reduce;` por `const useSmooth = false;`.
- **Duración de las escenas fijadas:** es la altura de cada sección en `globals.css` (`.g-hero` 2700px, `.g-story` 2800px, `.g-funnel` 2200px, `.g-ai` 2300px, `.g-exit` 1500px).

## CVs en PDF

Van en `public/cv/` con estos nombres exactos (Vercel distingue mayúsculas):
- `Geronimo-Diaz-De-Rosa-CV-EN.pdf`
- `Geronimo-Diaz-De-Rosa-CV-ES.pdf`

`npm run check:cv` falla si falta alguno.

## Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm run check:cv   # verifica los PDFs
npm run build      # build de producción (estático)
```

## Dominio y SEO

Si usás un dominio propio, cargá `NEXT_PUBLIC_SITE_URL=https://tudominio.com` en las variables de entorno de Vercel. Las imágenes para compartir están en `public/og/`. Después de cada cambio, pasá las URLs por el LinkedIn Post Inspector para refrescar la vista previa.
