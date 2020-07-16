const initNotification = {
  type: '',
  message: '',
}

const dispatchAndClear = ({ type, message }, dur = 5000) => (dispatch) => {
  dispatch({ type, message })
  setTimeout(() => {
    dispatch({ type: 'CLEAR', message })
  }, dur)
}

const clear = () => ({ type: 'CLEAR' })
const info = (message, dur) => dispatchAndClear({ type: 'INFO', message }, dur)
const error = (message, dur) => dispatchAndClear({ type: 'ERROR', message }, dur)

const notificationReducer = (state = initNotification, action) => {
  switch (action.type) {
  case 'INFO':
  case 'ERROR': return { type: action.type, message: action.message }
  case 'CLEAR': return initNotification
  default: return state
  }
}

export default notificationReducer
export { info, error, clear }
