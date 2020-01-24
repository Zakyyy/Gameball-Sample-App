import React, { Component } from 'react';
import Modal from "react-native-modal";
import { View, Text, Dimensions, StyleSheet, Modal as FullModal } from 'react-native';
import { Image, Icon } from 'react-native-elements';
import NotificationPopup from 'react-native-push-notification-popup';
import AsyncStorage from '@react-native-community/async-storage';
const { height } = Dimensions.get('screen');
class InAppNotification extends Component {
  async handleMessage(data) {
    if (data.frequency < 0) {
      return true
    } else {
      let count = await AsyncStorage.getItem("" + data.msgId);
      if (count) {
        if (parseInt(count) > data.frequency) {
          return false;
        } else {
          count = parseInt(count) + 1;
          await AsyncStorage.setItem("" + data.msgId, "" + count)
          return true;
        }
      } else {
        await AsyncStorage.setItem("" + data.msgId, "" + 1);
        return true
      }
    }
  }
  async componentDidUpdate() {
    if (this.props.notification) {
      if (this.props.notification.type === 'Small Toast') {
        if (this.props.notification.isMsg) {
          if (this.props.notification.frequency > 0) {
            if (this.handleMessage(this.props.notification) === true) {
              this.popup.show({
                onPress: function () { console.log('Pressed') },
                appIconSource: this.props.notification.icon,
                timeText: 'Now',
                title: this.props.notification.title,
                body: this.props.notification.body,
                slideOutTime: 5000
              });
            }
          } else {
            this.popup.show({
              onPress: function () { console.log('Pressed') },
              appIconSource: this.props.notification.icon,
              timeText: 'Now',
              title: this.props.notification.title,
              body: this.props.notification.body,
              slideOutTime: 5000
            });
          }
        } else {
          this.popup.show({
            onPress: function () { console.log('Pressed') },
            appIconSource: this.props.notification.icon,
            timeText: 'Now',
            title: this.props.notification.title,
            body: this.props.notification.body,
            slideOutTime: 5000
          });
        }
        // }
      }
    }
  }
  renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', backgroundColor: 'white', borderRadius: 5, marginLeft: 10, marginRight: 10, paddingBottom: 10 }}>
      <Image
        source={{ uri: appIconSource }}
        style={{ borderRadius: 10, width: 50, height: 50 }}
        containerStyle={{ marginLeft: 10 }}
      />
      <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 16 }}>{title}</Text>
        <Text style={{ marginTop: 5, fontSize: 12 }}>{body}</Text>
      </View>
    </View>
  );

  renderPopUp(notification) {
    return (
      <FullModal
        visible={this.props.isVisible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <View style={{ flex: 1, paddingRight: 20, paddingLeft: 20 }}>
          <View style={{ position: 'absolute', right: 0, top: 0, marginRight: 30, marginTop: 30, zIndex: 1 }}>
            <Icon
              name='times'
              type="font-awesome"
              color='#c7c7c7'
              size={40}
              onPress={this.props.onCloseFunction}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: notification.icon }}
              style={{ borderRadius: 10, width: 140, height: 140 }}
            />
            <Text style={{ paddingTop: 12, fontSize: 20, fontWeight: 'bold' }}>
              {notification.title}
            </Text>
            <Text style={{ marginTop: 8, textAlign: 'center' }} >{notification.body}</Text>
          </View>
        </View>
      </FullModal >
    )
  }

  renderSmallToast() {
    return (
      <NotificationPopup
        ref={ref => this.popup = ref}
        renderPopupContent={this.renderCustomPopup.bind(this)}
      />
    )
  }

  renderLargeToast(notification) {
    return (
      <Modal
        isVisible={this.props.isVisible}
      >
        <View style={styles.viewSmallStyle}>
          <View style={{ position: 'absolute', right: 0, top: 0, marginRight: 14, marginTop: 14 }}>
            <Icon
              name='times'
              type="font-awesome"
              color='#c7c7c7'
              onPress={this.props.onCloseFunction}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: notification.icon }}
              style={{ borderRadius: 10, width: 140, height: 140 }}
            />
            <Text style={{ paddingTop: 12, fontSize: 20, fontWeight: 'bold' }}>
              {notification.title}
            </Text>
            <Text style={{ marginTop: 8, textAlign: 'center' }} >{notification.body}</Text>
          </View>
        </View>
      </Modal >
    )
  }
  renderBasedOnType(type, notification) {
    switch (type) {
      case 'Small Toast':
        return this.renderSmallToast();
      case 'Large Toast':
        return this.renderLargeToast(notification);
      case 'Popup':
        return this.renderPopUp(notification);
      default:
        return null;
    }
  }

  renderView(type, notification, isMsg) {
    if (isMsg) {
      if (this.handleMessage(notification)) {
        return this.renderBasedOnType(type, notification)
      } else {
        return null;
      }
    } else {
      return this.renderBasedOnType(type, notification)
    }
  }
  render() {
    let { notification } = this.props;
    let type = '';
    let isMsg = false;
    if (notification) {
      type = notification.type
      if (notification.isMsg) {
        isMsg = true;
      }
    }
    return (
      this.renderView(type, notification, isMsg)
    )
  }
}

const styles = StyleSheet.create({
  viewSmallStyle: {
    height: height / 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingRight: 20,
    paddingLeft: 20
  }
})

export default (InAppNotification);