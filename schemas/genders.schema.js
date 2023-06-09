const Joi = require('joi');

const id = Joi.number().integer();
const nameGender = Joi.string().min(3).max(45);

const createGendersSchema = Joi.object({
  nameGender: nameGender.required()
})

const updateGendersSchema = Joi.object({
  nameGender: nameGender
});

const getGendersSchema = Joi.object({
  id: id.required()
})


module.exports = { createGendersSchema, updateGendersSchema, getGendersSchema }
