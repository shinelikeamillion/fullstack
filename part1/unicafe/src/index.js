import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ label, action }) => <button onClick={action}>{label}</button>
const Statics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  return <>
    <h2>statistics</h2>
    {
      sum === 0
        ?
        <p>No feedback given</p>
        :
        <>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {sum}</p>
          <p>average {(good * 1 + neutral * 0 + bad * -1) / sum}</p>
          <p>positive {good / sum} %</p>
        </>
    }
  </>
}


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

