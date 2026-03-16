export interface ChallengeTemplate {
  id: number;
  title: string;
  description: string;
  duration_days: number;
  created_at: string;
  updated_at: string;
}

export interface UserChallenge {
  id: number;
  user_id: string;
  template_id: number;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  start_date: string;
  completed_at: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  template?: ChallengeTemplate;
}
