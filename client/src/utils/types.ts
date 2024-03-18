type Props = {
  jwtToken?: string;
  decodeToken: {
    user_id: string;
    username: string;
  };
  resultTodos?: Todo[];
};

type EditingProps = {
  todo_id: string;
  isEdit: boolean;
  text: string;
};

export type { Props, EditingProps };

export type CreateTodoTypes = {
  todo_id: string;
  position: number;
  status: "todo" | "doing" | "done";
  category: string[];
  text: string;
  user_id: string;
  createdAt: string;
};

export type UpdateTodoTypes = {
  status?: "todo" | "doing" | "done" | string;
  category?: string[];
  todo_id: string;
  position?: number;
  text?: string;
  user_id: string;
};

export type UpdateSyncTodoTypes = {
  todo_id: string;
  status: "todo" | "doing" | "done" | string;
  category: string[];
  position: number;
  text: string;
  user_id: string;
  createdAt: string;
}[];

export type RemoveTodoTypes = {
  todo_id: string;
  user_id: string;
};

export type Todo = {
  todo_id: string;
  position: number;
  status: "todo" | "doing" | "done";
  category: string[];
  text: string;
  user_id: string;
  createdAt: string;
};

export interface TodoState {
  todos: {
    todo: Todo[];
    doing: Todo[];
    done: Todo[];
  };
  moveTodo: (todo: Todo) => void;
  storeTodos: (todos: Todo[]) => void;
  createTodo: (todos: Todo, contentStatus: string) => void;
  updateTodo: (todos: any, contentStatus: string) => void;
  removeTodo: (todos: any, contentStatus: string) => void;
}
