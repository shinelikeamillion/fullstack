import React from 'react'
import { useField } from '../hooks/index'

export const CreateForm = (props) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: restAuthor, ...author } = useField('text')
  const { reset: restInfo, ...info } = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      infot: info.value,
      votes: 0
    })
  }

  const reset = () => {
    resetContent()
    restAuthor()
    restInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>content</td>
              <td><input {...content} /></td>
            </tr>
            <tr>
              <td>author</td>
              <td><input {...author} /></td>
            </tr>
            <tr>
              <td>url </td>
              <td><input placeholder='for more info' {...info} /></td>
            </tr>
            <tr>
              <td><button type='submit'>create</button></td>
              <td><button type='button' onClick={reset}>reset</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )

}