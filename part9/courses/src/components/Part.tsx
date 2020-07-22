import React from "react";
import { CoursePartOne, CoursePartTwo, CoursePartThree, CoursePartFour } from '../types'

const PartOne: React.FC<{ course: CoursePartOne }> = ({ course }) =>
  <p key={course.name}>
    {course.name} {course.exerciseCount} {course.description}
  </p>;

const PartTwo: React.FC<{ course: CoursePartTwo }> = ({ course }) =>
  <p key={course.name}>
    {course.name} {course.exerciseCount} {course.groupProjectCount}
  </p>;

const PartThree: React.FC<{ course: CoursePartThree }> = ({ course }) =>
  <p key={course.name}>
    {course.name} {course.exerciseCount} {course.description} {course.exerciseSubmissionLink}
  </p>;

const PartFour: React.FC<{ course: CoursePartFour }> = ({ course }) =>
  <p key={course.name}>
    {course.name} {course.exerciseCount} {course.description} {course.gameTime}
  </p>;

export default { PartOne, PartTwo, PartThree, PartFour }
