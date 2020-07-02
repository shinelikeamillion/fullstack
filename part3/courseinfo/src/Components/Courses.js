import React from 'react';
import Course from './Course';
import Header from './Header';

const Courses = ({ courses }) => (
    <div>
        <Header course='Web development curriculum' />
        {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
)

export default Courses;