"use client";

import { useState } from "react";

const sharePointUrl =
  "https://tecmx.sharepoint.com/sites/MiExperienciaInternacional/SitePages/Home.aspx?csf=1&web=1&share=IQBGBxjko62qSL-F7-3GE9VvAea2muq5nupNF0SO4FEbkzU&e=aKUb7z&CID=70e9f9bf-fab2-4344-aaf8-a9ef0c4352ce";

const slides = [
  {
    image: "/pi-ruta-inicial.png",
    label: "Panorama del proceso",
    title: "Ruta inicial de Programas Internacionales",
    description:
      "Reconoce las acciones que van desde consultar el calendario y asistir a una sesión informativa hasta preparar tu perfil y aplicar.",
    note: "La secuencia orienta tu exploración; los requisitos y pasos aplicables deben confirmarse en la fuente oficial.",
    alt: "Ruta de ocho pasos de Programas Internacionales: calendario, sesión informativa, explorar opciones, requisitos, preparar perfil, pasaporte, conocer experiencias y aplicar.",
  },
  {
    image: "/pi-calendario-feb-jun-2027.png",
    label: "Referencia fechada",
    title: "Calendario de rondas · febrero–junio 2027",
    description:
      "Consulta las etapas de cierre anticipado, rondas uno y dos, y asignación FIFO para el periodo indicado.",
    note: "Las fechas pueden cambiar. Antes de tomar una acción, confirma siempre el calendario vigente en SharePoint.",
    alt: "Calendario de rondas para experiencias internacionales del periodo febrero a junio de 2027, con fechas de consulta, solicitud, resultado, confirmación y entrega de documentos.",
  },
] as const;

export function OfficialResourcesCarousel({ basePath = "" }: { basePath?: string }) {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const imageUrl = `${basePath}${slide.image}`;

  function move(direction: number) {
    setActive((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <section className="official-resources" aria-labelledby="official-resources-title">
      <div className="shell">
        <div className="official-heading">
          <div>
            <p className="section-label">Información oficial de PI</p>
            <h2 id="official-resources-title">Conoce el proceso y consulta la información oficial.</h2>
            <p>
              Estas piezas ofrecen un primer panorama. SharePoint de Programas
              Internacionales conserva la información vigente y completa.
            </p>
          </div>
          <a className="button button-primary" href={sharePointUrl} target="_blank" rel="noreferrer">
            Abrir sitio oficial de PI <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div
          className="official-carousel"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Recursos de Programas Internacionales"
          aria-live="polite"
        >
          <div className="official-slide">
            <div className="official-slide-copy">
              <p className="official-slide-count">{active + 1} / {slides.length}</p>
              <p className="resource-eyebrow">{slide.label}</p>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              <p className="official-validity-note">{slide.note}</p>
              <div className="official-slide-actions">
                <a href={imageUrl} target="_blank" rel="noreferrer">Ver imagen completa ↗</a>
                <a href={sharePointUrl} target="_blank" rel="noreferrer">Confirmar en SharePoint ↗</a>
              </div>
            </div>
            <div className={`official-image-frame ${active === 1 ? "is-portrait" : ""}`}>
              <img src={imageUrl} alt={slide.alt} />
            </div>
          </div>

          <div className="carousel-controls no-print">
            <button type="button" onClick={() => move(-1)} aria-label="Ver recurso anterior">←</button>
            <div className="carousel-dots" aria-label="Seleccionar recurso">
              {slides.map((item, index) => (
                <button
                  type="button"
                  className={index === active ? "active" : ""}
                  aria-label={`Ver: ${item.title}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => setActive(index)}
                  key={item.title}
                />
              ))}
            </div>
            <button type="button" onClick={() => move(1)} aria-label="Ver recurso siguiente">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
