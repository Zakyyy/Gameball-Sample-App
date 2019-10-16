import React, { Component } from 'react';
import Modal from "react-native-modal";
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Image, Icon } from 'react-native-elements';

const { height } = Dimensions.get('screen');
class InAppNotification extends Component {
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        // style={this.props.full ? styles.modalFullStyle : styles.modalSmallStyle}
      >
        <View style={this.props.full ? styles.viewFullStyle : styles.viewSmallStyle}>
          <View style={{ position: 'absolute', right: 0, top: 0, marginRight: 14, marginTop: 14 }}>
            <Icon
              name='times'
              type="font-awesome"
              color='#c7c7c7'
              onPress={this.props.onCloseFunction}
            />
          </View>
          <Image
            source={{ uri: this.props.image }}
            style={{ borderRadius: 10, width: 140, height: 140 }}
          />
          <Text style={{ paddingTop: 12, paddingLeft: 20, fontSize: 20, fontWeight: 'bold' }}>
            {this.props.notificationTitle}
          </Text>
          <Text style={{ paddingLeft: 30, paddingTop: 8, paddingRight: 30, textAlign: 'center' }} >
            {this.props.notificationText}
          </Text>
        </View>
      </Modal >

    )
  }
}

const styles = StyleSheet.create({
  modalFullStyle: {
    flex: 1,

  },
  modalSmallStyle: {
    marginLeft: 30,
    marginRight: 30
  },
  viewFullStyle: {
    flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10
  },
  viewSmallStyle: {
    height: height / 2,
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10
  }
})

export default InAppNotification;