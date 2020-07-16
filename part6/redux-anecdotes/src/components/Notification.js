import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'lightBlue',
  }

  const notification = useSelector((state) => state.notify)

  const { message } = notification
  if (notification.type === 'ERROR') style.color = 'orangered'

  return message && (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
