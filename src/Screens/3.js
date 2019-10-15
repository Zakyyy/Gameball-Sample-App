import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GameballWidget } from '../../GbReactLibrary';

class ThirdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: '8fdfd2dffd-9mnvhu25d6c3d',
      playerId: '',
      show: false
    }
    this.api = new GameballWidget();
  }
  async sendEventPressFunction() {
    let token = await AsyncStorage.getItem('push_token');
    console.log(token)
    this.api.sdk.sendEvent({
      "events": {
        "review": {}
      },
      "playerUniqueId": this.state.playerId
    }, this.state.apiKey);
  }
  render() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 18 }}> Sending Event</Text>
        <View style={{ paddingTop: 20 }}>
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
          {!this.state.show &&
          <Button
            title={"Send Event"}
            onPress={() => this.sendEventPressFunction()}
          />}
          {!this.state.show && <Button
            title={"open widget"}
            onPress={() => this.setState({ show: !this.state.show })}
          />}
        </View>
        {this.state.show &&
          <GameballWidget
            clientId={this.state.apiKey}
            playerId={this.state.playerId}
            render={this.state.show}
            idOnly={true}
          >
            <Button
              title={"close widget"}
              onPress={() => this.setState({ show: !this.state.show })}
            />

          </GameballWidget>
        }
      </View>
    )
  }
}

export default ThirdScreen;