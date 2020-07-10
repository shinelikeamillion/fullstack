const usersRouter = require('express').Router()
require('express-async-errors')
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs')
    // .populate('blogs', { title: 1, url: 1 }) // 或选择感兴趣字段
  res.json(users.map((u) => u.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const { body } = req
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  delete body.password
  const user = new User({ ...body, passwordHash })
  const savedUser = await user.save()
  res.json(savedUser.toJSON())
})

module.exports = usersRouter
