import { ModelDefinition } from '../types';

export const AI_MODELS: ModelDefinition[] = [
  {
    id: 'claude-code',
    name: 'Claude 3.7 Sonnet (Claude Code Pro CLI)',
    shortName: 'Claude Code',
    badge: 'Autonomní CLI Agent',
    description: 'Optimalizováno pro Claude Code CLI, subagenty, git workflows, test-driven refaktoring a XML tagy bez zbytečné vaty.',
    framework: 'Anthropic XML Structural Protocol & Minimal Surgical Diffs',
    defaultExportFormat: 'claudemd',
    recommendedSkills: [
      {
        id: 'claude-xml-tags',
        name: 'Strukturované XML tagy',
        description: 'Vymezí jasné bloky <context>, <task>, <constraints> a <output_format> pro nulovou halucinaci.',
        enabled: true,
        ruleSnippet: 'Všechny instrukce a kontexty čti striktně v XML blocích. Výstup formátuj přehledně podle definovaných sekcí.'
      },
      {
        id: 'claude-minimal-diffs',
        name: 'Chirurgické minimální diffy',
        description: 'Zákaz přepisování celých souborů, pokud stačí změnit jen 5 řádků.',
        enabled: true,
        ruleSnippet: 'Zachovej existující architekturu a styly. Nevyměňuj celé komponenty bezdůvodně; preferuj přesné chirurgické změny s minimálním difem.'
      },
      {
        id: 'claude-anti-slop',
        name: 'Anti-Yapping & Zero Slop',
        description: 'Žádné omluvy, žádné "Certainly, I would be happy to help", rovnou kód a výsledek.',
        enabled: true,
        ruleSnippet: 'Zákaz konverzačního balastu, úvodních frází ("Jistě, zde je..."), omluv a rekapitulace zadaných pravidel. Začni přímo exekucí.'
      },
      {
        id: 'claude-test-driven',
        name: 'Test-Driven & Git Validation',
        description: 'Před dokončením ověřit lint, kompilaci a spustit testy.',
        enabled: true,
        ruleSnippet: 'Před odevzdáním ověř syntaktickou správnost, spusť lint a jednotkové testy. Vytvoř atomické git commity s Conventional Commits standardem.'
      },
      {
        id: 'claude-figma-mcp',
        name: 'Figma MCP & SVG Integrace',
        description: 'Autonomní dotazování Figma MCP serveru a generování čistých SVG pro Illustrator.',
        enabled: true,
        ruleSnippet: 'Při práci s Figma MCP serverem čti přesné node stromy a transformuj Auto-layout na Tailwind Flex/Grid. Při tvorbě SVG generuj sémantické ID vrstev <g id="..."> a čisté beziérové křivky editovatelné ve Figmě i Adobe Illustratoru.'
      },
      {
        id: 'claude-authentic-tone',
        name: 'Autentická Tonalita & Persona (44 let, věcný, přímý)',
        description: 'Přirozený, věcný a přátelský styl komunikace bez korporátních frází a vaty.',
        enabled: true,
        ruleSnippet: 'V e-mailech a komunikaci vystupuj s klidným sebevědomím zkušeného seniorního partnera (muž, 44 let, Čech, otec, spolehlivý profesionál). Piš profesionálně, přátelsky, přirozeně, stručně bez prázdných frází, věcně, přímo a upřímně. Žádné klišé ani zbytečný balast.'
      }
    ],
    powerKeywords: [
      {
        category: 'Tonalita & Komunikace',
        keywords: ['věcný a přímý tón', 'přátelská profesionalita', 'žádné korporátní klišé', 'jasné dohody a milníky', 'seniorní partner (44 let)', 'upřímnost a nadhled', 'přirozená čeština']
      },
      {
        category: 'Figma MCP & SVG',
        keywords: ['figma MCP get_file_nodes', 'figma design variables', 'auto-layout to flexbox', 'clean SVG viewBox', 'semantic SVG <g id>', 'bezier path precision', 'import to illustrator ready']
      },
      {
        category: 'CLI & Git',
        keywords: ['conventional commits', 'git diff verification', 'subagent-safe', 'atomic edits', 'minimal diff', 'zero side-effects']
      },
      {
        category: 'Architektura',
        keywords: ['single source of truth', 'dependency injection', 'pure functions', 'strict invariants', 'idempotent operations']
      },
      {
        category: 'Testování',
        keywords: ['vitest suite', 'test-driven', 'edge case assertions', 'zero mock leak', 'integration harness']
      }
    ]
  },
  {
    id: 'cursor',
    name: 'Cursor IDE & Windsurf AI',
    shortName: 'Cursor IDE',
    badge: 'IDE & .cursorrules',
    description: 'Přesné instrukce pro kontextové kódování v Cursoru s využitím @Files, .cursorrules formátu a striktního TypeScriptu.',
    framework: 'Cursor System Rules (.cursorrules) & Direct Context Injection',
    defaultExportFormat: 'cursorrules',
    recommendedSkills: [
      {
        id: 'cursor-no-placeholders',
        name: 'Zákaz // TODO a zástupných kódů',
        description: 'Nikdy nevkládat // TODO: implement later ani vynechávat funkce.',
        enabled: true,
        ruleSnippet: 'Nikdy negeneruj zástupné komentáře typu "// TODO", "// implement rest" ani nezkracuj kód třemi tečkami. Vždy doruč 100% funkční produkční kód.'
      },
      {
        id: 'cursor-strict-types',
        name: 'Striktní TypeScript bez "any"',
        description: 'Kompletní rozhraní, typová inference a explicitní návratové typy.',
        enabled: true,
        ruleSnippet: 'Striktní typování v TypeScriptu: zákaz typu "any" a "unknown" bez type-guardů. Všechny parametry a návratové hodnoty musí mít přesné definice.'
      },
      {
        id: 'cursor-file-integrity',
        name: 'Respektování existujících importů',
        description: 'Neničit cesty k aliasům @/* a existující balíčky v package.json.',
        enabled: true,
        ruleSnippet: 'Využívej projektové aliasy definované v tsconfig.json. Neinstaluj duplicitní závislosti; zkontroluj package.json před navržením nové knihovny.'
      },
      {
        id: 'cursor-error-boundaries',
        name: 'Robustní ošetření chyb',
        description: 'Try/catch bloky, graceful fallbacky a srozumitelné chybové hlášky pro uživatele.',
        enabled: true,
        ruleSnippet: 'Každé asynchronní volání musí obsahovat robustní ošetření chyb a uživatelsky čitelný stav v UI namísto pádu aplikace.'
      }
    ],
    powerKeywords: [
      {
        category: 'Cursor direktivy',
        keywords: ['@Codebase', '@Files', '@Documentation', 'never use any', 'no placeholder comments', 'export type only']
      },
      {
        category: 'Kvalita kódu',
        keywords: ['production-grade', 'DRY principles', 'fail-fast assertion', 'immutable state', 'memory leak safe']
      },
      {
        category: 'UI Integrace',
        keywords: ['lucide icons', 'tailwind utility-first', 'aria-label accessible', 'keyboard navigable']
      }
    ]
  },
  {
    id: 'midjourney',
    name: 'Midjourney v6.1 / v7 (Fotorealismus & Vizuály)',
    shortName: 'Midjourney',
    badge: 'Fotografie & 3D Render',
    description: 'Vysoce strukturované promptování pro Midjourney s technickými parametry fotoaparátů, světel, textur a stylizace.',
    framework: 'Cinematic Visual Engineering & Parametric Aspect Control',
    defaultExportFormat: 'text',
    recommendedSkills: [
      {
        id: 'mj-camera-lenses',
        name: 'Fotografická optika & expozice',
        description: 'Specifikace konkrétních objektivů (35mm f/1.4, 85mm anamorphic), clon a hloubky ostrosti.',
        enabled: true,
        ruleSnippet: 'Specifikuj přesný objektiv a typ fotoaparátu (např. shot on Hasselblad H6D-100c, 85mm f/1.2 lens, shallow depth of field, natural film grain).'
      },
      {
        id: 'mj-lighting-setup',
        name: 'Studio & Cinematic světlo',
        description: 'Chiaroscuro, rim light, volumetrické mlžné kužely, Rembrandtovo svícení.',
        enabled: true,
        ruleSnippet: 'Ověř osvětlení scény: popiš směrové světlo, stíny, odrazy a atmosféru (např. soft directional golden hour backlight, volumetric fog, rim lighting).'
      },
      {
        id: 'mj-anti-slop-negatives',
        name: 'Zákaz AI klišé a plastové kůže',
        description: 'Vyloučení plastického voskového vzhledu, přepálených barev a vodoznaků.',
        enabled: true,
        ruleSnippet: 'Zákaz klišé frází jako "hyperrealistic, 8k, masterpiece". Místo toho použij textury materiálů a negativní parametr --no plastic skin, wax, deformed, oversaturated, text, watermark.'
      },
      {
        id: 'mj-parameters-syntax',
        name: 'Plné Midjourney parametry (--ar, --v, --s)',
        description: 'Správné formátování přepínačů na konci promptu.',
        enabled: true,
        ruleSnippet: 'Na konec promptu vlož správné parametry: poměr stran --ar 16:9 (nebo 21:9 pro ultrawide), verzi --v 6.1 a stylizaci --s 200 až 500 podle záměru.'
      }
    ],
    powerKeywords: [
      {
        category: 'Optika a Fotoaparát',
        keywords: ['35mm Leica Summilux f/1.4', 'Hasselblad 100mm medium format', 'anamorphic lens flare', 'Kodak Portra 400 film stock', 'f/1.8 aperture']
      },
      {
        category: 'Světla a Atmosféra',
        keywords: ['chiaroscuro lighting', 'soft diffused northern window light', 'golden hour atmospheric haze', 'cinematic color grading', 'subtle volumetric rays']
      },
      {
        category: 'Midjourney Parametry',
        keywords: ['--ar 16:9', '--ar 21:9', '--ar 4:5', '--v 6.1', '--style raw', '--s 250', '--no watermark, oversaturated, plastic']
      }
    ]
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana & Gemini Flash Image',
    shortName: 'Nano Banana',
    badge: 'Generativní Vizuály & Rychlé MVP',
    description: 'Optimalizováno pro rychlé generování obrazových konceptů, mockupy a iterace v reálném čase.',
    framework: 'Instant Generative Image Synthesis Protocol',
    defaultExportFormat: 'text',
    recommendedSkills: [
      {
        id: 'nano-direct-subject',
        name: 'Přímočará specifikace scény',
        description: 'Jasný popis objektu, pozadí, barevné palety a stylu bez zbytečných metafor.',
        enabled: true,
        ruleSnippet: 'Popiš scénu jasně: hlavní subjekt, materiály povrchu, úhel kamery, typ osvětlení a barevnou harmonii.'
      },
      {
        id: 'nano-tactile-materials',
        name: 'Hmatatelné textury a materiály',
        description: 'Matný hliník, broušená ocel, papírová textura, textilní vazba.',
        enabled: true,
        ruleSnippet: 'Definuj hmatatelné mikrotextury povrchů (matný hliník, přírodní lněný papír, jemná zrnitost dřeva).'
      }
    ],
    powerKeywords: [
      {
        category: 'Materiály',
        keywords: ['brushed anodized aluminum', 'matte textured travertine', 'recycled kraft paper', 'subtle frosted glass']
      },
      {
        category: 'Kompozice',
        keywords: ['isometric studio view', 'clean top-down flatlay', 'minimalist product pedestal', 'monochromatic studio backdrop']
      }
    ]
  },
  {
    id: 'gemini-pro',
    name: 'Google Gemini 2.5 / 3.0 Pro & Flash',
    shortName: 'Gemini Pro',
    badge: 'Multimodální & Schema',
    description: 'Využití strukturovaných systémových instrukcí, function calling schémat a multimodálního kontextu.',
    framework: 'Google System Instruction & Structured JSON Schema Protocol',
    defaultExportFormat: 'markdown',
    recommendedSkills: [
      {
        id: 'gemini-system-instructions',
        name: 'Formát systémových instrukcí',
        description: 'Jasné vymezení role, omezení a formátu odpovědi pro @google/genai.',
        enabled: true,
        ruleSnippet: 'Strukturuj instrukce s jasným vymezením role a mantinelů chování. Zákaz odchylky od požadovaného schématu.'
      },
      {
        id: 'gemini-structured-json',
        name: 'Striktní JSON výstup',
        description: 'Požadavek na validní JSON bez markdownových backticků.',
        enabled: true,
        ruleSnippet: 'Pokud je požadován strukturovaný výstup, vrať pouze validní JSON odpovídající schématu, bez obalujících markdownových značek.'
      }
    ],
    powerKeywords: [
      {
        category: 'Gemini schémata',
        keywords: ['systemInstruction', 'responseSchema Type.OBJECT', 'multimodal grounding', 'function calling declaration']
      }
    ]
  },
  {
    id: 'gpt-o3',
    name: 'OpenAI GPT-4.5 / o3-mini (Reasoning)',
    shortName: 'GPT & o3',
    badge: 'Reasoning & Logika',
    description: 'Prompty strukturované pro hluboké uvažování, eliminaci halucinací a ověřování logických kroků.',
    framework: 'Chain-of-Thought Structural Verification Protocol',
    defaultExportFormat: 'markdown',
    recommendedSkills: [
      {
        id: 'gpt-step-by-step',
        name: 'Verifikace před finální odpovědí',
        description: 'Model si interně ověří každý krok a zkontroluje matematickou a syntaktickou správnost.',
        enabled: true,
        ruleSnippet: 'Před odevzdáním finální odpovědi proveď rigorózní verifikaci všech kroků. Pokud narazíš na rozpor nebo chybu, oprav ji před vygenerováním kódu.'
      },
      {
        id: 'gpt-zero-fluff',
        name: 'Čistý markdown bez zdvořilostního úvodu',
        description: 'Přímý přechod k řešení bez generických úvodů.',
        enabled: true,
        ruleSnippet: 'Odpovídej v čistém Markdownu. Žádné úvodní ani závěrečné zdvořilostní věty.'
      }
    ],
    powerKeywords: [
      {
        category: 'Logika & Kód',
        keywords: ['step-by-step verification', 'mathematical proof', 'formal semantics', 'zero hallucination constraint']
      }
    ]
  }
];
