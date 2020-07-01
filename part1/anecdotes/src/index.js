import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVote, setMostVote] = useState(0)

  // 返回一个方法（注：事件处理被定义为 function call）
  const vote = (selected) => () => {
    const copy = [...votes]
    const vote = copy[selected] += 1
    if (vote > copy[mostVote]) setMostVote(selected)
    setVotes(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote(selected)}>vote</button>
      <button onClick={() => { setSelected(Math.floor(Math.random() * anecdotes.length)) }}>next anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[mostVote]}</p>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

