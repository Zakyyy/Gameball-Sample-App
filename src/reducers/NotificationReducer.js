const INITIAL_STATE = {
  show: false,
  type: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'notification': {
      console.log("ana geet al reducer")
      return {...state, show: true, type: action.payload}

    }
    default:
      return state
  }
}