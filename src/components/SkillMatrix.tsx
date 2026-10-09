import React from 'react';
import { ModelSkill } from '../types';
import { Sparkles, Check, CheckCheck, RotateCcw } from 'lucide-react';

interface SkillMatrixProps {
  skills: ModelSkill[];
  onToggleSkill: (skillId: string) => void;
  onEnableAll: () => void;
  onResetSkills: () => void;
  modelName: string;
}

export const SkillMatrix: React.FC<SkillMatrixProps> = ({
  skills,
  onToggleSkill,
  onEnableAll,
  onResetSkills,
  modelName
}) => {
  return (
    <div className="space-y-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-850 border-zinc-800/80">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Anti-Slop Skilly a Best Practices ({modelName})</span>
          </h2>
          <p className="text-[11px] text-zinc-400">
            Aktivní direktivy pro eliminaci generického AI balastu a vynucení produkčních inženýrských standardů.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onEnableAll}
            className="px-2.5 py-1 text-[11px] text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 border-zinc-800 rounded-md transition-colors flex items-center gap-1"
          >
            <CheckCheck className="w-3 h-3 text-zinc-400" />
            <span>Zapnout vše</span>
          </button>
          <button
            onClick={onResetSkills}
            className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-zinc-200 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3 text-zinc-500" />
            <span>Výchozí</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
        {skills.map((skill) => {
          const isEnabled = skill.enabled;

          return (
            <div
              key={skill.id}
              onClick={() => onToggleSkill(skill.id)}
              className={`p-3 rounded-lg border text-left cursor-pointer transition-all relative ${
                isEnabled
                  ? 'bg-zinc-900/90 border-zinc-700 shadow-sm'
                  : 'bg-zinc-950/40 border-zinc-850 border-zinc-800/60 hover:border-zinc-700 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className={`text-xs font-medium ${isEnabled ? 'text-white' : 'text-zinc-300'}`}>
                  {skill.name}
                </span>

                {/* Vercel-style toggle checkbox */}
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                    isEnabled ? 'bg-white text-black' : 'border border-zinc-700 bg-zinc-900'
                  }`}
                >
                  {isEnabled && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-2">
                {skill.description}
              </p>

              <div className="text-[10px] font-mono text-zinc-400 bg-black/60 p-1.5 rounded border border-zinc-850 border-zinc-800/60 line-clamp-1">
                "{skill.ruleSnippet}"
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
