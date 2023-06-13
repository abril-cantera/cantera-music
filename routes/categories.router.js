const express = require('express')

const CategoriesService = require('../services/categories.services')
const { createCategoriesSchema, getCategoriesSchema } = require('../schemas/categories.schema')
const validatorHandler = require('../middlewares/validator.handler')


const router = express.Router()
const service = new CategoriesService()


router.get('/', async (req, res, next) => {
  try {
    const category = await service.find()
    res.json(category)
  } catch (error) {
    next(error)
  }
}
)

router.get('/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createCategoriesSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body)
      res.status(201).json(newCategory);
    } catch (error) {
      next(error)
    }
  }
)


router.delete('/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id)
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
