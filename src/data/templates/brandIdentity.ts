import { PromptTemplate } from '../../types';

export const BRAND_IDENTITY_TEMPLATES: PromptTemplate[] = [
  {
    id: 'claude-code-ci-client-order',
    title: 'Claude Code: Nová zakázka podle CI klienta',
    description: 'Spuštění nové vývojové zakázky v Claude Code s plnou integrací klientského CI, barevné palety a design tokenů.',
    modelId: 'claude-code',
    categoryId: 'brand-identity',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'greenfield',
    tags: ['Claude Code', 'CI Klient', 'Nová zakázka', 'Design Tokens'],
    authorFeedTip: 'Zajišťuje, že Claude Code přesně respektuje brand guidelines a specifické proměnné zadavatele.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'cc-client-name',
        key: 'client_name',
        label: 'Název klienta',
        type: 'text',
        value: 'FinTech Corp - Redesign klientského portálu',
        required: true
      },
      {
        id: 'cc-project-env',
        key: 'project_environment',
        label: 'V jakém prostředí se kód vyvíjí',
        type: 'textarea',
        value: 'Moderní React aplikace s TypeScriptem a Tailwind CSS',
        required: true
      },
      {
        id: 'cc-ci-rules',
        key: 'ci_guidelines',
        label: 'CI pravidla a design tokeny klienta',
        type: 'textarea',
        value: '- Barvy: Primary #09090b, Accent #10b981\n- Font: Geist Sans / Geist Mono\n- Poloměr rohu: 8px\n- Tón komunikace: Precizní, čistý kód bez AI slopu',
        required: true
      }
    ],
    templateString: `<context>
Zahajuješ novou klientskou zakázku pro klienta: {{client_name}}.
Vývojové prostředí: {{project_environment}}
Závazná Corporate Identity a Design Tokeny klienta:
{{ci_guidelines}}
</context>

<task>
1. Prostuduj a interně aplikuj všechna CI pravidla a design tokeny klienta.
2. Zahajte implementaci zakázky s důrazem na čistotu kódu, typografickou hierarchie a 100% shodu s CI.
3. Dodržuj stanovené barevné kódy, rozestupy (8px mřížka) a konvence bez zástupných komentářů.
</task>

<constraints>
- Žádný AI slop, žádné TODO komentáře.
- Kód musí být plně funkční a připravený k produkčnímu nasazení.
</constraints>`
  },
  {
    id: 'claude-code-ci-code-review-audit',
    title: 'Claude Code: CI Code Review & Brand Compliance Audit',
    description: 'Automatická revize existujícího kódu, komponent a stránek v Claude Code z hlediska 100% shody s CI design tokeny, barvami a typografií.',
    modelId: 'claude-code',
    categoryId: 'brand-identity',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'polish',
    tags: ['Claude Code', 'CI Audit', 'Code Review', 'Design Tokens', 'Brand Compliance'],
    authorFeedTip: 'Provede hloubkový audit kódu a opraví veškeré odchylky od klientského design manuálu.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ccr-client-name',
        key: 'client_name',
        label: 'Název klienta',
        type: 'text',
        value: 'FinTech Corp - Klientský portál',
        required: true
      },
      {
        id: 'ccr-scope',
        key: 'code_scope',
        label: 'Rozsah auditu (soubory / komponenty)',
        type: 'textarea',
        value: 'src/components/*.tsx, src/pages/*.tsx',
        required: true
      },
      {
        id: 'ccr-ci-rules',
        key: 'ci_guidelines',
        label: 'Závazná CI pravidla a design tokeny',
        type: 'textarea',
        value: '- Barvy: Pouze definované Tailwind tokeny (bg-slate-900, emerald-500, atd.)\n- Zakázané inline styly a hardcoded barvy (#fff, #000)\n- Poloměr rohu: rounded-lg\n- Typografie: Geist Sans a Geist Mono',
        required: true
      }
    ],
    templateString: `<context>
Provádíš přísný CI Code Review a Brand Compliance Audit pro klienta: {{client_name}}.
Rozsah auditu: {{code_scope}}
Závazná CI pravidla a design tokeny:
{{ci_guidelines}}
</context>

<task>
1. Zkontroluj veškerý kód v zadaném rozsahu na přítomnost neschválených barev, inline stylů nebo nesprávných poloměrů rohů.
2. Identifikuj všechny odchylky od CI a navrhni přesné opravy (diff).
3. Refaktoruj zjištěné nedostatky na čistý, produkční kód plně odpovídající design tokenům klienta.
</task>

<constraints>
- Nenechávej žádné nedořešené TODO bloky.
- Ověř přístupnost (WCAG) a správnou typografickou hierarchii.
</constraints>`
  },

  // -------------------------------------------------------------------------
  // EXISTING CORE BRANDTEMPLATES
  // -------------------------------------------------------------------------
  {
    id: 'brand-guidelines-handbook',
    title: 'Brand Identity: Kompletní Design Manuál & Pravidla Značky',
    description: 'Strukturovaný brandbook: ochranná zóna loga, typografická hierarchie, minimální velikost a zakázané manipulace.',
    modelId: 'gpt-o3',
    categoryId: 'brand-identity',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Brandbook', 'Identita', 'Logo', 'Design Manuál'],
    authorFeedTip: 'Vymezte ochrannou zónu loga relativně k výšce písmene "X" z logotypu.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'br-name',
        key: 'brand_name',
        label: 'Název značky a její esence',
        type: 'text',
        value: 'Aetheria Cloud - Bezpečná decentralizovaná datová platforma',
        required: true
      }
    ],
    templateString: `<context>
Sestavuješ autoritativní Brand Identity manuál pro značku: {{brand_name}}.
</context>

<task>
Vygeneruj základní strukturu Brandbooku:
1. Mise, vize a pozice značky na trhu.
2. Pravidla logotypu (primární verze, sekundární monogram, ochranná zóna, minimální velikost).
3. Zakázané manipulace s logem (deformace, změny barev, stíny).
4. Barevná paleta (CMYK, RGB, HEX, Pantone).
5. Základní a doplňková typografie.
</task>`
  },

  {
    id: 'brand-typography-matrix-pairing',
    title: 'Brand Identity: Typografická Matice & Párování Písem',
    description: 'Definice párování Display fontu, Body textu a Monospace písma pro tisk i digitální produkty.',
    modelId: 'gpt-o3',
    categoryId: 'brand-identity',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Typografie', 'Písma', 'Pairing', 'Brand'],
    authorFeedTip: 'Kombinujte geometrický display font s vysoce čitelným humanistickým sans-serifem.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'typ-pair',
        key: 'brand_personality',
        label: 'Osobnost značky',
        type: 'text',
        value: 'Precizní technologický fintech s důrazem na bezpečnost a prémiový švýcarský styl',
        required: true
      }
    ],
    templateString: `<context>
Navrhuješ typografický systém pro: {{brand_personality}}.
</context>

<task>
1. Definuj párování fontů: Display font pro nadpisy, Primary font pro tělo textu, Monospace font pro data.
2. Urči pravidla pro web (Google Fonts / Self-hosted WOFF2) a tisk (OTF/TTF).
3. Nastav typografickou škálu pro rozlišení od mobilu po 4K monitory.
</task>`
  },

  // -------------------------------------------------------------------------
  // 10 NEW CI INITIATION & BRAND GOVERNANCE TEMPLATES
  // -------------------------------------------------------------------------
  {
    id: 'brand-ci-manual-ingestion-and-rules',
    title: 'Brand & CI: Načtení Brand Manuálu & Extrakce Závazných Design Rules',
    description: 'Načtení a strukturovaná analýza dodaného brand manuálu / specifikace CI a extrakce striktních pravidel pro vývojáře a designéry.',
    modelId: 'claude-code',
    categoryId: 'brand-identity',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Brand Manual', 'CI Ingestion', 'Design Rules', 'Governance', 'Claude Code'],
    authorFeedTip: 'Převádí vágní estetický text z brandbooku na tvrdé systémové direktivy s hodnotami (px, rem, hex, CMYK).',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ci-ingest-source',
        key: 'brand_manual_summary',
        label: 'Podklady z brand manuálu / CI dokumentu',
        placeholder: 'Specifikace loga, barev, písma a vizuálního stylu značky...',
        type: 'textarea',
        value: '- Značka: NexaTech (B2B SaaS analytika).\n- Barvy: Primární Obsidian #09090b, Akcent Electric Emerald #10b981, Neutral Zinc #71717a.\n- Fonty: Geist Sans pro UI, Geist Mono pro datové vstupy.\n- Mřížka a Zaoblení: Přísná 8px mřížka, poloměry rohu rx=6px (sm-rounded) až rx=12px (lg-rounded).\n- Tón komunikace: Věcný, přímý, přátelský, bez korporátního balastu.',
        required: true
      },
      {
        id: 'ci-ingest-output',
        key: 'target_rules_format',
        label: 'Cílový formát pravidel pro projekt',
        type: 'select',
        options: [
          'Markdown pravidla do BRAND_RULES.md v repozitáři',
          'System Directive blok do Claude Code System Promptu',
          'JSON konfigurační schéma pro CI/CD linter'
        ],
        value: 'Markdown pravidla do BRAND_RULES.md v repozitáři',
        required: true
      }
    ],
    templateString: `<context>
Iniciuješ nový projekt a načítáš oficiální Corporate Identity (CI) specifikaci.
Zdrojové podklady CI:
{{brand_manual_summary}}
</context>

<task>
1. Proveď hloubkovou analýzu předloženého brand manuálu a extrahuj z něj 100% závazné technické a vizuální direktivy.
2. Vytvoř dokument vyžadovaný jako: {{target_rules_format}}.
3. Přesně kodifikuj:
   - Barevnou paletu (přesné HEX, RGB a Tailwind v4 aliasy).
   - Typografické rozhraní a fallbacky.
   - Pravidla používání logotypu a ochranných zón.
   - Mřížku (Grid & Spacing scale).
   - Zakázané vizuální manipulace a anti-vzory.
</task>

<constraints>
- Žádný generický balast. Všechny pravidla musí být konkrétní a měřitelná v kódu i designu.
</constraints>`
  },

  {
    id: 'brand-design-tokens-initiation',
    title: 'Brand & CI: Iniciace Design Tokenů z CI (W3C / Figma / Tailwind v4)',
    description: 'Převod barevných palet, typografie, spacingu a poloměrů z brand manuálu do systémových W3C design tokenů v JSONu a Tailwind v4 @theme.',
    modelId: 'claude-code',
    categoryId: 'brand-identity',
    defaultWorkflow: 'figma-tokens',
    defaultPhase: 'greenfield',
    tags: ['Design Tokens', 'W3C', 'Tailwind v4', 'Figma', 'CI Initiation'],
    authorFeedTip: 'Založení tokenů na začátku projektu garantuje, že jakákoli budoucí změna identity vyžaduje změnu na jediném místě.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'dt-brand-specs',
        key: 'ci_specs_for_tokens',
        label: 'Specifikace barev a rozměrů z CI',
        type: 'textarea',
        value: '- Primární barva značky: Deep Carbon #0a0a0a\n- Sekundární barva: Pure White #ffffff\n- Brand Akcent: Neon Emerald #10b981\n- Doplňkové stavové barvy: Warning #f59e0b, Error #ef4444, Info #3b82f6\n- Základní font: Inter / Geist (12px, 14px, 16px, 20px, 24px, 32px, 48px)\n- Border radius škála: 2px (xs), 6px (sm), 8px (md), 12px (lg), 9999px (full)',
        required: true
      },
      {
        id: 'dt-format',
        key: 'token_output_structure',
        label: 'Cílový formát generování',
        type: 'select',
        options: [
          'Tailwind CSS v4 @theme (styles/theme.css)',
          'W3C Design Token JSON (tokens/brand.json)',
          'CSS Custom Properties (:root) & TypeScript Types'
        ],
        value: 'Tailwind CSS v4 @theme (styles/theme.css)',
        required: true
      }
    ],
    templateString: `<context>
Provádíš technickou iniciaci Design Tokenů na základě nového CI.
Podklady z manuálu:
{{ci_specs_for_tokens}}
Výstupní formát: {{token_output_structure}}
</context>

<task>
1. Transformuj specifikaci CI do strukturovaného tokenového stromu s vrstvami:
   - Global / Primitive tokens (přímé HEX a px hodnoty).
   - Semantic tokens (background-primary, text-accent, border-subtle).
   - Component tokens (button-bg-hover, card-border).
2. Vygeneruj kompletní kód pro: {{token_output_structure}}.
</task>

<constraints>
- Striktně dodržuj konvence W3C Community Group nebo Tailwind v4 @theme syntaxi.
- Zajisti plnou podstatu pro Light i Dark mode.
</constraints>`
  },

  {
    id: 'brand-assets-creation-guidelines',
    title: 'Brand & CI: Kodifikace Pravidel pro Tvorbu Nových Materiálů',
    description: 'Stanovení přísného rámce (Brand Governance) pro vytváření nových marketingových, tiskových a digitálních výstupů dle CI.',
    modelId: 'gpt-o3',
    categoryId: 'brand-identity',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Brand Governance', 'Pravidla Tvorby', 'Marketing', 'CI Rules'],
    authorFeedTip: 'Definuje poměry stran, kompoziční mřížku a pravidlo 60-30-10 pro barvy v každém novém materiálu.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'bac-identity',
        key: 'brand_core_identity',
        label: 'Základní identita a cílová média',
        type: 'textarea',
        value: 'Značka: Meraki Lab (Technologické studio).\nCílová média: Webové landing pages, prezentace pro investory, sociální sítě (LinkedIn/Instagram), tiskové letáky a roll-upy.',
        required: true
      },
      {
        id: 'bac-principles',
        key: 'composition_and_grid',
        label: 'Kompoziční pravidla & mřížka',
        type: 'textarea',
        value: '- Vždy používat 12sloupcovou mřížku pro web a 4sloupcovou pro tiskoviny.\n- Pravidlo kontrastu: 60% tmavé pozadí, 30% strukturovaný obsah, 10% akcentní značková barva.\n- Typografická dominance: Nadpis musí být minimálně 2.5x větší než doprovodný text.\n- Umístění loga: Vždy pravý horní nebo levý horní roh s 1.5x ochranným rozestupem.',
        required: true
      }
    ],
    templateString: `<context>
Sestavuješ kodifikovaná pravidla pro tvorbu nových kampaňových a produktových materiálů značky.
Identita:
{{brand_core_identity}}

Kompoziční zásady:
{{composition_and_grid}}
</context>

<task>
Vygeneruj přehledný manuál pravidel (Governance Guide) pro externí i interní grafiky a vývojáře, který obsahuje:
1. Závazná kompoziční schémata pro formáty 16:9, 1:1 a A4 tisk.
2. Pravidla pro vkládání a ořezávání fotografií.
3. Použití typografie a hierarchie informací (Hero vs Body vs Microcopy).
4. Kontrolní seznam (Checklist) před schválením materiálu do produkce.
</task>`
  },

  {
    id: 'brand-logo-usage-and-clearspace-matrix',
    title: 'Brand & CI: Definice Pravidel Použití Loga, Variant a Ochranných Zón',
    description: 'Přesný předpis pro práci s primárním logotypem, sekundárním monogramem, tmavou/světlou variantou a ochrannou zónou.',
    modelId: 'claude-code',
    categoryId: 'brand-identity',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Logo Rules', 'Clearspace', 'Monogram', 'Brand Guidelines'],
    authorFeedTip: 'Definice ochranné zóny pomocí relativní jednotky "X" garantuje správné odsazení bez ohledu na velikost loga.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'blu-logo-spec',
        key: 'logo_variants_and_symbol',
        label: 'Specifikace loga a symbolu',
        type: 'textarea',
        value: '- Primární logo: Horizontální logotyp "MERAKI" + geometrický uzel.\n- Sekundární logo: Vertikální varianta pro čtvercové formáty.\n- Symbol / App Icon: Samostatný uzel bez textu (24x24 px až 512x512 px).\n- Ochranná zóna: Minimálně 1.5x výšky písmene "M" kolem všech stran loga.\n- Minimální velikost: Tisk 15 mm na šířku, Web 80 px na šířku.',
        required: true
      }
    ],
    templateString: `<context>
Kodifikuješ přesná pravidla použití logotypu a značky.
Specifikace z CI:
{{logo_variants_and_symbol}}
</context>

<task>
Sestav kompletní manuál pro použití loga:
1. Matice použití variant (Kdy použít primární, sekundární nebo samostatný symbol).
2. Matematické vymezení ochranné zóny (Clearspace).
3. Podmínky pro tmavá pozadí (Monochromatická bílá verze) vs světlá pozadí (Monochromatická černá verze).
4. 8 nejčastějších zakázaných manipulací (Zakázané rotace, stíny, změny písma, neautorizované barvy).
</task>`
  },

  {
    id: 'brand-color-harmony-wcag-accessibility',
    title: 'Brand & CI: Barevný Systém, Režimy (Light/Dark) & WCAG Kontrast',
    description: 'Mapování barev CI na semantické vrstvy (background, surface, border, text), kontrastní matice dle WCAG 2.1 AAA pro 4K zobrazení.',
    modelId: 'claude-code',
    categoryId: 'brand-identity',
    defaultWorkflow: 'figma-tokens',
    defaultPhase: 'greenfield',
    tags: ['Color Palette', 'WCAG AAA', 'Dark Mode', 'Accessibility'],
    authorFeedTip: 'Každá barva textu musí dosáhnout kontrastního poměru minimálně 7:1 vůči pozadí pro splnění WCAG AAA.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'bch-colors',
        key: 'palette_definitions',
        label: 'Základní barevná paleta značky',
        type: 'textarea',
        value: '- Obsidian Black: #09090b\n- Charcoal Surface: #18181b\n- Border Zinc: #27272a\n- Text Primary: #fafafa\n- Text Muted: #a1a1aa\n- Brand Accent Emerald: #10b981\n- Accent Hover: #059669',
        required: true
      }
    ],
    templateString: `<context>
Konfiguruješ přístupný barevný systém z CI podkladů.
Barevný základ:
{{palette_definitions}}
</context>

<task>
1. Sestav semantickou barevnou matici pro Tmavý (Dark) i Světlý (Light) režim.
2. Vypočítej a ověř kontrastní poměry (Contrast Ratio) pro všechny kombinace textu a pozadí podle WCAG 2.1 AAA.
3. Vygeneruj CSS/Tailwind proměnné s jasným pojmenováním pro vývojáře.
</task>`
  },

  {
    id: 'brand-typography-scale-and-webfont-setup',
    title: 'Brand & CI: Typografická Škála & Pravidla Sazby dle CI',
    description: 'Nastavení typografického systému z manuálu: náhradní systémové fonty (fallbacks), font-loading strategie, pravidla pro 4K monitory.',
    modelId: 'cursor',
    categoryId: 'brand-identity',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'greenfield',
    tags: ['Typografie', 'Font Loading', 'Responsive Scale', 'CI Setup'],
    authorFeedTip: 'Používejte font-display: swap a WOFF2 formát pro nulové blikání textu při načítání.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'bts-fonts',
        key: 'font_families',
        label: 'Písma z brand manuálu',
        type: 'textarea',
        value: '- Display font: Geist Sans / Plus Jakarta Sans (Weight: 600, 700, 800)\n- Body font: Geist Sans / Inter (Weight: 400, 500)\n- Monospace font: Geist Mono / JetBrains Mono (Weight: 400, 500)',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ typografický systém podle CI manuálu.
Fonty:
{{font_families}}
</context>

<task>
1. Definuj typografickou škálu (Modular Scale) od mobile (320px) přes desktop (1920px) až po 4K (3840px).
2. Nastav CSS font-face deklarace s fallbacky (system-ui, sans-serif).
3. Urči pravidla pro line-height, letter-spacing a margin-bottom u všech úrovní nadpisů (h1-h6).
</task>`
  },

  {
    id: 'brand-visual-language-and-photo-style',
    title: 'Brand & CI: Vizuální Jazyk & Směrnice pro Fotografický Styl',
    description: 'Přesný předpis pro výběr a tvorbu fotografií / AI vizuálů dle brand manuálu (světlo, barevnost, kompozice, autenticita).',
    modelId: 'gpt-o3',
    categoryId: 'brand-identity',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Photo Style', 'Vizuální Jazyk', 'Fotografie', 'Art Direction'],
    authorFeedTip: 'Rychlé vodítko pro photography brief – zakazuje fotobanky a definuje autentické osvětlení.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'bvl-style',
        key: 'brand_art_direction',
        label: 'Směr vizuálního stylu',
        type: 'textarea',
        value: 'Styl: Kinematografická severští architektura, autentické přirozené denní světlo z okna, studené tóny s vřelým lidským prvkem. Zákaz strojených úsměvů z fotobanky a vyumělkovaného studiového svícení.',
        required: true
      }
    ],
    templateString: `<context>
Definuješ směrnice fotografického a vizuálního stylu značky (Art Direction Guidelines).
Art Direction:
{{brand_art_direction}}
</context>

<task>
Sestav reprezentativní příručku pro fotografy a AI prompt inženýry:
1. Světelné schéma a barevná gradace (Color Grading & Lighting).
2. Kompozice a práce s hloubkou ostrosti (Depth of Field).
3. Pravidla pro lidský prvek (Autenticita, mikro-gesta, reálné prostředí).
4. Promptovací šablona pro Midjourney / Nano Banana splňující tento styl.
</task>`
  },

  {
    id: 'brand-ui-components-ci-alignment',
    title: 'Brand & CI: Založení Knihovny Základních UI Komponent dle CI',
    description: 'Převod pravidel CI do specifikace základních UI prvků (tlačítka, karty, inputy, dialogy, navigace) se zachováním vizuální DNA značky.',
    modelId: 'cursor',
    categoryId: 'brand-identity',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'greenfield',
    tags: ['UI Components', 'CI Alignment', 'Design DNA', 'React'],
    authorFeedTip: 'Zaručuje, že všechna tlačítka a formuláře okamžitě vypadají jako součást jediné rodiny.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'bui-dna',
        key: 'brand_ui_dna',
        label: 'Vizuální DNA z CI manuálu',
        type: 'textarea',
        value: 'DNA značky: Čisté 1px hranice, ostré rohy (border-radius: 4px), tmavé monochromatické pozadí, pulzující indikátory stavu a 150ms plynulá odezva na hover.',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ základní knihovnu UI komponent v Reactu a Tailwind CSS v4 na základě CI DNA.
Vizuální DNA:
{{brand_ui_dna}}
</context>

<task>
Vytvoř specifikaci a kód pro základní stavební kameny:
1. Button (Primary, Secondary, Ghost, Danger) se všemi stavy (Hover, Focus, Active, Disabled).
2. Input & Textarea s labely a chybovým stavem.
3. Card & Container s 1px ohraničením a jemným vnitřním stínem.
4. Badge & Tag pro metadata.
</task>`
  },

  {
    id: 'brand-print-and-digital-collateral-spec',
    title: 'Brand & CI: Specifikace Tiskových & Digitálních Formátů (Collateral Grid)',
    description: 'Mřížky a rozvržení pro tiskoviny (vizitky, hlavičkové papíry) a sociální sítě (1:1 / 9:16 / 16:9) s definovanými spady a CMYK/RGB profily.',
    modelId: 'claude-code',
    categoryId: 'brand-identity',
    defaultWorkflow: 'print-prepress-flow',
    defaultPhase: 'greenfield',
    tags: ['Collateral Grid', 'Tisk', 'Social Media', 'Formats'],
    authorFeedTip: 'Definuje přesné rozměry včetně tiskového spadu 3 mm a bezpečné zóny pro texty.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'bcol-formats',
        key: 'target_formats_list',
        label: 'Seznam požadovaných formátů',
        type: 'textarea',
        value: '1. Vizitka standard (90x50 mm, spad 3 mm, CMYK FOGRA39)\n2. Hlavičkový papír A4 (210x297 mm, zóna pro okénko obálky DL)\n3. LinkedIn Banner (1584x396 px, RGB, PNG)\n4. Instagram Story / Post (1080x1920 px & 1080x1080 px)',
        required: true
      }
    ],
    templateString: `<context>
Připravuješ technickou specifikaci mřížek pro produkci firemních tiskovin a digitálních bannerů podle CI.
Formáty:
{{target_formats_list}}
</context>

<task>
Sestav produkční kartu pro každý formát:
- Přesné cílové rozměry a rozlišení (DPI / PPI).
- Barevný prostor (CMYK vs RGB) a profil.
- Rozvržení mřížky (Grid, Okraje, Spadávky/Bleed, Bezpečná zóna/Safe zone).
- Umístění loga a typografická velikost.
</task>`
  },

  {
    id: 'brand-qa-compliance-audit',
    title: 'Brand & CI: Audit Shody Podkladů a Komponent s Brand Manuálem',
    description: 'Kontrolní mechanizmus (Compliance Check) pro ověření, zda vytvořený kód, grafický podklad nebo kampaňový materiál dodržuje CI.',
    modelId: 'gpt-o3',
    categoryId: 'brand-identity',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'polish',
    tags: ['Brand Audit', 'Compliance', 'QA Check', 'Brand Standards'],
    authorFeedTip: 'Použijte před schválením nového webu nebo kampaně jako závěrečné síto.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'bqa-item',
        key: 'item_under_audit',
        label: 'Předmět auditu',
        type: 'text',
        value: 'Nová landing page pro produktový launch a kampaňové bannery na LinkedIn',
        required: true
      },
      {
        id: 'bqa-criteria',
        key: 'compliance_criteria',
        label: 'Kritéria shody z brand manuálu',
        type: 'textarea',
        value: '1. Použití schválených barev (Obsidian #09090b + Emerald #10b981).\n2. Správný typografický pair (Geist Sans / Geist Mono).\n3. Ochranná zóna loga a správná varianta.\n4. Dodržení tónu komunikace (věcný, přirozený, bez vaty).\n5. WCAG AAA kontrast textů.',
        required: true
      }
    ],
    templateString: `<context>
Provádíš závěrečný Brand Compliance Audit shody podkladu s Corporate Identity.
Předmět: {{item_under_audit}}
Kritéria shody:
{{compliance_criteria}}
</context>

<task>
Vygeneruj strukturovaný auditní protokol:
1. Hodnocení jednotlivých kritérií (PASS / FAIL / WARNING).
2. Identifikace konkrétních vizuálních nebo textových odchylek.
3. Přesná doporučení k nápravě pro dosažení 100% shody s brand manuálem.
</task>`
  }
];
