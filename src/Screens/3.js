import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GameballSdk, InAppNotification } from 'react-native-gameball';
import { logout } from '../actions/AuthActions';
import { connect } from 'react-redux';
class ThirdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventJson: '{"ziko":{}}'
    }
  }
  async sendEventPressFunction() {
    GameballSdk.sendEvent({
      "limited": {}
    }).then(res => {
      console.log(res)
    }).catch(err => alert(err.response))
  }
  logout() {
    this.props.logout(this.props.navigation);
  }
  async sendEventJson() {
    let newStr = (this.state.eventJson).replace(/”/g, '"');
    newStr = newStr.replace(/“/g, '"');
    let json = JSON.parse(newStr)
    console.log(json)
    GameballSdk.sendEvent(
      json
    ).then(res => console.log(res)).catch(err => console.log(err.response))
  }
  async sendEvent3PressFunction() {
    GameballSdk.sendEvent({
      "case3": {}
    }).then(res => {
      console.log(res)
    }).catch(err => alert(err.response))
  }
  async sendEvent2PressFunction() {
    GameballSdk.sendEvent({
      "case2": {}
    }).then(res => {
      console.log(res)
    }).catch(err => alert(err.response))
  }
  async sendEventRPressFunction() {
    GameballSdk.sendEvent({
      "review": {}
    }).then(res => {
      console.log(res)
    }).catch(err => alert(err.response))
  }
  render() {
    return (
      <View style={{ flex: 1, padding: 20, paddingTop: 50 }}>
        <Text style={{ fontSize: 18 }}> Sending Event</Text>
        <View style={{ paddingTop: 20, justifyContent: 'space-between', }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'black' }}
            onChangeText={text => this.setState({ eventJson: text })}
            value={this.state.eventJson}
            placeholderTextColor="grey"
            autoCorrect={false}
            keyboardType={"default"}
          />
          <Button
            title={"Send Event Json"}
            onPress={() => this.sendEventJson()}
          />
          <Button
            title={"Send Event Case3"}
            onPress={() => this.sendEvent3PressFunction()}
          />
          <Button
            title={"Send Event Case2"}
            onPress={() => this.sendEvent2PressFunction()}
          />
          <Button
            title={"Send Event Review"}
            onPress={() => this.sendEventRPressFunction()}
          />
          <Button
            title={"Send Event Limited"}
            onPress={() => this.sendEventPressFunction()}
          />


          <Button
            title={"log out"}
            onPress={() => this.logout()}
          />
        </View>

      </View>
    )
  }
}

export default connect(null, { logout })(ThirdScreen);