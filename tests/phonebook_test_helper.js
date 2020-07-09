const Person = require('../models/person')

const initialphonebook = [
  {
    name: 'HTML',
    number: '2040802-849284',
  },
  {
    name: 'Browser',
    number: '022-274929038402',
  },
]

const nonExistingId = async () => {
  const person = Person({ name: 'Dart' })
  return person._id.toString()
}

const personsInDb = async () => {
  const persons = await Person.find({})
  return persons.map((p) => p.toJSON())
}

module.exports = { initialphonebook, nonExistingId, personsInDb }
