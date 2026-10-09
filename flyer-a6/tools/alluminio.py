"""Genera la texture di alluminio spazzolato per la targa del flyer.

Uscita: src/img/alluminio.jpg, 90 x 54 mm a 400 dpi (1417 x 850 px).
Seed fisso: la texture e' identica a ogni esecuzione.
"""
import numpy as np
from PIL import Image

W, H = 1417, 850
rng = np.random.default_rng(10)

def blur_x(a, k):
    # media mobile lungo x con bordi ciclici: righe lunghe tipiche della spazzolatura
    c = np.cumsum(np.concatenate([a[:, -k:], a, a[:, :k]], axis=1), axis=1)
    return (c[:, 2 * k:] - c[:, :-2 * k])[:, :a.shape[1]] / (2 * k)

def blur_y(a, k):
    return blur_x(a.T, k).T

rows = rng.normal(0, 1, (H, 1)) * np.ones((1, W))        # ogni riga ha la sua luminosita'
streak = blur_x(rng.normal(0, 1, (H, W)), 90)             # striature lunghe
fine = blur_x(rng.normal(0, 1, (H, W)), 6)                # grana fine
tex = 0.55 * blur_y(rows, 1) + 3.2 * streak + 0.9 * fine
tex = (tex - tex.mean()) / tex.std()

# luminosita' base e ampiezza delle striature (in livelli 0-255)
L = 204 + 7.0 * tex
rgb = np.stack([L * 0.985, L * 0.995, L * 1.012], axis=-1)
img = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB")
img.save("src/img/alluminio.jpg", quality=92, dpi=(400, 400), optimize=True)
print("ok", img.size)
