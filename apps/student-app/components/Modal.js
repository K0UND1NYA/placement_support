'use client';

import React, { useEffect, useRef } from 'react';
import { X, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

const Modal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'info', 
  confirmText = 'Confirm', 
  cancelText = 'Cancel', 
  showCancel = true,
  isLoading = false
}) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Entrance animation
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      bg: 'bg-red-50',
      iconColor: 'bg-red-100 text-red-600',
      buttonBg: 'bg-red-600 hover:bg-red-700 shadow-red-200',
      borderColor: 'border-red-100',
      icon: <AlertTriangle size={24} />
    },
    warning: {
      bg: 'bg-amber-50',
      iconColor: 'bg-amber-100 text-amber-600',
      buttonBg: 'bg-amber-600 hover:bg-amber-700 shadow-amber-200',
      borderColor: 'border-amber-100',
      icon: <AlertTriangle size={24} />
    },
    info: {
      bg: 'bg-blue-50',
      iconColor: 'bg-blue-100 text-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200',
      borderColor: 'border-blue-100',
      icon: <Info size={24} />
    },
    success: {
      bg: 'bg-emerald-50',
      iconColor: 'bg-emerald-100 text-emerald-600',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200',
      borderColor: 'border-emerald-100',
      icon: <CheckCircle2 size={24} />
    }
  };

  const config = typeConfig[type] || typeConfig.info;

  const handleConfirm = () => {
    gsap.to(modalRef.current, { 
      scale: 0.95, 
      opacity: 0, 
      duration: 0.2, 
      onComplete: onConfirm 
    });
  };

  const handleClose = () => {
    gsap.to(modalRef.current, { 
      scale: 0.95, 
      opacity: 0, 
      duration: 0.2, 
      onComplete: onClose 
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" 
        onClick={handleClose} 
      />
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all border border-slate-100"
      >
        <div className="p-8 sm:p-10">
          <div className="flex items-start justify-between mb-8">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${config.iconColor} shadow-sm`}>
              {config.icon}
            </div>
            <button 
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              {title}
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              {message}
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row-reverse gap-3">
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={`flex-1 inline-flex justify-center items-center rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${config.buttonBg}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : confirmText}
            </button>
            {showCancel && (
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 inline-flex justify-center items-center rounded-2xl bg-slate-50 px-6 py-4 text-sm font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {cancelText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
