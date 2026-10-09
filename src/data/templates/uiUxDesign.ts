import { PromptTemplate } from '../../types';

export const UI_UX_DESIGN_TEMPLATES: PromptTemplate[] = [
  {
    id: 'ui-ux-design-system-tokens',
    title: 'Figma to Code: Design Tokeny & Typografická Škála (W3C)',
    description: 'Generování architektonického design systému s W3C tokeny, 60-30-10 paletou a čistou typografickou hierarchií pro 4K monitory.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'figma-tokens',
    defaultPhase: 'greenfield',
    tags: ['Design System', 'Tokens', 'Typography', 'Figma'],
    authorFeedTip: 'Inspirace: Radix UI, Vercel Geist Tokens a Apple Human Interface Guidelines.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ds-name',
        key: 'system_name',
        label: 'Název produktu & vizuální charakter',
        type: 'text',
        value: 'Minimalistická analytická konzole s čistě černým plátnem (#000000) a 1px linkami (#222222)',
        required: true
      },
      {
        id: 'ds-scale',
        key: 'typography_and_colors',
        label: 'Typografie & Barevné úrovně',
        type: 'textarea',
        value: '- Display & Body: Geist Sans (12px, 14px, 16px, 20px, 28px, 36px).\n- Data & Telemetrie: Geist Mono s tabular-nums.\n- Barevná pravidla: 60% plátno (#000000), 30% rámy (#111111, #222222), 10% akcent (bílá #ffffff a jemný emerald #10b981).',
        required: true
      },
      {
        id: 'ds-output',
        key: 'token_format',
        label: 'Výstupní formát tokenů',
        type: 'select',
        options: ['Tailwind CSS v4 @theme proměnné', 'W3C Community Group Design Token JSON', 'CSS Custom Properties (:root)'],
        value: 'Tailwind CSS v4 @theme proměnné',
        required: true
      }
    ],
    templateString: `<context>
Navrhuješ produkční design systém pro: {{system_name}}.
</context>

<task>
Vygeneruj kompletní specifikaci design systémových tokenů a jejich implementaci.
Výstupní formát: {{token_format}}

Předpis typografie a barev:
{{typography_and_colors}}
</task>

<constraints>
- Zero-pill disciplína: nepoužívej kapslové pilulkové obaly pro statická metadata.
- Monochromatický základ se selektivním akcentem.
- Všechny barvy musí splňovat WCAG AAA kontrast pro text na 4K monitorech.
</constraints>`
  },

  {
    id: 'ui-ux-accessible-forms',
    title: 'UI/UX: Přístupné Formuláře & Inline Validace (WCAG AAA)',
    description: 'Kompletní systém formulářových polí s inline validací, plovoucími labely a klávesovou navigací bez layout shiftu.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Forms', 'Accessibility', 'Validation', 'UX'],
    authorFeedTip: 'Důraz na okamžitou vizuální odezvu bez poskakování layoutu při zobrazení chybové hlášky.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'form-type',
        key: 'form_purpose',
        label: 'Účel formuláře',
        type: 'text',
        value: 'Registrační a platební formulář pro B2B SaaS produkt',
        required: true
      },
      {
        id: 'form-fields',
        key: 'required_fields',
        label: 'Seznam polí & validační pravidla',
        type: 'textarea',
        value: '1. Název společnosti (min 2 znaky)\n2. IČO / DIČ s automatickým načtením dat z ARES\n3. E-mail správce účtu\n4. Výběr platební metody (Karta / Bankovní převod)',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ formulář pro: {{form_purpose}}.
</context>

<task>
Vytvoř React komponentu s těmito poli a pravidly:
{{required_fields}}
</task>

<constraints>
- Každý input musí mít explicitní <label htmlFor="..."> a aria-describedby pro chyby.
- Použij react-hook-form a zod schématu.
</constraints>`
  },

  {
    id: 'ui-ux-data-tables-telemetry',
    title: 'UI/UX: Telemetrická Datová Tabulka (Sorting, Filter & 4K)',
    description: 'Širokoúhlá datová tabulka pro 4K monitory s fixním záhlavím, virtuálním scrollováním a exportem do CSV.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Data Table', 'Analytics', 'Virtual Scroll', '4K'],
    authorFeedTip: 'Používejte Geist Mono pro čísla, aby sloupce s částkami perfektně lícovaly pod sebe.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'table-cols',
        key: 'columns_spec',
        label: 'Sloupce tabulky',
        type: 'textarea',
        value: '- ID záznamu (monospaced)\n- Stav (online / pending / error s barevnou tečkou)\n- Klient / Projekt\n- Přenesená data (MB/GB)\n- Latence (ms s barevným gradientem)\n- Akce (Detail / Smazat)',
        required: true
      }
    ],
    templateString: `<context>
Navrhuješ telemetrickou tabulku pro vysoké zatížení.
</context>

<task>
Implementuj tabulku se sloupci:
{{columns_spec}}
</task>`
  },

  {
    id: 'ui-ux-pricing-cards-matrix',
    title: 'UI/UX: Responzivní Pricing Matrix s přepínačem Měsíc/Rok',
    description: 'Konverzní cenová tabulka se zvýrazněným doporučeným tarifem, úsporou při roční platbě a tooltipy u funkcí.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Pricing', 'Conversion', 'SaaS', 'UI'],
    authorFeedTip: 'Zvýrazněte roční slevu (např. -20%) jemným zeleným odznakem u přepínače.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'prc-tiers',
        key: 'pricing_tiers',
        label: 'Cenové tarify a funkce',
        type: 'textarea',
        value: '1. Starter (0 Kč/měsíc) - 3 projekty, komunitní podpora.\n2. Pro (490 Kč/měsíc) - Neomezené projekty, Figma MCP integrace, 4K exporty.\n3. Enterprise (Dohodou) - Vlastní SLA, dedikovaná infrastruktura, SSO.',
        required: true
      }
    ],
    templateString: `<context>
Navrhuješ cenový blok s přepínačem měsíční vs roční fakturace.
Tarify:
{{pricing_tiers}}
</context>

<task>
Vytvoř plně interaktivní komponentu v Reactu s plynulým přepočtem cen při změně roční platby.
</task>`
  },

  {
    id: 'ui-ux-command-palette-cmdk',
    title: 'UI/UX: Rychlé Příkazové Menu (⌘K Command Palette)',
    description: 'Globální klávesově ovládané menu pro rychlé hledání stránek, spouštění akcí a přepínání témat.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Command Palette', '⌘K', 'Klávesnice', 'UX'],
    authorFeedTip: 'Podpora fuzzy vyhledávání a skupin (Navigace, Akce, Projekty).',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'cmd-actions',
        key: 'action_groups',
        label: 'Skupiny příkazů',
        type: 'textarea',
        value: '- Rychlá navigace (Dashboard, Projekty, Skilly, Nastavení)\n- Správa (Vytvořit nový projekt, Exportovat do PDF, Smazat mezipaměť)\n- Zobrazení (Přepnout tmavý/světlý režim, Zvětšit na celou obrazovku)',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ Command Palette (⌘K) komponentu pro desktop i web.
Skupiny příkazů:
{{action_groups}}
</context>`
  },

  {
    id: 'ui-ux-stepper-wizard-onboarding',
    title: 'UI/UX: Vícekrokový Průvodce (Multi-step Onboarding Stepper)',
    description: 'Onboarding průvodce s ukládáním rozpracovaného stavu, indikátorem postupu a možností vrátit se o krok zpět.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Stepper', 'Wizard', 'Onboarding', 'UX'],
    authorFeedTip: 'Zobrazujte jasný indikátor "Krok 2 ze 4 (50%)" v záhlaví.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'stp-steps',
        key: 'steps_definition',
        label: 'Kroky průvodce',
        type: 'textarea',
        value: 'Krok 1: Výběr profilu (Freelancer / Studio / Enterprise)\nKrok 2: Připojení Figma workspace a MCP klíče\nKrok 3: Volba výchozího design systému (Vercel / Tailwind / Custom)\nKrok 4: Potvrzení a vstup do dashboardu',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ vícekrokový onboarding průvodce.
Kroky:
{{steps_definition}}
</context>`
  },

  {
    id: 'ui-ux-toast-notification-center',
    title: 'UI/UX: Notifikační Centrum & Toast Systém (Queue & Dismiss)',
    description: 'Systém vyskakovacích toast zpráv s frontou (queue), odpočtem automatického skrytí, swipe-to-dismiss a zvukovým signálem.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Toast', 'Notifikace', 'Queue', 'UX'],
    authorFeedTip: 'Maximálně 3 současně zobrazené notifikace v pravém dolním rohu.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'tst-types',
        key: 'notification_types',
        label: 'Typy notifikací a stavy',
        type: 'textarea',
        value: '- Success (zelená, auto-dismiss 3s)\n- Error (červená s možností Retry, persistentní dokud uživatel nezavře)\n- Info (neutrální šedá s odkazem)\n- Loading/Progress (spinner s procenty průběhu exportu)',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš globální Toast Provider a Hook (useToast) v Reactu.
Typy notifikací:
{{notification_types}}
</context>`
  },

  {
    id: 'ui-ux-modal-dialog-keyboard',
    title: 'UI/UX: Přístupný Modální Dialog s Focus Trapem (A11y)',
    description: 'Modální okno s automatickým uzamčením fokusu (focus trap), zavřením klávesou Escape a animovaným backdropem.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'polish',
    tags: ['Modal', 'A11y', 'Focus Trap', 'Dialog'],
    authorFeedTip: 'Při otevření modálu uložte předchozí aktivní element a vraťte mu fokus při zavření.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'mdl-content',
        key: 'modal_purpose',
        label: 'Účel a obsah dialogu',
        type: 'text',
        value: 'Destruktivní potvrzovací dialog pro smazání produkční databáze',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ přístupný modální dialog splňující WAI-ARIA Dialog (Modal) vzor.
Obsah: {{modal_purpose}}
</context>`
  },

  {
    id: 'ui-ux-breadcrumbs-hierarchical',
    title: 'UI/UX: Hierarchická Drobečková Navigace (Breadcrumbs)',
    description: 'Drobečková navigace pro hluboké vnořené struktury projektů s automatickým zkracováním dlouhých názvů a rozbalovacím menu.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Breadcrumbs', 'Navigace', 'Informační Architektura'],
    authorFeedTip: 'Využijte sémantické značení <nav aria-label="Breadcrumb"><ol>...',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'brd-depth',
        key: 'hierarchy_depth',
        label: 'Úroveň zanoření a příklad cesty',
        type: 'text',
        value: 'Workspace > Klienti > FinTech Corp > Projekt 2026 > Design Systém > Tlačítka (Aktivní)',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ responzivní komponentu Breadcrumbs.
Struktura: {{hierarchy_depth}}
</context>`
  },

  {
    id: 'ui-ux-dark-light-theme-engine',
    title: 'UI/UX: Bezblikový Theme Engine (Light / Dark / System)',
    description: 'Přepínač vizuálních témat bez problikávání bílé obrazovky (FOUC) s ukládáním do LocalStorage a synchronizací s OS.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'greenfield',
    tags: ['Theme Engine', 'Dark Mode', 'FOUC', 'Tailwind'],
    authorFeedTip: 'Použijte inline skript v hlavičce <head> pro okamžité nastavení třídy .dark před vykreslením DOM.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'thm-modes',
        key: 'theme_options',
        label: 'Režimy témat',
        type: 'text',
        value: 'Světlý (Zinc 50), Tmavý (Uhlíková #000000), Systémový (automaticky dle OS)',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ robustní Theme Engine pro React a Tailwind CSS v4.
Možnosti: {{theme_options}}
</context>`
  },

  {
    id: 'ui-ux-interactive-segmented-control',
    title: 'UI/UX: Segmentovaný Přepínač s Plovoucím Podsvícením (iOS/macOS)',
    description: 'Přepínač zobrazení (Grid / List / Split) s plynule klouzajícím bílým podsvícením pomocí Motion layoutId.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'polish',
    tags: ['Segmented Control', 'Motion', 'Micro-interactions', 'UI'],
    authorFeedTip: 'Využijte Framer Motion layoutId="activePill" pro plynulý přesun podsvícení mezi záložkami.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'seg-tabs',
        key: 'tabs_list',
        label: 'Seznam záložek přepínače',
        type: 'text',
        value: 'Editor kódu, Živý náhled, Knihovna komponent, Nastavení',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ segmentovaný přepínač s magnetickým podsvícením.
Záložky: {{tabs_list}}
</context>`
  },

  {
    id: 'ui-ux-skeleton-wave-shimmer',
    title: 'UI/UX: Skeleton Loading & Staggered Wave Shimmer',
    description: 'Načítací stavy s animovaným přechodem světla (shimmer), přesně kopírující geometrii finálního obsahu bez layout shiftu.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Skeleton', 'Loading', 'Shimmer', 'UX'],
    authorFeedTip: 'Animujte background-position v CSS gradientu pro maximální výkon na GPU.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'skl-type',
        key: 'component_to_skeleton',
        label: 'Komponenta pro skeleton',
        type: 'text',
        value: 'Uživatelský profil s avatarem, statistikami, grafem a seznamem posledních aktivit',
        required: true
      }
    ],
    templateString: `<context>
Navrhuješ skeleton načítací stav pro: {{component_to_skeleton}}.
</context>`
  }
];
