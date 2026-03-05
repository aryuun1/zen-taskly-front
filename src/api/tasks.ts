import { api } from './client'
import type { Task, TasksResponse, TaskFilters } from '../types'

export const tasksApi = {
  getAll: (filters?: TaskFilters) => {
    const params = new URLSearchParams()
    if (filters?.status) params.set('status', filters.status)
    if (filters?.dueDate) params.set('dueDate', filters.dueDate)
    const query = params.toString() ? `?${params.toString()}` : ''
    return api.get<TasksResponse>(`/tasks${query}`)
  },

  create: (data: { title: string; description?: string; status?: string; dueDate?: string }) =>
    api.post<Task>('/tasks', data as Record<string, unknown>, true),

  update: (id: string, data: { title?: string; description?: string; status?: string; dueDate?: string }) =>
    api.put<Task>(`/tasks/${id}`, data as Record<string, unknown>),

  delete: (id: string) =>
    api.delete<{ message: string }>(`/tasks/${id}`),
}
