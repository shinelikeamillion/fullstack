import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM, waitForDomChange, waitFor } from '@testing-library/dom'
import { Blog } from './Blog'
import axios from 'axios'

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
      <Blog blog={blog}
        showMessage={mockHandler}
        updateBlog={mockHandler}
        deleteBlog={mockHandler}/>
    )
  })

  test('should render content', () => {

    expect(component.container).toHaveTextContent( blog.url)
    expect(component.container).toHaveTextContent( blog.author)
    expect(component.container).toHaveTextContent( blog.url)
    expect(component.container).toHaveTextContent( blog.likes)

    // component.debug()
    const li =component.container.querySelector('li')
    console.log(prettyDOM(li))
    expect(component.getByText(`${blog.title}`)).toBeDefined()

    expect(component.container.querySelector('.blog')).toHaveTextContent(`${blog.title} -- ${blog.author}`)
  })

  test('should blog componnet have right initial state', () => {
    const detailContent = component.container.querySelector('.toggleContent')
    const showDetailBtn = component.container.querySelector('.toggleButton')
    expect(detailContent).toHaveStyle('display: none')
    expect(showDetailBtn).not.toHaveStyle('display: none')
  })

  test('should show detail trigger show detail events', () => {
    const toggleButtonComponent = component.container.querySelector('.toggleButton')
    const showDetailBtn = toggleButtonComponent.querySelector('button')
    const detailContent = component.container.querySelector('.toggleContent')
    fireEvent.click(showDetailBtn)
    expect(detailContent).not.toHaveStyle('display: none')
    expect(toggleButtonComponent).toHaveStyle('display: none')

    expect(component.container.querySelector('.title')).toHaveTextContent(`title: ${blog.title}`)
    expect(component.container.querySelector('.author')).toHaveTextContent(`author: ${blog.author}`)
    expect(component.container.querySelector('.url')).toHaveTextContent(`url: ${blog.url}`)
    expect(component.container.querySelector('.likes')).toHaveTextContent(`likes: ${blog.likes}`)
  })

  test('should hide detail trigger hide detail events', () => {
    const toggleButtonComponent = component.container.querySelector('.toggleButton')
    const showDetailBtn = toggleButtonComponent.querySelector('button')
    const hideBtn = component.getByText('cancel')
    const detailContent = component.container.querySelector('.toggleContent')
    fireEvent.click(showDetailBtn)
    fireEvent.click(hideBtn)
    expect(detailContent).toHaveStyle('display: none')
    expect(showDetailBtn).not.toHaveStyle('display: none')
  })

  test('should updateBlog function be called twice, if the like button was cliked twice', async () => {

    axios.put.mockResolvedValue({ data: { ...blog, likes:blog.likes+1 } })
    const likeBtn = component.container.querySelector('#likeBtn')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)
    await waitFor(() => expect(mockHandler.mock.calls).toHaveLength(4))
    expect(mockHandler.mock.calls[0][0].likes).toBe(blog.likes+1)
    expect(mockHandler.mock.calls[2][0].likes).toBe(blog.likes+1)
  })
})