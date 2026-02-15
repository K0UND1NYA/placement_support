import { X, AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function Modal({ isOpen, onClose, onConfirm, title, message, type = "info", confirmText = "Confirm", cancelText = "Cancel" }) {
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: <AlertTriangle size={24} className="text-red-600" />,
      bg: "bg-red-100",
      btn: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    },
    success: {
      icon: <CheckCircle size={24} className="text-green-600" />,
      bg: "bg-green-100",
      btn: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    },
    info: {
      icon: <Info size={24} className="text-blue-600" />,
      bg: "bg-blue-100",
      btn: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${config.bg}`}>
              {config.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 leading-6 mb-2">
                {title}
              </h3>
              <p className="text-sm text-slate-500">
                {message}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-slate-700 font-bold rounded-lg border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
            }}
            className={`px-4 py-2 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-colors ${config.btn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
