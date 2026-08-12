import Link from "next/link";
import { OfficialResourcesCarousel } from "./components/OfficialResourcesCarousel";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const resources = [
  {
    href: "/pasaporte",
    eyebrow: "Durante el taller",
    title: "Pasaporte de decisión",
    description:
      "Reflexiona con mentoría, explora una fuente oficial y convierte una duda en una ruta de seguimiento.",
    tone: "violet",
  },
  {
    href: "/guia-mitec",
    eyebrow: "Consulta técnica",
    title: "Guía de navegación MiTec",
    description:
      "Consejos prácticos y mapas de campos para buscar universidades y validar la vigencia de convenios en el portal oficial.",
    tone: "sky",
  },
];

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <p className="kicker">Decisiones para Movilidad Estudiantil</p>
            <h1>Planifica tu experiencia internacional con evidencia.</h1>
            <p className="hero-lede">
              Un espacio para estructurar tu proyecto de intercambio. Define tu propósito,
              reconoce tus condiciones reales de partida y genera una ruta de validación institucional.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/pasaporte">
                Comenzar mi Pasaporte
              </Link>
              <Link className="button button-secondary" href="/guia-mitec">
                Ver Guía de MiTec
              </Link>
            </div>
          </div>
          <aside className="hero-card" aria-label="Resultados del pasaporte">
            <p className="hero-card-label">Al salir tendrás</p>
            <ol className="outcome-list">
              <li><span>01</span> Una duda enfocada</li>
              <li><span>02</span> Un propósito personal</li>
              <li><span>03</span> Una prioridad para decidir</li>
              <li><span>04</span> Un contraste con información oficial</li>
              <li><span>05</span> Un siguiente paso con fecha</li>
            </ol>
          </aside>
        </section>

        <OfficialResourcesCarousel basePath={basePath} />

        <section className="agenda-band" aria-labelledby="agenda-title">
          <div className="shell agenda-layout">
            <div>
              <p className="section-label">Metodología de diseño</p>
              <h2 id="agenda-title">Un recorrido guiado en tres fases.</h2>
              <p>
                Sigue una secuencia lógica para estructurar tu intercambio, partiendo de tu realidad hacia la validación oficial.
              </p>
            </div>
            <ol className="agenda-strip agenda-three">
              <li><strong>Fase 1</strong><span>Enfocar</span></li>
              <li><strong>Fase 2</strong><span>Contrastar</span></li>
              <li><strong>Fase 3</strong><span>Actuar</span></li>
            </ol>
          </div>
        </section>

        <section className="shell resource-section" aria-labelledby="resources-title">
          <div className="section-heading">
            <p className="section-label">Recursos de trabajo</p>
            <h2 id="resources-title">Herramientas para el estudiante.</h2>
          </div>
          <div className="resource-grid">
            {resources.map((resource) => (
              <Link
                className={`resource-card tone-${resource.tone}`}
                href={resource.href}
                key={resource.href}
              >
                <span className="resource-eyebrow">{resource.eyebrow}</span>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <span className="resource-link">Abrir recurso <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="shell boundary-card" aria-labelledby="boundary-title">
          <div className="boundary-image-frame">
            <img 
              src={`${basePath}/hero.png`}
              alt="Ilustración 3D de planificación de ruta internacional" 
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div className="boundary-copy">
            <p className="kicker" style={{ margin: "0 0 10px" }}>Límites de alcance</p>
            <h2 id="boundary-title" style={{ fontSize: "28px", margin: "0 0 16px" }}>Planificar no es postular.</h2>
            <p>
              Esta plataforma te orienta a estructurar tus criterios de búsqueda. No gestiona trámites,
              no aparta cupos, ni valida de forma automática equivalencias o presupuestos finales de intercambio.
            </p>
            <p className="source-note">
              La consulta de convocatorias, costos vigentes y requisitos obligatorios debe realizarse en el portal oficial <strong>Mi Experiencia Internacional en MiTec</strong> y validarse con tu Director de Programa Académico o Programas Internacionales.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
