import axios from 'axios'
const baseUrl = '/api/login'

const login = user => axios.post(baseUrl, user).then(response => response.data)

export default { login }
