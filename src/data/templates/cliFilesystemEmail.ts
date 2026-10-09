import { PromptTemplate } from '../../types';

export const CLI_FILESYSTEM_EMAIL_TEMPLATES: PromptTemplate[] = [
  {
    id: 'claude-cli-batch-rename-slug',
    title: 'Claude Code CLI: Dávkové přejmenování & normalizace souborů (Kebab-Case)',
    description: 'Přejmenování desítek souborů v lokální složce: odstranění diakritiky, nahrazení mezer pomlčkami, přidání prefixu a ošetření kolizí.',
    modelId: 'claude-code',
    categoryId: 'cli-filesystem-email',
    defaultWorkflow: 'local-filesystem-ops',
    defaultPhase: 'iteration',
    tags: ['CLI', 'Filesystem', 'Přejmenování', 'Kebab-Case', 'Bash'],
    authorFeedTip: 'Vždy si nechte vypsat dry-run plán před samotným spuštěním operace.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'cbr-path',
        key: 'folder_path',
        label: 'Cesta ke složce se soubory',
        placeholder: './public/assets/exports/',
        type: 'text',
        value: './public/assets/exports/',
        required: true
      },
      {
        id: 'cbr-rules',
        key: 'rename_rules',
        label: 'Pravidla pro nové názvy',
        type: 'textarea',
        value: '1. Všechna písmena malá (lowercase).\n2. Odstranit českou diakritiku (ěščřžýáíé -> escrzyaye).\n3. Nahradit mezery a podtržítka jednoduchou pomlčkou (-).\n4. Prefix: "asset-2026-" před původní název.\n5. Ponechat příponu souboru (.png, .webp, .svg).',
        required: true
      }
    ],
    templateString: `<context>
Pracuješ jako autonomní CLI inženýr s přístupem k lokálnímu disku.
Cílová složka: {{folder_path}}
</context>

<task>
1. Prozkoumej obsah složky {{folder_path}}.
2. Navrhni plán přejmenování podle těchto pravidel:
{{rename_rules}}

3. Vypiš přehlednou tabulku: [Původní název] -> [Nový název].
4. Připrav bezpečný skript v Bash / Node.js, který operaci provede a ošetří existenci souborů proti nechtěnému přepsání.
</task>

<constraints>
- Nepřepisuj soubory bez explicitního upozornění na kolizi názvů.
- Escapuj názvy souborů obsahující mezery a speciální znaky.
</constraints>`
  },

  {
    id: 'claude-cli-sort-by-extension-project',
    title: 'Claude Code CLI: Třídění souborů do strukturovaných podsložek',
    description: 'Automatické roztřídění stažených exportů, zdrojových souborů (.psd, .ai, .fig) a finálních renderů do přísné složkové struktury.',
    modelId: 'claude-code',
    categoryId: 'cli-filesystem-email',
    defaultWorkflow: 'local-filesystem-ops',
    defaultPhase: 'greenfield',
    tags: ['CLI', 'Filesystem', 'Třídění', 'Organizace'],
    authorFeedTip: 'Perfektní pro úklid složky Downloads nebo exportních složek po ukončení projektu.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'cs-root',
        key: 'source_folder',
        label: 'Zdrojová složka k roztřídění',
        placeholder: '~/Downloads/Project-Deliverables',
        type: 'text',
        value: './project-incoming-assets/',
        required: true
      },
      {
        id: 'cs-schema',
        key: 'folder_schema',
        label: 'Cílová struktura podsložek',
        type: 'textarea',
        value: '- 01_vector_sources/ (.ai, .eps, .fig, .svg)\n- 02_bitmap_masters/ (.psd, .tiff, .raw, .cr3)\n- 03_web_optimized/ (.webp, .avif, .png, .jpg)\n- 04_documents/ (.pdf, .docx, .xlsx)\n- 05_video_motion/ (.mp4, .mov, .aep)',
        required: true
      }
    ],
    templateString: `<context>
Reorganizuješ soubory na disku.
Zdroj: {{source_folder}}
</context>

<task>
1. Zanalyzuj přípony a typy souborů v {{source_folder}}.
2. Vytvoř cílové složky:
{{folder_schema}}
3. Přesuň soubory do příslušných podsložek a vypiš závěrečný report o počtu přesunutých položek.
</task>`
  },

  {
    id: 'claude-cli-find-replace-regex',
    title: 'Claude Code CLI: Rekurzivní Regex náhrada v celém projektu',
    description: 'Hromadná náhrada starého názvu značky, importních cest (@/components/old) nebo hex barev ve všech zdrojových souborech s kontrolou.',
    modelId: 'claude-code',
    categoryId: 'cli-filesystem-email',
    defaultWorkflow: 'local-filesystem-ops',
    defaultPhase: 'iteration',
    tags: ['CLI', 'Regex', 'Refaktoring', 'Hromadná Náhrada'],
    authorFeedTip: 'Využijte git diff po spuštění pro okamžitou verifikaci každého změněného řádku.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'cfr-pattern',
        key: 'search_and_replace_pattern',
        label: 'Hledaný a nový řetězec / Regex',
        type: 'textarea',
        value: 'Hledat: "from \'@/legacy/ui\'" -> Nahradit: "from \'@/components/ui\'"\nHledat hex barvu: "#18181b" -> Nahradit: "#09090b"',
        required: true
      },
      {
        id: 'cfr-glob',
        key: 'file_filter',
        label: 'Filtrování souborů (Glob)',
        type: 'text',
        value: 'src/**/*.{ts,tsx,css}',
        required: true
      }
    ],
    templateString: `<context>
Provádíš přesnou hromadnou náhradu v kódovém repozitáři.
Maskování souborů: {{file_filter}}
Pravidla náhrady:
{{search_and_replace_pattern}}
</context>

<task>
1. Najdi všechny výskyty zadaného vzoru v souborech {{file_filter}}.
2. Zobraz výpis zasažených souborů a řádků.
3. Proveď přesnou chirurgickou náhradu bez poškození okolního kódu.
4. Ověř syntaktickou správnost po změně.
</task>`
  },

  {
    id: 'claude-client-project-proposal-email',
    title: 'Claude Code: Cenová nabídka & scoping pro klienta (Přirozený & Věcný tón)',
    description: 'Strukturovaný klientský e-mail s nabídkou, rozpadem milníků, termíny a rozpočtem psaný přirozeným, věcným a lidským hlasem seniorního partnera.',
    modelId: 'claude-code',
    categoryId: 'cli-filesystem-email',
    defaultWorkflow: 'business-email-ops',
    defaultPhase: 'greenfield',
    tags: ['Business Mail', 'Nabídka', 'Scoping', 'Cenotvorba', 'Komunikace'],
    authorFeedTip: 'Věcná, přímá komunikace zkušeného partnera – bez zbytečných frází, jasná dohoda a termíny.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'prop-client',
        key: 'client_and_project',
        label: 'Klient a typ projektu',
        placeholder: 'Fintech startup - Kompletní redesign webu a design systém',
        type: 'text',
        value: 'Technologická společnost (SaaS) - Redesign webu, UI/UX aplikace a tvorba design systému',
        required: true
      },
      {
        id: 'prop-phases',
        key: 'project_phases_and_pricing',
        label: 'Fáze, termíny a cenový rozsah',
        type: 'textarea',
        value: '- Fáze 1: Analýza, UX wireframy a interaktivní prototyp (2 týdny, 45 000 Kč)\n- Fáze 2: UI Design, design systém tokeny a Figma komponenty (3 týdny, 70 000 Kč)\n- Fáze 3: Frontend implementace v Reactu a testování (3 týdny, 65 000 Kč)\n- Platební podmínky: 40% záloha, zbytek po schválení jednotlivých milníků.',
        required: true
      },
      {
        id: 'prop-persona',
        key: 'tonality_persona',
        label: 'Tonalita & Persona autora',
        type: 'textarea',
        value: 'Autor: Muž 44 let, Čech, otec, spolehlivý seniorní partner.\nTón: Profesionální, přátelský, přirozený, stručný, bez korporátních frází a vaty, věcný, přímý, upřímný, klidné sebevědomí a pragmatický pohled.',
        required: true
      }
    ],
    templateString: `<context>
Píšeš klientskou nabídku pro projekt: {{client_and_project}}.

PROFIL AUTORA A TONALITA:
{{tonality_persona}}
</context>

<task>
Sestav reprezentativní e-mail s nabídkou:
1. Pozdrav a stručné shrnutí jádra zadání a naší vize řešení.
2. Přehledný rozpad fází a termínů:
{{project_phases_and_pricing}}
3. Jasné vymezení rozsahu (co je součástí a co je mimo scope).
4. Konkrétní další krok: termín pro potvrzení a návrh krátkého callu pro sladění detailů.
</task>

<constraints>
- PŘÍSNÝ ZÁKAZ prázdného korporátního klišé ("Doufám, že Vás tento e-mail zastihne v dobré náladě", "Jsme nadšeni touto příležitostí", "Dovolte mi představit...").
- Piš jako zkušený dospělý profesionál, který si váží času klienta i svého: srozumitelně, přímo, lidsky a s jistotou.
</constraints>`
  },

  {
    id: 'claude-client-feedback-diplomacy-email',
    title: 'Claude Code: Diplomatická reakce na klientský feedback & Scope Creep',
    description: 'Klidná, věcná a lidská odpověď na rozšíření zadání od klienta s vysvětlením dopadů na termíny a návrhem férových variant.',
    modelId: 'claude-code',
    categoryId: 'cli-filesystem-email',
    defaultWorkflow: 'business-email-ops',
    defaultPhase: 'iteration',
    tags: ['Business Mail', 'Scope Creep', 'Diplomacie', 'Klientský Feedback'],
    authorFeedTip: 'Partnerský přístup: neříkáme "to nejde", ale "rádi to uděláme za těchto férových podmínek".',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'cf-situation',
        key: 'feedback_situation',
        label: 'Popis situace / požadavek klienta',
        placeholder: 'Klient požaduje přidání kompletního e-shop modulu těsně před spuštěním webu',
        type: 'textarea',
        value: 'Klient po odevzdání finálního UI designu požaduje kompletní přepracování informační architektury a přidání 4 nových podstránek, což přesahuje původní dohodnutý rozsah.',
        required: true
      },
      {
        id: 'cf-solution',
        key: 'proposed_solution',
        label: 'Navrhované řešení & podmínky',
        type: 'textarea',
        value: '- Varianta A: Dokončit a spustit současný schválený rozsah v plánovaném termínu a nové podstránky zařadit do Fáze 2 po spuštění.\n- Varianta B: Zahrnout změny ihned s dodatkem ke smlouvě (+40 hodin a posun termínu o 10 pracovních dní).',
        required: true
      },
      {
        id: 'cf-persona',
        key: 'author_profile',
        label: 'Persona autora',
        type: 'textarea',
        value: 'Muž 44 let, zkušený spolehlivý partner. Tón: Klidný, přímý, přátelský, bez defenzivy a emocí, hledající oboustranně férové řešení.',
        required: true
      }
    ],
    templateString: `<context>
Řešíš změnu rozsahu (scope creep) a komunikaci s klientem.
Situace: {{feedback_situation}}
Persona: {{author_profile}}
</context>

<task>
Napiš diplomatickou, přirozenou a upřímnou odpověď klientovi:
1. Klidně a lidsky reaguj na jeho nové nápady.
2. Věcně vysvětli dopad na termín spuštění a stávající rozpočet.
3. Nabídni 2 jasné a férové možnosti postupu:
{{proposed_solution}}
4. Navrhni krátký hovor pro rychlou dohodu.
</task>

<constraints>
- Žádný naštvaný podtón, ale ani přehnaná podbízivost. Čisté partnerské jednání na rovinu.
</constraints>`
  },

  {
    id: 'claude-client-project-handover-email',
    title: 'Claude Code: E-mail pro finální předání projektu & podkladů',
    description: 'Strukturovaný předávací e-mail se všemi přístupy, odkazy na Figma knihovnu, exporty, zdrojové kódy a instrukcemi pro spuštění.',
    modelId: 'claude-code',
    categoryId: 'cli-filesystem-email',
    defaultWorkflow: 'business-email-ops',
    defaultPhase: 'ship',
    tags: ['Předání', 'Handover', 'Dokumentace', 'Klient'],
    authorFeedTip: 'Zajišťuje hladké uzavření projektu a potvrzení finální fakturace.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'cph-project',
        key: 'project_title',
        label: 'Název projektu',
        type: 'text',
        value: 'Redesign klientského portálu a mobilní webové aplikace',
        required: true
      },
      {
        id: 'cph-links',
        key: 'deliverables_links',
        label: 'Odkazy a předávané položky',
        type: 'textarea',
        value: '- Figma Master soubor (odkaz s právy správce)\n- GitHub repozitář s produkčním kódem a CI/CD pipeline\n- Balíček tiskových a webových assetů na cloudu\n- Závěrečná technická a uživatelská dokumentace',
        required: true
      }
    ],
    templateString: `<context>
Předáváš dokončený projekt: {{project_title}}.
Předávané položky:
{{deliverables_links}}
Persona: Muž 44 let, spolehlivý partner, věcný, přátelský a přirozený tón.
</context>

<task>
Napiš vřelý, přirozený a profesionální předávací e-mail pro klienta. Poděkuj za skvělou spolupráci a stručně shrň, co je kde uloženo a jak pokračovat dál.
</task>`
  },

  {
    id: 'claude-invoice-hours-breakdown-email',
    title: 'Claude Code: E-mail s vyúčtováním odpracovaných hodin a fakturou',
    description: 'Strukturovaný doprovodný e-mail k faktuře s detailním rozpisem prací, odvedenou hodnotou a platebními údaji.',
    modelId: 'claude-code',
    categoryId: 'cli-filesystem-email',
    defaultWorkflow: 'business-email-ops',
    defaultPhase: 'ship',
    tags: ['Fakturace', 'Vyúčtování', 'Maily', 'Finance'],
    authorFeedTip: 'Uvádějte QR kód pro platbu a stručné shrnutí dokončených úkolů.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'cih-data',
        key: 'invoice_details',
        label: 'Detaily faktury a položky',
        type: 'textarea',
        value: 'Číslo faktury: 2026042\nČástka: 48 000 Kč bez DPH\nSplatnost: 14 dní\nPoložky: 24h UI/UX design nového modulu, 12h Figma MCP synchronizace a frontend integrace.',
        required: true
      }
    ],
    templateString: `<context>
Odesíláš fakturu s rozpisem odvedené práce.
Podklady: {{invoice_details}}
Tón: Věcný, přirozený, profesionální (muž 44 let, Čech, spolehlivý partner).
</context>

<task>
Napiš přehledný a stručný e-mail klientovi s přiloženou fakturou a rozpisem.
</task>`
  },

  {
    id: 'claude-ui-localization-cz-en-glossary',
    title: 'Claude Code: Precizní překlad UI textů & Glosář (CZ ↔ EN)',
    description: 'Lokalizace tlačítek, chybových hlášek, dialogů a marketingových textů s dodržením designérského glosáře a proměnných.',
    modelId: 'claude-code',
    categoryId: 'cli-filesystem-email',
    defaultWorkflow: 'ui-localization-ops',
    defaultPhase: 'iteration',
    tags: ['Lokalizace', 'Překlad', 'Glosář', 'UI Texty', 'i18n'],
    authorFeedTip: 'Zajišťuje přirozenou češtinu namísto otrockého strojového překladu (např. "Discard changes" -> "Zahodit změny").',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'loc-source',
        key: 'source_texts_or_json',
        label: 'Zdrojové texty nebo JSON klíče',
        placeholder: '{"save": "Save changes", "delete_confirm": "Are you sure you want to delete {name}?"}',
        type: 'textarea',
        value: '{\n  "auth.sign_in": "Sign in to your account",\n  "dashboard.empty_state": "No projects found. Create your first workspace to get started.",\n  "billing.upgrade_cta": "Upgrade to Pro for unlimited exports",\n  "dialog.discard_warning": "You have unsaved changes in {fileName}. Discard them?"\n}',
        required: true
      },
      {
        id: 'loc-direction',
        key: 'translation_direction_and_glossary',
        label: 'Směr překladu & Závazný glosář',
        type: 'textarea',
        value: '- Směr: Angličtina (EN) -> Čeština (CZ)\n- Workspace: "Pracovní prostor" (nikoli pracoviště)\n- Sign in: "Přihlásit se" (vykat uživateli)\n- Discard: "Zahodit"\n- Unlimited exports: "Neomezený počet exportů"',
        required: true
      }
    ],
    templateString: `<context>
Provádíš odbornou lokalizaci UI/UX rozhraní.
Směr a glosář:
{{translation_direction_and_glossary}}
</context>

<task>
Převeď následující zdrojové texty:
{{source_texts_or_json}}
</task>

<constraints>
- Striktně zachovej všechny programové proměnné jako {fileName}, {count}, %s.
- Zachovej přesnou JSON strukturu a syntaxi klíčů.
- Texty musí být přirozené, srozumitelné a respektovat prostorové limity tlačítek v aplikaci.
</constraints>`
  }
];
