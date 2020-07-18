import React, { useEffect, useRef } from 'react'
import Create from '../components/Create'
import Togglable from '../components/Togglable'
import { like, deleteById, getAll } from '../reducers/blogReducer'
import { sortById, sortByLikes } from '../reducers/sorterReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useDispatch()

  const deleteIt= (_) => {
    if (window.confirm(`Remobe blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteById(blog))
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <a href={blog.url}>{blog.title}</a> -- {blog.author}
      <button id='likeBtn' onClick={() => {dispatch(like(blog))}}>like</button>
      <button id='deleteBtn' onClick={deleteIt}>delete</button>
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

const BlogList = () => {
  let byLikes = false
  const blogs = useSelector(state => {

    byLikes = state.sortBy === 'LIKES'
    return state.blogs.sort(
      (a,b) =>
        sortByLikes
          ?(b.likes - a.likes)
          :(a.id < b.id ? -1 : 1)
    )})
  const createFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => { dispatch(getAll())}, [dispatch])


  return <>
    <button id='sort' onClick={() => {dispatch(byLikes?sortById():sortByLikes())}}>
      {byLikes?'normal':'sort'}
    </button>
    {blogs.map(blog => <Blog
      key={blog.id} blog={blog}/>)}
    <Togglable buttonLabel='new blog' ref={createFormRef}>
      <Create toggleForm={() => {createFormRef.current.toggleVisibility()}}/>
    </Togglable>
  </>
}

export { BlogList, Blog }
