import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const Filter = ({ filter, onChange }) =>
    <p>filter shown with: <input value={filter} onChange={onChange} /> </p>

const PersonForm = ({ submit, name, number, onNameChange, onNumberChange }) =>
    <form onSubmit={submit}>
        <div> name: <input value={name} onChange={onNameChange} /> </div>
        <div> phone: <input value={number} onChange={onNumberChange} /> </div>
        <div> <button type="submit">add</button> </div>
    </form>

const NumbersTableRow = ({ person, deleteById }) =>
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>
            <button onClick={() => {
                if (window.confirm(`Delete ${person.name} ?`)) {
                    deleteById(person.id)
                }
            }}>delete</button>
        </td>
    </tr>
const NumbersTable = ({ filter, persons, deleteById }) => {
    const shownPersons = persons.filter(person => person.name.includes(filter) || person.number.includes(filter));
    return <>
        <h2>Numbers</h2>
        <table>
            <tbody>
                {shownPersons.map(person => <NumbersTableRow key={person.name} person={person} deleteById={deleteById} />)}
            </tbody>
        </table>
    </>
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const submit = (event) => {
        event.preventDefault()

        if (!newName || !newNumber) return
        if (persons.map(person => person.name).includes(newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the older number with a new one?`)) {
                update()
            }
        } else {
            addPerson()
        }
    }

    const addPerson = async () => {
        const personObj = {
            name: newName,
            number: newNumber
        }
        await phonebookService
            .create(personObj)
            .then(person => {
                setPersons(persons.concat(person))
                setNewName('')
                setNewNumber('')
            })
    }

    const update = async () => {
        const person = persons.find(person => person.name === newName)
        const changePerson = { ...person, number: newNumber }
        await phonebookService
            .update(changePerson.id, changePerson)
            .then(updatedPerosn => setPersons(persons.map(person => person.name !== newName ? person : updatedPerosn)))
    }

    const fetchPersons = async () => await
        phonebookService
            .getAll()
            .then(initialPhonebook => setPersons(initialPhonebook))

    const deleteById = async (id) => {
        await phonebookService
            .deleteById(id)
            .then(_ => setPersons(persons.filter(p => p.id !== id)))
            .catch(_ => {
                console.log('fail')
            })
    }

    // useEffect function must return a cleanup function or nothing
    useEffect(() => { fetchPersons() }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={newFilter} onChange={(event) => { setNewFilter(event.target.value) }} />
            <h2>Add a new</h2>
            <PersonForm submit={submit} name={newName} number={newNumber} onNameChange={(event) => { setNewName(event.target.value) }} onNumberChange={(event) => { setNewNumber(event.target.value) }} />
            <NumbersTable filter={newFilter} persons={persons} deleteById={deleteById} />
        </div>
    )
}

export default App