import React from "react";
import { CoursePart } from '../types'

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) =>
  <>
    {courseParts.map(course => <p key={course.name}>{course.name} {course.exerciseCount}</p>)}
  </>

export default Content
