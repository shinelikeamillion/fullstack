import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('</Togglable />', () => {
  let component
  let mockHandler
  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Togglable buttonLabel='show'>
        <div className='children'></div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(component.container.querySelector('.children')).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    expect(component.container.querySelector('.toggleContent')).toHaveStyle('display: none')
  })

  test('agter clicking the button, children are not displayed', () => {
    fireEvent.click(component.getByText('show'))
    expect(component.container.querySelector('.toggleContent')).toHaveStyle('display: block')
    expect(component.container.querySelector('.toggleButton')).toHaveStyle('display: none')
  })
})