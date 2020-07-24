const express = require('express')
const casesRouter = require('@util/routers')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/cases', casesRouter)

module.exports = app
