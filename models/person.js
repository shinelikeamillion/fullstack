
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const uri = process.env.MONGODE_URI

console.log('connecting to', uri)

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(_ => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB', error.message))

const personSchema = new mongoose.Schema({
    name: {
        unique: [true, 'must be unique'],
        type: String,
        minlength: [3, 'minimum length is 3'],
        required: [true, 'missing']
    },
    number: {
        type: String,
        required: [true, 'missing'],
        minlength: [8, 'minimum length is 8']
    },
})

personSchema.plugin(uniqueValidator)

personSchema.set(
    'toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

