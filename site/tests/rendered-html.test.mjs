import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the final Spanish landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="es"/i);
  assert.match(html, /<title>Brújula Internacional/i);
  assert.match(html, /Haz de tu experiencia internacional un paso clave en tu formación/);
  assert.match(html, /Brújula Internacional/);
  assert.match(html, /href="\/pasaporte\/?"/);
  assert.match(html, /href="\/guia-mitec\/?"/);
  assert.match(html, /Información oficial de PI/);
  assert.match(html, /tecmx\.sharepoint\.com/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

for (const [path, expected] of [
  ["/pasaporte", "Guía de exploración"],
  ["/guia-mitec", "Oferta y requisitos en MiTec"],
]) {
  test(`server-renders ${path}`, async () => {
  const response = await render(`${path}/`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(expected));
  });
}
