const express = require('express')

const GendersService = require('../services/genders.services')
const { createGendersSchema, updateGendersSchema, getGendersSchema } = require('../schemas/genders.schema')
const validatorHandler = require('../middlewares/validator.handler')


const router = express.Router()
const service = new GendersService()


router.get('/', async (req, res, next) => {
  try {
    const gender = await service.find()
    res.json(gender)
  } catch (error) {
    next(error)
  }
}
)

router.get('/:id',
  validatorHandler(getGendersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const gender = await service.findOne(id);
      res.json(gender)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createGendersSchema, 'body'),
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

router.post('/file',
  validatorHandler(createGendersSchema, 'body'),
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

router.patch('/:id',
  validatorHandler(getGendersSchema, 'params'),
  validatorHandler(updateGendersSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const genders = await service.update(id, body);
      res.json(genders);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getGendersSchema, 'params'),
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