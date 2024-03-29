import Joi from "joi";

const createValidation = Joi.object({
  todo_id: Joi.string().max(100).required(),
  position: Joi.number().required(),
  category: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().max(20).valid("todo", "doing", "done").required(),
  text: Joi.string().max(100).required(),
  user_id: Joi.string().max(100).required(),
  createdAt: Joi.string().max(50).required(),
});

const listValidation = Joi.string().max(100).required();

const updateSyncValidation = Joi.object({
  todo_id: Joi.string().max(100).required(),
  position: Joi.number().required(),
  status: Joi.string().max(20).valid("todo", "doing", "done").required(),
  category: Joi.array().items(Joi.string()).required(),
  text: Joi.string().max(100).required(),
  user_id: Joi.string().max(100).required(),
  createdAt: Joi.string().max(50).required(),
});

const updateValidation = Joi.object({
  status: Joi.string().max(20).valid("todo", "doing", "done").optional(),
  category: Joi.array().items(Joi.string()).optional(),
  todo_id: Joi.string().max(100).required(),
  position: Joi.number().optional(),
  text: Joi.string().max(100).optional(),
  user_id: Joi.string().max(100).required(),
});

const removeValidation = Joi.object({
  todo_id: Joi.string().max(100).required(),
  user_id: Joi.string().max(100).required(),
});

export { createValidation, updateSyncValidation, updateValidation, listValidation, removeValidation };
