import React from 'react';
import {
  ModelDefinition,
  ModelId,
  WorkflowTarget,
  ProjectPhase,
  CategoryId
} from '../types';
import { WORKFLOW_TARGETS, PROJECT_PHASES } from '../data/workflows';
import { checkModelWorkflowCompatibility, MODEL_DOMAINS } from '../utils/compatibility';
import { Cpu, ShieldCheck, Layers, GitBranch, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ModelSelectorProps {
  models: ModelDefinition[];
  selectedModelId: ModelId;
  onSelectModel: (modelId: ModelId) => void;
  selectedWorkflow: WorkflowTarget | null;
  onSelectWorkflow: (workflow: WorkflowTarget | null) => void;
  selectedPhase: ProjectPhase | null;
  onSelectPhase: (phase: ProjectPhase | null) => void;
  selectedCategoryId?: CategoryId;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModelId,
  onSelectModel,
  selectedWorkflow,
  onSelectWorkflow,
  selectedPhase,
  onSelectPhase,
  selectedCategoryId
}) => {
  const currentModel = models.find((m) => m.id === selectedModelId) || models[0];
  const activeSkillsCount = currentModel.recommendedSkills.filter((s) => s.enabled).length;

  // Real-time intelligent compatibility validation
  const compatibility = checkModelWorkflowCompatibility(
    selectedModelId,
    selectedWorkflow,
    selectedCategoryId
  );

  const modelDomain = MODEL_DOMAINS[selectedModelId];

  return (
    <div className="space-y-4">
      {/* Compatibility Warning Box (if model and workflow mismatch) */}
      {!compatibility.isCompatible && (
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/80 text-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-amber-300">
                {compatibility.title}
              </div>
              <p className="text-[11px] text-amber-200/90 leading-relaxed">
                {compatibility.message}
              </p>
            </div>
          </div>

          {compatibility.recommendedModelId && (
            <button
              onClick={() => onSelectModel(compatibility.recommendedModelId!)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-sm cursor-pointer"
            >
              <span>Přepnout na {models.find((m) => m.id === compatibility.recommendedModelId)?.shortName}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* 1. Cílový AI Nástroj & Model */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-zinc-300" />
            <span>Cílový AI Nástroj</span>
          </label>
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-white font-medium">{activeSkillsCount}</span>
            <span>skillů aktivních</span>
          </div>
        </div>

        {/* AI Tools selector grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2">
          {models.map((model) => {
            const isSelected = model.id === selectedModelId;
            const isModelCompatibleWithWf = !selectedWorkflow || !MODEL_DOMAINS[model.id]?.incompatibleWorkflows.includes(selectedWorkflow);

            return (
              <button
                key={model.id}
                onClick={() => onSelectModel(model.id)}
                className={`p-2.5 rounded-lg border text-left transition-all relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 border-zinc-400 shadow-sm text-white ring-1 ring-zinc-400/40'
                    : isModelCompatibleWithWf
                    ? 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 text-zinc-400'
                    : 'bg-zinc-950/40 border-zinc-850 text-zinc-600 hover:text-zinc-400 hover:border-zinc-750'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span
                    className={`text-xs font-medium truncate ${
                      isSelected ? 'text-white font-semibold' : 'text-zinc-300 group-hover:text-white'
                    }`}
                  >
                    {model.shortName}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                  )}
                </div>
                <p className="text-[10px] text-zinc-500 line-clamp-1 leading-snug">
                  {model.badge}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Cílové Workflow & Prostředí (S možností vypnutí / odkliknutí myší) */}
      <div className="space-y-2 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>Cílové Workflow / Účel Promptu</span>
            <span className="text-[10px] lowercase text-zinc-500 font-normal">
              (kliknutím vypnete / zapnete)
            </span>
          </label>
          <div className="flex items-center gap-2">
            {selectedWorkflow ? (
              <button
                onClick={() => onSelectWorkflow(null)}
                className="text-[10px] font-mono text-zinc-400 hover:text-red-400 bg-zinc-900 hover:bg-zinc-850 px-2 py-0.5 rounded border border-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
                title="Vypnout zohlednění workflow"
              >
                <span>Vypnout workflow</span>
                <span className="text-zinc-500">✕</span>
              </button>
            ) : (
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800/60">
                Workflow: Vypnuto
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-1.5">
          {WORKFLOW_TARGETS.map((wf) => {
            const isSelected = selectedWorkflow === wf.id;
            const isSupported = modelDomain ? modelDomain.compatibleWorkflows.includes(wf.id) : true;

            return (
              <button
                key={wf.id}
                onClick={() => {
                  // If already selected, clicking it again toggles it off!
                  onSelectWorkflow(isSelected ? null : wf.id);
                }}
                className={`px-2.5 py-1.5 rounded-md border text-left transition-all text-xs flex flex-col justify-center cursor-pointer relative ${
                  isSelected
                    ? 'bg-zinc-800 border-zinc-400 text-white font-medium shadow-sm ring-1 ring-zinc-400/30'
                    : isSupported
                    ? 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                    : 'bg-zinc-950/40 border-zinc-850/60 text-zinc-600 hover:border-zinc-750 hover:text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate">{wf.name}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  )}
                </div>
                <span className="text-[9px] text-zinc-500 font-mono truncate">{wf.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Fáze Projektu (S možností vypnutí / odkliknutí myší) */}
      <div className="space-y-2 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
            <span>Fáze Projektu</span>
            <span className="text-[10px] lowercase text-zinc-500 font-normal">
              (kliknutím vypnete / zapnete)
            </span>
          </label>
          <div className="flex items-center gap-2">
            {selectedPhase ? (
              <button
                onClick={() => onSelectPhase(null)}
                className="text-[10px] font-mono text-zinc-400 hover:text-red-400 bg-zinc-900 hover:bg-zinc-850 px-2 py-0.5 rounded border border-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
                title="Vypnout zohlednění fáze projektu"
              >
                <span>Vypnout fázi</span>
                <span className="text-zinc-500">✕</span>
              </button>
            ) : (
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800/60">
                Fáze: Vypnuto
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-1.5">
          {PROJECT_PHASES.map((phase) => {
            const isSelected = selectedPhase === phase.id;

            return (
              <button
                key={phase.id}
                onClick={() => {
                  // If already selected, clicking it again toggles it off!
                  onSelectPhase(isSelected ? null : phase.id);
                }}
                className={`p-2 rounded-md border text-left transition-all relative cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-800 border-zinc-400 text-white font-medium shadow-sm ring-1 ring-zinc-400/30'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="text-xs font-medium truncate">{phase.name}</div>
                  {isSelected && (
                    <span className="text-[9px] font-mono text-zinc-300 bg-zinc-700/80 px-1 py-0.2 rounded">
                      Aktivní (odkliknout)
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5 leading-snug">
                  {phase.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
