import Link from "next/link";

const navItems = [
  ["Pasaporte", "/pasaporte"],
  ["Guía MiTec", "/guia-mitec"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header no-print">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Mi Ruta Internacional, inicio">
          <span className="wordmark-mark" aria-hidden="true">RI</span>
          <span>Mi Ruta Internacional</span>
        </Link>
        <nav aria-label="Recursos principales">
          {navItems.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
