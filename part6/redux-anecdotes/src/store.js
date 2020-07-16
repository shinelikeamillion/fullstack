import { createStore, combineReducers } from 'redux'
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer,
  notify: notificationReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store
