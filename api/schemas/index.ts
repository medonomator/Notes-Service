import Joi from 'joi';

export const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export const noteUserSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

export const noteUpdateSchema = Joi.object({
  title: Joi.string().required(),
  is_share_note: Joi.boolean().required(),
  body: Joi.string().required(),
});
