# CAC della Receptionist AI Assemblo — analisi del 24/10/2026

Calcolatore interattivo: `cac-calculator/index.html` (aprilo nel browser). Questo file spiega da dove vengono i numeri e cosa ne segue.

**Importante:** i tassi di conversione sono benchmark pubblici di fornitori di software (di parte) o ipotesi mie. Nessun numero è validato sul tuo mercato. Il CAC reale lo conoscerai solo dopo i primi test (sezione 7).

## 1. Risultato in una tabella

Prezzo €249/mese (punto medio del pacchetto Business), costo per servire un cliente €75/mese, tuo tempo €25/ora, 0,75 h per demo, onboarding €100.

| Canale | CAC Base | CAC Prudente | Ore/mese (Base) | Nota |
|---|---:|---:|---:|---|
| Partner (commercialisti, web agency, gestionali) | €352 | €582 | 14 | Il più economico ma lento: 2–3 mesi per attivarli |
| Cold email | €378 | €1.303 | 19 | Il rischio è legale e di consegna, non di costo |
| Cold call | €455 | €1.322 | 78 | Richiede molto tempo tuo |
| Visita di persona | €510 | €1.604 | 42 | Solo zona vicina, ipotesi senza benchmark |
| Meta Ads | €784 | €2.946 | 19 | Lead a bassa intenzione |
| Google Ads | €786 | €4.636 | 13 | CPC italiano non verificato |

Lo scenario Prudente usa anche churn 6% (Base 4%, Ottimista 2,5%).

- **LTV Base:** circa €4.350 (contributo €174/mese × 25 mesi). **CAC massimo sostenibile:** circa €1.450.
- **Per €10.000 di MRR servono 41 clienti.** Con churn 4% significa circa 4,2 nuovi clienti al mese per 12 mesi.
- Nel Prudente, Meta e Google Ads non reggono (LTV:CAC 1× e 0,6×). Gli altri canali vanno da 1,7× a 4,3×: solo i partner superano la soglia di 3×.

**Lettura onesta:** finché non hai dati, pianifica con un CAC tra €500 e €1.500, cioè tra Base e Prudente. Con quel CAC il payback è di 3–9 mesi, quindi il problema non è il CAC. Il problema è se il cliente resta (churn) e se paga €249 quando un concorrente italiano parte da circa €40.

## 2. Concorrenza (prezzi pubblici di ingresso)

| Fornitore | Prezzo | Fonte |
|---|---|---|
| Yourang.ai (Italia) | circa €40/mese base, sale con i volumi | [Milano Finanza, gen 2026](https://www.milanofinanza.it/news/se-l-ia-risponde-al-centralino-e-prende-pure-gli-appuntamenti-202601281846312514) |
| Synthflow | $29/mese per 50 minuti | blog di confronto (elenco sotto) |
| RingCentral AI Receptionist | da $39/mese, circa 100 minuti | risultati di ricerca (elenco sotto) |
| Rosie | da $49/mese (250 minuti) | blog di confronto (elenco sotto) |
| Goodcall | da $79/mese | blog di confronto (elenco sotto) |
| Smith.ai | da $95/mese + extra a chiamata | blog di confronto (elenco sotto) |
| Slang.ai (ristoranti) | da $399/mese per sede | blog di confronto (elenco sotto) |
| Fascia ristoranti Italia | €99–499/mese per sede (generica) | [Techsy](https://techsy.io/it/blog/agente-vocale-ai-per-ristoranti) |
| Fonio.ai (Italia) | prezzi non trovati | [Fonio](https://www.fonio.ai/it/campaign/hf-lp) |

Per i prezzi in dollari la ricerca non mi ha detto quale pagina riporti quale cifra, quindi non li attribuisco a una fonte precisa. Le pagine consultate sono: [MyAIFrontDesk](https://www.myaifrontdesk.com/blogs/ai-receptionist-pricing-comparison-2025-find-the-best-value), [Dupple](https://dupple.com/learn/best-ai-receptionists), [FitSmallBusiness](https://fitsmallbusiness.com/best-ai-virtual-receptionists/), [Calilio](https://www.calilio.com/blogs/best-ai-answering-services), [Lilach Bullock](https://www.lilachbullock.com/ai-receptionists-for-small-business-cost/), [Retell AI su RingCentral](https://www.retellai.com/it/blog/ringcentral-pricing). Sono blog di confronto, spesso con affiliazioni, e le cifre divergono (per Goodcall una fonte dice minuti illimitati, un'altra 100 chiamate). Verifica i prezzi sui siti ufficiali prima di usarli in un'offerta.

**Cosa implica per il tuo prezzo:**
- Con €249 sei 6 volte sopra Yourang.ai. Il cliente chiederà "perché pagare €249?" e la risposta non può essere "perché usa l'AI". Deve essere: italiano naturale, integrazione col suo calendario/gestionale, configurazione fatta da te, assistenza.
- La tecnologia non è un vantaggio: chiunque può assemblarla in un giorno con Vapi, Retell o Synthflow. Il tuo vantaggio può essere solo la distribuzione e la specializzazione per settore. Per questo il CAC conta più dello stack.
- Il costo voce è reale: le guide di confronto su Vapi e Retell indicano circa $0,10–0,30 al minuto tutto compreso (voce, trascrizione, modello, telefonia), con cifre che vanno verificate sui siti ufficiali ([Zeeg](https://zeeg.me/en/blog/post/vapi-ai-pricing), [Eesel](https://eesel.ai/blog/retell-ai-pricing), [Ainora](https://ainora.lt/blog/ai-voice-agent-cost-per-minute-2026)). Con 300–500 minuti al mese per cliente i €75 di costo che ho ipotizzato sono plausibili ma vanno misurati. Ai prezzi dei concorrenti sotto €75 il tuo contributo è negativo: non puoi inseguirli sul prezzo.

**Come analizzare i concorrenti sul CAC, gratis:** cerca i loro annunci nella [Meta Ad Library](https://www.facebook.com/ads/library/) e nel [Google Ads Transparency Center](https://adstransparency.google.com/). Un annuncio attivo da più di 60 giorni di solito è redditizio per chi lo paga. È un'euristica, non un dato.

## 3. Mercato (dimensione)

- Ristorazione italiana: 328 mila imprese nel 2024, in calo dell'1,2%; i ristoranti sono oltre 195 mila ([FIPE-Confcommercio, via Gambero Rosso](https://www.gamberorosso.it/notizie/attualita/ristorazione-rapporto-fipe-2025/)). Il totale per segmento va verificato sul rapporto originale.
- Ricettivo: circa 32.900 esercizi alberghieri e circa 232.000 extra-alberghieri nel 2024 ([ISTAT](https://www.istat.it/storage/ASI/2025/capitoli/C19.pdf)); i due registri (ISTAT e Ministero del Turismo) non sono confrontabili tra loro.
- Il mercato non è il vincolo. Lo sono la fiducia dei titolari, il prezzo e il churn.

## 4. Cosa ho trovato su GitHub

Non esiste un repository open source che calcoli il CAC di un servizio come il tuo partendo dalla concorrenza. Ho trovato strumenti vicini; ho scaricato solo quello utile adesso.

| Repo | A cosa serve | Serve ora? |
|---|---|---|
| [gosom/google-maps-scraper](https://github.com/gosom/google-maps-scraper) | Liste di attività locali (nome, telefono, sito, email) da Google Maps. Licenza MIT, ultimo commit 21/10/2026 | **Sì, per il costo per lead.** Scaricato (commit `903b96d`), non eseguito |
| [pymc-labs/pymc-marketing](https://github.com/pymc-labs/pymc-marketing) | Marketing mix modelling e modelli di valore del cliente (Python) | No: servono mesi di spesa e conversioni per canale. Utile dopo, per churn e LTV con dati reali |
| Google Meridian, Meta Robyn | Marketing mix modelling ([Search Engine Land](https://searchengineland.com/?p=438754), [Digiday](https://digiday.com/marketing/wtf-is-open-source-marketing-mix-modeling/)) | No, stesso motivo. Secondo una fonte Robyn è disponibile solo in R. Non ho verificato direttamente i repository |
| Scraper della Meta Ad Library | Annunci dei concorrenti | Esiste un [topic GitHub](https://github.com/topics/meta-ads-library) con scraper Python, ma non ne ho verificato nessuno (manutenzione, licenza, se funzionano ancora). Le opzioni commerciali trovate sono a pagamento ([Apify](https://apify.com/s-r/meta-ads-library)). Intanto usa la Ad Library a mano |
| Calcolatori CAC/LTV | Unit economics SaaS | Nessun repo completo trovato: per questo ho costruito `index.html` |

**Dove sta il download:** `/tmp/claude-0/-home-user-site1/b9fcced7-4c2c-5d09-8f21-e7167544f6ad/scratchpad/gosom-gmaps/repo`. È codice di terzi, quindi non l'ho messo nel tuo repository. L'ambiente è temporaneo: per riaverlo basta `git clone --depth 1 https://github.com/gosom/google-maps-scraper`.

**Prima di usarlo:** raccogliere dati da Google Maps con uno scraper può violare i termini di Google, e usare i contatti trovati per marketing ricade nel GDPR. Chiedi al tuo consulente.

## 5. Hugging Face

Non scaricato: `huggingface.co` è bloccato dalla rete dell'ambiente ("CONNECT tunnel failed, 403") e il connettore Hugging Face non è installato. Per CAC e marketing sull'Hub c'è poco di utile. Servirebbe per un altro scopo: cercare modelli di riconoscimento e sintesi vocale in italiano per abbassare il costo per minuto, quindi il margine.

## 6. Rischi legali del contatto a freddo in Italia (da verificare con un professionista)

- Il [Registro Pubblico delle Opposizioni](https://garanteprivacy.it/temi/telemarketing) copre ora tutti i numeri fissi e mobili, anche quelli non in elenco.
- L'[art. 130 del Codice Privacy](https://www.diritto.it/garante-privacy-parere-favorevole-al-nuovo-schema-di-regolamento-per-il-registro-pubblico-degli-opposti/) richiede il consenso per chiamate automatizzate e per comunicazioni commerciali via email, fax e SMS.
- **Non sono riuscito a verificare come si applichino al B2B.** Le fonti trovate non lo chiariscono.
- Partner, visite di persona e annunci inbound hanno meno rischio. Cold email e cold call a scala sono i canali dove farei vedere il piano a un consulente prima di partire.

## 7. Come validare i numeri in due settimane

| Test | Costo | Cosa misura | Soglia per continuare (Base) |
|---|---|---|---|
| 100 chiamate a ristoranti/hotel della tua zona | circa 5–6 ore | Demo fissate / chiamata | almeno 2 demo su 100 |
| 30 visite di persona | circa 8 ore | Demo fissate / visita | almeno 2–3 demo su 30 |
| 500 email (liste da Maps) | circa €120 di strumenti, più il tempo | Demo fissate / email | almeno 2–3 demo |
| Keyword Planner di Google (gratis) | €0 | CPC reale di "centralino AI ristorante", "segretaria virtuale" | CPC sotto €4 |
| Meta Ads test | €300 | Costo per lead | sotto €25 |
| 5 contatti con commercialisti o web agency | circa 5 ore | Quanti accettano di segnalare | almeno 1 su 5 |

Sostituisci poi le ipotesi nel calcolatore con i tuoi risultati. Le soglie sono mie e indicative.

## 8. Verdetto

**Lo farei, con tre condizioni.**
1. Parti da canali con CAC basso e poco rischio (partner, visite nella tua zona, chiamate dopo la verifica legale). Non da Google/Meta Ads: nello scenario Prudente perdono soldi.
2. Misura il churn dei primi 10 clienti prima di spendere in acquisizione. Un 6% mensile dimezza quasi l'LTV rispetto a un 2,5%.
3. Decidi il tuo prezzo prima di parlare con i clienti. Con €249 hai margine, ma sei sopra la fascia bassa del mercato: o dimostri il valore (chiamate perse recuperate in euro) oppure scendi di pacchetto.

**Punteggio opportunità: 6/10** (mio giudizio). Mercato ampio e CAC sostenibile sulla carta, ma servizio replicabile da chiunque, prezzo sotto pressione e nessun dato tuo.

## 9. Primi 10 passi

1. Scrivi una frase di valore in euro: "ogni chiamata persa a un ristorante vale X euro" (usa un dato reale del settore, non inventato).
2. Prepara una demo vocale in italiano che risponda al numero di un titolare durante la visita o la call.
3. Chiedi a un consulente la base legale per email e telefonate a freddo.
4. Crea una lista di 150 ristoranti/hotel della tua zona (scraper di Maps o a mano).
5. Fai 30 visite e 100 chiamate, annotando ogni esito.
6. Contatta 5 commercialisti o web agency con una proposta di commissione.
7. Controlla il CPC su Keyword Planner e gli annunci dei concorrenti nella Ad Library.
8. Inserisci i tuoi tassi veri nel calcolatore.
9. Chiudi 3–5 clienti pilota a prezzo pieno e misura minuti, costi voce e disdette.
10. Solo dopo, decidi se scalare con ads o con un venditore.

## Fonti dei benchmark

- Cold email: [Visionary Marketing](https://visionary-marketing.co.uk/blog/b2b-cold-email-statistics-2026), [Cleverly](https://www.cleverly.co/blog/cold-email-statistics), [Apollo](https://www.apollo.io/insights/what-is-a-good-benchmark-for-reply-rates-in-cold-outreach)
- Cold call: [Apollo](https://apollo.io/insights/whats-the-average-conversion-rate-for-cold-prospecting), [StealthAgents](https://stealthagents.com/research/appointment-setting-statistics-2026), [Webtonic](https://www.webtonic.io/blog/sales-statistics)
- Google Ads (USA): [ClickMinded](https://www.clickminded.com/google-ads-benchmarks/)
- Churn: [SchedulingKit](https://schedulingkit.com/statistics/ai-receptionist-statistics) (retention 81% a 12 mesi, non verificata), [LiveX](https://livex.ai/blog/ai-tools-churn-rate-benchmark-understanding-retention-across-industries)
- CAC payback e formule: [Founderpath](https://founderpath.com/free-tools/cac-calculator), [UserJot](https://userjot.com/tools/unit-economics-calculator)
