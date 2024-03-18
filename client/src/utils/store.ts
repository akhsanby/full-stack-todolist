import { create } from "zustand";
import { Todos, Todo, TodoState } from "@/utils/types";

export const useTodoStore = create<TodoState>((set) => ({
  todos: {
    todo: [],
    doing: [],
    done: [],
  },
  moveTodo: (data: any) => {
    set((state: any) => {
      state.todos.todo = data.todo;
      state.todos.doing = data.doing;
      state.todos.done = data.done;
      return state.todos;
    });
  },
  storeTodos: (data: Todos) => {
    set(() => {
      const updatedTodos = {
        todo: data.filter((todo) => todo.status === "todo"),
        doing: data.filter((todo) => todo.status === "doing"),
        done: data.filter((todo) => todo.status === "done"),
      };
      return { todos: updatedTodos };
    });
  },
  createTodo: (data: Todo, contentStatus: string) => {
    set((state: any) => {
      if (contentStatus === "todo") {
        state.todos.todo = [...state.todos.todo, data];
      }
      if (contentStatus === "doing") {
        state.todos.doing = [...state.todos.doing, data];
      }
      if (contentStatus === "done") {
        state.todos.done = [...state.todos.done, data];
      }
      console.log(state.todos);
      return state.todos;
    });
  },
  updateTodo: (data: any, contentStatus: string) => {
    set((state: any) => {
      if (contentStatus === "todo") {
        state.todos.todo = state.todos.todo.map((item: Todo) => {
          if (item.todo_id === data.todo_id && data.category) {
            item.category = data.category;
          }
          if (item.todo_id === data.todo_id && data.text) {
            item.text = data.text;
          }
          return item;
        });
      }
      if (contentStatus === "doing") {
        state.todos.doing = state.todos.doing.map((item: Todo) => {
          if (item.todo_id === data.todo_id && data.category) {
            item.category = data.category;
          }
          if (item.todo_id === data.todo_id && data.text) {
            item.text = data.text;
          }
          return item;
        });
      }
      if (contentStatus === "done") {
        state.todos.done = state.todos.done.map((item: Todo) => {
          if (item.todo_id === data.todo_id && data.category) {
            item.category = data.category;
          }
          if (item.todo_id === data.todo_id && data.text) {
            item.text = data.text;
          }
          return item;
        });
      }
      return state.todos;
    });
  },
  removeTodo: (data: any, contentStatus: string) => {
    set((state: any) => {
      if (contentStatus === "todo") {
        state.todos.todo = state.todos.todo.filter((item: Todo) => item.todo_id !== data.todo_id);
        state.todos.todo.forEach((item: Todo, index: number) => {
          item.position = index;
        });
      }
      if (contentStatus === "doing") {
        state.todos.doing = state.todos.doing.filter((item: Todo) => item.todo_id !== data.todo_id);
        state.todos.doing.forEach((item: Todo, index: number) => {
          item.position = index;
        });
      }
      if (contentStatus === "done") {
        state.todos.done = state.todos.done.filter((item: Todo) => item.todo_id !== data.todo_id);
        state.todos.done.forEach((item: Todo, index: number) => {
          item.position = index;
        });
      }
      return state.todos;
    });
  },
}));
