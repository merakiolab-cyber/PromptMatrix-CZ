import React from 'react';
import { ModelDefinition } from '../types';
import { Shield, Check, Cpu } from 'lucide-react';

interface SkillsViewProps {
  models: ModelDefinition[];
  onToggleSkill: (modelId: string, skillId: string) => void;
  onEnableAllModelSkills: (modelId: string) => void;
  onResetModelSkills: (modelId: string) => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({
  models,
  onToggleSkill,
  onEnableAllModelSkills,
  onResetModelSkills
}) => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Intro section */}
      <div className="border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Shield className="w-4 h-4" />
          </div>
          <h1 className="text-lg font-bold text-white">
            Katalog Skillů & Anti-Slop Pravidel
          </h1>
        </div>
        <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
          Každý model vyžaduje specifickou sadu mantinelů, aby doručil produkční kód místo generického balastu (AI slop). Zde můžete konfigurovat a zapínat expertní skilly pro každý AI model zvlášť.
        </p>
      </div>

      {/* Models Grid */}
      <div className="space-y-4">
        {models.map((model) => {
          const activeCount = model.recommendedSkills.filter((s) => s.enabled).length;

          return (
            <div
              key={model.id}
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-850 border-zinc-800/80">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                    <h2 className="text-xs font-semibold text-white">{model.name}</h2>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                      {model.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    Framework: {model.framework}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400 mr-2">
                    {activeCount}/{model.recommendedSkills.length} aktivních
                  </span>
                  <button
                    onClick={() => onEnableAllModelSkills(model.id)}
                    className="px-2.5 py-1 text-xs text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors"
                  >
                    Zapnout vše
                  </button>
                  <button
                    onClick={() => onResetModelSkills(model.id)}
                    className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors"
                  >
                    Resetovat
                  </button>
                </div>
              </div>

              {/* Skills list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {model.recommendedSkills.map((skill) => {
                  const isEnabled = skill.enabled;

                  return (
                    <div
                      key={skill.id}
                      onClick={() => onToggleSkill(model.id, skill.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isEnabled
                          ? 'bg-zinc-900 border-zinc-700 shadow-sm'
                          : 'bg-zinc-950/40 border-zinc-850 border-zinc-800/60 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${isEnabled ? 'text-white' : 'text-zinc-300'}`}>
                          {skill.name}
                        </span>
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
                            isEnabled ? 'bg-white text-black' : 'border border-zinc-700 bg-zinc-900'
                          }`}
                        >
                          {isEnabled && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">
                        {skill.description}
                      </p>

                      <div className="p-1.5 rounded bg-black font-mono text-[10px] text-zinc-400 border border-zinc-850 border-zinc-800/60">
                        {skill.ruleSnippet}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
