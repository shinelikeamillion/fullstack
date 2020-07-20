import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BlogList, BlogDetail } from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import { Users, User } from './components/Users'
import { ActionBar } from './components/ActionBar'
import { initUser } from './reducers/userReducer'
import { getAll } from './reducers/blogReducer'
import { Route, Switch, Redirect } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(initUser()) }, [dispatch])
  useEffect(() => { dispatch(getAll())}, [dispatch])

  const user = useSelector(state => state.user)

  return (
    <>
      <ActionBar/>
      <Notification />
      <Switch>
        <Route path='/login' render={
          () => user? <Redirect to='/'/> : <Login/>
        }/>
        <Route path='/users/:name'><User/></Route>
        <Route path='/users'><Users/></Route>
        <Route path='/blogs/:id'><BlogDetail /></Route>
        <Route path='/'><BlogList /></Route>
      </Switch>
    </>
  )
}

export default App