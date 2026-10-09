import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-3.5 py-2.5 bg-zinc-900/95 border border-zinc-700 shadow-2xl backdrop-blur-md rounded-lg text-xs animate-in fade-in slide-in-from-bottom-2 duration-150"
    >
      {type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
      {type === 'error' && <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
      {type === 'info' && <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />}
      <span className="text-zinc-100 font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-1 text-zinc-500 hover:text-zinc-200 transition-colors p-0.5"
        aria-label="Zavřít oznámení"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};
