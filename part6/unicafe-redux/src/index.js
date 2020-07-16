import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer, {good, neutral, bad, zero} from './reducer'
import {Provider, useDispatch} from 'react-redux'

const store = createStore(reducer)

const App = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={()=>{dispatch(good)}}>good</button> 
      <button onClick={()=>{dispatch(neutral)}}>neutral</button> 
      <button onClick={()=>{dispatch(bad)}}>bad</button>
      <button onClick={()=>{dispatch(zero)}}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(
  <Provider store={store}><App /></Provider>, 
  document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)
