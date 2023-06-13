const express = require('express')

const FilesService = require('../services/files.services')
const { getFilesSchema, updateFilesSchema } = require('../schemas/files.schema')
const validatorHandler = require('../middlewares/validator.handler')

const router = express.Router()
const service = new FilesService()

// post AWS S3 prueva
router.post('/upload',
  async (req, res, next) => {
    try {
      const url = await service.cargarFile(req.files.file)
      const image = "https://cdn.icon-icons.com/icons2/3063/PNG/512/blueray_disc_cd_dvd_icon_190837.png"
      const name = req.body.nameFile
      //
      const body = {
        nameFile: name,
        nameAuthor: req.body.nameAuthor,
        imageUrl: image,
        fileUrl: url,
        categoryId: req.body.categoryId,
        genderId: req.body.genderId
      }
      // Create new file
      const file = await service.create(body)
      // Set status "created" in JSON
      res.status(201).json(file);
    } catch (error) {
      next(error)
    }
  }
);


// get DB postgres
router.get('/', async (req, res, next) => {
  try {
    const file = await service.find()
    res.json(file)
  } catch (error) {
    next(error)
  }
}
)

// get DB postgres
router.get('/:id',
  validatorHandler(getFilesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = await service.findOne(id);
      res.json(file)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getFilesSchema, 'params'),
  validatorHandler(updateFilesSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const file = await service.update(id, body);
      res.json(file);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getFilesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Delete file by ID
      await service.delete(id)
      // Set status "ok" in JSON
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
