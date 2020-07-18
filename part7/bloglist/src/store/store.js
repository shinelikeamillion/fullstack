import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from '../reducers/userReducer'
import { notificationReducer } from '../reducers/notificationReducer'
import { blogReducer } from '../reducers/blogReducer'
import { sorterReducer } from '../reducers/sorterReducer'

const reducer = combineReducers({
  user: userReducer,
  blogs: blogReducer,
  sortBy: sorterReducer,
  notification: notificationReducer,
})

export const store = createStore(reducer, applyMiddleware(thunk))