// Rigenera manuale.txt, il testo del manuale che l'assistente AI riceve sul server.
// Va rilanciato ogni volta che cambia il manuale dentro demo/index.html.
//
//   node sito/demo/api/strumenti/estrai-manuale.mjs
//
// Usa Playwright (già presente in flyer-a6/node_modules) per aprire la pagina e leggere
// lo stesso testo che la pagina usa per l'AI nell'artifact (window.__demo.manualAsText()).

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const qui = path.dirname(fileURLToPath(import.meta.url));
const pagina = path.resolve(qui, "../../index.html");
const uscita = path.resolve(qui, "../manuale.txt");
const require = createRequire(path.resolve(qui, "../../../../flyer-a6/package.json"));
const { chromium } = require("playwright");

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  // la pagina carica qrcode.js e i font: qui servono solo i dati del manuale
  await page.route(/^https?:/, (r) => r.abort());
  await page.goto(pathToFileURL(pagina).href);
  const testo = await page.evaluate(() => window.__demo.manualAsText());
  if (!testo.includes("§ 10.1") || testo.length < 5000) throw new Error("Testo del manuale incompleto");
  fs.writeFileSync(uscita, testo + "\n");
  console.log(`manuale.txt: ${testo.length} caratteri, ${testo.split("\n").length} righe`);
} finally {
  await browser.close();
}
