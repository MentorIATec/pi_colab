# Variante: conexión de mentoría

Esta carpeta documenta una variante local del Pasaporte de Decisión. Su propósito
es recuperar las preguntas que permiten a una mentora comprender la decisión del
estudiante y acompañar su siguiente paso, sin convertir la sesión de 30 minutos
en una revisión de requisitos institucionales.

## Estado

- Rama de trabajo: `codex/mentoria-connection-variant`.
- El prototipo publicado en `main` permanece sin cambios.
- Primera etapa: auditoría del instrumento actual.
- Aún no se modifica la interfaz ni se implementa captura de identidad.

## Documentos

- [Prompt de auditoría](./AUDIT_PROMPT.md)
- [Hallazgos de la auditoría](./AUDIT_FINDINGS.md)

## Límite de esta etapa

La matrícula y el nombre se consideran una necesidad de arquitectura, pero no se
agregarán como campos hasta definir propósito, almacenamiento, acceso, retención
y aviso de privacidad. Esta decisión también requiere revisar la regla de diseño
vigente que excluye la matrícula del sitio.
