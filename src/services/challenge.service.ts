import type { ChallengeTemplate, UserChallenge } from "../types/challenge.types";
import api from "./api";

export const challengeService = {
  // Challenge Templates
  listTemplates: async () => {
    const response = await api.get(`/challenge-templates`);
    return response.data as ChallengeTemplate[];
  },
  createTemplate: async (data: { title: string; description: string; duration_days: number }) => {
    const response = await api.post(`/challenge-templates`, data);
    return response.data as ChallengeTemplate;
  },
  deleteTemplate: async (id: number) => {
    await api.delete(`/challenge-templates/${id}`);
  },

  // User Challenges
  acceptChallenge: async (templateId: number) => {
    const response = await api.post(`/user-challenges/accept`, { templateId });
    return response.data as UserChallenge;
  },

  getActiveChallenge: async () => {
    const response = await api.get(`/user-challenges/active`);
    return response.data as UserChallenge;
  },

  listMyChallenges: async () => {
    const response = await api.get(`/user-challenges`);
    return response.data as UserChallenge[];
  },

  completeChallenge: async (id: number) => {
    const response = await api.put(`/user-challenges/${id}/complete`);
    return response.data as { message: string; challenge: UserChallenge };
  },

  abandonChallenge: async (id: number) => {
    const response = await api.put(`/user-challenges/${id}/abandon`);
    return response.data as { message: string; challenge: UserChallenge };
  },

  updateNotes: async (id: number, notes: string) => {
    const response = await api.put(`/user-challenges/${id}/notes`, { notes });
    return response.data as UserChallenge;
  },
};
