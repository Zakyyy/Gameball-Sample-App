const INITIAL_STATE = {
  playerId: '',
  apiKey: '',
  lang: 'eng'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'add_player_id':
      return { ...state, playerId: action.payload }
    case 'get_client_data':
      return{...state, playerId: action.payload.playerId, apiKey: action.payload.apiKey, lang: action.payload.lang }
    default:
      return state;
  }
}