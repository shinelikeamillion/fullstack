import React from 'react'
import { useDispatch } from 'react-redux'
import { useFild } from '../hooks/hooks'
import { create } from '../reducers/blogReducer'

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
    <table>
      <tbody>
        <tr>
          <td>title: </td>
          <td><input {...title}/>
          </td>
        </tr>
        <tr>
          <td>author: </td>
          <td><input {...author}/>
          </td>
        </tr>
        <tr>
          <td>url: </td>
          <td><input {...url}/>
          </td>
        </tr>
      </tbody>
    </table>
    <button id="create" type="submit">create</button>
  </form >
}

export default Create