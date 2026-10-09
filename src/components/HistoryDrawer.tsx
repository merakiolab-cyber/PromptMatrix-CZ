import React from 'react';
import { HistoryItem } from '../types';
import { History, X, Trash2, ArrowUpRight, Copy, Check } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onCopyItem: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearHistory: () => void;
  copiedId: string | null;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onRestore,
  onCopyItem,
  onDeleteItem,
  onClearHistory,
  copiedId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md sm:max-w-lg bg-black border-l border-zinc-800 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <History className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs font-semibold text-white">
                Historie vygenerovaných promptů
              </h2>
              <p className="text-[11px] text-zinc-500">
                Rychlé znovupoužití nedávno sestavených dotazů
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors border border-zinc-800 flex items-center gap-1"
                title="Smazat celou historii"
              >
                <Trash2 className="w-3 h-3 text-zinc-500" />
                <span>Vymazat</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors"
              aria-label="Zavřít historii"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
              <History className="w-8 h-8 text-zinc-700 mb-2.5" />
              <p className="text-xs font-medium text-zinc-300">Historie je zatím prázdná</p>
              <p className="text-[11px] text-zinc-500 mt-1 max-w-xs leading-relaxed">
                Kdykoliv zkopírujete prompt do schránky, automaticky se zde uloží pro okamžité znovupoužití.
              </p>
            </div>
          ) : (
            history.map((item) => {
              const isCopied = copiedId === item.id;
              const date = new Date(item.createdAt);
              const formattedDate = date.toLocaleTimeString('cs-CZ', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              });

              return (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-zinc-950 border border-zinc-850 border-zinc-800/80 hover:border-zinc-700 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-white truncate">
                      {item.templateTitle}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 tabular-nums shrink-0">
                      {formattedDate}
                    </span>
                  </div>

                  {/* Metadata line */}
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    <span className="text-zinc-400">{item.modelId}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.wordCount} slov</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-400 tabular-nums">~{item.tokensEstimate} tokenů</span>
                  </div>

                  {/* Prompt preview snippet */}
                  <div className="p-2 rounded bg-black border border-zinc-850 border-zinc-800/60 font-mono text-[11px] text-zinc-400 line-clamp-3 leading-relaxed">
                    {item.compiledPrompt}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1 text-zinc-600 hover:text-rose-400 rounded transition-colors"
                      title="Smazat záznam"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onCopyItem(item)}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1 ${
                        isCopied
                          ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/40'
                          : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Zkopírováno</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-zinc-400" />
                          <span>Zkopírovat</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onRestore(item);
                        onClose();
                      }}
                      className="px-2.5 py-1 text-xs font-medium bg-white text-black hover:bg-zinc-200 rounded-md transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>Načíst</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
