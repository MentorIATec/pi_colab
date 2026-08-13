"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

const channelDescriptions: Record<Channel, string> = {
  "Programas Internacionales": "Confirmar oferta, requisitos y proceso.",
  "Dirección de Programa": "Revisar pertinencia académica, cursos o relación con tu trayectoria.",
  Mentoría: "Conversar sobre propósito, prioridades o tensiones entre opciones.",
  "Conversación con estudiantes": "Conocer experiencias y vida cotidiana sin tomarlas como validación oficial.",
  "Exploración autónoma": "Continuar revisando opciones y fuentes a tu propio ritmo.",
};

type Passport = {
  question: string;
  purpose: string;
  priorities: string;
  optionOne: string;
  optionTwo: string;
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
  optionOne: "",
  optionTwo: "",
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
  const [fase1Step, setFase1Step] = useState(1);
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
    setFase1Step(1);
  }

  function documentText() {
    return [
      "RESUMEN DE EXPLORACIÓN INTERNACIONAL",
      `Nombre: ${display(form.name)}`,
      `Matrícula: ${display(form.studentId)}`,
      `Fecha de descarga: ${new Date().toLocaleDateString("es-MX")}`,
      "",
      "LA EXPERIENCIA QUE QUIERO CONSTRUIR",
      `Mi punto de partida: ${display(form.question)}`,
      `Aporte a mi formación o trayectoria: ${display(form.purpose)}`,
      `Prioridades y preocupaciones: ${display(form.priorities)}`,
      "",
      "CONTRASTE CON INFORMACIÓN OFICIAL",
      `Opciones que llamaron mi atención: ${[form.optionOne, form.optionTwo].filter((option) => option.trim()).join("; ") || "No definidas"}`,
      display(form.officialNotes),
      "",
      "CÓMO CONTINUARÉ",
      `Espacios que pueden ayudar: ${form.routes.join(", ") || "No definidos"}`,
      `Espacio para comenzar: ${form.primaryRoute || "No definido"}`,
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
    anchor.download = "resumen-exploracion-internacional.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setMessage("Resumen descargado. Puedes compartirlo con el espacio que elegiste para continuar.");
  }

  function printPassport() {
    setExported(true);
    setMessage("Se abrió la ventana de impresión. Elige ‘Guardar como PDF’ para conservar tu resumen.");
    window.setTimeout(() => window.print(), 0);
  }

  async function sharePassport() {
    const file = new File([documentText()], "resumen-exploracion-internacional.txt", { type: "text/plain" });
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      try {
        await navigator.share({ title: "Resumen de exploración", text: "Comparto mi resumen para dar seguimiento a la sesión.", files: [file] });
        setExported(true);
        setMessage("Se abrió el menú para compartir. Confirma que el archivo llegó al espacio que elegiste para continuar.");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    downloadText();
    setMessage("Tu navegador no permite compartir directamente. Se descargó el archivo. Puedes enviarlo por correo, WhatsApp u otra aplicación disponible en tu dispositivo.");
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
      setMessage("No fue posible copiar automáticamente. Descarga el resumen para conservar la información.");
    }
  }

  const steps = [
    { id: 1, name: "Construir" },
    { id: 2, name: "Confirmar" },
    { id: 3, name: "Continuar" },
  ];

  return (
    <div className="content-stack">
      <div
        className="compact-progress no-print"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={3}
        aria-valuenow={activeStep}
        aria-label={`Progreso de la Guía de exploración: Momento ${activeStep} de 3 · ${steps[activeStep - 1].name}`}
      >
        <span>Momento {activeStep} de 3 · {steps[activeStep - 1].name}</span>
        <div aria-hidden="true"><i style={{ width: `${(activeStep / 3) * 100}%` }} /></div>
      </div>

      <form className="passport-form-container" onSubmit={(event) => event.preventDefault()}>
        {activeStep === 1 && (
          <section className="panel panel-accent animated-fade">
            <span className="step-badge">Momento 1 · Construir</span>
            <h2>La experiencia que quieres construir</h2>
            <p className="step-instruction">Pregunta {fase1Step} de 3</p>
            {fase1Step === 1 && (
              <p className="dialogue-prompt">Tómate un minuto para conversarlo antes de escribir.</p>
            )}
            <div className="field-grid single-column-fields">
              {fase1Step === 1 && (
                <div className="field">
                  <label htmlFor="question">1. ¿Qué idea tienes hoy sobre estudiar en otro país?<small>Puede ser una duda, una opción que ya consideras o algo que apenas quieres conocer.</small></label>
                  <textarea id="question" value={form.question} onChange={(event) => update("question", event.target.value)} placeholder="Por ahora pienso que… / Quisiera conocer…" rows={2} />
                </div>
              )}
              {fase1Step === 2 && (
                <div className="field">
                  <label htmlFor="purpose">2. ¿Qué te gustaría aprender, vivir o desarrollar durante esta experiencia, y cómo quisieras que aportara a tu formación o trayectoria profesional?</label>
                  <textarea id="purpose" value={form.purpose} onChange={(event) => update("purpose", event.target.value)} placeholder="Me gustaría que esta experiencia me permitiera…" rows={2} />
                </div>
              )}
              {fase1Step === 3 && (
                <div className="field">
                  <label htmlFor="priorities">3. Al comparar opciones, ¿qué dos o tres prioridades personales o preocupaciones tendrían mayor peso en tu decisión?<small>Piensa en factores que podrían hacerte preferir o reconsiderar una opción: costos, idioma, bienestar, red de apoyo, entorno, accesibilidad u otra condición importante para ti.</small></label>
                  <textarea id="priorities" value={form.priorities} onChange={(event) => update("priorities", event.target.value)} placeholder="Para mí sería importante… / Me preocuparía…" rows={3} />
                  <p className="mentor-conversation-cue">Para conversar en Mentoría: si estas prioridades entraran en tensión, ¿cuál necesitarías cuidar primero?</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeStep === 2 && (
          <section className="panel panel-contrast animated-fade">
            <span className="step-badge">Momento 2 · Confirmar</span>
            <h2>Lo que necesitas confirmar para hacerla posible</h2>
            <p className="step-instruction">Revisa brevemente la oferta y los requisitos. No necesitas elegir una universidad para continuar.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              <a className="button button-primary" href={sharePointUrl} target="_blank" rel="noreferrer">Abrir Mi Experiencia Internacional ↗</a>
              <Link className="button button-secondary" href="/guia-mitec" target="_blank">Consultar Guía de MiTec ↗</Link>
            </div>
            <div className="exploration-pin" aria-labelledby="exploration-pin-title">
              <div>
                <p className="section-label">Pausa de exploración</p>
                <h3 id="exploration-pin-title">Elige una o dos opciones que hayan llamado tu atención</h3>
                <p>No es una decisión final. Consérvalas como referencias para conversar sobre qué te interesa, qué coincide con tus prioridades y qué necesitas confirmar.</p>
              </div>
              <div className="field-grid exploration-option-fields">
                <div className="field">
                  <label htmlFor="optionOne">Primera opción</label>
                  <input id="optionOne" type="text" value={form.optionOne} onChange={(event) => update("optionOne", event.target.value)} placeholder="Universidad, programa o ciudad" />
                </div>
                <div className="field">
                  <label htmlFor="optionTwo">Segunda opción <small>Opcional</small></label>
                  <input id="optionTwo" type="text" value={form.optionTwo} onChange={(event) => update("optionTwo", event.target.value)} placeholder="Otra opción para contrastar" />
                </div>
              </div>
            </div>
            <div className="field official-reflection">
              <label htmlFor="officialNotes">4. Después de revisar la oferta y los requisitos, ¿qué encontraste que confirma, amplía o cambia tu idea inicial?</label>
              <textarea id="officialNotes" value={form.officialNotes} onChange={(event) => update("officialNotes", event.target.value)} placeholder={"Encontré…\nNecesito confirmar…"} rows={4} />
            </div>
            <div className="question-refinement">
              <label htmlFor="refined-question">Con lo que ahora sabes, ¿qué necesitas comparar, decidir o preguntar para avanzar?<small>Edita tu idea inicial: no estás agregando otra respuesta.</small></label>
              <textarea id="refined-question" value={form.question} onChange={(event) => update("question", event.target.value)} rows={2} />
            </div>
          </section>
        )}

        {activeStep === 3 && (
          <section className="panel animated-fade">
            <span className="step-badge">Momento 3 · Continuar</span>
            <h2>Cómo quieres continuar</h2>
            <p className="step-instruction">Una misma necesidad puede requerir varios espacios. Elige por dónde comenzar y define una acción posible.</p>

            <fieldset className="field">
              <legend>¿Qué espacios pueden ayudarte a continuar?</legend>
              <div className="choice-grid route-choices">
                {channels.map((channel, index) => (
                  <label className="choice" htmlFor={`support-space-${index}`} aria-label={channel} key={channel}>
                    <input id={`support-space-${index}`} type="checkbox" checked={form.routes.includes(channel)} onChange={() => toggleRoute(channel)} />
                    <span><strong>{channel}</strong><small>{channelDescriptions[channel]}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>

            {form.routes.length > 0 && (
              <div className="field primary-route-field">
                <label htmlFor="primaryRoute">¿Con qué espacio comenzarás?</label>
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
              <div className="field full"><label htmlFor="nextAction">5. ¿Cuál será tu siguiente paso y cuándo quieres realizarlo?</label><textarea id="nextAction" value={form.nextAction} onChange={(event) => update("nextAction", event.target.value)} placeholder="Mi siguiente paso será…" rows={2} /></div>
              <div className="field"><label htmlFor="actionDate">¿Para cuándo?</label><input id="actionDate" type="date" value={form.actionDate} onChange={(event) => update("actionDate", event.target.value)} /></div>
              <div className="field"><label htmlFor="followUp">¿Cómo lo retomarás?</label><select id="followUp" value={form.followUp} onChange={(event) => update("followUp", event.target.value)}><option value="">Selecciona una opción</option><option value="Lo compartiré en Mentoría al completarlo">Lo compartiré en Mentoría</option><option value="Lo retomaremos en una sesión posterior">Lo retomaremos en otra sesión</option><option value="Daré seguimiento de forma autónoma">Daré seguimiento de forma autónoma</option><option value="Por definir">Por definir</option></select></div>
            </div>

            {/* Recapitulación previa al cierre */}
            <div className="recap-section">
              <h3>Lo que has construido hasta ahora</h3>
              <div className="recap-grid">
                <div className="recap-item">
                  <div className="recap-header">
                    <strong>La experiencia que quiero construir:</strong>
                    <button type="button" className="recap-modify" onClick={() => { setActiveStep(1); setFase1Step(2); }}>Modificar</button>
                  </div>
                  <p>{form.purpose.trim() || <span className="recap-pending">Pendiente de completar</span>}</p>
                </div>
                <div className="recap-item">
                  <div className="recap-header">
                    <strong>Lo que tendrá peso en mi decisión:</strong>
                    <button type="button" className="recap-modify" onClick={() => { setActiveStep(1); setFase1Step(3); }}>Modificar</button>
                  </div>
                  <p>{form.priorities.trim() || <span className="recap-pending">Pendiente de completar</span>}</p>
                </div>
                <div className="recap-item">
                  <div className="recap-header">
                    <strong>Lo que necesito comparar, decidir o confirmar:</strong>
                    <button type="button" className="recap-modify" onClick={() => setActiveStep(2)}>Modificar</button>
                  </div>
                  <p>{form.question.trim() || <span className="recap-pending">Pendiente de completar</span>}</p>
                </div>
                <div className="recap-item">
                  <div className="recap-header">
                    <strong>Cómo continuaré:</strong>
                    <button type="button" className="recap-modify" onClick={() => setActiveStep(3)}>Modificar</button>
                  </div>
                  <p>
                    {form.nextAction.trim() || form.actionDate ? (
                      `${form.primaryRoute ? `${form.primaryRoute}: ` : ""}${form.nextAction.trim() || "Pendiente de completar"} ${form.actionDate ? `(para el ${form.actionDate})` : ""}`
                    ) : (
                      <span className="recap-pending">Pendiente de completar</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="identity-block">
              <div>
                <p className="section-label">Antes de descargar</p>
                <h3>Conservar lo que construiste</h3>
                <p>Agrega tu nombre y matrícula para identificar la copia que guardarás. Estos datos no se almacenan en el navegador ni se envían a un servidor.</p>
              </div>
              <div className="field-grid">
                <div className="field"><label htmlFor="name">Nombre</label><input id="name" type="text" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} /></div>
                <div className="field"><label htmlFor="studentId">Matrícula</label><input id="studentId" type="text" autoComplete="off" value={form.studentId} onChange={(event) => update("studentId", event.target.value)} placeholder="A0…" /></div>
              </div>
            </div>

            <div className="export-primary" aria-labelledby="export-title">
              <h3 id="export-title">Respalda tu exploración antes de salir</h3>
              <p>Descárgalo para conservarlo. Si lo necesitas, compártelo con el espacio que elegiste para continuar.</p>
              <div className="actions">
                <button className="button button-primary" type="button" onClick={printPassport}>Guardar mi resumen</button>
                <button className="button button-secondary" type="button" onClick={sharePassport}>Compartir</button>
                <button className="button button-secondary contextual-action" type="button" onClick={copyQuestion}>Copiar duda para PI o Dirección</button>
              </div>
              <details className="more-options-details">
                <summary className="more-options-summary">Más opciones</summary>
                <div className="more-options-content">
                  <button className="text-button" type="button" onClick={downloadText}>Descargar archivo de texto</button>
                </div>
              </details>
              {message && <p className="export-message" aria-live="polite">{message}</p>}
            </div>
          </section>
        )}

        <section className="panel passport-print-view only-print">
          <h2>Resumen de Exploración Internacional</h2>
          <p><strong>Nombre:</strong> {display(form.name)} · <strong>Matrícula:</strong> {display(form.studentId)} · <strong>Fecha:</strong> {new Date().toLocaleDateString("es-MX")}</p>
          <div className="print-section"><h3>La experiencia que quiero construir</h3><p><strong>Lo que necesito comparar, decidir o confirmar:</strong> {display(form.question)}</p><p><strong>Aporte a mi formación o trayectoria:</strong> {display(form.purpose)}</p><p><strong>Prioridades y preocupaciones:</strong> {display(form.priorities)}</p></div>
          <div className="print-section"><h3>Lo que necesito confirmar para hacerla posible</h3><p><strong>Opciones que llamaron mi atención:</strong> {[form.optionOne, form.optionTwo].filter((option) => option.trim()).join("; ") || "No definidas"}</p><p>{display(form.officialNotes)}</p></div>
          <div className="print-section"><h3>Cómo continuaré</h3><p><strong>Espacios de apoyo:</strong> {form.routes.join(", ") || "No definidos"}</p><p><strong>Espacio para comenzar:</strong> {form.primaryRoute || "No definido"}</p><p><strong>Siguiente acción:</strong> {display(form.nextAction)}</p><p><strong>Fecha:</strong> {display(form.actionDate)}</p><p><strong>Seguimiento:</strong> {display(form.followUp)}</p></div>
          <p className="print-disclaimer">Este documento organiza una reflexión y preguntas de seguimiento. La oferta, los requisitos, los costos, las fechas y las equivalencias deben confirmarse en fuentes y canales institucionales.</p>
        </section>

        <div className="form-navigation no-print">
          <div className="actions">
            {activeStep === 1 && fase1Step > 1 && (
              <button className="button button-secondary" type="button" onClick={() => setFase1Step(fase1Step - 1)}>Anterior</button>
            )}
            {activeStep > 1 && (
              <button className="button button-secondary" type="button" onClick={() => {
                if (activeStep === 2) {
                  setActiveStep(1);
                  setFase1Step(3);
                } else {
                  setActiveStep(activeStep - 1);
                }
              }}>Anterior</button>
            )}

            {activeStep === 1 && fase1Step < 3 && (
              <button className="button button-primary" type="button" onClick={() => setFase1Step(fase1Step + 1)}>Continuar</button>
            )}
            {activeStep === 1 && fase1Step === 3 && (
              <button className="button button-primary" type="button" onClick={() => setActiveStep(2)}>Continuar</button>
            )}
            {activeStep === 2 && (
              <button className="button button-primary" type="button" onClick={() => setActiveStep(3)}>Siguiente</button>
            )}
          </div>
          <div className="local-draft-status" aria-live="polite">
            <span>{ready ? `Borrador local · ${completion}/5 respuestas${lastSaved ? ` · ${new Date(lastSaved).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}` : ""}` : "Preparando borrador…"}</span>
            <button type="button" onClick={clearDraft}>Borrar borrador</button>
          </div>
          <p className="draft-note">Se conserva en este navegador sin nombre ni matrícula. No es un respaldo: descarga el resumen antes de salir.</p>
        </div>
      </form>
    </div>
  );
}
