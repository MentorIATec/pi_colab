# Prompt de auditoría del Pasaporte de Decisión

## Propósito

Evaluar si cada pregunta del instrumento de 30 minutos produce información útil
para que una mentora ayude al estudiante a enfocar una decisión, o si corresponde
mejor a una consulta autónoma en las fuentes oficiales de Programas
Internacionales.

## Prompt ejecutado

> Actúa como especialista en mentoría estudiantil, diseño de decisiones,
> investigación de experiencia de usuario y privacidad educativa. Audita un
> instrumento para una microintervención presencial o síncrona de 30 minutos con
> un máximo de cinco estudiantes interesados en una experiencia internacional.
>
> Contexto y límites:
>
> - La mentoría acompaña propósito, criterios personales, tensiones, preparación
>   de preguntas y continuidad; no valida elegibilidad, costos, fechas, convenios
>   ni equivalencias.
> - MiTec y los canales oficiales de Programas Internacionales son la fuente de
>   verdad para requisitos, oferta, fechas y procesos.
> - La consulta detallada de opciones debe poder continuar como trabajo autónomo.
> - Se desea explorar una arquitectura que permita identificar al estudiante con
>   nombre y matrícula, pero todavía no existe una decisión sobre finalidad,
>   almacenamiento, acceso o retención de esos datos.
> - No rediseñes aún la interfaz. Primero revela hallazgos y contradicciones.
>
> Analiza cada pregunta o campo con los siguientes criterios:
>
> 1. ¿Qué decisión concreta ayuda a tomar?
> 2. ¿Qué evidencia produce sobre la motivación, los criterios o la tensión del
>    estudiante?
> 3. ¿Qué pregunta de seguimiento habilita para la mentora?
> 4. ¿La respuesta proviene de la reflexión del estudiante o de una fuente
>    institucional?
> 5. ¿Quién es responsable de producir o validar la respuesta: estudiante,
>    mentoría, Programas Internacionales, Dirección de Programa o MiTec?
> 6. ¿Duplica información disponible en el tablero o en otro canal oficial?
> 7. ¿Solicita datos personales o sensibles innecesarios para la conversación?
> 8. ¿Puede responderse con suficiente calidad dentro de 30 minutos y en un grupo
>    de cinco personas?
> 9. Recomienda una acción: conservar, reformular, trasladar a trabajo autónomo o
>    eliminar.
>
> Califica de 0 a 3 la utilidad para la conversación de mentoría, donde 0 significa
> que no habilita una intervención y 3 que permite comprender, cuestionar y
> orientar una decisión. Señala además el nivel de duplicación institucional y el
> ajuste al tiempo como bajo, medio o alto.
>
> Busca explícitamente:
>
> - preguntas técnicamente claras pero poco útiles para conectar con el
>   estudiante;
> - trabajo de consulta que haya desplazado reflexión valiosa al reducir el
>   formato de 60/90 a 30 minutos;
> - sesgos de anclaje prematuro en ciudad, universidad o programa;
> - oportunidades para conocer qué busca el estudiante que su experiencia actual
>   en el Tec no le ofrece;
> - tensiones que ameriten acompañamiento y no sólo información;
> - riesgos de capturar nombre y matrícula en un sitio público o en el
>   almacenamiento local del navegador.
>
> Entrega: síntesis ejecutiva, matriz campo por campo, preguntas ausentes,
> contradicciones con las reglas del proyecto e implicaciones de arquitectura.
> Separa hallazgos de recomendaciones y no inventes políticas institucionales.

## Insumos considerados

- Instrumento actual: `site/app/components/PassportForm.tsx`.
- Descripción pública del recorrido: `site/app/page.tsx`.
- Reglas de diseño: `docs/DESIGN_RULES.md`.
- Decisión sobre el rol de mentoría: `docs/decisions/ADR-006-*`.
- Agenda de la microintervención: `docs/sprint-1/AGENDA_30.md`.
- Propuesta original de 60/90 minutos: `docs/sprint-0/PROPOSAL.md`.

La salida completa de esta ejecución se documenta en
`AUDIT_FINDINGS.md`.
