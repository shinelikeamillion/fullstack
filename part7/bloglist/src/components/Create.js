import React from 'react'
import { useDispatch } from 'react-redux'
import { useFild } from '../hooks/hooks'
import { create } from '../reducers/blogReducer'
import { Button, InputGroup, FormControl } from 'react-bootstrap'

const Create = ({ toggleForm }) => {
  const dispatch = useDispatch()
  const title = useFild('title')
  const author = useFild('author')
  const url = useFild('url')

  const createOne = (event) => {
    event.preventDefault()
    toggleForm()

    dispatch(create({ title: title.value, author: author.value, url: url.value }))
  }

  return < form onSubmit={createOne} >
    <InputGroup className='mb-3'>
      <FormControl
        placeholder="Title"
        {...title}
      />
    </InputGroup>
    <InputGroup className='mb-3'>
      <FormControl
        placeholder="Author"
        {...author}
      />
    </InputGroup>
    <InputGroup className='mb-3'>
      <FormControl
        placeholder="URL"
        {...url}
      />
    </InputGroup>
    <Button id="create" type="submit">create</Button>
  </form >
}

export default Create