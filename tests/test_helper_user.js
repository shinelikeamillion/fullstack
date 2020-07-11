const user = require('../models/user')

const initialUsers = [
  {
    username: 'HTML',
    name: 'html',
    password: 'iamhtml',
  },
  {
    username: 'JavaScript',
    name: 'javascript',
    password: 'iamjs',
  },
  {
    username: 'CSS',
    name: 'css',
    password: 'iamcss',
  },
]

const usersInDb = async () => {
  const users = await user.find({})
  return users.map((u) => u.toJSON())
}

module.exports = { initialUsers, usersInDb }
