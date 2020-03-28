import Joi from 'joi';

export const createUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});
