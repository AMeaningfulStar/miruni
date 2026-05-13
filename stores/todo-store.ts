import { create } from 'zustand'

import { Todo } from '@/types/todo'

type AddTodoPayload = Todo

type ToggleTodoPayload = {
  id: Todo['id']
}

type PostponeTodoPayload = {
  id: Todo['id']
  nextDate: Todo['date']
}

type RemoveTodoPayload = {
  id: Todo['id']
}

type TodoStoreState = {
  todos: Todo[]
}

type TodoStoreActions = {
  addTodo: (payload: AddTodoPayload) => void
  toggleTodo: (payload: ToggleTodoPayload) => void
  postponeTodo: (payload: PostponeTodoPayload) => void
  removeTodo: (payload: RemoveTodoPayload) => void
}

type TodoStore = TodoStoreState & TodoStoreActions

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (payload) =>
    set((state) => ({
      todos: [...state.todos, payload],
    })),

  toggleTodo: ({ id }) =>
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

  postponeTodo: ({ id, nextDate }) =>
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

  removeTodo: ({ id }) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}))