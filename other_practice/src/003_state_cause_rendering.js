import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const History = ({ allClicks }) =>
  (allClicks.length === 0)
    ?
    <div>the app is used by pressing the buttons</div>
    :
    <div>{allClicks.join(' ')}</div>

const Button = ({ label, action }) => <button onClick={action}>{label}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return <div>
    {left}
    <Button label='left' action={handleLeftClick} />
    <Button label='right' action={handleRightClick} />
    {right}
    <History allClicks={allClicks} />
  </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
