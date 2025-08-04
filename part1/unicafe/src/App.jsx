import { useState } from 'react'

const Header1 = ({ otsikko1 }) => {
  return <h1>{otsikko1}</h1>
}

const Header2 = ({ otsikko2 }) => {
  return <h2>{otsikko2}</h2>
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad) }</p>
      <p>positive {(good/(neutral + bad + good)*100).toFixed(1)}%</p>
    </div>
  )
}

const App = () => {
  const otsikko = 'give feedback'
  const otsikko2 = 'statistics'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header1 otsikko1={otsikko} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header2 otsikko2={otsikko2} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App ///ÄLÄ POISTA
