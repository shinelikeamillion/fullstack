const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML',
    author: 'w3c',
    url: 'http://www.w3cschool.com',
    user: '5f0944962cd7ad173fc3395b',
    likes: 3,
  },
  {
    title: 'Chrome?',
    author: 'google',
    url: 'http://www.google.com',
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
    user: '5f0944962cd7ad173fc3395b',
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
  return blogs.map((p) => p.toJSON())
}

const invalidId = '5a3d5da59070081a82a3445'
const notSavedId = '5f07dd38c0fd42a8640135df'

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, invalidId, notSavedId,
}
