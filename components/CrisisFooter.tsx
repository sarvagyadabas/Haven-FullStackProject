import React from 'react';
import { AlertTriangle, Phone, MessageSquare } from 'lucide-react';

const CrisisFooter: React.FC = () => {
  return (
    <div className="fixed bottom-16 sm:bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 sm:p-3 z-40 text-[10px] sm:text-xs md:text-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 text-slate-600">
        <div className="flex items-center gap-2 text-rose-600 font-medium">
          <AlertTriangle size={14} className="sm:w-4 sm:h-4" />
          <span className="truncate">In Crisis?</span>
        </div>
        <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
          <a href="tel:988" className="flex items-center gap-1 hover:text-rose-600 transition-colors">
            <Phone size={12} className="sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">988</span>
          </a>
          <a href="sms:741741" className="flex items-center gap-1 hover:text-rose-600 transition-colors">
            <MessageSquare size={12} className="sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">Text HOME to 741741</span>
          </a>
        </div>
        <div className="hidden sm:block text-slate-400 text-[9px] md:text-[10px] uppercase tracking-wider whitespace-nowrap">
          24/7 Available
        </div>
      </div>
    </div>
  );
};

export default CrisisFooter;