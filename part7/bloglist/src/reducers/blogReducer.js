import blogService from '../services/blogs'
import { info, error } from '../reducers/notificationReducer'

export const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE': {
    const newBlog = action.data
    return state.map(blog => blog.id === newBlog.id ? newBlog : blog)
  }
  case 'DELETE': return state.filter(blog => blog.id !== action.data.id)
  case 'CREATE': {
    const newBlog = action.data
    return [...state, newBlog]
  }
  case 'ADD_COMMENT': {
    const comment = action.data
    return state.map(blog =>
      blog.id === comment.blogId ? { ...blog, comments: [...blog.comments, comment] } : blog)
  }
  case 'GET_ALL': return [...action.data]
  default: return state
  }
}

export const like = (blog) => async dispatch => {
  blogService
    .put({ ...blog, likes: blog.likes + 1 })
    .then(data => {
      dispatch({ type: 'LIKE', data })
      dispatch(info(`you liked ${data.title}`))
    })
    .catch(err => dispatch(error(err.response.data.message)))
}

export const deleteById = (blog) => async dispatch => {
  blogService
    .deleteById(blog.id)
    .then(_ => {
      dispatch({ type: 'DELETE', data:blog })
      dispatch(info(`you deleted ${blog.title} by ${blog.author}` ))
    })
    .catch(err => dispatch(error(err.response.data.message)))
}

export const create = (blog) => async dispatch => {
  blogService
    .create(blog)
    .then(data => {
      dispatch({ type: 'CREATE', data })
    })
    .catch(err => dispatch(error(err.response.data.message)))
}

export const addComment = (id, content) => async dispatch => {
  blogService
    .comment(id, content)
    .then( comment => dispatch({ type: 'ADD_COMMENT', data: comment }))
    .catch(err => dispatch(error(err.response.data.message)))
}

export const getAll = () => async dispatch => {
  blogService
    .getAll()
    .then(blogs => dispatch({ type:'GET_ALL', data: blogs }))
    .catch(err => dispatch(error(err.response.data.message)))
}
