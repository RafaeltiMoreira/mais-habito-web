import type { Task, TaskCompletion, CreateTaskData, UpdateTaskData, TaskWithCount } from "../types/task.types";
import api from "./api";

export const taskService = {
  createTask: async (data: CreateTaskData) => {
    const response = await api.post(`/tasks`, data);
    return response.data as Task;
  },

  listMyTasks: async () => {
    const response = await api.get(`/tasks/me`);
    return response.data as TaskWithCount[];
  },

  updateTask: async (taskId: number, data: UpdateTaskData) => {
    const response = await api.put(`/tasks/${taskId}`, data);
    return response.data as Task;
  },

  deleteTask: async (taskId: number) => {
    await api.delete(`/tasks/${taskId}`);
  },

  completeTask: async (taskId: number, photoUrl?: string) => {
    const response = await api.post(`/task-completions`, {
      task_id: taskId,
      photo_url: photoUrl || null,
    });
    return response.data as TaskCompletion;
  },
};
