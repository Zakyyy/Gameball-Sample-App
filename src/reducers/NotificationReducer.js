const INITIAL_STATE = {
  show: false,
  type: '',
  notification: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'notification': {
      return { ...state, show: true, type: action.payload, notification: action.notification }

    }
    case 'close_notification':
      return { ...state, show: false }
    default:
      return state
  }
}