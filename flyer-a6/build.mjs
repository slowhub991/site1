// Genera il flyer A6 orizzontale Targa10: QR vettoriali, PDF di stampa e anteprime PNG.
//
//   npm install
//   npm run build
//
// Uscite:
//   stampa/Targa10_flyer_A6_orizzontale_abbondanza-3mm.pdf   154 x 111 mm, senza crocini (stampa online)
//   stampa/Targa10_flyer_A6_orizzontale_con-crocini.pdf      174 x 131 mm, crocini di taglio (tipografia)
//   anteprima/fronte.png, anteprima/retro.png                formato finito 148 x 105 mm, 300 dpi

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import { chromium } from "playwright";

// ---- indirizzi dei QR: cambiarli qui e rilanciare la build ----
const URL_FRONTE = "https://targa10.it/demo/#chiedi"; // pagina della matricola di esempio, aperta sulla scheda Chiedi
const URL_FRONTE_TESTO = "targa10.it/demo";      // testo inciso sotto il QR della targa
const URL_RETRO = "https://targa10.it/";         // home del sito con tutti i servizi

// ---- formato: deve coincidere con le misure di .page/.sheet/.trim in src/flyer.html ----
const W = 148, H = 105;   // formato finito, mm
const ABB = 3;            // abbondanza per lato, mm
const MARGINE = 10;       // spazio per i crocini attorno all'abbondanza, mm
const AREA_SICURA = 4;    // nessun testo a meno di 4 mm dal taglio

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, "src");
const OUT_PRINT = path.join(ROOT, "stampa");
const OUT_PREVIEW = path.join(ROOT, "anteprima");
const PDF_ABBONDANZA = path.join(OUT_PRINT, "Targa10_flyer_A6_orizzontale_abbondanza-3mm.pdf");
const PDF_CROCINI = path.join(OUT_PRINT, "Targa10_flyer_A6_orizzontale_con-crocini.pdf");
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

// Crocini di taglio: stanno nel margine attorno all'abbondanza e segnano le linee del formato finito.
function crocini(nome) {
  const PW = W + 2 * (ABB + MARGINE), PH = H + 2 * (ABB + MARGINE);
  const L = ABB + MARGINE, T = ABB + MARGINE, R = L + W, B = T + H;
  const s = 'stroke="#000" stroke-width="0.1"';
  const lines = [
    [2, T, 9, T], [PW - 9, T, PW - 2, T], [2, B, 9, B], [PW - 9, B, PW - 2, B],
    [L, 2, L, 9], [R, 2, R, 9], [L, PH - 9, L, PH - 2], [R, PH - 9, R, PH - 2],
  ].map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${s}/>`).join("");
  const slug = `<text x="${PW / 2}" y="6.2" text-anchor="middle" font-family="IBM Plex Mono" font-size="2.1" fill="#000">Targa10 · Flyer A6 orizzontale ${W} × ${H} mm · abbondanza ${ABB} mm · ${nome}</text>`;
  return `<svg viewBox="0 0 ${PW} ${PH}" aria-hidden="true">${lines}${slug}</svg>`;
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
  doc.setTitle("Targa10 · Flyer A6 orizzontale, fronte e retro");
  doc.setAuthor("Targa10");
  doc.setSubject(`Flyer A6 orizzontale ${W} x ${H} mm, abbondanza ${ABB} mm. Pagina 1 fronte, pagina 2 retro.`);
  doc.setCreator("targa10-flyer-a6/build.mjs");
  fs.writeFileSync(file, await doc.save());
}

// Controllo d'impaginazione: i blocchi del formato finito non si sovrappongono e restano nell'area sicura.
function controllaImpaginazione({ W, H, AREA_SICURA }) {
  const MM = 96 / 25.4, problemi = [];
  for (const lato of ["fronte", "retro"]) {
    const trim = document.querySelector(`#${lato} .trim`).getBoundingClientRect();
    const blocchi = [...document.querySelectorAll(`#${lato} .trim > *`)].map((el) => {
      const r = el.getBoundingClientRect();
      return { nome: el.className || el.tagName.toLowerCase(), l: (r.left - trim.left) / MM, t: (r.top - trim.top) / MM, r: (r.right - trim.left) / MM, b: (r.bottom - trim.top) / MM };
    });
    for (const x of blocchi) {
      const a = AREA_SICURA - 0.1;
      if (x.l < a || x.t < a || x.r > W - a || x.b > H - a) {
        problemi.push(`${lato}: "${x.nome}" esce dall'area sicura (${x.l.toFixed(1)}, ${x.t.toFixed(1)}) – (${x.r.toFixed(1)}, ${x.b.toFixed(1)}) mm`);
      }
    }
    for (let i = 0; i < blocchi.length; i++) {
      for (let j = i + 1; j < blocchi.length; j++) {
        const p = blocchi[i], q = blocchi[j];
        if (p.l < q.r && q.l < p.r && p.t < q.b && q.t < p.b) problemi.push(`${lato}: "${p.nome}" si sovrappone a "${q.nome}"`);
      }
    }
  }
  return problemi;
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
  const page = await browser.newPage({ deviceScaleFactor: 300 / 96, viewport: { width: 1400, height: 900 } });
  await page.goto(pathToFileURL(built).href);
  await page.evaluate(() => document.fonts.ready);
  const missing = await page.evaluate(() => [
    '700 10px "Barlow Condensed"', '800 10px "Barlow Condensed"', '600 10px "Barlow Condensed"',
    '500 10px "Barlow"', '400 10px "Barlow"', '600 10px "IBM Plex Mono"',
  ].filter((f) => !document.fonts.check(f)));
  if (missing.length) throw new Error("Font non caricati: " + missing.join(", "));

  const problemi = await page.evaluate(controllaImpaginazione, { W, H, AREA_SICURA });
  if (problemi.length) throw new Error("Impaginazione da correggere:\n  " + problemi.join("\n  "));

  const sw = W + 2 * ABB, sh = H + 2 * ABB;
  const pdfOpts = { printBackground: true, preferCSSPageSize: false, margin: { top: "0", right: "0", bottom: "0", left: "0" } };
  await page.pdf({ ...pdfOpts, path: PDF_ABBONDANZA, width: `${sw}mm`, height: `${sh}mm` });
  await finalizza(PDF_ABBONDANZA, sw, sh, 0, ABB);

  await page.evaluate(() => document.documentElement.classList.add("crocini"));
  await page.pdf({ ...pdfOpts, path: PDF_CROCINI, width: `${sw + 2 * MARGINE}mm`, height: `${sh + 2 * MARGINE}mm` });
  await finalizza(PDF_CROCINI, sw + 2 * MARGINE, sh + 2 * MARGINE, MARGINE, MARGINE + ABB);
  await page.evaluate(() => document.documentElement.classList.remove("crocini"));

  for (const id of ["fronte", "retro"]) {
    const box = await page.locator(`#${id} .sheet`).boundingBox();
    await page.screenshot({
      path: path.join(OUT_PREVIEW, `${id}.png`),
      clip: { x: box.x + ABB * MM, y: box.y + ABB * MM, width: W * MM, height: H * MM },
    });
  }
} finally {
  await browser.close();
  fs.rmSync(built, { force: true });
}

console.log(`QR fronte: ${URL_FRONTE} (versione ${fronte.version}, ${fronte.modules} moduli, correzione H)`);
console.log(`QR retro:  ${URL_RETRO} (versione ${retro.version}, ${retro.modules} moduli, correzione H)`);
console.log("Impaginazione: nessuna sovrapposizione, tutto nell'area sicura di 4 mm");
console.log("PDF in stampa/, anteprime in anteprima/");
