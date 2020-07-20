import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <div className='container'>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </div>
  , document.getElementById('root'))