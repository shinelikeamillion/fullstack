import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { getByText, waitFor, } from '@testing-library/dom'
import Create from '../components/Create'
import axios from 'axios'
import { act } from 'react-dom/test-utils'

jest.mock('axios')

const blog = {
  title: 'title',
  author: 'author',
  url: 'http://www.google.com',
  likes: 1,
}

describe('<Blog/>', () => {
  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Create createBlog={mockHandler} showMessage={mockHandler}/>
    )
  })

  test('should render content', async() => {

    const title =component.container.querySelector('#title')
    const author =component.container.querySelector('#author')
    const url =component.container.querySelector('#url')
    const form =component.container.querySelector('form')

    axios.post.mockResolvedValue({ data: blog })

    fireEvent.change(title, { target: { value: blog.title } })
    fireEvent.change(author, { target: { value: blog.author } })
    fireEvent.change(url, { target: { value: blog.url } })
    fireEvent.submit(form)
    await waitFor(() => expect(mockHandler.mock.calls).toHaveLength(2))

    expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
    expect(mockHandler.mock.calls[1][0].message).toBe(`new blog ${blog.title} by ${blog.author} added`)
  })

})