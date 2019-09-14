import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import firebase from 'react-native-firebase';
import CryptoJS from "react-native-crypto-js";
import Moment from 'moment';
import GameballSdk from './gameball-sdk';

var params = 'lang=ar';
var sourceUri = 
  Platform.OS === 'android'
    ? 'file:///android_asset/Web.bundle/site/index.html?${params}'
    : 'Web.bundle/site/index.html';

const injectedJS = `
  if (!window.location.search) {
    var link = document.getElementById('progress-bar');
    link.href = './site/index.html?${params}';
    link.click();
  }
`;
class GameballWidget extends Component {

  baseUrl = 'https://api.gameball.co/api/Integration';
  headers = { contentType: 'application/json', APIKey: '8fdfd2dffd-9mnvhu25d6c3d' };
  salt = '';
  sdk = null;
  constructor(props) {
    super(props);
    this.state = {};
    this.sdk = new GameballSdk();
    setTimeout(() => {
      this.componentDidMount();
    }, 1000)

  }
  sendMsgToWebview(){
    this.webview.sendMessage('mg to js file')
  }
  onWebviewMsg(data){
    alert(JSON.stringify(data));
    var data = JSON.parse(data);
    //this.getbotSettings(data);
  }
  getbotSettings(data){
    this.GetClientBotSettings(data.url, data.data).then((res) => res.json()).then( (jsondata) => {
      //alert(JSON.stringify(jsondata));

      this.wb.postMessage(JSON.stringify(jsondata.response));
    })
    .catch((error) => {
      alert('error');
      alert(JSON.stringify(error));
    });
  }
  componentDidMount() {

    // the listener returns a function you can use to unsubscribe
    this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {
      if (Platform.OS === 'android') {

        const channel = new firebase.notifications.Android.Channel(
          'channelOne',
          'Channel Name',
          firebase.notifications.Android.Importance.Max
        ).setDescription('A natural description of the channel');
        firebase.notifications().android.createChannel(channel);
        alert(notification.notificationId+'-'+notification.title+'-'+notification.subtitle+'-'+notification.body+'-'+notification.data);
        const localNotification = new firebase.notifications.Notification({
            sound: 'default'
          })
          .android.setChannelId("channelOne") // e.g. the id you chose above
          .android.setSmallIcon("@mipmap/ic_launcher") // create this icon in Android Studio
          .android.setPriority(firebase.notifications.Android.Priority.High)
          .android.setBigPicture('https://cuppalabs.github.io/img/cuppa-logo-coffee11.png')
          .setTitle(notification.title)
          .setTitle(notification.body)


        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));

      } else if (Platform.OS === 'ios') {

        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .ios.setBadge(notification.ios.badge);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));

      }
    });

    // ...
  }

  componentWillUnmount() {
    // this is where you unsubscribe
    this.unsubscribeFromNotificationListener();
    this.urlSub();
  }
  render() {
    if(this.props){
      sourceUri = 
  Platform.OS === 'android'
    ? 'file:///android_asset/Web.bundle/site/index.html?lang='+this.props.locale+'&apiKey='+this.props.clientId+'&playerId='+this.props.externalId
    : 'Web.bundle/site/index.html';
    }
    this.urlSub = firebase.links().onLink((url) => {
      var reqObj = {
        "playerCode": this.getAllUrlParams(url).gbreferral,
        "playerUniqueId": this.props.externalId,
        "playerCategoryId": 0,
        "playerInfo": {
          "displayName": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "gender": "string",
          "mobileNumber": "string",
          "dateOfBirth": "2019-09-03T17:44:31.457Z",
          "joinDate": "2019-09-03T17:44:31.457Z",
          "attributes": {
            "additionalProp1": {},
            "additionalProp2": {},
            "additionalProp3": {}
          }
        },
        "sessionInfo": {
          "host": "string",
          "url": "string",
          "referer": "string",
          "platform": 1,
          "geolocation": {
            "latitude": 0,
            "longitude": 0
          }
        },
        "isMessageTrigger": true
      }

      this.sdk.addReferral(reqObj,this.headers).then(res => {
        alert('Added refrrer successfully');
      }, err => {
        alert('error');
      }); 
    });
    firebase.links()
    .getInitialLink()
    .then((url) => {
        if (url) {
          var reqObj = {
            "playerCode": this.getAllUrlParams(url).gbreferral,
            "playerUniqueId": this.props.externalId,
            "playerCategoryId": 0,
            "playerInfo": {
              "displayName": "string",
              "firstName": "string",
              "lastName": "string",
              "email": "string",
              "gender": "string",
              "mobileNumber": "string",
              "dateOfBirth": "2019-09-03T17:44:31.457Z",
              "joinDate": "2019-09-03T17:44:31.457Z",
              "attributes": {
                "additionalProp1": {},
                "additionalProp2": {},
                "additionalProp3": {}
              }
            },
            "sessionInfo": {
              "host": "string",
              "url": "string",
              "referer": "string",
              "platform": 1,
              "geolocation": {
                "latitude": 0,
                "longitude": 0
              }
            },
            "isMessageTrigger": true
          };
          this.sdk.addReferral(reqObj,this.headers).then(res => {
            alert('Added refrrer successfully');
          }, err => {
            alert('error');
          }); 
            //alert(url);
        } else {
        }
    });
    return (
      <View style={{ position: 'absolute', zIndex: 999, backgroundColor:'#000',top: 0, bottom: 0, left: 0, right: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height - 65 }}>
        { this.props.render == true && 
        <WebView
          ref={(component) => { this.wb = component;}}
          source={{ uri: sourceUri }}
          javaScriptEnabled={true}
          originWhitelist={['*']}
          allowFileAccess={true}
          onMessage={event => {
            this.onWebviewMsg(event.nativeEvent.data);
          }}
        />
      }
      </View>
    );
  }

  makeRequest(url, method, headers, data) {
    var obj = {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
    }
    return fetch(url, obj);
  };


  addBodyHash(data, salt) {
    if (data.PlayerUniqueID) {
      data["BodyHashed"] = CryptoJS.AES.encrypt(data.PlayerUniqueID + ':' + Moment(new Date(), 'yy MM dd HH mm ss') + ':' + salt, 'secret key 123').toString();
    }
    return data;
  }
  getAllUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];

      // split our query string into its component parts
      var arr = queryString.split('&');

      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');

        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {

          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];

          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string') {
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }

    return obj;
  }

}

export default GameballWidget;