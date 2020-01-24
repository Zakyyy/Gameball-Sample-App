

export const renderNotification = (notification) => dispatch => {
  dispatch({
    type: 'notification',
    payload: notification.type,
    notification: notification
  })
}

export const closeNotification = () => dispatch => {
  dispatch({
    type: 'close_notification'
  })
}