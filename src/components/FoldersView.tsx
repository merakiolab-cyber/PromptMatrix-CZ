import React, { useState } from 'react';
import {
  Folder,
  FolderPlus,
  Building2,
  Trash2,
  Edit2,
  Copy,
  Check,
  Download,
  ChevronRight,
  Search,
  Plus,
  X
} from 'lucide-react';
import { PromptFolder, SavedPrompt } from '../types';

interface FoldersViewProps {
  folders: PromptFolder[];
  savedPrompts: SavedPrompt[];
  onCreateFolder: (name: string, clientName?: string, color?: string) => PromptFolder;
  onUpdateFolder: (id: string, name: string, clientName?: string, color?: string) => void;
  onDeleteFolder: (id: string) => void;
  onDeleteSavedPrompt: (id: string) => void;
  onLoadSavedPrompt: (prompt: SavedPrompt) => void;
  onMovePromptFolder: (promptId: string, targetFolderId: string | null) => void;
}

export const FoldersView: React.FC<FoldersViewProps> = ({
  folders,
  savedPrompts,
  onCreateFolder,
  onUpdateFolder,
  onDeleteFolder,
  onDeleteSavedPrompt,
  onLoadSavedPrompt,
  onMovePromptFolder
}) => {
  const [activeFolderId, setActiveFolderId] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Folder Editor Modal State
  const [editingFolder, setEditingFolder] = useState<PromptFolder | null>(null);
  const [editName, setEditName] = useState('');
  const [editClient, setEditClient] = useState('');
  const [editColor, setEditColor] = useState('#10b981');

  // Filtered list of prompts
  const filteredPrompts = savedPrompts.filter((p) => {
    if (activeFolderId !== 'all' && p.folderId !== activeFolderId) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchText = p.promptText.toLowerCase().includes(q);
      const matchNotes = p.notes?.toLowerCase().includes(q);
      if (!matchTitle && !matchText && !matchNotes) return false;
    }
    return true;
  });

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    });
  };

  const handleExportFolderBundle = (folder: PromptFolder) => {
    const folderPrompts = savedPrompts.filter((p) => p.folderId === folder.id);
    const bundleData = {
      folderName: folder.name,
      clientName: folder.clientName,
      exportedAt: new Date().toISOString(),
      promptCount: folderPrompts.length,
      prompts: folderPrompts
    };

    const blob = new Blob([JSON.stringify(bundleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zakazka-${folder.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-53px)] bg-black overflow-hidden animate-in fade-in duration-200">
      {/* Top Header Section */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/40">
        <div className="flex items-center gap-3">
          <Folder className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <h1 className="text-base font-semibold text-white tracking-tight">
              Složky & Klientské Zakázky
            </h1>
            <p className="text-xs text-zinc-400">
              Uložené a strukturované prompty rozdělené podle klientských zakázek
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const f = onCreateFolder('Nová klientská zakázka', 'Nový Klient', '#10b981');
            setEditingFolder(f);
            setEditName(f.name);
            setEditClient(f.clientName || '');
            setEditColor(f.color || '#10b981');
          }}
          className="px-3.5 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-zinc-200 flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
        >
          <FolderPlus className="w-4 h-4" />
          <span>Vytvořit zakázku</span>
        </button>
      </div>

      {/* Main Grid Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Folder list */}
        <div className="w-64 shrink-0 bg-zinc-950/80 border-r border-zinc-800/80 p-3 flex flex-col space-y-3 overflow-y-auto">
          <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-2">
            Zvolit zakázku / klienta
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setActiveFolderId('all')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                activeFolderId === 'all'
                  ? 'bg-zinc-900 text-white font-medium border border-zinc-800 shadow-sm'
                  : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Folder className="w-4 h-4 text-zinc-500 shrink-0" />
                <span className="truncate">Všechny uložené prompty</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800/60 tabular-nums">
                {savedPrompts.length}
              </span>
            </button>

            {folders.map((folder) => {
              const isSelected = activeFolderId === folder.id;
              const count = savedPrompts.filter((p) => p.folderId === folder.id).length;

              return (
                <div
                  key={folder.id}
                  className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 text-white font-medium border border-zinc-800 shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200'
                  }`}
                  onClick={() => setActiveFolderId(folder.id)}
                >
                  <div className="flex items-center gap-2.5 truncate min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: folder.color || '#10b981' }}
                    />
                    <div className="truncate text-left">
                      <div className="truncate text-xs font-medium text-zinc-200 group-hover:text-white">
                        {folder.name}
                      </div>
                      {folder.clientName && (
                        <div className="text-[10px] text-zinc-500 truncate flex items-center gap-1">
                          <Building2 className="w-2.5 h-2.5" />
                          <span>{folder.clientName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-900 tabular-nums">
                      {count}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingFolder(folder);
                        setEditName(folder.name);
                        setEditClient(folder.clientName || '');
                        setEditColor(folder.color || '#10b981');
                      }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-all cursor-pointer"
                      title="Upravit složku"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: List of Saved Prompts in the active folder */}
        <div className="flex-1 flex flex-col overflow-hidden bg-black/10">
          {/* Subheader and search */}
          <div className="px-6 py-3 border-b border-zinc-800 bg-zinc-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hledat v uložených promptech..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>

            {activeFolderId !== 'all' && (
              <button
                onClick={() => {
                  const activeF = folders.find((f) => f.id === activeFolderId);
                  if (activeF) handleExportFolderBundle(activeF);
                }}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 text-zinc-300 text-xs rounded-lg hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                title="Exportovat zakázku jako JSON soubor"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportovat balíček</span>
              </button>
            )}
          </div>

          {/* Prompts list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-4xl">
            {filteredPrompts.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 space-y-3">
                <Folder className="w-12 h-12 text-zinc-850 mx-auto" />
                <p className="text-sm">V této složce nejsou žádné uložené prompty.</p>
                <p className="text-xs text-zinc-600 font-mono">
                  Vygenerovaný prompt zkopírujte a uložte do složky přímo z hlavní obrazovky editoru.
                </p>
              </div>
            ) : (
              filteredPrompts.map((item) => {
                const parentFolder = folders.find((f) => f.id === item.folderId);

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 transition-all space-y-3 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-sm font-semibold text-white tracking-tight">
                            {item.title}
                          </h3>
                          {parentFolder && (
                            <span
                              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded border border-white/5"
                              style={{
                                backgroundColor: `${parentFolder.color}15`,
                                color: parentFolder.color
                              }}
                            >
                              {parentFolder.name}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                          <span>Model: <strong className="text-zinc-400">{item.modelId}</strong></span>
                          <span>·</span>
                          <span>Základní šablona: {item.templateTitle || 'Vlastní'}</span>
                          <span>·</span>
                          <span>Uloženo: {new Date(item.createdAt).toLocaleDateString('cs-CZ')} v {new Date(item.createdAt).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onLoadSavedPrompt(item)}
                          className="px-3 py-1 bg-white hover:bg-zinc-200 text-black text-xs font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer shadow-sm active:scale-95"
                          title="Načíst prompt zpět do editoru a pokračovat v úpravách"
                        >
                          <span>Načíst</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleCopyText(item.id, item.promptText)}
                          className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-md transition-all cursor-pointer active:scale-95"
                          title="Zkopírovat prompt do schránky"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => onDeleteSavedPrompt(item.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 rounded-md transition-all cursor-pointer"
                          title="Smazat uložený prompt"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Pre-formatted Prompt Code block */}
                    <div className="p-3 rounded-lg bg-black/90 border border-zinc-850 font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap select-all max-h-48 overflow-y-auto vercel-scroll">
                      {item.promptText}
                    </div>

                    {item.notes && (
                      <div className="text-[11px] text-zinc-400 bg-zinc-900/30 px-3 py-1.5 rounded-md border border-zinc-850/60 font-mono italic">
                        📝 Poznámka / Pokyny k zakázce: {item.notes}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Editing Folder Modal */}
      {editingFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <h3 className="text-xs font-semibold text-white">Upravit Zakázku / Klienta</h3>
              <button
                onClick={() => setEditingFolder(null)}
                className="text-zinc-500 hover:text-white p-1 rounded-md transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-medium">Název zakázky</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                  placeholder="např. Redesign Web & CI"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 font-medium">Jméno klienta / Zákazníka</label>
                <input
                  type="text"
                  value={editClient}
                  onChange={(e) => setEditClient(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                  placeholder="např. FinTech Corp"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 font-medium">Identifikační Barva složky</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editColor}
                    onChange={(e) => setEditColor(e.target.value)}
                    className="w-8 h-8 rounded border border-zinc-800 bg-transparent cursor-pointer shrink-0"
                  />
                  <input
                    type="text"
                    value={editColor}
                    onChange={(e) => setEditColor(e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 font-mono text-xs focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <button
                onClick={() => {
                  onDeleteFolder(editingFolder.id);
                  setEditingFolder(null);
                  setActiveFolderId('all');
                }}
                className="text-xs text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Smazat zakázku</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingFolder(null)}
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Zrušit
                </button>
                <button
                  onClick={() => {
                    onUpdateFolder(editingFolder.id, editName, editClient, editColor);
                    setEditingFolder(null);
                  }}
                  className="px-3.5 py-1.5 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-lg cursor-pointer"
                >
                  Uložit změny
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
