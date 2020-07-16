import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const create = (event) => {
    event.preventDefault()
    const content = event.target.new.value
    console.log(content)
    if (!content) return
    dispatch(createNew(content))
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

export default AnecdoteForm
