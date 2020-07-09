const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (_, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs.map((blog) => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogRouter.get('/info', async (_, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.send(`
      <p>We hace stored for ${blogs.length} blogs</p>
      <p>${Date()}</p>`)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const blog = await Blog.findById(id)
    if (blog) res.json(blog.toJSON())
    else res.status(404).end()
  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const blog = await Blog.findByIdAndRemove(id)
    if (blog) res.status(204).end()
    else res.status(404).json({ error: 'blog not found' })
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const updateBlog = req.body
  try {
    const blog = await Blog
      .findByIdAndUpdate(id, { ...updateBlog }, { new: true, runValidators: true })
    if (blog) res.json(blog.toJSON())
    else res.status(404).json({ error: 'blog not found' })
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (req, res, next) => {
  const { body } = req
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  try {
    const savedBlog = await blog.save()
    res.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter
