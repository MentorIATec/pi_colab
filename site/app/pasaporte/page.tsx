import { PageIntro } from "../components/PageIntro";
import { PassportForm } from "../components/PassportForm";
import { PrintButton } from "../components/PrintButton";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export default function PassportPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-main narrow-shell">
        <PageIntro
          eyebrow="Movilidad Estudiantil · Hoja de Trabajo"
          title="Pasaporte de Decisión"
          description="Completa tu plan de ruta internacional paso a paso. Define tu propósito profesional, condiciones de viabilidad y los siguientes pasos oficiales."
        />
        <div className="content-stack">
          {/* Main Form */}
          <PassportForm />

          {/* Print/Save Options */}
          <section className="panel no-print">
            <h2>Exportar mi Pasaporte</h2>
            <p>
              Una vez completados los 5 pasos, guarda tu pasaporte en PDF o imprímelo para presentarlo en tus citas de validación con tu Dirección de Programa o asesor de Programas Internacionales.
            </p>
            <div className="actions">
              <PrintButton label="Guardar como PDF / Imprimir" />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
