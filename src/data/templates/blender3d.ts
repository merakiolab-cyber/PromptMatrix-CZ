import { PromptTemplate } from '../../types';

export const BLENDER_3D_TEMPLATES: PromptTemplate[] = [
  {
    id: 'blender-procedural-gn-cable',
    title: 'Blender 4.x: Procedurální Vázání Kabelů v Geometry Nodes',
    description: 'Parametrický uzel v Blenderu pro generování svazků kabelů, konektorů a průvěsu mezi body.',
    modelId: 'cursor',
    categoryId: '3d-blender',
    defaultWorkflow: 'blender-gn',
    defaultPhase: 'greenfield',
    tags: ['Blender', 'Geometry Nodes', 'Procedural', '3D'],
    authorFeedTip: 'Využijte Curve to Mesh s Profile Circle a vyveďte počet pramenů do Group Input.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'b-cable-type',
        key: 'cable_specs',
        label: 'Parametry kabelového svazku',
        type: 'text',
        value: 'Průmyslový ethernetový kabel s gumovým opletem, kovovými sponami a gravitačním průvěsem',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš Geometry Nodes strom pro: {{cable_specs}}.
</context>

<task>
Popiš kompletní propojení uzlů (Node Tree) včetně datových typů a modifikátorů.
</task>`
  },

  {
    id: 'blender-python-batch-gltf-export',
    title: 'Blender Python: Dávkový optimalizovaný GLTF/WebP export',
    description: 'Skript v bpy pro automatické vyčištění scény, aplikaci modifikátorů a export do webového formátu GLTF s LOD úrovněmi.',
    modelId: 'claude-code',
    categoryId: '3d-blender',
    defaultWorkflow: 'blender-script',
    defaultPhase: 'iteration',
    tags: ['Blender', 'Python', 'bpy', 'Export', 'GLTF'],
    authorFeedTip: 'Vždy zabalte operace do bmesh kontextu pro rychlé čištění neplatné geometrie.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'b-export-path',
        key: 'output_folder',
        label: 'Cílová složka pro export',
        type: 'text',
        value: './public/models/gltf/',
        required: true
      }
    ],
    templateString: `<context>
Píšeš produkční Python skript pro Blender 4.x.
Cílová složka: {{output_folder}}
</context>`
  },

  {
    id: 'blender-procedural-anodized-aluminum-shader',
    title: 'Blender Shading: Procedurální Eloxovaný Hliník & Broušený Kov',
    description: 'Materiálový uzel (Shader Nodes) pro fotorealistický eloxovaný hliník Apple-kvality s jemným anizotropním leskem.',
    modelId: 'cursor',
    categoryId: '3d-blender',
    defaultWorkflow: 'blender-script',
    defaultPhase: 'polish',
    tags: ['Blender', 'Shader Nodes', 'Materiály', 'Apple Style'],
    authorFeedTip: 'Klíčem k eloxovanému hliníku je Anisotropic Roughness 0.4 a jemný Noise bump s měřítkem 500.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'mat-color',
        key: 'metal_finish_and_tint',
        label: 'Barevný odstín a finiš kovu',
        type: 'text',
        value: 'Vesmírně šedý (Space Gray) jemně pískovaný hliník s matným anizotropním odrazem světla',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš Cycles / EEVEE Next materiálový uzel pro: {{metal_finish_and_tint}}.
</context>`
  },

  {
    id: 'blender-gn-parametric-facade',
    title: 'Blender Geometry Nodes: Parametrická Architektonická Fasáda',
    description: 'Generování modulární moderní fasády s nastavitelným počtem podlaží, lamelovými stínidly a okenními rámy.',
    modelId: 'cursor',
    categoryId: '3d-blender',
    defaultWorkflow: 'blender-gn',
    defaultPhase: 'greenfield',
    tags: ['Blender', 'Architektura', 'Geometry Nodes', 'Parametrický'],
    authorFeedTip: 'Použijte Mesh to Points a Instance on Points s náhodným natočením lamel (Random Value).',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'b-facade',
        key: 'facade_parameters',
        label: 'Parametry fasády',
        type: 'text',
        value: 'Budova 8 pater, vertikální dřevěné lamely s motorickým naklápěním dle slunce, zapuštěná černá okna',
        required: true
      }
    ],
    templateString: `<context>
Navrhuješ Geometry Nodes architekturu pro: {{facade_parameters}}.
</context>`
  },

  {
    id: 'blender-python-turntable-render-queue',
    title: 'Blender Python: Automatická Turntable 360° Animace & Render Queue',
    description: 'Skript pro nastavení oběžné dráhy kamery (36 snímků, 360 stupňů), optimálního svícení 3-point light a dávkového renderu do MP4/WebM.',
    modelId: 'claude-code',
    categoryId: '3d-blender',
    defaultWorkflow: 'blender-script',
    defaultPhase: 'ship',
    tags: ['Blender', 'Turntable', 'Python', 'Render Queue'],
    authorFeedTip: 'Využijte Empty objekt ve středu modelu a přiřaďte kameře Track To constraint.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'b-turn',
        key: 'render_settings',
        label: 'Nastavení renderu',
        type: 'text',
        value: 'Rozlišení 1920x1080 (nebo 4K), 60 FPS, 120 vzorků Cycles s OptiX odšuměním, transparentní pozadí',
        required: true
      }
    ],
    templateString: `<context>
Píšeš Python automatizační skript pro 360° turntable prezentaci produktu.
Nastavení: {{render_settings}}
</context>`
  }
];
