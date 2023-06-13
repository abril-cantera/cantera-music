const Joi = require('joi');

const id = Joi.number().integer();
const nameCategory = Joi.string().min(3).max(45);

const createCategoriesSchema = Joi.object({
  nameCategory: nameCategory.required()
})

const getCategoriesSchema = Joi.object({
  id: id.required()
})


module.exports = { createCategoriesSchema, getCategoriesSchema }