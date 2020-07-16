import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { info } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(
    (state) => state.anecdotes
      .filter((anecdote) => (state.filter === 'ALL' || anecdote.content.includes(state.filter)))
      .sort((first, second) => second.votes - first.votes),
  )
  const dispatch = useDispatch()

  const voreIt = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(info(`you voted '${anecdote.content}'`))
  }

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
