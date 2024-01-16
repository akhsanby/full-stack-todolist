import validate from "../validation/validate.js";
import { createValidation, updateValidation, listValidation, removeValidation } from "../validation/todo-validation.js";
import prismaClient from "../app/database.js";

async function create(request, refetch) {
  request = validate(createValidation, request);

  const newTodo = await prismaClient.todo.create({
    data: {
      todo_id: request.todo_id,
      user_id: request.user_id,
      category: JSON.stringify(request.category),
      status: request.status,
      text: request.text,
      createdAt: request.createdAt,
    },
  });

  if (refetch === true) {
    return await list(request.user_id);
  } else {
    return newTodo;
  }
}

async function list(user_id) {
  user_id = validate(listValidation, user_id);

  const todos = await prismaClient.todo.findMany({
    where: {
      user_id: user_id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const newTodos = todos.map((item) => {
    return { ...item, category: JSON.parse(item.category) };
  });

  return newTodos;
}

async function update(request, refetch) {
  request = validate(updateValidation, request);

  let data = {};

  if (request.status) {
    data.status = request.status;
  }

  if (request.category) {
    data.category = JSON.stringify(request.category);
  }

  if (request.text) {
    data.text = request.text;
  }

  const selectedTodo = await prismaClient.todo.update({
    where: {
      todo_id: request.todo_id,
      AND: {
        user_id: request.user_id,
      },
    },
    data: data,
  });

  if (refetch === true) {
    return await list(request.user_id);
  } else {
    return selectedTodo;
  }
}

async function remove(request, refetch) {
  request = validate(removeValidation, request);

  const selectedTodo = await prismaClient.todo.delete({
    where: {
      todo_id: request.todo_id,
      AND: {
        user_id: request.user_id,
      },
    },
  });

  if (refetch === true) {
    return await list(request.user_id);
  } else {
    return selectedTodo;
  }
}

export default {
  create,
  list,
  update,
  remove,
};
