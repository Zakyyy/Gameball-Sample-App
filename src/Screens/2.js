import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { GameballWidget } from '../../GbReactLibrary';

class SecondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: '8fdfd2dffd-9mnvhu25d6c3d',
      playerId: '',
      show: false
    }
  }
  render() {
    return (
      <View style={{ flex: 1, padding: 20, paddingTop: 50 }}>
        {!this.state.show &&<Button
          title={"open widget"}
          onPress={() => this.setState({ show: !this.state.show })}
        />}
        <Text style={{ fontSize: 18 }}> Render Widget using Only APIKey and PlayerID</Text>
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
        </View>
        {this.state.show &&
          <GameballWidget
            clientId={this.state.apiKey}
            playerId={this.state.playerId}
            render={this.state.show}
            idOnly={true}
          >
            <Button
              title={ "close widget" }
              onPress={() => this.setState({ show: !this.state.show })}
            />
          </GameballWidget>
        }
      </View>
    )
  }
}

export default SecondScreen;