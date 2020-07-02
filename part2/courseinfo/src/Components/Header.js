import React from 'react'

const Header = ({ course }) => course.parts ? <h2>{course.name}</h2> : <h1>{course}</h1>

export default Header;