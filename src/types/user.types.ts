export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profile_picture: string | null;
  points: number;
  current_streak: number;
  max_streak: number;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  name?: string;
  profile_picture?: string | null;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}