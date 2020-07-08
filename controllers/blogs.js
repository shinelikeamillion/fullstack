const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (_, res, next) => {
  Blog.find({}).then(
    (blogs) => res.json(blogs.map((blog) => blog.toJSON())),
  ).catch((error) => next(error))
})

blogRouter.get('/info', async (_, res, next) => {
  Blog.find({}).then(
    (blogs) => res.send(`
    <p>We hace stored for ${blogs.length} blogs</p>
    <p>${Date()}</p>`),
  ).catch((error) => next(error))
})

blogRouter.get('/:id', (req, res, next) => {
  const { id } = req.params
  Blog.findById(id)
    .then(
      (blog) => {
        if (blog) {
          res.json(blog.toJSON())
        } else {
          res.status(404).end()
        }
      },
    ).catch((error) => next(error))
})

blogRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params
  Blog.findByIdAndRemove(id).then(
    (blog) => {
      if (blog) res.status(204).end()
      else res.status(404).json({ error: 'blog not found' })
    },
  ).catch((error) => next(error))
})

blogRouter.put('/:id', (req, res, next) => {
  const { id } = req.params
  const updateBlog = req.body
  Blog
    .findByIdAndUpdate(id, { ...updateBlog }, { new: true, runValidators: true })
    .then(
      (blog) => {
        if (blog) res.json(blog.toJSON())
        else res.status(404).json({ error: 'blog not found' })
      },
    ).catch((error) => next(error))
})

blogRouter.post('/', async (req, res, next) => {
  const { body } = req
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog.save().then(
    (savedBlog) => {
      res.json(savedBlog.toJSON())
    },
  ).catch((error) => next(error))
})

module.exports = blogRouter
