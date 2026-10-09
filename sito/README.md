# Sito Targa10: cartella da pubblicare su targa10.it

Contiene il sito Targa10 (copia dell'artifact "Targa10 · Targa QR, archivio 10 anni e AI sul manuale CNC", versione del 9 ottobre 2026) più la cartella `demo/`, che è la pagina aperta dal QR sulla targa del flyer A6.

| Percorso | Indirizzo pubblico | Cos'è |
|---|---|---|
| `index.html` | `https://targa10.it/` | home con i servizi (QR sul retro del flyer) |
| `demo/index.html` | `https://targa10.it/demo/` | pagina della matricola di esempio VMC-850 (QR sulla targa del flyer): manuale con ricerca, documenti, dichiarazione UE, copia cartacea e la voce "Assistenza AI · su richiesta". Pagina statica, senza AI che risponde |
| `checkup.html`, `faq.html`, `esempio.html`, `en.html`, `privacy.html` | stesse pagine del sito | |

**Non togliere `demo/`**: senza quella cartella il QR sul fronte del flyer dà errore 404.

## Pubblicazione automatica (consigliata)

Il workflow `.github/workflows/pubblica-sito.yml` carica `demo/` nella cartella `demo/` dell'hosting Aruba via FTP ogni volta che cambia, poi apre `https://targa10.it/demo/` da internet e controlla che si veda la demo. La home e le altre pagine già online su targa10.it non vengono toccate.

Per sostituire anche la home con le pagine di questa cartella: scheda **Actions › Pubblica sito su Aruba › Run workflow**, con "Carica tutto il sito" attivo.

Una volta sola, in GitHub: **Settings › Secrets and variables › Actions › New repository secret**:

| Secret | Valore |
|---|---|
| `FTP_SERVER` | di solito `ftp.targa10.it` (pannello Aruba o mail di attivazione dell'hosting) |
| `FTP_USERNAME` | utente FTP dell'hosting |
| `FTP_PASSWORD` | password FTP |

Se la cartella pubblica non è quella in cui si entra via FTP, aggiungi nella scheda **Variables** `FTP_DIR` con il percorso giusto (per esempio `./www.targa10.it/`).

Nel riepilogo del workflow (scheda Actions) compare l'esito: "QR del flyer OK" quando la demo si apre, altrimenti il motivo (SSL non attivo, dominio che non punta all'hosting, cartella sbagliata).

## Pubblicazione a mano su Aruba (hosting Linux)

1. Apri il File Manager del pannello Aruba, oppure collegati via FTP (`ftp.targa10.it`, con utente e password FTP del pannello).
2. Nella cartella pubblica del dominio (quella dove c'è già l'`index.html` della home) crea la cartella `demo` e caricaci dentro `demo/index.html`. Basta questo perché funzioni il QR della targa. Carica il resto della cartella solo se vuoi sostituire la home online.
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
- Le pagine caricano i font da Google Fonts. Per il GDPR è più pulito ospitarli sul sito; si può fare dopo la fiera.
