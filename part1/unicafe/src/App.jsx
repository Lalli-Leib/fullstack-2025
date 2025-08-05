import { useState } from 'react'

const Header1 = ({ otsikko1 }) => {
  return <h1>{otsikko1}</h1>
}

const Header2 = ({ otsikko2 }) => {
  return <h2>{otsikko2}</h2>
}

const Button = ({ handleClick, teksti }) => {
  console.log(props)
  return <button onClick={handleClick}>{teksti}</button>
}

const StatisticLine = ({ teksti, arvo }) => {
  return (
    <tr>
      <td>{teksti}</td>
      <td>{arvo}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine teksti="good" arvo={good} />
        <StatisticLine teksti="neutral" arvo={neutral} />
        <StatisticLine teksti="bad" arvo={bad} />
        <StatisticLine teksti="all" arvo={good + neutral + bad} />
        <StatisticLine teksti="average" arvo={(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)} />
        <StatisticLine teksti="positive" arvo={(good / (neutral + bad + good) * 100).toFixed(1) + '%'} />
      </tbody>
    </table>
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
      <Button handleClick={() => setGood(good + 1)} teksti="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} teksti="neutral" />
      <Button handleClick={() => setBad(bad + 1)} teksti="bad" />
      <Header2 otsikko2={otsikko2} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App ///ÄLÄ POISTA
