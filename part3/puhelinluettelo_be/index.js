const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
let persons = require('./data/persons')

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
    response.json(person)
    } 
    else {
    response.status(404).end()
    }
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const length = persons.length
  const date = new Date()
  response.send(
    `<p>Phonebook has info for ${length} people</p>
    <p>${date}</p>`
    )
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
        error: 'name or number missing' 
    })
  }

  if (persons.some(p => p.name === body.name)) {
    return response.status(400).json({ 
        error: 'name must be unique' 
    })
  }

  const generateId = () => Math.floor(Math.random() * 1000000)

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.status(201).json(person)
})

app.use((request, response) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})