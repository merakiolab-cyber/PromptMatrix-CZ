export type ModelId =
  | 'claude-code'
  | 'cursor'
  | 'midjourney'
  | 'nano-banana'
  | 'gemini-pro'
  | 'gpt-o3';

export type CategoryId =
  | 'all'
  | 'ui-ux-design'
  | 'webdesign-apps'
  | 'cli-filesystem-email'
  | '3d-blender'
  | 'photo-images'
  | 'mockups-packaging'
  | 'ai-workflows'
  | 'vibecoding'
  | 'adobe-suite'
  | 'motion-animation'
  | 'brand-identity'
  | 'ideamaking-direction'
  | 'print-prepress';

export type ProjectPhase =
  | 'greenfield'
  | 'iteration'
  | 'polish'
  | 'ship';

export type WorkflowTarget =
  | 'web-frontend'
  | 'fullstack-api'
  | 'repo-filesystem'
  | 'local-filesystem-ops'
  | 'business-email-ops'
  | 'ui-localization-ops'
  | 'git-cicd'
  | 'figma-mcp-claudecode'
  | 'svg-vector-gen'
  | 'svg-icon-system'
  | 'blender-script'
  | 'blender-gn'
  | 'threejs-webgl'
  | 'photoshop-uxp'
  | 'indesign-extendscript'
  | 'illustrator-script'
  | 'aftereffects-motion'
  | 'video-davinci-premiere'
  | 'figma-tokens'
  | 'figma-plugin'
  | 'asset-pipeline'
  | 'midjourney-generator'
  | 'sound-sfx'
  | 'tech-documentation'
  | 'print-prepress-flow';

export interface WorkflowTargetDefinition {
  id: WorkflowTarget;
  name: string;
  shortName: string;
  category: string;
  description: string;
  ruleDirective: string;
}

export interface ProjectPhaseDefinition {
  id: ProjectPhase;
  name: string;
  badge: string;
  description: string;
  directiveSnippet: string;
}

export interface ModelSkill {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  ruleSnippet: string;
}

export interface KeywordCategory {
  category: string;
  keywords: string[];
}

export interface ModelDefinition {
  id: ModelId;
  name: string;
  shortName: string;
  badge: string;
  description: string;
  framework: string;
  recommendedSkills: ModelSkill[];
  powerKeywords: KeywordCategory[];
  defaultExportFormat: 'text' | 'markdown' | 'cursorrules' | 'claudemd' | 'json';
}

export interface PromptVariable {
  id: string;
  key: string;
  label: string;
  description?: string;
  placeholder?: string;
  type: 'text' | 'textarea' | 'select' | 'tags';
  options?: string[];
  value: string;
  required?: boolean;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  modelId: ModelId;
  categoryId: CategoryId;
  defaultWorkflow?: WorkflowTarget | null;
  defaultPhase?: ProjectPhase | null;
  variables: PromptVariable[];
  templateString: string;
  isCustom?: boolean;
  isFavorite?: boolean;
  tags: string[];
  authorFeedTip?: string;
  createdAt: string;
}

export interface HistoryItem {
  id: string;
  templateId?: string;
  templateTitle: string;
  modelId: ModelId;
  categoryId: CategoryId;
  workflowTarget?: WorkflowTarget | null;
  projectPhase?: ProjectPhase | null;
  compiledPrompt: string;
  variables: Record<string, string>;
  createdAt: string;
  tokensEstimate: number;
  wordCount: number;
}

export interface VisualPropositions {
  lens?: string;
  aperture?: string;
  colorTonality?: string;
  lighting?: string;
  realism?: string;
  aspectRatio?: string;
  cameraAngle?: string;
}

export interface PromptFolder {
  id: string;
  name: string;
  clientName?: string;
  description?: string;
  color?: string;
  createdAt: string;
}

export interface SavedPrompt {
  id: string;
  folderId?: string | null;
  title: string;
  promptText: string;
  modelId: ModelId;
  templateTitle?: string;
  workflowTarget?: WorkflowTarget | null;
  projectPhase?: ProjectPhase | null;
  tags?: string[];
  notes?: string;
  createdAt: string;
}

export type ExportFormat = 'text' | 'markdown' | 'cursorrules' | 'claudemd' | 'json';
