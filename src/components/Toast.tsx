import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastState } from '../types/json';

interface ToastProps {
  toast: ToastState | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-short">
      <div
        className={`flex items-center space-x-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all ${
          isSuccess
            ? 'bg-slate-900 text-white border-slate-800'
            : isError
            ? 'bg-rose-900 text-white border-rose-800'
            : 'bg-himat-900 text-white border-himat-800'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-himat-400 shrink-0" />}

        <span>{toast.message}</span>

        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
