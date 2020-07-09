const http = require('http')
const App = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

http.createServer(App)
  .listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
