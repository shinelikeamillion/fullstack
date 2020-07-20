const blogRouter = require('express').Router()
require('express-async-errors')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')

blogRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1})
  res.json(blogs)
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
  if (blog) res.json(blog)
  else res.status(404).end()
})

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { token } = req
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    res.status(401).json({ message: 'token missing or invalid' })
    return
  }
  const blog = await Blog.findById(id)
  if (blog) {
    if (!blog.user || blog.user._id.toString() !== decodedToken.id) {
      res.status(403).json({ message: 'no permission for this request' })
      return
    }
    blog.remove()
    const user = await User.findById(blog.user)
    user.blogs = user.blogs.remove(id)
    await user.save()
    res.status(204).end()
  } else res.status(404).json({ message: 'blog not found' })
})

// only update likes for now
blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body, token } = req
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    res.status(401).json({ message: 'token missing or invalid' })
    return
  }
  const updateBlog = body
  const blog = await Blog
    .findByIdAndUpdate(id, { likes: updateBlog.likes }, { new: true, runValidators: true, context: 'query' })
  console.log(id, blog)
  if (blog) res.json(blog)
  else res.status(404).json({ message: 'blog not found' })
})

blogRouter.post('/', async (req, res) => {
  const { body, token } = req
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    res.status(401).json({ message: 'token missing or invalid' })
    return
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: decodedToken.id,
  })
  const user = await User.findById(decodedToken.id)
  if (user) {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id.toString())
    await user.save()
    res.json(savedBlog)
  } else {
    res.status(404).send({ message: 'user not found' })
  }
})

blogRouter.post('/:id/comments', async (req, res) => {
  const blogId = req.params.id
  const { body, token } = req
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    res.status(401).json({ message: 'token missing or invalid' })
    return
  }
  const blog = await Blog.findById(blogId)
  if (blog) {
    const comment = new Comment({
      content: body.content,
      blogId: blog.id
    })
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id.toString())
    await blog.save()
    res.json(savedComment)
  } else {
    res.status(404).send({ message: 'blog not found' })
  }
})

module.exports = blogRouter
