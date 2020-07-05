const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

/* more info about morgan
https://github.com/expressjs/morgan
*/
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan')
    const { token } = require('morgan')
    // app.use(morgan('tiny'))
    morgan.token('body', (req, res) => JSON.stringify(req.body))
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
}
let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "rw",
        "number": "23",
        "id": 4
    },
    {
        "name": "rw4",
        "number": "23",
        "id": 5
    }
]

const personsInfo = `
<p>Phonebook has info for ${persons.length} people</p>
<p>${Date()}</p>
`

app.get('/api/persons', (_, res) => res.json(persons))

app.get('/api/persons/info', (_, res) => res.send(personsInfo))

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        return res.send(person)
    }
    res.status(404).json({ "error": "recourse not found" })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(n => n.id === id)
    if (person) {
        persons = persons.filter(p => p.id !== id)
        res.status(204).end()
    } else {
        res.status(404).json({ 'error': 'person not found' })
    }
})

const generateId = () => {
    // auto increase
    // const maxId = persons.length > 0
    //     ? Math.max(persons.map(p => p.id))
    //     : 0
    return Math.floor(Math.random() * 100_000)
}

app.post('/api/persons', (req, res) => {
    console.log(req.body)
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(404).json({ 'error': `${!body.name ? 'name' : 'number'} is missing` })
    }
    let person = persons.find(p => p.name === body.name)
    if (person) {
        return res.status(404).json({ 'error': 'name must be unique' })
    }
    person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    res.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port${PORT}`)
})



