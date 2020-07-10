const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: { unique: true, type: String, required: true },
  name: { type: String, equired: true },
  passwordHash: { type: String, required: true },
  blogs: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  ],
})

userSchema.plugin(uniqueValidator)

// we should modify returnObject, so save method will update same object
userSchema.set(
  'toJSON', {
    transform: (_, obj) => {
      const returnObject = obj
      returnObject.id = returnObject._id.toString()
      delete returnObject._id
      delete returnObject.__v
      delete returnObject.passwordHash
    },
  },
)

module.exports = mongoose.model('User', userSchema)
