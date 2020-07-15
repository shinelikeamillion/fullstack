const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleWare = require('./utils/middleware')
const personsRouter = require('./controllers/persons')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')

logger.info('connecting to', config.DB_URI)
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB', error.message))

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleWare.tokenExtractor)
app.use(middleWare.requestLogger)
app.use('/api/persons', personsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testRouter = require('./controllers/testing')
  app.use('/api/testing', testRouter)
}
app.use(middleWare.unknownEndpoint)
app.use(middleWare.errorHandler)

// app.listen(config.PORT || 3001, () => {
//   console.log(`Server running on port${config.PORT}`)
// })

module.exports = app
