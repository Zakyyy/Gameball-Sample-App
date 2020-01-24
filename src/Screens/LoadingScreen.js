import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import firebase from 'react-native-firebase';
import { GameballSdk } from 'react-native-gameball';
import AsyncStorage from '@react-native-community/async-storage';

class LoadingScreen extends Component {
  async componentDidMount() {
    let initialLink = await firebase.links().getInitialLink();
    alert(initialLink)
    if (initialLink) {
      console.log("initial-link", initialLink);
      let referral = GameballSdk.getReferralCode(initialLink);
      console.log("referral", referral)
      this.props.navigation.navigate('Links'
        , {
          gbreferral: referral
        })
    }
    else {
      let playerId = await AsyncStorage.getItem('gameball_player_id')

      playerId ? this.props.navigation.navigate('App') : this.props.navigation.navigate('Links')
    }
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }
}

export default LoadingScreen;