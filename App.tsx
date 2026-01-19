import React, { useState, useEffect } from 'react';
import MoodSelector from './components/MoodSelector';
import MentorSelector from './components/MentorSelector';
import ChatInterface from './components/ChatInterface';
import { UserPreferences, Mentor, MoodOption } from './types';
import { MENTORS } from './constants';
import { getMentorForMood } from './utils/moodToMentor';

function App() {
  const [prefs, setPrefs] = useState<UserPreferences>({
    selectedMood: null,
    selectedMentorId: null
  });

  const [currentMentor, setCurrentMentor] = useState<Mentor | null>(null);

  // Auto-select mentor based on mood
  useEffect(() => {
    if (prefs.selectedMood) {
      const recommendedMentorId = getMentorForMood(prefs.selectedMood);
      const mentor = MENTORS.find(m => m.id === recommendedMentorId);
      if (mentor) {
        setCurrentMentor(mentor);
        setPrefs(prev => ({ ...prev, selectedMentorId: mentor.id }));
      }
    }
  }, [prefs.selectedMood]);

  const handleMoodSelect = (mood: MoodOption) => {
    setPrefs(prev => ({ ...prev, selectedMood: mood }));
  };

  const handleMentorSelect = (mentor: Mentor) => {
    setCurrentMentor(mentor);
    setPrefs(prev => ({ ...prev, selectedMentorId: mentor.id }));
  };

  const handleReset = () => {
    setPrefs(prev => ({ ...prev, selectedMentorId: null, selectedMood: null }));
    setCurrentMentor(null);
  };

  return (
    <div className="relative w-full min-h-dvh bg-slate-50 flex flex-col font-sans overflow-hidden">
      <main className="flex-1 flex flex-col w-full overflow-hidden">
        {prefs.selectedMentorId && currentMentor ? (
          <ChatInterface mentor={currentMentor} onReset={handleReset} />
        ) : (
          <MentorSelector currentMentor={currentMentor} selectedMood={prefs.selectedMood} onSelectMood={handleMoodSelect} onSelectMentor={handleMentorSelect} />
        )}
      </main>
    </div>
  );
}

export default App;