
export const sorterReducer = (state = 'IDS', action) => {
  switch (action.type) {
  case 'LIKES': return 'LIKES'
  case 'IDS': return 'IDS'
  default: return state
  }
}

export const sortByLikes = () => ({ type: 'LIKES' })
export const sortById = () => ({ type: 'IDS' })
