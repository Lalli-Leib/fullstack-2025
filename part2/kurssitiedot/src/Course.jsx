const Course = ({kurssi}) => {
  console.log('kurssi komponentti:', kurssi)
  return (
    <div>
      <Header nimi={kurssi.nimi} />
      <Content osat={kurssi.osat} />
      <Summary osat={kurssi.osat} />
    </div>
  )
}

const Header = ({nimi}) => {
  console.log('Header:', nimi)
  return <h2>{nimi}</h2>
}

const Content = ({osat}) => {
  console.log('Content osat:', osat)
  return osat.map(osa => (
    <Osa key={osa.id} nimi={osa.nimi} harjoitukset={osa.harjoitukset} />
  ))
}

const Osa = ({nimi, harjoitukset}) => (
  <p>{nimi} {harjoitukset}</p>
)

const Summary = ({osat}) => {
  const total = osat.reduce((sum, osa) => sum + osa.harjoitukset, 0)
  console.log(`${osat.map(o => o.harjoitukset).join(',')} = ${total}`)
  return <p>Yhteensä on {total} harjoitusta</p>
}

export default Course