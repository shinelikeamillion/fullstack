const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleWare = require('./utils/middleware')
const personsRouter = require('./controllers/persons')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODE_URI)
mongoose.connect(config.MONGODE_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB', error.message))

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleWare.requestLogger)

app.use('/api/persons', personsRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleWare.unknownEndpoint)
app.use(middleWare.errorHandler)

app.listen(config.PORT || 3001, () => {
  console.log(`Server running on port${config.PORT}`)
})
