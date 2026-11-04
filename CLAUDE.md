# CLAUDE.md

## Proiectul
Tool pentru oameni care vând haine second-hand pe marketplace-uri: înlocuiește
fundalul pozelor de produs cu fundaluri de studio (hârtie colorată), în lot.
Utilizatorul verifică fiecare poză, descarcă și își urcă singur anunțurile.
Nu automatizăm urcarea pe nicio platformă.

Nume provizoriu: **Marketplace Winner**. E definit într-un singur loc în cod,
ca să poată fi schimbat ușor. Nu folosi niciodată "Vinted", "OLX" sau alte
mărci în numele produsului, în texte sau în logo-uri.

Etapa curentă: landing page cu listă de așteptare, construit de la zero
(încercarea anterioară, dacă există, stă în `_archive/`). Aplicația vine după
testul pe ~30 de poze reale.

## Regula de bază a produsului
**Pixelii hainei nu se modifică niciodată.** Haina se decupează, fundalul se
schimbă doar în afara măștii, iar la final haina originală se lipește peste
rezultat. Dacă o abordare încalcă regula, o semnalezi înainte să scrii cod.

## Despre utilizator
- Începător în programare. Folosește Claude Code din aplicația desktop, nu din
  terminal: rulezi tu comenzile (instalări, server local) și îi explici pe
  scurt ce ai rulat. Îi dai linkul local ca să vadă rezultatul.
- Vorbim în română. Codul, comentariile, numele de fișiere, commit-urile și
  textele de pe site sunt în engleză.
- La fiecare decizie importantă: 2-3 propoziții despre ce ai ales și de ce,
  plus ce trebuie să verifice el.
- Când lucrezi pe faze, te oprești la finalul fiecărei faze și aștepți
  confirmarea lui.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS + Motion (animații).
  Versiuni stabile actuale; citește ghidurile din `node_modules/next/dist/docs/`
  înainte de cod, versiunile noi au schimbări.
- Fonturi prin next/font, imagini prin next/image.
- Design tokens (culori, fonturi, spațieri, raze, umbre, durate și curbe de
  animație) stau într-un singur fișier, folosibil din CSS și din Motion;
  componentele folosesc doar tokens.
- Ilustrațiile sunt imagini 3D în `public/assets/3d/`, afișate prin next/image;
  ce desenăm în cod (hârtia, rola) stă în `components/illustrations/`, cu culori
  doar din tokens.
- Publicare pe Vercel.
- Nu adăuga biblioteci noi fără să explici de ce și fără aprobare.

## Skill-uri de design și rolurile lor
Instalate în `.claude/skills/`. Ca să nu se contrazică, fiecare are un rol fix:
- **frontend-design**: direcția vizuală, ilustrațiile și codul; are ultimul
  cuvânt pe estetică, în limitele din "Stil vizual".
- **ui-ux-pro-max**: reguli UX, accesibilitate, ghidaj Next.js; propune fonturi
  și culori doar în limitele din "Stil vizual". Nu alege alt stil.
- **emil-design-eng**: toate animațiile și micro-interacțiunile. Orice animație
  are un motiv, o durată și o curbă justificate; altfel se taie.
- **impeccable**: critique, polish, harden, audit.
- **web-design-guidelines** + **webapp-testing**: verificarea înainte de publicare
  (capturi la 1440px, 768px, 375px).
Skill-uri noi se instalează doar din repository-urile originale, după ce îi
arăți comanda și sursa utilizatorului.

## Stil vizual
Inspirat din principiile site-urilor Rewinder și Droppy, fără să le copiezi
elementele (logo-uri, mascote, personaje, ilustrații, texte, culori exacte):
- Paletă albastru/alb, doar temă deschisă: fundal alb, text bleumarin aproape
  negru, un albastru principal pentru butoane și accente, diferit de al lor.
- Titluri foarte mari, litere strânse (letter-spacing negativ), cu un
  cuvânt-accent în italic.
- Meniu plutitor în formă de pastilă, închis la culoare, cu blur în spate,
  fix sus; devine puțin mai compact după scroll.
- Butoane-pastilă: unul plin (albastru), unul cu contur. Hover subtil,
  apăsare care se simte (scale ușor în jos).
- Fără texte mici decorative: nicio etichetă mică deasupra titlurilor, nicio
  linie de încredere cu puncte sub butoane (decizia utilizatorului, 2026-11-03:
  par generate de AI).
- Numele uriaș în footer, tăiat de marginea paginii, pe fond în culoarea hârtiei.
- Lumea vizuală proprie: studioul foto. Culorile de hârtie (teracotă, salvie,
  galben-unt, bleu pal, roz pudrat, cărbune) apar în scena din hero, în
  ilustrații, în carduri și în footer, cu un grain foarte discret.
- Ilustrații 3D de tip cartoon (plastilină moale), într-un singur stil, ca
  imagini WebP transparente în `public/assets/3d/`. Fundalurile din ele sunt
  hârtie de studio, nu lemn sau decoruri (produsul rămâne hârtie colorată).
  Hero: cerul cu haine pe nori (alegerea utilizatorului, 2026-11-04). Pe site
  folosim doar culorile care merg cu albastru/alb (bleu, roz pudrat, galben-unt,
  cărbune); teracota și salvia rămân în tokens, dar nu apar. Fiecare card are
  designul lui, pe paleta albastru/alb. Ele explică ideea (studio,
  lot, verificare, export). NU se prefac a fi rezultate reale ale produsului:
  unde trebuie arătată haina reală sau un înainte/după real, folosești poze
  reale sau locuri goale marcate clar. Într-o animație înainte/după, haina e
  același fișier în ambele stări, ca să nu-și schimbe niciun pixel.
- Mascota: umerașul cu ochi, personaj discret (meniu, scenă, formular). Nu
  vorbește și nu acoperă conținutul.
- Interzis: gradient-uri violet-albastru, Inter și Space Grotesk, carduri cu
  iconițe generice, emoji, recenzii, cifre sau statistici inventate, logo-uri
  sau nume de platforme, mascote sau ilustrații copiate.
- Accesibil: contrast WCAG AA, focus vizibil, navigare din tastatură, alt text,
  prefers-reduced-motion respectat peste tot; orice mișcare automată de peste
  5 secunde are buton de pauză.

## Onestitate în produs și pe site
- Nu inventa prețuri, limite sau parametri de API. Verifică în documentația
  oficială și notează sursa și data în `docs/pricing.md`. Ce nu e verificat se
  marchează `NEVERIFICAT`.
- Formularul de email nu pretinde că a salvat ceva cât timp nu e conectat la un
  serviciu real ("demo mode").
- Nu promite pe site lucruri nedecise (preț, păstrarea pozelor). Lasă TODO.
- Regulile platformelor: Vinted consideră pozele standardizate, de tip
  profesionist, semn de vânzare comercială. Nu poziționa produsul pentru conturi
  Vinted obișnuite. Orice afirmație despre regulile unei platforme se verifică
  la sursă și se notează în `docs/platform-terms.md`.

## Securitate
- Cheile și setările secrete doar în `.env.local` (în `.gitignore`), cu un
  `.env.example` fără valori. Nu le scrie în cod, în log-uri sau în mesaje.
- Pozele reale de test stau în `experiments/*/input/` și nu se pun pe git.
- Înainte de o schimbare mare (dependență nouă, schimbare de stack, mutare sau
  ștergere de fișiere), întreabă.

## Structura
- `web/`: proiectul Next.js (landing page la `/`, aplicația mai târziu în același
  proiect)
  - `app/`: rute (`/`, `/privacy`); `app/api/waitlist/`: endpoint-ul listei de
    așteptare (demo mode); `icon.svg`, `opengraph-image.tsx`
  - `components/`: componente refolosibile; `components/illustrations/`: scenele
    3D (`Print3D.tsx` are poza și insigna, `Tilt.tsx` înclinarea după mouse)
  - `lib/site.ts`: numele produsului (singurul loc); `lib/tokens.ts`: design tokens
  - `public/assets/3d/`: imaginile 3D decupate (haine, mascotă, ramă de telefon)
- `docs/`: `decisions.md` (data, decizia, motivul, alternativa respinsă),
  `motion-plan.md`, `design-brief/` (pagina de test din Faza 1b), `pricing.md`,
  `platform-terms.md`
- `.claude/launch.json`: serverele locale (`web` pe portul 3000, `design-brief` pe 4310)
- `experiments/bg-test/`: testul pe ~30 de poze (scripturi, rezultate, scoruri)
- `_archive/`: încercări anterioare, doar pentru referință

Actualizează secțiunea asta când structura se schimbă.
