"use client";

import { useState } from "react";
import Link from "next/link";
import { PageIntro } from "../components/PageIntro";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

type GuideTab = "steps" | "filters" | "evidence";

export default function MiTecGuidePage() {
  const [activeTab, setActiveTab] = useState<GuideTab>("steps");

  return (
    <>
      <SiteHeader />
      <main className="page-main shell">
        <PageIntro
          eyebrow="Brújula Internacional · Consulta técnica"
          title="Oferta y requisitos en MiTec"
          description="Una referencia rápida para localizar la oferta oficial, revisar condiciones y reconocer qué información necesitas confirmar."
        />

        <div className="content-stack">
          {/* Back to exploration link */}
          <div className="no-print">
            <Link href="/pasaporte" className="back-link">
              ← Regresar a mi exploración
            </Link>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="tab-navigation no-print">
            <button
              className={`tab-btn ${activeTab === "steps" ? "active" : ""}`}
              onClick={() => setActiveTab("steps")}
              type="button"
            >
              1. Ruta de Acceso
            </button>
            <button
              className={`tab-btn ${activeTab === "filters" ? "active" : ""}`}
              onClick={() => setActiveTab("filters")}
              type="button"
            >
              2. Condiciones de Viabilidad
            </button>
            <button
              className={`tab-btn ${activeTab === "evidence" ? "active" : ""}`}
              onClick={() => setActiveTab("evidence")}
              type="button"
            >
              3. Evidencia y Certeza
            </button>
          </div>

          {/* TAB CONTENT: STEPS */}
          {activeTab === "steps" && (
            <section className="panel panel-accent animated-fade">
              <h2>Ruta de Acceso en MiTec</h2>
              <p>Sigue este procedimiento para abrir el portal oficial en tu dispositivo:</p>
              <ol className="guide-list">
                <li>
                  <strong>Inicia sesión</strong> con tu cuenta institucional en <strong>MiTec</strong>.
                </li>
                <li>
                  Busca la sección o servicio de <strong>Mi Experiencia Internacional</strong> en el menú.
                </li>
                <li>
                  Accede al <strong>Buscador de Oportunidades</strong>.
                </li>
              </ol>
              <div className="callout mt-4">
                <strong>Recomendación técnica:</strong> Inicia tu sesión de MiTec antes de comenzar a planificar para agilizar las búsquedas en tiempo real.
              </div>
            </section>
          )}

          {/* TAB CONTENT: FILTERS */}
          {activeTab === "filters" && (
            <>
              <section className="panel animated-fade">
                <h2>Condiciones que necesitas revisar</h2>
                <p>Consulta estos factores dentro del buscador oficial antes de considerar viable una opción:</p>
                <div className="filter-mapping-grid">
                  <div className="mapping-card">
                    <h3>Programa y promedio</h3>
                    <p className="mapping-instruction">
                      Filtra por tu <strong>programa académico</strong> y revisa el <strong>promedio mínimo (GPA)</strong> indicado en la ficha. Si no cumples una condición, confirma con PI si existe alguna consideración aplicable antes de descartar la opción.
                    </p>
                  </div>
                  <div className="mapping-card">
                    <h3>Requisito de idioma</h3>
                    <p className="mapping-instruction">
                      Verifica el examen, puntaje y vigencia solicitados. No contar todavía con el comprobante no descarta por sí solo la opción: revisa si puedes obtenerlo dentro de las fechas aplicables.
                    </p>
                    <p>
                      <a className="button button-secondary" href="https://tecmx-my.sharepoint.com/:b:/g/personal/pinacional_servicios_tec_mx/EfWMOOmzYY9LgE-_usT1Q1oBkfm2YNqhw2JuKSq-1DA0pQ?e=Voj8ei" target="_blank" rel="noreferrer">
                        Revisar exámenes de idiomas ↗
                      </a>
                    </p>
                    <p className="resource-context-note">Confirma después el requisito específico de cada opción en MiTec.</p>
                  </div>
                  <div className="mapping-card">
                    <h3>Costos y tipo de pago</h3>
                    <p className="mapping-instruction">
                      Identifica el tipo de facturación y los costos estimados del periodo. Contrástalos con las prioridades y condiciones que necesitas cuidar.
                    </p>
                    <p>
                      <a className="button button-secondary" href="https://www.numbeo.com/cost-of-living/" target="_blank" rel="noreferrer">
                        Consultar costos de vida por ciudad ↗
                      </a>
                    </p>
                    <p className="resource-context-note">Numbeo es una fuente externa y sus cifras son estimaciones. Registra la ciudad y la fecha de consulta.</p>
                  </div>
                </div>
              </section>

              <section className="panel animated-fade">
                <h2>Gastos que pueden aparecer en distintos momentos</h2>
                <div className="three-col">
                  <div><h3>Antes de participar</h3><p>Exámenes de idiomas, pasaporte y cuota de participación cuando corresponda.</p></div>
                  <div><h3>Después de una asignación</h3><p>Seguro médico, trámites migratorios y posibles cargos de la universidad o país de destino.</p></div>
                  <div><h3>Durante la experiencia</h3><p>Alojamiento, alimentación, transporte y otros gastos personales.</p></div>
                </div>
                <p className="callout mt-4">Estas categorías preparan tu estimación; no constituyen una lista exhaustiva ni una cotización institucional.</p>
              </section>
            </>
          )}

          {/* TAB CONTENT: EVIDENCE */}
          {activeTab === "evidence" && (
            <>
              <section className="panel panel-contrast animated-fade">
                <h2>Distingue qué sabes y qué falta confirmar</h2>
                <p>Al abrir la ficha de una universidad en MiTec, clasifica la información en tres niveles:</p>
              
              <div className="evidence-grid-horizontal">
                <div className="evidence-box confirmed">
                  <span className="eb-badge">Confirmado</span>
                  <h4>Datos Oficiales</h4>
                  <p>Requisitos de promedio, puntajes oficiales de idioma, periodos de postulación y tipo de convenio académico. Son hechos validados por la institución.</p>
                </div>

                <div className="evidence-box estimated">
                  <span className="eb-badge">Estimado</span>
                  <h4>Aproximaciones Variables</h4>
                  <p>Costos de hospedaje, vuelos, comidas y seguro de gastos médicos. Varían según la temporada, la inflación y tus decisiones de viaje personales.</p>
                </div>

                <div className="evidence-box pending">
                  <span className="eb-badge">Pendiente</span>
                  <h4>Lo que Requiere Validación</h4>
                  <p>Equivalencias de materias específicas para tu plan de estudios y disponibilidad de lugares en el periodo. Se aclaran con Dirección de Programa o Programas Internacionales.</p>
                </div>
                </div>
              </section>

              <section className="panel animated-fade">
                <h2>Si un dato sigue pendiente</h2>
                <p>Conserva el vacío como pendiente y conviértelo en una consulta concreta.</p>
                <div className="two-col mt-4">
                  <div>
                    <h3>1. Nombra lo que falta</h3>
                    <p>Registra en tu Guía de exploración qué necesitas comparar, decidir o confirmar.</p>
                  </div>
                  <div>
                    <h3>2. Elige por dónde comenzar</h3>
                    <p>Selecciona el espacio que puede ayudarte y define cuándo realizarás la consulta.</p>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Print View for Guide (All tabs visible sequentially when printed) */}
          <div className="only-print">
            <section className="panel mt-4">
              <h2>1. Ruta de Acceso en MiTec</h2>
              <p>Inicia sesión en MiTec &gt; Servicios &gt; Mi Experiencia Internacional &gt; Buscador de Oportunidades.</p>
            </section>
            <section className="panel mt-4">
              <h2>2. Cómo mapear viabilidad en el buscador</h2>
              <ul>
                <li><strong>Académico:</strong> Filtra por carrera y promedio mínimo (GPA).</li>
                <li><strong>Idioma:</strong> Verifica puntaje exacto exigido en la ficha de oportunidad.</li>
                <li><strong>Presupuesto:</strong> Revisa el tipo de pago y cobro.</li>
              </ul>
            </section>
            <section className="panel mt-4">
              <h2>3. Clasificación de Evidencia</h2>
              <ul>
                <li><strong>Confirmado:</strong> Promedio, idioma requerido, convocatorias vigentes.</li>
                <li><strong>Estimado:</strong> Costos de vida, hospedaje, traslados.</li>
                <li><strong>Pendiente:</strong> Acreditaciones y equivalencias de materias (consulta con Dirección de Programa).</li>
              </ul>
            </section>
            <section className="panel mt-4">
              <h2>4. Fuentes complementarias para preparar tu consulta</h2>
              <ul>
                <li><strong>Numbeo (Costos de vida):</strong> Referencia externa de gastos cotidianos antes, durante y después de la experiencia.</li>
                <li><strong>Exámenes de idiomas:</strong> Consulta de comprobantes correspondientes a tu proceso de postulación.</li>
              </ul>
            </section>
          </div>

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
