export type Role = 'user' | 'model';

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string; // Full URL to DiceBear
  personality: string;
  greeting: string;
}

export type ViewState = 'onboarding' | 'chat';

export interface UserPreferences {
  selectedMood: MoodOption | null;
  selectedMentorId: string | null;
}

export interface MoodOption {
  id: string;
  label: string;
  emoji: string;
  color: string;
}