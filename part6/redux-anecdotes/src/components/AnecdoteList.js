import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, filter } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(
    (state) => state.anecdotes
      .filter((anecdote) => anecdote.content.includes(state.filter))
      .sort((first, second) => second.votes - first.votes),
  )
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <div>Filter:</div>
        <input onChange={(e) => { dispatch(filter(e.target.value)) }} />
      </div>
      {
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              {`has ${anecdote.votes}`}
              <button type="button" onClick={() => { dispatch(vote(anecdote.id)) }}>vote</button>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default AnecdoteList
