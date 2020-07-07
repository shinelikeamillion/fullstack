const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = new mongoose.Schema({
  name: {
    unique: [true, 'must be unique'],
    type: String,
    minlength: [3, 'minimum length is 3'],
    required: [true, 'missing'],
  },
  number: {
    type: String,
    required: [true, 'missing'],
    minlength: [8, 'minimum length is 8'],
  },
})

personSchema.plugin(uniqueValidator)

personSchema.set(
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

module.exports = mongoose.model('Person', personSchema)
