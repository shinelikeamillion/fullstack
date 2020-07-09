const info = (...params) => (process.env.NODE_ENV !== 'test' ? console.log(...params) : null)
const error = (...params) => console.log(...params)

module.exports = { info, error }
