import Joi from "joi";

const registerValidation = Joi.string().max(100).required();

const loginValidation = Joi.object({
  user_id: Joi.string().max(100).required(),
  username: Joi.string().max(100).required(),
});

export { registerValidation, loginValidation };
