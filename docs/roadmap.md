# Roadmap

Scris pe 2026-11-05. E o propunere, nu un angajament, și nu are termene: fiecare etapă începe
când se îndeplinește condiția celei dinainte. Prețurile și limitele se trec doar în `docs/pricing.md`,
după ce sunt verificate.

## Ce s-a schimbat

Produsul pune hainele pe fundaluri naturale, nu pe hârtie colorată. Pe hârtie, decupajul era
aproape tot ce conta. Pe un fundal natural, haina trebuie să pară așezată acolo, deci lumina,
umbra și perspectiva devin riscul principal. De aceea testul pe poze reale vine înaintea aplicației.

## Etapa 1: testul pe ~30 de poze reale

Răspunde la o singură întrebare: o haină reală, cu pixelii neatinși, arată credibil pe un fundal natural?

- Strângi ~30 de poze reale, în condiții diferite: lumină slabă, haine deschise, haine închise,
  fundaluri încărcate. Stau în `experiments/bg-test/input/` și nu ajung pe git.
- Încercăm 2-3 servicii de decupaj și notăm prețul, sursa și data în `docs/pricing.md`.
- Încercăm cele două variante de fundal de mai jos.
- Dai fiecărei poze o notă: aș posta-o sau nu.

**Gata când:** stabilești ce procent de poze bune e suficient și testul îl atinge. Dacă nu îl atinge,
ne oprim și regândim produsul înainte de a construi aplicația.

## Decizia cea mai importantă: de unde vin fundalurile

| Varianta | Avantaj | Risc |
| --- | --- | --- |
| **Bibliotecă de fundaluri gata făcute** (recomandată) | Pixelii hainei rămân siguri, tot lotul arată la fel, costul e previzibil | Puține fundaluri la început, trebuie obținute cu drept de folosire |
| Fundaluri generate cu AI pentru fiecare poză | Varietate mare | Cost pe poză, rezultate diferite în același lot, modelul poate atinge haina |

Recomand biblioteca: se potrivește direct cu regula de bază a produsului. Umbra hainei se adaugă
doar în afara măștii, iar la final haina originală se lipește peste rezultat.

## Etapa 2: site-ul devine real

Poate merge în paralel cu testul.

- Conectăm lista de așteptare la un serviciu real (acum e în demo mode).
- Punem poze reale în Before/After, în locul blugilor 3D.
- Înlocuim ilustrațiile cu lemn în trei tonuri cu mai multe materiale, când avem fundaluri fără haine pe ele.
- Alegem numele final și un domeniu.
- Verificăm la sursă regulile platformelor. Ambele afirmații din `docs/platform-terms.md` sunt încă
  `NEVERIFICAT`. Regula despre pozele de tip profesionist contează mai mult acum: nu poziționăm
  produsul pentru conturi Vinted obișnuite.
- Scoatem `noindex` abia după toate astea, ca să poată găsi Google site-ul.

**Gata când:** un vizitator se poate înscrie cu adevărat și nimic de pe site nu promite ceva nedecis.

## Etapa 3: deciziile dinaintea aplicației

- Cât timp păstrăm pozele și cine le poate vedea. Răspunsul din FAQ așteaptă decizia asta.
- Preț și limite, calculate din costurile reale găsite la testul din Etapa 1.
- Conturi de utilizator sau folosire fără cont, la început.

## Etapa 4: prima versiune a aplicației

Doar drumul de la un capăt la altul, în același proiect Next.js:

1. Încarci un lot de poze.
2. Alegi un fundal din bibliotecă.
3. Verifici fiecare rezultat: aprobi sau refaci.
4. Descarci pozele aprobate, în format pătrat sau portret.

**Gata când:** câțiva oameni de pe lista de așteptare procesează un lot real fără ajutorul nostru și
postează pozele.

## După prima versiune

Ordinea o stabilim din ce cer utilizatorii:

- Mai multe fundaluri naturale, pe categorii.
- Fundal ales automat după tipul hainei.
- Textul anunțului generat din poze (site-ul îl arată deja ca fiind în lucru).
- Plată, dacă nu a intrat în prima versiune.

## Ce nu facem

- Nu urcăm anunțuri automat pe nicio platformă.
- Nu modificăm haina: nici culoare, nici defecte, nici formă.
- Nu punem recenzii, cifre sau rezultate inventate pe site.

## Ce am nevoie de la tine acum

1. Cele ~30 de poze reale, ca să putem începe Etapa 1.
2. Procentul de poze bune la care spui că testul a reușit.
3. Confirmarea variantei pentru fundaluri: bibliotecă sau generate cu AI.
