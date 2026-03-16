export interface Task {
  id: number;
  user_id: string;
  challenge_template_id: number | null;
  title: string;
  description: string | null;
  points: number;
  is_daily_routine: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskWithCount {
  task: Task;
  completion_count: number;
}

export interface TaskCompletion {
  id: number;
  user_id: string;
  task_id: number;
  completed_at: string;
}

export interface CreateTaskData {
  challenge_template_id?: number | null;
  title: string;
  description?: string;
  points: number;
  is_daily_routine?: boolean;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  points?: number;
  is_daily_routine?: boolean;
}