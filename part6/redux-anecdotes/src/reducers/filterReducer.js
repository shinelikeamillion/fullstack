const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
  case 'SET_FILTER': return action.filter
  default: return state
  }
}

export default filterReducer
export const filter = (key) => ({ type: 'SET_FILTER', filter: key })
