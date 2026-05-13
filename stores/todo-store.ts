import { create } from 'zustand'

import { Todo } from '@/types/todo'

type TodoStore = {
  todos: Todo[]

  addTodo: (todo: Todo) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),
}))