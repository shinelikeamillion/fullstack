const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')

blogRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({})
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
  if (blog) res.status(204).end()
  else res.status(404).json({ error: 'blog not found' })
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
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON())
})

module.exports = blogRouter
