import { PromptTemplate } from '../../types';

export const ADOBE_SUITE_TEMPLATES: PromptTemplate[] = [
  {
    id: 'adobe-indesign-extendscript-catalog',
    title: 'InDesign ExtendScript: Automatická Sazba Produktového Katalogu',
    description: 'Skript pro InDesign v ExtendScriptu pro načtení CSV dat a automatické vygenerování tiskových stránek se styly.',
    modelId: 'cursor',
    categoryId: 'adobe-suite',
    defaultWorkflow: 'indesign-extendscript',
    defaultPhase: 'greenfield',
    tags: ['InDesign', 'ExtendScript', 'DTP', 'Katalog'],
    authorFeedTip: 'Vždy nastavte explicitní jednotky app.scriptPreferences.measurementUnit na milimetry.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'id-cat-name',
        key: 'catalog_type',
        label: 'Typ katalogu a parametry sazby',
        type: 'text',
        value: 'Produktový katalog nábytku A4 na šířku, 4 položky na stránku, tiskový spad 3 mm',
        required: true
      }
    ],
    templateString: `<context>
Píšeš automatizační skript pro Adobe InDesign v ExtendScriptu.
Zadání: {{catalog_type}}
</context>`
  },

  {
    id: 'adobe-photoshop-uxp-batch-resize',
    title: 'Photoshop Modern UXP: Dávkové Zpracování a Maskování Vrstev',
    description: 'JavaScript UXP plugin pro dávkové oříznutí, aplikaci Smart Object filtrů a export do WebP.',
    modelId: 'cursor',
    categoryId: 'adobe-suite',
    defaultWorkflow: 'photoshop-uxp',
    defaultPhase: 'iteration',
    tags: ['Photoshop', 'UXP', 'JavaScript', 'Automatizace'],
    authorFeedTip: 'Nezapomeňte obalit volání do require("photoshop").core.executeAsModal().',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ps-op',
        key: 'batch_operation',
        label: 'Operace s vrstvami',
        type: 'text',
        value: 'Odstranění pozadí pomocí AI masky, přidání 1px bílého obrysu a export do 2048x2048 WebP',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš moderní Adobe Photoshop UXP skript.
Operace: {{batch_operation}}
</context>`
  },

  {
    id: 'adobe-aftereffects-inertial-bounce-expr',
    title: 'After Effects: Matematický Výraz pro Pružné Přestřelení (Inertial Bounce)',
    description: 'Čistý JavaScript expression pro After Effects, který na klíčových snímcích pozice a rotace vytvoří přirozené fyzikální dokmitání.',
    modelId: 'cursor',
    categoryId: 'adobe-suite',
    defaultWorkflow: 'aftereffects-motion',
    defaultPhase: 'polish',
    tags: ['After Effects', 'Expressions', 'Motion Graphics', 'Fyzika'],
    authorFeedTip: 'Ošetřete situaci numKeys > 0 a time > key(numKeys).time.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ae-prop',
        key: 'property_to_animate',
        label: 'Vlastnost vrstvy (Position, Scale, Rotation)',
        type: 'text',
        value: 'Transform Scale (animace z 0% na 100% s lehkým pružným odrazem na konci)',
        required: true
      }
    ],
    templateString: `<context>
Píšeš After Effects JavaScript Expression pro: {{property_to_animate}}.
</context>`
  }
];
