import { PromptTemplate } from '../../types';

export const PRINT_PREPRESS_TEMPLATES: PromptTemplate[] = [
  {
    id: 'dtp-prepress-flightcheck-checklist',
    title: 'DTP Prepress: Kontrolní Audit Tiskových Podkladů (PDF/X-4)',
    description: 'Pravidla pro ověření tiskových dat: 300 DPI rastry, barvy v CMYK, přetisk černé a spadávky.',
    modelId: 'claude-code',
    categoryId: 'print-prepress',
    defaultWorkflow: 'print-prepress-flow',
    defaultPhase: 'ship',
    tags: ['DTP', 'Prepress', 'CMYK', 'Tisk', 'PDF/X'],
    authorFeedTip: 'Zkontrolujte celkové krytí barev (Total Ink Coverage - TIC), které nesmí u křídového papíru překročit 300%.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'dtp-prod',
        key: 'print_product_specs',
        label: 'Specifikace tiskoviny',
        type: 'text',
        value: 'Výpravná publikace v pevné vazbě V8, formát 210x280 mm, křídový papír mat 170g, parciální UV lak',
        required: true
      }
    ],
    templateString: `<context>
Provádíš finální Prepress kontrolu tiskových dat pro: {{print_product_specs}}.
</context>`
  },

  {
    id: 'dtp-spine-width-calculator',
    title: 'DTP Prepress: Přesný Výpočet Hřbetu Knihy (Vazba V8 / V2)',
    description: 'Matematický výpočet šířky hřbetu knihy a rozložené obálky podle plošné hmotnosti papíru (g/m2) a objemovosti (voluminosity).',
    modelId: 'claude-code',
    categoryId: 'print-prepress',
    defaultWorkflow: 'print-prepress-flow',
    defaultPhase: 'greenfield',
    tags: ['Hřbet', 'Kniha', 'DTP', 'Vazba V8', 'Výpočet'],
    authorFeedTip: 'Nezapomeňte přičíst tloušťku lepenky pro tvrdou vazbu V8 (zpravidla 2x 2.5 mm).',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'spn-pages',
        key: 'book_specifications',
        label: 'Počet stran a parametry papíru',
        type: 'text',
        value: '320 stran, nenatíraný papír Munken Lynx 120 g/m2 (voluminosita 1.13), tvrdá vazba V8 s lepenkou 2.5 mm',
        required: true
      }
    ],
    templateString: `<context>
Počítáš přesnou šířku hřbetu knihy a rozložené obálky.
Parametry: {{book_specifications}}
</context>`
  },

  {
    id: 'dtp-spot-uv-hot-foil-mask',
    title: 'DTP Prepress: Příprava Masky pro Parciální UV Lak & Horkou Ražbu',
    description: 'Tvorba vektorové tiskové masky v InDesignu / Illustratoru se 100% přímou barvou (Spot Color) a nastaveným přetiskem (Overprint).',
    modelId: 'claude-code',
    categoryId: 'print-prepress',
    defaultWorkflow: 'print-prepress-flow',
    defaultPhase: 'iteration',
    tags: ['UV Lak', 'Ražba', 'Fólie', 'Přímá Barva', 'Prepress'],
    authorFeedTip: 'Vektorová vrstva pro ražbu musí mít název "Foil_Gold" a typ barvy Spot Color s povoleným Overprint Fill.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'dtp-finishing',
        key: 'finishing_type',
        label: 'Typ zušlechtění',
        type: 'text',
        value: 'Kombinace matného lamina, parciálního 3D laku na logu a zlaté horké ražby na nadpisu knihy',
        required: true
      }
    ],
    templateString: `<context>
Připravuješ tiskové podklady pro zušlechtění: {{finishing_type}}.
</context>`
  }
];
