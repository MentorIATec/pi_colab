import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Antes del destino",
    template: "%s · Antes del destino",
  },
  description:
    "Kit de mentoría para organizar dudas y diseñar el siguiente paso hacia una experiencia internacional.",
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
