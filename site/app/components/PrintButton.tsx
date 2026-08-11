"use client";

export function PrintButton({ label = "Imprimir o guardar PDF" }: { label?: string }) {
  return (
    <button className="button button-secondary no-print" type="button" onClick={() => window.print()}>
      {label}
    </button>
  );
}
