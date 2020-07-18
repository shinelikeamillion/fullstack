import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(states => states.notification)
  if (!notification) return null
  const notificationStyle = {
    color: notification.isError ? 'orangered' : 'green',
    background: 'lightblue',
    fontStyle: 'italic',
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
  return <div id="notification" style={notificationStyle}>{notification.message}</div>
}

export default Notification