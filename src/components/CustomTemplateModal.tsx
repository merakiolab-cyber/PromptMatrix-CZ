import React, { useState } from 'react';
import { PromptTemplate, ModelId, CategoryId, PromptVariable } from '../types';
import { X, Plus, Trash2, Save, FileCode } from 'lucide-react';
import { AI_MODELS } from '../data/models';
import { CATEGORIES } from './Sidebar';

interface CustomTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTemplate: (template: PromptTemplate) => void;
  initialTemplate?: PromptTemplate | null;
}

export const CustomTemplateModal: React.FC<CustomTemplateModalProps> = ({
  isOpen,
  onClose,
  onSaveTemplate,
  initialTemplate
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(initialTemplate?.title || '');
  const [description, setDescription] = useState(initialTemplate?.description || '');
  const [modelId, setModelId] = useState<ModelId>(initialTemplate?.modelId || 'claude-code');
  const [categoryId, setCategoryId] = useState<CategoryId>(initialTemplate?.categoryId || 'ui-ux-design');
  const [templateString, setTemplateString] = useState(
    initialTemplate?.templateString ||
      `<context>\n{{project_context}}\n</context>\n\n<task>\n{{main_task}}\n</task>\n\n<constraints>\n{{constraints}}\n</constraints>`
  );
  const [tagsInput, setTagsInput] = useState(initialTemplate?.tags?.join(', ') || 'Custom, Prototyping');

  const [variables, setVariables] = useState<PromptVariable[]>(
    initialTemplate?.variables || [
      {
        id: 'var_1',
        key: 'project_context',
        label: 'Kontext projektu',
        description: 'V jakém prostředí se kód vyvíjí',
        placeholder: 'Next.js 15, TypeScript...',
        type: 'textarea',
        value: 'Moderní React aplikace s TypeScriptem a Tailwind CSS',
        required: true
      },
      {
        id: 'var_2',
        key: 'main_task',
        label: 'Hlavní cíl',
        description: 'Co přesně má model provést',
        placeholder: 'Implementovat formulář s validací...',
        type: 'textarea',
        value: 'Vytvořit komponentu pro správu profilu uživatele',
        required: true
      },
      {
        id: 'var_3',
        key: 'constraints',
        label: 'Omezení a zásady',
        description: 'Co je zakázáno nebo vyžadováno',
        placeholder: 'Žádný AI slop, WCAG AA shoda...',
        type: 'textarea',
        value: 'Žádné zástupné komentáře // TODO, čisté rozhraní bez AI slopu',
        required: false
      }
    ]
  );

  const handleAddVariable = () => {
    const newId = `var_${Date.now()}`;
    const newKey = `var_${variables.length + 1}`;
    setVariables([
      ...variables,
      {
        id: newId,
        key: newKey,
        label: `Nová proměnná ${variables.length + 1}`,
        description: '',
        placeholder: `Hodnota pro {{${newKey}}}`,
        type: 'textarea',
        value: '',
        required: false
      }
    ]);
    setTemplateString((prev) => `${prev}\n\n{{${newKey}}}`);
  };

  const handleUpdateVar = (id: string, field: keyof PromptVariable, val: string) => {
    setVariables((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: val } : v))
    );
  };

  const handleDeleteVar = (id: string) => {
    setVariables((prev) => prev.filter((v) => v.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !templateString.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newTemplate: PromptTemplate = {
      id: initialTemplate?.id || `custom_${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Vlastní uživatelská šablona',
      modelId,
      categoryId,
      variables,
      templateString,
      isCustom: true,
      tags: parsedTags,
      createdAt: new Date().toISOString()
    };

    onSaveTemplate(newTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-black border border-zinc-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-zinc-300" />
            <h2 className="text-xs font-semibold text-white">
              {initialTemplate ? 'Upravit šablonu' : 'Vytvořit vlastní šablonu promptu'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Název šablony *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Např. Cursor: Fullstack API Generator"
                className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-zinc-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Cílový model
              </label>
              <select
                value={modelId}
                onChange={(e) => setModelId(e.target.value as ModelId)}
                className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-zinc-500"
              >
                {AI_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Okruh tématu
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value as CategoryId)}
                className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-zinc-500"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Štítky (oddělené čárkou)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="TypeScript, API, Refactor"
                className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Popis šablony
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Krátký popis účelu šablony pro rychlou orientaci..."
              className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-zinc-500"
            />
          </div>

          {/* Variables list manager */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-300">
                Dynamické proměnné ({variables.length})
              </span>
              <button
                type="button"
                onClick={handleAddVariable}
                className="text-xs text-zinc-300 hover:text-white flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Přidat proměnnou</span>
              </button>
            </div>

            <div className="space-y-3">
              {variables.map((v) => (
                <div
                  key={v.id}
                  className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2.5 relative group"
                >
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-[10px] font-mono font-medium text-zinc-500 uppercase tracking-wider">
                      Proměnná v šabloně
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteVar(v.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1 rounded hover:bg-zinc-900 transition-colors"
                      title="Smazat proměnnou"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1">
                        Klíč v textu šablony (např. <code className="font-mono text-zinc-300">client_name</code> pro <code className="font-mono text-zinc-300">&#123;&#123;client_name&#125;&#125;</code>)
                      </label>
                      <input
                        type="text"
                        value={v.key}
                        onChange={(e) => handleUpdateVar(v.id, 'key', e.target.value)}
                        placeholder="client_name"
                        className="w-full px-2.5 py-1.5 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-zinc-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1">
                        Popisek pole pro uživatele (label)
                      </label>
                      <input
                        type="text"
                        value={v.label}
                        onChange={(e) => handleUpdateVar(v.id, 'label', e.target.value)}
                        placeholder="Název klienta"
                        className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-zinc-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1">
                        Nápověda / Popis pole (description)
                      </label>
                      <input
                        type="text"
                        value={v.description || ''}
                        onChange={(e) => handleUpdateVar(v.id, 'description', e.target.value)}
                        placeholder="V jakém prostředí se kód vyvíjí..."
                        className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded text-zinc-300 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1">
                        Ukázková / Předvolená hodnota (value / placeholder)
                      </label>
                      <input
                        type="text"
                        value={v.value}
                        onChange={(e) => handleUpdateVar(v.id, 'value', e.target.value)}
                        placeholder="Moderní React aplikace s TypeScriptem..."
                        className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded text-zinc-300 focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Master Template String with Placeholders */}
          <div className="pt-2 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-zinc-300">
                Znění šablony s proměnnými *
              </label>
              <span className="text-[10px] font-mono text-zinc-500">
                Formát &#123;&#123;nazev_promenne&#125;&#125;
              </span>
            </div>
            <textarea
              value={templateString}
              onChange={(e) => setTemplateString(e.target.value)}
              rows={7}
              className="w-full p-3 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-zinc-500 leading-relaxed"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 rounded-md transition-colors"
            >
              Zrušit
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium bg-white text-black hover:bg-zinc-200 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Uložit šablonu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
