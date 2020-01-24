import axios from 'axios';
import GameballWidget from './gameball-widget';
const baseUrl = 'https://api.gameball.co/api/v1.0/Integrations';
var playerId = ''


const addReferral = (data) => {
  playerId = data.playerUniqueId;
  GameballWidget.initialize_player(playerId);
  return makeRequest(baseUrl + '/Referral', data);
}

async function sendEvent(data) {

  const sendEventJson = {
    "events": data,
    "playerUniqueId": playerId,
    "sessionInfo": {
      "platform": 4
    }
  }
  return makeRequest(baseUrl + '/Action', sendEventJson);

}
async function registerUser(data) {
  playerId = data.playerUniqueId;
  GameballWidget.initialize_player(playerId);
  return makeRequest(baseUrl + '/InitializePlayer', data);
}

async function makeRequest(url, data) {
  let apiKey = GameballWidget.getApiKey()
  var config = {
    headers: {
      APIKey: apiKey,
    }
  };
  return axios.post(url, data, config);
};
const getReferralCode = (url) => {
  let index = url.indexOf("=");
  index = index + 1;
  return (url.substring(index))
}
export {
  registerUser,
  addReferral,
  sendEvent,
  getReferralCode
}
