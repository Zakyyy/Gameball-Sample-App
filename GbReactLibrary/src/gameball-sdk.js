import React, { Component } from 'react';



class GameballSdk extends Component {
    baseUrl = 'https://gb-api.azurewebsites.net/api/v1.0/Integrations';
    constructor(props) {
        super(props);
      }

      addReferral(data,headers){
        return this.makeRequest(this.baseUrl + '/Referral', 'POST', headers, data);

      }
      sendEvent(data,headers){
        return this.makeRequest(this.baseUrl + '/Events', 'POST', headers, data);

      }
      registerUser(data,headers){
        return this.makeRequest(this.baseUrl + '/InitializePlayer', 'POST', headers, data);

      }

      makeRequest(url, method, headers, data) {
        var obj = {
          method: method,
          headers: headers,
          body: JSON.stringify(data)
        }
        return fetch(url, obj);
      };
}

export default GameballSdk;