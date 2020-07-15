import React, { useState } from 'react'
import blogService from '../services/blogs'

const Create = ({ createBlog, showMessage }) => {

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
        createBlog(blog)
        setBlog({ title: '', author: '', url: '', })
        showMessage({ message: `new blog ${blog.title} by ${blog.author} added` })
      })
      .catch(error => showMessage({ message: error.response.data.message, isError: true }))
  }

  return < form onSubmit={create} >
    <table>
      <tbody>
        <tr>
          <td>title: </td>
          <td><input id='title' value={blog.title}
            onChange={(event) => { setBlog({ ...blog, title: event.target.value }) }} />
          </td>
        </tr>
        <tr>
          <td>author: </td>
          <td><input id='author' value={blog.author}
            onChange={(event) => { setBlog({ ...blog, author: event.target.value }) }} />
          </td>
        </tr>
        <tr>
          <td>url: </td>
          <td><input id='url' value={blog.url}
            onChange={(event) => { setBlog({ ...blog, url: event.target.value }) }} />
          </td>
        </tr>
      </tbody>
    </table>
    <button type="submit">create</button>
  </form >
}

export default Create