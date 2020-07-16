import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, initial } from '../reducers/anecdoteReducer'
import { info } from '../reducers/notificationReducer'
import anecdoteService from '../servicies/anecdoteService'
import Filter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(
    (state) => state.anecdotes
      .filter((anecdote) => (state.filter === 'ALL' || anecdote.content.includes(state.filter)))
      .sort((first, second) => second.votes - first.votes),
  )
  const dispatch = useDispatch()

  const voreIt = (anecdote) => {
    anecdoteService.voteById(anecdote).then((data) => {
      dispatch(vote(data.id))
      dispatch(info(`you voted '${data.content}'`))
    })
  }

  useEffect(() => {
    anecdoteService.getAll().then((data) => {
      dispatch(initial(data))
    })
  }, [dispatch])

  return (
    <>
      <Filter />
      {
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              {`has ${anecdote.votes} `}
              <button type="button" onClick={() => { voreIt(anecdote) }}>vote</button>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default AnecdoteList
