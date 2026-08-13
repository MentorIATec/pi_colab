# Visión futura de producto: Brújula Internacional

> **Estado:** propuesta de exploración; fuera del alcance del prototipo vigente.
>
> Este documento conserva una visión de producto para futuras conversaciones con
> Mentoría, Programas Internacionales, Dirección de Programa y las áreas
> institucionales responsables de tecnología, privacidad y gobierno de datos. No
> autoriza cuentas, almacenamiento remoto, automatizaciones, uso de IA ni
> tratamiento de datos personales. Las reglas vigentes del prototipo continúan
> definidas en `DECISIONS.md` y `DESIGN_RULES.md`.

## Idea rectora

Evolucionar la Guía de exploración hacia una experiencia continua que acompañe a cada
estudiante desde una inquietud inicial hasta conversaciones concretas y decisiones
respaldadas por fuentes.

La promesa no sería entregar una respuesta ni elegir un destino:

> Convertir la incertidumbre en una trayectoria conversable, verificable y
> accionable.

La Guía de exploración seguiría siendo la puerta de entrada, dentro de una
experiencia más amplia denominada **Brújula Internacional**.

## Arquitectura ideal de la experiencia

### 1. Journey adaptativo

La experiencia comienza reconociendo el momento de cada estudiante:

- apenas considera una experiencia internacional;
- quiere conocer qué opciones existen;
- compara alternativas;
- necesita confirmar viabilidad;
- prepara una solicitud;
- ya cuenta con asignación y necesita prepararse.

El contenido y las acciones se organizan en seis momentos: **Imaginar, Explorar,
Comparar, Confirmar, Preparar y Continuar**. El journey evita presentar el mismo
inventario de requisitos a todas las personas y muestra la información cuando
resulta pertinente.

### 2. Copiloto de decisiones basado en fuentes

No sería un bot abierto que pretende responder cualquier pregunta. Tendría cuatro
modos delimitados:

1. **Aclarar mi duda:** transformar una inquietud amplia en una pregunta útil.
2. **Entender un requisito:** explicar un término y señalar dónde confirmarlo.
3. **Preparar una conversación:** organizar lo conocido, lo pendiente y la
   pregunta para Mentoría, PI o Dirección de Programa.
4. **Revisar mi avance:** devolver lo construido y señalar qué falta explorar,
   sin calificar ni decidir por la persona.

Toda respuesta distinguiría entre información oficial, orientación para la
reflexión y datos pendientes de confirmar. Mostraría fuente, fecha y vigencia. No
confirmaría equivalencias, costos, plazas, convenios ni viabilidad.

### 3. Tablero personal de trayectoria

El tablero mostraría productos y pendientes, no un porcentaje artificial:

- propósito;
- opciones por explorar;
- idioma;
- costos;
- cursos y materias;
- dudas para PI o Dirección de Programa;
- siguiente acción.

Los estados utilizarían lenguaje humano: **aún no lo reviso, tengo una primera
idea, encontré información, necesito confirmarlo, ya sé cómo continuar**.

### 4. Checklist adaptativo

Habría listas distintas para cada momento y cada opción:

- antes de comparar: propósito, prioridades, restricciones y oferta;
- por universidad: programa, periodo, promedio, idioma, pago, cursos, costos,
  fuente y pendientes;
- después de una asignación: pasaporte, seguro, trámites migratorios, requisitos
  de destino, alojamiento, traslados y preparación académica y personal.

El checklist conservaría la evidencia y la fecha con la que se tomó cada
decisión, aun si una fuente cambia posteriormente.

### 5. Comparador sin rankings automáticos

Permitiría contrastar entre dos y siete opciones mediante dimensiones comunes:
afinidad académica, cursos, idioma, experiencia, ciudad, costos, condiciones
indispensables, incertidumbres, información confirmada y preguntas pendientes.

No declararía una opción ganadora. Haría visibles tensiones y dependencias para
preparar la conversación y el siguiente paso.

### 6. Laboratorio de costos por escenarios

Construiría rangos para alojamiento, alimentación, transporte, vuelo, seguro,
trámites, idioma, cuotas y margen para imprevistos. Separaría gastos antes de
participar, después de una asignación y durante la experiencia. Permitiría
contrastar escenarios sin presentar estimaciones como cotizaciones ni confirmar
viabilidad financiera.

### 7. Explorador académico

Ayudaría a documentar cursos, áreas, idioma, nivel, periodo, fuente, interés y
relación con la trayectoria. Generaría un resumen para conversar con Dirección
de Programa, sin afirmar equivalencias ni acreditaciones.

### 8. Ruta de idioma

Organizaría examen o comprobante, puntaje, vigencia, fecha necesaria, estado y
fuente. Podría ayudar a calcular tiempos de preparación sin descartar
automáticamente una opción cuando el requisito todavía puede cumplirse.

### 9. Salidas diferenciadas

El estudiante decidiría qué compartir mediante tres vistas:

- **Mentoría:** propósito, prioridades, tensiones y seguimiento.
- **Programas Internacionales:** periodo, opciones, fuentes y duda concreta.
- **Dirección de Programa:** interés académico, cursos revisados y pregunta de
  pertinencia.

La vista previa antecedería cualquier descarga o envío.

### 10. Sesión colaborativa para grupos pequeños

Una sesión temporal permitiría que cada persona respondiera desde su dispositivo
mientras Mentoría acompaña el ritmo. Las respuestas individuales permanecerían
privadas; el grupo sólo vería dudas o temas compartidos de manera deliberada y,
cuando corresponda, agregada.

### 11. Continuidad y recordatorios consentidos

Cada estudiante podría programar acciones y recibir una invitación para retomarlas.
Los mensajes partirían del acuerdo previo y permitirían reformular el siguiente
paso. No se usarían recordatorios punitivos ni monitoreo silencioso.

### 12. Radar de vigencia

Cada recurso registraría fuente, área responsable, periodo, última revisión y
estado del enlace. Un proceso periódico detectaría enlaces rotos, redirecciones,
documentos modificados y vigencias vencidas. La incertidumbre se mostraría en la
interfaz en lugar de ocultarse.

### 13. Biblioteca de experiencias estudiantiles

Reuniría relatos estructurados sobre adaptación, idioma, carga académica,
vivienda, transporte, integración y gastos inesperados. Cada relato se marcaría
como experiencia personal que aporta perspectiva, nunca como fuente oficial.

### 14. Documento de continuidad

La salida reuniría propósito, opciones, fuentes, fecha de consulta, dudas,
canales y acuerdos. Podría generarse localmente o, con autorización explícita,
mediante un servicio de PDF.

## Privacidad por diseño

La visión contempla dos modalidades que no deben mezclarse:

### Modo privado, predeterminado

- sin cuenta;
- respuestas en el dispositivo;
- identidad sólo en la copia que decide generar el estudiante;
- sin sincronización ni seguimiento remoto;
- sin enviar identidad o reflexiones a una herramienta de IA.

### Modo de continuidad, sujeto a autorización futura

- consentimiento explícito e identidad institucional;
- sincronización entre dispositivos;
- recordatorios y seguimiento acordados;
- compartir selectivamente;
- reglas documentadas de acceso, retención, descarga y eliminación.

La posibilidad técnica de almacenar información no constituye autorización para
hacerlo.

## Mapa tecnológico posible en Cloudflare

- **Workers y Static Assets:** aplicación pública y rutas de servicio.
- **Workers AI y Vectorize:** copiloto limitado a fuentes aprobadas.
- **AI Gateway:** control de modelos, métricas y configuración sin registro del
  contenido de las conversaciones.
- **Durable Objects:** coordinación de sesiones temporales para grupos pequeños.
- **Workflows:** seguimientos consentidos y procesos de actualización.
- **D1:** estados estructurados, únicamente con autorización institucional.
- **R2:** fuentes y documentos versionados.
- **Cron Triggers:** comprobación de enlaces y vigencia.
- **Browser Rendering:** documentos PDF cuando se autorice el procesamiento en
  servidor.
- **Web Analytics:** desempeño y navegación agregada sin identificar respuestas.

## Apuesta de producto

La evolución prioritaria sería:

> **Journey adaptativo + tablero de decisión + copiloto contextual dentro de cada
> momento.**

Un bot aislado presupone que la persona ya sabe qué preguntar. El journey parte
precisamente de que todavía necesita construir esa pregunta.
