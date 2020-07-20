import React from 'react'
import _ from 'lodash'
import { Link, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table, ListGroup } from 'react-bootstrap'
import { Blog } from '../components/Blog'

export const User = () => {
  const matcher = useRouteMatch('/users/:name')
  const name = matcher.params.name
  const blogs = useSelector(state => _(state.blogs).groupBy('author').find((_, key) => key === name))
  if(!blogs) return null
  return (
    <>
      <h3>blogs added by {name}</h3>
      <ListGroup>
        { blogs.map(blog => <ListGroup.Item key = {blog.id}><Blog blog={blog}/></ListGroup.Item>) }
      </ListGroup>
    </>
  )
}

export const Users = () => {
  const users = useSelector(state => {
    return _(state.blogs)
      .groupBy('author')
      .map((list, name) => ({ name, number: list.length }))
      .value()
      .sort((a, b) => b.number - a.number)
  })
  const match = useRouteMatch()
  return users
    ? <>
      <Table responsive striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Author</th>
            <th>BLOGS CREATED</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) =>
            <tr key={user.name}>
              <td>{index}</td>
              <td><Link to={`${match.url}/${user.name}`}>{user.name}</Link></td>
              <td>{user.number}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
    : null
}

export const UserDetail = (author) => {
  const user = useSelector(state =>
    _(state.blogs)
      .groupBy('author')
      .find((_, name) => name === author)
  )
  return <>
    <h2>{user.username}</h2>
    <h4>added blogs</h4>
    {user.blogs}
  </>
}