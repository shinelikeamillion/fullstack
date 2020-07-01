import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Head = (props) => (
  <h1>{props.course}</h1>
);
const Content = (props) => {
  const parts = props.parts
  // foreach ??
  return (<div>
    <Part part={parts[0].part} exercises={parts[0].exercises} />
    <Part part={parts[1].part} exercises={parts[1].exercises} />
    <Part part={parts[2].part} exercises={parts[2].exercises} />
  </div>)
}
const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);
const Total = (props) => (
  <p>Number of exercises {props.total}</p>
);

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Head course={course} />
      <Content parts={
        [
          { part: part1, exercises: exercises1 },
          { part: part2, exercises: exercises2 },
          { part: part3, exercises: exercises3 }
        ]
      } />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
