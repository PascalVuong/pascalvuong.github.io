## Introductie

Ik ben Pascal Vuong, junior software developer. In dit portfolio laat ik mijn skills, projecten en werkwijze zien. Ik werk graag samen en lever duidelijk leesbare code. In dit portfolio zie je projecten die ik zelfstandig of in teamverband heb gemaakt, met aandacht voor structuur, toegankelijkheid en versiebeheer.

**Wat je aantreft**
- **Multi-page** opzet: `index.php` (Home), `autobiography.php`, `projects.php` (met meerdere `<article>`-kaarten), `services.php`, `experience.php`, `contact.php`.
- **Flexbox** voor de navigatie (rij met “pill” links die netjes wrapt op small screens).
- **CSS Grid** voor de paginalayout (header → nav → main → footer) en voor het **Projecten-raster** (meerkoloms vanaf 48rem).
- **Minimaal WCAG A**: skip-link naar de hoofdinhoud en zichtbare focus-stijlen.
- **Document outline**: per pagina één `<h1>`, per sectie een `<h2>`, en binnen projecten `<article>` met `<h3>`.

Deze repo laat dus zien **waar en hoe** Grid en Flex zijn toegepast, en hoe de semantische structuur is opgezet.

---

## Upcoming features

Dit portfolio is nog in ontwikkeling. Dingen die ik later wil toevoegen/verbeteren:

- **Responsive navigatie met toggle**
  - Bovenbalk wordt op mobiel een compact menu met een knop (hamburger).
  - De knop opent/sluit een dropdown met de navigatielinks.

- **Uitbreiding layout & content**
  - Tekstblokken herschikken voor betere leesbaarheid.
  - Extra beelden/screenshots aan de contentsecties toevoegen.
  - Inconsistenties weghalen in verband met de opmaak van pagina titels.
  - Inconsistenties weghalen in verband met de groottes van de screenshot enlargements (sommige fotos zijn groter dan anderen.)
  - Hover-effects voor de knoppen in index.html

- **Werkend contactformulier**
  - Hosting verplaatsen naar een omgeving met backend-ondersteuning.
  - Contactformulier laten mailen naar mijn eigen adres (bijvoorbeeld via een simpele PHP-handler of mailservice).

---

## Projectstructuur

```
├── assets/
│   ├── css/
│   │   ├── compiled.css
│   │   └── compiled.css.map
│   ├── icons/
│   │   └── ... (tech-icons)
│   ├── img/
│   │   └── ... (screenshots van projecten)
│   ├── js/
│   │   └── lightbox.js
│   └── scss/
│       ├── _placeholder.scss
│       ├── _tokens.scss
│       ├── base.scss
│       ├── components.scss
│       ├── entry.scss
│       └── layout.scss
├── docs/
│   └── ... (documentatie)
├── autobiography.html
├── contact.html
├── experience.html
├── index.html
├── projects.html
├── services.html
├── LICENSE
└── README.md
```

## Pagina’s & semantiek (document outline)

- Overal: `<header>`, `<nav>`, `<main id="main">`, `<section>`, `<footer>`, 1× `<h1>` per pagina.
- **Projecten**: `<section id="projecten">` met meerdere `<article>` + `<h3>` (cards).
- **Experience**: werkervaring als `<article class="exp-card">` met jaartallen in `<time>`-elementen.
- **Contact**: aparte secties voor intro, formulier (demo), contactgegevens en “Waar ik graag bij help”.

---

## Waar Grid en Flex zijn toegepast

### Flexbox

In `assets/scss/components.scss` (gecompileerd naar `assets/css/compiled.css`):

    nav.topnav ul {
      display: flex;
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
    }

Ook gebruikt voor o.a.:

- `.tech-list` (stack-badges onder de projecten).
- Bepaalde icon-lijsten in de projectkaarten.

### Grid (pagina)

In `assets/scss/layout.scss`:

    body {
      display: grid;
      gap: tokens.$space-2;
      padding: tokens.$space-2;
      grid-template-columns: 1fr;
      grid-template-areas:
        "brand"
        "nav"
        "main"
        "footer";
      max-width: tokens.$maxw;
      margin-inline: auto;
    }

    @media (min-width: tokens.$break-tablet) {
      body {
        grid-template-columns: 1fr auto;
        grid-template-areas:
          "brand nav"
          "main  main"
          "footer footer";
      }
    }

### Grid (content)

Voor het projectenraster (tablet+):

    #projecten {
      display: grid;
      gap: tokens.$space-2;
    }

    @media (min-width: 48rem) {
      #projecten {
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
      }
    }

Hierdoor vormt het projectenblok op small screens één kolom, en vanaf tabletbreedte meerdere kolommen.

---

## Toegankelijkheid (minimaal WCAG A)

- **Skip-link** op elke pagina:

      <a class="skip-link" href="#main">Direct naar hoofdinhoud</a>

  Deze wordt alleen zichtbaar bij focus (toetsenbordnavigatie).

- **Focus-stijlen**

  Inputs, textarea’s en select krijgen een duidelijke focusring via een SCSS-placeholder:

      %focus-ring {
        outline: 3px solid #000;
        outline-offset: 2px;
      }

      .field input:focus-visible,
      .field textarea:focus-visible,
      .field select:focus-visible {
        @extend %focus-ring;
        border-color: tokens.$accent;
      }

- **Taal & metadata**
  - `lang="nl"` op `<html>`.
  - Per pagina een passende `<title>`.

- **Contactformulier op GitHub Pages**
  - GitHub Pages is statische hosting; er is geen backend.
  - Daarom is het formulier visueel aanwezig maar uitgeschakeld (demo), met uitleg in de UI.
  - Echte contactmogelijkheden lopen via e-mail, telefoon en LinkedIn (links staan op de Contact-pagina).

---

## Ontwikkelomgeving

- Editor: **VS Code**
- SCSS-compiler: **`sass` via `npx`**
- Server tijdens development:
  - HTML-bestanden direct in de browser openen, of
  - Een lichte dev-server gebruiken (bijv. VS Code Live Server of `npx serve`).
- Testbrowsers: Brave, Chrome, Edge, en Firefox.

---

## Responsive plan

**Browsers**  
Laatste versie van Brave, Chrome, Edge, en Firefox. 

**Devices & resoluties (mobile-first)**  

- **Phones:** 0–47.99rem (0–767px)  
  1 kolom content. Navigatie gebruikt Flexbox en wrapt naar meerdere regels indien nodig.

- **Tablets:** ≥48rem (~768px)  
  *Projecten* wisselt naar een CSS Grid met:

      grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));

- **Desktop/laptop:**  
  Schaal verder op basis van beschikbare ruimte. Min. tegelbreedte in het projectenraster blijft 16rem.

**Technieken gebruikt**

- **HTML5 + correcte document outline:** `header`, `nav`, `main`, `section`, `article`, `footer`.
- **Flexbox:** navigatie (`nav ul { display:flex; }`) en icon-lijsten.
- **CSS Grid:** paginalayout (header/nav/main/footer in rijen) en projectraster op `projects.html`.

**Waar zichtbaar in de code**

- Flex: `assets/scss/components.scss` → `nav.topnav ul { display:flex; … }`  
- Grid (pagina): `assets/scss/layout.scss` → `body { display:grid; grid-template-areas: … }`  
- Grid (content): `assets/scss/layout.scss` → `#projecten { display:grid; … }` + media query vanaf 48rem.  
- Outline: `index.html` (Home) en `projects.html` (H1 → H2 → H3 in `<article>`s).

---

## Preprocessors (SCSS)

**Toegepast in code**

- Geneste selectors:

      nav.topnav {
        ul { … }
        a {
          …
          &:hover,
          &:focus-visible { … }
        }
      }

- `&` (verschillende manieren):

      .topnav a {
        &:hover { … }
        &.is-current { … }
        & + & { margin-left: .5rem; }
      }

- Tokens & variabelen (`assets/scss/_tokens.scss`):

      :root {
        --accent: #57c26b;
        --text: #e7e7e7;
        --bg-0: #121212;
        --bg-1: #1d1d1d;
        --glow: rgba(255,255,255,.06);
      }

      $maxw: 80rem;
      $space-1: .5rem;
      $space-2: 1rem;
      $radius: .5rem;
      $pill-radius: .75rem;
      $border: #444;

- Operations:

      @use "sass:color";
      @use "tokens";

      nav.topnav a:hover {
        border-color: color.adjust(tokens.$border, $lightness: -10%);
      }

- `@media` (tablet):

      @media (min-width: tokens.$break-tablet) {
        .contact-section--grid {
          grid-template-columns: minmax(0, 2fr) minmax(0, 1.4fr);
        }
      }

- `@extend` placeholders (`assets/scss/_placeholder.scss`):

      %panel {
        border: 1px solid tokens.$border;
        padding: tokens.$space-2;
        border-radius: tokens.$radius;
      }

      %focus-ring {
        outline: 3px solid #000;
        outline-offset: 2px;
      }

  Gebruikt in o.a. `layout.scss` en `base.scss`:

      .brandbar { @extend %panel; }
      .topnav   { @extend %panel; }
      .panel    { @extend %panel; }

- Module-systeem:

      @use "tokens";
      @use "placeholder" as *;

---

## Build (SCSS → CSS)

De HTML-pagina’s linken naar één gecompileerd stylesheet:

    <link rel="stylesheet" href="assets/css/compiled.css">

`compiled.css` wordt gegenereerd vanuit `assets/scss/entry.scss`, dat de andere SCSS-bestanden importeert.

**Eenmalige build**

    npx sass assets/scss/entry.scss assets/css/compiled.css

**Tijdens development (watch-mode)**

    npx sass --watch assets/scss/entry.scss:assets/css/compiled.css

Na het builden commit ik zowel de SCSS-bestanden als `assets/css/compiled.css`, zodat GitHub Pages de site direct kan stylen zonder zelf SCSS te hoeven compileren.