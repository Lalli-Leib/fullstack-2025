const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return <p>{props.name} {props.exercises}</p>
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.part1.name} exercises={props.part1.exercises} />
      <Part name={props.part2.name} exercises={props.part2.exercises} />
      <Part name={props.part3.name} exercises={props.part3.exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}
    </p>
  )
}

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
       name: 'Fundamentals of React', exercises: 10 
      },
      { 
        name: 'Using props to pass data', exercises: 7 
      },
      { 
        name: 'State of a component', exercises: 14 
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content
        part1={course.parts[0]}
        part2={course.parts[1]}
        part3={course.parts[2]}
      />
      <Total
        part1={course.parts[0]}
        part2={course.parts[1]}
        part3={course.parts[2]}
      />
    </div>
  )
}

export default App ///ÄLÄ POISTA
