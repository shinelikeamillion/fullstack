import React from 'react'

const Notification = ({ message }) => {
  if (!message) return null
  const notificationStyle = {
    color: message.isError ? 'orangered' : 'green',
    background: 'lightblue',
    fontStyle: 'italic',
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
  return <div id="notification" style={notificationStyle}>{message.message}</div>
}

export default Notification