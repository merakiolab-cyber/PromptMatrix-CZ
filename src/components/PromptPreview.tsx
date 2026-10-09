import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Copy,
  Check,
  Download,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  Edit3,
  FolderPlus
} from 'lucide-react';
import { formatExport, calculateMetrics } from '../utils/promptCompiler';
import { ExportFormat, ModelDefinition, WorkflowTarget, ProjectPhase } from '../types';
import { WORKFLOW_TARGETS, PROJECT_PHASES } from '../data/workflows';

interface PromptPreviewProps {
  promptText: string;
  onPromptChange: (text: string) => void;
  isManuallyEdited: boolean;
  onResetToTemplate: () => void;
  onCopy: () => void;
  onSaveToFolder?: () => void;
  isCopied: boolean;
  model: ModelDefinition;
  templateTitle: string;
  workflowTarget?: WorkflowTarget | null;
  projectPhase?: ProjectPhase | null;
}

export const PromptPreview: React.FC<PromptPreviewProps> = ({
  promptText,
  onPromptChange,
  isManuallyEdited,
  onResetToTemplate,
  onCopy,
  onSaveToFolder,
  isCopied,
  model,
  templateTitle,
  workflowTarget,
  projectPhase
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('text');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [formatOverrides, setFormatOverrides] = useState<Partial<Record<ExportFormat, string>>>({});
  const [localCopied, setLocalCopied] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const currentWf = WORKFLOW_TARGETS.find((w) => w.id === workflowTarget);
  const currentPhase = PROJECT_PHASES.find((p) => p.id === projectPhase);

  // Clear format overrides whenever the base promptText or model changes
  useEffect(() => {
    setFormatOverrides({});
  }, [promptText, model.id]);

  // Compute formatted export data for current format
  const exportData = useMemo(() => {
    return formatExport(promptText, selectedFormat, {
      title: templateTitle,
      modelName: model.name,
      workflowName: currentWf?.name,
      phaseName: currentPhase?.name
    });
  }, [promptText, selectedFormat, templateTitle, model.name, currentWf?.name, currentPhase?.name]);

  // The active text displayed in the editor
  const displayedText = formatOverrides[selectedFormat] !== undefined
    ? formatOverrides[selectedFormat]!
    : exportData.formatted;

  // Real-time live metrics calculated from the current displayed text
  const metrics = useMemo(() => calculateMetrics(displayedText), [displayedText]);

  const handleDownload = () => {
    const blob = new Blob([displayedText], { type: exportData.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exportData.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyDisplayed = () => {
    navigator.clipboard.writeText(displayedText).then(() => {
      setLocalCopied(true);
      setTimeout(() => setLocalCopied(false), 2200);
      onCopy();
    });
  };

  // Synchronize scrolling between line numbers and textarea
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Handle direct text editing in the active format
  const handleTextChange = (newVal: string) => {
    if (selectedFormat === 'text') {
      onPromptChange(newVal);
    } else {
      setFormatOverrides((prev) => ({
        ...prev,
        [selectedFormat]: newVal
      }));
    }
  };

  // Handle Tab key inside textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      handleTextChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lineCount = Math.max(1, displayedText.split('\n').length);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const hasModifications = isManuallyEdited || formatOverrides[selectedFormat] !== undefined;

  return (
    <div
      className={`flex flex-col bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-2xl transition-all h-full flex-1 min-h-0 ${
        isExpanded
          ? 'fixed inset-6 z-50 bg-black shadow-2xl ring-1 ring-zinc-600'
          : ''
      }`}
    >
      {/* Top Header of Preview */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
              <span>Živý Editor & Náhled</span>
            </h2>
          </div>
          <span aria-hidden="true" className="text-zinc-700 hidden sm:inline">|</span>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            {model.shortName}
          </span>
          {currentWf ? (
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded hidden lg:inline">
              {currentWf.shortName}
            </span>
          ) : (
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/50 border border-zinc-800/60 px-1.5 py-0.5 rounded hidden lg:inline">
              Bez workflow
            </span>
          )}
          {currentPhase ? (
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded hidden lg:inline">
              {currentPhase.badge}
            </span>
          ) : (
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/50 border border-zinc-800/60 px-1.5 py-0.5 rounded hidden lg:inline">
              Bez fáze
            </span>
          )}

          {hasModifications && (
            <div className="flex items-center gap-1.5 ml-1">
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <Edit3 className="w-2.5 h-2.5" />
                <span>Ručně upraveno</span>
              </span>
              <button
                onClick={() => {
                  setFormatOverrides({});
                  onResetToTemplate();
                }}
                className="text-[10px] font-mono text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-1.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                title="Vrátit původní vygenerovaný text šablony"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            </div>
          )}
        </div>

        {/* Real-time Telemetry Stats */}
        <div className="flex items-center gap-3 text-xs font-mono tabular-nums text-zinc-400">
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">Slov:</span>
            <span className="text-zinc-200">{metrics.wordCount}</span>
          </div>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">Znaků:</span>
            <span className="text-zinc-200">{metrics.charCount}</span>
          </div>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-300">
            <Sparkles className="w-3 h-3 text-zinc-400" />
            <span>~{metrics.tokenEstimate} tokenů</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Format selector buttons */}
          <div className="flex items-center p-0.5 bg-zinc-900 rounded-md border border-zinc-800">
            <button
              onClick={() => setSelectedFormat('text')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors cursor-pointer ${
                selectedFormat === 'text'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm ring-1 ring-zinc-500/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Čistý textový prompt"
            >
              TXT
            </button>
            <button
              onClick={() => setSelectedFormat('markdown')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors cursor-pointer ${
                selectedFormat === 'markdown'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm ring-1 ring-zinc-500/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Formát Markdown (prompt.md)"
            >
              MD
            </button>
            <button
              onClick={() => setSelectedFormat('cursorrules')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors cursor-pointer ${
                selectedFormat === 'cursorrules'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm ring-1 ring-zinc-500/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Formát .cursorrules pro Cursor IDE"
            >
              .rules
            </button>
            <button
              onClick={() => setSelectedFormat('claudemd')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors cursor-pointer ${
                selectedFormat === 'claudemd'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm ring-1 ring-zinc-500/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Formát CLAUDE.md pro Claude Code Pro"
            >
              CLAUDE.md
            </button>
            <button
              onClick={() => setSelectedFormat('json')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors cursor-pointer ${
                selectedFormat === 'json'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm ring-1 ring-zinc-500/30'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="JSON export se strukturovanými metadaty"
            >
              JSON
            </button>
          </div>

          {onSaveToFolder && (
            <button
              onClick={onSaveToFolder}
              className="px-2.5 py-1 text-xs text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              title="Uložit tento prompt do složky / zakázky klienta"
            >
              <FolderPlus className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Uložit do zakázky</span>
            </button>
          )}

          <button
            onClick={handleDownload}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors border border-zinc-800 cursor-pointer"
            title={`Stáhnout jako ${exportData.filename}`}
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors border border-zinc-800 cursor-pointer"
            title={isExpanded ? 'Minimalizovat náhled' : 'Zvětšit na celou obrazovku'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Editor & Editable Area */}
      <div className="flex-1 relative flex overflow-hidden bg-black text-xs font-mono">
        {/* Synchronized Line Numbers Gutter */}
        <div
          ref={lineNumbersRef}
          aria-hidden="true"
          className="select-none py-4 pl-3 pr-3 text-right text-zinc-600 font-mono text-xs border-r border-zinc-850 border-zinc-800/80 bg-zinc-950/40 shrink-0 space-y-0 overflow-hidden"
          style={{ width: '52px', lineHeight: '1.625rem' }}
        >
          {lineNumbers.map((num) => (
            <div key={num} className="tabular-nums leading-[1.625rem] text-[11px]">
              {num}
            </div>
          ))}
        </div>

        {/* Live Interactive Editable Textarea */}
        <div className="flex-1 relative h-full">
          <textarea
            ref={textareaRef}
            value={displayedText}
            onChange={(e) => handleTextChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            placeholder="Zde můžete prompt přímo psát, upravovat nebo doplňovat..."
            spellCheck={false}
            className="w-full h-full p-4 bg-transparent text-zinc-100 font-mono text-xs focus:outline-none resize-none overflow-y-auto leading-[1.625rem] selection:bg-zinc-700 selection:text-white placeholder:text-zinc-600"
            style={{ tabSize: 2 }}
          />
        </div>
      </div>

      {/* Sticky Bottom Actions Bar with Vercel Solid White Button */}
      <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-3">
        <div className="text-[11px] text-zinc-400 flex items-center gap-2 truncate">
          <span className="text-zinc-500">Aktivní formát:</span>
          <span className="font-mono text-zinc-200 font-medium truncate bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
            {exportData.filename}
          </span>
          <span className="text-zinc-600 hidden md:inline">·</span>
          <span className="text-zinc-500 text-[10px] hidden md:inline">
            Změna formátu nahoře okamžitě přeformátuje text.
          </span>
        </div>

        <button
          onClick={handleCopyDisplayed}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
            isCopied || localCopied
              ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
              : 'bg-white text-black hover:bg-zinc-200 shadow-sm'
          }`}
        >
          {isCopied || localCopied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Zkopírováno do schránky!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-black" />
              <span>Kopírovat {selectedFormat.toUpperCase()} do schránky</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-black/10 rounded font-mono font-normal">
                ⌘↵
              </kbd>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
