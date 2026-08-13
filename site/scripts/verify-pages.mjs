import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const output = new URL("../out/", import.meta.url);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/brujula-internacional";
const pages = [
  ["index.html", "Haz de tu experiencia internacional un paso clave en tu formación"],
  ["pasaporte/index.html", "Guía de exploración"],
  ["guia-mitec/index.html", "Oferta y requisitos en MiTec"],
];

for (const [file, expected] of pages) {
  const html = await readFile(new URL(file, output), "utf8");
  assert.match(html, new RegExp(expected));
  assert.match(html, new RegExp(`${basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/_next/`));
}

await access(new URL("hero-brujula-internacional.webp", output));
await access(new URL("pi-ruta-inicial.png", output));
await access(new URL("pi-calendario-feb-jun-2027.png", output));
const home = await readFile(new URL("index.html", output), "utf8");
assert.match(home, /hero-brujula-internacional\.webp/);
assert.match(home, new RegExp(`href="${basePath}/pasaporte/"`));
assert.match(home, new RegExp(`href="${basePath}/guia-mitec/"`));
assert.match(home, /Información oficial de PI/);
assert.match(home, /tecmx\.sharepoint\.com/);

console.log("GitHub Pages export verified.");
