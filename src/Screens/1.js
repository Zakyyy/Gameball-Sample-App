import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { GameballWidget } from '../../GbReactLibrary';
import AsyncStorage from '@react-native-community/async-storage';

class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      show: false,
      displayName: '',
      email: '',
      gender: '',
      mobileNumber: '',
      dateOfBirth: '2019-10-13T20:57:36.761Z',
      apiKey: '8fdfd2dffd-9mnvhu25d6c3d',
      playerId: ''
    };
    this.api = new GameballWidget();
  }

  async registerPlayer() {
    let { playerId, apiKey, displayName, email, gender, mobileNumber, dateOfBirth } = this.state;
    this.api.sdk.registerUser({
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
    }, apiKey);
  }
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text style={{ fontSize: 20 }}>Register Player</Text>
        <View style={{ flex: 1, flexDirection: 'column', padding: 20, paddingTop: 5 }}>
          <Text>Required Info.</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ apiKey: text })}
            value={this.state.apiKey}
            placeholder="apiKey"
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ playerId: text })}
            value={this.state.playerId}
            placeholder="playerId"
          />
          <Text>Optional</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ displayName: text })}
            value={this.state.displayName}
            placeholder="display name"
          />

          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            placeholder="email"
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ gender: text })}
            value={this.state.gender}
            placeholder="gender"
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ mobileNumber: text })}
            value={this.state.mobileNumber}
            placeholder="mobile number"
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ dateOfBirth: text })}
            value={this.state.dateOfBirth}
            placeholder="birthdate"
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ language: text })}
            value={this.state.language}
            placeholder="language"
          />
          {!this.state.show && <Button
            title="Register Player"
            onPress={() => this.registerPlayer()}
          />}
        </View>
        {!this.state.show &&
          <Button
            title="Launch Widget"
            onPress={() => this.setState({ show: !this.state.show })}
          />}
        <Button
          title="Launch in Separate Screen"
          onPress={() => {
            this.props.navigation.navigate('FourthScreen', {
              apiKey: this.state.apiKey,
              playerId: this.state.playerId
            })
          }}
        />
        {this.state.show &&
          <GameballWidget style={{ position: 'absolute', zIndex: 999 }}
            clientId={this.state.apiKey}
            lang={this.state.language}
            playerId={this.state.playerId}
            displayName={this.state.displayName}
            dateOfBirth={this.state.dateOfBirth}
            email={this.state.email}
            gender={this.state.gender}
            render={this.state.show}
            mobileNumber={this.state.mobileNumber}
            idOnly={false}
          />
        }
      </View>
    )
  }
}

export default FirstScreen;