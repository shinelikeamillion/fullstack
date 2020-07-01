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
    <Part part={parts[0].name} exercises={parts[0].exercises} />
    <Part part={parts[1].name} exercises={parts[1].exercises} />
    <Part part={parts[2].name} exercises={parts[2].exercises} />
  </div>)
}
const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);
const Total = (props) => {
  let total = 0;
  props.parts.forEach(part => {
    total += part.exercises
  })
  return (<p>Number of exercises {total}</p>)
};

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    }, {
      name: 'Using props to pass data',
      exercises: 7
    }, {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Head course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
