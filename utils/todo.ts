import { Todo } from '@/types/todo'
import { getTodayDateKey } from '@/utils/date'

type CreateTodoParams = {
  title: Todo['title']
  date?: Todo['date']
}

export const createTodo = ({ title, date = getTodayDateKey() }: CreateTodoParams): Todo => {
  const now = new Date().toISOString()

  return {
    id: now,
    title,
    date,
    status: 'pending',
    postponedCount: 0,
    createdAt: now,
    updatedAt: now,
  }
}