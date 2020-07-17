import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => (
  <div>
    <div>Filter:</div>
    <input onChange={(e) => { props.filter(e.target.value) }} />
  </div>
)

const FilterConnect = connect(null, { filter })(Filter)

export default FilterConnect
