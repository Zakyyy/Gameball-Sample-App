import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GameballSdk } from 'react-native-gameball';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { add_player_id } from '../actions/AuthActions';
class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      show: false,
      displayName: 'sjsjjs',
      email: 'sajsaa@sasaa.com',
      gender: 'M',
      mobileNumber: '01099999999',
      dateOfBirth: '2019-10-13T20:57:36.761Z',
      playerId: 'test-1-screen',
      refer: false
    };
  }
  componentDidMount() {
    let code = this.props.navigation.getParam('gbreferral');
    code ? this.setState({ refer: true }) : this.setState({ refer: false })
  }
  async addReferral() {
    let { playerId, apiKey, displayName, email, gender, mobileNumber, dateOfBirth } = this.state;
    let code = this.props.navigation.getParam('gbreferral');
    GameballSdk.addReferral({
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
    });
    this.props.navigation.navigate('App');
  }

  async registerPlayer() {
    console.log("sss")
    console.log("register")
    let { playerId, displayName, email, gender, mobileNumber, dateOfBirth } = this.state;
    GameballSdk.registerUser({
      "playerUniqueId": playerId,
      // "playerTypeId": 1,
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
    }).then(res => {
      console.log(res)
      alert("success")
      // this.props.add_player_id(this.props.navigation)
      this.props.navigation.navigate('App')
    }
    ).catch(err => console.log(err.response))

  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 20 }}>Register Player</Text>
        <View style={{ flex: 1, flexDirection: 'column', padding: 20, paddingTop: 5 }}>
          <View style={{ marginTop: 20 }}>
            <Text>Required Info.</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'black' }}
              onChangeText={text => this.setState({ playerId: text })}
              value={this.state.playerId}
              placeholder="playerId"
              placeholderTextColor="black"
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>Optional</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'black' }}
              onChangeText={text => this.setState({ displayName: text })}
              value={this.state.displayName}
              placeholder="display name"
              placeholderTextColor="black"

            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'black' }}
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
              placeholder="email"
              placeholderTextColor="black"
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'black' }}
              onChangeText={text => this.setState({ gender: text })}
              value={this.state.gender}
              placeholder="gender"
              placeholderTextColor="black"
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'black' }}
              onChangeText={text => this.setState({ mobileNumber: text })}
              value={this.state.mobileNumber}
              placeholder="mobile number"
              placeholderTextColor="black"
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'black' }}
              onChangeText={text => this.setState({ dateOfBirth: text })}
              value={this.state.dateOfBirth}
              placeholder="birthdate"
              placeholderTextColor="black"

            />
            {!this.state.show && <Button
              title={this.state.refer ? "Refer" : "Register Player"}
              onPress={() =>
                this.state.refer ? this.addReferral() : this.registerPlayer()}
            />}
          </View>
        </View>
      </SafeAreaView>)
  }
}

export default connect(null, { add_player_id })(FirstScreen);