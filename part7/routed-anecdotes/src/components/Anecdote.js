import React from 'react'
import { Link } from 'react-router-dom'
export const Anecdote = ({ anecdote }) => {
  return <>
    <h2>{anecdote.content}</h2>
    <div>{anecdote.author}</div>
    <strong>has {anecdote.votes} votes</strong>
  </>
}

export const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)