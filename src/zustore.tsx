import {create} from "zustand";

export interface Todo {
  id: string
  description: string
  completed: boolean
}

interface TodoState {
  todos: Todo[]
  addTodo: (desc: string) => void
  deleteTodo: (id: string) => void
  toggleCheck: (id: string) => void
  editTodo: (id: string, desc: string) => void
}

export const useTodos = create<TodoState>()((set) => ({
  todos: [],
  addTodo: (desc: string) => set((state: TodoState) => {
    const updatedTodos: Todo[] = [...state.todos];
    updatedTodos.push({
      id: Math.trunc(Math.random() * 1000000).toString(),
      description: desc,
      completed: false
    })
    return {todos: updatedTodos};
  }),
  deleteTodo: (id: string) => set((state) => {
    const updatedTodos = state.todos.filter((item:Todo) => item.id !== id)
    return {todos: updatedTodos}
  }),
  editTodo: (id: string, desc: string) => set((state) => {
    const updatedTodos = state.todos.map(item => item.id === id ? {...item, description: desc } : item)
    return {todos: updatedTodos};
  }),
  toggleCheck: (id: string) => set((state) => {
    const updatedTodos = state.todos.map(item => item.id === id ? {...item, completed: !item.completed} : item)
    return {todos: updatedTodos};
  })
}))