const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const helper = require('./user_test_helper')
const app = require('../app')

const api = supertest(app)
jest.setTimeout(10000)
beforeEach(async () => {
  await User.deleteMany({})
  await Promise.all(
    helper.initialUsers
      .map(async (u) => {
        const { password, ...U } = u
        return new User({ ...U, passwordHash: await bcrypt.hash(password, 10) })
          .save()
      }),
  )
})
describe('should there is initially three user in db', () => {
  test('should return json when request', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should all users are returned with root user\'s token', async () => {
    const res = await api.get('/api/users')
      .expect(200)
    expect(res.body).toHaveLength(helper.initialUsers.length)
  })

  test('a specific user is within the returned users', async () => {
    const res = await api.get('/api/users')
      .expect(200)
    expect(res.body.map((p) => p.username)).toContain('CSS')
  })
})

describe('login and token varify', () => {
  test('should return token when login with valid user info ', async () => {
    const user = {
      username: 'CSS',
      password: 'iamcss',
    }
    const res = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.token).toBeDefined()
    const decodedToken = jwt.verify(res.body.token, process.env.SECRET)
    console.log(res.body.token, decodedToken)
    expect(decodedToken.username).toEqual(user.username)
  })
})
describe('addition of a new user', () => {
  test('should user id be defined', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToView = usersAtStart[0]

    expect(userToView.id).toBeDefined()
  })

  test('should a user that params not fullfilled can not be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserWithoutUserName = {
      name: 'chichich',
      password: 'salainen',
    }
    const newUserWithoutPassword = {
      username: 'chichichi',
      name: '中文？',
    }

    const res1 = await api
      .post('/api/users')
      .send(newUserWithoutUserName)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(res1.body.message).toContain('User validation failed')

    const res2 = await api
      .post('/api/users')
      .send(newUserWithoutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(res2.body.message).toContain('User validation failed')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).not.toContain(newUserWithoutUserName.username)
    expect(usernames).not.toContain(newUserWithoutPassword.username)
  })

  test('creation succeeds with a fresh valid user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'chichichi',
      name: '中文？',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: usersAtStart[0].username,
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.message).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
