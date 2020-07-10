const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blogs_test_helper')

const api = supertest(app)
// jest.setTimeout(20000)

// 耗时操作，jest.setTimeout(3000)
beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(
    helper.initialBlogs
      .map((blog) => new Blog(blog))
      .map((blog) => blog.save()),
  )

  // 如果需要考虑执行顺序
  // for (const p of helper.initialBlogs) {
  //   const blogObj = new blog(p)
  //   await blogObj.save()
  // }
})

test('should return json when request', async () => {
  const res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('should all blogs are returned', async () => {
  const res = await api.get('/api/blogs')
    .expect(200)
  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const res = await api.get('/api/blogs')
    .expect(200)
  expect(res.body.map((p) => p.author)).toContain('facebook')
})

test('should a valid blog be added', async () => {
  const newblog = {
    title: 'Youtube',
    author: 'google',
    url: 'http://www.google.com',
    likes: 5,
  }
  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsEnd = await helper.blogsInDb()
  expect(blogsEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogsEnd.map((p) => p.author)).toContain(newblog.author)
})

test.only('should a blog without title or url can not be added', async () => {
  const noTitleBlog = {
    author: 'noTitle',
    url: 'http://www.bytedance.com',
    likes: 1,
  }
  const noUrlBlog = {
    title: 'noUrl',
    author: 'unknown',
    likes: 1,
  }
  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsEnd = await helper.blogsInDb()
  expect(blogsEnd).toHaveLength(helper.initialBlogs.length)
  expect(blogsEnd.map((p) => p.author)).not.toContain(noTitleBlog.author)
  expect(blogsEnd.map((p) => p.author)).not.toContain(noUrlBlog.author)
})

test('should a blog without likes can be added, and gave a default value 0', async () => {
  const newblog = {
    title: 'TikTok',
    author: 'bytedance',
    url: 'http://www.bytedance.com',
  }
  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsEnd = await helper.blogsInDb()
  expect(blogsEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogsEnd.filter((p) => p.author === newblog.author)[0].likes).toBe(0)
})

test('should a blog can be view', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  const resultblog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultblog.body).toEqual(blogToView)
})

test('should blog id be defined', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  expect(blogToView.id).toBeDefined()
})

test('should a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtDb = await helper.blogsInDb()
  expect(blogsAtDb).toHaveLength(blogsAtStart.length - 1)
  expect(blogsAtDb.map((p) => p.title)).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})
