"use client";

import { useEffect, useMemo, useState } from "react";

const storageKey = "antes-destino-pasaporte-mentoria-v2";
const sharePointUrl =
  "https://tecmx.sharepoint.com/sites/MiExperienciaInternacional/SitePages/Home.aspx?csf=1&web=1&share=IQBGBxjko62qSL-F7-3GE9VvAea2muq5nupNF0SO4FEbkzU&e=aKUb7z&CID=70e9f9bf-fab2-4344-aaf8-a9ef0c4352ce";

const channels = [
  "Programas Internacionales",
  "Dirección de Programa",
  "Mentoría",
  "Conversación con estudiantes",
  "Exploración autónoma",
] as const;

type Channel = (typeof channels)[number];

const actionHints: Record<Channel, string[]> = {
  "Programas Internacionales": [
    "Llevar mi pregunta concreta a Programas Internacionales.",
    "Confirmar dónde consultar requisitos, costos o apoyos vigentes.",
    "Revisar el calendario y la ronda aplicable en la fuente oficial.",
  ],
  "Dirección de Programa": [
    "Solicitar una reunión con mi Dirección de Programa.",
    "Llevar dos planes de estudio para conversar sobre su pertinencia.",
    "Preguntar qué criterios académicos conviene revisar antes de elegir.",
  ],
  Mentoría: [
    "Comparar dos opciones usando los mismos criterios.",
    "Conversar sobre la tensión principal de mi decisión.",
    "Preparar la pregunta que llevaré a PI o Dirección de Programa.",
  ],
  "Conversación con estudiantes": [
    "Conversar con alguien que haya vivido una experiencia internacional.",
    "Preguntar por adaptación, vida cotidiana y aprendizajes.",
    "Contrastar experiencias de más de un estudiante.",
  ],
  "Exploración autónoma": [
    "Revisar los planes de estudio de dos o tres universidades.",
    "Comparar enfoques académicos, no sólo ciudades.",
    "Registrar la fuente y fecha de la información consultada.",
  ],
};

type Passport = {
  question: string;
  purpose: string;
  priorities: string;
  officialNotes: string;
  routes: Channel[];
  primaryRoute: Channel | "";
  nextAction: string;
  actionDate: string;
  followUp: string;
  name: string;
  studentId: string;
};

type Draft = Omit<Passport, "name" | "studentId">;

const emptyForm: Passport = {
  question: "",
  purpose: "",
  priorities: "",
  officialNotes: "",
  routes: [],
  primaryRoute: "",
  nextAction: "",
  actionDate: "",
  followUp: "",
  name: "",
  studentId: "",
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
  const [activeStep, setActiveStep] = useState(1);
  const [ready, setReady] = useState(false);
  const [lastSaved, setLastSaved] = useState("");
  const [exported, setExported] = useState(false);
  const [message, setMessage] = useState("");

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
        setLastSaved(parsed.savedAt ?? "");
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const savedAt = new Date().toISOString();
    window.localStorage.setItem(storageKey, JSON.stringify({ draft: draftFrom(form), savedAt }));
    const timeout = window.setTimeout(() => setLastSaved(savedAt), 0);
    return () => window.clearTimeout(timeout);
  }, [form, ready]);

  const hasIdentity = Boolean(form.name || form.studentId);
  useEffect(() => {
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      if (!hasIdentity || exported) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [hasIdentity, exported]);

  const completion = useMemo(() => {
    const answers = [form.question, form.purpose, form.priorities, form.officialNotes, form.nextAction];
    return answers.filter((answer) => answer.trim()).length;
  }, [form]);

  function update<K extends keyof Passport>(field: K, value: Passport[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setExported(false);
    setMessage("");
  }

  function toggleRoute(route: Channel) {
    const selected = form.routes.includes(route);
    const routes = selected ? form.routes.filter((item) => item !== route) : [...form.routes, route];
    const primaryRoute = selected && form.primaryRoute === route ? routes[0] ?? "" : form.primaryRoute || route;
    setForm((current) => ({ ...current, routes, primaryRoute }));
    setExported(false);
  }

  function chooseHint(hint: string) {
    update("nextAction", hint);
  }

  function clearDraft() {
    if (!window.confirm("¿Seguro que quieres borrar las respuestas y el borrador de este navegador?")) return;
    window.localStorage.removeItem(storageKey);
    setForm(emptyForm);
    setLastSaved("");
    setExported(false);
    setMessage("");
    setActiveStep(1);
  }

  function documentText() {
    return [
      "PASAPORTE DE DECISIÓN INTERNACIONAL",
      `Nombre: ${display(form.name)}`,
      `Matrícula: ${display(form.studentId)}`,
      `Fecha de descarga: ${new Date().toLocaleDateString("es-MX")}`,
      "",
      "MI EXPLORACIÓN",
      `Duda o decisión: ${display(form.question)}`,
      `Propósito: ${display(form.purpose)}`,
      `Prioridad y dificultad: ${display(form.priorities)}`,
      "",
      "CONTRASTE CON INFORMACIÓN OFICIAL",
      display(form.officialNotes),
      "",
      "MI RUTA DE SEGUIMIENTO",
      `Canales que pueden ayudar: ${form.routes.join(", ") || "No definidos"}`,
      `Canal prioritario: ${form.primaryRoute || "No definido"}`,
      `Siguiente acción: ${display(form.nextAction)}`,
      `Fecha: ${display(form.actionDate)}`,
      `Cómo lo retomaré: ${display(form.followUp)}`,
      "",
      "Este documento organiza una reflexión y preguntas de seguimiento. La oferta, los requisitos, los costos, las fechas y las equivalencias deben confirmarse en las fuentes y canales institucionales correspondientes.",
    ].join("\n");
  }

  function downloadText() {
    const blob = new Blob([documentText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "pasaporte-decision-internacional.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setMessage("Pasaporte descargado. Compártelo con tu mentor o mentora para respaldar y continuar la conversación.");
  }

  function printPassport() {
    setExported(true);
    setMessage("En la ventana de impresión, elige “Guardar como PDF” para conservar tu Pasaporte.");
    window.setTimeout(() => window.print(), 0);
  }

  async function sharePassport() {
    const file = new File([documentText()], "pasaporte-decision-internacional.txt", { type: "text/plain" });
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      try {
        await navigator.share({ title: "Pasaporte de Decisión", text: "Comparto mi Pasaporte para dar seguimiento a la sesión.", files: [file] });
        setExported(true);
        setMessage("Se abrió el menú para compartir. Confirma que tu mentor o mentora recibió el archivo.");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    downloadText();
    setMessage("Tu navegador no permite compartir directamente. Se descargó el archivo para que lo adjuntes en correo o WhatsApp.");
  }

  async function copyQuestion() {
    const text = [
      `Duda: ${display(form.question)}`,
      `Información revisada: ${display(form.officialNotes)}`,
      `Siguiente acción: ${display(form.nextAction)}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Duda copiada. Puedes pegarla en un correo o mensaje para PI o Dirección de Programa.");
    } catch {
      setMessage("No fue posible copiar automáticamente. Descarga el Pasaporte para conservar la información.");
    }
  }

  const steps = [
    { id: 1, name: "Enfocar" },
    { id: 2, name: "Contrastar" },
    { id: 3, name: "Actuar" },
  ];

  return (
    <div className="content-stack">
      <div className="compact-progress no-print" aria-label={`Paso ${activeStep} de 3`}>
        <span>Paso {activeStep} de 3 · {steps[activeStep - 1].name}</span>
        <div aria-hidden="true"><i style={{ width: `${(activeStep / 3) * 100}%` }} /></div>
      </div>

      <form className="passport-form-container" onSubmit={(event) => event.preventDefault()}>
        {activeStep === 1 && (
          <section className="panel panel-accent animated-fade">
            <span className="step-badge">Fase 1 · Enfocar la conversación</span>
            <h2>Lo que quiero explorar</h2>
            <p className="step-instruction">Responde con frases breves. Tu mentor o mentora puede ayudarte a profundizar.</p>
            <div className="field-grid single-column-fields">
              <div className="field">
                <label htmlFor="question">1. ¿Qué duda o decisión sobre una experiencia internacional te gustaría trabajar hoy?</label>
                <textarea id="question" value={form.question} onChange={(event) => update("question", event.target.value)} placeholder="No sé por dónde comenzar o qué tipo de experiencia se relaciona con…" rows={2} />
              </div>
              <div className="field">
                <label htmlFor="purpose">2. ¿Qué buscas lograr académica, profesional o personalmente con esta experiencia?<small>Piensa en aprendizajes, enfoques, entornos, vínculos o experiencias que podrían ampliar o complementar tu trayectoria actual en el Tec.</small></label>
                <textarea id="purpose" value={form.purpose} onChange={(event) => update("purpose", event.target.value)} placeholder="Profundizar en un área, practicar otro idioma, conocer otra forma de trabajo…" rows={2} />
              </div>
              <div className="field">
                <label htmlFor="priorities">3. ¿Qué es lo más importante para ti al elegir y qué podría dificultar esa decisión?</label>
                <textarea id="priorities" value={form.priorities} onChange={(event) => update("priorities", event.target.value)} placeholder="Quiero cuidar… y necesito considerar…" rows={2} />
              </div>
            </div>
          </section>
        )}

        {activeStep === 2 && (
          <section className="panel panel-dark animated-fade">
            <span className="step-badge">Fase 2 · Contrastar con información oficial</span>
            <h2>Exploración preliminar de PI</h2>
            <p className="step-instruction">Dedica hasta cinco minutos a revisar una fuente oficial. No necesitas elegir una universidad durante esta sesión.</p>
            <a className="button button-primary official-action" href={sharePointUrl} target="_blank" rel="noreferrer">Abrir Mi Experiencia Internacional ↗</a>
            <div className="field official-reflection">
              <label htmlFor="officialNotes">4. Después de explorar, completa estas dos frases:</label>
              <textarea id="officialNotes" value={form.officialNotes} onChange={(event) => update("officialNotes", event.target.value)} placeholder={"Encontré que…\nTodavía necesito aclarar…"} rows={4} />
            </div>
            <div className="question-refinement">
              <label htmlFor="refined-question">Revisa tu duda inicial y afínala si es necesario.<small>No es una pregunta nueva: edita la misma duda con lo que acabas de encontrar.</small></label>
              <textarea id="refined-question" value={form.question} onChange={(event) => update("question", event.target.value)} rows={2} />
            </div>
          </section>
        )}

        {activeStep === 3 && (
          <section className="panel animated-fade">
            <span className="step-badge">Fase 3 · Construir la ruta</span>
            <h2>Mi siguiente paso</h2>
            <p className="step-instruction">Una misma duda puede requerir varios apoyos. Elige con cuál comenzarás y define una acción realizable.</p>

            <fieldset className="field">
              <legend>¿Qué canales pueden ayudarte con esta duda?</legend>
              <div className="choice-grid route-choices">
                {channels.map((channel) => (
                  <label className="choice" key={channel}>
                    <input type="checkbox" checked={form.routes.includes(channel)} onChange={() => toggleRoute(channel)} />
                    <span>{channel}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {form.routes.length > 0 && (
              <div className="field primary-route-field">
                <label htmlFor="primaryRoute">¿Con cuál comenzarás?</label>
                <select id="primaryRoute" value={form.primaryRoute} onChange={(event) => update("primaryRoute", event.target.value as Channel)}>
                  {form.routes.map((route) => <option value={route} key={route}>{route}</option>)}
                </select>
              </div>
            )}

            {form.primaryRoute && (
              <div className="hint-panel">
                <p><strong>Ideas para construir tu siguiente paso</strong><br /><small>Elige una como punto de partida o escribe una acción propia.</small></p>
                <div className="hint-list">
                  {actionHints[form.primaryRoute].map((hint) => <button type="button" key={hint} onClick={() => chooseHint(hint)}>{hint}</button>)}
                </div>
                {form.primaryRoute === "Conversación con estudiantes" && <p className="peer-note">Las experiencias de otros estudiantes aportan perspectiva, pero no confirman requisitos, costos, equivalencias o disponibilidad.</p>}
              </div>
            )}

            <div className="field-grid action-fields">
              <div className="field full"><label htmlFor="nextAction">5. ¿Qué harás después?</label><textarea id="nextAction" value={form.nextAction} onChange={(event) => update("nextAction", event.target.value)} placeholder="Mi siguiente acción concreta será…" rows={2} /></div>
              <div className="field"><label htmlFor="actionDate">¿Para cuándo?</label><input id="actionDate" type="date" value={form.actionDate} onChange={(event) => update("actionDate", event.target.value)} /></div>
              <div className="field"><label htmlFor="followUp">¿Cómo lo retomarás?</label><select id="followUp" value={form.followUp} onChange={(event) => update("followUp", event.target.value)}><option value="">Selecciona una opción</option><option value="Lo compartiré con mi mentor/a al completarlo">Lo compartiré con mi mentor/a</option><option value="Lo retomaremos en una sesión posterior">Lo retomaremos en otra sesión</option><option value="Daré seguimiento de forma autónoma">Daré seguimiento de forma autónoma</option><option value="Por definir">Por definir</option></select></div>
            </div>

            <div className="identity-block">
              <div><p className="section-label">Antes de descargar</p><h3>Identifica tu documento</h3><p>Nombre y matrícula sólo se incorporan a la copia que generes; no se guardan en el borrador del navegador.</p></div>
              <div className="field-grid">
                <div className="field"><label htmlFor="name">Nombre</label><input id="name" type="text" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} /></div>
                <div className="field"><label htmlFor="studentId">Matrícula</label><input id="studentId" type="text" autoComplete="off" value={form.studentId} onChange={(event) => update("studentId", event.target.value)} placeholder="A0…" /></div>
              </div>
            </div>

            <div className="export-primary" aria-labelledby="export-title">
              <h3 id="export-title">Respalda tu Pasaporte antes de salir</h3>
              <p>Descárgalo y compártelo con tu mentor o mentora por correo o WhatsApp para continuar la conversación.</p>
              <div className="actions">
                <button className="button button-primary" type="button" onClick={printPassport}>Guardar como PDF</button>
                <button className="button button-secondary" type="button" onClick={sharePassport}>Compartir</button>
                <button className="text-button" type="button" onClick={downloadText}>Descargar texto</button>
                <button className="text-button" type="button" onClick={copyQuestion}>Copiar duda para PI o Dirección</button>
              </div>
              {message && <p className="export-message" aria-live="polite">{message}</p>}
            </div>
          </section>
        )}

        <section className="panel passport-print-view only-print">
          <h2>Pasaporte de Decisión Internacional</h2>
          <p><strong>Nombre:</strong> {display(form.name)} · <strong>Matrícula:</strong> {display(form.studentId)} · <strong>Fecha:</strong> {new Date().toLocaleDateString("es-MX")}</p>
          <div className="print-section"><h3>Mi exploración</h3><p><strong>Duda o decisión:</strong> {display(form.question)}</p><p><strong>Propósito:</strong> {display(form.purpose)}</p><p><strong>Prioridad y dificultad:</strong> {display(form.priorities)}</p></div>
          <div className="print-section"><h3>Contraste con información oficial</h3><p>{display(form.officialNotes)}</p></div>
          <div className="print-section"><h3>Mi ruta de seguimiento</h3><p><strong>Canales:</strong> {form.routes.join(", ") || "No definidos"}</p><p><strong>Canal prioritario:</strong> {form.primaryRoute || "No definido"}</p><p><strong>Siguiente acción:</strong> {display(form.nextAction)}</p><p><strong>Fecha:</strong> {display(form.actionDate)}</p><p><strong>Seguimiento:</strong> {display(form.followUp)}</p></div>
          <p className="print-disclaimer">Este documento organiza una reflexión y preguntas de seguimiento. La oferta, los requisitos, los costos, las fechas y las equivalencias deben confirmarse en fuentes y canales institucionales.</p>
        </section>

        <div className="form-navigation no-print">
          <div className="actions">
            {activeStep > 1 && <button className="button button-secondary" type="button" onClick={() => setActiveStep((step) => step - 1)}>Anterior</button>}
            {activeStep < 3 && <button className="button button-primary" type="button" onClick={() => setActiveStep((step) => step + 1)}>Siguiente</button>}
          </div>
          <div className="local-draft-status" aria-live="polite">
            <span>{ready ? `Borrador local · ${completion}/5 respuestas${lastSaved ? ` · ${new Date(lastSaved).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}` : ""}` : "Preparando borrador…"}</span>
            <button type="button" onClick={clearDraft}>Borrar borrador</button>
          </div>
          <p className="draft-note">Se conserva en este navegador sin nombre ni matrícula. No es un respaldo: descarga el Pasaporte antes de salir.</p>
        </div>
      </form>
    </div>
  );
}
