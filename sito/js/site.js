window.T10 = {
  brand: "Targa10",
  legalForm: "Ditta individuale",
  owner: "",
  cf: "",
  address: "",
  email: "info@targa10.it",
  phone: "",
  pec: "",
  prices: {
    revision: "950–1.700 €",
    archive: "250–350 €/anno",
    ai: "19–39 €/mese",
    plate: "a quotazione"
  }
};

function daysToDeadline() {
  const end = new Date("2027-01-20T00:00:00+01:00");
  const now = new Date();
  return Math.max(0, Math.ceil((end - now) / 86400000));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-days]").forEach((el) => {
    el.textContent = daysToDeadline();
  });
  const cfg = window.T10;
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.textContent = cfg.email;
    if (el.tagName === "A") el.href = "mailto:" + cfg.email;
  });
  const legal = document.querySelector("[data-legal]");
  if (legal) {
    const bits = [cfg.brand, cfg.legalForm];
    if (cfg.owner) bits.push(cfg.owner);
    if (cfg.cf) bits.push("C.F. " + cfg.cf);
    if (cfg.address) bits.push(cfg.address);
    legal.textContent = bits.join(" · ");
  }
  const form = document.querySelector("#checkup");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const markets = data.getAll("mercato").join(", ") || "—";
      const body = [
        "Ragione sociale: " + data.get("ragione"),
        "Email: " + data.get("email"),
        "Telefono: " + (data.get("telefono") || "—"),
        "Modello: " + data.get("modello"),
        "Mercati: " + markets,
        "Pagine manuale: " + (data.get("pagine") || "—"),
        "Note: " + (data.get("note") || "—"),
        "",
        "Richiesta check-up conformità 2027. Nessun impegno."
      ].join("\n");
      const href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent("Check-up Targa10 — " + data.get("ragione")) + "&body=" + encodeURIComponent(body);
      const ok = document.querySelector("#form-ok");
      if (ok) ok.hidden = false;
      window.location.href = href;
    });
  }
});
