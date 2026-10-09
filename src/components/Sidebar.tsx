import React, { useMemo } from 'react';
import {
  FolderKanban,
  Palette,
  Globe,
  HardDrive,
  Mail,
  Box,
  Camera,
  Package,
  Cpu,
  Zap,
  Layers,
  Film,
  Award,
  Lightbulb,
  Printer,
  Search,
  Star,
  PlusCircle,
  SlidersHorizontal,
  Edit2
} from 'lucide-react';
import { CategoryId, PromptTemplate } from '../types';

interface SidebarProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  templates: PromptTemplate[];
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  onToggleFavorite: (templateId: string) => void;
  onOpenNewTemplateModal: () => void;
  onEditTemplate?: (template: PromptTemplate) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onlyFavorites: boolean;
  onToggleOnlyFavorites: () => void;
}

export const CATEGORIES: { id: CategoryId; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', name: 'Všechny okruhy', icon: FolderKanban },
  { id: 'ui-ux-design', name: 'Design UI/UX & Systémy', icon: Palette },
  { id: 'cli-filesystem-email', name: 'Složky, Maily & Překlady (Claude)', icon: HardDrive },
  { id: 'webdesign-apps', name: 'Webdesign & Aplikace', icon: Globe },
  { id: '3d-blender', name: '3D Modelování & Blender', icon: Box },
  { id: 'photo-images', name: 'Generování Fotografií', icon: Camera },
  { id: 'mockups-packaging', name: 'Mockupy & Obaly', icon: Package },
  { id: 'ai-workflows', name: 'AI Workflow pro Designéry', icon: Cpu },
  { id: 'vibecoding', name: 'Vibe Coding & Rapid MVP', icon: Zap },
  { id: 'adobe-suite', name: 'Adobe Creative Suite', icon: Layers },
  { id: 'motion-animation', name: 'Motion Design & Animace', icon: Film },
  { id: 'brand-identity', name: 'Brand & Corporate Identity', icon: Award },
  { id: 'ideamaking-direction', name: 'Ideamaking & Koncepty', icon: Lightbulb },
  { id: 'print-prepress', name: 'Tisk & DTP Prepress', icon: Printer },
];

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  templates,
  selectedTemplateId,
  onSelectTemplate,
  onToggleFavorite,
  onOpenNewTemplateModal,
  onEditTemplate,
  searchQuery,
  onSearchChange,
  onlyFavorites,
  onToggleOnlyFavorites
}) => {
  // Precompute category counts for instant rendering
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: templates.length };
    for (const t of templates) {
      counts[t.categoryId] = (counts[t.categoryId] || 0) + 1;
    }
    return counts;
  }, [templates]);

  // Filter templates based on category, search, favorites with useMemo
  const filteredTemplates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return templates.filter((template) => {
      if (selectedCategory !== 'all' && template.categoryId !== selectedCategory) {
        return false;
      }
      if (onlyFavorites && !template.isFavorite) {
        return false;
      }
      if (q) {
        const matchTitle = template.title.toLowerCase().includes(q);
        const matchDesc = template.description.toLowerCase().includes(q);
        const matchTags = template.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTags) return false;
      }
      return true;
    });
  }, [templates, selectedCategory, onlyFavorites, searchQuery]);

  return (
    <aside className="w-80 2xl:w-96 shrink-0 h-[calc(100vh-53px)] flex flex-col bg-black border-r border-zinc-800/80 overflow-hidden">
      {/* Search and Quick Filters */}
      <div className="p-3 border-b border-zinc-800/80 space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Hledat v šablonách (⌘K)..."
            className="w-full pl-8 pr-12 py-1.5 text-xs bg-zinc-900/90 border border-zinc-800 rounded-md text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/50 pointer-events-none">
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-400 px-0.5">
          <button
            onClick={onToggleOnlyFavorites}
            className={`flex items-center gap-1.5 py-1 px-2 rounded-md transition-colors ${
              onlyFavorites
                ? 'bg-zinc-900 text-amber-300 border border-zinc-700'
                : 'hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : 'text-zinc-500'}`} />
            <span className="text-[11px]">Oblíbené</span>
          </button>

          <button
            onClick={onOpenNewTemplateModal}
            className="flex items-center gap-1 py-1 px-2 text-[11px] text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-md transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>Nová šablona</span>
          </button>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="p-2 border-b border-zinc-800/80 max-h-56 overflow-y-auto">
        <div className="text-[11px] font-medium text-zinc-500 px-2 py-1 flex items-center justify-between">
          <span>Kreativní & Design Okruhy</span>
          <SlidersHorizontal className="w-3 h-3 text-zinc-600" />
        </div>
        <div className="space-y-0.5 mt-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors group ${
                  isSelected
                    ? 'bg-zinc-900 text-white font-medium border border-zinc-800'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                  <span className="truncate text-xs">{cat.name}</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 group-hover:text-zinc-400 tabular-nums">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
        <div className="px-1.5 py-1 text-[11px] font-medium text-zinc-500 flex items-center justify-between">
          <span>Knihovna šablon</span>
          <span className="font-mono text-[10px] text-zinc-600 tabular-nums">
            {filteredTemplates.length}
          </span>
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="py-8 px-4 text-center">
            <p className="text-xs text-zinc-500">Žádná šablona neodpovídá filtru.</p>
            <button
              onClick={() => {
                onSearchChange('');
                if (onlyFavorites) onToggleOnlyFavorites();
                onSelectCategory('all');
              }}
              className="mt-2 text-xs text-zinc-300 hover:underline"
            >
              Resetovat filtry
            </button>
          </div>
        ) : (
          filteredTemplates.map((template) => {
            const isSelected = template.id === selectedTemplateId;

            return (
              <div
                key={template.id}
                onClick={() => onSelectTemplate(template.id)}
                className={`relative group p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-zinc-900 border-zinc-700 shadow-sm'
                    : 'bg-zinc-950/60 border-zinc-850 border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <div className="flex items-start justify-between gap-1.5 mb-1">
                  <h3 className={`text-xs font-medium leading-snug line-clamp-1 ${isSelected ? 'text-white font-semibold' : 'text-zinc-200'}`}>
                    {template.title}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    {template.isCustom && onEditTemplate && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditTemplate(template);
                        }}
                        className="text-zinc-600 hover:text-white transition-colors p-0.5"
                        title="Editovat šablonu"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(template.id);
                      }}
                      className="text-zinc-600 hover:text-amber-400 transition-colors p-0.5"
                      title={template.isFavorite ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          template.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-2">
                  {template.description}
                </p>

                {template.authorFeedTip && (
                  <p className="text-[10px] text-zinc-500 font-mono mb-2 line-clamp-1 italic">
                    💡 {template.authorFeedTip}
                  </p>
                )}

                <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-850 border-zinc-800/40">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-zinc-400">{template.modelId}</span>
                    {template.isCustom && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-zinc-300 font-medium">Vlastní</span>
                      </>
                    )}
                  </div>
                  <span className="font-mono tabular-nums">{template.variables.length} proměnných</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
