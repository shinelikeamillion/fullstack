const initNotification = {
  type: '',
  message: '',
}

const clear = () => ({ type: 'CLEAR' })
const info = (message) => ({ type: 'INFO', message })
const error = (message) => ({ type: 'ERROR', message })

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
