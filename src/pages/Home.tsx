import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  Plus,
  LogOut,
  ListTodo,
  SlidersHorizontal,
  X,
  Loader2,
  ClipboardList,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { TaskCard } from '@/components/TaskCard'
import { TaskForm } from '@/components/TaskForm'
import { tasksApi } from '@/api/tasks'
import { useAuth } from '@/context/AuthContext'
import type { Task, TaskFilters, TaskStatus } from '@/types'

export function Home() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [filters, setFilters] = useState<TaskFilters>({ status: '', dueDate: '' })
  const [error, setError] = useState('')

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await tasksApi.getAll(filters)
      setTasks(res.tasks)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleCreate = async (data: {
    title: string
    description: string
    status: string
    dueDate: string
  }) => {
    setCreateLoading(true)
    const task = await tasksApi.create(data)
    setTasks((prev) => [task, ...prev])
    setCreateLoading(false)
    setCreateOpen(false)
  }

  const handleUpdated = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)))
  }

  const handleDeleted = (id: string) => {
    setTasks((prev) => prev.filter((t) => t._id !== id))
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const clearFilters = () => {
    setFilters({ status: '', dueDate: '' })
  }

  const hasFilters = filters.status || filters.dueDate

  const pendingCount = tasks.filter((t) => t.status === 'pending').length
  const completedCount = tasks.filter((t) => t.status === 'completed').length

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">Taskly</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <ListTodo className="h-4 w-4" />
                <span>{pendingCount} pending</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>{completedCount} done</span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <div className="font-medium truncate">{user?.name}</div>
                  <div className="text-xs text-muted-foreground font-normal truncate">
                    {user?.email}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Page header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Good work, {user?.name?.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground mt-1">
              {tasks.length === 0
                ? 'No tasks yet — create one to get started'
                : `You have ${pendingCount} task${pendingCount !== 1 ? 's' : ''} left to complete`}
            </p>
          </div>

          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shrink-0">
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
              </DialogHeader>
              <TaskForm
                onSubmit={handleCreate}
                onCancel={() => setCreateOpen(false)}
                loading={createLoading}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white rounded-xl border">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </div>
          <div className="h-4 w-px bg-border" />

          <Select
            value={filters.status || 'all'}
            onValueChange={(val) =>
              setFilters((f) => ({ ...f, status: val === 'all' ? '' : (val as TaskStatus) }))
            }
          >
            <SelectTrigger className="w-36 h-8 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Due by</span>
            <Input
              type="date"
              className="w-36 h-8 text-xs"
              value={filters.dueDate || ''}
              onChange={(e) => setFilters((f) => ({ ...f, dueDate: e.target.value }))}
            />
          </div>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-xs text-muted-foreground"
              onClick={clearFilters}
            >
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}

          {hasFilters && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {tasks.length} result{tasks.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        {/* Task list */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={fetchTasks}>
              Try again
            </Button>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
              <ClipboardList className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {hasFilters ? 'No tasks match your filters' : 'No tasks yet'}
            </h3>
            <p className="text-muted-foreground max-w-xs">
              {hasFilters
                ? 'Try adjusting your filters or clear them to see all tasks.'
                : 'Create your first task and start getting things done.'}
            </p>
            {!hasFilters && (
              <Button className="mt-6 gap-2" onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4" />
                Create your first task
              </Button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdated={handleUpdated}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
