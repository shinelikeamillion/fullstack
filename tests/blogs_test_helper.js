const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML',
    author: 'w3c',
    url: 'http://www.w3cschool.com',
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
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = Blog({ name: 'Flutter?' })
  // is it necessary?
  // await blog.save()
  // await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((p) => p.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb }
