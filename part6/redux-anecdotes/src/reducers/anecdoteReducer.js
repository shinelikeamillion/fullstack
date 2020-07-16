import anecdoteService from '../servicies/anecdoteService'
import { info } from './notificationReducer'

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
export const vote = (anecdote) => async (dispatch) => {
  const data = await anecdoteService.voteById(anecdote)
  dispatch({ type: 'VOTE', data })
  dispatch(info(`you voted '${data.content}'`, 300))
}

export const initial = () => async (dispatch) => {
  const data = await anecdoteService.getAll()
  dispatch({ type: 'INITIAL', data })
}
export const createNew = (anecdote) => async (dispatch) => {
  const data = await anecdoteService.createNew(anecdote)
  dispatch({ type: 'CREATE', data })
  dispatch(info(`you added '${data.content}'`))
}
