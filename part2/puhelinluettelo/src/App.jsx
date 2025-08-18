import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Filter = ({ filter, handleFilter }) => (
  <div>
    filter shown with: <input value={filter} onChange={handleFilter} />
  </div>
)

const PersonForm = ({ addPerson, newName, handleName, newNumber, handleNumber }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({ person, handleDelete }) => (
  <li>
    {person.name} {person.number}
    <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
  </li>
)

const Persons = ({ persons, handleDelete }) => (
  <ul>
    {persons.map(person => (
      <Person key={person.id} person={person} handleDelete={handleDelete} />
    ))}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('') 

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('Palvelimelta haettu data:', initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const trimmedName = newName.trim()

    if (persons.some(person => person.name === trimmedName)) {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    const nameObject = { 
      name: trimmedName,
      number: newNumber.trim()
    }

    console.log('Lisätään uusi henkilö palvelimelle:', nameObject)

    personsService
      .create(nameObject)
      .then(returnedPerson => {
        console.log('Palautettu lisäyksen jälkeen:', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .rmv(id)
        .then(() => {
          console.log(`Poistettu ${name} palvelimelta`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App ///ÄLÄ POISTA

///ET OO TEHNY 2.15!!!!!
