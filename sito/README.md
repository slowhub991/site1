# Sito Targa10: cartella da pubblicare su targa10.it

Contiene il sito Targa10 (copia dell'artifact "Targa10 · Targa QR, archivio 10 anni e AI sul manuale CNC", versione del 9 ottobre 2026) più la cartella `demo/`, che è la pagina aperta dal QR sulla targa del flyer A6.

| Percorso | Indirizzo pubblico | Cos'è |
|---|---|---|
| `index.html` | `https://targa10.it/` | home con i servizi (QR sul retro del flyer) |
| `demo/index.html` | `https://targa10.it/demo/` | pagina della matricola di esempio VMC-850, copia dell'artifact "Manuale digitale VMC-850". Il QR sulla targa del flyer la apre sulla scheda Chiedi (`/demo/#chiedi`) |
| `demo/api/chiedi.php` | `https://targa10.it/demo/api/chiedi.php` | assistente AI della scheda Chiedi (PHP sul server, vedi sotto) |
| `checkup.html`, `faq.html`, `esempio.html`, `en.html`, `privacy.html` | stesse pagine del sito | |

**Non togliere `demo/`**: senza quella cartella il QR sul fronte del flyer dà errore 404.

## Pubblicazione automatica (consigliata)

Il workflow `.github/workflows/pubblica-sito.yml` carica questa cartella sull'hosting Aruba via FTP ogni volta che cambia, poi apre `https://targa10.it/demo/` da internet e controlla che si veda la demo.

Una volta sola, in GitHub: **Settings › Secrets and variables › Actions › New repository secret**:

| Secret | Valore |
|---|---|
| `FTP_SERVER` | di solito `ftp.targa10.it` (pannello Aruba o mail di attivazione dell'hosting) |
| `FTP_USERNAME` | utente FTP dell'hosting |
| `FTP_PASSWORD` | password FTP |
| `ANTHROPIC_API_KEY` | facoltativo: chiave API di Anthropic per l'assistente AI della scheda Chiedi |

Se la cartella pubblica non è quella in cui si entra via FTP, aggiungi nella scheda **Variables** `FTP_DIR` con il percorso giusto (per esempio `./www.targa10.it/`).

Nel riepilogo del workflow (scheda Actions) compare l'esito: "QR del flyer OK" quando la demo si apre, altrimenti il motivo (SSL non attivo, dominio che non punta all'hosting, cartella sbagliata). Sotto c'è lo stato dell'assistente AI.

## Assistente AI della scheda Chiedi

Nell'artifact la scheda Chiedi usa il Claude di chi guarda. Sul sito la domanda va a `demo/api/chiedi.php`, che chiama l'API di Anthropic con la chiave salvata sul server. Il manuale (`demo/api/manuale.txt`) e le regole stanno sul server, quindi l'assistente risponde solo sulla VMC-850 e non diventa una chat generica.

- **Serve:** il secret `ANTHROPIC_API_KEY` e PHP 8.1 o superiore sull'hosting (si sceglie nel pannello Aruba). Le librerie PHP (`vendor/`) le installa il workflow.
- **Senza chiave**, o se il server non risponde, la pagina risponde con il manuale e le sue traduzioni in 7 lingue, come prima.
- **Modello:** Claude Opus 5.5 con sforzo basso. Regole e manuale stanno in cache e la risposta è di 110 parole al massimo. Se il modello declina una domanda per motivi di sicurezza, l'API riprova sul modello di riserva.
- **Costo:** circa 1 centesimo a domanda; 200 domande in fiera costano circa 2 €.
- **Limiti contro gli abusi:** 15 domande l'ora per indirizzo IP, 200 al giorno in tutto, domande di 400 caratteri al massimo. In più, nella Console di Anthropic imposta un tetto di spesa mensile.
- Se cambi il manuale dentro `demo/index.html`, rigenera `demo/api/manuale.txt` con `node sito/demo/api/strumenti/estrai-manuale.mjs`.
- La privacy (`privacy.html`) dice già che le domande della demo passano da Anthropic e che Targa10 non le salva.

## Pubblicazione a mano su Aruba (hosting Linux)

1. Apri il File Manager del pannello Aruba, oppure collegati via FTP (`ftp.targa10.it`, con utente e password FTP del pannello).
2. Carica il **contenuto** di questa cartella nella cartella pubblica del dominio, quella dove Aruba mette la pagina di benvenuto. Ci devono finire direttamente `index.html` e la cartella `demo/`, non una cartella `sito/`.
3. Attiva il certificato SSL dal pannello e il reindirizzamento da http a https.
4. Prova dal telefono, con il Wi-Fi spento:
   - `https://targa10.it/`
   - `https://targa10.it/demo/`
   - `https://www.targa10.it/demo/`

Caricata a mano, la scheda Chiedi risponde con il manuale tradotto: per l'AI servono le librerie e la chiave, che mette il workflow.

## Se l'hosting Aruba non è pronto in tempo

Pubblica la cartella su Netlify o su Cloudflare Pages: si trascina la cartella, l'HTTPS è automatico. Poi, nel pannello DNS di Aruba, punti `targa10.it` e `www` al servizio scelto. I QR non cambiano, perché puntano al dominio e non all'hosting.

## Da completare prima di pubblicare

- Partita IVA in home page: è obbligatoria sul sito di chi ha una partita IVA. Oggi il footer dice "Dati fiscali e sede: in sede di contratto". I dati vanno in `js/site.js` (oggetto `T10`) e nel footer di `index.html`.
- Privacy: completare titolare, sede e PEC (`privacy.html`).
- Le pagine caricano i font da Google Fonts. Per il GDPR è più pulito ospitarli sul sito; si può fare dopo la fiera.
