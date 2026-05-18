import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

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
  hydrated: boolean
}

type TodoStoreActions = {
  setHydrated: (state: boolean) => void

  addTodo: (payload: AddTodoPayload) => void
  toggleTodo: (payload: ToggleTodoPayload) => void
  postponeTodo: (payload: PostponeTodoPayload) => void
  removeTodo: (payload: RemoveTodoPayload) => void
}

type TodoStore = TodoStoreState & TodoStoreActions

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      hydrated: false,

      setHydrated: (state) => {
        set({
          hydrated: state,
        })
      },

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
    }),
    {
      name: 'miruni-todo-storage',

      storage: createJSONStorage(() => AsyncStorage),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    },
  ),
)