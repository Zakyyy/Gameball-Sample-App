import React, { Component } from 'react';
import axios from 'axios';


class GameballSdk extends Component {
  baseUrl = 'https://gb-api.azurewebsites.net/api/v1.0/Integrations';
  constructor(props) {
    super(props);
  }

  addReferral(data, headers) {
    return this.makeRequest(this.baseUrl + '/Referral', 'POST', headers, data);

  }
  sendEvent(data, headers) {
    return this.makeRequest(this.baseUrl + '/Action', 'POST', headers, data);

  }
  registerUser(data, headers) {
    return this.makeRequest(this.baseUrl + '/InitializePlayer', 'POST', headers, data);
  }

  makeRequest(url, method, headers, data) {
    var config = {
      headers: {
        APIKey: headers,
      }
    };
    return axios.post(url, data, config).then(res => console.log(res)).catch(err => console.log(err.response))
  };
}

export default GameballSdk;