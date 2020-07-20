
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { Nav, Button } from 'react-bootstrap'

export const ActionBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5
  }
  return (
    <>
      <Nav>
        <Link className='nav-link' style={padding} to='/'>blogs</Link>
        <Link className='nav-link' style={padding} to='/users'>users</Link>
        {!user && <Link className='nav-link' style={padding} to='/login'>login</Link>}
      </Nav>
      {user && <div >{user.username} logged in <Button style={{ alignSelf: 'flex-end' }} variant='light' size='sm' onClick={() => {dispatch(logout())}}>logout</Button></div>}
    </>
  )
}