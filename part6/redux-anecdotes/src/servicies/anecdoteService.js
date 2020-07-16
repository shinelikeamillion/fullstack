import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => axios.get(baseUrl).then((res) => res.data)

const createNew = (anecdote) => axios.post(baseUrl, anecdote).then((res) => res.data)

const voteById = (anecdote) => axios.put(`${baseUrl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 }).then((res) => res.data)

export default { getAll, createNew, voteById }
