"""Controlli sui PDF di stampa del flyer.

Uso:  python3 -I tools/verifica.py            (dalla cartella flyer-a6)

- formato pagine (mm) e numero di pagine
- font incorporati
- risoluzione effettiva delle immagini
- lettura dei QR dal PDF rasterizzato: 300 dpi pulito e 110 dpi sfocato (telefono lontano)
"""
import io
import sys
from pathlib import Path

import pymupdf
import zxingcpp
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
ATTESI = {0: "https://targa10.it/demo/#chiedi", 1: "https://targa10.it/"}
FORMATI = {
    "Targa10_flyer_A6_orizzontale_abbondanza-3mm.pdf": (154, 111),
    "Targa10_flyer_A6_orizzontale_con-crocini.pdf": (174, 131),
}
FINITO = (148, 105)
MM = 25.4 / 72
errori = []


def leggi_qr(page, dpi, sfoca=0.0):
    pix = page.get_pixmap(dpi=dpi)
    img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("L")
    if sfoca:
        img = img.filter(ImageFilter.GaussianBlur(sfoca))
    return sorted({b.text for b in zxingcpp.read_barcodes(img) if b.format == zxingcpp.BarcodeFormat.QRCode})


for nome, (w_att, h_att) in FORMATI.items():
    pdf = pymupdf.open(ROOT / "stampa" / nome)
    print(f"\n{nome}")
    if pdf.page_count != 2:
        errori.append(f"{nome}: {pdf.page_count} pagine invece di 2")
    for i, page in enumerate(pdf):
        w, h = page.rect.width * MM, page.rect.height * MM
        lato = "fronte" if i == 0 else "retro"
        print(f"  {lato}: {w:.2f} x {h:.2f} mm")
        if abs(w - w_att) > 0.05 or abs(h - h_att) > 0.05:
            errori.append(f"{nome} {lato}: formato {w:.2f}x{h:.2f} invece di {w_att}x{h_att}")
        tb = page.trimbox
        print(f"    TrimBox (formato finito): {tb.width * MM:.2f} x {tb.height * MM:.2f} mm")
        if abs(tb.width * MM - FINITO[0]) > 0.05 or abs(tb.height * MM - FINITO[1]) > 0.05:
            errori.append(f"{nome} {lato}: TrimBox {tb.width * MM:.2f}x{tb.height * MM:.2f} invece di {FINITO[0]}x{FINITO[1]}")

        fonts = page.get_fonts()
        non_incorporati = [f[3] for f in fonts if f[1] == "n/a"]
        print(f"    font: {', '.join(sorted({f[3].split('+')[-1] for f in fonts}))}")
        if non_incorporati:
            errori.append(f"{nome} {lato}: font non incorporati {non_incorporati}")

        for img in page.get_images(full=True):
            xref, pw, ph = img[0], img[2], img[3]
            for r in page.get_image_rects(xref):
                if r.width < 20 or r.height < 20:
                    continue
                dpi = min(pw / (r.width / 72), ph / (r.height / 72))
                print(f"    immagine {pw}x{ph}px su {r.width * MM:.0f}x{r.height * MM:.0f} mm = {dpi:.0f} dpi")
                if dpi < 150 and r.width * MM > 30:
                    errori.append(f"{nome} {lato}: immagine grande a {dpi:.0f} dpi")

        if i in ATTESI:
            for dpi, sfoca in ((300, 0), (110, 0.8)):
                letti = leggi_qr(page, dpi, sfoca)
                stato = "OK" if letti == [ATTESI[i]] else "ERRORE"
                print(f"    QR a {dpi} dpi{' sfocato' if sfoca else ''}: {letti} {stato}")
                if stato != "OK":
                    errori.append(f"{nome} {lato}: QR letto {letti} invece di {ATTESI[i]} a {dpi} dpi")

print()
if errori:
    print("PROBLEMI:")
    for e in errori:
        print(" -", e)
    sys.exit(1)
print("Tutti i controlli passati.")
