const reducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const { id } = action.data
    return state.map((anecdote) => (anecdote.id === id
      ? { ...anecdote, votes: anecdote.votes + 1 }
      : anecdote))
  }
  case 'CREATE': {
    const newOne = action.data
    return [...state, newOne]
  }
  case 'INITIAL': {
    return [...action.data]
  }
  default: return state
  }
}

export default reducer
export const vote = (id) => ({ type: 'VOTE', data: { id } })
export const initial = (data) => ({ type: 'INITIAL', data })
export const createNew = (newOne) => ({ type: 'CREATE', data: newOne })
