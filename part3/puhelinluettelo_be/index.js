require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/persons')
const path = require('path')

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.get('/api/persons/:id', async (request, response) => {
  try {
    const person = await Person.findById(request.params.id)
    if (person) return response.json(person)
    response.status(404).end()
  } catch {
    response.status(400).json({ error: 'malformatted id' })
  }
})

app.get('/api/persons', async (_request, response) => {
  try {
    const persons = await Person.find({})
    response.json(persons)
  } catch {
    response.status(500).json({ error: 'server error' })
  }
})

app.get('/info', async (_request, response) => {
  const length = await Person.countDocuments({})
  const date = new Date()
  response.send(
    `<p>Phonebook has info for ${length} people</p>
    <p>${date}</p>`
  )
})

app.delete('/api/persons/:id', async (request, response) => {
  try {
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch {
    response.status(400).json()
  }
})

app.post('/api/persons', async (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }
  const exists = await Person.findOne({ name: body.name })
  if (exists) {
    return response.status(400).json({ error: 'name must be unique' })
  }
  const created = await Person.create({ name: body.name, number: body.number })
  response.status(201).json(created)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
