import React, { Component } from 'react';
import { InAppNotification } from 'react-native-gameball';
import { connect } from 'react-redux'
import { Button, View, Platform, Text } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { renderNotification, closeNotification } from './actions/NotificationActions'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import Modal from "react-native-modal";

class NotificationComponent extends Component {
  constructor(props) {
    super(props);
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
        if (Platform.OS === 'android') {
          AsyncStorage.setItem('push_token', token.token)
        }
      },
      onNotification: (notification) => {
        console.log(notification)
        if (Platform.OS === 'android') {
          if (notification.isGB) {
            this.props.renderNotification(notification)
          }
        }
        else {
          if (notification.data.isGB) {
            this.props.renderNotification(notification.data)
          }
        }

        if (notification.foreground === 'false') {
          if (notification.message) {
            PushNotification.localNotification({
              vibrate: true,
              vibration: 300,
              title: notification.title,
              message: notification.message,
              playSound: true,
            })
          }
          else {
            PushNotification.localNotification({
              vibrate: true,
              vibration: 300,
              title: notification.data.title,
              message: notification.data.body,
              playSound: true,
            })
          }

        }

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
  }

  closeNotification() {
    this.props.closeNotification()
  }


  render() {
    return (
      // <View style={{ flex: 1 }}>
      <InAppNotification
        isVisible={this.props.show}
        notification={this.props.notification}
        onCloseFunction={this.closeNotification.bind(this)}
      />
      //   {this.props.children}
      // </View>
    )
  }
}
const mapStateToProps = ({ notification }) => {
  return {
    show: notification.show,
    type: notification.type,
    notification: notification.notification
  }
}
export default connect(mapStateToProps, { renderNotification, closeNotification })(NotificationComponent);