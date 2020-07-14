import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''
const setToken = newToken => token = `bearer ${newToken}`

let config = () => {
  return { headers: { Authorization: token } }
}

const getAll = () => axios.get(baseUrl).then(response => response.data)
const create = (blog) => axios.post(baseUrl, blog, config()).then(response => response.data)
const deleteById = (id) => axios.delete(`${baseUrl}/${id}`).then(response => response.data)

export default { getAll, create, deleteById, setToken }