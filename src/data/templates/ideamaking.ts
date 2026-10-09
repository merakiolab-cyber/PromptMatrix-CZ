import { PromptTemplate } from '../../types';

export const IDEAMAKING_TEMPLATES: PromptTemplate[] = [
  {
    id: 'ideamaking-visual-concept-sprint',
    title: 'Ideamaking: Kreativní Směr & Vizuální Metafory pro Kampaň',
    description: 'Generování 3 odlišných kreativních konceptů pro digitální produkt s vizuálními kotvami a sloganem.',
    modelId: 'gemini-pro',
    categoryId: 'ideamaking-direction',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Ideamaking', 'Koncepty', 'Kampaň', 'Kreativita'],
    authorFeedTip: 'Hledejte nečekané paralely mezi technologickou funkcí a hmatatelným fyzickým světem.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'idea-task',
        key: 'brief_description',
        label: 'Zadání a cíl kampaně',
        type: 'text',
        value: 'Uvedení nové verze aplikace pro designéry zaměřené na nulový lag a okamžitou synchronizaci',
        required: true
      }
    ],
    templateString: `<context>
Jsi kreativní ředitel. Navrhuješ koncepty pro kampaň: {{brief_description}}.
</context>`
  },

  {
    id: 'ideamaking-naming-workshop-sprint',
    title: 'Ideamaking: Naming Workshop & Ověření Názvu Produktu',
    description: 'Strukturovaný proces vymýšlení názvu (Naming Sprint) rozdělený na popisné, metaforické, složené a abstraktní směry s kontrolou domén.',
    modelId: 'gemini-pro',
    categoryId: 'ideamaking-direction',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Naming', 'Branding', 'Názvotvorba', 'Ideamaking'],
    authorFeedTip: 'Ověřujte mezinárodní výslovnost a potenciální nevhodné významy v cizích jazycích.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'nam-scope',
        key: 'product_purpose',
        label: 'Popis a mise produktu',
        type: 'text',
        value: 'Platforma pro automatickou kontrolu a export grafických podkladů do tiskáren a na web',
        required: true
      }
    ],
    templateString: `<context>
Vedeš Naming Sprint pro: {{product_purpose}}.
</context>`
  },

  {
    id: 'ideamaking-moodboard-art-direction-brief',
    title: 'Ideamaking: Moodboard & Art Direction Brief pro Vizuální Kampaň',
    description: 'Kreativní zadání pro fotografy, 3D grafiky a UI designéry: definice barevných tónů, osvětlení, kompozice a rekvizit.',
    modelId: 'gemini-pro',
    categoryId: 'ideamaking-direction',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Moodboard', 'Art Direction', 'Brief', 'Kreativita'],
    authorFeedTip: 'Definujte přesný emotivní dojem, který má zákazník mít v prvních 3 sekundách.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'mb-theme',
        key: 'campaign_essence',
        label: 'Esence a téma kampaně',
        type: 'text',
        value: 'Udržitelná luxusní kosmetika z hlubokomořských řas – klid, minerální textury, krystalická čistota',
        required: true
      }
    ],
    templateString: `<context>
Sestavuješ Art Direction Moodboard Brief pro kampaň: {{campaign_essence}}.
</context>`
  },

  {
    id: 'ideamaking-brand-storytelling-narrative',
    title: 'Ideamaking: Brand Storytelling & Příběh Značky (Archetypy)',
    description: 'Příběhový rámec značky využitím archetypu (Inovátor / Průkopník / Ochránce), definice problému, hrdiny a katarze.',
    modelId: 'gpt-o3',
    categoryId: 'ideamaking-direction',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Storytelling', 'Brand Archetype', 'Příběh', 'Branding'],
    authorFeedTip: 'Hrdinou příběhu je vždy zákazník, nikoli vaše značka – značka je průvodcem.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'st-hero',
        key: 'customer_and_struggle',
        label: 'Zákazník a jeho hlavní překážka',
        type: 'textarea',
        value: 'Freelance designér zavalený administrativou, nejasným zadáním od klientů a opravami chyb.',
        required: true
      }
    ],
    templateString: `<context>
Tvoříš narativní příběh značky (Brand Narrative).
Zákazník a překážka: {{customer_and_struggle}}
</context>`
  },

  {
    id: 'ideamaking-creative-pitch-deck-outline',
    title: 'Ideamaking: Kreativní Pitch Deck Prezentace pro Klienta',
    description: 'Struktura 10-slajdové prezentace pro prodej kreativního konceptu klientovi s přechodem od problému k řešení.',
    modelId: 'gemini-pro',
    categoryId: 'ideamaking-direction',
    defaultWorkflow: 'tech-documentation',
    defaultPhase: 'greenfield',
    tags: ['Pitch Deck', 'Prezentace', 'Kreativita', 'Sales'],
    authorFeedTip: 'Každý slajd musí mít jedinou hlavní myšlenku vyjádřenou v titulku slajdu.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'pd-client',
        key: 'pitch_goal',
        label: 'Cíl prezentace a klient',
        type: 'text',
        value: 'Prezentace redesignu vizuální identity pro tradiční českou rodinnou manufakturu',
        required: true
      }
    ],
    templateString: `<context>
Sestavuješ strukturu Pitch Deck prezentace.
Cíl: {{pitch_goal}}
</context>`
  }
];
