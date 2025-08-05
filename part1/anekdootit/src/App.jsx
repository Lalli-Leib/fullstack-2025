import { useState } from 'react'

const Header1 = ({ otsikko1 }) => {
  return <h1>{otsikko1}</h1>
}

const Header2 = ({ otsikko2 }) => {
  return <h2>{otsikko2}</h2>
}

const App = () => {

  const otsikko1 = 'Anecdote of the day'
  const otsikko2 = 'Anecdote with most votes'
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
    
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const maxVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVotes)
   
  const handleRand = () => {
    const rnd = Math.floor(Math.random() * anecdotes.length)
    setSelected(rnd)
  }

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Header1 otsikko1={otsikko1} />
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <button onClick={handleRand}>next anecdote</button>
      <button onClick={addVote}>vote</button>
      <Header2 otsikko2={otsikko2} />
      {anecdotes[maxIndex]}
    </div>
  )
}

export default App
