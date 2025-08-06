import Course from './Course'
const App = () => {

  const kurssit = [
    {
      nimi: 'Half Stack application development',
      id: 1,
      osat: [
        { nimi: 'Fundamentals of React', harjoitukset: 10, id: 1 },
        { nimi: 'Using props to pass data', harjoitukset: 7, id: 2 },
        { nimi: 'State of a component', harjoitukset: 14, id: 3 },
        { nimi: 'Redux', harjoitukset: 11, id: 4}
      ]
    },

    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        { nimi: 'Routing', harjoitukset: 3, id: 1 },
        { nimi: 'Middlewares', harjoitukset: 7, id: 2 }
      ]
    }
  ]

  return (
    <div>
      {kurssit.map(kurssi => (
        <Course key={kurssi.id} kurssi={kurssi} />
      ))}
    </div>
  )
}

export default App /// ÄLÄ POISTA
