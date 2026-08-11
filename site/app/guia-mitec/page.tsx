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
          eyebrow="Movilidad Estudiantil · Consulta de Opciones"
          title="Guía de Navegación MiTec"
          description="Una referencia rápida para saber exactamente dónde buscar en el portal oficial y cómo estructurar tus decisiones de ruta."
        />

        <div className="content-stack">
          {/* Back to passport link */}
          <div className="no-print">
            <Link href="/pasaporte" className="back-link">
              ← Regresar a mi Pasaporte
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
            <section className="panel animated-fade">
              <h2>Mapear tus Condiciones de Viabilidad</h2>
              <p>Busca los factores límite obligatorios dentro del buscador del portal oficial:</p>
              <div className="filter-mapping-grid">
                <div className="mapping-card">
                  <h3>Filtro Académico (Carrera / Promedio)</h3>
                  <p className="mapping-instruction">
                    Filtra siempre por tu <strong>Programa Académico</strong> para ver solo las opciones autorizadas. Revisa en la ficha el <strong>promedio mínimo (GPA)</strong> exigido; si tu promedio es menor, la opción queda descartada.
                  </p>
                </div>
                <div className="mapping-card">
                  <h3>Requisito de Idioma</h3>
                  <p className="mapping-instruction">
                    Ubica la sección de <strong>&quot;Requisito de idioma&quot;</strong>. Verifica el puntaje mínimo de TOEFL, IELTS u otro certificado que se pide. Si aún no tienes esa certificación, no se considera una opción viable para este periodo.
                  </p>
                </div>
                <div className="mapping-card">
                  <h3>Viabilidad Financiera</h3>
                  <p className="mapping-instruction">
                    Identifica el tipo de facturación (cuota regular del Tec o pago directo en la universidad destino) y los <strong>costos estimados</strong> del periodo. Evalúa si cumple con el presupuesto límite de tu Pasaporte.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* TAB CONTENT: EVIDENCE */}
          {activeTab === "evidence" && (
            <section className="panel panel-dark animated-fade">
              <h2>Clasificación de Evidencia: Decidir con Certeza</h2>
              <p>Al abrir la ficha de una universidad en MiTec, clasifica la información que encuentres en tres niveles de certeza:</p>
              
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
                  <p>Equivalencias de materias específicas para tu plan de estudios y disponibilidad de cupos en el periodo. Se aclara con tu Director de Programa o Programas Internacionales.</p>
                </div>
              </div>
            </section>
          )}

          {/* Protocol Row */}
          <section className="panel">
            <h2>¿Qué hacer si un dato es &quot;Pendiente&quot;?</h2>
            <p>
              No completes vacíos de información con suposiciones de redes sociales o respuestas de Inteligencia Artificial.
            </p>
            <div className="two-col mt-4">
              <div>
                <h4>1. Formular una duda concreta</h4>
                <p>Escribe tu duda de forma específica en el <strong>Paso 5 de tu Pasaporte</strong>.</p>
              </div>
              <div>
                <h4>2. Asignar canal y fecha</h4>
                <p>Elige al responsable institucional oficial para resolverla y establece una fecha límite de consulta.</p>
              </div>
            </div>
          </section>

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
                <li><strong>Pendiente:</strong> Acreditaciones y equivalencias de materias (validación con Director de Programa).</li>
              </ul>
            </section>
          </div>

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
