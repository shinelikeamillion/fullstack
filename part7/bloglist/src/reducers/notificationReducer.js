
export const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'INFO': return action.data
  case 'ERROR': return action.data
  case 'CLEAR': return null
  default: return state
  }
}
const DURATION = 5000
let timerId = 0
const dispatchAndClear = (action, dur) => async dispatch => {
  dispatch(action)
  clearTimeout(timerId)
  timerId = setTimeout(() => {
    dispatch(clear())
  }, dur)
}

export const info = (message, dur = DURATION) =>
  dispatchAndClear({ type: 'INFO', data: { message } }, dur)

export const error = (message, dur = DURATION) =>
  dispatchAndClear({ type: 'ERROR', data: { isError: true, message } }, dur)

export const clear = () => ({ type: 'CLEAR' })
