import { PromptTemplate } from '../../types';

export const FIGMA_MCP_TEMPLATES: PromptTemplate[] = [
  {
    id: 'claude-figma-mcp-frame-to-react',
    title: 'Claude Code + Figma MCP: Převod Node Frame na React & Tailwind',
    description: 'Autonomní načtení Figma stromu přes MCP server (get_file_nodes) a deterministický převod Auto-layoutu, spacingu a design proměnných na čistou React 19 komponentu.',
    modelId: 'claude-code',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'figma-mcp-claudecode',
    defaultPhase: 'iteration',
    tags: ['Figma MCP', 'Claude Code', 'React', 'Auto-Layout', 'Tailwind v4'],
    authorFeedTip: 'Figma MCP protokol umožňuje Claude Code přímo číst geometrii nodů, poloměry zaoblení i proměnné bez manuálního kopírování CSS.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'fm-file-key',
        key: 'figma_file_and_node',
        label: 'Figma File Key a Node ID (nebo URL)',
        placeholder: 'file_key: abc123XYZ, node_id: 104:429 (nebo celá URL)',
        type: 'text',
        value: 'Figma Frame URL nebo Node ID: 104:429 (Dashboard Header & Action Bar)',
        required: true
      },
      {
        id: 'fm-comp-name',
        key: 'component_name',
        label: 'Název cílové React komponenty & souboru',
        placeholder: 'src/components/HeaderNavigation.tsx',
        type: 'text',
        value: 'src/components/HeaderNavigation.tsx (HeaderNavigation)',
        required: true
      },
      {
        id: 'fm-stack-rules',
        key: 'stack_rules',
        label: 'Technologický stack & pravidla stylingu',
        type: 'textarea',
        value: '- React 19 (TypeScript), Tailwind CSS v4 (@import "tailwindcss";).\n- Lucide-react pro ikony (namapuj z Figma vektorových nodů na odpovídající lucide ikonu).\n- 100% zachování Auto-layoutu: Horizontal -> flex-row, Vertical -> flex-col, Space-between -> justify-between.\n- Respektuj definované design tokens / proměnné pro barvy a spacing.',
        required: true
      }
    ],
    templateString: `<context>
Pracuješ jako senior frontend architekt s přímým napojením na Figma MCP server.
Cílová Figma předloha: {{figma_file_and_node}}
Cílová komponenta: {{component_name}}
</context>

<task>
1. Pomocí dostupných nástrojů Figma MCP serveru (např. get_file_nodes / get_node_info) získej přesný strom uzlů, layout vlastnosti, barvy výplní (fills), tahů (strokes), poloměry (cornerRadius) a typografii.
2. Analyzuj hierarchii Auto-layoutu a převeď ji deterministicky do čistého JSX s Tailwind CSS v4 utility třídami.
3. Vytvoř plně typovanou komponentu v TypeScriptu s přehlednými props rozhraními a přístupnými ARIA atributy.

Technická pravidla:
{{stack_rules}}
</task>

<constraints>
- Žádný generický AI boilerplate – kód musí přesně odpovídat pixelovým hodnotám z Figma nodu.
- Namapuj Figma barvy na existující Tailwind tokens nebo CSS proměnné, nevymýšlej náhodné hex kódy.
- Pokud uzel obsahuje ikonu, použij odpovídající komponentu z 'lucide-react'.
</constraints>`
  },

  {
    id: 'claude-figma-mcp-design-audit',
    title: 'Claude Code + Figma MCP: Design QA & Pixel Diff Audit',
    description: 'Porovnání existujícího kódu komponenty s live Figma specifikací přes MCP server, identifikace odchylek v marginu, velikostech a barvách a vygenerování opravného patche.',
    modelId: 'claude-code',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'figma-mcp-claudecode',
    defaultPhase: 'polish',
    tags: ['Figma MCP', 'Design QA', 'Audit', 'Pixel Perfect', 'Claude Code'],
    authorFeedTip: 'Perfektní pro závěrečnou fázi před odevzdáním – Claude porovná kód s Figma daty a opraví drobné vizuální disproporce.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'fqa-file',
        key: 'code_file_path',
        label: 'Cesta k existujícímu souboru komponenty',
        placeholder: 'src/components/Sidebar.tsx',
        type: 'text',
        value: 'src/components/Sidebar.tsx',
        required: true
      },
      {
        id: 'fqa-node',
        key: 'figma_node_target',
        label: 'Figma Node ID nebo Frame pro porovnání',
        placeholder: 'Node ID: 210:852 (Navigation Sidebar)',
        type: 'text',
        value: 'Node ID: 210:852 (Navigation Sidebar Dark Mode)',
        required: true
      },
      {
        id: 'fqa-focus',
        key: 'audit_focus_areas',
        label: 'Oblasti auditu (Spacing, Barvy, Fonty, Hover)',
        type: 'textarea',
        value: '- Spacing & Padding: Zkontrolovat vnitřní odsazení položek menu (px-3 py-2 vs Figma specifikace).\n- Barvy pozadí a ohraničení: Ověřit hex shodu (border-zinc-800 vs Figma stroke).\n- Typografická velikost a váha fontu (12px text-xs vs 13px ve Figmě).\n- Aktivní stavy a hover efekty: Ověřit stavy variant ve Figmě.',
        required: true
      }
    ],
    templateString: `<context>
Provádíš precizní Design QA audit kódu proti Figma předloze.
Kódový soubor: {{code_file_path}}
Figma uzel: {{figma_node_target}}
</context>

<task>
1. Dotazem na Figma MCP server načti specifikaci uzlu {{figma_node_target}} (rozměry, padding, gap, typography, fills).
2. Přečti lokální soubor {{code_file_path}} a porovnej aplikované třídy/styly s Figma specifikací.
3. Zaměř se na tyto oblasti:
{{audit_focus_areas}}

4. Vygeneruj strukturovaný přehled nalezených odchylek (tabulku parametrů: Figma hodnota vs Implementovaná hodnota) a aplikuj minimální chirurgický diff přímo do souboru.
</task>

<constraints>
- Neměň funkční logiku komponenty ani callbacky, uprav výhradně vizuální třídy pro dosažení pixel-perfect shody.
- Zachovej stávající architekturu a TypeScript typy.
</constraints>`
  },

  {
    id: 'svg-vector-gen-illustrator-figma',
    title: 'Claude Code / Cursor: Čistý SVG Generátor pro Illustrator & Figma',
    description: 'Generování komplexního vektorového SVG s pojmenovanými vrstvami (<g id="...">), čistými beziérovými křivkami a editovatelnými barvami připravené pro import do Figmy i Adobe Illustratoru.',
    modelId: 'claude-code',
    categoryId: 'webdesign-apps',
    defaultWorkflow: 'svg-vector-gen',
    defaultPhase: 'greenfield',
    tags: ['SVG', 'Illustrator', 'Figma', 'Bézier', 'Vektory', 'Layer Groups'],
    authorFeedTip: 'Strukturované <g id="..."> skupiny se v Illustratoru a Figmě automaticky načtou jako pojmenované vrstvy, což radikálně urychluje manuální dočištění.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'svg-asset-name',
        key: 'asset_description',
        label: 'Popis požadovaného vektorového motivu / ilustrace',
        placeholder: 'Technologický geometrický monogram / Isometrický server cluster',
        type: 'text',
        value: 'Minimalistický technologický znak (Abstract Cyber Node Matrix) s hexagonální sítí, vnitřními propojkami a pulzujícím jádrem',
        required: true
      },
      {
        id: 'svg-dimensions',
        key: 'canvas_specs',
        label: 'Rozměry plátna & Barevná paleta',
        placeholder: 'viewBox: 0 0 800 600, Barvy: #000000, #ffffff, #10b981...',
        type: 'textarea',
        value: '- viewBox: "0 0 512 512" (čtvercový formát, 1:1).\n- Styl: Precizní technický vektor s čistou geometrií (1px a 1.5px linie).\n- Barevnost: Tmavý režim (pozadí transparentní nebo #09090b, linie #e4e4e7, akcent #10b981 a #3b82f6).\n- Připraveno pro další editaci a animaci ve Figmě i Illustratoru.',
        required: true
      },
      {
        id: 'svg-layers',
        key: 'layer_structure',
        label: 'Struktura vrstev a skupin (<g id="...">)',
        type: 'textarea',
        value: '1. <g id="background_grid"> - jemná mřížka a vodicí linie s nízkou opacitou.\n2. <g id="connecting_paths"> - křivky a bezierové spoje s stroke-dasharray.\n3. <g id="nodes_geometry"> - hexagonální a kruhové uzly.\n4. <g id="core_accent"> - zářící středové jádro s lineárním/radiálním gradientem.\n5. <g id="annotations"> - technické textové popisky (monospaced font).',
        required: true
      }
    ],
    templateString: `<context>
Generuješ čistý, vysoce optimalizovaný vektorový SVG kód připravený pro okamžitý import a další úpravy v Adobe Illustratoru i Figmě.
Motiv: {{asset_description}}
</context>

<task>
Vytvoř kompletní a validní SVG soubor bez zástupných placeholderů splňující tyto parametry:

Specifikace plátna:
{{canvas_specs}}

Hierarchie vrstev:
{{layer_structure}}
</task>

<constraints>
- Všechny vizuální skupiny MUSÍ mít sémantické ID (<g id="layer_name">), aby se v Illustratoru i Figmě zobrazily jako přehledné vrstvy.
- Používej čisté matematicky přesné křivky (<path d="...">, <circle>, <rect>, <polygon>).
- Gradienty definuj uvnitř <defs> s jednoznačnými ID (<linearGradient id="gradient_core">).
- Žádný rastrový/bitmapový base64 odpad (<image>) ani proprietární editor tagy.
- Kód musí být 100% validní samostatný SVG XML kód.
</constraints>`
  },

  {
    id: 'svg-icon-set-24px-grid',
    title: 'Cursor & Claude Code: SVG Ikonový Systém (24x24 Pixel Grid)',
    description: 'Generování ucelené sady vektorových ikon na přísném 24x24 px pixelovém rastru s jednotnou tloušťkou tahu, currentColor a skupinami pro Figma Component Set.',
    modelId: 'cursor',
    categoryId: 'ui-ux-design',
    defaultWorkflow: 'svg-icon-system',
    defaultPhase: 'greenfield',
    tags: ['Ikony', 'SVG', '24x24 Grid', 'Figma', 'Pixel Perfect'],
    authorFeedTip: 'Použití currentColor a stroke-linecap="round" zaručuje okamžitou kompatibilitu s Figma Color Variables i React komponentami.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'icon-list',
        key: 'icons_to_generate',
        label: 'Seznam požadovaných ikon v sadě',
        placeholder: 'dashboard, cpu-chip, workflow-branch, terminal, database-shield',
        type: 'textarea',
        value: '1. server-cluster (skupina propojených serverových nodů)\n2. ai-sparkle-matrix (geometrická technologická hvězda se 4 paprsky)\n3. git-merge-clean (čisté větvení a spojení větví)\n4. terminal-cursor-block (konzolový příkazový řádek)\n5. shield-verified (bezpečnostní štít s fajfkou)\n6. database-layers (vrstvená databáze)',
        required: true
      },
      {
        id: 'icon-rules',
        key: 'grid_and_stroke_rules',
        label: 'Pravidla geometrie & tahů',
        type: 'textarea',
        value: '- Mřížka: Přísný viewBox="0 0 24 24", 2px safe padding (aktivní kreslicí plocha 20x20 uvnitř 24x24).\n- Tah: stroke="currentColor", stroke-width="1.5", stroke-linecap="round", stroke-linejoin="round", fill="none".\n- Geometrie: Pixel-perfect přichycení k celým pixelovým souřadnicím.\n- Výstup: Každá ikona jako samostatný <svg> uzel připravený pro Figma komponentu.',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš produkční sadu vektorových ikon pro design systém a webovou aplikaci.
</context>

<task>
Vygeneruj čistý SVG kód pro následující sadu ikon:
{{icons_to_generate}}

Pravidla mřížky a tahů:
{{grid_and_stroke_rules}}
</task>

<constraints>
- Žádné fill tvary namísto tahů (vše na bázi stroke="currentColor" pro snadné přebarvení ve Figmě).
- Každou ikonu zabal do samostatného přehledného bloku s komentářem a názvem.
- 100% soulad s 24x24 mřížkou bez sub-pixel rozmazání na displejích.
</constraints>`
  },

  {
    id: 'claude-figma-mcp-variables-to-w3c',
    title: 'Claude Code + Figma MCP: Extrakce Proměnných a Režimů do W3C Token JSON',
    description: 'Přečtení kolekcí proměnných z Figma souboru přes MCP a transformace do strukturovaného W3C Token JSONu a Tailwind CSS v4 @theme proměnných pro Light & Dark mode.',
    modelId: 'claude-code',
    categoryId: 'ai-workflows',
    defaultWorkflow: 'figma-mcp-claudecode',
    defaultPhase: 'greenfield',
    tags: ['Figma MCP', 'Design Tokens', 'Variables', 'Dark Mode', 'JSON'],
    authorFeedTip: 'Figma Variables obsahují modes (např. Light vs Dark) – prompt instruuje Claude Code k vygenerování čistých aliasů.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'fvar-file',
        key: 'figma_file_id',
        label: 'Figma File ID nebo Název kolekce',
        placeholder: 'file_key: abc123XYZ (Kolekce: Core Tokens & Semantic Colors)',
        type: 'text',
        value: 'Figma File: Design Tokens & Component Variables (Light + Dark modes)',
        required: true
      },
      {
        id: 'fvar-targets',
        key: 'export_targets',
        label: 'Cílové soubory & formáty v repozitáři',
        type: 'textarea',
        value: '1. tokens.json - oficiální W3C Community Group formát ($value, $type, $description).\n2. src/styles/theme.css - Tailwind CSS v4 @theme definice.\n3. src/types/tokens.ts - TypeScript const typy pro bezpečné použití v kódu.',
        required: true
      }
    ],
    templateString: `<context>
Automatizuješ pipeline mezi Figma Variables a kódovým repozitářem přes Figma MCP server.
Figma zdroj: {{figma_file_id}}
</context>

<task>
1. Pomocí Figma MCP serveru načti všechny lokální proměnné (get_local_variables / get_variable_collections).
2. Analyzuj kolekce: Color, Dimension/Spacing, Border-Radius, Typography a jejich Režimy (Modes: Light vs Dark).
3. Vygeneruj výstupní soubory:
{{export_targets}}
</task>

<constraints>
- Zachovej přesnou hierarchii aliasů (např. semantic.color.background.primary -> primitive.color.zinc.950).
- Pro Tailwind v4 použij moderní syntaxi @theme bez nutnosti zastaralého tailwind.config.js.
- Generuj pouze platný JSON a validní CSS.
</constraints>`
  },

  {
    id: 'svg-data-viz-infographic-figma',
    title: 'Claude Code / Cursor: SVG Infografika & Technický Diagram pro Figmu',
    description: 'Vektorové schéma architektury, technický diagram nebo infografika v SVG s přesnými geometrickými uzly, propojkami a hierarchií vrstev pro dočištění ve Figmě.',
    modelId: 'claude-code',
    categoryId: 'webdesign-apps',
    defaultWorkflow: 'svg-vector-gen',
    defaultPhase: 'iteration',
    tags: ['SVG Diagram', 'Infografika', 'Figma', 'Illustrator', 'Architektura'],
    authorFeedTip: 'Využijte sémantické ID vrstev – v Illustratoru stačí rozkliknout skupinu a posunout libovolnou spojnici.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'diag-topic',
        key: 'diagram_subject',
        label: 'Téma a logika diagramu / infografiky',
        placeholder: 'Architektura AI Agenta (Model Context Protocol, Tool Call Pipeline, LLM Core, Context Memory)',
        type: 'text',
        value: 'Architektura moderní Fullstack aplikace s MCP (Client UI -> Claude Code CLI -> MCP Server -> Figma API & Local Filesystem)',
        required: true
      },
      {
        id: 'diag-styling',
        key: 'visual_style',
        label: 'Vizuální styl & Rozměry',
        type: 'textarea',
        value: '- Rozměr: viewBox="0 0 1000 600" (širokoúhlý formát pro prezentace a dokumentaci).\n- Styl: Vercel dark mode estetika (černé plátno #0a0a0a, rámy #27272a, bílé nadpisy, monochromatické ikony).\n- Prvky: Zaoblené obdélníky (rx="8"), propojovací šipky s marker-end, stavové pulzující body a textové bloky v Geist/Inter fontu.',
        required: true
      }
    ],
    templateString: `<context>
Navrhuješ vektorový diagram architektury pro prezentaci a technickou dokumentaci s možností editace ve Figmě / Illustratoru.
Téma: {{diagram_subject}}
</context>

<task>
Vygeneruj kompletní, přehledné a vizuálně ohromující SVG schéma splňující:
{{visual_style}}

Organizace SVG:
- <defs> s filtry pro jemnou záři, lineární gradienty a marker definice šipek (<marker id="arrowhead">).
- Skupiny <g id="nodes">, <g id="connectors">, <g id="labels"> a <g id="badges">.
</task>

<constraints>
- Výstup musí být čistý SVG kód bez externích HTML závislostí.
- Všechny texty musí mít přesné x, y souřadnice, text-anchor="middle" a font-family="system-ui, sans-serif".
</constraints>`
  }
];
