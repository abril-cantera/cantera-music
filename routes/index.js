const express = require('express')

const categoriesRouter = require('./categories.router')
const filesRouter = require('./files.router')
const gendersRouter = require('./genders.router')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/categories', categoriesRouter)
  router.use('/files', filesRouter)
  router.use('/genders', gendersRouter)
}
module.exports = routerApi;