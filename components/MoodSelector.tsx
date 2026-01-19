import React from 'react';
import { MOODS } from '../constants';
import { MoodOption } from '../types';
import { Sparkles } from 'lucide-react';

interface Props {
  onSelectMood: (mood: MoodOption) => void;
}

const MoodSelector: React.FC<Props> = ({ onSelectMood }) => {
  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/50 overflow-y-auto pb-20 sm:pb-24">
      <div className="flex-1 flex flex-col justify-center px-4 py-8 sm:px-6 md:px-8 max-w-3xl mx-auto w-full animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-serene-100 to-serene-50 shadow-sm border border-serene-100">
              <Sparkles className="w-6 sm:w-6 h-6 sm:h-6 text-serene-600" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">haven</h1>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide leading-none">Your Mental Health Companion</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-base sm:text-lg md:text-xl text-slate-700 mb-8 sm:mb-10 leading-relaxed font-medium">
            How are you feeling today?
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4">
            {MOODS.map((mood, index) => (
              <button
                key={mood.id}
                onClick={() => onSelectMood(mood)}
                className="group relative bg-white border border-slate-100 p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-lg hover:border-serene-200 transition-all duration-300 flex flex-col items-center gap-2 active:bg-slate-50 sm:active:bg-white"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-3xl sm:text-4xl filter group-hover:scale-110 transition-transform duration-300">
                  {mood.emoji}
                </span>
                <span className="font-medium text-xs sm:text-sm text-slate-700 group-hover:text-serene-600 text-center leading-tight">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-sm sm:text-base text-slate-800 mb-2">
            Finding your match
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We'll recommend a mentor tailored to how you're feeling. Each mentor has a unique approach to support your well-being.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;