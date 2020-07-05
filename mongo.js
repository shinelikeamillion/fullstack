const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const dbname = 'db_personbook'
const uri =
    `mongodb+srv://user0:${password}@cluster0.64vrt.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person.find({}).then(
        persons => {
            console.log('phonebook: ')
            persons.map(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        }
    )
} else if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({ name, number })
    person.save().then(
        _ => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        }
    )
}


const initPersons = _ => {

    const persons = [
        {
            "name": "Arto Hellas",
            "number": "040-123456",
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
        },
        {
            "name": "rw",
            "number": "23",
        },
        {
            "name": "rw4",
            "number": "23",
        }
    ]
    persons.forEach(p => {
        const person = new Person({ ...p })
        person.save().then(
            _ => {
                console.log('person saved')
                mongoose.connection.close()
            }
        )
    })
}