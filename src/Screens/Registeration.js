import React, { Component } from 'react';
import { Text, View, TextInput, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Registeration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
      apiKey: '8fdfd2dffd-9mnvhu25d6c3d',
      playerId: ''
    };
    // this.api = new GameballWidget();
  }

  async addReferral() {
    let { playerId, apiKey, displayName, email, gender, mobileNumber, dateOfBirth } = this.state;
    let code = this.props.navigation.getParam('gbreferral');
    this.api.sdk.addReferral({
      "playerCode": code,
      "playerUniqueId": playerId,
      "deviceToken": await AsyncStorage.getItem('push_token'),
      "osType": Platform.OS === 'ios' ? 'ios' : 'android',
      "playerAttributes": {
        "displayName": displayName,
        "email": email,
        "gender": gender,
        "mobileNumber": mobileNumber,
        "dateOfBirth": dateOfBirth,
        "joinDate": new Date(),
      }
    }, apiKey)
    this.props.navigation.navigate('App')
      ;
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20 }}>Set the Client Data</Text>
        <View style={{ flex: 1, flexDirection: 'column', padding: 20, paddingTop: 5 }}>
          <Text>ApiKey</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ apiKey: text })}
            value={this.state.apiKey}
            placeholder="apiKey"
            placeholderTextColor="grey"
          />

          {/* <Text>PlayerId</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ playerId: text })}
            value={this.state.playerId}
            placeholder="playerId"
            placeholderTextColor="grey"
          /> */}

          <Text>Lang</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ lang: text })}
            value={this.state.lang}
            placeholder="lang"
            placeholderTextColor="grey"
          />

          
          {!this.state.show && <Button
            title="Done"

            onPress={() => this.addReferral()}
          />}
        </View>
      </View>
    )
  }
}

export default Registeration;