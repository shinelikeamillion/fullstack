import React, { useState, useEffect } from 'react'
import BlogList from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'

const KEY_LOGGED_USER = 'loggedUser'
const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const logout = _ => {
    setUser(null)
    localStorage.removeItem(KEY_LOGGED_USER)
    // localStorage.clear()
  }

  const updateUser = user => {
    setUser(user)
    localStorage.setItem(KEY_LOGGED_USER, JSON.stringify(user))
  }
  const showMessage = msg => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 3000)
  }

  useEffect(() => {
    const loggerUserJson = localStorage.getItem(KEY_LOGGED_USER)
    if (loggerUserJson) setUser(JSON.parse(loggerUserJson))
  }, [])

  return <div>
    <h1>Blogs</h1>
    <Notification message={message} />
    {user && <p>{user.username} logged in <button onClick={logout}>logout</button></p>}
    {user
      ? <BlogList user={user} showMessage={showMessage} />
      : <Login updateUser={updateUser} showMessage={showMessage} />
    }
  </div>
}

export default App