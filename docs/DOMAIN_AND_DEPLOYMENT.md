# Dominio y publicación de Brújula Internacional

> **Estado:** GitHub Pages es la publicación inicial. El dominio institucional
> queda sujeto a disponibilidad, titularidad y acceso al DNS.

## Publicación inicial

- Repositorio: `MentorIATec/brujula-internacional`
- URL: `https://mentoriatec.github.io/brujula-internacional/`
- Fuente: rama `main`, mediante `.github/workflows/deploy-pages.yml`.
- Base path de producción: `/brujula-internacional`.

## Ruta recomendada para el dominio institucional

La opción preferida es **`brujula.mentoriatec.mx` sobre GitHub Pages**. El sitio
actual es estático, no utiliza backend y ya dispone de una publicación estable
en GitHub; migrarlo a Vercel sólo para personalizar el dominio agregaría otra
plataforma, configuración y responsable sin aportar una capacidad necesaria.

### Requisitos previos

1. Confirmar que `mentoriatec.mx` existe y quién administra su DNS.
2. Confirmar autorización para utilizar `brujula.mentoriatec.mx`.
3. Verificar el dominio en la organización de GitHub para reducir el riesgo de
   apropiación del subdominio.

### Configuración en GitHub Pages

1. En el repositorio, abrir **Settings → Pages**.
2. En **Custom domain**, registrar `brujula.mentoriatec.mx` y guardar.
3. En el proveedor DNS, crear un registro `CNAME` con nombre `brujula` y destino
   `mentoriatec.github.io`.
4. Esperar la validación DNS y habilitar **Enforce HTTPS**.
5. Verificar la portada y las rutas `/pasaporte/` y `/guia-mitec/`.

Al activar el dominio personalizado, el sitio debe compilarse con
`NEXT_PUBLIC_BASE_PATH` vacío. Conviene controlar ese valor mediante una
variable del repositorio en lugar de mantener dos workflows.

## Alternativa en Vercel

Vercel es viable y permite conectar `brujula.mentoriatec.mx`, pero se recomienda
sólo si se decide usar previews por pull request, incorporar funciones propias
de Vercel, centralizar otros proyectos del equipo ahí o retirar GitHub Pages.

Para migrar:

1. Importar `MentorIATec/brujula-internacional` en Vercel.
2. Definir `site` como directorio raíz.
3. Usar Next.js y `NEXT_PUBLIC_BASE_PATH` vacío.
4. Agregar `brujula.mentoriatec.mx` en **Project → Settings → Domains**.
5. Crear el registro DNS que indique Vercel y verificar HTTPS.
6. Mantener GitHub Pages durante la validación y retirarlo sólo cuando el
   dominio y todas las rutas hayan sido comprobados.

## Evolución futura

Si Brújula Internacional incorpora sesiones, almacenamiento consentido,
automatizaciones o un copiloto basado en fuentes, deberá evaluarse nuevamente
el host. En ese escenario Cloudflare Workers, Cloudflare Pages o Vercel pueden
aportar capacidades que el sitio estático vigente no necesita.
