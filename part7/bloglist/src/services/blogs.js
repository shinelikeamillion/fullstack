import axios from 'axios'
const baseUrl = '/api/blogs'

let token = 'bearer'
const setToken = newToken => token = `bearer ${newToken}`

let config = () => {
  return { headers: { Authorization: token } }
}

const getAll = () => axios.get(baseUrl).then(response => response.data)
const create = (blog) => axios.post(baseUrl, blog, config()).then(response => response.data)
const comment = (id, content) => axios.post(`${baseUrl}/${id}/comments`, content, config()).then(response => response.data)
const put = (blog) => axios.put(`${baseUrl}/${blog.id}`, blog, config()).then(response => response.data)
const deleteById = (id) => axios.delete(`${baseUrl}/${id}`, config()).then(response => response.data)

export default { getAll, create, put, deleteById, setToken, comment }