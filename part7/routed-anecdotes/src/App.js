import React, { useState } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Menu } from './components/Menu'
import { AnecdoteList, Anecdote } from './components/Anecdote'
import { CreateForm } from './components/CreateForm'
import { Footer } from './components/Footer'
import { About } from './components/About'

const initState = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '1'
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '2'
  }
]

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initState)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote}/>
        </Route>
        <Route path='/createNew'>
          <CreateForm addNew={addNew} />
        </Route>
        <Route path='/about' >
          <About />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
