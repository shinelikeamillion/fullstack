import React, { useState } from 'react'
import userService from '../services/user'
import PropTypes from 'prop-types'

const Login = ({ updateUser, showMessage }) => {
  const [loginForm, setLoginForm] = useState({ username: 'Panda1', password: 'panda_no_1' })

  const onNameChange = ({ target }) => setLoginForm({ ...loginForm, username: target.value })
  const onPasswordChange = ({ target }) => setLoginForm({ ...loginForm, password: target.value })

  const login = (event) => {
    event.preventDefault()
    userService
      .login(loginForm)
      .then(res => {
        setLoginForm({ username: '', password: '' })
        updateUser(res)
      })
      .catch(error => showMessage({ message: error.response.data.message, isError: true }))
  }

  return <form id='login_form' onSubmit={login}>
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