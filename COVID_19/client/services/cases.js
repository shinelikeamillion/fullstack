import axios from 'axios'

const baseUrl = '/api/cases'

const getAll = () => axios.get(baseUrl).then((res) => res.data)

export default { getAll }
