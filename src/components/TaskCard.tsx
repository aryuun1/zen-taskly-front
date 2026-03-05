import { useState } from 'react'
import { format, isPast, isToday } from 'date-fns'
import { Calendar, CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TaskForm } from '@/components/TaskForm'
import { tasksApi } from '@/api/tasks'
import type { Task } from '@/types'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  onUpdated: (task: Task) => void
  onDeleted: (id: string) => void
}

export function TaskCard({ task, onUpdated, onDeleted }: TaskCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const dueDate = task.dueDate ? new Date(task.dueDate) : null
  const isOverdue = dueDate && isPast(dueDate) && !isToday(dueDate) && task.status === 'pending'

  const toggleStatus = async () => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending'
    const updated = await tasksApi.update(task._id, { status: newStatus })
    onUpdated(updated)
  }

  const handleEdit = async (data: {
    title: string
    description: string
    status: string
    dueDate: string
  }) => {
    setLoading(true)
    const updated = await tasksApi.update(task._id, data)
    onUpdated(updated)
    setLoading(false)
    setEditOpen(false)
  }

  const handleDelete = async () => {
    await tasksApi.delete(task._id)
    onDeleted(task._id)
  }

  return (
    <>
      <Card
        className={cn(
          'group transition-all duration-200 hover:shadow-md',
          task.status === 'completed' && 'opacity-70',
          isOverdue && 'border-red-200 bg-red-50/30',
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start gap-3">
            <button
              onClick={toggleStatus}
              className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-primary"
            >
              {task.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'font-medium leading-tight',
                  task.status === 'completed' && 'line-through text-muted-foreground',
                )}
              >
                {task.title}
              </p>
              {task.description && (
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setEditOpen(true)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <div className="flex items-center gap-2 ml-8">
            <Badge variant={task.status === 'completed' ? 'success' : 'warning'}>
              {task.status}
            </Badge>
            {dueDate && (
              <span
                className={cn(
                  'flex items-center gap-1 text-xs',
                  isOverdue ? 'text-red-500 font-medium' : 'text-muted-foreground',
                )}
              >
                <Calendar className="h-3 w-3" />
                {isOverdue ? 'Overdue · ' : ''}
                {format(dueDate, 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            task={task}
            onSubmit={handleEdit}
            onCancel={() => setEditOpen(false)}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
