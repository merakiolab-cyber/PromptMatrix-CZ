import React, { useState } from 'react';
import { Folder, FolderPlus, X, Check, Tag, Building2, FileText } from 'lucide-react';
import { PromptFolder, SavedPrompt, ModelId, WorkflowTarget, ProjectPhase } from '../types';

interface SaveToFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptText: string;
  templateTitle: string;
  modelId: ModelId;
  workflowTarget?: WorkflowTarget | null;
  projectPhase?: ProjectPhase | null;
  folders: PromptFolder[];
  onCreateFolder: (name: string, clientName?: string, color?: string) => PromptFolder;
  onSavePrompt: (savedPrompt: Omit<SavedPrompt, 'id' | 'createdAt'>) => void;
}

const DEFAULT_COLORS = [
  '#10b981', // Emerald
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#71717a'  // Zinc
];

export const SaveToFolderModal: React.FC<SaveToFolderModalProps> = ({
  isOpen,
  onClose,
  promptText,
  templateTitle,
  modelId,
  workflowTarget,
  projectPhase,
  folders,
  onCreateFolder,
  onSavePrompt
}) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string>(
    folders.length > 0 ? folders[0].id : 'new'
  );
  const [promptTitle, setPromptTitle] = useState<string>(templateTitle);
  const [promptNotes, setPromptNotes] = useState<string>('');

  // Fields for creating a new folder on the fly
  const [isCreatingNewFolder, setIsCreatingNewFolder] = useState<boolean>(
    folders.length === 0
  );
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [newClientName, setNewClientName] = useState<string>('');
  const [newFolderColor, setNewFolderColor] = useState<string>('#10b981');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let targetFolderId: string | null = selectedFolderId;

    if (isCreatingNewFolder || selectedFolderId === 'new') {
      if (!newFolderName.trim()) return;
      const createdFolder = onCreateFolder(
        newFolderName.trim(),
        newClientName.trim() || undefined,
        newFolderColor
      );
      targetFolderId = createdFolder.id;
    }

    onSavePrompt({
      folderId: targetFolderId,
      title: promptTitle.trim() || templateTitle,
      promptText,
      modelId,
      templateTitle,
      workflowTarget,
      projectPhase,
      notes: promptNotes.trim() || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-white">
              Uložit Prompt do Složky / Zakázky Klienta
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          {/* Prompt Title */}
          <div className="space-y-1">
            <label className="text-zinc-400 font-medium flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>Název uloženého promptu</span>
            </label>
            <input
              type="text"
              value={promptTitle}
              onChange={(e) => setPromptTitle(e.target.value)}
              placeholder="Např. Landpage Hero - FinTech Corp 2026"
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              required
            />
          </div>

          {/* Folder / Client Selection */}
          <div className="space-y-1.5">
            <label className="text-zinc-400 font-medium flex items-center gap-1.5 justify-between">
              <span className="flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-zinc-500" />
                <span>Cílová složka / zakázka</span>
              </span>
              {folders.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsCreatingNewFolder(!isCreatingNewFolder)}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FolderPlus className="w-3 h-3" />
                  <span>{isCreatingNewFolder ? 'Vybrat existující' : '+ Nová zakázka'}</span>
                </button>
              )}
            </label>

            {!isCreatingNewFolder && folders.length > 0 ? (
              <select
                value={selectedFolderId}
                onChange={(e) => {
                  if (e.target.value === 'new') {
                    setIsCreatingNewFolder(true);
                  } else {
                    setSelectedFolderId(e.target.value);
                  }
                }}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-white font-mono"
              >
                {folders.map((f) => (
                  <option key={f.id} value={f.id}>
                    📁 {f.name} {f.clientName ? `(${f.clientName})` : ''}
                  </option>
                ))}
                <option value="new">+ Vytvořit novou zakázku / složku...</option>
              </select>
            ) : (
              /* Inline Folder Creator */
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-2.5">
                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Název složky / zakázky</label>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Např. Redesign Web E-shop 2026"
                    className="w-full px-2.5 py-1.5 bg-black border border-zinc-800 rounded text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                    required={isCreatingNewFolder}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-zinc-500" />
                      <span>Jméno klienta (volitelné)</span>
                    </label>
                    <input
                      type="text"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      placeholder="Meraki Lab"
                      className="w-full px-2.5 py-1.5 bg-black border border-zinc-800 rounded text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-zinc-500" />
                      <span>Barevné označení</span>
                    </label>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {DEFAULT_COLORS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setNewFolderColor(c)}
                          className="w-5 h-5 rounded-full border border-white/20 transition-transform cursor-pointer relative"
                          style={{ backgroundColor: c }}
                        >
                          {newFolderColor === c && (
                            <Check className="w-3 h-3 text-black absolute inset-0 m-auto font-bold" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-zinc-400 font-medium">Poznámka / Interní popis zakázky (volitelné)</label>
            <textarea
              value={promptNotes}
              onChange={(e) => setPromptNotes(e.target.value)}
              placeholder="Schváleno klientem, finální verze pro spuštění v Claude CLI..."
              rows={2}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Zrušit
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-white hover:bg-zinc-200 text-black font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Uložit do složky</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
