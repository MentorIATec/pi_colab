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
          eyebrow="Brújula Internacional · Recurso de trabajo"
          title="Guía de exploración"
          description="Cinco preguntas para relacionar la experiencia que quieres construir con lo que necesitas confirmar para hacerla posible."
        />
        <div className="content-stack">
          <PassportForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
