import React from 'react';
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

const configure = () => {
  // IOS - Remote Messaging
  console.log("Token")
    const messaging = firebase.messaging();
    messaging.hasPermission()
      .then(enabled => {
        if (enabled) {
          messaging.getToken()
            .then(token => {
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
  

  PushNotification.configure({
    // onRegister: function (token) {
    //   console.log('TOKEN:', token);
    // },

    // onNotification: function (notification) {
    //   console.log("NOTIFICATION:", notification);
    //   PushNotification.localNotification({
    //     message: notification.data.message
    //   })

      //  notification.finish(PushNotification.FetchResult.NoData);
    // },
    senderID: "594847270356",
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
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