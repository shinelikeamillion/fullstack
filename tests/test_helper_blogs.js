const Blog = require('../models/blog')

const initialBlogs = (id) => [
  {
    title: 'HTML',
    author: 'w3c',
    url: 'http://www.w3cschool.com',
    user: id,
    likes: 3,
  },
  {
    title: 'Chrome?',
    author: 'google',
    url: 'http://www.google.com',
    user: id,
    likes: 4,
  },
  {
    title: 'Dart?',
    author: 'google',
    url: 'http://www.google.com',
    likes: 2,
  },
  {
    title: 'React?',
    author: 'facebook',
    url: 'http://www.facebook.com',
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ name: 'Flutter?' })
  // is it necessary?
  // await blog.save()
  // await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((p) => {
    const transFrom = p.toJSON()
    if (transFrom.user) transFrom.user = transFrom.user.toString()
    return transFrom
  })
}

const invalidId = 'invalidId'
const notSavedId = '5f07dd38c0fd42a8640135df'

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, invalidId, notSavedId,
}
