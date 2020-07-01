import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ label, action }) => <button onClick={action}>{label}</button>

const App = () => {
  const [couter, setCounter] = useState(0)
  const increateByOne = () => setCounter(couter + 1)
  const setToZero = () => setCounter(0)

  return <div>
    <Display counter={couter} />
    <Button label='plus' action={increateByOne} />
    <Button label='zero' action={setToZero} />
  </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
