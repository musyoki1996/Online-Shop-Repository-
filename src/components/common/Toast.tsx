import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icon = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
          error: <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
        }[toast.type];

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#083C39] text-white p-3.5 rounded-lg shadow-xl border border-emerald-800/60 flex items-start gap-3 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
          >
            {icon}
            <div className="flex-1 text-xs font-medium leading-relaxed">
              {toast.message}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-emerald-300/60 hover:text-white p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
