const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  res.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.get('/info', async (_, res) => {
  const blogs = await Blog.find({})
  res.send(`
      <p>We hace stored for ${blogs.length} blogs</p>
      <p>${Date()}</p>`)
})

blogRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const blog = await Blog.findById(id)
  if (blog) res.json(blog.toJSON())
  else res.status(404).end()
})

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const blog = await Blog.findByIdAndRemove(id)
  if (blog) {
    const user = await User.findById(blog.user)
    user.blogs = user.blogs.remove(id)
    await user.save()
    res.status(204).end()
  } else res.status(404).json({ error: 'blog not found' })
})

blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const updateBlog = req.body
  const blog = await Blog
    .findByIdAndUpdate(id, { ...updateBlog }, { new: true, runValidators: true, context: 'query' })
  if (blog) res.json(blog.toJSON())
  else res.status(404).json({ error: 'blog not found' })
})

blogRouter.post('/', async (req, res) => {
  const { body } = req
  const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.json(savedBlog.toJSON())
})

module.exports = blogRouter
