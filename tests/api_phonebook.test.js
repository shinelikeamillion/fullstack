const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Person = require('../models/person')
const helper = require('./test_helper_phonebook')

const api = supertest(app)
jest.setTimeout(20000)

// 耗时操作，jest.setTimeout(3000)
beforeEach(async () => {
  await Person.deleteMany({})
  await Promise.all(
    helper.initialphonebook
      .map((person) => new Person(person))
      .map((person) => person.save()),
  )

  // 如果需要考虑执行顺序
  // for (const p of helper.initialphonebook) {
  //   const personObj = new Person(p)
  //   await personObj.save()
  // }
})

test('should return json when request', async () => {
  const res = await api.get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('should all persons are returned', async () => {
  const res = await api.get('/api/persons')
    .expect(200)
  expect(res.body).toHaveLength(helper.initialphonebook.length)
})

test('a specific person is within the returned phonebook', async () => {
  const res = await api.get('/api/persons')
    .expect(200)
  expect(res.body.map((p) => p.name)).toContain('Browser')
})

test('should a valid person be added', async () => {
  const newPerson = {
    name: 'Typescript',
    number: '001-88888',
  }
  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const personsEnd = await helper.personsInDb()
  expect(personsEnd).toHaveLength(helper.initialphonebook.length + 1)
  expect(personsEnd.map((p) => p.name)).toContain(newPerson.name)
})

test('should a person without name can not added', async () => {
  const newPerson = {
    number: '001-88888',
  }
  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const personsEnd = await helper.personsInDb()
  expect(personsEnd).toHaveLength(helper.initialphonebook.length)
  expect(personsEnd.map((p) => p.name)).not.toContain(newPerson.name)
})

test('should a person can be view', async () => {
  const personsAtStart = await helper.personsInDb()
  const personToView = personsAtStart[0]
  const resultPerson = await api
    .get(`/api/persons/${personToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultPerson.body).toEqual(personToView)
})

test('should person id be defined', async () => {
  const personsAtStart = await helper.personsInDb()
  const personToView = personsAtStart[0]

  expect(personToView.id).toBeDefined()
})

test('should a person can be deleted', async () => {
  const personsAtStart = await helper.personsInDb()
  const personToDelete = personsAtStart[0]
  await api
    .delete(`/api/persons/${personToDelete.id}`)
    .expect(204)

  const personsAtDb = await helper.personsInDb()
  expect(personsAtDb).toHaveLength(personsAtStart.length - 1)
  expect(personsAtDb.map((p) => p.name)).not.toContain(personToDelete.name)
})

afterAll(() => {
  mongoose.connection.close()
})
