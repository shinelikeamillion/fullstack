const logger = require('./logger')

const unknownEndpoint = (req, res) => res.status(404).send({ message: 'unknown endpoint' })

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    response.status(400).json({ message: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    response.status(400).json({ message: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ message: 'invalid token' })
  }
  logger.error(error.message)
}

/* more info about morgan
https://github.com/expressjs/morgan
*/
// const config = require('./config')

// // eslint-disable-next-line import/order
// const morgan = config.NODE_ENV === 'development' ? require('morgan') : null

// const requestLogger = () => {
//   if (morgan) {
//     morgan.token('body', (req) => JSON.stringify(req.body))
//     return m(':method :url :status :res[content-length] - :response-time ms :body')
//   }
//   return null
// }

const requestLogger = (req, res, next) => {
  logger.info(
    `method: ${req.method}`,
    `status: ${res.statusCode}`,
    `url: ${req.path}`,
    `body: ${JSON.stringify(req.body)}`,
  )
  next()
}

const tokenExtractor = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  unknownEndpoint, errorHandler, requestLogger, tokenExtractor,
}
