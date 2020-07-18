import { useState } from 'react'

export const useFild = (id) => {
  const [value, setValue] = useState('')

  const onChange = (event) => setValue(event.target.value)

  return { id, value, onChange }
}