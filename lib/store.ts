import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile, MentorshipRequest } from './types';

interface GameState {
  profiles: Record<string, Profile>;
  mentorshipRequests: MentorshipRequest[];
  updateProfile: (userId: string, profile: Partial<Profile>) => void;
  addMentorshipRequest: (request: MentorshipRequest) => void;
  updateMentorshipRequest: (requestId: string, status: 'accepted' | 'rejected') => void;
}

// Initial dummy data
const dummyProfiles: Record<string, Profile> = {
  '1': {
    id: '1',
    userId: '1',
    role: 'contributor',
    name: 'John Doe',
    bio: 'Full-stack developer passionate about building great products',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    location: 'San Francisco, CA',
    github: 'johndoe',
    linkedin: 'johndoe',
    skills: ['React', 'Node.js', 'TypeScript'],
    achievements: [
      {
        id: 'first-project',
        name: 'First Project',
        description: 'Upload your first project',
        icon: '🚀',
        progress: 1,
        maxProgress: 1,
        completed: true,
        points: 100
      }
    ],
    badges: [
      {
        id: 'early-adopter',
        name: 'Early Adopter',
        icon: '⭐',
        rarity: 'rare'
      }
    ],
    level: {
      current: 5,
      experience: 550,
      nextLevelExperience: 1000
    }
  },
  '2': {
    id: '2',
    userId: '2',
    role: 'hirer',
    name: 'TechCorp',
    bio: 'Leading technology company building the future',
    avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
    location: 'New York, NY',
    website: 'https://techcorp.com',
    linkedin: 'techcorp',
    skills: ['Technical Leadership', 'Project Management'],
    achievements: [
      {
        id: 'first-hire',
        name: 'First Hire',
        description: 'Make your first hire through the platform',
        icon: '🎯',
        progress: 1,
        maxProgress: 1,
        completed: true,
        points: 100
      }
    ],
    badges: [
      {
        id: 'top-hirer',
        name: 'Top Hirer',
        icon: '🏆',
        rarity: 'epic'
      }
    ],
    level: {
      current: 3,
      experience: 350,
      nextLevelExperience: 500
    },
    mentoring: {
      available: true,
      expertise: ['Web Development', 'Career Growth'],
      rate: 0,
      rating: 4.8,
      totalMentees: 12
    }
  }
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      profiles: dummyProfiles,
      mentorshipRequests: [],
      updateProfile: (userId, profile) =>
        set((state) => ({
          profiles: {
            ...state.profiles,
            [userId]: { ...state.profiles[userId], ...profile }
          }
        })),
      addMentorshipRequest: (request) =>
        set((state) => ({
          mentorshipRequests: [...state.mentorshipRequests, request]
        })),
      updateMentorshipRequest: (requestId, status) =>
        set((state) => ({
          mentorshipRequests: state.mentorshipRequests.map((request) =>
            request.id === requestId ? { ...request, status } : request
          )
        }))
    }),
    {
      name: 'game-storage'
    }
  )
);