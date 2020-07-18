import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../reducers/userReducer'

const Login = () => {
  const [loginForm, setLoginForm] = useState({ username: 'Panda1', password: 'panda_no_1' })
  const dispath = useDispatch()

  const onNameChange = ({ target }) => setLoginForm({ ...loginForm, username: target.value })
  const onPasswordChange = ({ target }) => setLoginForm({ ...loginForm, password: target.value })

  const loginHandler = (event) => {
    event.preventDefault()
    dispath(login(loginForm))

    //todo error handle
    // .catch(error => showMessage({ message: error.response.data.message, isError: true }))
  }

  return <form id='login_form' onSubmit={loginHandler}>
    <table>
      <tbody>
        <tr>
          <td>Username: </td>
          <td><input id="username" value={loginForm.username} onChange={onNameChange} /></td>
        </tr>
        <tr>
          <td>Password: </td>
          <td><input id="password" value={loginForm.password} onChange={onPasswordChange} type='password' /></td>
        </tr>
      </tbody>
    </table>
    <button id = "login" type="submit">login</button>
  </form>
}

Login.prototypes = {
  updateUser: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
}

export default Login