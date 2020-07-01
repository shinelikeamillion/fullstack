import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ label, action }) => <button onClick={action}>{label}</button>
const Statics = ({ good, neutral, bad }) => (
  <>
    <h2>statistics</h2>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
  </>
);

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return <div>
    <h1>give feedback</h1>
    <Button label='good' action={() => { setGood(good + 1) }} />
    <Button label='neutral' action={() => { setNeutral(neutral + 1) }} />
    <Button label='bad' action={() => { setBad(bad + 1) }} />
    <Statics good={good} neutral={neutral} bad={bad} />
  </div>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

