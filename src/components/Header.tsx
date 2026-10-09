import React from 'react';
import { Copy, Plus, History, Sparkles, Folder, Undo2, Redo2 } from 'lucide-react';

interface HeaderProps {
  onCopyPrompt: () => void;
  onOpenNewTemplate: () => void;
  onToggleHistory: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  historyCount: number;
  templatesCount?: number;
  foldersCount?: number;
  activeView: 'editor' | 'templates' | 'skills' | 'folders';
  setActiveView: (view: 'editor' | 'templates' | 'skills' | 'folders') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onCopyPrompt,
  onOpenNewTemplate,
  onToggleHistory,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  historyCount,
  templatesCount = 112,
  foldersCount = 0,
  activeView,
  setActiveView
}) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-3 bg-black/90 border-b border-zinc-800/80 backdrop-blur-md">
      {/* Zone 1: Vercel Brand Lockup */}
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 76 65" className="w-4 h-4 fill-white transition-transform group-hover:scale-105">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold tracking-tight text-white">PromptMatrix</span>
            <span className="text-zinc-500 text-xs font-mono">/</span>
            <span className="text-[11px] font-mono font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
              cz
            </span>
          </div>
        </a>
      </div>

      {/* Zone 2: Vercel Tabs / Navigation */}
      <nav aria-label="Hlavní navigace" className="hidden md:flex items-center gap-1 p-1 bg-zinc-900/90 rounded-lg border border-zinc-800/80">
        <button
          onClick={() => setActiveView('editor')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
            activeView === 'editor'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Editor promptu
        </button>
        <button
          onClick={() => setActiveView('templates')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeView === 'templates'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Knihovna šablon</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-semibold">
            {templatesCount}
          </span>
        </button>
        <button
          onClick={() => setActiveView('skills')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeView === 'skills'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
          <span>Skilly & Anti-Slop</span>
        </button>

        <button
          onClick={() => setActiveView('folders')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeView === 'folders'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Otevřít Složky & Zakázky"
        >
          <Folder className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Složky & Zakázky</span>
          {foldersCount > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/60 font-semibold">
              {foldersCount}
            </span>
          )}
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2">
        {/* Undo / Redo Controls */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 rounded transition-all ${
              canUndo
                ? 'text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer'
                : 'text-zinc-600 cursor-not-allowed'
            }`}
            title="Zpět (⌘Z / Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 rounded transition-all ${
              canRedo
                ? 'text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer'
                : 'text-zinc-600 cursor-not-allowed'
            }`}
            title="Znovu (⌘⇧Z / Ctrl+Shift+Z)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onToggleHistory}
          className="relative px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 rounded-lg transition-all flex items-center gap-1.5"
          title="Historie vygenerovaných dotazů"
        >
          <History className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Historie</span>
          {historyCount > 0 && (
            <span className="font-mono text-[10px] text-zinc-400 tabular-nums ml-0.5">
              ({historyCount})
            </span>
          )}
        </button>

        <button
          onClick={onOpenNewTemplate}
          className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 rounded-lg transition-all flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Nová šablona</span>
        </button>

        <button
          onClick={onCopyPrompt}
          className="px-3.5 py-1.5 text-xs font-medium text-black bg-white hover:bg-zinc-200 active:scale-[0.98] rounded-lg transition-all shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Copy className="w-3.5 h-3.5 text-black" />
          <span>Kopírovat</span>
          <span className="hidden lg:inline text-[10px] font-mono font-normal opacity-60 pl-1 border-l border-zinc-300">
            ⌘↵
          </span>
        </button>
      </div>
    </header>
  );
};
