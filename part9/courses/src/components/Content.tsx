import React from "react";
import { CoursePart, assertNever } from '../types'
import Part from '../components/Part'


const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) =>
  <>
    {
      courseParts.map(course => {
        switch (course.name) {
          case 'Fundamentals':
            return <Part.PartOne course={course} />
          case 'Using props to pass data':
            return <Part.PartTwo course={course} />
          case 'Deeper type usage':
            return <Part.PartThree course={course} />
          case 'Fun time':
            return <Part.PartFour course={course} />
          default:
            return assertNever(course)
        }
      })
    }
  </>

export default Content
