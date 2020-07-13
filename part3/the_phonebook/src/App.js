import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const Filter = ({ filter, onChange }) =>
    <>
        <div>filter shown with: </div>
        <input value={filter} onChange={onChange} />
    </>

const PersonForm = ({ submit, name, number, onNameChange, onNumberChange }) =>
    <form onSubmit={submit}>
        <table>
            <tbody>
                <tr>
                    <td>name: </td>
                    <td><input value={name} onChange={onNameChange} /></td>
                </tr>
                <tr>
                    <td>phone: </td>
                    <td><input value={number} onChange={onNumberChange} /></td>
                </tr>
            </tbody>
        </table>
        <button type="submit">add</button>
    </form>

const NumbersTableRow = ({ person, deleteById }) =>
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>
            <button onClick={() => {
                if (window.confirm(`Delete ${person.name} ?`)) {
                    deleteById(person)
                }
            }}>delete</button>
        </td>
    </tr>
const NumbersTable = ({ filter, persons, deleteById }) => {
    const shownPersons = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
        || person.number.toLowerCase().includes(filter.toLowerCase()));
    return <>
        <h2>Numbers</h2>
        <table className='numbers_table'>
            <thead>
                <tr><td>Name</td><td>Number</td><td></td></tr>
            </thead>
            <tbody>
                {shownPersons.map(person => <NumbersTableRow key={person.name} person={person} deleteById={deleteById} />)}
            </tbody>
        </table>
    </>
}

const Notification = ({ message }) => message ? <div className={message.isError ? 'error' : 'notification'}>{message.content}</div> : null

const Footer = () => {
    const footerStyle = {
        marginTop: 20,
        textAlign: 'center',
        color: '',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <em>phonebook app, sean_matro @ 2020</em>
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [message, setNewMsg] = useState()

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

    const addPerson = () => {
        const personObj = {
            name: newName,
            number: newNumber
        }
        phonebookService
            .create(personObj)
            .then(person => {
                setPersons(persons.concat(person))
                setNewName('')
                setNewNumber('')
                showNotification(`Note that the information of ${person.name} added`)
            })
            .catch(error => {
                showErrorMsg(error.response.data.message)
            })
    }

    const update = () => {
        const person = persons.find(person => person.name === newName)
        const changePerson = { ...person, number: newNumber }
        phonebookService
            .update(changePerson.id, changePerson)
            .then(updatedPerson => {
                setPersons(persons.map(person => person.name !== newName ? person : updatedPerson))
                showNotification(`Note that the information of ${updatedPerson.name} updated`)
            })
            .catch(error => {
                showErrorMsg(error.response.data.message)
            })
    }

    const fetchPersons = () =>
        phonebookService
            .getAll()
            .then(initialPhonebook => {
                setPersons(initialPhonebook)
            })
            .catch(error => {
                showErrorMsg(error.response.data.message)
            })

    const deleteById = (person) => {
        phonebookService
            .deleteById(person.id)
            .then(_ => {
                setPersons(persons.filter(p => p.id !== person.id))
                showNotification(`Note that the information of ${person.name} deleted`)
            })
            .catch(_ => {
                showErrorMsg(`${person.name} was already removed from server.`)
                setPersons(persons.filter(p => p.id !== person.id))
            })
    }

    const showNotification = (content) => {
        setNewMsg({ content: `Note that ${content}` })
        setTimeout(_ => setNewMsg(null), 3000)
    }
    const showErrorMsg = (content) => {
        setNewMsg({ isError: true, content: `${content}` })
        setTimeout(_ => setNewMsg(null), 3000)
    }

    // useEffect function must return a cleanup function or nothing
    useEffect(() => { fetchPersons() }, []);
    return (
        <div className='phonebook'>
            <h1>Phonebook</h1>
            <Notification message={message} />
            <Filter filter={newFilter} onChange={(event) => { setNewFilter(event.target.value) }} />
            <h2>Add a new</h2>
            <PersonForm submit={submit} name={newName} number={newNumber} onNameChange={(event) => { setNewName(event.target.value) }} onNumberChange={(event) => { setNewNumber(event.target.value) }} />
            <NumbersTable filter={newFilter} persons={persons} deleteById={deleteById} />
            <Footer />
        </div>
    )
}

export default App