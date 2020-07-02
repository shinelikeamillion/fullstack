import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const notes = [
  {
    content: 'simple test',
    data: new Date().toISOString(),
    important: false,
    id: 0
  },
  {
    content: 'how about this 😕',
    data: new Date().toISOString(),
    important: true,
    id: 1
  },
]

const Notes = ({ notes }) =>
  <ul>
    {notes.map(note => <li key={note.id}>{note.content}</li>)}
  </ul>

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const addNote = (note) => {
    const noteObj = {
      content: note,
      data: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    // 使用副本更新状态
    setNotes(notes.concat(noteObj))
    setNewNote('')
  }

  const submit = (event) => {
    event.preventDefault()
    if (newNote) addNote(newNote)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notes notes={notesToShow} />
      {/* <p><input type="checkbox" checked={showAll ? 'checked' : ''} onChange={(event) => { setShowAll(event.target.checked) }} />show all</p> */}
      <div>
        <button onClick={() => { setShowAll(!showAll) }}>show {showAll ? 'important' : 'all'}</button>
      </div>
      {/* 放在 form 里面出现提交表单的问题 */}
      <form onSubmit={submit}>
        <input value={newNote} onChange={(event) => { setNewNote(event.target.value) }} />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

ReactDOM.render(<App notes={notes} />, document.getElementById('root'))
