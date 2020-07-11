const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./blogs_test_helper')

const api = supertest(app)
jest.setTimeout(10000)

let token = ''
const id = '5f0944962cd7ad173fc3395b'
// 耗时操作，jest.setTimeout(3000)
beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(
    helper.initialBlogs
      .map((blog) => new Blog(blog))
      .map((blog) => blog.save()),
  )

  const logUser = {
    username: 'CSS',
    password: 'iamcss',
  }
  const { body } = await api.post('/api/login')
    .send(logUser)
    .expect(200)
  token = `bearer ${body.token}`

// 如果需要考虑执行顺序
// for (const p of helper.initialBlogs) {
//   const blogObj = new blog(p)
//   await blogObj.save()
// }
})

describe('shoule be initially blogs saved there', () => {
  test('should return json when request', async () => {
    await api.get('/api/blogs')
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
})
describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    const resultblog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultblog.body).toEqual(blogToView)
  })
  test('fails with statuscode 404 if note does not exist', async () => {
    const unExistingId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${unExistingId}`)
      .expect(404)
  })
  test('fails with statuscode 400 id is invalid', async () => {
    const invalidID = helper.invalidId
    await api
      .get(`/api/blogs/${invalidID}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  test('should blog id be defined', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    expect(blogToView.id).toBeDefined()
  })

  test('should a valid blog be added with valid token', async () => {
    const newblog = {
      title: 'Youtube',
      author: 'google',
      url: 'http://www.google.com',
      likes: 5,
    }
    const res = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newblog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsEnd = await helper.blogsInDb()
    expect(blogsEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsEnd.map((p) => p.author)).toContain(newblog.author)

    const user = await User.findById(res.body.user)
    expect(user.blogs.map((userId) => userId.toString())).toContainEqual(res.body.id)
  })

  test('should a blog not be added if without a token', async () => {
    const newblog = {
      title: 'Youtube',
      author: 'google',
      url: 'http://www.google.com',
      likes: 5,
    }
    const res = await api
      .post('/api/blogs')
      .send(newblog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsEnd = await helper.blogsInDb()
    expect(blogsEnd).toHaveLength(helper.initialBlogs.length)
    expect(res.body.message).toContain('invalid token')
  })

  test('should a blog without title or url can not be added', async () => {
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
      .set('Authorization', token)
      .send(noTitleBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    await api
      .post('/api/blogs')
      .set('Authorization', token)
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
      .set('Authorization', token)
      .send(newblog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsEnd = await helper.blogsInDb()
    expect(blogsEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsEnd.filter((p) => p.author === newblog.author)[0].likes).toBe(0)
  })
})

describe('deletion of a note', () => {
  test('fails with statuscode 404 id is not found', async () => {
    await api
      .delete(`/api/blogs/${helper.notSavedId}`)
      .set('Authorization', token)
      .expect(404)
  })
  test('should a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart.find((p) => p.user && p.user.toString() === id)
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

    const blogsAtDb = await helper.blogsInDb()
    expect(blogsAtDb).toHaveLength(blogsAtStart.length - 1)
    expect(blogsAtDb.map((p) => p.title)).not.toContain(blogToDelete.title)
  })
})
describe('update a note', () => {
  test('should update blog\'s  likes be added 1', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs.find((b) => b.user && b.user.toString() === id)
    const res = await api
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', token)
      .send({ ...blog, likes: blog.likes + 1 })
      .expect(200)
    const updatedBlog = res.body
    expect(updatedBlog.likes).toBe(blog.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
