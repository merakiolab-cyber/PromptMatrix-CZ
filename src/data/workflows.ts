import { WorkflowTargetDefinition, ProjectPhaseDefinition } from '../types';

export const WORKFLOW_TARGETS: WorkflowTargetDefinition[] = [
  // Figma & MCP Integrace (Claude Code / Cursor)
  {
    id: 'figma-mcp-claudecode',
    name: 'Figma MCP Server + Claude Code Pro (Live Sync)',
    shortName: 'Figma MCP + Claude',
    category: 'Figma & Vektory',
    description: 'Propojení Claude Code přes Model Context Protocol (MCP) s Figmou: čtení frame stromu, design proměnných, extrakce stylů a generování kódu.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Figma MCP (Model Context Protocol) & Claude Code Pro. Dotazuj Figma MCP server pro přesné node parametry (Auto-layout, spacing, color variables, typography). Převeď Figma stromy přímo na deterministický React + Tailwind/CSS kód se 100% věrností designu.'
  },
  {
    id: 'svg-vector-gen',
    name: 'Generování čistého SVG pro Figma & Illustrator',
    shortName: 'Čisté SVG (Figma/AI)',
    category: 'Figma & Vektory',
    description: 'Generování SVG vektorů: sémantické ID vrstev <g id="...">, přesné bezierové křivky, editovatelné fill/stroke a čistý viewBox pro import do Figmy i Illustratoru.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Vektorový SVG formát pro import do Figma & Adobe Illustrator. Vždy nastav explicitní viewBox="0 0 W H", organizuj grafiku do sémantických skupin s ID (<g id="layer_name">), používej čisté bezierové cesty (<path d="...">), zachovej editovatelnost křivek a vyvaruj se zbytečného smetí a bitmapových embedů.'
  },
  {
    id: 'svg-icon-system',
    name: 'SVG Ikonový Systém & Design Tokeny (24x24 Grid)',
    shortName: 'SVG Ikony & Grid',
    category: 'Figma & Vektory',
    description: 'Tvorba uceleného setu ikon na pixelovém rastru (24x24 / 20x20), stroke-width 1.5/2px, currentColor a export pro Figmu.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: SVG Ikonový systém. Všechny ikony musí sedět na pixel-perfect gridu (standard 24x24 px), používat stroke="currentColor", stroke-width="1.5" nebo "2", stroke-linecap="round", stroke-linejoin="round" a fill="none" pro snadnou změnu barev ve Figmě i kódu.'
  },

  // Web & Kód
  {
    id: 'web-frontend',
    name: 'Frontend Web & UI Komponenty (React / Tailwind)',
    shortName: 'React & Tailwind',
    category: 'Web & UI',
    description: 'Tvorba moderních frontend komponent, React 19 hooks, Tailwind CSS v4 a přístupných layoutů.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Frontend Web (React 19, TypeScript, Tailwind CSS v4). Kód musí být okamžitě integrovatelný do komponentového stromu s WCAG AA přístupností.'
  },
  {
    id: 'fullstack-api',
    name: 'Fullstack & Backend API (Node / Express / Hono)',
    shortName: 'Backend & API',
    category: 'Web & UI',
    description: 'REST API, SSE streaming, serverové handlery a bezpečné zpracování dat.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Backend API endpointy (TypeScript, Express/Hono). Implementuj striktní validaci vstupů, typované schémata a error boundary ošetření.'
  },
  {
    id: 'threejs-webgl',
    name: '3D WebGL, Three.js & GLSL Shadery',
    shortName: 'Three.js & WebGL',
    category: 'Web & UI',
    description: 'Interaktivní 3D scény v prohlížeči, camera controls, materiály a post-processing.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Three.js / WebGL canvas. Vytvoř optimalizovaný render loop (requestAnimationFrame), spravuj paměť (geometry/material dispose) a ošetři resize okna.'
  },

  // Správa Disku, Repozitáře & CLI
  {
    id: 'local-filesystem-ops',
    name: 'Interní správa složek, přesouvání a přejmenování (Claude CLI)',
    shortName: 'Složky & Soubory',
    category: 'Disk & Komunikace',
    description: 'Dávkové přejmenování souborů dle konvencí, třídění exportů do podsložek, detekce duplicit a bezpečné přesuny v terminálu.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Lokální filesystem & Bash / Node skriptování v Claude Code CLI. Vždy nejprve zobraz seznam dotčených souborů (dry-run plán), ověř existenci cílových složek před přesunem, ošetři diakritiku a mezery v názvech a zajisti bezpečnost proti nechtěnému přepsání (použij flagy proti kolizi).'
  },
  {
    id: 'business-email-ops',
    name: 'Klientské maily, nabídky & scoping (Přirozený & Věcný tón)',
    shortName: 'Klientské Maily',
    category: 'Disk & Komunikace',
    description: 'Tonalita: Profesionální, přátelská, přirozená, stručná bez prázdných frází, věcná, přímá a upřímná (muž 44 let, Čech, otec, spolehlivý partner).',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ & TONALITA: Klientská komunikace zkušeného seniorního partnera (muž, 44 let, Čech, otec, spolehlivý profesionál). Tón: Profesionální, přátelský, přirozený, stručný, věcný, přímý a upřímný bez korporátního balastu a strojených frází ("Doufám, že Vás tento e-mail zastihne..."). Piš s klidným sebevědomím, lidským nadhledem, jasně definuj dohody, milníky a termíny.'
  },
  {
    id: 'ui-localization-ops',
    name: 'Překlady UI/UX, lokalizační JSONy & terminologické glosáře',
    shortName: 'Překlady & Glosáře',
    category: 'Disk & Komunikace',
    description: 'Překlady webů, aplikací a dokumentace mezi CZ/EN/DE se zachováním ICU formátování, proměnných {count} a ustáleného designového glosáře.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: UI/UX Lokalizace a překlady (i18n). Přísně zachovej všechny zástupné symboly ({name}, %s, XML tagy), dodržuj přirozenou terminologii v daném jazyce bez doslovného překladu a respektuj délkové limity pro tlačítka a dialogy.'
  },
  {
    id: 'repo-filesystem',
    name: 'Správa repozitáře & Úprava složek na disku',
    shortName: 'Disk & Repozitář',
    category: 'Architektura & CLI',
    description: 'Autonomní práce se složkami, přesuny souborů, npm konfigurace a refaktoring struktury.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Autonomní práce s lokálním repozitářem na disku. Před úpravami zkontroluj strukturu adresářů, respektuj existující package.json a používej minimální chirurgické diffy.'
  },
  {
    id: 'git-cicd',
    name: 'Git Workflow, CI/CD Pipeline & GitHub Actions',
    shortName: 'Git & CI/CD',
    category: 'Architektura & CLI',
    description: 'Automatické testy, lintery, Conventional Commits a release automatizace.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Git & CI/CD automatizace. Vytvářej atomické commity dle Conventional Commits standardu a robustní GitHub Actions workflow.'
  },

  // 3D & Procedurální Modelování
  {
    id: 'blender-script',
    name: 'Skript pro Blender 3D (Python bpy & bmesh)',
    shortName: 'Blender bpy Skript',
    category: '3D & Blender',
    description: 'Generování procedurálních 3D modelů, shaderů a operátorů s podporou Undo.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Blender 4.x / 5.0 Python API (bpy + bmesh). Používej výhradně bmesh pro manipulaci s vertex/face geometrií, ošetři kontext aktivního módu a implementuj podporu pro Undo.'
  },
  {
    id: 'blender-gn',
    name: 'Blender Geometry Nodes (Parametrický Strom Uzlů)',
    shortName: 'Blender Geometry Nodes',
    category: '3D & Blender',
    description: 'Vektorová matematika, křivkové deformace, raycast a instancování bodů.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Blender Geometry Nodes strom uzlů. Propojuj uzly s přesnými datovými typy socketů a vyveď klíčové proměnné do Group Input modifikátoru.'
  },

  // Adobe Creative Suite
  {
    id: 'photoshop-uxp',
    name: 'Photoshop UXP (Moderní JavaScript API & batchPlay)',
    shortName: 'Photoshop UXP',
    category: 'Adobe Suite',
    description: 'Moderní Photoshop UXP DOM skripty, dávkové úpravy vrstev, masky a exporty.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Adobe Photoshop Modern UXP API. Zabal operace do executeAsModal() a suspendHistory wrapperů pro zachování stability dokumentu.'
  },
  {
    id: 'indesign-extendscript',
    name: 'InDesign DTP & Sazba Publikací (ExtendScript)',
    shortName: 'InDesign Sazba',
    category: 'Adobe Suite',
    description: 'Automatické generování stránek, odstavcových stylů, rámečků a tiskových archů.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Adobe InDesign ExtendScript / DOM. Nastav explicitní jednotky (Points / Millimeters), aplikuj pojmenované odstavcové/znakové styly a validuj tiskové spady (bleed).'
  },
  {
    id: 'illustrator-script',
    name: 'Illustrator Vektorový Scripting (.jsx & SVG export)',
    shortName: 'Illustrator Script',
    category: 'Adobe Suite',
    description: 'Přesné beziérové křivky, generování mřížek, vzorníků a dávkový SVG export.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Adobe Illustrator Scripting. Vytvářej přesné vektorové cesty přes pathItems, spravuj vrstvy a barvy v režimu CMYK/RGB.'
  },
  {
    id: 'aftereffects-motion',
    name: 'After Effects Výrazy (Expressions) & Motion Rigging',
    shortName: 'After Effects Expressions',
    category: 'Motion Design',
    description: 'Matematické animace, elastic overshoot, plynulé interpolace a slider vazby.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Adobe After Effects Expression Engine. Používej bezpečné matematické funkce ease(), linear() a clamp(). Vždy ošetři situaci před prvním klíčovým snímkem (time < key(1).time).'
  },
  {
    id: 'video-davinci-premiere',
    name: 'Střihové Nástroje: Premiere Pro & DaVinci Resolve',
    shortName: 'Střih Premiere/DaVinci',
    category: 'Video & Audio',
    description: 'Automatizace střihu, EDL/XML konformace, MOGRT templaty a barevné korekce.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Video Post-produkce (Premiere Pro / DaVinci Resolve Scripting API). Dodržuj standardní framerate (24/25/60 fps), audio normalizaci a barevné prostory Rec.709/ACES.'
  },

  // Figma & Design Systémy
  {
    id: 'figma-tokens',
    name: 'Figma Design Tokeny & W3C Token Schema',
    shortName: 'Figma Tokeny',
    category: 'Design Systém',
    description: 'Definice proměnných, barevných módů (Light/Dark), typografické škály a token JSONů.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Figma Design Tokens (W3C Community Group specifikace). Definuj tokeny v čistém hierarchickém JSONu s oddělením Global vs Alias/Semantic vs Component úrovní.'
  },
  {
    id: 'figma-plugin',
    name: 'Figma Plugin API & REST Automatizace',
    shortName: 'Figma Plugin API',
    category: 'Design Systém',
    description: 'Tvorba vlastních Figma pluginů v TypeScriptu pro generování a manipulaci s uzly.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Figma Plugin API (figma.currentPage.selection). Respektuj asynchronous node loading (figma.loadFontAsync) a vytvoř přehledné UI v iframe.'
  },

  // Produkce, Grafika & AI
  {
    id: 'asset-pipeline',
    name: 'Dávkový export assetů & Prepress Automatizace',
    shortName: 'Asset Pipeline',
    category: 'Produkce & AI',
    description: 'Automatizace přípravy WebP, AVIF, SVG ikon a optimalizovaných grafických podkladů.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Asset Pipeline & Prepress Automation. Zajisti bezeztrátovou kompresi, čisté SVG viewBoxy bez redundantních metadat a správné barevné profily.'
  },
  {
    id: 'midjourney-generator',
    name: 'Midjourney & Nano Banana Image Prompting',
    shortName: 'Generátor Vizuálů',
    category: 'Produkce & AI',
    description: 'Fotografická optika, filmové svícení, textury a přepínače parametrů (--ar, --v, --s).',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Midjourney v6.1 / Nano Banana Image. Specifikuj přesný objektiv, fotoaparát, světelné podmínky, hmatatelné materiály a na konec doplň validní parametry formátu.'
  },
  {
    id: 'sound-sfx',
    name: 'Sound Design & Audio Prompting (SFX & UI Sounds)',
    shortName: 'Sound Design',
    category: 'Video & Audio',
    description: 'Návrh mikro-zvuků (click, pop, swoosh), UI odezvy, generování atmosfér a frekvenční spektra.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Sound Design & UI Audio Assets. Popisuj prostorovou akustiku, dynamiku, frekvenční rozsah (Hz) a délku trvání (ms).'
  },
  {
    id: 'tech-documentation',
    name: 'Technická Dokumentace & PRD Architektura',
    shortName: 'PRD & Dokumentace',
    category: 'Architektura & CLI',
    description: 'Produktové specifikace, OpenAPI kontrakty, ADR rozhodnutí a uživatelské scénáře.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: Technická a Architektonická Dokumentace. Piš věcně a rigorózně: definuj cíle, datové rozhraní (TypeScript), hraniční stavy a akceptační kritéria v Gherkin syntaxi.'
  },
  {
    id: 'print-prepress-flow',
    name: 'DTP Prepress & Tiskový Workflow (CMYK / Ořez)',
    shortName: 'Prepress & Tisk',
    category: 'Produkce & AI',
    description: 'Ověření tiskových podkladů, 300 DPI, přetisk černé (Overprint), spady a výsekové linky.',
    ruleDirective: 'CÍLOVÉ PROSTŘEDÍ: DTP Tisková Příprava (Prepress). Všechny podklady v CMYK s přímými barvami (Pantone), limit krytí TIC max 300% a export do PDF/X standardu.'
  }
];

export const PROJECT_PHASES: ProjectPhaseDefinition[] = [
  {
    id: 'greenfield',
    name: '1. Začátek od nuly (Zelená louka)',
    badge: 'Od nuly / Greenfield',
    description: 'Projekt začíná od základu. Navrhni čistou architekturu, definuj souborovou strukturu a ustav základní stavební kameny.',
    directiveSnippet: 'FÁZE PROJEKTU: Začínáme od nuly (Greenfield). Vytvoř kompletní čistou architekturu, definuj strukturu souborů a zajisti, že všechny základní komponenty mají pevné základy bez technického dluhu.'
  },
  {
    id: 'iteration',
    name: '2. Pokračování / Refaktoring existujícího kódu',
    badge: 'Pokračování / Iterace',
    description: 'Práce na rozpracovaném projektu. Respektuj existující konvence, neprováděj zbytečné destrukce a použij minimální diff.',
    directiveSnippet: 'FÁZE PROJEKTU: Pokračování na existujícím projektu. Respektuj stávající konvence a souborovou strukturu. Proveď pouze potřebné chirurgické změny a zachovej 100% zpětnou kompatibilitu.'
  },
  {
    id: 'polish',
    name: '3. Finální ladění, Polish & Mikro-interakce',
    badge: 'Polish & Ladění',
    description: 'Projekt je funkční, teď ladíme detaily: plynulé animace, vizuální odezvy, typografické zarovnání a 4K zobrazení.',
    directiveSnippet: 'FÁZE PROJEKTU: Finální ladění a polish. Zaměř se na perfektní vizuální mikro-interakce, haptickou odezvu, plynulé přechody (150-200ms), zarovnání na 4K displejích a odstranění jakéhokoliv vizuálního kazu.'
  },
  {
    id: 'ship',
    name: '4. Produkční nasazení, Prepress & Push na Cloud',
    badge: 'Push na Cloud / Prepress',
    description: 'Finální odevzdání. Build optimalizace, tiskové PDF profily, kontrola lintu, git commity a deployment pipeline.',
    directiveSnippet: 'FÁZE PROJEKTU: Produkční nasazení a odevzdání. Zkontroluj lint a build, odstraň debug logy, připrav tisková tisková data / produkční balíček a vytvoř čistý Conventional Git commit pro push.'
  }
];
