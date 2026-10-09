import { ModelId, WorkflowTarget, CategoryId } from '../types';

export interface CompatibilityCheck {
  isCompatible: boolean;
  level: 'optimal' | 'compatible' | 'warning' | 'incompatible';
  title?: string;
  message?: string;
  recommendedModelId?: ModelId;
  recommendedWorkflow?: WorkflowTarget;
}

// Map each model to its primary domain capabilities
export const MODEL_DOMAINS: Record<ModelId, {
  name: string;
  type: 'cli-coding' | 'ide-code' | 'visual-image' | 'multimodal-reasoning';
  compatibleWorkflows: WorkflowTarget[];
  incompatibleWorkflows: WorkflowTarget[];
  description: string;
}> = {
  'claude-code': {
    name: 'Claude 3.7 Sonnet (Claude Code Pro)',
    type: 'cli-coding',
    description: 'Specialista na CLI agenturu, Figma MCP server, správu lokálních složek/souborů na disku, Git, refaktoring, SVG skriptování i klientské maily.',
    compatibleWorkflows: [
      'figma-mcp-claudecode',
      'svg-vector-gen',
      'svg-icon-system',
      'local-filesystem-ops',
      'business-email-ops',
      'ui-localization-ops',
      'repo-filesystem',
      'git-cicd',
      'web-frontend',
      'fullstack-api',
      'threejs-webgl',
      'figma-tokens',
      'figma-plugin',
      'tech-documentation',
      'blender-script',
      'photoshop-uxp',
      'indesign-extendscript',
      'illustrator-script',
      'aftereffects-motion',
      'video-davinci-premiere',
      'asset-pipeline',
      'print-prepress-flow'
    ],
    incompatibleWorkflows: ['midjourney-generator'],
  },
  'cursor': {
    name: 'Cursor IDE & Windsurf AI',
    type: 'ide-code',
    description: 'Optimalizováno pro kontextové kódování v editoru, .cursorrules soubory, TypeScript, React, Adobe skripty a Figma tokeny.',
    compatibleWorkflows: [
      'web-frontend',
      'fullstack-api',
      'svg-vector-gen',
      'svg-icon-system',
      'figma-tokens',
      'figma-plugin',
      'blender-script',
      'photoshop-uxp',
      'indesign-extendscript',
      'illustrator-script',
      'aftereffects-motion',
      'video-davinci-premiere',
      'threejs-webgl',
      'repo-filesystem',
      'git-cicd',
      'local-filesystem-ops',
      'tech-documentation',
      'ui-localization-ops'
    ],
    incompatibleWorkflows: ['midjourney-generator', 'business-email-ops'],
  },
  'midjourney': {
    name: 'Midjourney v6.1',
    type: 'visual-image',
    description: 'Nástroj pro generování vizuálů, fotorealistických scén, 3D renderů a designových konceptů.',
    compatibleWorkflows: ['midjourney-generator', 'asset-pipeline'],
    incompatibleWorkflows: [
      'figma-mcp-claudecode',
      'local-filesystem-ops',
      'business-email-ops',
      'ui-localization-ops',
      'repo-filesystem',
      'git-cicd',
      'web-frontend',
      'fullstack-api',
      'threejs-webgl',
      'blender-script',
      'blender-gn',
      'photoshop-uxp',
      'indesign-extendscript',
      'illustrator-script',
      'aftereffects-motion',
      'video-davinci-premiere',
      'figma-tokens',
      'figma-plugin',
      'tech-documentation',
      'print-prepress-flow',
      'svg-icon-system'
    ]
  },
  'nano-banana': {
    name: 'Nano Banana Image Gen',
    type: 'visual-image',
    description: 'Rychlé generování obrázků, mock-upů, textur a vizuálních assetů.',
    compatibleWorkflows: ['midjourney-generator', 'asset-pipeline'],
    incompatibleWorkflows: [
      'figma-mcp-claudecode',
      'local-filesystem-ops',
      'business-email-ops',
      'ui-localization-ops',
      'repo-filesystem',
      'git-cicd',
      'web-frontend',
      'fullstack-api',
      'threejs-webgl',
      'blender-script',
      'blender-gn',
      'photoshop-uxp',
      'indesign-extendscript',
      'illustrator-script',
      'aftereffects-motion',
      'video-davinci-premiere',
      'figma-tokens',
      'figma-plugin',
      'tech-documentation',
      'print-prepress-flow',
      'svg-icon-system'
    ]
  },
  'gemini-pro': {
    name: 'Gemini 2.5 Pro Multimodal',
    type: 'multimodal-reasoning',
    description: 'Multimodální analýza, komplexní systémová architektura, technické specifikace, překlady a ideamaking.',
    compatibleWorkflows: [
      'web-frontend',
      'fullstack-api',
      'tech-documentation',
      'business-email-ops',
      'ui-localization-ops',
      'figma-tokens',
      'asset-pipeline',
      'print-prepress-flow',
      'repo-filesystem',
      'git-cicd'
    ],
    incompatibleWorkflows: ['midjourney-generator'],
  },
  'gpt-o3': {
    name: 'GPT-o3 Pro Reasoning',
    type: 'multimodal-reasoning',
    description: 'Hloubkové algoritmické uvažování, matematická logika, architektonické plány a syntéza zadání.',
    compatibleWorkflows: [
      'web-frontend',
      'fullstack-api',
      'tech-documentation',
      'business-email-ops',
      'ui-localization-ops',
      'figma-tokens',
      'repo-filesystem',
      'git-cicd',
      'blender-script',
      'photoshop-uxp'
    ],
    incompatibleWorkflows: ['midjourney-generator'],
  }
};

export function checkModelWorkflowCompatibility(
  modelId: ModelId,
  workflow: WorkflowTarget | null,
  categoryId?: CategoryId
): CompatibilityCheck {
  const modelConfig = MODEL_DOMAINS[modelId];

  // Check strict incompatibility (e.g. Nano Banana / Midjourney with code / CLI / Figma MCP)
  if (workflow && modelConfig.incompatibleWorkflows.includes(workflow)) {
    let recModel: ModelId = 'claude-code';
    if (workflow === 'web-frontend' || workflow === 'fullstack-api') recModel = 'cursor';
    if (workflow === 'figma-mcp-claudecode' || workflow === 'local-filesystem-ops' || workflow === 'business-email-ops') recModel = 'claude-code';

    return {
      isCompatible: false,
      level: 'incompatible',
      title: `Nekompatibilní kombinace: ${modelConfig.name} vs zvolené Workflow`,
      message: `Model **${modelConfig.name}** je určen výhradně pro generování grafických vizuálů. Nelze jej použít pro kódování, Figma MCP synchronizaci, správu souborů na disku ani skriptování.`,
      recommendedModelId: recModel
    };
  }

  // Check if user has visual model with non-visual category
  if ((modelId === 'midjourney' || modelId === 'nano-banana') && categoryId) {
    const codeCategories: CategoryId[] = [
      'ui-ux-design',
      'webdesign-apps',
      'cli-filesystem-email',
      'ai-workflows',
      'adobe-suite',
      '3d-blender'
    ];
    if (codeCategories.includes(categoryId) && workflow !== 'midjourney-generator') {
      return {
        isCompatible: false,
        level: 'incompatible',
        title: 'Nekompatibilní zadání pro vizuální generátor',
        message: `Zvolená kategorie vyžaduje generování kódu nebo technických skriptů, zatímco ${modelConfig.name} generuje rastrové obrázky. Doporučujeme přepnout na **Claude 3.7 Sonnet** nebo **Cursor IDE**.`,
        recommendedModelId: 'claude-code'
      };
    }
  }

  // Check if user has coding model with image generation prompt
  if (workflow === 'midjourney-generator' && (modelId === 'claude-code' || modelId === 'cursor')) {
    return {
      isCompatible: false,
      level: 'warning',
      title: 'Doporučení pro generování vizuálů',
      message: `Pro generování fotorealistických scén a promptů s parametry (--ar, --v 6.1) je vhodnější přepnout na **Midjourney** nebo **Nano Banana**.`,
      recommendedModelId: 'midjourney'
    };
  }

  return {
    isCompatible: true,
    level: 'optimal'
  };
}
