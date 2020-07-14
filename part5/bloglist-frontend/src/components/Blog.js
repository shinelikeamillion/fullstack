import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => (
  <div>
    <a href={blog.url}>{blog.title}</a> -- {blog.author}
  </div>
)

const BlogList = ({ user, showMessage }) => {
  blogService.setToken(user.token)
  const [blogs, setBlogs] = useState([])

  const updateBlog = blog => { setBlogs(blogs.concat(blog)) }

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  return <>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    <Create updateBlog={updateBlog} showMessage={showMessage} />
  </>
}

const Create = ({ updateBlog, showMessage }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const create = (event) => {
    event.preventDefault()
    blogService
      .create(blog)
      .then(blog => {
        updateBlog(blog)
        showMessage({ message: `new blog ${blog.title} by ${blog.author} added` })
      })
      .catch(error => showMessage({ message: error.response.data.message, isError: true }))
  }

  return < form onSubmit={create} >
    <table>
      <tbody>
        <tr>
          <td>title: </td>
          <td><input value={blog.title}
            onChange={(event) => { setBlog({ ...blog, title: event.target.value }) }} />
          </td>
        </tr>
        <tr>
          <td>author: </td>
          <td><input value={blog.author}
            onChange={(event) => { setBlog({ ...blog, author: event.target.value }) }} />
          </td>
        </tr>
        <tr>
          <td>url: </td>
          <td><input value={blog.url}
            onChange={(event) => { setBlog({ ...blog, url: event.target.value }) }} />
          </td>
        </tr>
      </tbody>
    </table>
    <button type="submit">create</button>
  </form >
}

export default BlogList
