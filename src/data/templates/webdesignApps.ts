import { PromptTemplate } from '../../types';

export const WEBDESIGN_APPS_TEMPLATES: PromptTemplate[] = [
  {
    id: 'web-vercel-landing-page',
    title: 'Webdesign: Minimalistická Vercel-Style Landing Page',
    description: 'Konverzní technologická landing page s jemným gradientním svícením, interaktivním terminálem a bento gridem.',
    modelId: 'cursor',
    categoryId: 'webdesign-apps',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'greenfield',
    tags: ['Landing Page', 'Vercel', 'Bento Grid', 'Dark Mode'],
    authorFeedTip: 'Vercel styl stojí na tmavém uhlíkovém plátně #000000, 1px linkách #222222 a bílých akcentech.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'lp-brand',
        key: 'product_name',
        label: 'Název produktu & Value proposition',
        type: 'text',
        value: 'HyperScale AI - Autonomní infrastruktura pro běh AI agentů',
        required: true
      },
      {
        id: 'lp-bento',
        key: 'bento_features',
        label: 'Sekce Bento Gridu',
        type: 'textarea',
        value: '1. Globální Edge Deployment (<10ms latence)\n2. Integrovaný Figma MCP Bridge\n3. Zero-Config CI/CD pipeline\n4. Bezpečnostní audit kódu v reálném čase',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš špičkovou landing page pro {{product_name}} ve stylu Vercel / Linear.
</context>

<task>
Navrhni kompletní hero sekci a Bento Grid s těmito body:
{{bento_features}}
</task>`
  },

  {
    id: 'web-responsive-4k-navbar',
    title: 'Webdesign: Širokoúhlý 4K Navigační Header & Breadcrumbs',
    description: 'Header s vyhledáváním (⌘K), indikátorem stavu a plynulými hover kartami.',
    modelId: 'cursor',
    categoryId: 'webdesign-apps',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Navbar', '4K', 'Command Menu', 'Header'],
    authorFeedTip: 'Testujte na rozlišení 3840x2160, aby obsah neplaval v prázdnu a byl ukotven v max-w kontejneru.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'nav-brand',
        key: 'brand_title',
        label: 'Značka a odkazy v menu',
        type: 'text',
        value: 'Matrix Studio (Projekty, Knihovna komponent, Skilly, Telemetrie)',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ moderní sticky header optimalizovaný pro desktop i 4K displeje.
Značka a menu: {{brand_title}}
</context>`
  },

  {
    id: 'web-threejs-hero-particle-matrix',
    title: 'Webdesign: Interaktivní 3D Hero Scéna v Three.js (Particle Wave)',
    description: 'Matematická vlnící se částicová síť v Three.js a WebGL reagující na pohyb myši s nulovým propadem FPS.',
    modelId: 'cursor',
    categoryId: 'webdesign-apps',
    defaultWorkflow: 'threejs-webgl',
    defaultPhase: 'greenfield',
    tags: ['Three.js', 'WebGL', '3D Hero', 'Particles'],
    authorFeedTip: 'Nezapomeňte na memory management (cleanup geometry a material dispose při unmountu).',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'w3d-theme',
        key: 'canvas_specs',
        label: 'Parametry částicové sítě',
        type: 'text',
        value: '10 000 monochromatických bílých a azurových bodů, jemné sinusové vlnění, rotace kamery dle pozice myši',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš optimalizovanou Three.js canvas komponentu v Reactu.
Parametry: {{canvas_specs}}
</context>`
  },

  {
    id: 'web-nextjs-api-route-streaming',
    title: 'Fullstack: Next.js App Router API Route se Server-Sent Events (SSE)',
    description: 'Serverový endpoint s postupným streamováním odpovědí (SSE), ověřením JWT tokenu v hlavičce a Zod validací.',
    modelId: 'cursor',
    categoryId: 'webdesign-apps',
    defaultWorkflow: 'fullstack-api',
    defaultPhase: 'greenfield',
    tags: ['Next.js', 'API', 'SSE', 'Streaming', 'TypeScript'],
    authorFeedTip: 'Použijte Web Streams API (TransformStream, ReadableStream) pro nulovou latenci prvního tokenu.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'api-ep',
        key: 'endpoint_purpose',
        label: 'Účel endpointu',
        type: 'text',
        value: '/api/generate-prompt - Postupné generování a streamování tokenů do klienta',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ Next.js Route Handler s podporou SSE streamingu.
Endpoint: {{endpoint_purpose}}
</context>`
  },

  {
    id: 'web-interactive-audio-sfx-ui',
    title: 'Webdesign: Zvukový Engine pro Mikro-interakce v Reactu (Web Audio API)',
    description: 'Syntetické UI zvuky (jemné kliknutí, úspěšné uložení, chybový tón) generované přímo v prohlížeči přes Web Audio API bez nutnosti stahovat MP3.',
    modelId: 'cursor',
    categoryId: 'webdesign-apps',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'polish',
    tags: ['Web Audio API', 'SFX', 'Sound Design', 'React'],
    authorFeedTip: 'Syntetizujte zvuky pomocí OscillatorNode a GainNode s rychlou exponenciální obálkou (decay 50ms).',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'aud-types',
        key: 'sound_effects_list',
        label: 'Požadované zvukové efekty',
        type: 'textarea',
        value: '1. Click/Tap (krátký perkusivní puk 1200Hz, 15ms)\n2. Success (vzestupný trojzvuk dur, 120ms)\n3. Delete/Discard (nízký sestupný tón 200Hz -> 80Hz)\n4. Switch toggle (jemné mechanické lupnutí)',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš čistý Web Audio API sound hook (useSoundFX) pro aplikaci.
Efekty:
{{sound_effects_list}}
</context>`
  },

  {
    id: 'web-virtualized-infinite-grid',
    title: 'Webdesign: Virtualizovaná Mřížka pro Tisíce Obrázků (Virtual Grid)',
    description: 'Plynulá mřížka s virtuálním renderováním pouze viditelných prvků v DOMu pro rychlé načtení 10 000+ fotografií bez záseků.',
    modelId: 'cursor',
    categoryId: 'webdesign-apps',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Virtualization', 'Performance', 'Grid', 'React'],
    authorFeedTip: 'Použijte @tanstack/react-virtual pro bezchybné měření výšek položek a dynamický resize.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'vrt-items',
        key: 'grid_layout_specs',
        label: 'Specifikace mřížky a dat',
        type: 'text',
        value: 'Responzivní mřížka 4 sloupce na 4K, 2 na tabletu, 1 na mobilu, položky s lazy-load obrázky a skeleton placeholderem',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ vysoce výkonnou virtualizovanou mřížku v Reactu.
Specifikace: {{grid_layout_specs}}
</context>`
  },

  {
    id: 'web-pwa-offline-service-worker',
    title: 'Webdesign: PWA Service Worker, Manifest & Offline Caching',
    description: 'Konfigurace Progressive Web App s Workbox caching strategií (StaleWhileRevalidate) a vlastním in-app install promptem.',
    modelId: 'cursor',
    categoryId: 'webdesign-apps',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'ship',
    tags: ['PWA', 'Service Worker', 'Offline', 'Web App'],
    authorFeedTip: 'Ošetřete offline stav aplikace čitelným náhradním bannerem bez pádu fetch volání.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'pwa-app-name',
        key: 'pwa_metadata',
        label: 'Název a vlastnosti PWA aplikace',
        type: 'text',
        value: 'Matrix Studio PWA - Tmavé téma, offline přístup k historii promptů',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ PWA Service Worker a Web App Manifest.
Aplikace: {{pwa_metadata}}
</context>`
  },

  {
    id: 'web-drag-and-drop-kanban-board',
    title: 'Webdesign: Interaktivní Drag & Drop Kanban Nástěnka (dnd-kit)',
    description: 'Kanban board s možností přetahování karet mezi sloupci, re-orderem, animací a klávesovou přístupností.',
    modelId: 'cursor',
    categoryId: 'webdesign-apps',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Kanban', 'Drag and Drop', 'dnd-kit', 'React'],
    authorFeedTip: 'Použijte @dnd-kit/core s Sensor moduly pro plynulý dotykový drag-and-drop na mobilních zařízeních.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'dnd-cols',
        key: 'kanban_columns',
        label: 'Sloupce Kanban nástěnky',
        type: 'textarea',
        value: '- Backlog / Koncepty\n- V procesu (In Progress)\n- Kontrola & Review (QA)\n- Odevzdáno (Done)',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ Kanban nástěnku s dnd-kit v Reactu.
Sloupce:
{{kanban_columns}}
</context>`
  }
];
