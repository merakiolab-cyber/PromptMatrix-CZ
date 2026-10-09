import { PromptTemplate } from '../../types';

export const AI_WORKFLOWS_TEMPLATES: PromptTemplate[] = [
  {
    id: 'ai-workflow-subagent-orchestrator',
    title: 'Claude Code: Architektura Subagentů pro Tvorbu Aplikace',
    description: 'Pravidla pro autonomní rozpad velkého designerského projektu mezi specializované subagenty v terminálu.',
    modelId: 'claude-code',
    categoryId: 'ai-workflows',
    defaultWorkflow: 'repo-filesystem',
    defaultPhase: 'greenfield',
    tags: ['Subagenti', 'Architektura', 'Claude Code', 'Workflow'],
    authorFeedTip: 'Definujte přísné hranice pravomocí pro každého subagenta, aby nedocházelo ke kolizím v git repozitáři.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'sub-scope',
        key: 'project_scope',
        label: 'Rozsah projektu a moduly',
        type: 'text',
        value: 'Fullstack aplikace s dashboardem, Figma importem a PDF exportem',
        required: true
      }
    ],
    templateString: `<context>
Nastavuješ orchestraci subagentů pro projekt: {{project_scope}}.
</context>

<task>
Definuj role 3 subagentů:
1. UI/UX Front-end specialista
2. Data & API architekt
3. QA & Test validator
</task>`
  },

  {
    id: 'ai-workflow-cursorrules-monorepo',
    title: 'Cursor & Windsurf: Tvorba .cursorrules pro Turborepo / Monorepo',
    description: 'Generování autoritativního .cursorrules souboru pro TypeScript monorepo se sdíleným balíčkem komponent @ui/core.',
    modelId: 'cursor',
    categoryId: 'ai-workflows',
    defaultWorkflow: 'repo-filesystem',
    defaultPhase: 'greenfield',
    tags: ['Cursorrules', 'Monorepo', 'Turborepo', 'TypeScript'],
    authorFeedTip: 'Zakažte AI upravovat interní soubory v apps/* pokud je úkol definován pro packages/ui.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'cr-stack',
        key: 'monorepo_stack',
        label: 'Struktura monorepa',
        type: 'text',
        value: 'Turborepo: apps/web (Next.js 15), apps/docs, packages/ui (Tailwind v4), packages/tsconfig',
        required: true
      }
    ],
    templateString: `<context>
Vytváříš produkční .cursorrules pro monorepo: {{monorepo_stack}}.
</context>`
  },

  {
    id: 'ai-workflow-screenshot-to-code',
    title: 'Multimodal AI: Screenshot UI do Čistého React + Tailwind Kódu',
    description: 'Převod nahraného screenshotu nebo mockupu obrazovky na sémantický, přístupný JSX kód s věrnými barvami.',
    modelId: 'gemini-pro',
    categoryId: 'ai-workflows',
    defaultWorkflow: 'web-frontend',
    defaultPhase: 'iteration',
    tags: ['Screenshot to Code', 'Multimodal', 'React', 'Tailwind'],
    authorFeedTip: 'Detailně popište stavové prvky (hover, active, focus), které ze statického obrázku nejsou vidět.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 's2c-screen',
        key: 'screen_description',
        label: 'Popis obrazovky ze screenshotu',
        type: 'text',
        value: 'Moderní nastavení uživatelského účtu s přepínači notifikací, 2FA autentizací a historií přihlášení',
        required: true
      }
    ],
    templateString: `<context>
Analyzuješ dodaný screenshot a převádíš jej na produkční kód: {{screen_description}}.
</context>`
  }
];
