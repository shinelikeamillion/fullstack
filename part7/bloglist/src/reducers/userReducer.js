
import userService from '../services/user'
import blogService from '../services/blogs'

const KEY_LOGGED_USER = 'loggedUser'
export const userReducer = (state = null , action) => {
  switch (action.type) {
  case 'LOGIN': {
    const user = action.data
    blogService.setToken(user.token)
    return user
  }
  case 'LOGINOUT':
    localStorage.removeItem(KEY_LOGGED_USER)
    return null
  default: return state
  }
}
export const initUser = () => async dispatch => {
  const loggerUserJson = localStorage.getItem(KEY_LOGGED_USER)
  if(loggerUserJson) dispatch({ type: 'LOGIN', data: JSON.stringify(loggerUserJson) })
}
export const login = (user) => async dispatch => {
  const data = await userService.login(user)
  localStorage.setItem(KEY_LOGGED_USER, data)
  dispatch({ type: 'LOGIN', data })
}

export const logout = () => async dispatch => {
  localStorage.removeItem(KEY_LOGGED_USER)
  dispatch({ type: 'LOGINOUT' })
}
