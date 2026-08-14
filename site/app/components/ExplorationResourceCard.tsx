"use client";

import { useState } from "react";

type ExplorationResourceCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  question: string;
  prompt: string;
  evidence: string[];
  tone: "violet" | "sky" | "sand" | "lime" | "coral";
  featured?: boolean;
};

export function ExplorationResourceCard({
  eyebrow,
  title,
  description,
  question,
  prompt,
  evidence,
  tone,
  featured = false,
}: ExplorationResourceCardProps) {
  const [copyLabel, setCopyLabel] = useState("Copiar para explorar");

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyLabel("Estructura copiada");
      window.setTimeout(() => setCopyLabel("Copiar para explorar"), 2200);
    } catch {
      setCopyLabel("Selecciona y copia el texto");
    }
  }

  return (
    <article className={`exploration-resource tone-${tone}${featured ? " exploration-resource-featured" : ""}`}>
      <div className="exploration-resource-summary">
        <p className="resource-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="exploration-guiding-question">
          <strong>Te ayuda a responder:</strong> {question}
        </p>
      </div>

      <details className="exploration-resource-details">
        <summary>Ver recurso</summary>
        <div className="exploration-resource-body">
          <div>
            <h3>Al terminar tendrás</h3>
            <ul>
              {evidence.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <div className="prompt-heading">
              <h3>Guía para explorar</h3>
              <button className="button button-secondary prompt-copy" type="button" onClick={copyPrompt}>
                {copyLabel}
              </button>
            </div>
            <p className="prompt-note">
              Completa los corchetes y verifica los hallazgos en las fuentes enlazadas.
            </p>
            <pre className="prompt-block"><code>{prompt}</code></pre>
          </div>
        </div>
      </details>
    </article>
  );
}
