import {
  ModelDefinition,
  PromptTemplate,
  PromptVariable,
  WorkflowTarget,
  ProjectPhase,
  VisualPropositions
} from '../types';
import { WORKFLOW_TARGETS, PROJECT_PHASES } from '../data/workflows';
import {
  LENS_OPTIONS,
  APERTURE_OPTIONS,
  COLOR_TONALITY_OPTIONS,
  LIGHTING_OPTIONS,
  REALISM_OPTIONS,
  ASPECT_RATIO_OPTIONS,
  CAMERA_ANGLE_OPTIONS
} from '../components/VisualPropsControls';

export interface CompilationResult {
  rawPrompt: string;
  formattedPrompt: string;
  wordCount: number;
  charCount: number;
  tokenEstimate: number;
}

export function calculateMetrics(text: string) {
  const charCount = text.length;
  const wordCount = text.trim().length > 0 ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const tokenEstimate = charCount > 0 ? Math.max(1, Math.round(charCount / 3.4)) : 0;
  return { charCount, wordCount, tokenEstimate };
}

export function compilePrompt(
  template: PromptTemplate,
  variables: PromptVariable[],
  model: ModelDefinition,
  options?: {
    workflowTarget?: WorkflowTarget | null;
    projectPhase?: ProjectPhase | null;
    visualProps?: VisualPropositions;
    customRules?: string[];
  }
): CompilationResult {
  // 1. Substitute variable placeholders {{var_name}}
  let compiled = template.templateString;

  variables.forEach((variable) => {
    const placeholder = new RegExp(`{{${variable.key}}}`, 'g');
    const value = variable.value?.trim() || `[${variable.label || variable.key}]`;
    compiled = compiled.replace(placeholder, value);
  });

  // 2. Synthesize active model skills
  const activeSkills = model.recommendedSkills.filter((s) => s.enabled);
  const activeSkillSnippets = activeSkills.map((s) => `- ${s.name}: ${s.ruleSnippet}`);

  if (options?.customRules && options.customRules.length > 0) {
    options.customRules.forEach((rule) => {
      activeSkillSnippets.push(`- Vlastní pravidlo: ${rule}`);
    });
  }

  // 3. Workflow & Project Phase injection (can be null/turned off)
  const wfId = options?.workflowTarget !== undefined
    ? options.workflowTarget
    : (template.defaultWorkflow !== undefined ? template.defaultWorkflow : null);

  const targetWorkflow = wfId ? WORKFLOW_TARGETS.find((w) => w.id === wfId) : null;

  // If projectPhase option is explicitly null or provided
  const phaseId = options?.projectPhase !== undefined
    ? options.projectPhase
    : (template.defaultPhase !== undefined ? template.defaultPhase : null);

  const targetPhase = phaseId ? PROJECT_PHASES.find((p) => p.id === phaseId) : null;

  const contextDirectives: string[] = [];
  if (targetWorkflow) {
    contextDirectives.push(`[WORKFLOW KONTEXT: ${targetWorkflow.name}]\n${targetWorkflow.ruleDirective}`);
  }
  if (targetPhase) {
    contextDirectives.push(`[FÁZE PROJEKTU: ${targetPhase.name}]\n${targetPhase.directiveSnippet}`);
  }

  let finalPrompt = compiled;

  // 4. Process Visual Propositions if provided
  const vp = options?.visualProps;
  const hasVisualProps = vp && Object.values(vp).some((v) => v && v !== 'default');

  if (hasVisualProps) {
    const findSnippet = (opts: { id: string; promptSnippet?: string }[], val?: string) => {
      if (!val || val === 'default') return null;
      return opts.find((o) => o.id === val)?.promptSnippet || null;
    };

    const lens = findSnippet(LENS_OPTIONS, vp.lens);
    const aperture = findSnippet(APERTURE_OPTIONS, vp.aperture);
    const color = findSnippet(COLOR_TONALITY_OPTIONS, vp.colorTonality);
    const lighting = findSnippet(LIGHTING_OPTIONS, vp.lighting);
    const angle = findSnippet(CAMERA_ANGLE_OPTIONS, vp.cameraAngle);
    const realism = findSnippet(REALISM_OPTIONS, vp.realism);
    const ar = findSnippet(ASPECT_RATIO_OPTIONS, vp.aspectRatio);

    const bodyParts: string[] = [];
    if (lens) bodyParts.push(lens);
    if (aperture) bodyParts.push(aperture);
    if (color) bodyParts.push(color);
    if (lighting) bodyParts.push(lighting);
    if (angle) bodyParts.push(angle);
    if (realism && !realism.startsWith('--')) bodyParts.push(realism);

    const flagParts: string[] = [];
    if (realism && realism.startsWith('--')) flagParts.push(realism);
    if (ar && ar.startsWith('--')) flagParts.push(ar);

    if (model.id === 'midjourney' || model.id === 'nano-banana') {
      // Split compiled prompt into body and existing flags (starting with --)
      const flagIndex = compiled.search(/\s--[a-z]+/i);
      let promptBody = flagIndex !== -1 ? compiled.substring(0, flagIndex) : compiled;
      let existingFlags = flagIndex !== -1 ? compiled.substring(flagIndex).trim() : '';

      if (bodyParts.length > 0) {
        promptBody = `${promptBody.trim()}, ${bodyParts.join(', ')}`;
      }

      flagParts.forEach((flag) => {
        const flagKey = flag.split(' ')[0]; // e.g. '--ar'
        if (existingFlags.includes(flagKey)) {
          // Replace existing flag value
          const flagRegex = new RegExp(`${flagKey}\\s+[^\\s]+`, 'g');
          existingFlags = existingFlags.replace(flagRegex, flag);
        } else {
          existingFlags = `${existingFlags} ${flag}`.trim();
        }
      });

      finalPrompt = `${promptBody.trim()}${existingFlags ? ` ${existingFlags}` : ''}`;
    } else {
      // For general or code models, append visual block
      const visualSummary = [
        lens ? `- Optika: ${lens}` : null,
        aperture ? `- Clona: ${aperture}` : null,
        color ? `- Tonalita: ${color}` : null,
        lighting ? `- Světlo: ${lighting}` : null,
        angle ? `- Kompozice: ${angle}` : null,
        ar ? `- Poměr stran: ${ar}` : null
      ].filter(Boolean).join('\n');

      finalPrompt = `${finalPrompt}\n\n[POŽADOVANÉ VIZUÁLNÍ PARAMETRY & OPTIKA]:\n${visualSummary}`;
    }
  }

  // 5. Model-specific structural synthesis for non-visual prompts
  if (model.id === 'claude-code') {
    const workflowBlock = contextDirectives.length > 0
      ? `<project_environment>\n${contextDirectives.join('\n\n')}\n</project_environment>\n\n`
      : '';
    const skillsBlock = activeSkillSnippets.length > 0
      ? `\n\n<system_skills>\n${activeSkillSnippets.join('\n')}\n</system_skills>`
      : '';
    finalPrompt = `${workflowBlock}${finalPrompt}${skillsBlock}`;
  } else if (model.id === 'cursor') {
    const workflowBlock = contextDirectives.length > 0
      ? `### KONTEXT WORKFLOW A FÁZE PROJEKTU:\n${contextDirectives.join('\n\n')}\n\n`
      : '';
    const skillsBlock = activeSkillSnippets.length > 0
      ? `\n\n### AKTIVNÍ SKILLY A PRAVIDLA KÓDOVÁNÍ:\n${activeSkillSnippets.join('\n')}`
      : '';
    finalPrompt = `${workflowBlock}${finalPrompt}${skillsBlock}`;
  } else if (model.id === 'midjourney' || model.id === 'nano-banana') {
    // Keep raw
  } else {
    const workflowBlock = contextDirectives.length > 0
      ? `--- WORKFLOW & FÁZE PROJEKTU ---\n${contextDirectives.join('\n\n')}\n\n`
      : '';
    const skillsBlock = activeSkillSnippets.length > 0
      ? `\n\n--- ARCHITEKTONICKÁ PRAVIDLA A SKILLY ---\n${activeSkillSnippets.join('\n')}`
      : '';
    finalPrompt = `${workflowBlock}${finalPrompt}${skillsBlock}`;
  }

  // 6. Metrics calculation
  const metrics = calculateMetrics(finalPrompt);

  return {
    rawPrompt: finalPrompt,
    formattedPrompt: finalPrompt,
    ...metrics
  };
}

export function formatExport(
  content: string,
  format: 'text' | 'markdown' | 'cursorrules' | 'claudemd' | 'json',
  metadata?: { title: string; modelName: string; workflowName?: string; phaseName?: string }
): { formatted: string; filename: string; mimeType: string } {
  switch (format) {
    case 'cursorrules':
      return {
        formatted: `# Cursor Rules - ${metadata?.title || 'Project'}
# Model: ${metadata?.modelName || 'Cursor'}
# Workflow: ${metadata?.workflowName || 'Default'}
# Phase: ${metadata?.phaseName || 'In-Progress'}
# Generated via PromptMatrix CZ

${content}
`,
        filename: '.cursorrules',
        mimeType: 'text/plain'
      };

    case 'claudemd':
      return {
        formatted: `# Claude Code Instructions
# Project: ${metadata?.title || 'Claude Project'}
# Workflow: ${metadata?.workflowName || 'General'}
# Phase: ${metadata?.phaseName || 'In-Progress'}

${content}
`,
        filename: 'CLAUDE.md',
        mimeType: 'text/markdown'
      };

    case 'json':
      return {
        formatted: JSON.stringify(
          {
            title: metadata?.title,
            model: metadata?.modelName,
            workflow: metadata?.workflowName,
            phase: metadata?.phaseName,
            exportedAt: new Date().toISOString(),
            prompt: content
          },
          null,
          2
        ),
        filename: 'prompt-export.json',
        mimeType: 'application/json'
      };

    case 'markdown':
      return {
        formatted: `# ${metadata?.title || 'AI Prompt'}
*Cílový model: ${metadata?.modelName || 'AI'}* | *Workflow: ${metadata?.workflowName || 'General'}* | *Fáze: ${metadata?.phaseName || 'Iteration'}*

${content}
`,
        filename: 'prompt.md',
        mimeType: 'text/markdown'
      };

    case 'text':
    default:
      return {
        formatted: content,
        filename: 'prompt.txt',
        mimeType: 'text/plain'
      };
  }
}
