import validate from "../validation/validate.js";
import { createValidation, updateValidation, updateSyncValidation, listValidation, removeValidation } from "../validation/todo-validation.js";
import prismaClient from "../app/database.js";

async function create(request) {
  request = validate(createValidation, request);

  return await prismaClient.todo.create({
    data: {
      todo_id: request.todo_id,
      position: request.position,
      user_id: request.user_id,
      category: JSON.stringify(request.category),
      status: request.status,
      text: request.text,
      createdAt: request.createdAt,
    },
  });
}

async function list(user_id) {
  user_id = validate(listValidation, user_id);

  const todos = await prismaClient.todo.findMany({
    where: {
      user_id: user_id,
    },
    orderBy: {
      position: "asc",
    },
  });

  const newTodos = todos.map((item) => {
    return { ...item, category: JSON.parse(item.category) };
  });

  return newTodos;
}

async function sync(request, user_id) {
  await prismaClient.todo.deleteMany({}); // remove all data
  await Promise.all(
    request.map(async (todo) => {
      validate(updateSyncValidation, todo);
      todo.category = JSON.stringify(todo.category);
      await prismaClient.todo.create({
        data: todo,
      });
    })
  );

  return list(user_id);
}

async function update(request) {
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

  if (request.position) {
    data.position = request.position;
  }

  return await prismaClient.todo.update({
    where: {
      todo_id: request.todo_id,
      AND: {
        user_id: request.user_id,
      },
    },
    data: data,
  });
}

async function remove(request) {
  request = validate(removeValidation, request);

  return await prismaClient.todo.delete({
    where: {
      todo_id: request.todo_id,
      AND: {
        user_id: request.user_id,
      },
    },
  });
}

export default {
  create,
  list,
  sync,
  update,
  remove,
};
