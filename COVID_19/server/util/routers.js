const { Router } = require('express')
const cases = require('@controllers/casesController')

const casesRouter = Router()

casesRouter.get('/:province', cases.getByProvince)
casesRouter.get('/', cases.getAll)

module.exports = casesRouter
