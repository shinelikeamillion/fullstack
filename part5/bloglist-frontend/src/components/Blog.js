import React, { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import Create from '../components/Create'
import Togglable from '../components/Togglable'

const Blog = ({ blog, showMessage, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = (_) => {
    blogService
      .put({ ...blog, likes: blog.likes + 1 })
      .then(res => {
        updateBlog(res)
        showMessage({ message: `you liked ${res.title}` })
      })
      .catch(error => showMessage({ message: error.response.data.message, isError: true }))
  }

  const deleteById = (_) => {
    if (window.confirm(`Remobe blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteById(blog.id)
        .then(_ => {
          deleteBlog(blog)
          showMessage({ message: `you deleted ${blog.title} by ${blog.author}` })
        })
        .catch(error => showMessage({ message: error.response.data.message, isError: true }))
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <a href={blog.url}>{blog.title}</a> -- {blog.author}
      <button id='likeBtn' onClick={like}>like</button>
      <button id='deleteBtn' onClick={deleteById}>delete</button>
      <Togglable buttonLabel='show detail'>
        <BlogDetail blog={blog} />
      </Togglable>
    </div>
  )
}

const BlogDetail = ({ blog }) => {
  return <>
    <div className='title'>title: {blog.title}</div>
    <div className='author'>author: {blog.author}</div>
    <div className='likes'>likes: {blog.likes}</div>
    <div className='url'>url: {blog.url}</div>
  </>
}

const BlogList = ({ user, showMessage }) => {
  blogService.setToken(user.token)
  const [blogs, setBlogs] = useState([])
  const [sort, setSort] = useState(false)
  const createFormRef = useRef()

  const createBlog = blog => {
    setBlogs(blogs.concat(blog))
    createFormRef.current.toggleVisibility()
  }
  const updateBlog = blog => {
    setBlogs(blogs.map(b => b.id === blog.id ? blog : b))
  }
  const deleteBlog = blog => {
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const sorthandler = () => {
    const sortedBlogs = blogs.sort((a,b) => !sort?(b.likes - a.likes):(a.id < b.id ? -1 : 1))
    setBlogs(sortedBlogs)
    setSort(!sort)
  }

  return <>
    <button id='sort' onClick={sorthandler}>{sort?'normal':'sort'}</button>
    {blogs.map(blog => <Blog
      key={blog.id} blog={blog}
      showMessage={showMessage}
      updateBlog={updateBlog}
      deleteBlog={deleteBlog} />)}
    <Togglable buttonLabel='new blog' ref={createFormRef}>
      <Create createBlog={createBlog} showMessage={showMessage} />
    </Togglable>
  </>
}

export { BlogList, Blog }
