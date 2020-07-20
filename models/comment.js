const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = mongoose.Schema({
  content: { type: String, required: true },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
})

commentSchema.plugin(uniqueValidator)

commentSchema.set(
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

module.exports = mongoose.model('Comment', commentSchema)
