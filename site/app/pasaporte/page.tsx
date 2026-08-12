import { PageIntro } from "../components/PageIntro";
import { PassportForm } from "../components/PassportForm";
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
          description="Cinco preguntas para enfocar tu conversación, contrastar una fuente oficial y acordar un siguiente paso con tu mentor o mentora."
        />
        <div className="content-stack">
          <PassportForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
