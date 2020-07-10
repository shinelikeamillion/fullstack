const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
  title: { unique: true, type: String, required: true },
  author: { type: String, equired: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
})

blogSchema.plugin(uniqueValidator)

blogSchema.set(
  'toJSON', {
    transform: (_, obj) => {
      const returnObject = obj
      returnObject.id = returnObject._id.toString()
      delete returnObject._id
      delete returnObject.__v
      return returnObject
    },
  },
)

module.exports = mongoose.model('Blog', blogSchema)
