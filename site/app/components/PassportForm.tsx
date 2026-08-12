"use client";

import { useEffect, useMemo, useState } from "react";

const storageKey = "antes-destino-pasaporte-mentoria-v1";
const sharePointUrl =
  "https://tecmx.sharepoint.com/sites/MiExperienciaInternacional/SitePages/Home.aspx?csf=1&web=1&share=IQBGBxjko62qSL-F7-3GE9VvAea2muq5nupNF0SO4FEbkzU&e=aKUb7z&CID=70e9f9bf-fab2-4344-aaf8-a9ef0c4352ce";

const channels = [
  "Programas Internacionales",
  "Dirección de Programa",
  "Mentoría",
  "Trabajo autónomo",
] as const;

type ExportView = "full" | "pi" | "mentor";

type Passport = {
  name: string;
  studentId: string;
  sessionDate: string;
  startingQuestion: string;
  expectedSupport: string;
  desiredExperience: string;
  missingOpportunity: string;
  priority: string;
  tension: string;
  sourceConsulted: string;
  understood: string;
  unresolved: string;
  focusedQuestion: string;
  routes: string[];
  routeContext: string;
  nextAction: string;
  actionDate: string;
  evidence: string;
  followUp: string;
};

type Draft = Omit<Passport, "name" | "studentId">;

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm: Passport = {
  name: "",
  studentId: "",
  sessionDate: today(),
  startingQuestion: "",
  expectedSupport: "",
  desiredExperience: "",
  missingOpportunity: "",
  priority: "",
  tension: "",
  sourceConsulted: "",
  understood: "",
  unresolved: "",
  focusedQuestion: "",
  routes: [],
  routeContext: "",
  nextAction: "",
  actionDate: "",
  evidence: "",
  followUp: "",
};

function draftFrom(form: Passport): Draft {
  const { name, studentId, ...draft } = form;
  void name;
  void studentId;
  return draft;
}

function display(value: string) {
  return value.trim() || "No definido";
}

export function PassportForm() {
  const [form, setForm] = useState<Passport>(emptyForm);
  const [ready, setReady] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [draftEnabled, setDraftEnabled] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");
  const [exported, setExported] = useState(false);
  const [exportView, setExportView] = useState<ExportView>("full");
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    let parsed: { draft?: Partial<Draft>; savedAt?: string } | undefined;
    if (saved) {
      try {
        parsed = JSON.parse(saved) as { draft?: Partial<Draft>; savedAt?: string };
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    const timeout = window.setTimeout(() => {
      if (parsed) {
        setForm((current) => ({ ...current, ...parsed?.draft, name: "", studentId: "" }));
        setDraftEnabled(true);
        setLastSaved(parsed.savedAt ?? "");
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready || !draftEnabled) return;
    const savedAt = new Date().toISOString();
    window.localStorage.setItem(storageKey, JSON.stringify({ draft: draftFrom(form), savedAt }));
    const timeout = window.setTimeout(() => setLastSaved(savedAt), 0);
    return () => window.clearTimeout(timeout);
  }, [form, ready, draftEnabled]);

  const hasContent = useMemo(
    () => Object.entries(form).some(([key, value]) => {
      if (key === "sessionDate") return false;
      return Array.isArray(value) ? value.length > 0 : Boolean(value);
    }),
    [form],
  );

  useEffect(() => {
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      if (!hasContent || exported) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [hasContent, exported]);

  function update<K extends keyof Passport>(field: K, value: Passport[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setExported(false);
  }

  function toggleRoute(route: string) {
    const routes = form.routes.includes(route)
      ? form.routes.filter((item) => item !== route)
      : [...form.routes, route];
    update("routes", routes);
  }

  function toggleDraft(enabled: boolean) {
    setDraftEnabled(enabled);
    if (!enabled) {
      window.localStorage.removeItem(storageKey);
      setLastSaved("");
    }
  }

  function clearForm() {
    if (!window.confirm("¿Seguro que quieres borrar todo tu Pasaporte de decisión y el borrador local?")) return;
    setForm({ ...emptyForm, sessionDate: today() });
    window.localStorage.removeItem(storageKey);
    setDraftEnabled(false);
    setLastSaved("");
    setExported(false);
    setActiveStep(1);
  }

  function documentText(view: ExportView) {
    const header = [
      "PASAPORTE DE DECISIÓN INTERNACIONAL",
      `Nombre: ${display(form.name)}`,
      `Matrícula: ${display(form.studentId)}`,
      `Fecha: ${display(form.sessionDate)}`,
      "",
    ];
    const common = [
      "DUDA O DECISIÓN ENFOCADA",
      display(form.focusedQuestion || form.startingQuestion),
      "",
      `Canales de apoyo: ${form.routes.join(", ") || "No definidos"}`,
      `Contexto para canalizar: ${display(form.routeContext)}`,
      "",
      "ACUERDO",
      `Siguiente acción: ${display(form.nextAction)}`,
      `Fecha: ${display(form.actionDate)}`,
      `Evidencia de avance: ${display(form.evidence)}`,
      `Seguimiento: ${display(form.followUp)}`,
    ];
    if (view === "pi") {
      return [...header, "PARA CONSULTA INSTITUCIONAL", `Fuente consultada: ${display(form.sourceConsulted)}`, `Lo que entendí: ${display(form.understood)}`, `Lo que sigue sin estar claro: ${display(form.unresolved)}`, "", ...common].join("\n");
    }
    if (view === "mentor") {
      return [...header, "SÍNTESIS DE MENTORÍA", `Motivo de consulta: ${display(form.startingQuestion)}`, `Apoyo esperado: ${display(form.expectedSupport)}`, `Experiencia buscada: ${display(form.desiredExperience)}`, `Oportunidad que no encuentra hoy: ${display(form.missingOpportunity)}`, `Criterio prioritario: ${display(form.priority)}`, `Tensión principal: ${display(form.tension)}`, "", ...common].join("\n");
    }
    return [...header, "EXPLORACIÓN", `Motivo de consulta: ${display(form.startingQuestion)}`, `Apoyo esperado: ${display(form.expectedSupport)}`, `Experiencia buscada: ${display(form.desiredExperience)}`, `Oportunidad que no encuentra hoy: ${display(form.missingOpportunity)}`, `Criterio prioritario: ${display(form.priority)}`, `Tensión principal: ${display(form.tension)}`, "", "EXPLORACIÓN PRELIMINAR DE PI", `Fuente consultada: ${display(form.sourceConsulted)}`, `Lo que entendí: ${display(form.understood)}`, `Lo que sigue sin estar claro: ${display(form.unresolved)}`, "", ...common].join("\n");
  }

  function download(view: ExportView) {
    const blob = new Blob([documentText(view)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `pasaporte-decision-${view}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setShareMessage("Copia descargada. Guárdala y compártela con tu mentor o mentora.");
  }

  async function share(view: ExportView) {
    const file = new File([documentText(view)], `pasaporte-decision-${view}.txt`, { type: "text/plain" });
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      try {
        await navigator.share({ title: "Pasaporte de decisión", text: "Comparto mi Pasaporte para dar seguimiento a la sesión.", files: [file] });
        setExported(true);
        setShareMessage("Se abrió el menú para compartir. Confirma que tu mentor o mentora recibió el archivo.");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    download(view);
    setShareMessage("Tu navegador no permite compartir el archivo directamente. Se descargó para que lo adjuntes en correo o WhatsApp.");
  }

  function print(view: ExportView) {
    setExportView(view);
    setExported(true);
    setShareMessage("Se abrió la impresión. Elige “Guardar como PDF” para conservar una copia.");
    window.setTimeout(() => window.print(), 0);
  }

  const steps = [
    { id: 1, name: "Llegada" },
    { id: 2, name: "Propósito" },
    { id: 3, name: "Criterios" },
    { id: 4, name: "Exploración" },
    { id: 5, name: "Ruta" },
  ];

  return (
    <div className="content-stack">
      <section className="panel privacy-panel no-print" aria-labelledby="draft-title">
        <div>
          <p className="section-label">Antes de comenzar</p>
          <h2 id="draft-title">Tú controlas este documento</h2>
          <p>El sitio no envía tus respuestas. Descarga el Pasaporte y compártelo con tu mentor o mentora por correo o WhatsApp para respaldarlo.</p>
        </div>
        <div className="draft-toggle">
          <input id="draft-enabled" type="checkbox" checked={draftEnabled} onChange={(event) => toggleDraft(event.target.checked)} />
          <label htmlFor="draft-enabled"><strong>Conservar un borrador en este dispositivo</strong><small>Úsalo sólo si es personal. Nombre y matrícula no se guardan.</small></label>
        </div>
        {draftEnabled && <p className="draft-status" aria-live="polite">{lastSaved ? `Borrador local activo · última actualización ${new Date(lastSaved).toLocaleString("es-MX")}` : "Activando borrador local…"}</p>}
      </section>

      <div className="step-progress-wrapper no-print">
        <div className="step-progress-bar">
          {steps.map((step) => (
            <button key={step.id} onClick={() => setActiveStep(step.id)} className={`step-dot-btn ${activeStep === step.id ? "active" : ""} ${activeStep > step.id ? "completed" : ""}`} type="button" aria-label={`Ir al paso ${step.id}: ${step.name}`}>
              <span className="step-dot-number">{step.id}</span><span className="step-dot-label">{step.name}</span>
            </button>
          ))}
        </div>
      </div>

      <form className="passport-form-container" onSubmit={(event) => event.preventDefault()}>
        {activeStep === 1 && (
          <section className="panel panel-accent animated-fade">
            <span className="step-badge">Paso 1 de 5 · Llegada</span>
            <h2>¿Qué necesitas de esta conversación?</h2>
            <p className="step-instruction">Tu mentor o mentora utilizará estas respuestas para enfocar la exploración contigo.</p>
            <div className="field-grid">
              <div className="field"><label htmlFor="name">Nombre</label><input id="name" type="text" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Tu nombre" /></div>
              <div className="field"><label htmlFor="studentId">Matrícula <small>No se guarda en el borrador local.</small></label><input id="studentId" type="text" autoComplete="off" value={form.studentId} onChange={(event) => update("studentId", event.target.value)} placeholder="A0…" /></div>
              <div className="field full"><label htmlFor="startingQuestion">¿Qué decisión o duda te trae hoy?</label><textarea id="startingQuestion" value={form.startingQuestion} onChange={(event) => update("startingQuestion", event.target.value)} placeholder="Todavía no sé qué tipo de experiencia se relaciona mejor con…" /></div>
              <div className="field full"><label htmlFor="expectedSupport">Al terminar esta conversación me sería útil…</label><input id="expectedSupport" type="text" value={form.expectedSupport} onChange={(event) => update("expectedSupport", event.target.value)} placeholder="Ordenar mis opciones, aclarar un criterio o preparar una pregunta…" /></div>
            </div>
          </section>
        )}

        {activeStep === 2 && (
          <section className="panel animated-fade">
            <span className="step-badge">Paso 2 de 5 · Propósito y oportunidad</span>
            <h2>¿Qué buscas vivir o aprender?</h2>
            <p className="step-instruction">No elijas todavía un destino. Describe la diferencia que esperas que esta experiencia produzca en tu trayectoria.</p>
            <div className="field-grid">
              <div className="field full"><label htmlFor="desiredExperience">¿Qué te gustaría aprender, practicar o experimentar?</label><textarea id="desiredExperience" value={form.desiredExperience} onChange={(event) => update("desiredExperience", event.target.value)} placeholder="Quiero trabajar con…, profundizar en…, desenvolverme en…" /></div>
              <div className="field full"><label htmlFor="missingOpportunity">¿Qué oportunidad no encuentras hoy en tu programa, campus o trayectoria en el Tec?</label><textarea id="missingOpportunity" value={form.missingOpportunity} onChange={(event) => update("missingOpportunity", event.target.value)} placeholder="Una especialización, enfoque, contexto cultural, red o forma de aprendizaje…" /></div>
            </div>
          </section>
        )}

        {activeStep === 3 && (
          <section className="panel animated-fade">
            <span className="step-badge">Paso 3 de 5 · Criterios y tensión</span>
            <h2>¿Qué quieres proteger al decidir?</h2>
            <p className="step-instruction">Un criterio cobra valor cuando puedes explicar por qué importa y qué tensión produce frente a otras prioridades.</p>
            <div className="field-grid">
              <div className="field full"><label htmlFor="priority">Mi criterio más importante es… porque…</label><textarea id="priority" value={form.priority} onChange={(event) => update("priority", event.target.value)} placeholder="La oferta académica especializada es prioritaria porque…" /></div>
              <div className="field full"><label htmlFor="tension">¿Entre qué dos prioridades o posibilidades sientes tensión?</label><textarea id="tension" value={form.tension} onChange={(event) => update("tension", event.target.value)} placeholder="Entre una opción con mayor afinidad académica y otra con una red de apoyo más accesible…" /></div>
            </div>
          </section>
        )}

        {activeStep === 4 && (
          <section className="panel panel-dark animated-fade">
            <span className="step-badge">Paso 4 de 5 · Escaneo oficial</span>
            <h2>Explora preliminarmente la información de PI</h2>
            <p className="step-instruction">Dedica hasta cinco minutos: abre una fuente oficial, registra una idea que comprendiste y algo que sigue sin estar claro. No necesitas elegir universidad hoy.</p>
            <p><a className="inline-official-link" href={sharePointUrl} target="_blank" rel="noreferrer">Abrir Mi Experiencia Internacional ↗</a></p>
            <div className="field-grid">
              <div className="field full"><label htmlFor="sourceConsulted">Fuente o sección consultada</label><input id="sourceConsulted" type="text" value={form.sourceConsulted} onChange={(event) => update("sourceConsulted", event.target.value)} placeholder="Oferta de programas, calendario, requisitos…" /></div>
              <div className="field"><label htmlFor="understood">Lo que entendí</label><textarea id="understood" value={form.understood} onChange={(event) => update("understood", event.target.value)} placeholder="La oferta se consulta por…" /></div>
              <div className="field"><label htmlFor="unresolved">Lo que sigue sin estar claro</label><textarea id="unresolved" value={form.unresolved} onChange={(event) => update("unresolved", event.target.value)} placeholder="No puedo determinar si…" /></div>
            </div>
          </section>
        )}

        {activeStep === 5 && (
          <section className="panel animated-fade">
            <span className="step-badge">Paso 5 de 5 · Duda y continuidad</span>
            <h2>Formula una duda y construye su ruta</h2>
            <p className="step-instruction">La misma duda puede requerir apoyos distintos. Escríbela una vez y señala qué necesitas de cada canal.</p>
            <div className="field-grid">
              <div className="field full"><label htmlFor="focusedQuestion">Mi duda o decisión enfocada</label><textarea id="focusedQuestion" value={form.focusedQuestion} onChange={(event) => update("focusedQuestion", event.target.value)} placeholder="Después de revisar…, necesito saber… para poder decidir…" /></div>
              <fieldset className="field full"><legend>¿Qué canales pueden ayudar?</legend><div className="choice-grid">{channels.map((channel) => <label className="choice" key={channel}><input type="checkbox" checked={form.routes.includes(channel)} onChange={() => toggleRoute(channel)} /><span>{channel}</span></label>)}</div></fieldset>
              <div className="field full"><label htmlFor="routeContext">¿Qué necesitas específicamente de esos canales?</label><textarea id="routeContext" value={form.routeContext} onChange={(event) => update("routeContext", event.target.value)} placeholder="PI: confirmar… · Dirección: revisar… · Mentoría: ayudarme a valorar…" /></div>
              <div className="field"><label htmlFor="nextAction">Siguiente acción</label><input id="nextAction" type="text" value={form.nextAction} onChange={(event) => update("nextAction", event.target.value)} placeholder="Enviar la pregunta, agendar una conversación…" /></div>
              <div className="field"><label htmlFor="actionDate">Fecha acordada</label><input id="actionDate" type="date" value={form.actionDate} onChange={(event) => update("actionDate", event.target.value)} /></div>
              <div className="field"><label htmlFor="evidence">¿Cómo sabrás que avanzaste?</label><input id="evidence" type="text" value={form.evidence} onChange={(event) => update("evidence", event.target.value)} placeholder="Tendré respuesta, lista corta, cita agendada…" /></div>
              <div className="field"><label htmlFor="followUp">Acuerdo de seguimiento</label><input id="followUp" type="text" value={form.followUp} onChange={(event) => update("followUp", event.target.value)} placeholder="Compartiré el resultado con mi mentor/a…" /></div>
            </div>
          </section>
        )}

        <section className={`panel passport-print-view only-print export-${exportView}`}>
          <h2>Pasaporte de Decisión Internacional</h2>
          <p><strong>Nombre:</strong> {display(form.name)} · <strong>Matrícula:</strong> {display(form.studentId)} · <strong>Fecha:</strong> {display(form.sessionDate)}</p>
          {exportView !== "pi" && <div className="print-section"><h3>Síntesis de exploración</h3><p><strong>Motivo:</strong> {display(form.startingQuestion)}</p><p><strong>Apoyo esperado:</strong> {display(form.expectedSupport)}</p><p><strong>Experiencia buscada:</strong> {display(form.desiredExperience)}</p><p><strong>Oportunidad buscada:</strong> {display(form.missingOpportunity)}</p><p><strong>Criterio prioritario:</strong> {display(form.priority)}</p><p><strong>Tensión:</strong> {display(form.tension)}</p></div>}
          {exportView !== "mentor" && <div className="print-section"><h3>Exploración preliminar de PI</h3><p><strong>Fuente:</strong> {display(form.sourceConsulted)}</p><p><strong>Lo que entendí:</strong> {display(form.understood)}</p><p><strong>Lo que sigue sin estar claro:</strong> {display(form.unresolved)}</p></div>}
          <div className="print-section"><h3>Duda y ruta de seguimiento</h3><p><strong>Duda o decisión:</strong> {display(form.focusedQuestion)}</p><p><strong>Canales:</strong> {form.routes.join(", ") || "No definidos"}</p><p><strong>Qué necesito:</strong> {display(form.routeContext)}</p><p><strong>Acción:</strong> {display(form.nextAction)}</p><p><strong>Fecha:</strong> {display(form.actionDate)}</p><p><strong>Evidencia:</strong> {display(form.evidence)}</p><p><strong>Seguimiento:</strong> {display(form.followUp)}</p></div>
          <p className="print-disclaimer">Este documento organiza una reflexión y preguntas de seguimiento. Requisitos, oferta, costos, fechas y equivalencias deben confirmarse en fuentes y canales institucionales.</p>
        </section>

        <div className="actions no-print">
          {activeStep > 1 && <button className="button button-secondary" type="button" onClick={() => setActiveStep((step) => step - 1)}>Anterior</button>}
          {activeStep < 5 ? <button className="button button-primary" type="button" onClick={() => setActiveStep((step) => step + 1)}>Siguiente paso</button> : <span className="save-status-badge">Revisa y respalda tu Pasaporte</span>}
        </div>

        {activeStep === 5 && (
          <section className="panel export-panel no-print" aria-labelledby="export-title">
            <p className="section-label">Cierre de la sesión</p>
            <h2 id="export-title">Descarga y comparte tu Pasaporte</h2>
            <p>Elige la copia pertinente. El sitio no la envía ni conserva: tú decides dónde guardarla y con quién compartirla.</p>
            <div className="export-grid">
              <div><h3>Copia completa</h3><p>Para ti y, si lo decides, para tu mentor/a.</p><div className="mini-actions"><button className="button button-primary" type="button" onClick={() => print("full")}>Guardar PDF</button><button className="button button-secondary" type="button" onClick={() => share("full")}>Compartir</button><button className="text-button" type="button" onClick={() => download("full")}>Descargar texto</button></div></div>
              <div><h3>Hoja para PI o Dirección</h3><p>Incluye fuente, duda, canal y siguiente acción.</p><div className="mini-actions"><button className="button button-secondary" type="button" onClick={() => print("pi")}>Guardar PDF</button><button className="text-button" type="button" onClick={() => share("pi")}>Compartir</button></div></div>
              <div><h3>Resumen de mentoría</h3><p>Exploración, intereses y acuerdos para continuidad/CRM.</p><div className="mini-actions"><button className="button button-secondary" type="button" onClick={() => print("mentor")}>Guardar PDF</button><button className="text-button" type="button" onClick={() => share("mentor")}>Compartir</button></div></div>
            </div>
            {shareMessage && <p className="export-message" aria-live="polite">{shareMessage}</p>}
          </section>
        )}

        <div className="status-row no-print" aria-live="polite">
          <span className="save-status">{draftEnabled ? "Borrador local activado; descarga una copia antes de salir." : "Sin guardado local; descarga una copia antes de salir."}</span>
          <button className="button button-danger" type="button" onClick={clearForm}>Borrar todo</button>
        </div>
      </form>
    </div>
  );
}
