import React from 'react'

const Content = ({ parts }) =>
    <>
        {parts.map(part => <Part key={part.name} part={part} />)}
    </>

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

export default Content