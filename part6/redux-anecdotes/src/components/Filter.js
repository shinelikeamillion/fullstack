import React from 'react'
import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <div>Filter:</div>
      <input onChange={(e) => { dispatch(filter(e.target.value)) }} />
    </div>
  )
}

export default Filter
