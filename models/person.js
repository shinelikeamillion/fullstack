
const mongoose = require('mongoose')

const uri = process.env.MONGODE_URI

console.log('connecting to', uri)

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(_ => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB', error.message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        required: true
    },
    number: {
        type: String,
        required: true,
        minlength: 1
    },
})

personSchema.set(
    'toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

