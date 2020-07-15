const info = (...params) => (process.env.NODE_ENV !== 'production' ? console.log(...params) : null)
const error = (...params) => console.error(...params)

module.exports = { info, error }
