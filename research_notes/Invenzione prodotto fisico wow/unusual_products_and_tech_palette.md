# Unusual AliExpress/Alibaba products (cat. 15-20) and the cheap enabling-technology palette (state: 2025-2026, researched 2026-11-13)

**Read this first: method, sample, limitations and label legend (applies to every section).**

- **Method.** 36 web searches (short queries on Alibaba / LCSC / Made-in-China / distributors / Hackaday / tech press). Direct page fetches were attempted on 3 hosts (lcsc.com, techcrunch.com, smarthomescene.com) and **all failed: the hosts are outside this session's allowed network domains**. Consequently **no listing page was opened by me**; every price below comes from the search engine's extract of the cited page.
- **Sample.** About 45 component price points across about 30 component families; about 25 finished-product / review sources for Part A. AliExpress itself returned almost no price data in search (it mostly returned seller-hosted "AliExpress Wiki" promo pages), so "AliExpress price" is generally NOT verified; Alibaba, LCSC, Made-in-China and western resellers stand in for it.
- **Label legend.**
  - **VERIFIED-S** = price/fact appeared in a search extract and the source URL is unambiguous. Not re-opened live, not dated; treat as a snapshot.
  - **VERIFIED-S?** = price appeared in a search extract, but the search returned several listings and the mapping of price to the exact URL is my best match, not certain.
  - **ESTIMATE** = my own figure from general knowledge of the market, no source found in this session. Do not quote as fact.
  - **HYPOTHESIS** = my reasoning about demand, gaps or combinations; untested.
- **Limitations.** (1) Alibaba prices are asking/sample prices, often placeholders; real quotes differ. (2) Prices are in the currency shown by the source (USD, GBP, EUR, CNY); not converted. (3) Shipping, VAT, duty and EU compliance costs (CE/RED, battery rules) are excluded. (4) Several search snapshots of the same LCSC part disagreed (example: ESP32-C3-MINI-1-N4 at $3.00 vs $1.29 for 1 unit), so stock/price drift is real. (5) Part A (finished products, loved features, complaints) is thinly sourced: no review dataset was reachable, so most "loved/complaint" statements are HYPOTHESIS unless a URL is attached. (6) Not found at all: graphene heating film, PCM microcapsule per-kg price, MEMS laser projection module price, cheap electropermanent magnet, small LiPo/LiFePO4 cell prices, piezo disc prices, neodymium magnet prices, kinetic harvester prices, flex-PCB prices.

---

## Which components enable a surprising "wow" physical effect for under ~EUR 5 BOM?

### Takeaway
At sourced prices, the effects that fit inside a ~EUR 5 budget for the effect-generating part are: cold mist (ultrasonic mesh disc, about $1-2), "sees you without a camera" presence sensing (24 GHz radar module, $3-4.2), glowing bendable "neon" lines (3 V LED filament, $0.07-0.11 in volume), crisp phone-like haptic clicks (LRA, $0.7-1.1), color change with temperature (thermochromic pigment, cents per product), tap-to-act NFC ($0.07-0.09), motion/gesture sensing (6-axis IMU about $1.1) and weight sensing (load cell + HX711 about GBP 1.5). Levitation, PDLC privacy film in useful sizes, e-ink, UWB, CO2 sensing and electropermanent magnets do NOT fit under EUR 5.

### Cited Findings
- Ultrasonic mesh atomizer disc 16 mm / 108 kHz: CN¥0.95 EXW, minimum order 1 piece, on Yiwugo (VERIFIED-S) — [Yiwugo](https://en.yiwugo.com/product/detail/979555600.html). A mirror of an Alibaba listing shows $1.98 for the same class of disc (VERIFIED-S?) — [china.org.ru mirror](https://china.org.ru/product/1600677952065). Alibaba spec for the class: atomization 40-60 ml/h, no price shown (VERIFIED-S) — [Alibaba ISSR listing](https://www.alibaba.com/product-detail/ISSR-16mm-108-Khz-Piezoelectric-Ultrasonic_1600987036819.html?s=p).
- 24 GHz presence radar HLK-LD2410B: sample price $3.00/piece on the maker's (Hi-Link) Alibaba listing, sample limit 5 pieces, MOQ 1000 for custom logo (VERIFIED-S) — [Alibaba Hi-Link](https://www.alibaba.com/product-detail/Hilink-HLK-LD2410B-24Ghz-Smart-Human_1600960728524.html). LCSC lists HLK-LD2410-P (C5183133) at $4.2316 for 1 unit (VERIFIED-S) — [LCSC datasheet page](https://www.lcsc.com/datasheet/lcsc_datasheet_2209290930_HI-LINK-HLK-LD2410-P_C5183133.pdf). Western retail is 3-4x higher: $9.90 at Walmart, US$12.51 at Abra (VERIFIED-S) — [Walmart](https://www.walmart.com/ip/5607656597), [Abra](https://abra-electronics.com/sensors/sensors-proximity-en/sens-ld2410c-24ghz-human-presence-sensor-ld2410c-fmcw-wave-radar-induction-module-body-heartbeat-detection.html).
- The LD2410 can detect a still person through blankets via chest movement, per a maker project; a Home Assistant community test called it "not quite there yet" for sleep presence and over-sensitive (conflicting reports) — [ShillehTek](https://shillehtek.com/blogs/news/esp32-hlk-ld2410-bedroom-occupancy); contradicted in part by [Home Assistant community](https://community.home-assistant.io/t/mmwave-wars-one-sensor-module-to-rule-them-all/453260).
- 3 V LED filament, 38 mm: $0.11 at 100-499 pieces, $0.07 at 5,000+, sample $2 (VERIFIED-S?) — [Alibaba UK](https://www.alibaba.co.uk/product-detail/DC-3V-LED-Filament-Bulb-38mm_1601673277243.html). The same class at hobby retail: Adafruit 25 mm single-ended filament $2.50, $2.00 at 100+ (VERIFIED-S) — [Adafruit](https://adafruit.com/product/6141); DFRobot 260 mm, 5-pack $10.00 (VERIFIED-S) — [DFRobot](https://dfrobot.com/product-2335.html).
- LRA haptic actuator 8 x 3.2 mm: about $0.80 per unit on Alibaba; neighbouring 8 x 2.5/2.6 mm parts $0.70-1.07 with MOQ 100-150 (VERIFIED-S?) — [Alibaba mirror](https://china.org.ru/product/60686121234), [Alibaba taptic page](https://electronics.alibaba.com/product/taptic-engine). Distributor price for a branded 0832 LRA: $3.15 at 1 unit (VERIFIED-S) — [ichome](https://ichome.com/product-detail/ineed-motor/lra0832be03l15).
- Thermochromic pigment: Alibaba sample prices $0.26/gram (XIANGCAI) and $30/kg (Kolortek sample), both VERIFIED-S? — [Alibaba](https://www.alibaba.com/product-detail/thermochromic-pigment-temperature-sensitive-color-changing_60774686151.html), [Kolortek](https://colortech.en.alibaba.com/product/60295730043-810940806/Thermo_Chromatic_Additive_Powder_Thermochromic_Paint_Pigments.html). Retail: Adafruit 10 g for $2.48, changes to light/white at 31 °C (VERIFIED-S) — [Adafruit](https://adafruit.com/product/4137). One Alibaba 31 °C listing shows an outlier $10/gram sample price (VERIFIED-S?) — [Alibaba](https://www.alibaba.com/product-detail/High-Temperature-Reversible-Thermochromic-Cold-Sensitive_1600554843619.html).
- NFC NTAG213 sticker: $0.07-0.09/piece, MOQ 500 on Alibaba (VERIFIED-S?) — [Alibaba](https://www.alibaba.com/product-introduction/High-Frequency-Access-Control-NTAG-213_1600268042016.html). EU retail: EUR 0.22/unit at 1,000 for a 22 mm round sticker (VERIFIED-S) — [shopnfc](https://www.shopnfc.com/en/nfc-stickers/364-nfc-stickers-ntag213-round-o22mm.html). Fudan-chip 25 mm coin sticker $0.08 at 1,000 (VERIFIED-S) — [abcrfid](https://www.abcrfid.com/?p=1480).
- 6-axis IMU QMI8658C: $1.1278 at 1 unit on LCSC (VERIFIED-S) — [LCSC C2842151](https://www.lcsc.com/datasheet/lcsc_datasheet_2312271633_QST-QMI8658C_C2842151.pdf). ST LSM6DS3TR: $1.5862 at 1, $0.9479 at 1,000+ (VERIFIED-S) — [LCSC C95230](https://www.lcsc.com/product-detail/C95230.html).
- MEMS microphone LinkMems LMA2718S421-OY1C: $0.458 at 1, $0.2984 at 100+ (VERIFIED-S) — [LCSC C5373226](https://datasheet.lcsc.com/lcsc/2305061754_LinkMems-LMA2718S421-OY1C_C5373226.pdf).
- Mini load cell (SC133) with HX711 accessory: GBP 1.51 at 100-2,999, GBP 1.13 at 3,000-9,999, GBP 0.7523 at 10,000+ (VERIFIED-S; listed capacities 1-2 kg) — [Alibaba UK](https://www.alibaba.co.uk/product-detail/SC133-Miniature-micro-beam-weight-sensor_1601790177192.html).
- The controller itself is almost free: the WCH CH32V003 RISC-V MCU was announced at under 10 cents (quantity unspecified); a 2025 Hackaday piece still calls it a 10-cent chip "if you know where to look"; one maker paid under 20 cents each for 50 — [CNX Software](https://www.cnx-software.com/2022/10/22/10-cents-ch32v003-risc-v-mcu-offers-2kb-sram-16kb-flash-in-sop8-to-qfn20-packages/), [Hackaday 2025](https://hackaday.com/2025/10/23/10-cent-microcontroller-makes-music), [Hackaday tag](https://hackaday.com/tag/ch32v003/).
- Things that look cheap but are over the EUR 5 line: 1.54" e-paper $5.20-7.60 (see palette), magnetic levitation module $15.80+ (see palette), PDLC sample pieces about GBP 15.60 for 4x4 inch on eBay (VERIFIED-S) — [eBay](https://www.ebay.com/itm/Small-Size-Sample-PDLC-Window-Film-Smart-Glass-Privacy-Control-Self-adhesive/284267581716).

### Inferences
- HYPOTHESIS: the strongest "wow per euro" comes from pairing an invisible sensor with a visible/tactile actuator that both sit under about $1-4: radar + mist, radar + LED filament, IMU + LRA, load cell + thermochromic surface. Each pair plus a 10-20 cent MCU plausibly lands at EUR 3-6 BOM before housing, battery and power electronics (ESTIMATE; housing and battery usually dominate).
- HYPOTHESIS: PDLC film is cheap per area ($8.5-30/m², see palette) but expensive per small sample; a product using a postcard-sized piece could be under EUR 1 of film at roll pricing, but needs an AC driver (cost not found) and a 2-10 m² minimum order.
- ESTIMATE (no source this session): piezo buzzer discs about $0.03-0.10; small N35 neodymium discs about $0.02-0.10; 1 W 5 V mist driver board about $0.5-1. Verify before use.

### Gaps
- No price found for: graphene heating film, piezo discs, neodymium magnets, shape-memory springs (as opposed to wire), kinetic/piezo harvesters, small LiPo/LiFePO4 cells, flex PCBs, mist-disc driver boards, PDLC drivers.
- AliExpress single-unit prices were not retrievable; AliExpress is usually cheaper than the western reseller prices quoted here, but that is an ESTIMATE.

---

## Which technologies are underused in consumer products relative to their price?

### Takeaway
On the evidence found, the clearest price-vs-adoption mismatches are 24 GHz presence radar ($3-4, still mostly a smart-home-hobbyist part), offline voice-command chips (western retail $7.5-12 for full modules; chip-level cost unverified), LRA haptics (under $1.1), NFC ($0.07-0.09), 6-axis IMUs (about $1.1) and thin aerogel felt ($5.7-25/m²). I found no source that makes the "underused" argument explicitly; this section is mainly inference from prices.

### Cited Findings
- 24 GHz radar is described as "the typical low-cost starting point" for static room presence in Home Assistant setups; ESPHome ships ready components for LD2410 and LD2450, i.e. the audience today is DIY smart-home users — [OpenELAB comparison](https://openelab.io/blogs/learn/24ghz-vs-60ghz-mmwave-presence-sensors).
- LD2450 gives multi-target coordinates/zones rather than occupied/not-occupied; it is less suitable for a single still sleeping body — [OpenELAB](https://openelab.io/blogs/learn/24ghz-vs-60ghz-mmwave-presence-sensors).
- A battery-powered presence sensor on the low-power LD2410S exists as a community project (so battery operation of radar is feasible but niche) — [Home Assistant community](https://community.home-assistant.io/t/battery-powered-presence-sensor-with-ld2410s/756296).
- Fall detection and sleep monitoring are sold as firmware features of 60 GHz modules (example: DFRobot C1001), not of the cheap 24 GHz parts; maker radar modules are not certified medical devices — [OpenELAB](https://openelab.io/blogs/learn/24ghz-vs-60ghz-mmwave-presence-sensors), [How2Electronics](https://how2electronics.com/esp32-c1001-mmwave-sensor-for-sleep-fall-life-detection/).
- Offline voice modules, western retail: M5Stack ASR module (CI1302, with mic, speaker, echo cancellation) $8.95 / GBP 8.60 ex-VAT; CI-03T unit $7.50; ASR-PRO core board $8.95; SU-03T1 $11.84 (all VERIFIED-S) — [reach.dog CI1302](https://reach.dog/shop/m5stack-store/products/m5stack-asr-module-ci1302), [The Pi Hut](https://thepihut.com/products/m5stack-asr-module-ci1302), [reach.dog CI-03T](https://m.reach.dog/shop/m5stack-store/products/asr-unit-with-offline-voice-module-ci-03t), [Fruugo ASR-PRO](https://www.fruugo.ca/asr-pro-core-board-speech-recognition-control-module-ai-offline-recognition-module-pin-headers-not-soldered-4m/p-456615762), [Walmart SU-03T1](https://www.walmart.com/ip/17665016333).
- Aerogel felt 3 mm: $13-22/m² FOB with MOQ 100 m² (VERIFIED-S?) — [Made-in-China](https://www.madeinchina.com/mall/show-3mm-6mm-10mm-Thermal-Insulation-Aerogel-Blanket_1031027.html); tiered $25 (2 m²+), $15 (500 m²+), $10 (1,000 m²+) (VERIFIED-S?) — [bestsuppliers](https://bestsuppliers.com/products/pn7lnzssvu4g/factory-price-glass-fiber-aerogel-felt-3mm-5mm-10mm-thickness-silica-aerogel-felt-aerogel-blanket); lowest seen $5.69 FOB at MOQ 500 m² (VERIFIED-S?) — [ship4wd](https://sourcing.ship4wd.com/product/silicone-dioxide-nano-air-gel-felt-insulation-insulation-cotton-high-temperature-resistant-material-10mm-air-gel-felt-manufacturer).
- UV-C LEDs have collapsed to commodity pricing: a 3535 UVC chip at $0.15 with MOQ 1,000 in an Alibaba sourcing guide (VERIFIED-S, undated, indicative); a 270/280 nm 45 mW 3535 part at about GBP 0.75 (100-499) down to GBP 0.46 (10,000+), sample GBP 1.14 (VERIFIED-S?) — [Alibaba guide](https://www.alibaba.com/price-comparison/uvc-led), [Alibaba UK](https://www.alibaba.co.uk/product-detail/Standard-UVC-LED-Ceramic-Package-270nm_1601785899008.html). One supplier states only 10,000 h life (VERIFIED-S?) — [Alibaba Zhiding](https://dg-zhiding.en.alibaba.com/product/62113320614-214442798/SMD_3535_UVC_LED_265nm_270nm_275nm_280nm_285nm_uv_led_lamps.html).
- Microencapsulated phase-change materials are described in patents as high-priced, low-volume specialty goods because encapsulation "dramatically increases" cost; no per-kg price found — [USPTO 10047263](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/10047263).
- Shape-memory wire: Alibaba 1 mm nitinol at $4.20-6 per metre with a 1 m minimum (VERIFIED-S?); bulk $80-500/kg depending on grade (VERIFIED-S?) — [Alibaba suppliers page](https://www.alibaba.com/shape-memory-metals-alloys-suppliers.html), [Alibaba ASTM F2063](https://www.alibaba.com/product-detail/ASTM-F2063-Niti-Shape-Memory-nitinol_1600395377534.html). Western lab retail is far higher: about EUR 45/m (Nanografi) or $3.14/ft (Nexmetal) (VERIFIED-S) — [Nanografi](https://shop.nanografi.com/shape-memory-materials/nitinol-shape-memory-alloy-wire-diameter-1-mm-af-45-50-c/), [Nexmetal](https://nexmetal.com/products/nitinol-memory-wire).
- Electropermanent magnets are NOT cheap in ready form: Zubax FG40 EPM EUR 130 / $149; DigiKey 50 mm unit EUR 181.24 (VERIFIED-S) — [Zubax](https://shop.zubax.com/collections/electropermanent-magnets/products/zubax-epm), [RobotShop](https://robotshop.com/products/zubax-zubax-fg401m-electro-permanent-magnetic-gripper-epm), [DigiKey](https://www.digikey.de/en/products/detail/eclipse-magnetics/M52178-24VDC/26741663).
- "Electrochromic film" on marketplaces is mostly PDLC (scattering privacy film), a different technology from true electrochromic tinting — search-result synthesis over listings such as [eBay sample](https://www.ebay.de/itm/323781655961) and [Alibaba Teejoin](https://www.alibaba.com/product-detail/Teejoin-Electrochromic-Glass-Film-Self-Adhesive_1600142011845.html).

### Inferences
- HYPOTHESIS (ranking of underuse, my judgement): (1) 24 GHz radar outside lighting/occupancy: almost absent from furniture, toys, lamps, kitchen and bathroom objects although it works through plastic, fabric and thin wood; (2) offline voice chips: no cloud, no app, no privacy problem, yet mostly seen in cheap fans/lamps; (3) LRA haptics outside phones and wearables; (4) aerogel felt in everyday consumer objects (lunch boxes, pet items, clothing inserts); (5) nitinol wire as a silent actuator (slow, power-hungry, limited cycle life: ESTIMATE); (6) NFC as a zero-power "physical button" for the phone.
- HYPOTHESIS: an electropermanent magnet (holds with zero power, switches with a pulse) has no cheap module but is made of cheap parts (ESTIMATE: an AlNiCo rod, a neodymium magnet, a coil and a pulse driver; a few euros in volume). That gap between part cost and module price is a possible differentiator but needs engineering.
- HYPOTHESIS: UV-C LEDs are cheap but carry safety and efficacy-claim risk (eye/skin exposure, short life, low optical power at the $0.15 tier); attractive on price, risky as a product core.

### Gaps
- No source found that explicitly quantifies adoption (e.g. share of consumer products containing radar or voice chips). "Underused" is inference.
- Chip-level price of offline voice ICs (CI1302, SU-03T, ASRPRO on AliExpress/LCSC) not verified; ESTIMATE $1-3 per module on AliExpress.
- No price found for graphene heating film or PCM; no data on nitinol cycle life or actuation current.

---

## What unusual or little-known finished products exist that hint at latent demand?

### Takeaway
Sourced evidence is thin, but consistent: demand shows up for (a) companionship/"alive" desk objects (AI desktop robots, AI "soulmate" screens, pet robots), held back by battery life and Wi-Fi; (b) cameras without subscription or privacy risk; (c) pocketable multi-role tools (pump that is also a vacuum, phone-sized umbrella, pocket iron); and (d) sensory novelties (music through the jaw, color-changing nails). The loved-features and complaint lists per category below mix a few cited facts with labelled hypotheses.

### Cited Findings

**(15) Home security**
- A researcher found firmware flaws, unprotected cloud uploads, false encryption and fake access controls in discount Wi-Fi cameras — [Tom's Guide](https://www.tomsguide.com/home/home-security/these-discount-wi-fi-cameras-let-anyone-look-into-your-home-heres-what-to-buy-instead).
- Recurring complaint in buyer guides: cheap cameras "appear affordable until the free cloud trial ends" and a per-camera monthly fee starts; advice is to require microSD local recording — [The Wearify](https://thewearify.com/best-cheap-surveillance-cameras/).
- Cheap "HD" cameras often deliver blurry 720p that cannot identify a face or plate; cheap kits fail in weather or lose connection after firmware updates — [The Wearify](https://thewearify.com/best-cheap-ip-camera/).
- A retailer-hosted review tabulates "fake 8MP (interpolated)" against real 8MP on PTZ cameras (promotional source, low reliability) — [AliExpress Wiki](https://www.aliexpress.com/s/wiki-ssr/article/generic-security-camera).
- SlashGear also advises caution with cheap security cameras — [SlashGear](https://www.slashgear.com/1897490/cheap-security-cameras-why-not-trust-use-explained).

**(16) Consumer robotics**
- Rux AI desktop robot: a buyer reported 15 minutes of runtime in pet mode against a claimed 1.5 hours, seller admitted a faulty battery; another unit froze and could not be reset — [Desertcart listing reviews](https://www.desertcart.vn/products/690080348-qujuso-rux-ai-desktop-robot-voice-dialogue-remote-monitoring-artificial).
- EMO desktop robot: the vendor's own support blog says it constantly disconnects on mesh Wi-Fi and cites 14-28 day shipping (vendor source) — [Keyi Robot](https://keyirobot.com/en-us/blogs/buying-guide/emo-robot-technical-review-problems).
- An affiliate roundup lists recurring cons of AI desktop robots: short battery life, weak voice pickup, flaky face tracking (affiliate site, no data shown) — [roundup](https://www.narcosis-the-game.com/best-ai-desktop-robots/).
- CES 2026: Lepro "Ami", a desktop OLED AI "soulmate"; an AI pet for elderly care; a Sharp companion robot; a WALL-E-style family robot from Zeroth Robotics; an AI panda that reacts to touch — [TechCrunch](https://techcrunch.com/2026/01/08/the-most-bizarre-tech-announced-at-ces-2026/), [Engadget](https://www.engadget.com/the-weirdest-tech-weve-seen-at-ces-2026-so-far-134056504.html).
- A Russian-language 2025 AliExpress finds series includes a "programmable AI robot" among popular picks — [Pikabu Geekbox](https://pikabu.ru/community/geekbox).

**(17) Eco-friendly products**
- Alibaba seller guidance: eco-friendly materials add about 15-30% to production cost versus virgin plastic; plastics still hold 53.88% of the foldable-container market (vendor-sourced, unverified) — [Alibaba seller blog](https://seller.alibaba.com/blogs/2026/southeast-asia/home-storage/eco-foldable-waterproof-sourcing-guide-alibaba-b2b).
- Alibaba page claims disposable tableware reached $12.7 bn in 2025 with eco products growing 14.3%/year (vendor-sourced, unverified) — [Alibaba smartbuy](https://smartbuy.alibaba.com/best-selling/best-selling-disposable-tableware).
- Sodium-ion 18650 cells are purchasable at retail: $14.33-14.99 per cell (HAKADI 1300 mAh 3 V) (VERIFIED-S); a 2024 buying guide says $5-12 per unit; cell-level benchmarks $70-100/kWh (conflicting levels, retail vs wholesale) — [reach.dog](https://acceptance.reach.dog/shop/hakadibattery/products/hakadi-sodium-ion-18650-3v-1300mah-battery-discharge-12c-na-ion-battery-rechargeable-cell-for-e-bike-power-tools-diy-12v-24v-48v-72v-battery-pack), [Alibaba guide](https://smartbuy.alibaba.com/buyingguides/sodium-ion-battery-18650), [Alibaba seller blog](https://seller.alibaba.com/blogs/2026/southeast-asia/energy-storage/sodium-ion-battery-components-procurement-guide-alibaba-b2b).

**(18) Transformable and multifunctional objects**
- A popular EDC mini pump inflates a beach mattress or boat and runs in reverse as a portable vacuum — [Hi-Tech Mail.ru](https://hi-tech.mail.ru/news/101457-top-neobychnyh-poleznyh-gadjetov/).
- Weekly AliExpress hit lists feature an umbrella the size of a smartphone and a pocket iron — [iPhones.ru umbrella](https://www.iphones.ru/iNotes/5-goryachennyh-gadzhetov-nedeli-s-aliexpress-naprimer-takoy-pylesos-roborock-chto-prosto-duh-zahvatyvaet-), [iPhones.ru pocket iron](https://www.iphones.ru/iNotes/15-zhelannyh-shtuk-s-aliexpress-so-skidkami-naprimer-karmannyy-utyug-kotoryy-mozhno-vsegda-brat-s-soboy).
- Foldable fans: demand described as driven by portable, sustainable, multifunctional cooling; neck fans a key trend (aggregator, low reliability) — [Accio](https://www.accio.com/business/foldable-fan-trends).
- Complaint pattern on multi-tools: a 3-in-1 stylus judged "noticeably inferior" in build even to other budget options; a 24-in-1 jack multitool reviewed under the question "useful or gimmick?" (retailer-hosted) — [AliExpress Wiki](https://www.aliexpress.com/s/wiki-ssr/article/jack-multitool).
- SlashGear lists clever foldable gadgets that are not phones — [SlashGear](https://www.slashgear.com/2184230/clever-foldable-gadgets-not-smartphones/).

**(19) Unusual technologies**
- Bistable cholesteric LCD (image stays with no power, like e-paper but different chemistry) bought from AliExpress and torn down, Sept 2025 — [atomic14](https://atomic14.com/tag/teardown.html).
- A second screen for a phone that mirrors calls, messages and passwords; reviewer found latency and a "dystopian" feel — [Supercar Blondie](https://supercarblondie.com/tech/youtuber-buys-tech-gadgets-from-aliexpress-with-wild-outcome/).
- CES 2026: lollipops/popsicle that play music through the jaw (bone conduction); nail polish that changes color via an app; headphones with eyes; vibrating knives — [Tom's Guide](https://www.tomsguide.com/tech-events/weirdest-gadgets-of-ces-2026), [TechRadar](https://www.techradar.com/tech-events/the-7-weirdest-gadgets-weve-seen-at-ces-2026-from-a-musical-popsicle-to-headphones-with-eyes), [Digit](https://www.digit.in/from-vibrating-knives-to-exoskeletons-7-of-the-craziest-gadgets-at-ces-2026/).
- Magnetic levitation is sold as bare modules for product builders: 150/300 g kit $15.80-18.80; 500-600 g display stand $25.50-44.60, MOQ 1 (VERIFIED-S?) — [Alibaba showroom](https://alibaba.com/showroom/levitating-ball.html), [Alibaba stand](https://www.alibaba.com/product-introduction/Suspended-floating-display-magnetic-levitating-rotating_60514178457.html). Western retail for a 500 g module: $69.99 (VERIFIED-S) — [StirlingKit](https://www.stirlingkit.com/products/500g-diy-magnetic-levitation-module).

**(20) Curious, surprising, little-known**
- A knock-off toy camera (copy of a Kodak keychain camera) turned out to be surprisingly hackable; it was removed from AliExpress in Europe — [Hackaday, Feb 2026](https://hackaday.com/2026/02/03/the-surprising-hackability-of-a-knock-off-chinese-toy-camera).
- A super-cheap projector teardown found the interior nearly empty — [Hackaday teardown tag](https://hackaday.com/tag/teardown/page/3/).
- A $5 AliExpress USB hub was called "mildly dangerous" because of a power fault — [PC Gamer](https://www.pcgamer.com/hardware/this-aliexpress-sourced-usd5-usb-hub-has-been-described-as-mildly-dangerous-for-your-pc-thanks-to-a-nasty-power-issue/).
- USB mini fridge listed among "strangest and most fun" AliExpress items — [Raenest](https://www.raenest.com/fr/blog/5-strangest-and-most-fun-things-you-never-knew-you-needed-from-aliexpress).
- A $1 logic analyzer from AliExpress impressed a reviewer (signal that bare-bones tools at absurd prices earn goodwill) — [makiuto blog](https://makiuto.github.io/p/blown-away-by-a-1-logic-analyzer-from-aliexpress.html).

### Inferences
All items below are HYPOTHESIS unless marked.

| Cat. | Loved features (hypothesis) | Recurring complaints (source where cited) | Unexploited combinations (hypothesis) |
|---|---|---|---|
| 15 Home security | Low price, no installation, local microSD | Subscription lock-in, privacy holes, inflated resolution (cited above) | Camera-free security: $3 radar + offline voice/siren + no cloud, no app; radar "someone is at the door" object that cannot leak video |
| 16 Robotics | Expressive eyes/"personality", desk presence | Battery minutes not hours, Wi-Fi drops, weak mic, face tracking (cited above) | "Alive" object with no screen, no Wi-Fi and no drive train: radar presence + IMU + LRA "purr"/heartbeat + LED filament; weeks of battery instead of minutes |
| 17 Eco | Visible material honesty, refill/repair | Eco adds 15-30% cost (cited); greenwashing; fragile | Battery-free interaction (NFC, bistable display, supercap + small solar); aerogel insulation to remove active heating/cooling |
| 18 Transformable | Pocketability, one object replacing three | Each function worse than a dedicated tool; flimsy hinges (cited: build quality) | Transformation driven by a sensor rather than the hand: shape or function changes on presence, weight or temperature (nitinol, magnets, thermochromics) |
| 19 Unusual tech | Visible "magic" (levitation, mist, bone conduction) | Novelty wears off; power-hungry; noisy coils (ESTIMATE) | Levitation or mist used as an information display (state of something) rather than decoration |
| 20 Curious | Surprise at price, hackability | Safety and quality (cited: USB hub) | Honest "open" gadgets sold as hackable by design |

- HYPOTHESIS: the strongest latent-demand signal across categories is "companionship without the failure modes": people buy desk robots and AI "soulmate" screens, then complain about battery, Wi-Fi and voice pickup. A low-power, offline, sensor-reactive object attacks all three complaints at once.
- HYPOTHESIS: the second signal is "privacy-safe awareness": camera distrust plus $3 radar means presence products that physically cannot record images.

### Gaps
- No access to AliExpress review text, order counts or bestseller rankings; "loved features" are therefore hypotheses, not measured.
- Reddit (r/shutupandtakemymoney, r/esp32, r/electronics) returned nothing in search; not sampled.
- No independent 2025-2026 dataset of complaints for any category; several sources are vendor, affiliate or retailer-hosted and are flagged as such.
- Eco category: no specific unusual finished products were found, only market-level vendor claims.

---

## Typical prices at 1 unit, 100, 1,000+ units (technology palette)

### Takeaway
For most palette items the volume price is roughly 50-70% of the single-unit distributor price, while western hobby retail is 2-5x the Chinese source price. Tooling, not components, is the large fixed cost: generic prototype injection molds are quoted at $1,000-3,000 and production molds at $5,000-30,000+.

### Cited Findings

Columns: price at about 1 unit / about 100 / 1,000+ as shown by the source. "n/f" = not found. Labels per legend at top.

| # | Technology | ~1 unit | ~100 | 1,000+ | Label | Source |
|---|---|---|---|---|---|---|
| 1 | mmWave radar HLK-LD2410B (24 GHz) | $3.00 sample (max 5) | n/f | n/f (MOQ 1000 for custom) | VERIFIED-S | [Alibaba Hi-Link](https://www.alibaba.com/product-detail/Hilink-HLK-LD2410B-24Ghz-Smart-Human_1600960728524.html) |
| 1b | HLK-LD2410-P at LCSC | $4.2316 | n/f | n/f | VERIFIED-S | [LCSC C5183133](https://www.lcsc.com/datasheet/lcsc_datasheet_2209290930_HI-LINK-HLK-LD2410-P_C5183133.pdf) |
| 2 | ToF VL53L0X bare sensor (ST store) | $5.66 (1-9) | n/f | $2.79 (500) | VERIFIED-S | [ST eStore](https://estore.st.com/en/vl53l0cxv9dh-1-cpn.html) |
| 2b | VL53L0X Waveshare breakout | $9.2717 (out of stock) | $7.7622 (10+) | n/f | VERIFIED-S | [LCSC C431944](https://www.lcsc.com/product-detail/C431944.html) |
| 2c | VL53L1X Waveshare breakout | $13.351 | n/f | n/f | VERIFIED-S | [LCSC C431945](https://lcsc.com/product-detail/Sensor-Modules_Waveshare-VL53L1X-Distance-Sensor_C431945.html) |
| 3 | ESP32-C3-MINI-1-N4 (Wi-Fi + BLE) | $2.9982 (another snapshot: $1.2945) | $2.1186 (other: $1.0059) | $2.0326 (650) | VERIFIED-S, snapshots conflict | [LCSC C2838502](https://www.lcsc.com/product-detail/rf-modules_espressif-systems-esp32-c3-mini-1-n4_C2838502.html) |
| 4 | BLE module HLK-B40 | about $1.60 | n/f | n/f | VERIFIED-S (via JLC search mirror) | [jlcsearch BLE modules](https://jlcsearch.tscircuit.com/ble_modules/list) |
| 4b | BLE module WCH BLE-SER-A-ANT | $2.5951 | n/f | $1.4163 | VERIFIED-S | [LCSC C2829462](https://www.lcsc.com/product-image/C2829462.html) |
| 4c | Legacy BLE modules (JDY-class) | n/f | n/f | $0.50-0.90 marketplace range | VERIFIED-S? (weak) | [Alibaba cheap BT module](https://electronics.alibaba.com/product/cheap-bluetooth-module) |
| 5 | MCU CH32V003 | n/f | <$0.20 (50 pcs, anecdote) | about $0.10 (maker claim, qty unspecified) | VERIFIED-S | [CNX Software](https://www.cnx-software.com/2022/10/22/10-cents-ch32v003-risc-v-mcu-offers-2kb-sram-16kb-flash-in-sop8-to-qfn20-packages/), [Hackaday](https://hackaday.com/tag/ch32v003/) |
| 6 | E-paper 1.54" 200x200 raw panel (Waveshare) | $7.60 (other snapshot $7.84) | $5.20 (other $5.79) | n/f | VERIFIED-S | [LCSC C5374685](https://www.lcsc.com/product-detail/C5374685.html) |
| 6b | E-paper 1.54" module with driver board | $10.93 (other $11.65) | $10.65 (10+) | n/f | VERIFIED-S | [LCSC C359939](https://www.lcsc.com/product-detail/C359939.html) |
| 7 | N20 gear motor | $2.38-6.00 (MOQ 2) | $4.20-4.85 (tray of 100, other listing) | n/f | VERIFIED-S? | [Alibaba N20](https://www.alibaba.com/product-introduction/N20-Mini-DC-Gear-Motor-With_60762982534.html), [mirror](https://china.org.ru/product/1600470097802) |
| 8 | Micro linear actuator 12 V, 10-100 mm stroke | $14.70 (2-199) | $14.70 | $14.20 (500+) | VERIFIED-S? | [Alibaba](https://www.alibaba.com/product-detail/Wholesale-Small-Linear-Actuator-12-VDC_1600537675261.html?s=p) |
| 9 | Mini peristaltic pump (Kamoer NKP) | $6.50 (1-49); sample $4.50 on another listing | $5.50 (50-199) | $3.90 (1000+) | VERIFIED-S? | [Alibaba Kamoer NKP](https://www.alibaba.com/product-introduction/Kamoer-NKP-Custom-Mini-Self-priming_60826393093.html), [Kamoer store](https://kamoer.en.alibaba.com/product/1600075398283-818943093/Kamoer_NKP_cheap_DC_3V_6V_12V_24V_Mini_Micro_Small_Water_Flow_Peristaltic_Pump_5_2_60ml_min.html) |
| 9b | Generic mini peristaltic pump head | n/f | n/f | $1.85-2.50 (range, MOQ unclear) | VERIFIED-S? | [mirror](https://china.org.ru/product/1601112733963) |
| 10 | 370 micro diaphragm air pump 3-6 V | $2.75 (Electropeak); $4.25-4.98 (eBay) | n/f | n/f | VERIFIED-S | [Electropeak](https://electropeak.com/370-mitsumi-air-pump-6v), [eBay](https://ebay.com/itm/264798947588) |
| 11 | Ultrasonic mesh atomizer disc 16 mm 108 kHz | CN¥0.95 EXW (MOQ 1) | n/f | $1.98 (other listing, tier unclear) | VERIFIED-S / VERIFIED-S? | [Yiwugo](https://en.yiwugo.com/product/detail/979555600.html), [mirror](https://china.org.ru/product/1600677952065) |
| 12 | Peltier TEC1-12706 40x40 mm | $3.90-4.20; EUR 4.50 gross (Botland) | n/f | n/f | VERIFIED-S | [reach.dog](https://reach.dog/shop/cold-colder/products/tec1-12706), [Botland](https://botland.store/ogniwa-peltiera/2613-ogniwo-peltiera-tec1-12706-12v-6a-5904422331030.html) |
| 13 | Nitinol wire 1 mm | $4.20-6 per m (MOQ 1 m) | n/f | $80-500 per kg | VERIFIED-S? | [Alibaba SMA suppliers](https://www.alibaba.com/shape-memory-metals-alloys-suppliers.html) |
| 14 | PDLC switchable film | sample $80/m²; small eBay piece GBP 15.60 (4x4 in) | $15-30/m² (MOQ 10 m²); $22 (MOQ 2 m²) | $8.52/m² (MOQ 1000 m²) | VERIFIED-S? | [Alibaba PDLC](https://www.alibaba.com/product-introduction/PDLC-Switchab-Smart-Film-Building-Decorated_1600838320082.html), [Alibaba roll film](https://tjhomewell.en.alibaba.com/product/62285294666-907819748/self_adhesive_switchable_smart_window_tint_film_pdlc_film_in_roll.html), [eBay](https://www.ebay.com/itm/Small-Size-Sample-PDLC-Window-Film-Smart-Glass-Privacy-Control-Self-adhesive/284267581716) |
| 15 | Thermochromic pigment (31 °C) | $2.48 per 10 g (Adafruit); $0.26/g sample | n/f | $30/kg (sample price, Kolortek); India about ₹26,000/kg | VERIFIED-S / VERIFIED-S? | [Adafruit](https://adafruit.com/product/4137), [Kolortek](https://colortech.en.alibaba.com/product/60295730043-810940806/Thermo_Chromatic_Additive_Powder_Thermochromic_Paint_Pigments.html), [IndiaMART](https://m.indiamart.com/americos-industries) |
| 16 | Photochromic pigment | n/f | n/f | ₹25,000/kg (India); $270-285, unit unclear (China) | VERIFIED-S? | [IndiaMART](https://m.indiamart.com/americos-industries), [Alibaba](https://www.alibaba.com/product-detail/Photochromic-UV-Pigment-Photochromic-Ink-Powder_60777278000.html) |
| 17 | Aerogel felt 3 mm | $8/m² (MOQ 1 m²); $25/m² (2 m²+) | $13-22/m² (MOQ 100 m²) | $10/m² (1000 m²+); $5.69 (MOQ 500 m²) | VERIFIED-S? | [Made-in-China](https://www.madeinchina.com/mall/show-3mm-6mm-10mm-Thermal-Insulation-Aerogel-Blanket_1031027.html), [bestsuppliers](https://bestsuppliers.com/products/pn7lnzssvu4g/factory-price-glass-fiber-aerogel-felt-3mm-5mm-10mm-thickness-silica-aerogel-felt-aerogel-blanket) |
| 18 | UV-C LED 3535 (270-280 nm) | GBP 1.14 sample; eBay 1 W about $8.78 | GBP 0.75 (100-499) | GBP 0.46 (10,000+); $0.15 chip (MOQ 1000, indicative) | VERIFIED-S? | [Alibaba UK](https://www.alibaba.co.uk/product-detail/Standard-UVC-LED-Ceramic-Package-270nm_1601785899008.html), [Alibaba guide](https://www.alibaba.com/price-comparison/uvc-led), [eBay](https://www.ebay.de/itm/267200606422) |
| 19 | ESP32-CAM (Ai-Thinker, OV2640) | $7.063 (LCSC ref.); 2-pack $11.99-15.63 | n/f | n/f | VERIFIED-S | [LCSC C277946](https://www.lcsc.com/product-image/C277946.html), [Alibaba smartbuy](https://smartbuy.alibaba.com/best-selling/esp32-cam-best-sellers) |
| 19b | XIAO ESP32S3 Sense (camera + mic) | GBP 13.50; $16.99 sale | n/f | n/f | VERIFIED-S | [The Pi Hut](https://thepihut.com/collections/seeed/products/seeed-studio-xiao-esp32s3-sense), [RobotShop](https://ca.robotshop.com/products/seeedstudio-xiao-esp32s3-sense-wifi-ble-ov2640-mic-8mb-iot-embedded-ml) |
| 19c | K210 AI chip (bare) / vision module | $6.9631 chip; $49.99 Yahboom module | n/f | n/f | VERIFIED-S | [LCSC C913414](https://lcsc.com/product-detail/image/k210_C913414.html), [Yahboom](https://category.yahboom.net/products/k210-module) |
| 20 | Offline voice module (CI1302 / CI-03T / ASR-PRO / SU-03T1) | $8.95 / $7.50 / $8.95 / $11.84 (western retail) | n/f | n/f | VERIFIED-S | [reach.dog](https://reach.dog/shop/m5stack-store/products/m5stack-asr-module-ci1302), [Walmart](https://www.walmart.com/ip/17665016333) |
| 21 | MEMS microphone (LinkMems) | $0.458 | $0.2984 | n/f | VERIFIED-S | [LCSC C5373226](https://datasheet.lcsc.com/lcsc/2305061754_LinkMems-LMA2718S421-OY1C_C5373226.pdf) |
| 22 | IMU QMI8658C / LSM6DS3TR / MPU-6050 | $1.1278 / $1.5862 / $7.9306 | n/f / n/f / $6.0394 | n/f / $0.9479 / n/f | VERIFIED-S | [QMI8658C](https://www.lcsc.com/datasheet/lcsc_datasheet_2312271633_QST-QMI8658C_C2842151.pdf), [LSM6DS3TR](https://www.lcsc.com/product-detail/C95230.html), [MPU-6050](https://www.lcsc.com/product-image/C24112.html) |
| 23 | Sodium-ion 18650 cell | $14.33-14.99 retail | n/f | $5-12 (2024 guide); $70-100/kWh cell level | VERIFIED-S, levels conflict | [reach.dog](https://reach.dog/shop/ogsolarstore/products/sodium-ion-cells-3-1v-battery-cell), [Alibaba guide](https://smartbuy.alibaba.com/buyingguides/sodium-ion-battery-18650) |
| 24 | Supercapacitor 1 F 5.5 V | $1.99 (TME); $3.36 (Eaton KR) | n/f | $0.66 (5,280 pcs); $1.98 (Eaton, 1,000) | VERIFIED-S? | [TME supercapacitors](https://www.tme.com/us/en-us/katalog/superkondensatory_113190/), [Mouser KR series](https://www.mouser.in/c/passive-components/capacitors/?series=KR) |
| 25 | Small epoxy solar panel 5 V | GBP 0.95-2.55; $6.14 for 5 V 400 mA 120x120 mm | GBP 0.5651 per watt (100-4,999 W) | n/f | VERIFIED-S / VERIFIED-S? | [Kunkune](https://kunkune.co.uk/shop/uncategorized/small-solar-epoxy-panel-polycrystalline-solar-panel), [Abra](https://abra-electronics.com/solar-products/solar-cells-chargers-modules/2-4-watts/sp-5v-4a-12x12cm-mini-solar-panel-5v-2w-mini-solar-panel.html), [Alibaba UK](https://www.alibaba.co.uk/product-detail/Custom-Mini-Solar-Panel-1W-3W_1601041352570.html) |
| 26 | Magnetic levitation module | $15.80-18.80 (150/300 g); $25.50-44.60 (500-600 g stand, MOQ 1); $69.99 western | n/f | n/f | VERIFIED-S? / VERIFIED-S | [Alibaba showroom](https://alibaba.com/showroom/levitating-ball.html), [StirlingKit](https://www.stirlingkit.com/products/500g-diy-magnetic-levitation-module) |
| 27 | LRA haptic 8 mm coin | $3.15 (branded, distributor) | $0.70-1.07 (MOQ 100-150); about $0.80 for 8x3.2 mm | n/f | VERIFIED-S / VERIFIED-S? | [ichome](https://ichome.com/product-detail/ineed-motor/lra0832be03l15), [Alibaba taptic](https://electronics.alibaba.com/product/taptic-engine) |
| 28 | NFC NTAG213 sticker | n/f | $0.07-0.09 (MOQ 500) | EUR 0.22 (EU retail, 1,000); $0.08 (Fudan chip, 1,000) | VERIFIED-S? / VERIFIED-S | [Alibaba](https://www.alibaba.com/product-introduction/High-Frequency-Access-Control-NTAG-213_1600268042016.html), [shopnfc](https://www.shopnfc.com/en/nfc-stickers/364-nfc-stickers-ntag213-round-o22mm.html), [abcrfid](https://www.abcrfid.com/?p=1480) |
| 29 | UWB module Ai-Thinker BU03 (DW3000) | $17.46; EUR 14.50; $25.69 | n/f | n/f | VERIFIED-S | [RobotShop](https://www.robotshop.com/products/botstore-ai-thinker-dw3000-scheme-uwb-indoor-centimeter-level-high-precision-positioning-module-bu03-bidirectional-ranging-positioning), [OpenELAB](https://openelab.io/it/products/ai-thinker-uwb-bu03-dw3000-plan-module-positioning-accuracy-10cm) |
| 30 | CO2 sensor Sensirion SCD41 | $20.54 (Mouser); $33.41 (LCSC); "street $9-16" per a review site | n/f | $14.83 (600) | VERIFIED-S, sources conflict | [Findchips](https://www.findchips.com/search/SCD41), [LCSC C3659362](https://datasheet.lcsc.com/lcsc/2307181754_Sensirion-SCD41-D-R1_C3659362.pdf), [atomic14](https://www.atomic14.com/esp32/sensors/scd41/) |
| 31 | Load cell 1-2 kg + HX711 | about $19.95 western retail kit | GBP 1.51 (100-2,999) | GBP 1.13 (3,000+); GBP 0.7523 (10,000+) | VERIFIED-S | [Alibaba UK](https://www.alibaba.co.uk/product-detail/SC133-Miniature-micro-beam-weight-sensor_1601790177192.html), [Fruugo](https://www.fruugo.ca/hx711-ad-digital-weighing-sensor-high-precision-weighing-module-5kg-33v-5v/p-414049136) |
| 32 | Flexible LED filament 3 V | $2 sample; $2.50 Adafruit 25 mm | $0.11 (100-499) | $0.07 (5,000+) | VERIFIED-S? / VERIFIED-S | [Alibaba UK](https://www.alibaba.co.uk/product-detail/DC-3V-LED-Filament-Bulb-38mm_1601673277243.html), [Adafruit](https://adafruit.com/product/6141) |
| 33 | Electropermanent magnet (ready module) | EUR 130 / $149 (Zubax FG40) | n/f | n/f | VERIFIED-S | [Zubax](https://shop.zubax.com/collections/electropermanent-magnets/products/zubax-epm) |
| 34 | Injection mold tooling, China (generic plastic; silicone/TPU overmold not priced) | prototype single-cavity $1,000-3,000 | mold for about 1,000 parts $1,500-5,000 | production $5,000-30,000+ | VERIFIED-S (vendor blogs) | [Zetar Mold](https://zetarmold.com/?p=52613), [TEAM Rapid](https://www.teamrapidtooling.com/injection-molding-cost-1000-10000-parts-a-680.html), [Owl Sourcing](https://owlsourcing.com/?p=10155) |

- Silicone (LSR) projects are quoted at 6-10 weeks overall with 4-6 weeks for mold creation; no silicone tooling price given — [Richconn](https://richconn.com/silicone-injection-molding-cost/).
- MEMS laser pico-projection modules are listed on Alibaba without prices; quotes on request only — [Alibaba micro projector page](https://www.alibaba.com/product-insights/micro-projector-module.html).

### Inferences
- ESTIMATE table for items with no source this session (my general market knowledge; verify before using):

| Technology | ESTIMATE ~1 unit | ESTIMATE 1,000+ | Note |
|---|---|---|---|
| Graphene / carbon heating film 5 V USB pad | $1-3 | $0.5-1.5 | Not found in search |
| Piezo disc 20-27 mm | $0.10-0.30 | $0.03-0.10 | Not found |
| Neodymium disc 10x2 mm N35 | $0.10-0.20 | $0.03-0.08 | Not found |
| LiPo pouch 300-500 mAh with protection | $1.5-3 | $0.8-1.5 | Not found; shipping restrictions apply |
| LiFePO4 14500 | $1.5-3 | $0.8-1.5 | Not found |
| Offline voice module on AliExpress (SU-03T, ASRPRO) | $1.5-4 | $1-2 | Western retail verified at $7.5-12 |
| ESP32-CAM on AliExpress | $4-6 | $3-4 | One unverifiable snapshot showed $1.62 |
| PCM (paraffin, bulk, not microencapsulated) | n/a | $2-6/kg | Microencapsulated much higher |
| Mist driver PCB (USB 5 V) | $0.8-1.5 | $0.4-0.8 | Not found |
| 5 mW laser diode module (dot/line) | $0.5-1.5 | $0.2-0.6 | Not found; laser-class rules apply |
| 2-layer flex PCB, small | prototype $20-60 per batch | $0.3-1 each | Not found |
| Silicone compression mold (simple part) | $500-2,000 | same | Cheaper than LSR injection; not found |

- Rule of thumb (ESTIMATE from the verified rows): LCSC/Alibaba 1,000+ price is about 0.5-0.7x the 1-unit price; western hobby retail is about 2-5x the Chinese 1-unit price (examples: LD2410 $3-4.2 vs $9.9-12.5; LED filament $0.07-0.11 vs $2.00-2.50; levitation $16-45 vs $70).
- HYPOTHESIS: a EUR 5 BOM "wow core" is realistic; a full product BOM with battery, charging, housing and packaging more likely lands at EUR 8-15 at 1,000 units (ESTIMATE), plus $1,000-5,000 of tooling.

### Gaps
- None of the rows was confirmed on a live page: lcsc.com (and other hosts) are outside this session's allowed network domains. To harden the table, allow lcsc.com, alibaba.com and aliexpress.com in the session network settings and re-check each row.
- No 100-unit tier found for most Alibaba items (listings show sample and MOQ tiers only).
- Not found: graphene heating film, PCM per kg, laser/MEMS projection module, small LiPo/LiFePO4 cells, piezo elements, neodymium magnets, kinetic harvesters, flex PCB, silicone/TPU tooling specifically, ESP32-S3 module, cheap NDIR CO2 clones, VL53L0X clone breakouts on AliExpress.
- Currency mix (USD/GBP/EUR/CNY/INR) not normalised; listing dates unknown.
