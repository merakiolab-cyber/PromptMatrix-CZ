import React, { useState } from 'react';
import { KeywordCategory } from '../types';
import { Hash, Plus, Check } from 'lucide-react';

interface PowerKeywordsProps {
  categories: KeywordCategory[];
  onInsertKeyword: (keyword: string) => void;
  activeVariableName?: string;
}

export const PowerKeywords: React.FC<PowerKeywordsProps> = ({
  categories,
  onInsertKeyword,
  activeVariableName
}) => {
  const [recentlyInserted, setRecentlyInserted] = useState<string | null>(null);

  const handleKeywordClick = (kw: string) => {
    onInsertKeyword(kw);
    setRecentlyInserted(kw);
    setTimeout(() => {
      setRecentlyInserted(null);
    }, 1400);
  };

  return (
    <div className="space-y-2.5 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-zinc-300" />
          <span>Optimalizovaná klíčová slova & Power-tagy</span>
        </label>
        {activeVariableName && (
          <span className="text-[11px] text-zinc-400 font-mono">
            Cíl: <span className="text-white font-medium">{activeVariableName}</span>
          </span>
        )}
      </div>

      <div className="space-y-2">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <span className="text-[11px] font-medium text-zinc-500">{cat.category}:</span>
            <div className="flex flex-wrap gap-1.5">
              {cat.keywords.map((kw) => {
                const isJustInserted = recentlyInserted === kw;

                return (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => handleKeywordClick(kw)}
                    className={`group px-2.5 py-1 text-xs font-mono rounded-md border transition-all flex items-center gap-1 active:scale-[0.98] ${
                      isJustInserted
                        ? 'bg-zinc-800 border-zinc-500 text-white shadow-sm'
                        : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-650 hover:border-zinc-700 hover:text-white text-zinc-300'
                    }`}
                    title={`Klikněte pro vložení "${kw}"`}
                  >
                    {isJustInserted ? (
                      <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                    ) : (
                      <Plus className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                    )}
                    <span>{kw}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
