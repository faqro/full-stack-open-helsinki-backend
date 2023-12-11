require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

const morgan = require('morgan')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())

morgan.token('data', (request, response) => (
    request.method === 'POST' || true
        ? JSON.stringify(request.body)
        : null
))

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const date = new Date()
        response.send(`Phonebook has info for ${persons.length} people<br/>${date}`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => {
            response.status(404).end()
        })
})

app.delete('/api/persons/:id', (request, response) => { //mongo refactor
    Person
        .findByIdAndDelete(request.params.id)
        .then(delconf => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(404).end()
        })
})

app.put('/api/persons/:id', (request, response) => { //mongo refactor
    const body = request.body
    
    const updatedPerson = {
        name: body.name,
        number: body.number,
    }

    Person
        .findByIdAndUpdate(request.params.id, updatedPerson)
        .then(person => {
            response.json({...updatedPerson, id: person._id.toString()})
        })
        .catch(error => {
            response.status(404).end()
        })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!(body.name && body.number)) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        JSON.stringify(response.object(person))
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})