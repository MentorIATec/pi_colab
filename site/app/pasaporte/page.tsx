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
          description="Reflexiona con tu mentor o mentora, explora preliminarmente la información oficial y convierte tus dudas en una ruta de seguimiento."
        />
        <div className="content-stack">
          <PassportForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
