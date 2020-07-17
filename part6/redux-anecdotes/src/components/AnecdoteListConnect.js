import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import Filter from './FilterConnect'

const Anecdote = ({ anecdote, voteHandler }) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      {`has ${anecdote.votes} `}
      <button type="button" onClick={voteHandler}>vote</button>
    </div>
  </div>
)

const AnecdoteList = (props) => {
  const { anecdotes } = props

  return (
    <>
      <Filter />
      {
        anecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            voteHandler={() => props.vote(anecdote)}
          />
        ))
      }
    </>
  )
}

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes
    .filter((anecdote) => (state.filter === 'ALL' || anecdote.content.includes(state.filter)))
    .sort((first, second) => second.votes - first.votes),
})

const mapDispatchToProps = { vote }

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
