# Sito Targa10: cartella da pubblicare su targa10.it

Contiene il sito Targa10 (copia dell'artifact "Targa10 · Targa QR, archivio 10 anni e AI sul manuale CNC", versione del 9 ottobre 2026) più la cartella `demo/`, che è la pagina aperta dal QR sulla targa del flyer A6.

| Percorso | Indirizzo pubblico | Cos'è |
|---|---|---|
| `index.html` | `https://targa10.it/` | home con i servizi (QR sul retro del flyer) |
| `demo/index.html` | `https://targa10.it/demo/` | pagina della matricola di esempio VMC-850 (QR sulla targa del flyer) |
| `checkup.html`, `faq.html`, `esempio.html`, `en.html`, `privacy.html` | stesse pagine del sito | |

**Non togliere `demo/`**: senza quella cartella il QR sul fronte del flyer dà errore 404.

## Pubblicazione su Aruba (hosting Linux)

1. Apri il File Manager del pannello Aruba, oppure collegati via FTP (`ftp.targa10.it`, con utente e password FTP del pannello).
2. Carica il **contenuto** di questa cartella nella cartella pubblica del dominio, quella dove Aruba mette la pagina di benvenuto. Ci devono finire direttamente `index.html` e la cartella `demo/`, non una cartella `sito/`.
3. Attiva il certificato SSL dal pannello e il reindirizzamento da http a https.
4. Prova dal telefono, con il Wi-Fi spento:
   - `https://targa10.it/`
   - `https://targa10.it/demo/`
   - `https://www.targa10.it/demo/`

## Se l'hosting Aruba non è pronto in tempo

Pubblica la cartella su Netlify o su Cloudflare Pages: si trascina la cartella, l'HTTPS è automatico. Poi, nel pannello DNS di Aruba, punti `targa10.it` e `www` al servizio scelto. I QR non cambiano, perché puntano al dominio e non all'hosting.

## Da completare prima di pubblicare

- Partita IVA in home page: è obbligatoria sul sito di chi ha una partita IVA. Oggi il footer dice "Dati fiscali e sede: in sede di contratto". I dati vanno in `js/site.js` (oggetto `T10`) e nel footer di `index.html`.
- Privacy: completare titolare, sede e PEC (`privacy.html`).
- La demo non chiama nessuna AI. Le risposte vengono dal manuale e dalle sue traduzioni in 7 lingue, e la pagina lo dice. L'assistente AI vero si collega quando c'è il primo cliente.
- Le pagine caricano i font da Google Fonts. Per il GDPR è più pulito ospitarli sul sito; si può fare dopo la fiera.
