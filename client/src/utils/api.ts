import nookies from "nookies";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export default axiosClient;

type CreateTodoTypes = {
  todo_id: string;
  status: "todo" | "doing" | "done";
  category: string[];
  index: number;
  text: string;
  user_id: string;
  createdAt: string;
};

export async function createTodoAPI(body: CreateTodoTypes) {
  const { token: jwtToken } = nookies.get();
  return await axiosClient.post("/api/todo", body, {
    headers: {
      Authorization: jwtToken,
    },
  });
}

type UpdateTodoTypes = {
  status?: "todo" | "doing" | "done" | string;
  category?: string[];
  todo_id: string;
  index: number;
  text?: string;
  user_id: string;
};

export async function updateTodoAPI(body: UpdateTodoTypes) {
  const { token: jwtToken } = nookies.get();
  return await axiosClient.patch("/api/todo", body, {
    headers: {
      Authorization: jwtToken,
    },
  });
}

type RemoveTodoTypes = {
  todo_id: string;
  user_id: string;
};

export function removeTodoAPI(body: RemoveTodoTypes) {
  const { token: jwtToken } = nookies.get();
  return axiosClient.delete("/api/todo", {
    data: {
      ...body,
    },
    headers: {
      Authorization: jwtToken,
    },
  });
}

type MoveTodoTypes = {
  status: {
    from: "todo" | "doing" | "done";
    to: "todo" | "doing" | "done";
  };
  todo_id: string;
  user_id: string;
};

export function moveTodoAPI(body: MoveTodoTypes) {
  const { token: jwtToken } = nookies.get();
  return axiosClient.put("/api/todo/move", body, {
    headers: {
      Authorization: jwtToken,
    },
  });
}
