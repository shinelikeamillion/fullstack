import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addPerson = () => {
        if (!newName || !newNumber) return

        const personObj = {
            name: newName,
            number: newNumber
        }

        if (persons.map(person => person.name).includes(newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the older number with a new one?`)) {
                let id = persons.map(person => person.name).indexOf(newName);
                axios
                    .put(`http://localhost:3001/persons/${id}`, personObj)
                    .then(response => {
                        setPersons(persons.map(person => person.name !== newName ? person : response.data))
                    })
            }
        } else {
            axios
                .post('http://localhost:3001/persons', personObj)
                .then(response => {
                    setPersons(persons.concat(response.data))
                })
        }
    }

    const submit = (event) => {
        event.preventDefault()
        addPerson()
    }

    // useEffect function must return a cleanup function or nothing
    const hook = () => {
        (async () => {
            let response = await axios.get('http://localhost:3001/persons')
            if (response.status === 200) setPersons(response.data)
        })()
    }

    useEffect(hook, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={newFilter} onChange={(event) => { setNewFilter(event.target.value) }} />
            <h2>Add a new</h2>
            <PersonForm submit={submit} name={newName} number={newNumber} onNameChange={(event) => { setNewName(event.target.value) }} onNumberChange={(event) => { setNewNumber(event.target.value) }} />
            <NumbersTable filter={newFilter} persons={persons} />
        </div>
    )
}

export default App