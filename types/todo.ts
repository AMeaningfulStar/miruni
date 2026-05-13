export type TodoStatus = 'pending' | 'completed'

export type TodoViewMode = 'day' | 'week' | 'month'

export type Todo = {
  id: string
  title: string
  date: string // YYYY-MM-DD
  status: TodoStatus
  postponedCount: number
  createdAt: string
  updatedAt: string
}