import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, initial } from '../reducers/anecdoteReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(
    (state) => state.anecdotes
      .filter((anecdote) => (state.filter === 'ALL' || anecdote.content.includes(state.filter)))
      .sort((first, second) => second.votes - first.votes),
  )
  const dispatch = useDispatch()

  const voreIt = (anecdote) => {
    dispatch(vote(anecdote))
  }

  useEffect(() => { dispatch(initial()) }, [dispatch])

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
