import type { Metadata } from "next";
import Link from "next/link";
import { ExplorationResourceCard } from "../components/ExplorationResourceCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Recursos de exploración",
  description:
    "Preguntas para investigar y comparar opciones internacionales con mayor criterio.",
};

const sourceReminder = `

Incluye enlaces y fecha de consulta. Separa lo confirmado de lo pendiente. MiTec y las áreas correspondientes confirman elegibilidad, equivalencias, convenios, costos y requisitos.`;

const resources = [
  {
    eyebrow: "Formación",
    title: "Explorar un plan de estudios",
    description: "Descubre asignaturas y enfoques que podrían aportar a tu trayectoria.",
    question: "¿Qué podría aprender aquí y cómo se relaciona con la formación que busco?",
    tone: "violet" as const,
    evidence: [
      "Dos elementos académicos que llamaron tu atención.",
      "El enlace al plan de estudios oficial.",
      "Una pregunta para Dirección de Programa.",
    ],
    prompt: `Estoy explorando [universidad] en relación con [disciplina, programa o interés]. Quiero comprender qué podría aportar a mi formación.

En el sitio oficial identifica:
1. Asignaturas, proyectos o enfoques relacionados con [interés].
2. Dos elementos que distingan su propuesta académica.
3. Lo que tendría que revisar con Dirección de Programa.

Relaciona cada hallazgo con mi trayectoria en [programa actual].${sourceReminder}`,
  },
  {
    eyebrow: "Investigación",
    title: "Conocer grupos y proyectos",
    description: "Encuentra líneas de trabajo vinculadas con un interés académico.",
    question: "¿En qué temas trabaja esta universidad y cómo se relacionan con mis intereses?",
    tone: "sky" as const,
    evidence: [
      "Uno o dos grupos o proyectos relevantes.",
      "Su relación con tus intereses.",
      "Lo que falta confirmar sobre participación.",
    ],
    prompt: `Quiero conocer la investigación de [universidad] en [tema o disciplina] y su relación con mis intereses.

En páginas oficiales identifica:
1. Uno o dos grupos, laboratorios o proyectos activos.
2. Sus líneas de trabajo y proyectos recientes.
3. Oportunidades publicadas para estudiantes y sus condiciones.

Aclara qué tendría que preguntar para saber si una persona de intercambio puede participar.${sourceReminder}`,
  },
  {
    eyebrow: "Oferta distintiva",
    title: "Revisar programas y certificaciones",
    description: "Conoce una oferta especializada y valora su posible aporte.",
    question: "¿Qué distingue esta oferta y por qué podría ser importante para mi trayectoria?",
    tone: "sand" as const,
    evidence: [
      "El programa, acreditación o certificado identificado.",
      "Su posible aporte a tu formación.",
      "Una duda sobre acceso, reconocimiento o vigencia.",
    ],
    prompt: `Estoy explorando [universidad o programa] en [disciplina]. Quiero conocer su oferta especializada y su posible aporte a mi trayectoria.

En fuentes oficiales identifica:
1. El programa, certificación o acreditación.
2. Qué distingue y cuál es su vigencia publicada.
3. Cómo podría relacionarse con [meta o interés].

Señala qué falta confirmar sobre acceso, reconocimiento o equivalencia.${sourceReminder}`,
  },
  {
    eyebrow: "Reputación académica",
    title: "Interpretar rankings con contexto",
    description: "Usa un ranking como punto de partida, no como respuesta final.",
    question: "¿Qué mide este ranking y qué información importante deja fuera?",
    tone: "lime" as const,
    evidence: [
      "Ranking, edición, disciplina y posición.",
      "Un indicador que ayude a explicar el resultado.",
      "Algo importante que el ranking no mide.",
    ],
    prompt: `Estoy explorando [universidad] en [disciplina o programa]. Quiero entender su posición en QS Rankings sin tomarla como una decisión automática.

Identifica:
1. Edición, año, disciplina y posición.
2. Los indicadores que ayudan a explicar el resultado.
3. Una fortaleza que conviene revisar en el sitio de la universidad.
4. Algo importante para mi experiencia que el ranking no mide.

Incluye la metodología y compara sólo datos de la misma edición y categoría.${sourceReminder}`,
  },
  {
    eyebrow: "Vida cotidiana",
    title: "Comprender una ciudad y su entorno",
    description: "Explora las condiciones del lugar que podrían influir en tu experiencia.",
    question: "¿Cómo sería estudiar y vivir aquí durante el periodo que considero?",
    tone: "coral" as const,
    evidence: [
      "Dos condiciones del entorno importantes para ti.",
      "Una posible dificultad.",
      "Una pregunta que requiere una fuente local u oficial.",
    ],
    prompt: `Estoy considerando estudiar en [universidad y ciudad] durante [periodo]. Mis prioridades son [movilidad, clima, idioma, accesibilidad, red de apoyo u otras].

Investiga:
1. Ubicación del campus y formas habituales de traslado.
2. Clima e idiomas durante ese periodo.
3. Servicios relacionados con [prioridad o preocupación].
4. Una condición que podría favorecer mi experiencia y otra que podría dificultarla.

Prioriza fuentes universitarias y locales. Trata los testimonios como experiencias particulares.${sourceReminder}`,
  },
  {
    eyebrow: "Planeación económica",
    title: "Estimar costos por categorías",
    description: "Construye una referencia inicial de gastos, no un presupuesto definitivo.",
    question: "¿Qué gastos tendría que considerar y cuáles siguen pendientes?",
    tone: "sky" as const,
    evidence: [
      "Categorías y rangos con moneda y fecha.",
      "Las fuentes utilizadas.",
      "Costos o apoyos pendientes de confirmar.",
    ],
    prompt: `Quiero estimar los gastos de estudiar en [universidad y ciudad] durante [periodo], usando [moneda] como referencia.

Organiza rangos para:
1. Participación: examen de idioma, pasaporte y cuotas publicadas.
2. Asignación o admisión: seguro, visa, depósitos y cuotas publicadas.
3. Experiencia: alojamiento, alimentación, transporte, materiales y gastos personales.

Indica rango, moneda, fuente y fecha. Separa pagos únicos de gastos mensuales. Usa Numbeo como referencia y contrástalo con fuentes oficiales.${sourceReminder}`,
  },
];

const comparisonPrompt = `Estoy comparando [universidad A] y [universidad B] para una experiencia internacional en [programa, disciplina o interés]. Quiero saber cómo responde cada opción a mis prioridades, no cuál es mejor en general.

Mis prioridades son:
1. [prioridad formativa o profesional]
2. [prioridad personal o geográfica]
3. [preocupación económica, de idioma u otra]

Compara ambas con los mismos criterios. Para cada uno incluye evidencia, enlace, fecha y datos pendientes.

Al final indica:
1. Qué opción responde mejor a cada prioridad y por qué.
2. Qué información podría cambiar mi perspectiva.
3. Qué preguntas llevar a Programas Internacionales, Dirección de Programa o Mentoría.

No declares una ganadora ni inventes puntuaciones. Separa lo confirmado de lo pendiente. MiTec y las áreas correspondientes confirman elegibilidad, equivalencias, convenios, costos y requisitos.`;

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-main">
        <div className="shell">
          <Link className="back-link" href="/">← Volver al inicio</Link>
          <header className="page-intro resources-intro">
            <p className="kicker">Recurso complementario</p>
            <h1>Preguntas para ampliar tu exploración.</h1>
            <p>
              Elige una pregunta para conocer mejor una opción. Puedes explorarla ahora o volver cuando quieras.
            </p>
          </header>

          <section className="exploration-resource-section" aria-labelledby="investigate-title">
            <div className="section-heading">
              <p className="section-label">Investigar una opción</p>
              <h2 id="investigate-title">¿Qué quieres conocer mejor?</h2>
            </div>
            <div className="exploration-resource-grid">
              {resources.map((resource) => (
                <ExplorationResourceCard key={resource.title} {...resource} />
              ))}
            </div>
          </section>

          <section className="comparison-resource-section" aria-labelledby="compare-title">
            <div className="section-heading">
              <p className="section-label">Contrastar alternativas</p>
              <h2 id="compare-title">Cuando dos opciones parecen igualmente atractivas.</h2>
              <p>Compáralas con las mismas prioridades para reconocer sus diferencias.</p>
            </div>
            <ExplorationResourceCard
              eyebrow="Comparar dos opciones"
              title="Construir una comparación razonada"
              description="Contrasta dos universidades con los mismos criterios y reconoce lo que todavía falta confirmar."
              question="¿Cómo responde cada opción a lo que busco y qué necesito confirmar antes de decidir?"
              tone="violet"
              featured
              evidence={[
                "Evidencia comparable para cada prioridad.",
                "Una inclinación provisional, sin puntuación.",
                "Lo que podría cambiar tu perspectiva.",
                "Preguntas para continuar la conversación.",
              ]}
              prompt={comparisonPrompt}
            />
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
