import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [couter, setCounter] = useState(0)

  setTimeout(
    () => setCounter(couter + 1),
    1000
  )

  return <div>{couter}</div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
