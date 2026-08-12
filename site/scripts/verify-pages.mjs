import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const output = new URL("../out/", import.meta.url);
const pages = [
  ["index.html", "Planifica tu experiencia internacional con evidencia"],
  ["pasaporte/index.html", "Pasaporte de Decisión"],
  ["guia-mitec/index.html", "Guía de Navegación MiTec"],
];

for (const [file, expected] of pages) {
  const html = await readFile(new URL(file, output), "utf8");
  assert.match(html, new RegExp(expected));
  assert.match(html, /\/pi_colab\/_next\//);
}

await access(new URL("hero.png", output));
await access(new URL("pi-ruta-inicial.png", output));
await access(new URL("pi-calendario-feb-jun-2027.png", output));
const home = await readFile(new URL("index.html", output), "utf8");
assert.match(home, /src="\/pi_colab\/hero\.png"/);
assert.match(home, /href="\/pi_colab\/pasaporte\/"/);
assert.match(home, /href="\/pi_colab\/guia-mitec\/"/);
assert.match(home, /Información oficial de PI/);
assert.match(home, /tecmx\.sharepoint\.com/);

console.log("GitHub Pages export verified.");
