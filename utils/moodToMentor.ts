import { MoodOption } from '../types';

// Map moods to recommended mentor IDs
const moodMentorMap: Record<string, string> = {
  happy: 'kai',           // Motivation & Growth
  calm: 'luna',           // Mindfulness Coach
  anxious: 'marcus',      // Coping Strategist
  sad: 'sarah',           // Compassionate Listener
  angry: 'marcus',        // Coping Strategist
  tired: 'oliver',        // Sleep & Serenity
};

export const getMentorForMood = (mood: MoodOption): string => {
  return moodMentorMap[mood.id] || 'sarah'; // Default to Sarah
};
