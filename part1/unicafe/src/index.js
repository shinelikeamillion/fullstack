import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ label, action }) => <button onClick={action}>{label}</button>;
const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;
  return (
    <>
      <h2>Statistics</h2>
      {sum === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <Statistic label="good" statistic={good} />
            <Statistic label="neutral" statistic={neutral} />
            <Statistic label="bad" statistic={bad} />
            <Statistic
              label="average"
              statistic={(good * 1 + neutral * 0 + bad * -1) / sum}
            />
            <Statistic label="positive" statistic={good / sum + " %"} />
          </tbody>
        </table>
      )}
    </>
  );
};
const Statistic = ({ label, statistic }) => (
  <tr>
    <td>{label}</td>
    <td>{statistic}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        label="good"
        action={() => {
          setGood(good + 1);
        }}
      />
      <Button
        label="neutral"
        action={() => {
          setNeutral(neutral + 1);
        }}
      />
      <Button
        label="bad"
        action={() => {
          setBad(bad + 1);
        }}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
