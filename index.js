const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

/* more info about morgan
https://github.com/expressjs/morgan
*/
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan')
    const { token } = require('morgan')
    // app.use(morgan('tiny'))
    morgan.token('body', (req, res) => JSON.stringify(req.body))
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
}

app.get('/api/persons', (_, res) => {
    Person.find({}).then(
        persons => res.json(persons)
    ).catch(error => {
        console.log(error)
        res.status(404).end()
    })
})

app.get('/api/persons/info', async (_, res, next) => {
    Person.find({}).then(
        persons =>
            res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`)
    ).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id)
        .then(
            person => {
                if (person) {
                    return res.send(person)
                }
                res.status(404).end()
            }
        ).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id).then(
        person => {
            if (person) res.status(204).end()
            else res.status(404).json({ 'error': 'person not found' })
        }
    ).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true }).then(
        person => {
            console.log(person)
            if (person) res.status(200).json(person)
            else res.status(404).json({ 'error': 'person not found' })
        }
    ).catch(error => next(error))
})

app.post('/api/persons', async (req, res, next) => {
    const body = req.body
    // let person = await Person.findOne({ name: body.name }).catch(error => next(error))
    // if (person) ˜return res.status(404).json({ 'error': 'name must be unique' })
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(
        savedPerson => {
            res.json(savedPerson.toJSON())
        }
    ).catch(error => next(error))
})

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' })
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).json({ message: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ message: error.message })
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port${PORT}`)
})



