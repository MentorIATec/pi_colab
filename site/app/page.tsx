import Link from "next/link";
import type { CSSProperties } from "react";
import { OfficialResourcesCarousel } from "./components/OfficialResourcesCarousel";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const resources = [
  {
    href: "/pasaporte",
    eyebrow: "Durante el taller",
    title: "Guía de exploración",
    description:
      "Relaciona la experiencia que quieres construir con lo que necesitas confirmar para hacerla posible.",
    tone: "violet",
  },
  {
    href: "/guia-mitec",
    eyebrow: "Consulta técnica",
    title: "Oferta y requisitos en MiTec",
    description:
      "Ubica la oferta, revisa requisitos y distingue la información confirmada de lo que todavía necesitas consultar.",
    tone: "sky",
  },
  {
    href: "/recursos",
    eyebrow: "Exploración autónoma",
    title: "Preguntas para investigar",
    description:
      "Profundiza en planes, investigación, rankings, ciudades y costos, o contrasta dos opciones con los mismos criterios.",
    tone: "sand",
  },
];

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <>
      <SiteHeader />
      <main>
        <section
          className="hero hero-brujula"
          style={{ "--hero-image": `url("${basePath}/hero-brujula-internacional.webp")` } as CSSProperties}
        >
          <div className="shell hero-brujula-inner">
            <div className="hero-copy">
              <p className="kicker">Acompañamiento para tu experiencia internacional</p>
              <h1>Haz de tu experiencia internacional un paso clave en tu formación.</h1>
              <p className="hero-lede">
                No se trata sólo de elegir un destino. Conecta lo que quieres aprender, vivir y desarrollar con las opciones académicas y los requisitos para hacer posible esa experiencia.
              </p>
              <p className="hero-entry">Puedes comenzar con muchas dudas o con una opción en mente.</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/pasaporte">
                  Comenzar mi exploración
                </Link>
                <Link className="button button-secondary" href="/guia-mitec">
                  Consultar MiTec
                </Link>
              </div>
            </div>
          </div>
        </section>

        <OfficialResourcesCarousel basePath={basePath} />

        <section className="shell resource-section" aria-labelledby="resources-title">
          <div className="section-heading">
            <p className="section-label">Recursos de trabajo</p>
            <h2 id="resources-title">Recursos para explorar tus opciones.</h2>
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

        <section className="shell boundary-card boundary-card-text" aria-labelledby="boundary-title">
          <div className="boundary-copy">
            <p className="kicker" style={{ margin: "0 0 10px" }}>Límites de alcance</p>
            <h2 id="boundary-title" style={{ fontSize: "28px", margin: "0 0 16px" }}>Una decisión con dos rutas.</h2>
            <p>
              Aquí puedes construir qué esperas de una experiencia internacional y reconocer qué información necesitas confirmar. El sitio no realiza trámites ni reserva lugares.
            </p>
            <p className="source-note">
              Requisitos, fechas, costos, convenios y disponibilidad se consultan en <strong>Mi Experiencia Internacional en MiTec</strong> y con Programas Internacionales o Dirección de Programa, según corresponda.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
