import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = _ => axios.get(baseUrl).then(response => response.data)

const create = newObj => axios.post(baseUrl, newObj).then(response => response.data)

const update = (id, newObj) => axios.put(`${baseUrl}/${id}`, newObj).then(response => response.data)

const deleteById = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data)

export default { getAll, create, update, deleteById }