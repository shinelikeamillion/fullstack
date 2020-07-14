import axios from 'axios'
const baseUrl = '/api/login'

const login = user => axios.post(baseUrl, user).then(response => response.data)
const logout = _ => axios.get(baseUrl).then(res => res.data)

export default { login, logout }
