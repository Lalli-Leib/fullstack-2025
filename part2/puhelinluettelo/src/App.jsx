import { useState } from 'react'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    Filter shown with: <input value={filter} onChange={handleFilterChange} />
  </div>
)

const PersonForm = ({ addPerson, newName, handleName, newNumber, handleNumber }) => (
  <form onSubmit={addPerson}>
    <div>
      Name: <input value={newName} onChange={handleName} />
    </div>
    <div>
      Number: <input value={newNumber} onChange={handleNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({ person }) => (
  <li>{person.name} {person.number}</li>
)

const Persons = ({ persons }) => (
  <ul>
    {persons.map(person => (
      <Person key={person.name} person={person} />
    ))}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('') 

  const handleName = (event) => {
    console.log('Nimikenttään kirjoitettu:', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    console.log('Numerokenttään kirjoitettu:', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('Suodatin:', event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Lomakkeen lähetys. Nimi:', newName, 'Numero:', newNumber)

    const trimmedName = newName.trim()
    if (persons.some(person => person.name === trimmedName)) {
      console.log(`Henkilö ${trimmedName} on jo olemassa`)
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    const nameObject = { 
      name: trimmedName,
      number: newNumber.trim()
    }

    console.log('Lisätään henkilö:', nameObject)
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase())
  )

  return (

    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new person</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>

  )
}

export default App ///ÄLÄ POISTA
