import React, { useRef, useState } from 'react'
import Create from '../components/Create'
import Togglable from '../components/Togglable'
import { Comments } from '../components/Comments'
import { like, deleteById } from '../reducers/blogReducer'
import { sortById, sortByLikes } from '../reducers/sorterReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { Table, Button, Jumbotron, Modal } from 'react-bootstrap'

const ConfirmDialog = ({ onConfirm, ...dialogProps }) => <Modal
  {...dialogProps} centered size='sm' aria-labelledby='contained-modal-title-vcenter'>
  <Modal.Header>CONFORM</Modal.Header>
  <Modal.Body>
    <p>Remove blog {dialogProps.blog.title} by {dialogProps.blog.author}</p>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={dialogProps.onHide}>Cancel</Button>
    <Button variant="danger" onClick={onConfirm}>Delete</Button>
  </Modal.Footer>
</Modal>

const Blog = ({ blog }) => {

  const user = useSelector(state => state.user)
  const [showDialog, setShowDialog] = useState(false)

  const dispatch = useDispatch()

  const deleteIt= () => {
    dispatch(deleteById(blog))
    setShowDialog(false)
  }

  return (<>
    <ConfirmDialog onConfirm={deleteIt} show={showDialog} blog={blog} onHide={() => setShowDialog(false)}/>
    <div className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
      {/* <span>-- {blog.author} </span> */}
      <div style={{ display: 'none' }}>
        <Button id='likeBtn' onClick={() => {dispatch(like(blog))}}>like</Button>
        {user && <Button id='deleteBtn' onClick={() => {setShowDialog(true)}}>delete</Button>}
        <Togglable buttonLabel='show detail'>
          <ToogleDetail blog={blog} />
        </Togglable>
      </div>
    </div>
  </>
  )
}

const ToogleDetail = ({ blog }) => {
  return <>
    <div className='title'>title: {blog.title}</div>
    <div className='author'>author: {blog.author}</div>
    <div className='likes'>likes: {blog.likes}</div>
    <div className='url'>url: {blog.url}</div>
  </>
}

const BlogDetail = () => {
  const blogs = useSelector(state => state.blogs)
  const matcher = useRouteMatch('/blogs/:id')
  const blog = blogs.find(b => b.id === matcher.params.id)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return blog
    ?<>
      <Jumbotron>
        <h1 className='title'>{blog.title}</h1>
        <span>URL: </span>
        <Link className='url' to={blog.url}>{blog.url}</Link>
        <div className='likes'>{blog.likes} likes {user && <Button id='likeBtn' variant='light' size='sm' onClick={() => {dispatch(like(blog))}}><span role='img' aria-label="thumbsup">👍</span></Button>}
        </div>
        <div className='author'>-- by {blog.author}</div>
      </Jumbotron>
      <Comments comments={blog.comments}/>
    </>
    : null
}

const BlogList = () => {
  const byLikes = useSelector(state => state.sortBy === 'LIKES')
  const blogs = useSelector(state => state.blogs.sort(
    (a,b) =>
      byLikes
        ?(b.likes - a.likes)
        :(a.id < b.id ? -1 : 1)
  ))
  const user = useSelector(state => state.user)
  const createFormRef = useRef()
  const dispatch = useDispatch()

  return <>
    <Button size='sm' variant='light' id='sort' onClick={() => {dispatch(byLikes?sortById():sortByLikes())}}>
      {byLikes?'normal':'sort'}
    </Button>
    <Table striped bordered hover>
      <tbody>
        {blogs.map(blog => <tr key={blog.id}><td><Blog blog={blog}/></td></tr>)}
      </tbody>
    </Table>
    {user && <Togglable buttonLabel='new blog' ref={createFormRef}>
      <Create toggleForm={() => {createFormRef.current.toggleVisibility()}}/>
    </Togglable>}
  </>
}

export { BlogList, Blog, BlogDetail }
