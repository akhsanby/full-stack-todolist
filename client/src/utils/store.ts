import { create } from "zustand";
import { createTodoAPI, updateTodoAPI, removeTodoAPI } from "@/utils/api";

type Todos = {
  todo_id: string;
  status: "todo" | "doing" | "done";
  category: string[];
  text: string;
  user_id: string;
  createdAt: string;
}[];

type Todo = {
  todo_id: string;
  status: "todo" | "doing" | "done";
  category: string[];
  text: string;
  user_id: string;
  createdAt: string;
};

interface TodoState {
  todos: Todos;
  setTodo: {
    status?: "todo" | "doing" | "done";
    category?: string[];
    selectedCategoryTodo?: string;
    moveStatus?: string;
    text?: string;
    todo_id: string;
    user_id: string;
  };
  storeTodos: (todos: Todos) => void;
  createTodo: (todos: Todo) => void;
  updateTodo: (todos: any) => void;
  removeTodo: (todos: any) => void;
}

export const useTodoStore = create<TodoState>()((set) => ({
  todos: [],
  setTodo: {
    status: undefined,
    category: [],
    selectedCategoryTodo: "",
    moveStatus: "",
    text: "",
    todo_id: "",
    user_id: "",
  },
  storeTodos: (data) => set(() => ({ todos: data })),
  createTodo: (data) => {
    createTodoAPI(data);
    set((state: any) => ({ todos: [...state.todos, data] }));
  },
  updateTodo: (data: any) => {
    updateTodoAPI(data);
    set((state: any) => {
      const newArr = state.todos.filter((item: any) => {
        if (item.todo_id === data.todo_id && data.status) {
          item.status = data.status;
        }
        if (item.todo_id === data.todo_id && data.category) {
          item.category = data.category;
        }
        if (item.todo_id === data.todo_id && data.text) {
          item.text = data.text;
        }
        return item;
      });
      return { todos: newArr };
    });
  },
  removeTodo: (data: any) => {
    removeTodoAPI({
      todo_id: data.todo_id,
      user_id: data.user_id,
    });
    set((state: any) => {
      const newArr = state.todos.filter((item: any) => item.todo_id !== data.todo_id);
      return { todos: newArr };
    });
  },
}));
