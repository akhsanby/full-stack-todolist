import validate from "../validation/validate.js";
import { createValidation, updateValidation, listValidation, removeValidation } from "../validation/todo-validation.js";
import prismaClient from "../app/database.js";

async function create(request) {
  request = validate(createValidation, request);

  const newTodo = await prismaClient.todo.create({
    data: {
      todo_id: request.todo_id,
      index: request.index,
      user_id: request.user_id,
      category: JSON.stringify(request.category),
      status: request.status,
      text: request.text,
      createdAt: request.createdAt,
    },
  });

  return newTodo;
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

async function update(request) {
  request = validate(updateValidation, request);

  let data = {};

  if (request.status) {
    data.status = request.status;
  }

  if (request.index) {
    data.index = request.index;
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

  return selectedTodo;
}

async function remove(request) {
  request = validate(removeValidation, request);

  const removedTodo = await prismaClient.todo.delete({
    where: {
      todo_id: request.todo_id,
      AND: {
        user_id: request.user_id,
      },
    },
  });

  const remainingTodos = await prismaClient.todo.findMany({
    where: {
      status: removedTodo.status,
    },
  });

  for (let i = 0; i < remainingTodos.length; i++) {
    const todo = remainingTodos[i];
    await prismaClient.todo.update({
      where: {
        todo_id: todo.todo_id,
      },
      data: {
        index: i,
      },
    });
  }

  return removedTodo;
}

export default {
  create,
  list,
  update,
  remove,
};
