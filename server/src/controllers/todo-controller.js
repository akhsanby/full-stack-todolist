import todoService from "../services/todo-service.js";

async function create(req, res) {
  let refetch = Boolean(req.query.refetch);

  const request = {
    todo_id: req.body.todo_id,
    status: req.body.status,
    category: req.body.category,
    text: req.body.text,
    user_id: req.body.user_id,
    createdAt: req.body.createdAt,
  };

  const result = await todoService.create(request, refetch);

  res.status(201).json({
    status: "Created",
    data: result,
  });
}

async function list(req, res) {
  const user_id = req.params.userId;
  const result = await todoService.list(user_id);

  res.status(200).json({
    status: "Loaded",
    data: result,
  });
}

async function update(req, res) {
  let refetch = Boolean(req.query.refetch);
  const result = await todoService.update(req.body, refetch);

  res.status(200).json({
    status: "Updated",
    data: result,
  });
}

async function remove(req, res) {
  let refetch = Boolean(req.query.refetch);

  const request = {
    todo_id: req.body.todo_id,
    user_id: req.body.user_id,
  };
  const result = await todoService.remove(request, refetch);

  res.status(200).json({
    status: "Removed",
    data: result,
  });
}

export default {
  create,
  list,
  update,
  remove,
};
