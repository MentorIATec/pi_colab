# Variante: conexión de mentoría

Esta carpeta documenta una variante local del Pasaporte de Decisión. Su propósito
es recuperar las preguntas que permiten a una mentora comprender la decisión del
estudiante y acompañar su siguiente paso, sin convertir la sesión de 30 minutos
en una revisión de requisitos institucionales.

## Estado

- Rama de trabajo: `codex/mentoria-connection-variant`.
- El prototipo publicado en `main` permanece sin cambios.
- Primera etapa: auditoría del instrumento actual.
- Aún no se modifica la interfaz.
- Se aprobó una arquitectura sin almacenamiento: el sitio generará un documento
  portátil que el estudiante podrá compartir de forma deliberada.

## Documentos

- [Prompt de auditoría](./AUDIT_PROMPT.md)
- [Hallazgos de la auditoría](./AUDIT_FINDINGS.md)
- [Arquitectura para compartir el Pasaporte](./SHARING_ARCHITECTURE.md)

## Límite de esta etapa

La captura transitoria de nombre y matrícula queda permitida exclusivamente para
rotular el documento. El sitio no conservará los datos. La descarga, impresión o
entrega del archivo será una acción explícita del estudiante; cualquier registro
posterior en CRM pertenece al proceso institucional de mentoría, no al sitio.
