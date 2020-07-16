const anecdotesAtStart = {
  anecdotes: [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ],
  filter: '',
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
})

const initialState = {
  ...anecdotesAtStart,
  anecdotes: anecdotesAtStart.anecdotes.map((str) => asObject(str)),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'VOTE': {
    const { id } = action.data
    return {
      ...state,
      anecdotes: state.anecdotes.map((anecdote) => (anecdote.id === id
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote)),
    }
  }
  case 'CREATE': {
    const newOne = action.data
    return { ...state, anecdotes: [...state.anecdotes, newOne] }
  }
  case 'FILTER': {
    return { ...state, filter: action.data }
  }
  default: return state
  }
}

export default reducer
export const vote = (id) => ({ type: 'VOTE', data: { id } })
export const createNew = (content) => {
  const anecdote = asObject(content)
  return { type: 'CREATE', data: anecdote }
}
export const filter = (key) => ({ type: 'FILTER', data: key })
