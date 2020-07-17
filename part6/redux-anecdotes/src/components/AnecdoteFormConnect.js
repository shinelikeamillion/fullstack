import React from 'react'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const create = (event) => {
    event.preventDefault()
    const content = event.target.new.value
    if (!content) return
    // eslint-disable-next-line no-param-reassign
    event.target.new.value = ''
    const anecdote = { content, votes: 0 }

    props.createNew(anecdote)
  }

  return (
    <>
      <h3>create new</h3>
      <form onSubmit={create}>
        <div>
          <input name="new" />
          <button type="submit">create</button>
        </div>
      </form>
    </>
  )
}

const AnecdoteFormConnect = connect(null, { createNew })(AnecdoteForm)

export default AnecdoteFormConnect
