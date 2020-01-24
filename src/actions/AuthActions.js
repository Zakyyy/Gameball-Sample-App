import AsyncStorage from "@react-native-community/async-storage"
import { GameballWidget } from "../../GbReactLibrary";

export const add_player_id = (navigation) => async dispatch => {
  console.log("fetchingData")
  let playerId = await AsyncStorage.getItem('gameball_player_id');
  if (playerId) {
    console.log("feh player Id", playerId)
    dispatch({
      type: 'add_player_id',
      payload: playerId
    })
    navigation.navigate('App')
  }
}

export const getClientData = () => async dispatch => {
  let playerId = await AsyncStorage.getItem('gameball_player_id');
  let apiKey = await AsyncStorage.getItem('gameball_apikey');
  let lang = await AsyncStorage.getItem('gameball_lang');
  if (playerId && apiKey && lang) {
    dispatch({
      type: 'get_client_data',
      payload: {
        playerId,
        apiKey,
        lang
      }
    })
  }
}

export const logout = (navigation) => async dispatch => {
  await AsyncStorage.removeItem('gameball_apikey');
  await AsyncStorage.removeItem('gameball_lang');
  await AsyncStorage.removeItem('gameball_player_id');


  navigation.navigate('SetClient');
}

export const addClientData = (apiKey, lang, navigation) => async dispatch => {
  await AsyncStorage.setItem('gameball_apikey', apiKey)
  await AsyncStorage.setItem('gameball_lang', lang)
  GameballWidget.init(apiKey, lang)

  navigation.navigate('Loading');
}
