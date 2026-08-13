import Link from "next/link";

const navItems = [
  ["Exploración", "/pasaporte"],
  ["MiTec", "/guia-mitec"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header no-print">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Brújula Internacional, inicio">
          <span className="wordmark-mark" aria-hidden="true">BI</span>
          <span>Brújula Internacional</span>
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
