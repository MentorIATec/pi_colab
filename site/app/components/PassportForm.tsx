"use client";

import { useEffect, useState } from "react";

const storageKey = "antes-destino-pasaporte-v3"; // New schema version

type Passport = {
  purpose: string;
  filter1: string;
  filter2: string;
  preference1: string;
  preference2: string;
  candidateOption: string;
  confirmedData: string;
  pendingData: string;
  question: string;
  owner: string;
  action: string;
  date: string;
};

const emptyForm: Passport = {
  purpose: "",
  filter1: "",
  filter2: "",
  preference1: "",
  preference2: "",
  candidateOption: "",
  confirmedData: "",
  pendingData: "",
  question: "",
  owner: "",
  action: "",
  date: "",
};

export function PassportForm() {
  const [form, setForm] = useState<Passport>(emptyForm);
  const [ready, setReady] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Load from local storage asynchronously to satisfy React lint rules
  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => {
          setForm((current) => ({ ...current, ...parsed }));
          setReady(true);
        }, 0);
        return;
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setTimeout(() => {
      setReady(true);
    }, 0);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(storageKey, JSON.stringify(form));
    }
  }, [form, ready]);

  function update(field: keyof Passport, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function clearForm() {
    if (window.confirm("¿Seguro que quieres borrar todo tu pasaporte de decisión?")) {
      setForm(emptyForm);
      window.localStorage.removeItem(storageKey);
      setActiveStep(1);
    }
  }

  const steps = [
    { id: 1, name: "Propósito" },
    { id: 2, name: "Viabilidad" },
    { id: 3, name: "Criterios" },
    { id: 4, name: "MiTec" },
    { id: 5, name: "Validación" },
  ];

  return (
    <div className="content-stack">
      {/* Progress Bar */}
      <div className="step-progress-wrapper no-print">
        <div className="step-progress-bar">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`step-dot-btn ${activeStep === step.id ? "active" : ""} ${activeStep > step.id ? "completed" : ""}`}
              type="button"
              aria-label={`Ir al paso ${step.id}: ${step.name}`}
            >
              <span className="step-dot-number">{step.id}</span>
              <span className="step-dot-label">{step.name}</span>
            </button>
          ))}
        </div>
      </div>

      <form className="passport-form-container" onSubmit={(event) => event.preventDefault()}>
        
        {/* STEP 1: PROPÓSITO */}
        {activeStep === 1 && (
          <section className="panel panel-accent animated-fade">
            <span className="step-badge">Paso 1 de 5 · Desarrollo Académico y Profesional</span>
            <h2>¿Para qué viajas?</h2>
            <p className="step-instruction">Define el impacto que buscas en tu desarrollo académico o profesional. Enfócate en las competencias o experiencias específicas que quieres obtener.</p>
            <div className="field">
              <label htmlFor="purpose">Quiero realizar una experiencia internacional para...</label>
              <textarea
                id="purpose"
                value={form.purpose}
                onChange={(event) => update("purpose", event.target.value)}
                placeholder="ej. Acceder a laboratorios de robótica de vanguardia y vincularme con ecosistemas industriales locales de automatización."
                rows={4}
              />
            </div>
          </section>
        )}

        {/* STEP 2: VIABILIDAD */}
        {activeStep === 2 && (
          <section className="panel animated-fade">
            <span className="step-badge">Paso 2 de 5 · Factores Límite</span>
            <h2>Condiciones de viabilidad</h2>
            <p className="step-instruction">Requisitos no negociables que, de no cumplirse, descartan cualquier opción de destino en el portal oficial.</p>
            <div className="field-grid">
              <div className="field">
                <label htmlFor="filter1">Factor Límite 1 (Promedio / Idioma)</label>
                <input
                  id="filter1"
                  type="text"
                  value={form.filter1}
                  onChange={(event) => update("filter1", event.target.value)}
                  placeholder="ej. Promedio académico mínimo de 85 e inglés B2 certificado"
                />
              </div>
              <div className="field">
                <label htmlFor="filter2">Factor Límite 2 (Presupuesto)</label>
                <input
                  id="filter2"
                  type="text"
                  value={form.filter2}
                  onChange={(event) => update("filter2", event.target.value)}
                  placeholder="ej. Presupuesto total máximo disponible de $150,000 MXN para el semestre"
                />
              </div>
            </div>
          </section>
        )}

        {/* STEP 3: CRITERIOS */}
        {activeStep === 3 && (
          <section className="panel animated-fade">
            <span className="step-badge">Paso 3 de 5 · Deseables</span>
            <h2>Criterios de elección</h2>
            <p className="step-instruction">Aspectos importantes que orientan tus preferencias, pero que estás dispuesto a negociar o adaptar si es necesario.</p>
            <div className="field-grid">
              <div className="field">
                <label htmlFor="preference1">Preferencia de desarrollo</label>
                <input
                  id="preference1"
                  type="text"
                  value={form.preference1}
                  onChange={(event) => update("preference1", event.target.value)}
                  placeholder="ej. Aprendizaje basado en proyectos y vinculación con la industria local"
                />
              </div>
              <div className="field">
                <label htmlFor="preference2">Preferencia de entorno</label>
                <input
                  id="preference2"
                  type="text"
                  value={form.preference2}
                  onChange={(event) => update("preference2", event.target.value)}
                  placeholder="ej. Universidad ubicada en una ciudad mediana con facilidades de alojamiento estudiantil"
                />
              </div>
            </div>
          </section>
        )}

        {/* STEP 4: MITEC EXPLORATION */}
        {activeStep === 4 && (
          <section className="panel panel-dark animated-fade">
            <span className="step-badge">Paso 4 de 5 · Búsqueda Dirigida</span>
            <h2>Consulta de opciones en MiTec</h2>
            <p className="step-instruction">Ingresa a <strong>Mi Experiencia Internacional</strong> en MiTec, aplica tus condiciones de viabilidad y registra los datos de una opción que cumpla con tu perfil.</p>
            <div className="field-grid">
              <div className="field full">
                <label htmlFor="candidateOption">Universidad o programa de interés</label>
                <input
                  id="candidateOption"
                  type="text"
                  value={form.candidateOption}
                  onChange={(event) => update("candidateOption", event.target.value)}
                  placeholder="ej. Universitat Politècnica de València"
                />
              </div>
              <div className="field">
                <label htmlFor="confirmedData">Datos y requisitos oficiales confirmados (colegiatura, promedio, idioma)</label>
                <input
                  id="confirmedData"
                  type="text"
                  value={form.confirmedData}
                  onChange={(event) => update("confirmedData", event.target.value)}
                  placeholder="ej. Requisito de idioma inglés B2, promedio mínimo de 80"
                />
              </div>
              <div className="field">
                <label htmlFor="pendingData">Datos pendientes de validación (equivalencia de materias, hospedaje, etc.)</label>
                <input
                  id="pendingData"
                  type="text"
                  value={form.pendingData}
                  onChange={(event) => update("pendingData", event.target.value)}
                  placeholder="ej. Compatibilidad académica de materias del quinto semestre"
                />
              </div>
            </div>
          </section>
        )}

        {/* STEP 5: VALIDATION */}
        {activeStep === 5 && (
          <section className="panel animated-fade">
            <span className="step-badge">Paso 5 de 5 · Plan de Acción</span>
            <h2>Plan de validación institucional</h2>
            <p className="step-instruction">Convierte las dudas pendientes en un plan de acción concreto para consultar con las áreas y autoridades correspondientes.</p>
            <div className="field-grid">
              <div className="field full">
                <label htmlFor="question">Duda crítica a validar</label>
                <textarea
                  id="question"
                  value={form.question}
                  onChange={(event) => update("question", event.target.value)}
                  placeholder="ej. ¿Cuáles de las materias del catálogo de la UPV son compatibles con mis materias de concentración en Ingeniería?"
                  rows={2}
                />
              </div>
              <div className="field">
                <label htmlFor="owner">Área o persona responsable de resolver la duda</label>
                <select id="owner" value={form.owner} onChange={(event) => update("owner", event.target.value)}>
                  <option value="">Selecciona al responsable</option>
                  <option value="Dirección de Programa">Dirección de Programa Académico (Equivalencias y revalidación de créditos)</option>
                  <option value="Programas Internacionales">Programas Internacionales (Becas, convenios, procesos de asignación)</option>
                  <option value="Tutoría o Mentoría">Tutoría o Mentoría (Claridad de metas y proyecto de vida)</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="action">Acción específica de consulta</label>
                <input
                  id="action"
                  type="text"
                  value={form.action}
                  onChange={(event) => update("action", event.target.value)}
                  placeholder="ej. Agendar cita presencial con el Director de Programa o enviar correo al asesor de PI."
                />
              </div>
              <div className="field full">
                <label htmlFor="date">Fecha compromiso de validación</label>
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(event) => update("date", event.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {/* Summary Card for Print (Always visible when printing) */}
        <section className="panel passport-print-view only-print">
          <h2>Mi Ruta Internacional — Pasaporte de Decisión</h2>
          <div className="print-grid">
            <div className="print-item"><strong>Propósito Profesional/Académico:</strong> <p>{form.purpose || "No definido"}</p></div>
            <div className="print-item"><strong>Factor de Viabilidad 1:</strong> <p>{form.filter1 || "No definido"}</p></div>
            <div className="print-item"><strong>Factor de Viabilidad 2:</strong> <p>{form.filter2 || "No definido"}</p></div>
            <div className="print-item"><strong>Criterio de Elección 1:</strong> <p>{form.preference1 || "No definido"}</p></div>
            <div className="print-item"><strong>Criterio de Elección 2:</strong> <p>{form.preference2 || "No definido"}</p></div>
            <div className="print-item"><strong>Universidad / Programa de interés:</strong> <p>{form.candidateOption || "No definido"}</p></div>
            <div className="print-item"><strong>Datos oficiales confirmados:</strong> <p>{form.confirmedData || "Ninguno"}</p></div>
            <div className="print-item"><strong>Datos pendientes de validación:</strong> <p>{form.pendingData || "Ninguno"}</p></div>
            <div className="print-item"><strong>Duda crítica a validar:</strong> <p>{form.question || "No definida"}</p></div>
            <div className="print-item"><strong>Responsable de resolver duda:</strong> <p>{form.owner || "No definido"}</p></div>
            <div className="print-item"><strong>Acción de consulta:</strong> <p>{form.action || "No definido"}</p></div>
            <div className="print-item"><strong>Fecha compromiso de validación:</strong> <p>{form.date || "No definida"}</p></div>
          </div>
        </section>

        {/* Navigation buttons */}
        <div className="actions no-print">
          {activeStep > 1 && (
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setActiveStep((prev) => prev - 1)}
            >
              Anterior
            </button>
          )}
          {activeStep < 5 ? (
            <button
              className="button button-primary"
              type="button"
              onClick={() => setActiveStep((prev) => prev + 1)}
            >
              Siguiente Paso
            </button>
          ) : (
            <span className="save-status-badge">¡Completado! Guarda o imprime abajo.</span>
          )}
        </div>

        {/* Status row */}
        <div className="status-row no-print" aria-live="polite">
          <span className="save-status">
            {ready ? "✓ Guardado automático local en este navegador" : "Cargando pasaporte..."}
          </span>
          <button className="button button-danger" type="button" onClick={clearForm}>
            Reiniciar Pasaporte
          </button>
        </div>

      </form>
    </div>
  );
}
