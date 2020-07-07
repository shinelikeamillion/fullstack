require('dotenv').config()

const { PORT, MONGODE_URI, NODE_ENV } = process.env

module.exports = { PORT, MONGODE_URI, NODE_ENV }
