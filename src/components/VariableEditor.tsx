import React, { useState } from 'react';
import { PromptVariable } from '../types';
import { Sliders, Plus, Trash2, RotateCcw, Variable } from 'lucide-react';

interface VariableEditorProps {
  variables: PromptVariable[];
  onUpdateVariable: (id: string, value: string) => void;
  onAddVariable: (variable: PromptVariable) => void;
  onDeleteVariable: (id: string) => void;
  onResetVariables: () => void;
  focusedVariableId: string | null;
  setFocusedVariableId: (id: string | null) => void;
}

export const VariableEditor: React.FC<VariableEditorProps> = ({
  variables,
  onUpdateVariable,
  onAddVariable,
  onDeleteVariable,
  onResetVariables,
  focusedVariableId,
  setFocusedVariableId
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newLabel.trim()) return;

    const formattedKey = newKey.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    onAddVariable({
      id: `var_${Date.now()}`,
      key: formattedKey,
      label: newLabel.trim(),
      description: 'Uživatelská proměnná',
      placeholder: `Hodnota pro {{${formattedKey}}}`,
      type: 'textarea',
      value: newValue.trim(),
      required: false
    });

    setNewKey('');
    setNewLabel('');
    setNewValue('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-850 border-zinc-800/80">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-zinc-400" />
            <span>Parametry & Proměnné promptu</span>
          </h2>
          <p className="text-[11px] text-zinc-400">
            Změny se v reálném čase promítají do finálního promptu a živého náhledu.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-2.5 py-1 text-[11px] text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 border-zinc-800 rounded-md transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3 text-zinc-400" />
            <span>Přidat proměnnou</span>
          </button>
          <button
            type="button"
            onClick={onResetVariables}
            className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-zinc-200 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors flex items-center gap-1"
            title="Resetovat hodnoty na výchozí"
          >
            <RotateCcw className="w-3 h-3 text-zinc-500" />
            <span>Resetovat</span>
          </button>
        </div>
      </div>

      {/* Add Custom Variable Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="p-3 bg-black rounded-lg border border-zinc-700 space-y-2.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white flex items-center gap-1.5">
              <Variable className="w-3.5 h-3.5 text-zinc-400" />
              Nová vlastní proměnná
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-[11px] text-zinc-500 hover:text-zinc-300"
            >
              Zrušit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-zinc-400 mb-0.5">Klíč (např. custom_rule)</label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="tech_spec"
                className="w-full px-2.5 py-1.5 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-zinc-400"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] text-zinc-400 mb-0.5">Název pole (pro zobrazení)</label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Technická specifikace"
                className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-zinc-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-zinc-400 mb-0.5">Výchozí hodnota</label>
            <textarea
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Zadejte hodnotu..."
              rows={2}
              className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="submit"
              className="px-3 py-1 text-xs font-medium bg-white text-black rounded-md hover:bg-zinc-200 transition-colors"
            >
              Vložit proměnnou do šablony
            </button>
          </div>
        </form>
      )}

      {/* Variables List */}
      <div className="space-y-3">
        {variables.map((variable) => {
          const isFocused = focusedVariableId === variable.id;

          return (
            <div
              key={variable.id}
              className={`p-3 rounded-lg border transition-all ${
                isFocused
                  ? 'bg-zinc-900/90 border-zinc-600 ring-1 ring-zinc-600/50'
                  : 'bg-zinc-950/60 border-zinc-850 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <label htmlFor={`var-${variable.id}`} className="text-xs font-medium text-zinc-200">
                    {variable.label}
                  </label>
                  <code className="text-[10px] font-mono text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                    {`{{${variable.key}}}`}
                  </code>
                  {variable.required && (
                    <span className="text-[10px] text-zinc-500" title="Povinná proměnná">
                      *
                    </span>
                  )}
                </div>

                {/* Delete button if custom */}
                {variable.id.startsWith('var_') && (
                  <button
                    type="button"
                    onClick={() => onDeleteVariable(variable.id)}
                    className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                    title="Smazat tuto vlastní proměnnou"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {variable.description && (
                <p className="text-[11px] text-zinc-400 mb-2 leading-relaxed">
                  {variable.description}
                </p>
              )}

              {/* Input field based on type */}
              {variable.type === 'select' && variable.options ? (
                <select
                  id={`var-${variable.id}`}
                  value={variable.value}
                  onChange={(e) => onUpdateVariable(variable.id, e.target.value)}
                  onFocus={() => setFocusedVariableId(variable.id)}
                  className="w-full px-3 py-2 text-xs bg-black border border-zinc-800 rounded-md text-zinc-200 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                >
                  {variable.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : variable.type === 'textarea' || (variable.value && variable.value.length > 70) ? (
                <textarea
                  id={`var-${variable.id}`}
                  value={variable.value}
                  onChange={(e) => onUpdateVariable(variable.id, e.target.value)}
                  onFocus={() => setFocusedVariableId(variable.id)}
                  placeholder={variable.placeholder}
                  rows={Math.min(6, Math.max(2, (variable.value.match(/\n/g) || []).length + 2))}
                  className="w-full px-3 py-2 text-xs bg-black border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 font-mono leading-relaxed resize-y"
                />
              ) : (
                <input
                  id={`var-${variable.id}`}
                  type="text"
                  value={variable.value}
                  onChange={(e) => onUpdateVariable(variable.id, e.target.value)}
                  onFocus={() => setFocusedVariableId(variable.id)}
                  placeholder={variable.placeholder}
                  className="w-full px-3 py-2 text-xs bg-black border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
