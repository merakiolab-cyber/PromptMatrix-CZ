/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  CategoryId,
  ModelId,
  PromptTemplate,
  PromptVariable,
  ModelDefinition,
  HistoryItem,
  WorkflowTarget,
  ProjectPhase,
  VisualPropositions
} from './types';
import { AI_MODELS } from './data/models';
import { DEFAULT_TEMPLATES } from './data/templates';
import { compilePrompt, calculateMetrics } from './utils/promptCompiler';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ModelSelector } from './components/ModelSelector';
import { SkillMatrix } from './components/SkillMatrix';
import { PowerKeywords } from './components/PowerKeywords';
import { VariableEditor } from './components/VariableEditor';
import { PromptPreview } from './components/PromptPreview';
import { HistoryDrawer } from './components/HistoryDrawer';
import { CustomTemplateModal } from './components/CustomTemplateModal';
import { TemplatesView } from './components/TemplatesView';
import { SkillsView } from './components/SkillsView';
import { VisualPropsControls } from './components/VisualPropsControls';
import { SaveToFolderModal } from './components/SaveToFolderModal';
import { FoldersView } from './components/FoldersView';
import { Toast } from './components/Toast';
import { PromptFolder, SavedPrompt } from './types';
import { usePromptHistory, EditorSnapshot } from './hooks/usePromptHistory';

const STORAGE_KEYS = {
  TEMPLATES: 'promptmatrix_templates_v2',
  HISTORY: 'promptmatrix_history_v2',
  MODELS: 'promptmatrix_models_v2',
  ACTIVE_TEMPLATE_ID: 'promptmatrix_active_template_v2',
  FOLDERS: 'promptmatrix_folders_v2',
  SAVED_PROMPTS: 'promptmatrix_saved_prompts_v2'
};

const DEFAULT_FOLDERS: PromptFolder[] = [
  {
    id: 'fld_fintech',
    name: 'Zakázka: Redesign Web & CI 2026',
    clientName: 'FinTech Corp',
    description: 'Kompletní podklady, design tokeny a UI komponenty pro nový klientský portál',
    color: '#10b981',
    createdAt: '2026-10-06'
  },
  {
    id: 'fld_meraki',
    name: 'Klient: Meraki Lab Studio',
    clientName: 'Meraki Lab',
    description: 'B2B nabídky, klientské maily, branding a Figma MCP skripty',
    color: '#3b82f6',
    createdAt: '2026-10-06'
  },
  {
    id: 'fld_cli_internal',
    name: 'Interní CLI Skripty & Filesystem',
    clientName: 'Interní',
    description: 'Dávkové operace na disku, organizace složek a lokalizační glosáře',
    color: '#f59e0b',
    createdAt: '2026-10-06'
  }
];

export default function App() {
  // 1. Templates State (Default + Saved custom templates)
  const [templates, setTemplates] = useState<PromptTemplate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
      if (saved) {
        const parsed = JSON.parse(saved);
        const defaultsMap = new Map(DEFAULT_TEMPLATES.map((t) => [t.id, t]));
        parsed.forEach((p: PromptTemplate) => {
          if (defaultsMap.has(p.id)) {
            defaultsMap.get(p.id)!.isFavorite = p.isFavorite;
          }
        });
        // Preserve any custom templates or templates added by user not in default templates
        const userAddedTemplates = parsed.filter((p: PromptTemplate) => p.isCustom || !defaultsMap.has(p.id));
        return [...Array.from(defaultsMap.values()), ...userAddedTemplates];
      }
    } catch {
      // Fallback
    }
    return DEFAULT_TEMPLATES;
  });

  // 2. Active Template & Current Variables State
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_TEMPLATE_ID);
    if (saved && DEFAULT_TEMPLATES.some((t) => t.id === saved)) {
      return saved;
    }
    return DEFAULT_TEMPLATES[0].id;
  });

  const activeTemplate = useMemo(() => {
    return templates.find((t) => t.id === selectedTemplateId) || templates[0];
  }, [templates, selectedTemplateId]);

  // Working copy of variables for the currently loaded template
  const [currentVariables, setCurrentVariables] = useState<PromptVariable[]>(
    activeTemplate.variables
  );

  // Workflow Target & Project Phase (Both can be null/turned off by clicking)
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTarget | null>(
    activeTemplate.defaultWorkflow !== undefined ? activeTemplate.defaultWorkflow : 'web-frontend'
  );
  const [selectedPhase, setSelectedPhase] = useState<ProjectPhase | null>(
    activeTemplate.defaultPhase !== undefined ? activeTemplate.defaultPhase : 'iteration'
  );

  // Manual live override for prompt editing in right preview window
  const [manualPromptText, setManualPromptText] = useState<string | null>(null);

  // Visual Propositions (Lens, Aperture, Lighting, Color, Aspect Ratio)
  const [visualProps, setVisualProps] = useState<VisualPropositions>({
    lens: 'default',
    aperture: 'default',
    colorTonality: 'default',
    lighting: 'default',
    realism: 'default',
    aspectRatio: 'default',
    cameraAngle: 'default'
  });

  const handleResetVisualProps = useCallback(() => {
    setVisualProps({
      lens: 'default',
      aperture: 'default',
      colorTonality: 'default',
      lighting: 'default',
      realism: 'default',
      aspectRatio: 'default',
      cameraAngle: 'default'
    });
  }, []);

  // Sync variables and defaults whenever selected template changes
  useEffect(() => {
    setCurrentVariables(activeTemplate.variables.map((v) => ({ ...v })));
    setSelectedWorkflow(
      activeTemplate.defaultWorkflow !== undefined ? activeTemplate.defaultWorkflow : null
    );
    setSelectedPhase(
      activeTemplate.defaultPhase !== undefined ? activeTemplate.defaultPhase : null
    );
    setManualPromptText(null);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TEMPLATE_ID, activeTemplate.id);
  }, [activeTemplate]);

  // 3. Models and Skills State
  const [models, setModels] = useState<ModelDefinition[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MODELS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return AI_MODELS;
  });

  const [selectedModelId, setSelectedModelId] = useState<ModelId>(activeTemplate.modelId);

  useEffect(() => {
    setSelectedModelId(activeTemplate.modelId);
  }, [activeTemplate.modelId]);

  const activeModel = useMemo(() => {
    return models.find((m) => m.id === selectedModelId) || models[0];
  }, [models, selectedModelId]);

  // 4. Categories & Search Filter
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // 5. History State
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [copiedHistoryId, setCopiedHistoryId] = useState<string | null>(null);

  // 6. Navigation View & Middle Column Tabs
  const [activeView, setActiveView] = useState<'editor' | 'templates' | 'skills' | 'folders'>('editor');
  const [middleTab, setMiddleTab] = useState<'variables' | 'model' | 'visual' | 'skills' | 'all'>('variables');

  // 7. Modals & UI States
  const [isCustomTemplateModalOpen, setIsCustomTemplateModalOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState<PromptTemplate | null>(null);
  const [focusedVariableId, setFocusedVariableId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // 8. Folders & Saved Prompts State
  const [folders, setFolders] = useState<PromptFolder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FOLDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_FOLDERS;
  });

  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_PROMPTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  const [isSaveToFolderModalOpen, setIsSaveToFolderModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  const handleCreateFolder = useCallback((name: string, clientName?: string, color?: string): PromptFolder => {
    const newFolder: PromptFolder = {
      id: `fld_${Date.now()}`,
      name,
      clientName,
      color: color || '#10b981',
      createdAt: new Date().toISOString()
    };
    setFolders((prev) => [newFolder, ...prev]);
    return newFolder;
  }, []);

  const handleUpdateFolder = useCallback((id: string, name: string, clientName?: string, color?: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name, clientName, color } : f))
    );
  }, []);

  const handleDeleteFolder = useCallback((id: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
    setSavedPrompts((prev) => prev.map((p) => (p.folderId === id ? { ...p, folderId: null } : p)));
  }, []);

  const handleSavePromptToFolder = useCallback((data: Omit<SavedPrompt, 'id' | 'createdAt'>) => {
    const newSaved: SavedPrompt = {
      ...data,
      id: `sp_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setSavedPrompts((prev) => [newSaved, ...prev]);
    const targetFolder = folders.find((f) => f.id === data.folderId);
    setToastMessage(`Prompt byl úspěšně uložen do zakázky "${targetFolder ? targetFolder.name : 'Bez složky'}"`);
  }, [folders]);

  const handleDeleteSavedPrompt = useCallback((id: string) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleLoadSavedPrompt = useCallback((sp: SavedPrompt) => {
    setManualPromptText(sp.promptText);
    setSelectedModelId(sp.modelId);
    if (sp.workflowTarget !== undefined) setSelectedWorkflow(sp.workflowTarget);
    if (sp.projectPhase !== undefined) setSelectedPhase(sp.projectPhase);
    setActiveView('editor');
    setToastMessage(`Načten uložený prompt "${sp.title}"`);
  }, []);

  const handleMovePromptFolder = useCallback((promptId: string, targetFolderId: string | null) => {
    setSavedPrompts((prev) =>
      prev.map((p) => (p.id === promptId ? { ...p, folderId: targetFolderId } : p))
    );
  }, []);

  // 9. Undo / Redo History Stack
  const initialSnapshot: EditorSnapshot = useMemo(() => ({
    templateId: selectedTemplateId,
    variables: currentVariables,
    manualPromptText: manualPromptText,
    modelId: selectedModelId,
    workflowTarget: selectedWorkflow,
    projectPhase: selectedPhase,
    visualProps: visualProps
  }), []);

  const {
    canUndo,
    canRedo,
    recordSnapshot,
    undo,
    redo
  } = usePromptHistory(initialSnapshot);

  // Debounced recording of snapshot whenever editor state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      recordSnapshot({
        templateId: selectedTemplateId,
        variables: currentVariables,
        manualPromptText: manualPromptText,
        modelId: selectedModelId,
        workflowTarget: selectedWorkflow,
        projectPhase: selectedPhase,
        visualProps: visualProps
      });
    }, 350);
    return () => clearTimeout(timer);
  }, [selectedTemplateId, currentVariables, manualPromptText, selectedModelId, selectedWorkflow, selectedPhase, visualProps, recordSnapshot]);

  const handleUndo = useCallback(() => {
    const restored = undo();
    if (restored) {
      if (restored.templateId !== selectedTemplateId) {
        setSelectedTemplateId(restored.templateId);
      }
      setCurrentVariables(restored.variables);
      setManualPromptText(restored.manualPromptText);
      setSelectedModelId(restored.modelId);
      setSelectedWorkflow(restored.workflowTarget);
      setSelectedPhase(restored.projectPhase);
      setVisualProps(restored.visualProps);
      setToastMessage('Zpět (Undo) ↩️');
    }
  }, [undo, selectedTemplateId]);

  const handleRedo = useCallback(() => {
    const restored = redo();
    if (restored) {
      if (restored.templateId !== selectedTemplateId) {
        setSelectedTemplateId(restored.templateId);
      }
      setCurrentVariables(restored.variables);
      setManualPromptText(restored.manualPromptText);
      setSelectedModelId(restored.modelId);
      setSelectedWorkflow(restored.workflowTarget);
      setSelectedPhase(restored.projectPhase);
      setVisualProps(restored.visualProps);
      setToastMessage('Znovu (Redo) ↪️');
    }
  }, [redo, selectedTemplateId]);

  // Save templates & models & history to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MODELS, JSON.stringify(models));
  }, [models]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  }, [history]);

  // Compile prompt in real-time with Workflow, Phase & Visual Propositions context
  const compilationResult = useMemo(() => {
    return compilePrompt(activeTemplate, currentVariables, activeModel, {
      workflowTarget: selectedWorkflow,
      projectPhase: selectedPhase,
      visualProps: visualProps
    });
  }, [activeTemplate, currentVariables, activeModel, selectedWorkflow, selectedPhase, visualProps]);

  // Active prompt: manual edits take precedence over auto-compiled output
  const activePromptText = manualPromptText !== null ? manualPromptText : compilationResult.formattedPrompt;
  const isManuallyEdited = manualPromptText !== null;

  // Copy Prompt to Clipboard Action
  const handleCopyPrompt = useCallback(() => {
    const textToCopy = manualPromptText !== null ? manualPromptText : compilationResult.formattedPrompt;
    const metrics = calculateMetrics(textToCopy);

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setToastMessage('Prompt byl úspěšně zkopírován do schránky!');

      // Record to history
      const newHistoryItem: HistoryItem = {
        id: `hist_${Date.now()}`,
        templateId: activeTemplate.id,
        templateTitle: activeTemplate.title,
        modelId: activeModel.id,
        categoryId: activeTemplate.categoryId,
        workflowTarget: selectedWorkflow,
        projectPhase: selectedPhase,
        compiledPrompt: textToCopy,
        variables: currentVariables.reduce<Record<string, string>>((acc, v) => {
          acc[v.key] = v.value;
          return acc;
        }, {}),
        createdAt: new Date().toISOString(),
        tokensEstimate: metrics.tokenEstimate,
        wordCount: metrics.wordCount
      };

      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 49)]);

      setTimeout(() => {
        setIsCopied(false);
      }, 2500);
    });
  }, [manualPromptText, compilationResult, activeTemplate, activeModel, currentVariables, selectedWorkflow, selectedPhase]);

  // Keyboard shortcut listener (Cmd+Z / Ctrl+Z for Undo, Cmd+Shift+Z for Redo, Cmd+Enter for Copy)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
        if (!isInput || e.shiftKey) {
          if (e.shiftKey) {
            e.preventDefault();
            handleRedo();
          } else if (!isInput) {
            e.preventDefault();
            handleUndo();
          }
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleCopyPrompt();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleCopyPrompt]);

  // Variable Updates
  const handleUpdateVariable = (id: string, value: string) => {
    setCurrentVariables((prev) =>
      prev.map((v) => (v.id === id ? { ...v, value } : v))
    );
  };

  const handleAddVariable = (newVar: PromptVariable) => {
    setCurrentVariables((prev) => [...prev, newVar]);
    setToastMessage(`Proměnná {{${newVar.key}}} přidána!`);
  };

  const handleDeleteVariable = (id: string) => {
    setCurrentVariables((prev) => prev.filter((v) => v.id !== id));
  };

  const handleResetVariables = () => {
    setCurrentVariables(activeTemplate.variables.map((v) => ({ ...v })));
    setToastMessage('Hodnoty proměnných byly resetovány na výchozí.');
  };

  // Model Skills Toggling
  const handleToggleSkill = (skillId: string) => {
    setModels((prevModels) =>
      prevModels.map((m) => {
        if (m.id === selectedModelId) {
          return {
            ...m,
            recommendedSkills: m.recommendedSkills.map((s) =>
              s.id === skillId ? { ...s, enabled: !s.enabled } : s
            )
          };
        }
        return m;
      })
    );
  };

  const handleEnableAllSkills = (modelId: string) => {
    setModels((prevModels) =>
      prevModels.map((m) => {
        if (m.id === modelId) {
          return {
            ...m,
            recommendedSkills: m.recommendedSkills.map((s) => ({ ...s, enabled: true }))
          };
        }
        return m;
      })
    );
  };

  const handleResetSkills = (modelId: string) => {
    const defaultModel = AI_MODELS.find((m) => m.id === modelId);
    if (!defaultModel) return;
    setModels((prevModels) =>
      prevModels.map((m) => {
        if (m.id === modelId) {
          return {
            ...m,
            recommendedSkills: defaultModel.recommendedSkills.map((s) => ({ ...s }))
          };
        }
        return m;
      })
    );
    setToastMessage('Skilly modelu resetovány na doporučené nastavení.');
  };

  // Keyword insertion into active variable
  const handleInsertKeyword = (keyword: string) => {
    let targetVar = currentVariables.find((v) => v.id === focusedVariableId);
    if (!targetVar) {
      targetVar = currentVariables.find((v) => v.type === 'textarea') || currentVariables[0];
    }

    if (targetVar) {
      const updatedValue = targetVar.value ? `${targetVar.value}, ${keyword}` : keyword;
      handleUpdateVariable(targetVar.id, updatedValue);
      setToastMessage(`Klíčové slovo "${keyword}" vloženo do {{${targetVar.key}}}`);
    }
  };

  // Template Management
  const handleToggleFavorite = (templateId: string) => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === templateId ? { ...t, isFavorite: !t.isFavorite } : t
      )
    );
  };

  const handleSaveCustomTemplate = (newTemplate: PromptTemplate) => {
    setTemplates((prev) => {
      const exists = prev.some((t) => t.id === newTemplate.id);
      if (exists) {
        return prev.map((t) => (t.id === newTemplate.id ? newTemplate : t));
      } else {
        return [newTemplate, ...prev];
      }
    });
    setSelectedTemplateId(newTemplate.id);
    setActiveView('editor');
    setToastMessage(templateToEdit ? `Šablona "${newTemplate.title}" byla aktualizována!` : `Vlastní šablona "${newTemplate.title}" uložena!`);
    setTemplateToEdit(null);
  };

  const handleEditTemplate = useCallback((template: PromptTemplate) => {
    setTemplateToEdit(template);
    setIsCustomTemplateModalOpen(true);
  }, []);

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== templateId));
    if (selectedTemplateId === templateId) {
      setSelectedTemplateId(DEFAULT_TEMPLATES[0].id);
    }
    setToastMessage('Šablona byla smazána.');
  };

  // History Restoration
  const handleRestoreFromHistory = (item: HistoryItem) => {
    setSelectedModelId(item.modelId);
    setSelectedWorkflow(item.workflowTarget !== undefined ? item.workflowTarget : null);
    setSelectedPhase(item.projectPhase !== undefined ? item.projectPhase : null);
    if (item.templateId && templates.some((t) => t.id === item.templateId)) {
      setSelectedTemplateId(item.templateId);
    }
    setCurrentVariables((prev) =>
      prev.map((v) => {
        if (item.variables[v.key] !== undefined) {
          return { ...v, value: item.variables[v.key] };
        }
        return v;
      })
    );
    setManualPromptText(item.compiledPrompt);
    setActiveView('editor');
    setToastMessage(`Načten předchozí dotaz z historie (${item.templateTitle})`);
  };

  const handleCopyHistoryItem = (item: HistoryItem) => {
    navigator.clipboard.writeText(item.compiledPrompt).then(() => {
      setCopiedHistoryId(item.id);
      setTimeout(() => setCopiedHistoryId(null), 1800);
    });
  };

  const activeFocusedVar = currentVariables.find((v) => v.id === focusedVariableId);

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-black text-zinc-100 selection:bg-white selection:text-black">
      {/* 1. Header (Vercel Top Bar) */}
      <Header
        onCopyPrompt={handleCopyPrompt}
        onOpenNewTemplate={() => {
          setTemplateToEdit(null);
          setIsCustomTemplateModalOpen(true);
        }}
        onToggleHistory={() => setIsHistoryOpen((prev) => !prev)}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        historyCount={history.length}
        templatesCount={templates.length}
        foldersCount={folders.length}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* 2. Main Content View Router */}
      {activeView === 'templates' ? (
        <main className="flex-1 overflow-y-auto">
          <TemplatesView
            templates={templates}
            models={models}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectTemplate={(id) => {
              setSelectedTemplateId(id);
              setActiveView('editor');
            }}
            onToggleFavorite={handleToggleFavorite}
            onDeleteTemplate={handleDeleteTemplate}
            onEditTemplate={handleEditTemplate}
            onOpenNewTemplateModal={() => {
              setTemplateToEdit(null);
              setIsCustomTemplateModalOpen(true);
            }}
          />
        </main>
      ) : activeView === 'skills' ? (
        <main className="flex-1 overflow-y-auto">
          <SkillsView
            models={models}
            onToggleSkill={(mId, sId) => {
              setModels((prev) =>
                prev.map((m) =>
                  m.id === mId
                    ? {
                        ...m,
                        recommendedSkills: m.recommendedSkills.map((s) =>
                          s.id === sId ? { ...s, enabled: !s.enabled } : s
                        )
                      }
                    : m
                )
              );
            }}
            onEnableAllModelSkills={handleEnableAllSkills}
            onResetModelSkills={handleResetSkills}
          />
        </main>
      ) : activeView === 'folders' ? (
        <main className="flex-1 overflow-hidden">
          <FoldersView
            folders={folders}
            savedPrompts={savedPrompts}
            onCreateFolder={handleCreateFolder}
            onUpdateFolder={handleUpdateFolder}
            onDeleteFolder={handleDeleteFolder}
            onDeleteSavedPrompt={handleDeleteSavedPrompt}
            onLoadSavedPrompt={handleLoadSavedPrompt}
            onMovePromptFolder={handleMovePromptFolder}
          />
        </main>
      ) : (
        /* 3. Primary Editor Layout (Enlarged 4K & Ultrawide Grid) */
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Left Panel: Topics, Templates & Search */}
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            templates={templates}
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={setSelectedTemplateId}
            onToggleFavorite={handleToggleFavorite}
            onOpenNewTemplateModal={() => {
              setTemplateToEdit(null);
              setIsCustomTemplateModalOpen(true);
            }}
            onEditTemplate={handleEditTemplate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onlyFavorites={onlyFavorites}
            onToggleOnlyFavorites={() => setOnlyFavorites((prev) => !prev)}
          />

          {/* Middle & Right Content Area */}
          <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 overflow-hidden divide-y xl:divide-y-0 xl:divide-x divide-zinc-800 min-h-0">
            {/* Middle Column: Model, Workflow, Phase, Variables & Keywords */}
            <div className="xl:col-span-6 2xl:col-span-6 p-3 md:p-4 overflow-y-auto space-y-4 h-full">
              {/* Template Title Banner */}
              <div className="pb-2.5 border-b border-zinc-800">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="text-zinc-300 font-medium">{activeTemplate.categoryId.toUpperCase()}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="text-zinc-500">{activeTemplate.tags?.join(', ')}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                    {activeModel.shortName}
                  </span>
                </div>
                <h1 className="text-base md:text-lg font-bold text-white tracking-tight">
                  {activeTemplate.title}
                </h1>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  {activeTemplate.description}
                </p>
                {activeTemplate.authorFeedTip && (
                  <p className="text-[11px] text-zinc-500 font-mono mt-1 italic">
                    💡 {activeTemplate.authorFeedTip}
                  </p>
                )}
              </div>

              {/* Middle Section Tabs Switcher */}
              <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-xl overflow-x-auto text-xs font-medium">
                <button
                  onClick={() => setMiddleTab('variables')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    middleTab === 'variables'
                      ? 'bg-zinc-800 text-white font-semibold shadow-sm border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>✍️ Proměnné</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {currentVariables.length}
                  </span>
                </button>

                <button
                  onClick={() => setMiddleTab('model')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    middleTab === 'model'
                      ? 'bg-zinc-800 text-white font-semibold shadow-sm border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>🎛️ Nástroj & Workflow</span>
                </button>

                <button
                  onClick={() => setMiddleTab('visual')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    middleTab === 'visual'
                      ? 'bg-zinc-800 text-white font-semibold shadow-sm border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>📷 Optika & Vizuál</span>
                </button>

                <button
                  onClick={() => setMiddleTab('skills')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    middleTab === 'skills'
                      ? 'bg-zinc-800 text-white font-semibold shadow-sm border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>⚡ Skilly</span>
                </button>

                <button
                  onClick={() => setMiddleTab('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    middleTab === 'all'
                      ? 'bg-zinc-800 text-white font-semibold shadow-sm border border-zinc-700/60'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span>📜 Vše</span>
                </button>
              </div>

              {/* Render Tab Contents */}
              {(middleTab === 'variables' || middleTab === 'all') && (
                <>
                  <VariableEditor
                    variables={currentVariables}
                    onUpdateVariable={handleUpdateVariable}
                    onAddVariable={handleAddVariable}
                    onDeleteVariable={handleDeleteVariable}
                    onResetVariables={handleResetVariables}
                    focusedVariableId={focusedVariableId}
                    setFocusedVariableId={setFocusedVariableId}
                  />

                  <PowerKeywords
                    categories={activeModel.powerKeywords}
                    onInsertKeyword={handleInsertKeyword}
                    activeVariableName={activeFocusedVar?.label}
                  />
                </>
              )}

              {(middleTab === 'model' || middleTab === 'all') && (
                <ModelSelector
                  models={models}
                  selectedModelId={selectedModelId}
                  onSelectModel={setSelectedModelId}
                  selectedWorkflow={selectedWorkflow}
                  onSelectWorkflow={setSelectedWorkflow}
                  selectedPhase={selectedPhase}
                  onSelectPhase={setSelectedPhase}
                  selectedCategoryId={activeTemplate.categoryId}
                />
              )}

              {(middleTab === 'visual' || middleTab === 'all') && (
                <VisualPropsControls
                  visualProps={visualProps}
                  onChangeVisualProps={setVisualProps}
                  onResetVisualProps={handleResetVisualProps}
                />
              )}

              {(middleTab === 'skills' || middleTab === 'all') && (
                <SkillMatrix
                  skills={activeModel.recommendedSkills}
                  onToggleSkill={handleToggleSkill}
                  onEnableAll={() => handleEnableAllSkills(selectedModelId)}
                  onResetSkills={() => handleResetSkills(selectedModelId)}
                  modelName={activeModel.shortName}
                />
              )}
            </div>

            {/* Right Column: Live Real-Time Prompt Preview & Instant Clipboard Export */}
            <div className="xl:col-span-6 2xl:col-span-6 p-3 md:p-4 h-full overflow-hidden flex flex-col justify-start min-h-0">
              <PromptPreview
                promptText={activePromptText}
                onPromptChange={(newText) => setManualPromptText(newText)}
                isManuallyEdited={isManuallyEdited}
                onResetToTemplate={() => {
                  setManualPromptText(null);
                  setToastMessage('Prompt byl resetován na automaticky vygenerovanou šablonu.');
                }}
                onCopy={handleCopyPrompt}
                onSaveToFolder={() => setIsSaveToFolderModalOpen(true)}
                isCopied={isCopied}
                model={activeModel}
                templateTitle={activeTemplate.title}
                workflowTarget={selectedWorkflow}
                projectPhase={selectedPhase}
              />
            </div>
          </main>
        </div>
      )}

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onRestore={handleRestoreFromHistory}
        onCopyItem={handleCopyHistoryItem}
        onDeleteItem={(id) => setHistory((prev) => prev.filter((h) => h.id !== id))}
        onClearHistory={() => setHistory([])}
        copiedId={copiedHistoryId}
      />

      {/* Custom Template Modal */}
      {isCustomTemplateModalOpen && (
        <CustomTemplateModal
          isOpen={isCustomTemplateModalOpen}
          onClose={() => {
            setIsCustomTemplateModalOpen(false);
            setTemplateToEdit(null);
          }}
          initialTemplate={templateToEdit}
          onSaveTemplate={handleSaveCustomTemplate}
        />
      )}

      {/* Save to Folder Modal */}
      <SaveToFolderModal
        isOpen={isSaveToFolderModalOpen}
        onClose={() => setIsSaveToFolderModalOpen(false)}
        promptText={activePromptText}
        templateTitle={activeTemplate.title}
        modelId={activeModel.id}
        workflowTarget={selectedWorkflow}
        projectPhase={selectedPhase}
        folders={folders}
        onCreateFolder={handleCreateFolder}
        onSavePrompt={handleSavePromptToFolder}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
