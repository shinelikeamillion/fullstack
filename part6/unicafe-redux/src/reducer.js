const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}


const good = { type: 'GOOD' }
const neutral = { type: 'OK' }
const bad = { type: 'BAD' }
const zero = { type: 'ZERO' }

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good+1}
    case 'OK':
      return {...state, ok: state.ok+1}
    case 'BAD':
      return {...state, bad: state.bad+1}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
export {good, neutral, bad, zero}