import React from 'react';
import { AlertCircle } from 'lucide-react';
import Logo from './Logo';

interface Props {
  onAccept: () => void;
}

const DisclaimerModal: React.FC<Props> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5 sm:p-6 animate-slide-up">
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="bg-serene-50 p-3 sm:p-4 rounded-full">
            <Logo className="w-8 sm:w-10 h-8 sm:h-10" />
          </div>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-slate-800 mb-2">Welcome to haven</h2>
        <p className="text-slate-500 text-center mb-5 sm:mb-6 text-sm">
          A supportive space for your mental well-being.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 sm:p-4 mb-5 sm:mb-6">
          <div className="flex gap-3">
            <AlertCircle className="text-amber-600 w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700">
              <p className="font-semibold text-amber-800 mb-1">Important Disclaimer</p>
              <p className="text-xs sm:text-sm">
                I am an AI assistant, not a licensed professional. I cannot diagnose medical conditions or prescribe treatment. 
              </p>
              <p className="mt-2 text-xs sm:text-sm">
                This service is for emotional support and self-help strategies. It is <strong>not</strong> a replacement for professional therapy.
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={onAccept}
          className="w-full bg-serene-600 hover:bg-serene-700 text-white font-medium py-2.5 sm:py-3 rounded-xl transition-all shadow-md shadow-serene-200 text-sm sm:text-base"
        >
          I Understand & Agree
        </button>
        
        <p className="text-[11px] sm:text-xs text-slate-400 text-center mt-3 sm:mt-4">
          Your conversations are private but stored in temporary memory for this session only.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerModal;