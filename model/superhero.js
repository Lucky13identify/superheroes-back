const Joi = require('joi');

const superheroSchema = Joi.object({
  nickname: Joi.string().min(1).max(30),
  real_name: Joi.string().min(1).max(30),
  origin_description: Joi.string().min(3),
  superpowers: Joi.string().min(1).max(100),
  catch_phrase: Joi.string().min(1).max(100),
  imageUrl: Joi.string(),
});

module.exports = {
  schema: superheroSchema,
};
