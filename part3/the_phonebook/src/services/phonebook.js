import axios from 'axios'

// const baseUrl = process.env.NODE_ENV === 'development'
//     ? 'http://localhost:3001/api/persons'
//     : '/api/persons'

// added a proxy to port 3001
const baseUrl = '/api/persons'

const getAll = _ => axios.get(baseUrl).then(response => response.data)

const create = newObj => axios.post(baseUrl, newObj).then(response => response.data)

const update = (id, newObj) => axios.put(`${baseUrl}/${id}`, newObj).then(response => response.data)

const deleteById = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data)

export default { getAll, create, update, deleteById }