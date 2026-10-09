import React from 'react';
import { PromptTemplate, ModelDefinition, CategoryId } from '../types';
import { CATEGORIES } from './Sidebar';
import { Star, Plus, ArrowRight, Trash2, Edit2 } from 'lucide-react';

interface TemplatesViewProps {
  templates: PromptTemplate[];
  models: ModelDefinition[];
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onSelectTemplate: (templateId: string) => void;
  onToggleFavorite: (templateId: string) => void;
  onDeleteTemplate: (templateId: string) => void;
  onEditTemplate: (template: PromptTemplate) => void;
  onOpenNewTemplateModal: () => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templates,
  models,
  selectedCategory,
  onSelectCategory,
  onSelectTemplate,
  onToggleFavorite,
  onDeleteTemplate,
  onEditTemplate,
  onOpenNewTemplateModal
}) => {
  const filtered = templates.filter(
    (t) => selectedCategory === 'all' || t.categoryId === selectedCategory
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Hero header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Knihovna ověřených prompt šablon</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Předpřipravené šablony s architektonickými mantinely a nulovým AI slopem pro Claude Code, Cursor, Blender, Adobe a moderní web.
          </p>
        </div>

        <button
          onClick={onOpenNewTemplateModal}
          className="px-3.5 py-1.5 text-xs font-medium bg-white text-black hover:bg-zinc-200 rounded-md transition-colors flex items-center gap-1.5 shadow-sm self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Vytvořit šablonu</span>
        </button>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all border ${
                isSelected
                  ? 'bg-zinc-800 text-white border-zinc-700 shadow-sm'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((template) => {
          const modelDef = models.find((m) => m.id === template.modelId);

          return (
            <div
              key={template.id}
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between group relative shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {modelDef?.shortName || template.modelId}
                    </span>
                    {template.isCustom && (
                      <span className="text-[10px] text-zinc-400 font-medium px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        Vlastní
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onToggleFavorite(template.id)}
                      className="text-zinc-600 hover:text-amber-400 p-1"
                      title="Oblíbené"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          template.isFavorite ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                    {template.isCustom && (
                      <>
                        <button
                          onClick={() => onEditTemplate(template)}
                          className="text-zinc-650 text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
                          title="Editovat šablonu"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteTemplate(template.id)}
                          className="text-zinc-650 text-zinc-400 hover:text-rose-450 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="Smazat šablonu"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="text-xs font-semibold text-zinc-100 group-hover:text-white transition-colors mb-1.5">
                  {template.title}
                </h3>

                <p className="text-[11px] text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                  {template.description}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {template.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-zinc-500 bg-black px-1.5 py-0.5 rounded border border-zinc-850 border-zinc-800/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2.5 border-t border-zinc-850 border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500 tabular-nums">
                    {template.variables.length} proměnných
                  </span>

                  <button
                    onClick={() => onSelectTemplate(template.id)}
                    className="px-2.5 py-1 text-xs font-medium text-zinc-200 group-hover:text-white bg-zinc-900 group-hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors flex items-center gap-1"
                  >
                    <span>Otevřít</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
