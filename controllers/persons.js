const personsRouter = require('express').Router()
const Person = require('../models/person')
require('express-async-errors')

personsRouter.get('/', async (_, res) => {
  const persons = await Person.find({})
  res.json(persons.map((p) => p.toJSON()))
})

personsRouter.get('/info', async (_, res) => {
  const persons = await Person.find({})
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`)
})

personsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const person = await Person.findById(id)
  if (person) res.json(person.toJSON())
  else res.status(404).end()
})

personsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const person = await Person.findByIdAndRemove(id)
  if (person) res.status(204).end()
  else res.status(404).json({ error: 'person not found' })
})

personsRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const person = await Person
    .findByIdAndUpdate(id, { number: req.body.number }, { new: true, runValidators: true, context: 'query' })
  if (person) res.json(person.toJSON())
  else res.status(404).json({ error: 'person not found' })
})

personsRouter.post('/', async (req, res) => {
  const { body } = req
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  const savedPerson = await person.save()
  res.json(savedPerson.toJSON())
})

module.exports = personsRouter
