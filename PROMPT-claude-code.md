Construiește de la zero landing page-ul proiectului. Citește întâi CLAUDE.md.
Lucrăm în faze. La finalul fiecărei faze te oprești, îmi explici în română ce ai
făcut și aștepți confirmarea mea. Nu lucrez în terminal: rulezi tu toate
comenzile (instalări, server local) și îmi dai linkul local.

NUMELE PRODUSULUI (provizoriu, definit într-un singur loc în cod): "Marketplace Winner"

## Faza 0: Pregătire
1. Verifică dacă există Node.js (LTS) și npm. Dacă lipsesc, spune-mi și oprește-te.
2. În folder există deja `web/` și `docs/decisions.md` dintr-o încercare
   anterioară. Vreau să pornim de la zero: propune-mi să mut `web/` în
   `_archive/web-v1/` și așteaptă aprobarea (nu șterge nimic).
3. Instalează la nivel de proiect, în `.claude/skills/`, doar din
   repository-urile originale:
   1. frontend-design (Anthropic, github.com/anthropics/skills, folderul skills/frontend-design)
   2. ui-ux-pro-max (github.com/nextlevelbuilder/ui-ux-pro-max-skill, folderul
      .claude/skills/ui-ux-pro-max) – are nevoie de Python 3; dacă lipsește, spune-mi
   3. emil-design-eng (github.com/emilkowalski/skills, folderul skills/emil-design-eng)
   4. impeccable (github.com/pbakaus/impeccable, folderul .claude/skills/impeccable)
   5. web-design-guidelines (github.com/vercel-labs/agent-skills, folderul skills/web-design-guidelines)
   6. webapp-testing (Anthropic, github.com/anthropics/skills, folderul skills/webapp-testing)
   Înainte de fiecare instalare arată-mi comanda exactă și sursa și așteaptă
   aprobarea. Copiezi doar folderul skill-ului; nu rulezi scripturi de
   instalare și nu instalezi nimic global. Dacă unul nu se poate instala,
   spune-mi și continuă fără el.
4. Actualizează secțiunea "Stil vizual" din CLAUDE.md cu direcția nouă de mai
   jos (paletă albastru/alb, ilustrații originale) și arată-mi diferența înainte
   să salvezi.

Roluri (respectă-le, ca skill-urile să nu se contrazică):
- frontend-design = direcția vizuală, ilustrațiile și codul. Are ultimul cuvânt
  pe estetică, în limitele din "Stil vizual".
- ui-ux-pro-max = reguli UX, accesibilitate și ghidaj Next.js; propune fonturi
  și culori DOAR în limitele din "Stil vizual". NU alege alt stil din baza lui.
- emil-design-eng = toate animațiile și micro-interacțiunile.
- impeccable = critică, finisare, cazuri-limită.
- web-design-guidelines + webapp-testing = verificarea finală.

## Ce e pagina
Landing page cu listă de așteptare pentru un tool care înlocuiește fundalul
pozelor de haine cu fundaluri de studio (hârtie colorată), în lot.
Public: oameni care vând haine second-hand pe marketplace-uri.
Singurul scop al paginii: să lase emailul. Limba paginii: engleză.

## Tehnic
- Next.js (App Router), TypeScript, Tailwind CSS, Motion pentru animații.
  Versiuni stabile actuale; înainte de cod citește ghidurile din
  node_modules/next/dist/docs/ (versiunea nouă are schimbări). Spune-mi ce
  versiuni ai ales.
- Proiectul în folderul web/. Landing page-ul la ruta "/". Mai târziu aplicația
  va sta în același proiect, deci componente refolosibile (components/, app/,
  public/assets/) și design tokens centralizați într-un singur fișier
  (culori, fonturi, spațieri, raze, umbre, durate și curbe de animație),
  folosibili și din CSS, și din Motion.
- Fonturi prin next/font. Imagini prin next/image. Ilustrațiile ca SVG în
  components/illustrations/ (componente React, culori doar din tokens).
- Formular: API route app/api/waitlist/route.ts care validează emailul și
  răspunde "demo mode". Interfața NU pretinde că s-a salvat.
- Secrete doar în .env.local (în .gitignore), cu un .env.example. Pregătit pentru Vercel.
- Metadata completă: title, description, Open Graph image, favicon.
- Responsive până la 375px, doar temă deschisă, accesibil (focus vizibil,
  contrast WCAG AA, alt text, prefers-reduced-motion respectat peste tot).
- Fără biblioteci în plus față de cele de mai sus, decât dacă îmi explici de ce.

## Faza 1: Studiu de referință (frontend-design)
Deschide în browser rewinder.com și site-ul Droppy pe care ți-l indic eu
(întreabă-mă de link dacă nu e clar care e). Fă capturi la 1440px și 375px.
Scrie-mi scurt ce PRINCIPII preiei de la fiecare (structura paginii, tipografie,
cum folosesc ilustrațiile, ritmul secțiunilor, mișcarea, ton) și ce NU preiei.
Nu copiem nimic concret: fără logo-urile, mascotele, personajele, ilustrațiile,
textele sau culorile lor exacte.

## Faza 1b: Design brief (frontend-design + ui-ux-pro-max)
Înainte de cod, scrie-mi un brief scurt și arată-l într-o pagină de test locală:
- 2 variante de pereche de fonturi din Google Fonts (un grotesc gros, strâns,
  cu italic adevărat pentru titluri + un font pentru text). Nu Inter, nu Space
  Grotesk.
- Paleta ca tokens, pe albastru/alb: fundal, suprafață card, text, text
  secundar, contur, albastrul principal (+ hover), eroare, plus culorile de
  hârtie de studio. Toate cu contrastul verificat (WCAG AA).
- 2 direcții de ilustrație, fiecare cu 2-3 mostre SVG reale (de ex. hârtia de
  studio curbată, un teanc de poze, un lot care trece prin "mașina" de
  fundaluri). Stil original, consecvent, aceeași grosime de linie și aceeași paletă.
- Scala tipografică, spațierile, razele, umbrele.
- Lista regulilor UX relevante pentru un landing page cu formular
  (din ui-ux-pro-max), pe scurt.
Aștepți alegerea mea înainte de faza următoare.

## Faza 1c: Plan de mișcare (emil-design-eng)
Pentru fiecare animație propusă: de ce există, cât de des o vede utilizatorul,
durata și curba. Un singur moment orchestrat la încărcare + micro-interacțiuni.
Ilustrațiile pot avea mișcare doar dacă explică ceva (de ex. lotul care trece
prin proces). Orice animație fără motiv clar se taie. Orice mișcare automată
de peste 5 secunde are buton de pauză.

## Stil vizual
Inspirat din PRINCIPIILE Rewinder și Droppy, fără să le copiezi elementele:
- Paletă albastru/alb: fundal alb, text bleumarin aproape negru, un albastru
  principal pentru butoane și accente. Albastrul să nu fie identic cu al lor.
- Titluri foarte mari, litere strânse (letter-spacing negativ), cu un
  cuvânt-accent în italic.
- Meniu plutitor în formă de pastilă, închis la culoare, cu blur în spate,
  fix sus; devine puțin mai compact după scroll.
- Butoane-pastilă: unul plin (albastru), unul cu contur. Hover subtil, apăsare
  care se simte (scale ușor în jos).
- Sub butoane, o linie scurtă de încredere, cu puncte între fraze.
- Ilustrații originale, desenate de tine ca SVG, în stilul ales în Faza 1b.
  Ele explică ideea (studio, lot, verificare, export); NU se prefac a fi
  rezultate reale ale produsului. Unde trebuie arătată o poză reală (haina,
  înainte/după), folosești poze reale sau locuri goale marcate clar.
- Culorile de hârtie de studio (teracotă, salvie, galben-unt, bleu pal, roz
  pudrat, cărbune) apar în scena din hero, în ilustrații, în carduri și în
  footer, cu o textură fină de hârtie (grain foarte discret).
- Interzis: gradient-uri violet-albastru, carduri cu iconițe generice, emoji,
  recenzii, cifre sau statistici inventate, logo-uri sau nume de platforme
  (Vinted, OLX etc.), mascote copiate.

## Secțiuni, în ordine
1. Meniu-pastilă: numele | How it works | Features | FAQ | buton "Join the waitlist".
2. Hero, centrat:
   - linie mică deasupra: "For second-hand marketplace sellers"
   - titlu: "Real clothes." / "Studio *backgrounds.*" (backgrounds în italic)
   - subtitlu: "Upload a batch of photos, pick a paper backdrop, check every
     result and download listing-ready images. The garment stays exactly as
     you shot it."
   - butoane: "Join the waitlist" (plin) și "See how it works" (contur)
   - linia de încredere: "Garment untouched · Batch upload · You post the listings"
3. Scena de studio (momentul principal al paginii), sub hero: fundal de hârtie
   curbat ca într-un studio foto (perete care se curbează în podea, lumină
   moale de sus, umbră de contact sub haină), cu haina în centru și elemente
   ilustrate în jur (lumini, trepied etc., în stilul ales). Culoarea hârtiei
   trece lent prin paletă, cu buton de pauză. Sub scenă, pastile de culoare pe
   care apeși ca să schimbi fundalul (mini-demo), cu tranziție fină.
   Haina vine din public/assets/hero-garment.png (PNG decupat, transparent).
   Dacă fișierul nu există, arată un loc gol cu contur punctat și textul
   "Your garment photo goes here", nu o ilustrație de haină.
4. Features, grilă 2x2 de carduri, fără iconițe generice. Fiecare cu titlu,
   o frază și o imagine (ilustrație sau componentă) care iese din marginea de jos:
   - "The garment stays untouched": înainte/după cu slider tras cu mouse-ul
     sau degetul (accesibil și din tastatură), pe poze reale sau locuri goale
   - "Whole batches at once": teanc de miniaturi care se răsfiră la hover
   - "You approve every photo": ecran de verificare cu Approve / Redo pe poze
   - "Ready for any marketplace": aceeași poză exportată pătrat și portret
5. How it works: 3 pași numerotați mare, fiecare cu ilustrația lui:
   Upload → Pick a backdrop → Check & download.
6. Coming later (marcat clar "In progress"): listing text generated from your
   photos (reads the label, writes title and description).
7. FAQ ca acordeon accesibil:
   - Will the colour of my clothes change? → No. We cut out the garment and
     only change what's behind it.
   - Does it post my listings? → No. You download the photos and post them yourself.
   - How much will it cost? → Pricing isn't set yet. Waitlist members hear first.
   - Is this allowed on marketplaces? → Each marketplace has its own photo
     rules. Photos must show the real item and its real condition; check your
     platform's rules.
   - What happens to my photos? → placeholder marcat TODO, decid eu.
8. Card final: titlu scurt, câmp de email în formă de pastilă + "Join the
   waitlist", stări clare (se trimite / eroare / demo mode), și textul:
   "We'll only use your email to tell you when we launch. Unsubscribe anytime."
   cu link către /privacy (pagină placeholder).
9. Footer: numele, coloane (Product: How it works, Features, FAQ;
   Legal: Privacy), "© 2026 [nume]", și numele uriaș jos, tăiat de marginea
   paginii, pe fond în culoarea hârtiei.

## Faza 2: Construcție (frontend-design + emil-design-eng)
Construiește secțiune cu secțiune. După meniu + hero + scena de studio te
oprești, pornești serverul local și îmi dai linkul, ca să văd direcția înainte
de restul paginii.

## Faza 3: Critică și finisare (impeccable)
1. critique pe toată pagina: arată-mi scorul și problemele, pe scurt.
2. Repară ce e important, apoi polish.
3. harden pe formular și pe FAQ (erori, text lung, ecran îngust).
Spune-mi ce ai schimbat.

## Faza 4: Verificare (webapp-testing + web-design-guidelines + impeccable audit)
- Capturi de ecran la 1440px, 768px și 375px; corectează ce e stricat.
- Audit cu web-design-guidelines și impeccable audit; repară problemele
  blocante și importante, listează-mi restul.
- Testează: navigarea cu tastatura, acordeonul, slider-ul, formularul
  (email valid, invalid, demo mode), prefers-reduced-motion.

## La final
Spune-mi în română: ce ai făcut, ce trebuie să pun eu (poza hainei, textul
de Privacy, serviciul de email, numele final), ce ar trebui să verific,
notează deciziile în docs/decisions.md și actualizează secțiunea "Structura"
din CLAUDE.md.
