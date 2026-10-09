// Genera il flyer A6 Targa10: QR vettoriali, PDF di stampa e anteprime PNG.
//
//   npm install
//   npm run build
//
// Uscite:
//   stampa/Targa10_flyer_A6_fronte-retro_abbondanza-3mm.pdf   111 x 154 mm, senza crocini (stampa online)
//   stampa/Targa10_flyer_A6_fronte-retro_con-crocini.pdf      131 x 174 mm, crocini di taglio (tipografia)
//   anteprima/fronte.png, anteprima/retro.png                 formato finito 105 x 148 mm, 300 dpi

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import { chromium } from "playwright";

// ---- indirizzi dei QR: cambiarli qui e rilanciare la build ----
const URL_FRONTE = "https://targa10.it/demo/";   // pagina della matricola di esempio (sito/demo/index.html)
const URL_FRONTE_TESTO = "targa10.it/demo";      // testo inciso sotto il QR della targa
const URL_RETRO = "https://targa10.it/";         // home del sito con tutti i servizi

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, "src");
const OUT_PRINT = path.join(ROOT, "stampa");
const OUT_PREVIEW = path.join(ROOT, "anteprima");
const MM = 96 / 25.4; // px CSS per millimetro

// QR in SVG: un tracciato per riga con i moduli scuri accorpati, margine di 4 moduli.
function qrSvg(text, { fg = "#14171B", bg = null, label }) {
  const qr = QRCode.create(text, { errorCorrectionLevel: "H" });
  const n = qr.modules.size;
  const dark = (r, c) => qr.modules.get(r, c) === 1;
  let d = "";
  for (let r = 0; r < n; r++) {
    let c = 0;
    while (c < n) {
      if (!dark(r, c)) { c++; continue; }
      let w = 1;
      while (c + w < n && dark(r, c + w)) w++;
      d += `M${c} ${r}h${w}v1h-${w}z`;
      c += w;
    }
  }
  const q = 4;
  const bgRect = bg ? `<rect x="${-q}" y="${-q}" width="${n + 2 * q}" height="${n + 2 * q}" fill="${bg}"/>` : "";
  return {
    version: qr.version,
    modules: n,
    svg: `<svg viewBox="${-q} ${-q} ${n + 2 * q} ${n + 2 * q}" role="img" aria-label="${label}" shape-rendering="crispEdges">${bgRect}<path fill="${fg}" d="${d}"/></svg>`,
  };
}

// Crocini di taglio sulla pagina 131 x 174 mm: formato finito da (13, 13) a (118, 161) mm.
function crocini(nome) {
  const L = 13, T = 13, R = 118, B = 161, W = 131, H = 174;
  const s = 'stroke="#000" stroke-width="0.1"';
  const lines = [
    [2, T, 9, T], [W - 9, T, W - 2, T], [2, B, 9, B], [W - 9, B, W - 2, B],
    [L, 2, L, 9], [R, 2, R, 9], [L, H - 9, L, H - 2], [R, H - 9, R, H - 2],
  ].map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${s}/>`).join("");
  const slug = `<text x="${W / 2}" y="6.2" text-anchor="middle" font-family="IBM Plex Mono" font-size="2.1" fill="#000">Targa10 · Flyer A6 105 × 148 mm · abbondanza 3 mm · ${nome}</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">${lines}${slug}</svg>`;
}

// Chromium arrotonda il formato pagina (~0,2 mm in più): qui il PDF prende il formato esatto,
// tenendo fermo l'angolo in alto a sinistra, e riceve TrimBox e BleedBox per il controllo in tipografia.
async function finalizza(file, wMm, hMm, abbondanzaMm, rifiloMm) {
  const pt = (mm) => (mm * 72) / 25.4;
  const doc = await PDFDocument.load(fs.readFileSync(file));
  if (doc.getPageCount() !== 2) throw new Error(`${path.basename(file)}: ${doc.getPageCount()} pagine invece di 2`);
  for (const page of doc.getPages()) {
    const w = pt(wMm), h = pt(hMm);
    const y0 = page.getMediaBox().height - h;
    page.setMediaBox(0, y0, w, h);
    page.setCropBox(0, y0, w, h);
    const b = pt(abbondanzaMm), t = pt(rifiloMm);
    page.setBleedBox(b, y0 + b, w - 2 * b, h - 2 * b);
    page.setTrimBox(t, y0 + t, w - 2 * t, h - 2 * t);
  }
  doc.setTitle("Targa10 · Flyer A6 fronte e retro");
  doc.setAuthor("Targa10");
  doc.setSubject("Flyer A6 105 x 148 mm, abbondanza 3 mm. Pagina 1 fronte, pagina 2 retro.");
  doc.setCreator("targa10-flyer-a6/build.mjs");
  fs.writeFileSync(file, await doc.save());
}

const fronte = qrSvg(URL_FRONTE, { label: `Codice QR: ${URL_FRONTE}` });
const retro = qrSvg(URL_RETRO, { bg: "#FFFFFF", label: `Codice QR: ${URL_RETRO}` });

let html = fs.readFileSync(path.join(SRC, "flyer.html"), "utf8")
  .replace("{{QR_FRONTE}}", fronte.svg)
  .replace("{{QR_RETRO}}", retro.svg)
  .replace("{{URL_FRONTE_TESTO}}", URL_FRONTE_TESTO)
  .replace("{{CROCINI}}", crocini("FRONTE"))
  .replace("{{CROCINI}}", crocini("RETRO"));
if (/\{\{[A-Z_]+\}\}/.test(html)) throw new Error("Segnaposto non sostituito nel sorgente");

const built = path.join(SRC, "_build.html");
fs.writeFileSync(built, html);
fs.mkdirSync(OUT_PRINT, { recursive: true });
fs.mkdirSync(OUT_PREVIEW, { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: 300 / 96, viewport: { width: 1100, height: 760 } });
  await page.goto(pathToFileURL(built).href);
  await page.evaluate(() => document.fonts.ready);
  const missing = await page.evaluate(() => [
    '700 10px "Barlow Condensed"', '800 10px "Barlow Condensed"', '600 10px "Barlow Condensed"',
    '500 10px "Barlow"', '400 10px "Barlow"', '600 10px "IBM Plex Mono"',
  ].filter((f) => !document.fonts.check(f)));
  if (missing.length) throw new Error("Font non caricati: " + missing.join(", "));

  const pdfOpts = { printBackground: true, preferCSSPageSize: false, margin: { top: "0", right: "0", bottom: "0", left: "0" } };
  const pdfAbbondanza = path.join(OUT_PRINT, "Targa10_flyer_A6_fronte-retro_abbondanza-3mm.pdf");
  await page.pdf({ ...pdfOpts, path: pdfAbbondanza, width: "111mm", height: "154mm" });
  await finalizza(pdfAbbondanza, 111, 154, 0, 3);

  await page.evaluate(() => document.documentElement.classList.add("crocini"));
  const pdfCrocini = path.join(OUT_PRINT, "Targa10_flyer_A6_fronte-retro_con-crocini.pdf");
  await page.pdf({ ...pdfOpts, path: pdfCrocini, width: "131mm", height: "174mm" });
  await finalizza(pdfCrocini, 131, 174, 10, 13);
  await page.evaluate(() => document.documentElement.classList.remove("crocini"));

  for (const id of ["fronte", "retro"]) {
    const box = await page.locator(`#${id} .sheet`).boundingBox();
    await page.screenshot({
      path: path.join(OUT_PREVIEW, `${id}.png`),
      clip: { x: box.x + 3 * MM, y: box.y + 3 * MM, width: 105 * MM, height: 148 * MM },
    });
  }
} finally {
  await browser.close();
  fs.rmSync(built, { force: true });
}

console.log(`QR fronte: ${URL_FRONTE} (versione ${fronte.version}, ${fronte.modules} moduli, correzione H)`);
console.log(`QR retro:  ${URL_RETRO} (versione ${retro.version}, ${retro.modules} moduli, correzione H)`);
console.log("PDF in stampa/, anteprime in anteprima/");
