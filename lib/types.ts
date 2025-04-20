// Common types used across the application
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Level {
  current: number;
  experience: number;
  nextLevelExperience: number;
}

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  menteeId: string;
  projectId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  role: 'contributor' | 'hirer';
  name: string;
  bio: string;
  avatar: string;
  location: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  skills: string[];
  achievements: Achievement[];
  badges: Badge[];
  level: Level;
  mentoring?: {
    available: boolean;
    expertise: string[];
    rate: number;
    rating: number;
    totalMentees: number;
  };
}