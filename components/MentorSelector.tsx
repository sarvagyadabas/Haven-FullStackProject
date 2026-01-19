import React from 'react';
import { MENTORS, MOODS } from '../constants';
import { Mentor, MoodOption } from '../types';
import Logo from './Logo';
import { Sparkles } from 'lucide-react';
import FooterNote from './FooterNote';

interface Props {
  onSelectMentor: (mentor: Mentor) => void;
  selectedMood: MoodOption | null;
  onSelectMood: (mood: MoodOption | null) => void;
  currentMentor: Mentor | null;
}

const MentorSelector: React.FC<Props> = ({ onSelectMentor, selectedMood, onSelectMood, currentMentor }) => {
  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/50 overflow-y-auto pb-8 sm:pb-10">
      <div className="flex-1 flex flex-col px-4 py-8 sm:px-6 md:px-8 max-w-4xl mx-auto w-full animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-serene-100 to-serene-50 shadow-sm border border-serene-100">
              <Logo className="w-6 sm:w-6 h-6 sm:h-6" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">haven</h1>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide leading-none">Your Mental Health Companion</p>
          </div>
        </div>

        {/* Mood Selector Section */}
        {!selectedMood && (
          <div className="mb-8 sm:mb-10">
            <h2 className="text-base sm:text-lg text-slate-700 mb-4 font-medium">
              How are you feeling today?
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
              {MOODS.map((mood, index) => (
                <button
                  key={mood.id}
                  onClick={() => onSelectMood(mood)}
                  className="group relative bg-white border border-slate-100 p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-lg hover:border-serene-200 transition-all duration-300 flex flex-col items-center justify-center gap-2 active:bg-slate-50 sm:active:bg-white"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-800 group-hover:text-serene-600 text-center leading-tight">
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="p-3 sm:p-4 bg-serene-50 border border-serene-100 rounded-2xl">
              <p className="text-xs sm:text-sm text-serene-800 leading-relaxed">
                <span className="font-semibold">Tip:</span> Select your mood and we'll automatically recommend the best mentor for you. But don't worry, you can still chat with any other mentor manually!
              </p>
            </div>
          </div>
        )}

        {/* Selected Mood Display */}
        {selectedMood && (
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 p-4 sm:p-5 bg-white border border-slate-100 rounded-2xl shadow-sm mb-5">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-slate-500">You're feeling</p>
                <p className="font-semibold text-slate-800 text-sm sm:text-base">{selectedMood.label}</p>
              </div>
              <button 
                onClick={() => onSelectMood(null)}
                className="text-xs px-3 py-1.5 text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
              >
                Change
              </button>
            </div>
            <div className="p-3 sm:p-4 bg-serene-50 border border-serene-100 rounded-2xl mb-6">
              <p className="text-xs sm:text-sm text-serene-800 leading-relaxed">
                <span className="font-semibold">✨ Perfect!</span> We've recommended <span className="font-semibold">{currentMentor?.name || 'a mentor'}</span> based on your mood. You can also explore and chat with other mentors below if you'd like a different perspective.
              </p>
            </div>
          </div>
        )}

        {/* Mentor Suggestion Header */}
        {selectedMood && (
          <h2 className="text-base sm:text-lg text-slate-700 mb-6 font-medium">
            Choose your mentor
          </h2>
        )}

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8">
          {MENTORS.map((mentor, index) => (
            <button
              key={mentor.id}
              onClick={() => onSelectMentor(mentor)}
              className="group relative bg-white border border-slate-100 p-4 sm:p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-serene-200 transition-all duration-300 text-left flex flex-col sm:flex-row items-center sm:items-start gap-4 active:bg-slate-50 sm:active:bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={mentor.avatar} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                  <h3 className="font-bold text-base sm:text-lg text-slate-800 group-hover:text-serene-600 transition-colors">
                    {mentor.name}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-full group-hover:bg-serene-50 group-hover:text-serene-600 transition-colors w-fit mx-auto sm:mx-0">
                    Select
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-serene-600 mb-2">{mentor.role}</p>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {mentor.description}
                </p>
              </div>
            </button>
          ))}
        </div>
        <FooterNote />
      </div>
    </div>
  );
};

export default MentorSelector;