import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { useFild } from '../hooks/hooks'
import { Form, Button } from 'react-bootstrap'

const Login = () => {
  const dispath = useDispatch()
  const username = useFild('username')
  const password = useFild('password')

  const loginHandler = (event) => {
    event.preventDefault()
    dispath(login({ username: username.value, password: password.value }))
  }

  return (
    <Form id='login_form' onSubmit={loginHandler}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder='username' {...username}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder='password' {...password} type='password'></Form.Control>
        <Form.Text>we will never share your infomation to others</Form.Text>
      </Form.Group>
      <Button id = "login" type="submit">login</Button>
    </Form>
  )
}

export default Login