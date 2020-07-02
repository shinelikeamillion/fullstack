import React from 'react'
import Content from './components/004_Content';

const Head = ({ name }) => <h1>{name}</h1>
const Total = ({ parts }) =>
    <h4>
        Number of exercises {parts.map(part => part.exercises).reduce((p, c) => p + c)}
    </h4>
const App = ({ course }) => (
    <div>
        <Head name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default App