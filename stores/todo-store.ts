import { create } from 'zustand'

import { Todo } from '@/types/todo'

type TodoStore = {
  todos: Todo[]

  addTodo: (todo: Todo) => void
  toggleTodo: (id: string) => void
  postponeTodo: (id: string, nextDate: string) => void
  removeTodo: (id: string) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === 'completed' ? 'pending' : 'completed',
              updatedAt: new Date().toISOString(),
            }
          : todo,
      ),
    })),

  postponeTodo: (id, nextDate) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              date: nextDate,
              postponedCount: todo.postponedCount + 1,
              updatedAt: new Date().toISOString(),
            }
          : todo,
      ),
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}))