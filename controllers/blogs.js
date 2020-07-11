const blogRouter = require('express').Router()
require('express-async-errors')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

/*
✅ 4.16: add new user feature: username and password is required, and both minlength is 3
    if the userinfo is invalid, response proper error message
✅ 4.17: post blog with (random in dbbase) user info
    blogs list userinfo
    users list with blogs
✅ 4.18: token authentication
✅ 4.19: add blog with user token, and set blog's user with this user
✅ 4.20: add Authorization middleware
✅ 4.21: only the user who post the blog can delete it
✅ 4.22: fix add new blog with user token;
    test post blog failed with proper 401 statuecode
*/

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
  const { token } = req
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    res.status(401).json({ error: 'token missing or invalid' })
    return
  }
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
  const { body, token } = req
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    res.status(401).json({ error: 'token missing or invalid' })
    return
  }
  const updateBlog = body
  const blog = await Blog
    .findByIdAndUpdate(id, { ...updateBlog }, { new: true, runValidators: true, context: 'query' })
  if (blog) res.json(blog.toJSON())
  else res.status(404).json({ error: 'blog not found' })
})

blogRouter.post('/', async (req, res) => {
  const { body, token } = req
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    res.status(401).json({ error: 'token missing or invalid' })
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
    res.json(savedBlog.toJSON())
  }
  res.status(404).send({ message: 'user not found' })
})

module.exports = blogRouter
