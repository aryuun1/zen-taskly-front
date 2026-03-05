export interface User {
  id: string
  name: string
  email: string
}

export type TaskStatus = 'pending' | 'completed'

export interface Task {
  _id: string
  title: string
  description?: string
  status: TaskStatus
  dueDate?: string
  owner: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  token: string
  message: string
  user: User
}

export interface TasksResponse {
  source: 'cache' | 'database'
  tasks: Task[]
}

export interface TaskFilters {
  status?: TaskStatus | ''
  dueDate?: string
}
