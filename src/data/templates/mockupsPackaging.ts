import { PromptTemplate } from '../../types';

export const MOCKUPS_PACKAGING_TEMPLATES: PromptTemplate[] = [
  {
    id: 'mockup-cosmetic-packaging-3d',
    title: 'Midjourney & Nano: 3D Mockup Kosmetického Balení (Matné Sklo)',
    description: 'Luxusní render lahvičky s kapátkem, matným černým sklem a reliéfním potiskem.',
    modelId: 'midjourney',
    categoryId: 'mockups-packaging',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Mockup', 'Obaly', 'Kosmetika', '3D'],
    authorFeedTip: 'Specifikujte matné sklo (frosted glass) a embossed typografii pro hmatatelný luxusní dojem.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'mock-prod',
        key: 'product_details',
        label: 'Detail produktu a etikety',
        type: 'text',
        value: 'Prémiové sérum na pleť v lahvičce z kouřového matného skla s minimalistickou typografickou etiketou',
        required: true
      }
    ],
    templateString: `Studio product mockup photography of {{product_details}}, resting on a textured dark travertine stone block, surrounded by subtle water droplets, soft studio rim lighting, 8k resolution, commercial advertising quality --ar 4:5 --style raw --v 6.1`
  },

  {
    id: 'mockup-craft-beer-can-label',
    title: 'Obalový Design: Plechovka Craftového Piva & Etiketa v Illustratoru',
    description: 'Kompletní zadání pro návrh etikety na hliníkovou 500ml plechovku s přímými barvami Pantone a metalickým podkladem.',
    modelId: 'cursor',
    categoryId: 'mockups-packaging',
    defaultWorkflow: 'illustrator-script',
    defaultPhase: 'greenfield',
    tags: ['Obaly', 'Pivo', 'Etiketa', 'Illustrator', 'Pantone'],
    authorFeedTip: 'Rozměr rozložené etikety pro 500ml standardní plechovku je 207x140 mm.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'can-beer',
        key: 'beer_style_and_vibe',
        label: 'Styl piva a vizuální motiv',
        type: 'text',
        value: 'Hazy New England IPA s tóny manga a maracuji, psychedelická geometrická vektorová ilustrace',
        required: true
      }
    ],
    templateString: `<context>
Navrhuješ vektorovou etiketu pro plechovku piva: {{beer_style_and_vibe}}.
</context>

<task>
1. Definuj rozměry a tiskovou mřížku (výška 140 mm, obvod 207 mm).
2. Navrhni hierarchii: Název pivovaru, Styl piva, Alkohol % obj., legislativní blok EAN a složení.
3. Specifikuj 4 přímé barvy Pantone + parciální krycí bílou pro zachování metalického lesku plechovky.
</task>`
  },

  {
    id: 'mockup-coffee-bag-die-cut',
    title: 'Obalový Design: Kávový Sáček s Ventilem & Výsek Etikety',
    description: 'Návrh obalu pro výběrovou kávu z kraftového nebo matně černého papíru s potiskem a typografickým páskem.',
    modelId: 'claude-code',
    categoryId: 'mockups-packaging',
    defaultWorkflow: 'print-prepress-flow',
    defaultPhase: 'greenfield',
    tags: ['Káva', 'Obaly', 'Packaging', 'Prepress'],
    authorFeedTip: 'Nezapomeňte na technologické umístění jednocestného odplyňovacího ventilu 40 mm od horního okraje.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'cof-origin',
        key: 'coffee_origin_and_roastery',
        label: 'Původ kávy a profil pražírny',
        type: 'text',
        value: 'Etiopie Yirgacheffe (promytá, tóny jasmínu a bergamotu), pražírna s minimalistickým severským designem',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš obalový systém pro výběrovou kávu: {{coffee_origin_and_roastery}}.
</context>`
  }
];
