const express = require('express')
const casesRouter = require('@util/routers')

const app = express()
app.use(express.json())

app.use('/cases', casesRouter)

module.exports = app
