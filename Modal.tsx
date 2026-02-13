import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string | null;
  title: string | null;
  type: 'video' | 'game' | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, url, title, type }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Content Container */}
      <div className="relative w-full max-w-5xl bg-white shadow-2xl border border-gray-100 rounded-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <h3 className="font-serif text-lg font-bold text-ink truncate pr-4">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-ink hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Media Area */}
        <div className="flex-1 bg-black relative aspect-video w-full">
          <iframe 
            src={url} 
            title={title || "Media content"}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          />
        </div>

        {/* Footer / Fallback */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm text-subtle">
          <span>
            {type === 'game' ? '交互式演示' : '视频演示'}
          </span>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink font-medium hover:underline"
          >
            无法加载? 在新标签页打开 <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;