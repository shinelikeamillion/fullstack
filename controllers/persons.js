const personsRouter = require('express').Router()
const Person = require('../models/person')
const logger = require('../utils/logger')

personsRouter.get('/', (_, res) => {
  Person.find({}).then(
    (persons) => res.json(persons.map((p) => p.toJSON())),
  ).catch((error) => {
    logger.error(error)
    res.status(404).end()
  })
})

personsRouter.get('/info', async (_, res, next) => {
  Person.find({}).then(
    (persons) => res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`),
  ).catch((error) => next(error))
})

personsRouter.get('/:id', (req, res, next) => {
  const { id } = req.params
  Person.findById(id)
    .then(
      (person) => {
        if (person) {
          res.json(person.toJSON())
        } else {
          res.status(404).end()
        }
      },
    ).catch((error) => next(error))
})

personsRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndRemove(id).then(
    (person) => {
      if (person) res.status(204).end()
      else res.status(404).json({ error: 'person not found' })
    },
  ).catch((error) => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
  const { id } = req.params
  Person
    .findByIdAndUpdate(id, { number: req.body.number }, { new: true, runValidators: true })
    .then(
      (person) => {
        if (person) res.json(person.toJSON())
        else res.status(404).json({ error: 'person not found' })
      },
    ).catch((error) => next(error))
})

personsRouter.post('/', async (req, res, next) => {
  const { body } = req
  // let person = await Person.findOne({ name: body.name }).catch(error => next(error))
  // if (person) ˜return res.status(404).json({ 'error': 'name must be unique' })
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(
    (savedPerson) => {
      res.json(savedPerson.toJSON())
    },
  ).catch((error) => next(error))
})

module.exports = personsRouter
