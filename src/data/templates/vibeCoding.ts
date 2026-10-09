import { PromptTemplate } from '../../types';

export const VIBE_CODING_TEMPLATES: PromptTemplate[] = [
  {
    id: 'vibecoding-rapid-micro-saas',
    title: 'Vibe Coding: Kompletní 1-Hour Micro-SaaS MVP v Reactu',
    description: 'Rychlé prototypování funkčního prototypu s okamžitým stavem, Tailwind v4 a animacemi za méně než hodinu.',
    modelId: 'cursor',
    categoryId: 'vibecoding',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'greenfield',
    tags: ['Vibe Coding', 'MVP', 'Rapid Prototyping', 'React'],
    authorFeedTip: 'Vibe coding sází na okamžitou vizuální odezvu a hotové knihovny (Lucide ikony, Motion).',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'vc-idea',
        key: 'app_concept',
        label: 'Nápad na aplikaci',
        type: 'text',
        value: 'Generátor faktur a cenových nabídek pro freelancery s okamžitým PDF stažením',
        required: true
      }
    ],
    templateString: `<context>
Stavíš bleskový funkční prototyp aplikace: {{app_concept}}.
</context>

<task>
Napiš kompletní aplikaci v Reactu 19 s Tailwind CSS bez externího backendu (data ukládej do LocalStorage).
</task>`
  },

  {
    id: 'vibecoding-canvas-generative-art',
    title: 'Vibe Coding: Interaktivní Generativní Plátno (HTML5 Canvas & Math)',
    description: 'Generativní matematické umění v reálném čase: částicové víry, fraktální stromy nebo perlin noise vlnění s posuvníky parametrů.',
    modelId: 'cursor',
    categoryId: 'vibecoding',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'greenfield',
    tags: ['Generative Art', 'Canvas', 'Math', 'Vibe Coding'],
    authorFeedTip: 'Přidejte možnost exportovat výsledek jako PNG ve vysokém 4K rozlišení.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'vc-art',
        key: 'visual_pattern',
        label: 'Typ generativního vzoru',
        type: 'text',
        value: 'Perlin Noise Flow Field s 5 000 barevnými částicemi zanechávajícími světelné stopy na černém pozadí',
        required: true
      }
    ],
    templateString: `<context>
Tvoříš interaktivní generativní plátno v HTML5 Canvas a Reactu.
Vzor: {{visual_pattern}}
</context>`
  }
];
