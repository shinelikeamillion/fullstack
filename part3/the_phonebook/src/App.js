import React, { useState } from 'react'

const Filter = ({ filter, onChange }) =>
    <p>filter shown with: <input value={filter} onChange={onChange} /> </p>

const PersonForm = ({ submit, name, number, onNameChange, onNumberChange }) =>
    <form onSubmit={submit}>
        <div> name: <input value={name} onChange={onNameChange} /> </div>
        <div> phone: <input value={number} onChange={onNumberChange} /> </div>
        <div> <button type="submit">add</button> </div>
    </form>

const NumbersTable = ({ filter, persons }) => {
    const shownPersons = persons.filter(person => person.name.includes(filter) || person.number.includes(filter));
    return <>
        <h2>Numbers</h2>
        <table>
            <tbody>
                {shownPersons.map(person =>
                    <tr key={person.name}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                    </tr>)
                }
            </tbody>
        </table>
    </>
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addPerson = () => {
        if (!newName || !newNumber) return
        if (persons.map(person => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const personObj = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(personObj))
    }

    const submit = (event) => {
        event.preventDefault()
        addPerson()
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={newFilter} onChange={(event) => { setNewFilter(event.target.value) }} />
            <h2>Phonebook</h2>
            <PersonForm submit={submit} name={newName} number={newNumber} onNameChange={(event) => { setNewName(event.target.value) }} onNumberChange={(event) => { setNewNumber(event.target.value) }} />
            <NumbersTable filter={newFilter} persons={persons} />
        </div>
    )
}

export default App