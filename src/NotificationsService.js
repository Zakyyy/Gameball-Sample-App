import React from 'react';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { renderNotification } from './actions/NotificationActions'

const configure = () => {
  if (Platform.OS === 'ios') {
    const messaging = firebase.messaging();
    messaging.hasPermission()
      .then(enabled => {
        if (enabled) {
          messaging.getToken()
            .then(token => {
              console.log(token)
              AsyncStorage.setItem('push_token', token);
            })
            .catch(error => console.log(error))
        } else {
          messaging.requestPermission()
            .then(respone => console.log(respone))
            .catch(error => { return })
        }
      })
      .catch(error => console.log(error))
  }




  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
      AsyncStorage.setItem('push_token', token.token)
    },
    onNotification: (notification) => {
      if (notification.isGB) {
        if (notification.type === 'Small Toast') {
          renderNotification("Small Toast")
        }
        renderNotification("Full Screen")
      }
      return;
    },
    //     //  notification.finish(PushNotification.FetchResult.NoData);
    //   // },
    senderID: "594847270356",
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: false,
    requestPermissions: true,
  });
};

const localNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    bigText: "My big text that will be shown when notification is expanded",
    subText: "This is a subText",
    color: "green",
    vibrate: true,
    vibration: 300,
    title: "Notification Title",
    message: "Notification Message",
    playSound: true,
    soundName: 'default',
    actions: '["Accept", "Reject"]',
  });
};

export {
  configure,
  localNotification,
};

// Notification object 
// { foreground: true,
//   finish: [Function: finish],
//   priority: 'high',
//   userInteraction: false,
//   id: '337321782',
//   body: 'Player salma achieved challenge Review !\n\nRank Points:  2570 \nWallet:  1604 ',
//   icon: 'https://s3.us-east-2.amazonaws.com/elasticbeanstalk-us-east-2-652131910202/uploads/default_icon.png',
//   isGB: 'true',
//   type: 'Small Toast',
//   title: 'Congratulations!',
//   message: 'Player salma achieved challenge Review !\n\nRank Points:  2570 \nWallet:  1604 ',
//   content_available: 'true' }