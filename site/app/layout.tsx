import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Brújula Internacional",
    template: "%s · Brújula Internacional",
  },
  description:
    "Acompañamiento para explorar opciones y construir una experiencia internacional vinculada con tu formación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
