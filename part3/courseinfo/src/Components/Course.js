import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
    let initValue = 0;
    return <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <h4>
            total of {course.parts.reduce((accumulator, part) => accumulator + part.exercises, initValue)} exercises
        </h4>
    </div>
}
export default Course;