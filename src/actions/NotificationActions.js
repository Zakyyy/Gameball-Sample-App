

export const renderNotification = (text) => dispatch => {
  console.log("aa")
  dispatch({
    type: 'notification',
    payload: text
  })
}