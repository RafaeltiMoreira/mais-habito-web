import { create } from 'zustand';
import type { ChallengeTemplate, UserChallenge } from '../types/challenge.types';
import type { TaskWithCount } from '../types/task.types';
import type { UserProfile } from '../types/user.types';

export interface DashboardMetrics {
  currentStreak: number;
  maxStreak: number;
  points: number;
  completedToday: boolean;
}

interface AppCache {
  // Dashboard
  dashboardTasks: TaskWithCount[];
  dashboardMetrics: DashboardMetrics | null;

  // Challenges
  activeUserChallenge: UserChallenge | null;
  userChallenges: UserChallenge[];
  challengeTemplates: ChallengeTemplate[];

  // Tasks
  tasks: TaskWithCount[];

  // Profile
  profile: UserProfile | null;

  setDashboard: (data: Partial<Pick<AppCache, 'dashboardTasks' | 'dashboardMetrics'>>) => void;
  setChallenges: (data: Partial<Pick<AppCache, 'activeUserChallenge' | 'userChallenges' | 'challengeTemplates'>>) => void;
  setTasks: (data: Partial<Pick<AppCache, 'tasks'>>) => void;
  setProfile: (profile: UserProfile | null) => void;
  clearCache: () => void;
}

export const useAppCache = create<AppCache>((set) => ({
  dashboardTasks: [],
  dashboardMetrics: null,
  activeUserChallenge: null,
  userChallenges: [],
  challengeTemplates: [],
  tasks: [],
  profile: null,

  setDashboard: (data) => set((state) => ({ ...state, ...data })),
  setChallenges: (data) => set((state) => ({ ...state, ...data })),
  setTasks: (data) => set((state) => ({ ...state, ...data })),
  setProfile: (profile) => set({ profile }),
  clearCache: () => set({
    dashboardTasks: [],
    dashboardMetrics: null,
    activeUserChallenge: null,
    userChallenges: [],
    challengeTemplates: [],
    tasks: [],
    profile: null,
  }),
}));