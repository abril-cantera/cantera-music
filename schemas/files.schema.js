const Joi = require('joi')

// Validations
const id = Joi.number().integer();
const nameFile = Joi.string().min(3).max(100);
const nameAuthor = Joi.string().min(3).max(100);
const imageUrl = Joi.string().uri()
const fileUrl = Joi.string().min(3).max(255)
const categoryId = Joi.number().integer();
const genderId = Joi.number().integer();


const createFilesSchema = Joi.object({
  nameFile: nameFile.required(),
  nameAuthor: nameAuthor.required(),
  imageUrl: imageUrl,
  fileUrl: fileUrl,
  categoryId: categoryId.required(),
  genderId: genderId.required(),
})

const getFilesSchema = Joi.object({
  id: id.required()
})

module.exports = { createFilesSchema, getFilesSchema }
