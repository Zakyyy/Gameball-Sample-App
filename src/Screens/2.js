import React, { Component } from 'react';
import { Text, View, Button, TextInput, SafeAreaView } from 'react-native';
import { GameballWidget } from 'react-native-gameball';
import AsyncStorage from '@react-native-community/async-storage';
import { add_player_id, getClientData } from '../actions/AuthActions';
import { connect } from 'react-redux';
class SecondScreen extends Component {

  componentDidMount() {
    this.props.getClientData();
  }

  render() {
    return (
      <GameballWidget />
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return {
    playerId: auth.playerId,
    apiKey: auth.apiKey,
    lang: auth.lang
  }
}

export default connect(mapStateToProps, { add_player_id, getClientData })(SecondScreen);