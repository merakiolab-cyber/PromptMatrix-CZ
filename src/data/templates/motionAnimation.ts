import { PromptTemplate } from '../../types';

export const MOTION_ANIMATION_TEMPLATES: PromptTemplate[] = [
  {
    id: 'motion-framer-modal-spring',
    title: 'Motion Design: Pružinové Animace Dialogů (Framer Motion)',
    description: 'Plynulé otevírání a zavírání modálních oken s fyzikou pružiny (stiffness, damping) a backdrop blur filtrem.',
    modelId: 'cursor',
    categoryId: 'motion-animation',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'polish',
    tags: ['Framer Motion', 'Pružiny', 'Animace', 'Modál'],
    authorFeedTip: 'Nastavte damping: 25 a stiffness: 300 pro přirozený pocit bez přehnaného kmitání.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'mot-modal',
        key: 'modal_type',
        label: 'Typ dialogového okna',
        type: 'text',
        value: 'Detail projektu s přechodem ze zmenšené karty na celou obrazovku (layoutId)',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ plynulou animaci dialogu v Framer Motion pro: {{modal_type}}.
</context>`
  },

  {
    id: 'motion-card-3d-tilt-hover',
    title: 'Motion Design: 3D Karta s Nakláněním dle Pohybu Myši (Tilt Effect)',
    description: 'Mikro-interakce pro interaktivní karty: výpočet úhlu natočení v ose X a Y podle relativní pozice kurzoru.',
    modelId: 'cursor',
    categoryId: 'motion-animation',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'polish',
    tags: ['3D Tilt', 'Hover Effect', 'CSS Transform', 'Micro-interactions'],
    authorFeedTip: 'Použijte CSS perspective: 1000px a transform-style: preserve-3d.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'tlt-card',
        key: 'card_purpose',
        label: 'Obsah a účel karty',
        type: 'text',
        value: 'Karta technologického projektu se zářivým gradientem a 3D vystupujícím odznakem',
        required: true
      }
    ],
    templateString: `<context>
Implementuješ plynulý 3D tilt hover efekt na kartě: {{card_purpose}}.
</context>`
  },

  {
    id: 'motion-infinite-logo-marquee',
    title: 'Motion Design: Hladké Nekonečné Logo Marquee (60 FPS CSS/JS)',
    description: 'Nekonečný běžící pás s logy klientů nebo technologických partnerů s plynulým pozastavením při najetí myši (pause-on-hover).',
    modelId: 'cursor',
    categoryId: 'motion-animation',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'polish',
    tags: ['Marquee', 'Infinite Scroll', 'CSS Animation', 'Performance'],
    authorFeedTip: 'Použijte CSS transform: translateX(-50%) s animací na GPU bez reflow lagů.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'mrq-logos',
        key: 'marquee_content',
        label: 'Obsah běžícího pásu',
        type: 'text',
        value: 'Monochromatická bílá loga partnerů (Vercel, Figma, Linear, Stripe, Anthropic)',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš 60 FPS nekonečné logo marquee pro: {{marquee_content}}.
</context>`
  }
];
