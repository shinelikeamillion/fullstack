import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Toast } from 'react-bootstrap'
import { clear } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(states => states.notification)
  const notificationStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
  }

  const dispatch = useDispatch()

  return <Toast id="notification"
    show={notification !== null}
    onClose={() => {dispatch(clear())}}
    style={notificationStyle}>
    <Toast.Header>
      <strong className="mr-auto">Notification</strong>
      <small>just now</small>
    </Toast.Header>
    <Toast.Body style={{ color: (notification && notification.isError ? 'green' : 'orange') }}>
      {notification && notification.message}
    </Toast.Body>
  </Toast>
}

export default Notification