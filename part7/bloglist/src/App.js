import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BlogList } from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import { initUser, logout } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => { dispatch(initUser()) }, [dispatch])

  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      {user && <p>{user.username} logged in <button onClick={() => {dispatch(logout())}}>logout</button></p>}
      {user ? <BlogList user={user} /> : <Login /> }
    </>
  )
}

export default App