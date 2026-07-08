// One-off backfill: inserts portfolio entries as UNPUBLISHED drafts.
// Review, edit, and publish them via /admin. Safe to re-run for new slugs;
// existing entries are left untouched (upsert with empty update).
import "dotenv/config";
import { prisma } from "../lib/prisma";

type Draft = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  titleNl: string;
  summaryNl: string;
  contentNl: string;
  tags: string;
};

const drafts: Draft[] = [
  {
    slug: "baseline-ethdenver-2025",
    title: "Baseline: crypto over a phone call — winning at ETHDenver 2025",
    summary:
      "We built a voice assistant that gives anyone a wallet by dialing a phone number, and won the Infrastructure + Scalability track at the ETHDenver 2025 #BUIDLathon.",
    tags: "hackathon, ai, web3",
    content: `The pitch was simple: your grandmother should be able to buy crypto by making a phone call. No app, no wallet setup, no seed phrase — dial a number, talk, done.

That became **Baseline**, our team's entry for the ETHDenver 2025 #BUIDLathon. It won the **Infrastructure + Scalability track** ($7,000 + 12K $SPORK via quadratic voting from 50 community judges), plus Coinbase bounties for **Most Innovative Use of AgentKit** and **Best Use of CDP SDK**.

## How it worked

Calling the number instantly provisioned an embedded wallet. From there, everything was voice:

- A phone/voice interface fed into an **OpenAI-powered orchestration layer** that controlled a swarm of specialized AI agents
- Agents executed on-chain actions through **Coinbase Developer Platform AgentKit** — buying USDC, staking, deploying contracts, buying NFTs
- **Privy** handled auth with Coinbase Smart Wallets; **Coinbase Onramp** covered fiat in; **ORA** provided decentralized inference — all running on **Base**
- A dashboard tracked your portfolio in real time for when you did want a screen

[TODO: the war story — what almost didn't work in the final hours, and which part of the agent orchestration was mine vs. Jochen's vs. Scott's]

## What I took from it

Voice turns out to be a brutal interface for financial actions: you get no confirmation modal, so the orchestration layer needs to be paranoid — repeat back amounts, double-confirm sends, fail closed. Designing agents around that constraint taught me more about safe AI-tool-calling than any tutorial could.

Built in a weekend with [Jochen](https://github.com/J0xhen) and Scott. Judged by 50 community judges against the strongest infra field ETHDenver has had.`,
    titleNl: "Baseline: crypto via een telefoontje — winnen op ETHDenver 2025",
    summaryNl:
      "We bouwden een spraakassistent die iedereen een wallet geeft door een telefoonnummer te bellen, en wonnen de Infrastructure + Scalability-track op de ETHDenver 2025 #BUIDLathon.",
    contentNl: `De pitch was simpel: je grootmoeder moet crypto kunnen kopen met een telefoontje. Geen app, geen wallet-setup, geen seed phrase — bel een nummer, praat, klaar.

Dat werd **Baseline**, onze inzending voor de ETHDenver 2025 #BUIDLathon. Het won de **Infrastructure + Scalability-track** ($7.000 + 12K $SPORK via quadratic voting door 50 communityjuryleden), plus Coinbase-bounties voor **Most Innovative Use of AgentKit** en **Best Use of CDP SDK**.

## Hoe het werkte

Wie het nummer belde, kreeg meteen een embedded wallet. Daarna verliep alles via spraak:

- Een telefoon-/spraakinterface voedde een **OpenAI-orkestratielaag** die een zwerm gespecialiseerde AI-agents aanstuurde
- Agents voerden on-chain acties uit via **Coinbase Developer Platform AgentKit** — USDC kopen, staken, contracts deployen, NFT's kopen
- **Privy** deed de authenticatie met Coinbase Smart Wallets; **Coinbase Onramp** regelde fiat; **ORA** leverde gedecentraliseerde inference — alles op **Base**
- Een dashboard toonde je portfolio in realtime, voor wie toch een scherm wilde

[TODO: het oorlogsverhaal — wat in de laatste uren bijna misliep, en welk deel van de agent-orkestratie van mij was versus Jochen versus Scott]

## Wat ik eruit meenam

Spraak blijkt een genadeloze interface voor financiële acties: er is geen bevestigingsvenster, dus de orkestratielaag moet paranoïde zijn — bedragen herhalen, verzendingen dubbel bevestigen, fail closed. Agents ontwerpen rond die beperking leerde me meer over veilige AI-tool-calling dan eender welke tutorial.

Gebouwd in één weekend met [Jochen](https://github.com/J0xhen) en Scott.`,
  },
  {
    slug: "failsafe-consensus-2025",
    title: "Failsafe: crypto inheritance without seed phrases",
    summary:
      "A dead-man's switch for crypto on Stellar, with passkeys instead of seed phrases. Built in three days at Consensus Toronto 2025 — Stellar track winner.",
    tags: "hackathon, web3, security",
    content: `Roughly 20% of all Bitcoin is estimated to be permanently lost — much of it because someone died without passing on their keys. At the **EasyA x Consensus hackathon in Toronto** (May 2025, 1,000+ vetted devs, $250k+ prize pool — billed as the largest blockchain hackathon in North American history), we built the fix and **won the Stellar track**.

**Failsafe** — the contract is literally named \`DeadMansWallet\` — is automated estate planning on-chain:

## How it works

- You register beneficiaries and check in periodically. Miss your check-ins, and the contract **triggers**: funds start moving to your designated beneficiaries
- A **revive window** protects against false alarms — show up alive, reclaim everything
- **No seed phrases anywhere.** Authentication runs entirely on passkeys (FIDO2/WebAuthn) via Passkey Kit — your face or fingerprint is the key, which is the point: your heirs shouldn't need to find a paper backup

## The build

A **Soroban smart contract in Rust** (register / check_in / trigger / revive / finalize, per-address persistent storage, events) deployed to Stellar Testnet, Launchtube for deployment, a Next.js + TypeScript frontend, and a Node API. I wrote the majority of the code — 28 of the team's 42 commits, all inside the 72-hour window, together with Jochen.

[TODO: the hardest part — was it Soroban's storage model, the passkey flow, or something dumber?]

Judged among the winners by CoinDesk's coverage of the event. Three days, two Belgians, one dead man's switch.`,
    titleNl: "Failsafe: crypto-erfenis zonder seed phrases",
    summaryNl:
      "Een dodemansknop voor crypto op Stellar, met passkeys in plaats van seed phrases. In drie dagen gebouwd op Consensus Toronto 2025 — winnaar van de Stellar-track.",
    contentNl: `Naar schatting is zo'n 20% van alle Bitcoin voorgoed verloren — vaak omdat iemand stierf zonder zijn sleutels door te geven. Op de **EasyA x Consensus-hackathon in Toronto** (mei 2025, 1.000+ geselecteerde developers, $250k+ prijzenpot — aangekondigd als de grootste blockchain-hackathon in de Noord-Amerikaanse geschiedenis) bouwden we de oplossing en **wonnen we de Stellar-track**.

**Failsafe** — het contract heet letterlijk \`DeadMansWallet\` — is geautomatiseerde successieplanning on-chain:

## Hoe het werkt

- Je registreert begunstigden en checkt periodiek in. Mis je je check-ins, dan **triggert** het contract: je fondsen gaan naar je begunstigden
- Een **revive-venster** beschermt tegen vals alarm — duik je levend op, dan krijg je alles terug
- **Nergens seed phrases.** Authenticatie draait volledig op passkeys (FIDO2/WebAuthn) via Passkey Kit — je gezicht of vingerafdruk is de sleutel. Dat is precies het punt: je erfgenamen mogen geen papieren back-up nodig hebben

## De bouw

Een **Soroban smart contract in Rust** (register / check_in / trigger / revive / finalize, persistente storage per adres, events) op Stellar Testnet, Launchtube voor deployment, een Next.js + TypeScript-frontend en een Node-API. Ik schreef het merendeel van de code — 28 van de 42 commits van het team, allemaal binnen het 72-uursvenster, samen met Jochen.

[TODO: het moeilijkste stuk — Soroban's storagemodel, de passkey-flow, of iets dommers?]

Drie dagen, twee Belgen, één dodemansknop.`,
  },
  {
    slug: "xeet",
    title: "Xeet: scoring signal in a sea of noise",
    summary:
      "Frontend and backend for a gamified creator platform on top of X — leaderboards, brand tournaments, and a reputation engine, at a scale of ~144k connected accounts.",
    tags: "social, scale",
    content: `**Xeet** set out to answer an unfashionable question: of all the noise on X, whose posts are actually *signal*? The answer became a gamified creator tournament platform — a reputation engine scoring the quality of X activity, weighted by **Ethos Network** reputation, with creators competing in brand-sponsored tournaments and weekly leaderboards for rewards.

By late 2025 the platform had **~144,000 connected X accounts** and 15+ tournaments running simultaneously.

## What I built

I worked across frontend (Next.js) and backend (Node.js) inside a larger engineering team:

- High-performance, reusable UI for leaderboards that update weekly but get hammered constantly in between
- Real-time interaction at hundreds-of-thousands-of-users scale
- Features from design to production, in tight loops with product and backend teams

[TODO: pick one system to go deep on — the scoring pipeline? leaderboard caching? the tournament engine? What broke at scale and what fixed it?]

## The plot twist

In January 2026, X changed its API policy to ban reward-based posting apps — an existential event for the whole category. Xeet paused all campaigns while evaluating its future, committing to pay out completed campaigns first. Building on top of someone else's platform is leverage and risk in the same package; this project taught me both ends of that trade.`,
    titleNl: "Xeet: signaal scoren in een zee van ruis",
    summaryNl:
      "Frontend en backend voor een gegamificeerd creatorplatform bovenop X — leaderboards, merktornooien en een reputatie-engine, op een schaal van ~144k gekoppelde accounts.",
    contentNl: `**Xeet** vertrok van een onmodieuze vraag: wiens posts zijn, in al het lawaai op X, eigenlijk *signaal*? Het antwoord werd een gegamificeerd creator-tornooiplatform — een reputatie-engine die de kwaliteit van X-activiteit scoort, gewogen met **Ethos Network**-reputatie, waar creators strijden in merkgesponsorde tornooien en wekelijkse leaderboards.

Eind 2025 telde het platform **~144.000 gekoppelde X-accounts** en liepen er 15+ tornooien tegelijk.

## Wat ik bouwde

Ik werkte op frontend (Next.js) én backend (Node.js) binnen een groter engineeringteam:

- Performante, herbruikbare UI voor leaderboards die wekelijks updaten maar constant bevraagd worden
- Realtime interactie op een schaal van honderdduizenden gebruikers
- Features van ontwerp tot productie, in korte lussen met product- en backendteams

[TODO: kies één systeem om diep op in te gaan — de scoringpipeline? leaderboard-caching? de tornooi-engine? Wat brak op schaal en wat loste het op?]

## De plottwist

In januari 2026 wijzigde X zijn API-beleid en verbood het reward-based posting-apps — een existentiële gebeurtenis voor de hele categorie. Xeet pauzeerde alle campagnes en betaalde eerst de lopende campagnes uit. Bouwen bovenop andermans platform is hefboom en risico in één pakket; dit project leerde me beide kanten van die ruil.`,
  },
  {
    slug: "onsight",
    title: "Onsight: trading Polymarket from Telegram",
    summary:
      "The full stack of a prediction-markets trading suite: a Telegram bot that trades Polymarket gaslessly, Discord monitors, and heavy emphasis on securing user funds.",
    tags: "trading, web3, security",
    content: `**Onsight** is a suite of tools for prediction-market traders — "You make the predictions. We keep the receipts." The core product is a **Telegram bot that trades Polymarket directly**, with Discord monitors for real-time wallet and trade alerts on the side.

I built the stack: Next.js frontend, Node.js backend, React Native app, and the Telegram bot itself.

## The interesting problems

- **Speed.** The bot ingests CLOB data ~3–5 seconds before on-chain confirmation — faster than competing bots. In markets that move on news, seconds are the product
- **Gasless UX.** Every user gets an auto-created Gnosis Safe on Polygon; trading and withdrawals are fully gasless — no MATIC, no gas anxiety. Deposits arrive from 13 chains in 50+ currencies and are auto-swapped to USDC.e
- **Order types.** Market and limit orders, stop-loss/take-profit, and copy trading — following wallets you trust, automatically
- **Security.** This is custody-adjacent software handling other people's money from a chat app. Encryption of sensitive user and transaction data was a first-class requirement, not an afterthought — [TODO: describe the key-management/signing model at whatever level of detail is safe to publish]

## Infrastructure

Docker on AWS, run by me end-to-end. Onboarding was tuned until a new user could go from /start to first trade in under a minute.

[TODO: a number — users, volume traded, biggest single copy-trade cohort?]`,
    titleNl: "Onsight: Polymarket traden vanuit Telegram",
    summaryNl:
      "De volledige stack van een tradingsuite voor prediction markets: een Telegram-bot die gasless op Polymarket handelt, Discord-monitors, en veel nadruk op het beveiligen van gebruikersfondsen.",
    contentNl: `**Onsight** is een toolsuite voor prediction-market-traders — "You make the predictions. We keep the receipts." Het kernproduct is een **Telegram-bot die rechtstreeks op Polymarket handelt**, met daarnaast Discord-monitors voor realtime wallet- en trade-alerts.

Ik bouwde de stack: Next.js-frontend, Node.js-backend, React Native-app en de Telegram-bot zelf.

## De interessante problemen

- **Snelheid.** De bot leest CLOB-data zo'n 3–5 seconden vóór on-chain bevestiging in — sneller dan concurrerende bots. In markten die op nieuws bewegen, zijn seconden het product
- **Gasless UX.** Elke gebruiker krijgt automatisch een Gnosis Safe op Polygon; traden en opnemen is volledig gasless — geen MATIC, geen gas-stress. Deposits komen binnen vanaf 13 chains in 50+ munten en worden automatisch omgezet naar USDC.e
- **Ordertypes.** Market- en limietorders, stop-loss/take-profit en copy trading — wallets die je vertrouwt automatisch volgen
- **Beveiliging.** Dit is custody-achtige software die andermans geld beheert vanuit een chatapp. Encryptie van gevoelige gebruikers- en transactiedata was een eersteklasvereiste, geen bijzaak — [TODO: beschrijf het key-management/signing-model op een publiceerbaar detailniveau]

## Infrastructuur

Docker op AWS, end-to-end door mij beheerd. De onboarding is bijgeschaafd tot een nieuwe gebruiker in minder dan een minuut van /start naar zijn eerste trade ging.

[TODO: een cijfer — gebruikers, verhandeld volume, grootste copy-trade-cohorte?]`,
  },
  {
    slug: "finalbosu-reveal",
    title: "Final Bosu: engineering a three-day NFT reveal",
    summary:
      "The reveal site for an 8,888-piece collection that sold out in six minutes — a staged, three-day experience instead of a one-shot metadata flip.",
    tags: "web3, frontend",
    content: `**Final Bosu** is an anime NFT franchise on Abstract (the L2 by the Pudgy Penguins team) — 8,888 pieces, built by three brothers, with a public mint that **sold out 3,445 NFTs at $220 in about six minutes**.

I built the **reveal site**. Most collections reveal by flipping metadata and letting marketplaces catch up — functional, and completely devoid of drama. Final Bosu wanted the opposite: a **Reveal Week**.

## The experience

Starting May 21, 2025, the collection revealed **in stages over three days**, one lore faction ("ID") at a time:

- Day 1: the Mujins and Kodakas
- Day 2: the Kaichukan and Keshuma Citizens
- Day 3: the Kazegamis — and the ultra-rare **Final Bosses**

The site presented the collection grouped by ID in an immersive visual layout as each faction unlocked, while metadata rolled out on-chain to the marketplaces. Tokens that stayed unrevealed longer had higher odds of being a Final Boss, which turned the site into a countdown people actually refreshed.

The team's own framing: making the reveal journey "clearer, smoother, and way more fun."

## What made it interesting to build

[TODO: the technical meat — how did the staged reveal actually work? Pre-rendered assets vs. on-demand? How did you handle the traffic spike at each unlock? CDN/caching strategy? Any coordination with the metadata updates on-chain?]

Anime nerds are the most demanding QA team I've shipped for.`,
    titleNl: "Final Bosu: een NFT-reveal van drie dagen bouwen",
    summaryNl:
      "De reveal-site voor een collectie van 8.888 stuks die in zes minuten uitverkocht — een gefaseerde driedaagse ervaring in plaats van één metadata-flip.",
    contentNl: `**Final Bosu** is een anime-NFT-franchise op Abstract (de L2 van het Pudgy Penguins-team) — 8.888 stuks, gebouwd door drie broers, met een publieke mint die **3.445 NFT's aan $220 in ongeveer zes minuten uitverkocht**.

Ik bouwde de **reveal-site**. De meeste collecties revealen door metadata om te flippen en de marktplaatsen te laten volgen — functioneel, en compleet zonder drama. Final Bosu wilde het omgekeerde: een **Reveal Week**.

## De ervaring

Vanaf 21 mei 2025 revealde de collectie **gefaseerd over drie dagen**, één lore-factie ("ID") per keer:

- Dag 1: de Mujins en Kodakas
- Dag 2: de Kaichukan en Keshuma Citizens
- Dag 3: de Kazegamis — en de ultrazeldzame **Final Bosses**

De site toonde de collectie per ID in een meeslepende visuele lay-out naarmate elke factie ontgrendelde, terwijl de metadata on-chain naar de marktplaatsen uitrolde. Tokens die langer unrevealed bleven, hadden meer kans om een Final Boss te zijn — wat de site veranderde in een aftelklok die mensen écht bleven verversen.

## Wat het interessant maakte om te bouwen

[TODO: het technische vlees — hoe werkte de gefaseerde reveal precies? Vooraf gerenderde assets versus on-demand? Hoe ving je de verkeerspiek bij elke unlock op? CDN/caching-strategie? Coördinatie met de on-chain metadata-updates?]

Anime-nerds zijn het veeleisendste QA-team waarvoor ik ooit shipte.`,
  },
  {
    slug: "franky-go",
    title: "Franky GO: an onchain idle RPG",
    summary:
      "A browser-based pixel-art idle RPG on Abstract. Season 1: 39,000+ players, 682,716 games, 100+ ETH in revenue over seven weeks.",
    tags: "game, web3",
    content: `**Franky GO** is a browser-based onchain idle RPG on Abstract, in retro pixel-art style: you play Franky the frog, trying to **survive 10 in-game days** per run — making choices, dodging traps, and grinding 2D idle battles for "Crumbs", equipment, and memecoin rewards.

## Season 1, in numbers

- **39,000+ unique players**
- **682,716 games played**
- **100+ ETH gross revenue** across seven weeks
- 107M+ Crumbs collected

Tickets cost ~$2 in ETH, with free daily plays for Franky's Dinner NFT holders. Rewards ranged from $YGG to Abstract memecoins, plus Abstract XP. Season 2 added ten new chapters, a gym leveling mini-game, an armor/weapon system with five rarity tiers of tradable NFT gear, and equipment merging.

## Building it

[TODO: this needs your story — solo build or with Lonely Lily Studios? What's the architecture: how much is on-chain vs. off-chain? How do you make an idle game feel fair when real money and leaderboards are involved (anti-cheat)? What did 39k players in week one do to your infra?]

What I'll say already: games are the harshest full-stack discipline there is. Every system — economy, progression, anti-cheat, latency — is visible to the player within minutes, and they will absolutely tell you about it.`,
    titleNl: "Franky GO: een onchain idle-RPG",
    summaryNl:
      "Een browsergebaseerde pixel-art idle-RPG op Abstract. Seizoen 1: 39.000+ spelers, 682.716 gespeelde games, 100+ ETH omzet in zeven weken.",
    contentNl: `**Franky GO** is een browsergebaseerde onchain idle-RPG op Abstract, in retro pixel-art: je speelt Franky de kikker en probeert per run **10 in-game dagen te overleven** — keuzes maken, vallen ontwijken en 2D idle-gevechten grinden voor "Crumbs", uitrusting en memecoin-beloningen.

## Seizoen 1, in cijfers

- **39.000+ unieke spelers**
- **682.716 gespeelde games**
- **100+ ETH bruto-omzet** in zeven weken
- 107M+ verzamelde Crumbs

Tickets kostten ~$2 in ETH, met gratis dagelijkse beurten voor houders van Franky's Dinner-NFT's. Beloningen gingen van $YGG tot Abstract-memecoins, plus Abstract XP. Seizoen 2 voegde tien nieuwe hoofdstukken toe, een gym-minigame, een wapen/pantsersysteem met vijf zeldzaamheidsniveaus aan verhandelbare NFT-gear, en equipment merging.

## De bouw

[TODO: hier moet jouw verhaal komen — solo gebouwd of met Lonely Lily Studios? Hoe zit de architectuur: hoeveel on-chain versus off-chain? Hoe hou je een idle game eerlijk als er echt geld en leaderboards mee gemoeid zijn (anti-cheat)? Wat deden 39k spelers in week één met je infrastructuur?]

Wat ik nu al kan zeggen: games zijn de hardste full-stack-discipline die er bestaat. Elk systeem — economie, progressie, anti-cheat, latency — is binnen enkele minuten zichtbaar voor de speler, en die zal het je absoluut laten weten.`,
  },
  {
    slug: "mijn-magazines-roularta",
    title: "Rebuilding Mijn Magazines with Roularta",
    summary:
      "Working on the rebuild of Roularta's digital newsstand — 30+ magazine brands in one app, migrated to Azure, shipped bi-weekly while the old app kept running.",
    tags: "mobile, react-native",
    content: `**Mijn Magazines** is Roularta Media Group's digital newsstand: one app for the digital editions, articles, videos, and podcasts of 30+ Belgian and Dutch magazine brands — Knack, Trends, Libelle, Flair, and the rest — in Dutch and French, with family-sharing for subscriptions.

When I joined the project (via AE, the Leuven-based consultancy), the mission was blunt: only ~5% of Roularta's subscribers were purely digital, and the app needed to carry the publisher's digital strategy.

## The rebuild

- The app was **rebuilt while the old one stayed in production** — the riskiest kind of migration, since subscribers don't care about your architecture diagrams
- Backend migrated to **Microsoft Azure**, frontend and backend properly separated
- **Bi-weekly release cycles** in an agile team; the biggest stability issues were fixed within three months, the full rebuild landed in under six

The results made the CIO quotable — "40 percent more with the same budget and efforts" — with inactive subscribers returning and session length and article consumption up.

## My part

I worked on the React Native app as a full member of the development team: production features, code review, and presenting my own topics within the team.

[TODO: one concrete feature or bug you owned that's worth telling — the offline reading edge case, a rendering performance win, the subscription-sharing flow?]

100,000+ installs on Android alone. My first taste of shipping for a *boring* — meaning: real — Belgian enterprise, and exactly as instructive as the crypto side of my portfolio, for opposite reasons.`,
    titleNl: "Mijn Magazines herbouwen met Roularta",
    summaryNl:
      "Meewerken aan de rebuild van Roularta's digitale kiosk — 30+ magazinemerken in één app, gemigreerd naar Azure, om de twee weken releasen terwijl de oude app bleef draaien.",
    contentNl: `**Mijn Magazines** is de digitale kiosk van Roularta Media Group: één app voor de digitale edities, artikels, video's en podcasts van 30+ Belgische en Nederlandse magazinemerken — Knack, Trends, Libelle, Flair en de rest — in het Nederlands en Frans, met gezinsdeling voor abonnementen.

Toen ik op het project kwam (via AE, het Leuvense consultancybedrijf), was de missie duidelijk: amper ~5% van Roularta's abonnees was puur digitaal, en de app moest de digitale strategie van de uitgever dragen.

## De rebuild

- De app werd **herbouwd terwijl de oude in productie bleef** — het riskantste soort migratie, want abonnees liggen niet wakker van je architectuurdiagrammen
- Backend gemigreerd naar **Microsoft Azure**, frontend en backend netjes gescheiden
- **Tweewekelijkse releases** in een agile team; de grootste stabiliteitsproblemen waren binnen drie maanden opgelost, de volledige rebuild landde in minder dan zes

De resultaten maakten de CIO citeerbaar — "40 procent meer met hetzelfde budget en dezelfde inspanningen" — met inactieve abonnees die terugkeerden en langere sessies en meer gelezen artikels.

## Mijn aandeel

Ik werkte aan de React Native-app als volwaardig lid van het developmentteam: productiefeatures, code review, en eigen topics presenteren binnen het team.

[TODO: één concrete feature of bug die je bezat en het vertellen waard is — de offline-lezen edge case, een rendering-performancewinst, de abonnement-deelflow?]

100.000+ installs op Android alleen. Mijn eerste ervaring met shippen voor een *saaie* — lees: echte — Belgische onderneming, en exact even leerrijk als de cryptokant van mijn portfolio, om tegenovergestelde redenen.`,
  },
  {
    slug: "q8-app",
    title: "Shipping the new Q8 app",
    summary:
      "Fuel payments from the driver's seat, loyalty, and EV charging in one app — rebuilt and relaunched for ~700 stations in the Benelux, rated 4.8★.",
    tags: "mobile, react-native",
    content: `Q8's new app turns the fuel stop inside out: **release the pump and pay from the driver's seat** (Payconiq, Bancontact, card), earn **Q8 smiles** loyalty points per litre, per kWh charged, and per euro spent in the shop, control EV charging sessions across **700,000+ chargers in Europe**, and redeem points with partners from Kinepolis to Decathlon.

It replaced the old Q8 smiles app for the Benelux — ~700 stations — as a full relaunch positioned around "(e-)mobility and convenience", with existing users migrated over. It sits at **4.8/5 from ~6,600 ratings** on the Belgian App Store and was **nominated at the UX Design Awards 2024**.

## My part

I worked on the app during my time at AE as a full member of the development team, in React Native — building production features that went live after code review, in an agile cycle that included real-world usability testing at actual fuel stations.

[TODO: your concrete stories — which features were yours? The pump-release flow? Loyalty? What does testing an app at a literal petrol station teach you that a simulator can't?]

## Why it was formative

Payments + loyalty + a physical machine that dispenses flammable liquid is an unforgiving integration surface. You learn discipline shipping this: feature flags, staged rollouts, and the humility of watching a real driver miss the button you thought was obvious.`,
    titleNl: "De nieuwe Q8-app shippen",
    summaryNl:
      "Tanken betalen vanuit de auto, loyalty en EV-laden in één app — herbouwd en gerelanceerd voor ~700 stations in de Benelux, met een score van 4.8★.",
    contentNl: `De nieuwe app van Q8 keert de tankstop binnenstebuiten: **de pomp vrijgeven en betalen vanuit de auto** (Payconiq, Bancontact, kaart), **Q8 smiles** sparen per liter, per geladen kWh en per euro in de shop, EV-laadsessies beheren over **700.000+ laadpunten in Europa**, en punten inruilen bij partners van Kinepolis tot Decathlon.

De app verving de oude Q8 smiles-app voor de Benelux — ~700 stations — als volledige relance rond "(e-)mobiliteit en gemak", met migratie van bestaande gebruikers. Hij staat op **4.8/5 met ~6.600 beoordelingen** in de Belgische App Store en was **genomineerd voor de UX Design Awards 2024**.

## Mijn aandeel

Ik werkte aan de app tijdens mijn periode bij AE als volwaardig lid van het developmentteam, in React Native — productiefeatures die live gingen na code review, in een agile cyclus met échte usability-tests aan échte tankstations.

[TODO: jouw concrete verhalen — welke features waren van jou? De pomp-vrijgaveflow? Loyalty? Wat leert testen aan een letterlijk tankstation je dat een simulator niet kan?]

## Waarom het vormend was

Betalingen + loyalty + een fysieke machine die brandbare vloeistof aflevert: een onvergeeflijk integratieoppervlak. Je leert discipline door dit te shippen: feature flags, gefaseerde rollouts, en de nederigheid van kijken hoe een echte bestuurder de knop mist die jij vanzelfsprekend vond.`,
  },
];

async function main() {
  for (const draft of drafts) {
    await prisma.post.upsert({
      where: { slug: draft.slug },
      update: {},
      create: { ...draft, publishedAt: null },
    });
    console.log("draft:", draft.slug);
  }
}

main().finally(() => prisma.$disconnect());
