import { useState, useCallback, useRef } from 'react';
import { PromptVariable, ModelId, WorkflowTarget, ProjectPhase, VisualPropositions } from '../types';

export interface EditorSnapshot {
  templateId: string;
  variables: PromptVariable[];
  manualPromptText: string | null;
  modelId: ModelId;
  workflowTarget: WorkflowTarget | null;
  projectPhase: ProjectPhase | null;
  visualProps: VisualPropositions;
}

export function usePromptHistory(initialSnapshot: EditorSnapshot) {
  const [past, setPast] = useState<EditorSnapshot[]>([]);
  const [future, setFuture] = useState<EditorSnapshot[]>([]);
  const [current, setCurrent] = useState<EditorSnapshot>(initialSnapshot);

  const isInternalChange = useRef(false);

  // Push a new snapshot to history
  const recordSnapshot = useCallback((newSnapshot: EditorSnapshot) => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }

    // Avoid recording identical consecutive states
    if (
      current.templateId === newSnapshot.templateId &&
      current.modelId === newSnapshot.modelId &&
      current.workflowTarget === newSnapshot.workflowTarget &&
      current.projectPhase === newSnapshot.projectPhase &&
      current.manualPromptText === newSnapshot.manualPromptText &&
      JSON.stringify(current.variables) === JSON.stringify(newSnapshot.variables) &&
      JSON.stringify(current.visualProps) === JSON.stringify(newSnapshot.visualProps)
    ) {
      return;
    }

    setPast((prev) => [...prev.slice(-49), current]);
    setCurrent(newSnapshot);
    setFuture([]);
  }, [current]);

  const undo = useCallback((): EditorSnapshot | null => {
    if (past.length === 0) return null;

    isInternalChange.current = true;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setFuture((prev) => [current, ...prev]);
    setCurrent(previous);

    return previous;
  }, [past, current]);

  const redo = useCallback((): EditorSnapshot | null => {
    if (future.length === 0) return null;

    isInternalChange.current = true;
    const next = future[0];
    const newFuture = future.slice(1);

    setPast((prev) => [...prev, current]);
    setFuture(newFuture);
    setCurrent(next);

    return next;
  }, [future, current]);

  return {
    current,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    recordSnapshot,
    undo,
    redo,
    pastCount: past.length,
    futureCount: future.length
  };
}
